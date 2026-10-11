import { getBuiltInMeaning } from '../src/data/builtInDictionary';
import { clientIp, createRateLimiter, rateLimitResponse } from '../src/lib/rateLimit';

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

type ApiRequest = {
  method?: string;
  body?: { word?: unknown };
  headers?: Record<string, string | string[] | undefined>;
  ip?: string;
};

const cleanModelJson = (value: string) => {
  const withoutCodeBlocks = value.replace(/^\s*```(?:json)?/i, '').replace(/```\s*$/, '').trim();
  try {
    return JSON.parse(withoutCodeBlocks) as Record<string, unknown>;
  } catch {
    const match = value.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]) as Record<string, unknown>;
      } catch {
        return null;
      }
    }
    return null;
  }
};

const rateLimiter = createRateLimiter({ windowMs: 5 * 60 * 1000, max: 60 });

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800');

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  if (!rateLimiter.hit(clientIp(request))) {
    rateLimitResponse(response);
    return;
  }

  const rawWord = typeof request.body?.word === 'string' ? request.body.word.trim() : '';
  const word = rawWord.match(/^[\p{L}][\p{L}'’\-]{0,44}$/u)?.[0];
  if (!word) {
    return response.status(400).json({ error: 'Please provide one valid word.' });
  }

  // 1. Fast path: If word is recognized in the built-in dictionary, return immediately
  const localMeaning = getBuiltInMeaning(word);
  if (localMeaning) {
    return response.status(200).json(localMeaning);
  }

  // 2. Online AI dictionary via Gemini
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(503).json({ error: 'Dictionary service is not configured for non-catalog words.' });
  }

  try {
    const prompt = `Return only valid JSON for the word "${word}" using exactly these string keys:
{"word":"","partOfSpeech":"","simpleEnglish":"","urdu":"","sindhi":"","example":""}
Give a short, child-friendly Simple English definition, accurate Urdu meaning in Urdu script, accurate Sindhi meaning in Sindhi script, and one short English example. If the clicked form is inflected, explain that form. Do not use markdown.`;

    // Try gemini-2.5-flash first with fallback
    let aiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.1, responseMimeType: 'application/json' },
        }),
      },
    );

    if (!aiResponse.ok) {
      // Fallback model
      aiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(10000),
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.1, responseMimeType: 'application/json' },
          }),
        },
      );
    }

    if (!aiResponse.ok) {
      return response.status(502).json({ error: 'Could not retrieve the meaning.' });
    }

    const payload = await aiResponse.json() as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return response.status(502).json({ error: 'No meaning returned.' });

    const result = cleanModelJson(text);
    if (!result) return response.status(502).json({ error: 'Invalid model format.' });

    const meaning = {
      word,
      partOfSpeech: String(result.partOfSpeech || 'academic term').slice(0, 50),
      simpleEnglish: String(result.simpleEnglish || '').slice(0, 400),
      urdu: String(result.urdu || '').slice(0, 250),
      sindhi: String(result.sindhi || '').slice(0, 250),
      example: String(result.example || '').slice(0, 400),
    };

    if (!meaning.simpleEnglish || !meaning.urdu || !meaning.sindhi) {
      return response.status(502).json({ error: 'Incomplete meaning returned.' });
    }

    return response.status(200).json(meaning);
  } catch {
    return response.status(500).json({ error: 'Meaning lookup failed.' });
  }
}
