/**
 * Shared AI Resume Enhancer handler — works on both runtimes (Express and
 * Vercel serverless) so the deployed API surface cannot drift.
 *
 * Endpoints served:
 *  - { type: 'enhance-bullet',    text, role }
 *  - { type: 'generate-summary',  role, skills, context }
 *  - { type: 'suggest-keywords',  role }
 */
import { GoogleGenAI, Type } from '@google/genai';
import { clientIp, createRateLimiter, rateLimitResponse } from './rateLimit';

type ResumeApiResponse = {
  status: (code: number) => { json: (body: unknown) => void };
  json: (body: unknown) => void;
};

type ResumeApiRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  ip?: string;
};

interface Body {
  type?: unknown;
  text?: unknown;
  role?: unknown;
  skills?: unknown;
  context?: unknown;
}

const AI_MODEL = 'gemini-3.1-flash-lite';

/** AI endpoints are the expensive surface: throttle per client IP. */
const rateLimiter = createRateLimiter({ windowMs: 5 * 60 * 1000, max: 30 });

function parseBody(raw: unknown): Body {
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as Body;
    } catch {
      return {};
    }
  }
  return (raw || {}) as Body;
}

const cleanString = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

function buildClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  return new GoogleGenAI({ apiKey: key });
}

async function generateJson(
  client: GoogleGenAI,
  prompt: string,
  schema: Parameters<GoogleGenAI['models']['generateContent']>[0]['config']['responseSchema']
): Promise<Record<string, unknown>> {
  const response = await client.models.generateContent({
    model: AI_MODEL,
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  });
  const text = response.text || '{}';
  return JSON.parse(text.replace(/^\s*```(?:json)?/i, '').replace(/```\s*$/, '').trim()) as Record<string, unknown>;
}

/** Offline (no API key) fallbacks so the feature still works locally. */
const FALLBACK_VERBS = ['Spearheaded', 'Engineered', 'Optimized', 'Accelerated', 'Implemented', 'Administered', 'Coordinated'];
const FALLBACK_KEYWORDS = ['Analytical Thinking', 'Process Optimization', 'Documentation', 'Data Analysis', 'Project Management', 'Quality Assurance', 'Team Leadership', 'Reporting'];

export default async function resumeEnhanceHandler(req: ResumeApiRequest, res: ResumeApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!rateLimiter.hit(clientIp(req))) {
    rateLimitResponse(res);
    return;
  }

  const body = parseBody(req.body);
  const type = body.type;
  const client = buildClient();

  try {
    if (type === 'enhance-bullet') {
      const originalBullet = cleanString(body.text, 500);
      if (!originalBullet) {
        res.status(400).json({ error: 'Text is required for bullet enhancement.' });
        return;
      }
      if (!client) {
        const randomVerb = FALLBACK_VERBS[Math.floor(Math.random() * FALLBACK_VERBS.length)];
        const enhanced = originalBullet.replace(/^[a-z]+/i, randomVerb) + ', achieving 25%+ efficiency gains and ensuring 100% adherence to quality standards.';
        res.json({ enhanced, original: originalBullet });
        return;
      }
      const role = cleanString(body.role, 120) || 'Professional';
      const parsed = await generateJson(
        client,
        `Rewrite this resume job accomplishment bullet point to be ATS-optimized, high-impact, and metrics-driven using the Google XYZ Formula ("Accomplished [X], as measured by [Y], by doing [Z]"):
Original bullet: "${originalBullet}"
Target Role Context: "${role}"
Return JSON with { "enhanced": "string with one concise, polished bullet point starting with a strong past-tense action verb" }`,
        { type: Type.OBJECT, properties: { enhanced: { type: Type.STRING } }, required: ['enhanced'] }
      );
      res.json({ enhanced: (parsed.enhanced as string) || originalBullet, original: originalBullet });
      return;
    }

    if (type === 'generate-summary') {
      const targetRole = cleanString(body.role || body.text, 120) || 'Professional Candidate';
      const skillsList = Array.isArray(body.skills) ? body.skills.filter((s): s is string => typeof s === 'string').slice(0, 50).join(', ') : cleanString(body.skills, 300);
      const context = cleanString(body.context, 300);
      if (!client) {
        const fallback = `Results-driven and detail-oriented ${targetRole} with proven expertise in ${skillsList || 'operations, planning, and execution'}. Adept at cross-functional collaboration, streamlining workflows, and delivering high-quality outcomes under competitive deadlines.`;
        res.json({ summary: fallback });
        return;
      }
      const parsed = await generateJson(
        client,
        `Write a high-impact, 2-3 sentence ATS-friendly Professional Summary for a candidate.
Target Role: "${targetRole}"
Key Skills: "${skillsList}"
Additional Context: "${context}"
Tone: Authoritative, polished, accomplishment-focused.
Return JSON with { "summary": "2-3 sentences string" }`,
        { type: Type.OBJECT, properties: { summary: { type: Type.STRING } }, required: ['summary'] }
      );
      res.json({ summary: (parsed.summary as string) || '' });
      return;
    }

    if (type === 'suggest-keywords') {
      const targetRole = cleanString(body.role || body.text, 120) || 'General';
      if (!client) {
        res.json({ keywords: FALLBACK_KEYWORDS });
        return;
      }
      const parsed = await generateJson(
        client,
        `List the top 10 high-value ATS keywords and core competencies recruiters and automated applicant tracking systems (Workday, Taleo, STS IBA) search for when hiring a "${targetRole}".
Return JSON with { "keywords": ["keyword1", "keyword2", ...] }`,
        {
          type: Type.OBJECT,
          properties: { keywords: { type: Type.ARRAY, items: { type: Type.STRING } } },
          required: ['keywords'],
        }
      );
      const keywords = Array.isArray(parsed.keywords) ? (parsed.keywords as unknown[]).filter((k): k is string => typeof k === 'string').slice(0, 10) : [];
      res.json({ keywords });
      return;
    }

    res.status(400).json({ error: 'Unsupported enhancement type.' });
  } catch (err) {
    // Log internally, never leak provider diagnostics to the client.
    console.warn('[Resume Enhance API] Provider request failed:', err instanceof Error ? err.message : err);
    const targetRole = cleanString(body.role || body.text, 120) || 'target career opportunities';
    res.status(502).json({
      fallback: true,
      enhanced: cleanString(body.text, 500),
      summary: `Dedicated professional specializing in ${targetRole} with a strong foundation in core domain skills and organizational success.`,
      keywords: ['Communication', 'Time Management', 'Problem Solving', 'Attention to Detail', 'MS Office'],
    });
  }
}
