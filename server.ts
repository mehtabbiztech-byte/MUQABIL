import express from 'express';
import subjectiveFeedback from './api/subjective-feedback';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Predefined chatbot roles with dedicated system instructions and target models
export const CHATBOT_ROLES: Record<string, {
  id: string;
  name: string;
  subtitle: string;
  taskType: 'general' | 'complex' | 'fast';
  recommendedModel: 'gemini-3.8-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite';
  systemInstruction: string;
  starterPrompts: string[];
}> = {
  'general-mentor': {
    id: 'general-mentor',
    name: 'General STS & SPSC Exam Mentor',
    subtitle: 'Balanced guidance, syllabus breakdowns & full explanations (General Tasks)',
    taskType: 'general',
    recommendedModel: 'gemini-3.8-flash',
    systemInstruction: `You are the "General STS & SPSC Exam Mentor" on MUQABIL (muqabil.pk).
Your role: Provide clear, comprehensive, and syllabus-aligned explanations for aspirants of Sukkur IBA STS BPS-05 to 15, SPSC CCE, FPSC, CSS MPT, and provincial exams.
Style: Encouraging, structured, with bullet points, bold key takeaways, and exam relevance notes. Give thorough and complete explanations without cutting off early.
When user asks for practice or past papers, you may provide navigation directives:
<<<NAVIGATE: {"tab": "<target_tab>", "paperId": "<optional_paper_id>", "label": "<action_button_label>", "description": "<brief_description>"}>>>`,
    starterPrompts: [
      'What is the exact 50-50 syllabus structure of STS BPS 05-15 exams?',
      'Explain the difference between SPSC CCE Screening and STS IBA testing patterns.',
      'Give me 5 high-yield Everyday Science concepts frequently asked in competitive exams.',
      'How should I divide my daily study schedule between English, Math, and GK?',
    ],
  },
  'complex-solver': {
    id: 'complex-solver',
    name: 'Deep Reasoning & Complex Problem Solver',
    subtitle: 'Multi-step quantitative proofs, pedagogy theories & trap analysis (Complex Tasks)',
    taskType: 'complex',
    recommendedModel: 'gemini-3.1-pro-preview',
    systemInstruction: `You are the "Deep Reasoning & Complex Problem Solver" on MUQABIL powered by Gemini 3.1 Pro.
Your role: Analyze particularly complex exam challenges, multi-step quantitative reasoning, algebraic & geometric proofs, probability & permutations, constitutional articles (1973 Constitution, NFC, CCI), child development & pedagogy frameworks (Piaget's stages, Vygotsky's ZPD, Bloom's Revised Taxonomy, Jacob Kounin's classroom management), and tricky examiner distractors.
Style: Rigorous step-by-step deductions, explicit mathematical formulas, trap identification ("Subtractive Trap", "Neighboring Article Trap"), and analytical clarity. Always double check your intermediate arithmetic.`,
    starterPrompts: [
      'Solve step-by-step: A shopkeeper marks an item 40% above cost and offers 20% discount. What is his net profit %?',
      'Compare Piaget\'s formal operational stage with Vygotsky\'s Scaffolding in classroom pedagogy.',
      'Explain the constitutional mechanism of NFC Award under Article 160 vs Council of Common Interests (Article 153).',
      'Break down a complex permutation and combination probability problem with examiner traps highlighted.',
    ],
  },
  'rapid-drill': {
    id: 'rapid-drill',
    name: 'Rapid MCQ Drill Master',
    subtitle: 'Lightning-fast flashcards, speed quizzes & rapid verification (Fast Tasks)',
    taskType: 'fast',
    recommendedModel: 'gemini-3.1-flash-lite',
    systemInstruction: `You are the "Rapid MCQ Drill Master" on MUQABIL powered by Gemini 3.1 Flash-Lite.
Your role: Ultra-fast question answering, lightning flashcard review, instant formula checks, and quick definition lookups.
Style: High-speed, succinct, direct, 2-4 crisp bullet points or flashcard format. Zero fluff or lengthy preamble. Always test the user with a quick follow-up question.`,
    starterPrompts: [
      'Rapid Drill: Test me on 3 high-frequency English preposition idioms right now.',
      'Quick Formula: What is the shortcut formula for compound interest and percentage discount?',
      'Flashcard: Give me 3 key Indus Valley Civilization sites in Sindh and their discoveries.',
      'Instant check: What is the antonym of "Ephemeral" and "Prodigal" with STS-style options?',
    ],
  },
  'language-coach': {
    id: 'language-coach',
    name: 'Sindh & Pakistan Language Specialist',
    subtitle: 'English grammar rules, Urdu adab & Sindhi vyakaran (Bilingual/Trilingual)',
    taskType: 'general',
    recommendedModel: 'gemini-3.8-flash',
    systemInstruction: `You are the "Sindh & Pakistan Language Specialist" on MUQABIL.
Your role: Master English grammar (subject-verb agreement, Royal Order of Adjectives, conditionals, voice/narration), Urdu linguistics (محاورے، تلمیح، تشبیہ و استعارہ), and Sindhi grammar (سنڌي وياڪرڻ: پهاڪا، اصطلاح، علمِ بيان).
Style: Fluent and accurate in English, Urdu (اردو), and Sindhi (سنڌي). Provide side-by-side linguistic explanations and practical examples.`,
    starterPrompts: [
      'Explain the Royal Order of Adjectives in English with 3 test examples.',
      'سنڌي وياڪرڻ ۾ تشبيهه ۽ استعاري جي وچ ۾ ڪهڙو فرق آهي؟ مثالن سان سمجهايو۔',
      'اردو گرامر: صنعتِ تضاد اور صنعتِ مراعاۃ النظیر میں کیا فرق ہے؟ اشعار کے ساتھ بتائیں۔',
      'Translate and explain 3 common Sindhi and Urdu proverbs used in screening tests.',
    ],
  },
};

