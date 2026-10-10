import { GoogleGenAI } from '@google/genai';
import {
  ALLOWED_MODELS,
  BASE_SYSTEM_PROMPT,
  CHATBOT_ROLES,
  SEARCH_GROUNDING_MODELS,
  buildConversationHistory,
  candidateModelsFor,
  extractGroundingSources,
  getRole,
  needsSearchGrounding,
  resolveTargetModel,
  type TaskType,
} from '../src/lib/chatCore';
import { clientIp, createRateLimiter, rateLimitResponse } from '../src/lib/rateLimit';

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

export interface ChatBody {
  messages?: Array<{ role: string; content: string }>;
  taskType?: TaskType;
  model?: string;
  roleId?: string;
  systemInstruction?: string;
  imageBase64?: string;
  imageMimeType?: string;
  enableSearchGrounding?: boolean;
  userContext?: {
    targetExam?: string;
    accuracy?: number;
    province?: string;
  };
  mode?: 'text' | 'voice';
}

type ApiRequest = {
  method?: string;
  body?: ChatBody | string;
  headers?: Record<string, string | string[] | undefined>;
  ip?: string;
};

/** Chat is the most expensive AI surface: stricter per-IP budget. */
const rateLimiter = createRateLimiter({ windowMs: 5 * 60 * 1000, max: 20 });

function parseBody(raw: ChatBody | string | undefined): ChatBody {
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as ChatBody;
    } catch {
      return {};
    }
  }
  return raw || {};
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  // Allow GET request for health check and endpoint info
  if (request.method === 'GET') {
    return response.status(200).json({
      status: 'ok',
      endpoint: '/api/chat',
      supportedMethods: ['POST', 'GET'],
      models: [...ALLOWED_MODELS],
      roles: Object.keys(CHATBOT_ROLES),
    });
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!rateLimiter.hit(clientIp(request))) {
    rateLimitResponse(response);
    return;
  }

  const body = parseBody(request.body);
  const {
    messages = [],
    taskType,
    model: requestedModel,
    roleId = 'general-mentor',
    systemInstruction: customInstruction,
    imageBase64,
    imageMimeType,
    enableSearchGrounding = false,
    userContext,
    mode,
  } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return response.status(400).json({ error: 'Messages array is required.' });
  }
  // Sanitize history: roles must be user/model, content must be a string.
  const safeMessages = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant' || m.role === 'model') && typeof m.content === 'string')
    .slice(-16);
  if (safeMessages.length === 0) {
    return response.status(400).json({ error: 'Messages array is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(200).json({
      fallback: true,
      reply: 'The server GEMINI_API_KEY is currently unconfigured. AI cloud connectivity is not available right now — you can continue practicing questions and past papers in the platform modules.',
      model: 'offline-knowledge-engine',
    });
  }

  const activeRole = getRole(roleId);
  const roleInstruction = (typeof customInstruction === 'string' ? customInstruction.trim().slice(0, 2000) : '') || activeRole.systemInstruction;
  const voiceInstruction = mode === 'voice'
    ? '\n[VOICE INTERACTION MODE ACTIVE]: Respond in conversational, spoken-friendly sentences without large code blocks or markdown tables.'
    : '';
  const candidateContext = userContext
    ? `\n[Candidate Profile]: Target Exam: ${String(userContext.targetExam || 'STS BPS-05 to 15').slice(0, 120)}, Province: ${String(userContext.province || 'Sindh').slice(0, 60)}.`
    : '';
  const fullSystemInstruction = `${BASE_SYSTEM_PROMPT}\n\n[ACTIVE ROLE: ${activeRole.name}]\n${roleInstruction}${voiceInstruction}${candidateContext}`;

  const lastUserMsg = safeMessages.filter((m) => m.role === 'user').slice(-1)[0]?.content?.toLowerCase() || '';
  const targetModel = resolveTargetModel({ requestedModel, taskType, roleId, lastUserMessage: lastUserMsg });
  const conversationHistory = buildConversationHistory(safeMessages, imageBase64, imageMimeType);
  const needsSearch = needsSearchGrounding(!!enableSearchGrounding, lastUserMsg);

  const ai = new GoogleGenAI({ apiKey });

  let lastError: string | null = null;
  for (const modelToTry of candidateModelsFor(targetModel)) {
    try {
      const tools = needsSearch && SEARCH_GROUNDING_MODELS.has(modelToTry) ? [{ googleSearch: {} }] : undefined;

      const genResponse = await ai.models.generateContent({
        model: modelToTry,
        contents: conversationHistory,
        config: {
          systemInstruction: fullSystemInstruction,
          maxOutputTokens: 3500,
          temperature: modelToTry === 'gemini-3.1-pro-preview' ? 0.3 : 0.7,
          ...(tools ? { tools } : {}),
        },
      });

      let reply = genResponse.text || 'I am ready to help you with your exam preparation!';

      // Extract real-time search grounding sources if present
      const groundingSources = extractGroundingSources(genResponse).slice(0, 5);
      if (groundingSources.length > 0) {
        reply += `\n\n<<<GROUNDING_SOURCES: ${JSON.stringify(groundingSources)}>>>`;
      }

      return response.status(200).json({
        reply,
        model: modelToTry,
        roleId: activeRole.id,
        roleName: activeRole.name,
        taskType: activeRole.taskType,
        groundingSources,
        fallback: false,
      });
    } catch (err: unknown) {
      // Log internally; never return provider diagnostics to the client.
      lastError = err instanceof Error ? err.message : String(err);
      console.warn(`[Gemini API] Model ${modelToTry} attempt failed. Trying next fallback candidate.`);
    }
  }

  if (lastError) {
    console.error('[Gemini API] All model candidates failed:', lastError);
  }
  return response.status(200).json({
    fallback: true,
    reply: `### Study Guidance (${activeRole.name})\n\nFocus on syllabus weightage and key concepts across English, Math, and General Knowledge. Practice with the timed test simulator in the **Past Papers** tab, and try again in a moment if the AI service is busy.`,
    model: 'fallback-intelligence',
  });
}
