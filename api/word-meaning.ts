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

const cleanModelJson = (value: string) => value.replace(/^\s*```(?:json)?/i, '').replace(/```\s*$/, '').trim();

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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(503).json({ error: 'Dictionary service is not configured.' });
  }

  try {
    const prompt = `Return only valid JSON for the word "${word}" using exactly these string keys:
{"word":"","partOfSpeech":"","simpleEnglish":"","urdu":"","sindhi":"","example":""}
Give a short, child-friendly Simple English definition, accurate Urdu meaning in Urdu script, accurate Sindhi meaning in Sindhi script, and one short English example. If the clicked form is inflected, explain that form. Do not use markdown.`;

    const aiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.1, responseMimeType: 'application/json' },
        }),
      },
    );

    if (!aiResponse.ok) {
      return response.status(502).json({ error: 'Could not retrieve the meaning.' });
    }

    const payload = await aiResponse.json() as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return response.status(502).json({ error: 'No meaning returned.' });

    const result = JSON.parse(cleanModelJson(text)) as Record<string, unknown>;
    const meaning = {
      word,
      partOfSpeech: String(result.partOfSpeech || 'word').slice(0, 50),
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
