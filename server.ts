import express from 'express';
import subjectiveFeedback from './api/subjective-feedback';
import chatHandler from './api/chat';
import wordMeaningHandler from './api/word-meaning';
import resumeEnhanceHandler from './api/resume-enhance';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  ALLOWED_MODELS,
  BASE_SYSTEM_PROMPT,
  CHATBOT_ROLES,
  buildConversationHistory,
  resolveTargetModel,
} from './src/lib/chatCore';
import { clientIp, createRateLimiter } from './src/lib/rateLimit';

dotenv.config();

const streamRateLimiter = createRateLimiter({ windowMs: 5 * 60 * 1000, max: 20 });

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

startServer();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Minimal, safe security headers for API and app responses.
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (req.path.startsWith('/api/')) {
      res.setHeader('Cache-Control', 'no-store');
    }
    next();
  });

  // AI endpoints (shared handlers are rate-limited internally per client IP).
  // The chat handler also answers GET with endpoint metadata (parity with Vercel).
  app.get('/api/chat', chatHandler);
  app.post('/api/chat', chatHandler);
  app.post('/api/word-meaning', wordMeaningHandler);
  app.post('/api/resume-enhance', resumeEnhanceHandler);
  app.post('/api/subjective-feedback', subjectiveFeedback);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      app: 'MUQABIL Study Platform',
      features: ['gemini-chatbot', 'multi-turn-chat', 'role-system-instructions', 'model-routing', 'multimodal-ocr', 'search-grounding', 'interactive-quiz'],
    });
  });

  // Chatbot roles metadata endpoint
  app.get('/api/chat/roles', (req, res) => {
    res.json({
      roles: Object.values(CHATBOT_ROLES),
      models: [
        {
          id: 'gemini-3.8-flash',
          name: 'Gemini 3.8 Flash',
          badge: 'Balanced & Versatile',
          useCase: 'General Tasks (Comprehensive Explanations & Study Coaching)',
          defaultRole: 'general-mentor',
        },
        {
          id: 'gemini-3.1-pro-preview',
          name: 'Gemini 3.1 Pro',
          badge: 'Deep Reasoning',
          useCase: 'Particularly Complex Tasks (Math Proofs, Law, Pedagogy & Socratic Analysis)',
          defaultRole: 'complex-solver',
        },
        {
          id: 'gemini-3.1-flash-lite',
          name: 'Gemini 3.1 Flash-Lite',
          badge: 'Lightning Fast',
          useCase: 'Fast Tasks (Rapid Drills, Instant Flashcards & High-Speed Verification)',
          defaultRole: 'rapid-drill',
        },
      ],
      allowedModelIds: [...ALLOWED_MODELS],
    });
  });

  // Streaming endpoint for real-time typewriter generation
  app.post('/api/chat/stream', async (req, res) => {
    try {
      const {
        messages,
        userContext,
        taskType,
        model: requestedModel,
        roleId = 'general-mentor',
      } = req.body as {
        messages?: Array<{ role: string; content: string }>;
        userContext?: { targetExam?: string; province?: string };
        taskType?: 'general' | 'complex' | 'fast';
        model?: string;
        roleId?: string;
      };

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      // The streaming surface shares the /api/chat budget.
      if (!streamRateLimiter.hit(clientIp(req))) {
        return res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.', retryAfterSeconds: 30 });
      }

      const client = getAIClient();
      if (!client) {
        return res.status(503).json({ error: 'Gemini client not configured.' });
      }

      const activeRole = CHATBOT_ROLES[roleId] || CHATBOT_ROLES['general-mentor'];
      const lastUserMsg = messages.filter((m: { role: string }) => m.role === 'user').slice(-1)[0]?.content?.toLowerCase() || '';
      const targetModel = resolveTargetModel({ requestedModel, taskType, roleId, lastUserMessage: lastUserMsg });

      const conversationHistory = buildConversationHistory(
        messages.map((m: { role: string; content: string }) => ({ role: m.role, content: typeof m.content === 'string' ? m.content : '' }))
      );

      const candidateContext = userContext
        ? `\n[Candidate Profile]: Target Exam: ${String(userContext.targetExam || 'STS BPS-05 to 15').slice(0, 120)}.`
        : '';
      const fullSystemInstruction = `${BASE_SYSTEM_PROMPT}\n\n[ACTIVE ROLE: ${activeRole.name}]\n${activeRole.systemInstruction}${candidateContext}`;

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const streamResponse = await client.models.generateContentStream({
        model: targetModel,
        contents: conversationHistory,
        config: {
          systemInstruction: fullSystemInstruction,
          temperature: targetModel === 'gemini-3.1-pro-preview' ? 0.3 : 0.7,
        },
      });

      for await (const chunk of streamResponse) {
        // chunk.text is a property in @google/genai
        const text = chunk.text;
        if (text) {
          res.write(`data: ${JSON.stringify({ text, model: targetModel })}\n\n`);
        }
      }

      res.write(`data: ${JSON.stringify({ done: true, model: targetModel })}\n\n`);
      res.end();
    } catch (streamErr: unknown) {
      const msg = streamErr instanceof Error ? streamErr.message : String(streamErr);
      console.error('[Chat Stream API] Error:', msg);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Streaming chat is unavailable right now. Please try the standard chat.' });
      } else {
        res.write(`data: ${JSON.stringify({ error: 'Streaming chat is unavailable right now. Please try the standard chat.', done: true })}\n\n`);
        res.end();
      }
    }
  });

  // Serve static assets from public directory
  const publicPath = path.resolve(process.cwd(), 'public');
  if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
  }

  // Vite middleware for development / static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    app.use(async (req, res, next) => {
      if (req.path.startsWith('/api') || req.path.includes('.')) {
        return next();
      }
      const url = req.originalUrl;
      try {
        const indexHtmlPath = path.resolve(process.cwd(), 'index.html');
        if (fs.existsSync(indexHtmlPath)) {
          let template = fs.readFileSync(indexHtmlPath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } else {
          next();
        }
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use((req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use`);
    } else {
      console.error('Server error:', err);
    }
  });
}