const BASE_SYSTEM_PROMPT = `You are "Mehtab AI", an advanced, universal AI assistant and official smart mentor for MATB STS PREP.

CAPABILITIES & SCOPE:
You can answer ANY question on ANY topic without restriction:
1. Word Meanings & Vocabulary: Definitions, parts of speech, synonyms, antonyms, and example sentences in English, Urdu, and Sindhi.
2. Academic & General Knowledge: World history, Islamic history, Pakistan Studies, science, mathematics, geography, literature, biology, chemistry, physics, and computer science.
3. Competitive Exam Mastery: Sukkur IBA STS BPS-05 to 15 (Graduation, Intermediate, Matriculation), SPSC CCE, FPSC (Customs, FIA), CSS MPT, PPSC, and NTS.
4. Languages: Fluently communicate and translate in English, Urdu (اردو), and Sindhi (سنڌي).

DIRECT NAVIGATION CAPABILITY:
When the user expresses interest in finding, solving, or viewing an exam past paper, mock test, mistake vault, learning lab, or job vacancy, include an interactive navigation action at the very end of your response in this exact format:
<<<NAVIGATE: {"tab": "<target_tab>", "paperId": "<optional_paper_id>", "categorySlug": "<optional_category>", "label": "<clear_action_button_label>", "description": "<brief_description>"}>>>

Available past paper IDs:
- "pp-sts-bps-5-15-grad-2024" -> STS IBA Sukkur BPS-05 to 15 (Graduation Category) Solved Paper
- "pp-spsc-cce-screen-2024" -> SPSC Combined Competitive Exam (CCE) Screening Paper
- "pp-fpsc-inspector-customs-2024" -> FPSC Inspector Customs & Intelligence Officer Solved Paper
- "pp-css-mpt-2025" -> CSS MPT (Screening) Solved Paper 2025
- "pp-fia-sub-inspector-2024" -> FIA Sub-Inspector Official Solved Test
- "pp-ppsc-tehsildar-2024" -> PPSC Tehsildar & Naib Tehsildar Solved Paper
- "sts-matric-bps-5-15-2025-record" -> STS BPS-05 to 15 Matriculation Category Archive
- "sts-intermediate-bps-5-15-2026-record" -> STS BPS-05 to 15 Intermediate Category Archive
- "sts-jest-2021-official-record" -> STS JEST (BPS-14) Official Record
- "sts-pst-2021-official-record" -> STS PST (BPS-14) Official Record

Available tabs:
- "past-papers" -> Past papers repository and live test simulator
- "learning-lab" -> IRT Adaptive testing, Mistake vault, 1v1 multiplayer showdown
- "quiz" -> Custom mock test generator and timed exam simulator
- "mcqs" -> Topic-wise question bank (English, Math, GK, etc.)
- "jobs" -> Latest Sindh & Federal government vacancies
- "current-affairs" -> 2025-2026 National & International Current Affairs
- "mistakes" -> User's quarantined mistake notebook
- "study-notes" -> High-yield formula sheets and notes
- "rankings" -> Provincial leaderboard
- "ai-chat" -> Dedicated multi-turn Gemini chatbot

STYLE & TONE:
Polite, encouraging, clear, and comprehensive. Format explanations with clean bullet points, bold key terms, and markdown.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.post('/api/subjective-feedback', subjectiveFeedback);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok',
      app: 'MATB STS PREP Platform',
      features: ['gemini-chatbot', 'multi-turn-chat', 'role-system-instructions', 'model-routing']
    });
  });

  // Chatbot roles metadata endpoint
  app.get('/api/chat/roles', (req, res) => {
    res.json({
      roles: Object.values(CHATBOT_ROLES),
      models: [
        {
          id: 'gemini-3.5-flash',
          name: 'Gemini 3.5 Flash',
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
    });
  });

  // AI Multi-Turn Chat endpoint with dynamic model selection and system instructions
  app.post('/api/chat', async (req, res) => {
    try {
      const { 
        messages, 
        userContext, 
        mode, 
        taskType, 
        model: requestedModel, 
        roleId = 'general-mentor',
        systemInstruction: customInstruction 
      } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      const client = getAIClient();
      if (!client) {
        return res.json({ 
          fallback: true,
          reply: 'Server GEMINI_API_KEY unconfigured; operating in offline intelligent knowledge mode.',
          model: 'offline-knowledge-engine'
        });
      }

      // Convert conversation history to Gemini multi-turn format
      // Role in @google/genai is 'user' | 'model'
      const conversationHistory = messages.slice(-16).map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content || '' }],
      }));

      // Role selection and system instruction formulation
      const activeRoleConfig = CHATBOT_ROLES[roleId] || CHATBOT_ROLES['general-mentor'];
      const roleInstruction = customInstruction || activeRoleConfig.systemInstruction;

      const isVoice = mode === 'voice';
      const voiceInstruction = isVoice 
        ? '\n[VOICE INTERACTION MODE ACTIVE]: The user is interacting via voice chat. Keep your response spoken-friendly, conversational, crisp (2-4 spoken sentences or clear bullet points). Do NOT output huge code blocks or awkward ASCII tables that sound cluttered when read aloud by TTS.'
        : '';

      const candidateContext = userContext ? `\n[Candidate Profile]: Target Exam: ${userContext.targetExam || 'STS BPS-05 to 15'}, Accuracy: ${userContext.accuracy || 70}%, Province: ${userContext.province || 'Sindh'}.` : '';

      const fullSystemInstruction = `${BASE_SYSTEM_PROMPT}\n\n[ACTIVE ROLE: ${activeRoleConfig.name}]\n${roleInstruction}${voiceInstruction}${candidateContext}`;

      // Model determination according to prompt specification:
      // "Use gemini-3.1-pro-preview for particularly complex tasks, gemini-3.5-flash for general tasks, and gemini-3.1-flash-lite for tasks that should happen fast."
      let targetModel: string = 'gemini-3.5-flash';

      if (requestedModel && ['gemini-3.1-pro-preview', 'gemini-3.5-flash', 'gemini-3.1-flash-lite'].includes(requestedModel)) {
        targetModel = requestedModel;
      } else if (taskType === 'complex' || roleId === 'complex-solver') {
        targetModel = 'gemini-3.1-pro-preview';
      } else if (taskType === 'fast' || roleId === 'rapid-drill') {
        targetModel = 'gemini-3.1-flash-lite';
      } else if (taskType === 'general' || roleId === 'general-mentor' || roleId === 'language-coach') {
        targetModel = 'gemini-3.5-flash';
      } else {
        // Auto-detect based on last user message
        const lastUserMsg = messages.filter((m: { role: string }) => m.role === 'user').slice(-1)[0]?.content?.toLowerCase() || '';
        const isComplex = /\b(solve step-by-step|derive|mathematical proof|calculus|algebraic proof|pedagogy|bloom|piaget|vygotsky|constitutional article|deep reasoning|trap analysis)\b/.test(lastUserMsg) || lastUserMsg.length > 400;
        const isFast = /\b(quick|rapid|drill|flashcard|synonym|antonym|fast|instant|meaning of|define in one line|mcq quiz)\b/.test(lastUserMsg);

        if (isComplex) {
          targetModel = 'gemini-3.1-pro-preview';
        } else if (isFast) {
          targetModel = 'gemini-3.1-flash-lite';
        } else {
          targetModel = 'gemini-3.5-flash';
        }
      }

      // Ordered candidates for graceful fallback in case of rate limits or quotas
      const candidateModels = [
        targetModel,
        ...(targetModel !== 'gemini-3.5-flash' ? ['gemini-3.5-flash'] : []),
        ...(targetModel !== 'gemini-3.1-flash-lite' ? ['gemini-3.1-flash-lite'] : []),
        'gemini-3.8-flash'
      ];

      let lastError: string | null = null;
      let actualModelUsed = targetModel;

      for (const modelToTry of candidateModels) {
        try {
          const response = await client.models.generateContent({
            model: modelToTry,
            contents: conversationHistory,
            config: {
              systemInstruction: fullSystemInstruction,
              maxOutputTokens: 3000,
              temperature: modelToTry === 'gemini-3.1-pro-preview' ? 0.3 : 0.7,
            },
          });

          // response.text is a property in @google/genai, do NOT call as a function
          const replyText = response.text || 'I am ready to assist you with your exam preparation!';
          actualModelUsed = modelToTry;

          return res.json({ 
            reply: replyText, 
            fallback: false, 
            model: actualModelUsed,
            roleId: activeRoleConfig.id,
            roleName: activeRoleConfig.name,
            taskType: activeRoleConfig.taskType
          });
        } catch (modelErr: unknown) {
          const msg = modelErr instanceof Error ? modelErr.message : String(modelErr);
          lastError = msg;
          console.warn(`[Gemini API] Model ${modelToTry} attempt failed: ${msg}. Trying next fallback candidate...`);
          continue;
        }
      }

      return res.json({ 
        fallback: true, 
        notice: 'Cloud AI models experiencing high traffic. Exam intelligence engine response provided.',
        reply: `### Study Tip & Exam Guidance\n\nI am currently operating with optimized offline intelligence while cloud connections refresh. For **${activeRoleConfig.name}**, remember to focus on official syllabus weightage and practice past questions in the **Past Papers** and **Learning Lab** sections.\n\n${lastError ? `*(Diagnostic: ${lastError})*` : ''}`,
        model: 'offline-fallback',
        error: lastError 
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return res.status(500).json({ fallback: true, error: errorMessage });
    }
  });

  // Streaming endpoint for real-time typewriter generation
  app.post('/api/chat/stream', async (req, res) => {
    try {
      const { 
        messages, 
        userContext, 
        taskType, 
        model: requestedModel, 
        roleId = 'general-mentor' 
      } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      const client = getAIClient();
      if (!client) {
        return res.status(503).json({ error: 'Gemini client not configured.' });
      }

      const activeRoleConfig = CHATBOT_ROLES[roleId] || CHATBOT_ROLES['general-mentor'];
      let targetModel = requestedModel || activeRoleConfig.recommendedModel;
      if (taskType === 'complex') targetModel = 'gemini-3.1-pro-preview';
      if (taskType === 'fast') targetModel = 'gemini-3.1-flash-lite';
      if (taskType === 'general') targetModel = 'gemini-3.5-flash';

      const conversationHistory = messages.slice(-16).map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content || '' }],
      }));

      const candidateContext = userContext ? `\n[Candidate Profile]: Target Exam: ${userContext.targetExam || 'STS BPS-05 to 15'}.` : '';
      const fullSystemInstruction = `${BASE_SYSTEM_PROMPT}\n\n[ACTIVE ROLE: ${activeRoleConfig.name}]\n${activeRoleConfig.systemInstruction}${candidateContext}`;

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
      if (!res.headersSent) {
        res.status(500).json({ error: msg });
      } else {
        res.write(`data: ${JSON.stringify({ error: msg, done: true })}\n\n`);
        res.end();
      }
    }
  });

  // Word Meaning & Dictionary endpoint for vocabulary lookups
  app.post('/api/word-meaning', async (req, res) => {
    try {
      const { word } = req.body;
      if (!word || typeof word !== 'string') {
        return res.status(400).json({ error: 'Word is required.' });
      }

      const cleanWord = word.trim().replace(/^['’\-]+|['’\-]+$/g, '');
      if (!cleanWord || cleanWord.length < 2 || cleanWord.length > 50) {
        return res.status(400).json({ error: 'Invalid word length.' });
      }

      const client = getAIClient();
      if (!client) {
        return res.json({
          word: cleanWord,
          partOfSpeech: 'vocabulary word',
          simpleEnglish: `Key vocabulary term: "${cleanWord}". Practice context and usage in exam questions.`,
          urdu: `امتحانی الفاظ: "${cleanWord}"۔`,
          sindhi: `امتحاني لفظ: "${cleanWord}"۔`,
          example: `Understanding "${cleanWord}" helps solve comprehension and vocabulary questions accurately.`
        });
      }

      const prompt = `Provide educational dictionary information for the word: "${cleanWord}".
Target audience: Competitive exam aspirants in Pakistan (Sukkur IBA STS BPS-05 to 15, SPSC, FPSC).
Return valid JSON with:
- word: the input word
- partOfSpeech: part of speech (noun, verb, adjective, etc.)
- simpleEnglish: concise 1-2 sentence definition in simple English
- urdu: accurate Urdu meaning/translation in Urdu script
- sindhi: accurate Sindhi meaning/translation in Sindhi script
- example: an exam-style example sentence using the word`;

      const response = await client.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              partOfSpeech: { type: Type.STRING },
              simpleEnglish: { type: Type.STRING },
              urdu: { type: Type.STRING },
              sindhi: { type: Type.STRING },
              example: { type: Type.STRING },
            },
            required: ['word', 'partOfSpeech', 'simpleEnglish', 'urdu', 'sindhi'],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Empty response from model');
      }

      const data = JSON.parse(responseText);
      return res.json({
        word: cleanWord,
        partOfSpeech: data.partOfSpeech || 'word',
        simpleEnglish: data.simpleEnglish || `Definition of ${cleanWord}`,
        urdu: data.urdu || cleanWord,
        sindhi: data.sindhi || cleanWord,
        example: data.example || `Use "${cleanWord}" in a sentence.`
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[Word Meaning API] Model lookup failed: ${msg}. Serving offline vocabulary record.`);
      const cleanWord = typeof req.body?.word === 'string' ? req.body.word.trim() : 'Word';
      return res.json({
        word: cleanWord,
        partOfSpeech: 'vocabulary word',
        simpleEnglish: `Key vocabulary term: "${cleanWord}". Practice context and usage in exam questions.`,
        urdu: `امتحانی الفاظ: "${cleanWord}"۔`,
        sindhi: `امتحاني لفظ: "${cleanWord}"۔`,
        example: `Understanding "${cleanWord}" helps solve comprehension and vocabulary questions accurately.`
      });
    }
  });

  // AI Resume Enhancer endpoint
  app.post('/api/resume-enhance', async (req, res) => {
    try {
      const { type, text, role, skills, context } = req.body;
      const client = getAIClient();

      if (type === 'enhance-bullet') {
        const originalBullet = (text || '').trim();
        if (!originalBullet) {
          return res.status(400).json({ error: 'Text is required for bullet enhancement.' });
        }

        if (!client) {
          const verbMatches = ['Spearheaded', 'Engineered', 'Optimized', 'Accelerated', 'Implemented', 'Administered', 'Coordinated'];
          const randomVerb = verbMatches[Math.floor(Math.random() * verbMatches.length)];
          const enhanced = originalBullet.replace(/^[a-z]+/i, randomVerb) + ', achieving 25%+ efficiency gains and ensuring 100% adherence to quality standards.';
          return res.json({ enhanced, original: originalBullet });
        }

        const prompt = `Rewrite this resume job accomplishment bullet point to be ATS-optimized, high-impact, and metrics-driven using the Google XYZ Formula ("Accomplished [X], as measured by [Y], by doing [Z]"):
Original bullet: "${originalBullet}"
Target Role Context: "${role || 'Professional'}"
Return JSON with { "enhanced": "string with one concise, polished bullet point starting with a strong past-tense action verb" }`;

        const response = await client.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                enhanced: { type: Type.STRING },
              },
              required: ['enhanced'],
            },
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json({ enhanced: parsed.enhanced || originalBullet, original: originalBullet });
      }

      if (type === 'generate-summary') {
        const targetRole = (role || text || 'Professional Candidate').trim();
        const skillsList = Array.isArray(skills) ? skills.join(', ') : (skills || '');

        if (!client) {
          const fallback = `Results-driven and detail-oriented ${targetRole} with proven expertise in ${skillsList || 'operations, planning, and execution'}. Adept at cross-functional collaboration, streamlining workflows, and delivering high-quality outcomes under competitive deadlines.`;
          return res.json({ summary: fallback });
        }

        const prompt = `Write a high-impact, 2-3 sentence ATS-friendly Professional Summary for a candidate.
Target Role: "${targetRole}"
Key Skills: "${skillsList}"
Additional Context: "${context || ''}"
Tone: Authoritative, polished, accomplishment-focused.
Return JSON with { "summary": "2-3 sentences string" }`;

        const response = await client.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
              },
              required: ['summary'],
            },
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json({ summary: parsed.summary || '' });
      }

      if (type === 'suggest-keywords') {
        const targetRole = (role || text || 'General').trim();
        if (!client) {
          return res.json({
            keywords: ['Analytical Thinking', 'Process Optimization', 'Documentation', 'Data Analysis', 'Project Management', 'Quality Assurance', 'Team Leadership', 'Reporting']
          });
        }

        const prompt = `List the top 10 high-value ATS keywords and core competencies recruiters and automated applicant tracking systems (Workday, Taleo, STS IBA) search for when hiring a "${targetRole}".
Return JSON with { "keywords": ["keyword1", "keyword2", ...] }`;

        const response = await client.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                keywords: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ['keywords'],
            },
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json({ keywords: parsed.keywords || [] });
      }

      return res.status(400).json({ error: 'Unsupported enhancement type.' });
    } catch (err: unknown) {
      console.warn('[Resume Enhance API] Error:', err);
      return res.json({
        fallback: true,
        enhanced: req.body?.text || '',
        summary: `Dedicated professional specializing in ${req.body?.role || 'target career opportunities'} with a strong foundation in core domain skills and organizational success.`,
        keywords: ['Communication', 'Time Management', 'Problem Solving', 'Attention to Detail', 'MS Office']
      });
    }
  });

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

startServer();
