import { GoogleGenAI } from '@google/genai';

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

type ApiRequest = {
  method?: string;
  body?: {
    messages?: Array<{ role: string; content: string }>;
    taskType?: 'general' | 'complex' | 'fast';
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
  };
};

const BASE_SYSTEM_PROMPT = `You are "Mehtab AI", an advanced, universal AI assistant and official smart mentor for MATB STS PREP (muqabil.pk).

CAPABILITIES & SCOPE:
You can answer ANY question on ANY topic without restriction:
1. Word Meanings & Vocabulary: Definitions, parts of speech, synonyms, antonyms, and example sentences in English, Urdu, and Sindhi.
2. Academic & General Knowledge: World history, Islamic history, Pakistan Studies, science, mathematics, geography, literature, biology, chemistry, physics, and computer science.
3. Competitive Exam Mastery: Sukkur IBA STS BPS-05 to 15 (Graduation, Intermediate, Matriculation), SPSC CCE, FPSC (Customs, FIA), CSS MPT, PPSC, and NTS.
4. Languages: Fluently communicate and translate in English, Urdu (اردو), and Sindhi (سنڌي).
5. Visual Question / Screenshot Analysis: When an image is provided, extract any text, question, formula, or diagram accurately, verify the correct option, explain why other options are distractor traps, and provide the complete solution.

INTERACTIVE PRACTICE MCQS (CRITICAL CAPABILITY):
When the user asks for practice questions, quizzes, or tests (or when you want to test their understanding), generate interactive MCQs using this exact directive format so an interactive card is rendered in the chat:
<<<QUIZ_MCQ: {"question": "<Question text>", "options": ["A) ...", "B) ...", "C) ...", "D) ..."], "answer": "A"|"B"|"C"|"D", "explanation": "<Concise clear breakdown of why this option is correct and why other options are distractor traps>"}>>>

EXAM TRAP ANALYSIS:
When explaining exam questions, explicitly point out:
- [Examiner Trap]: The subtle distractor candidates mistakenly choose.
- [Shortcut / Golden Rule]: The 10-second formula or grammar rule to solve it instantly.

DIRECT NAVIGATION CAPABILITY:
When the user expresses interest in finding, solving, or viewing an exam past paper, mock test, mistake vault, learning lab, or job vacancy, include an interactive navigation action at the very end of your response in this exact format:
<<<NAVIGATE: {"tab": "<target_tab>", "paperId": "<optional_paper_id>", "categorySlug": "<optional_category>", "label": "<clear_action_button_label>", "description": "<brief_description>"}>>>

Available past paper IDs:
- "pp-sts-bps-5-15-grad-2024" -> STS IBA Sukkur BPS-05 to 15 (Graduation Category) Solved Paper
- "pp-spsc-cce-screen-2024" -> SPSC Combined Competitive Exam (CCE) Screening Paper
- "pp-fpsc-inspector-customs-2024" -> FPSC Inspector Customs & Intelligence Officer Solved Paper
- "pp-css-mpt-2025" -> CSS MPT (Screening) Solved Paper 2025
- "pp-fia-sub-inspector-2024" -> FIA Sub-Inspector Official Solved Test

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

export const ROLES: Record<string, {
  name: string;
  taskType: 'general' | 'complex' | 'fast';
  defaultModel: 'gemini-3.8-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite';
  systemInstruction: string;
}> = {
  'general-mentor': {
    name: 'General STS & SPSC Exam Mentor',
    taskType: 'general',
    defaultModel: 'gemini-3.8-flash',
    systemInstruction: `You are the "General STS & SPSC Exam Mentor" on MUQABIL (muqabil.pk). Provide comprehensive, syllabus-aligned explanations for aspirants of Sukkur IBA STS BPS-05 to 15, SPSC CCE, FPSC, CSS MPT, and provincial exams. Use structured bullet points, clear examples, bold key takeaways, and relevant Urdu/Sindhi translations where helpful. Always provide complete, thorough explanations without cutting off prematurely.`,
  },
  'complex-solver': {
    name: 'Deep Reasoning & Complex Problem Solver',
    taskType: 'complex',
    defaultModel: 'gemini-3.1-pro-preview',
    systemInstruction: `You are the "Deep Reasoning & Complex Problem Solver" on MUQABIL powered by Gemini 3.1 Pro. Analyze particularly complex exam challenges, multi-step math derivations, algebraic & geometric proofs, constitutional law articles, child development & pedagogy frameworks (Piaget, Vygotsky, Bloom), and tricky examiner distractors. Provide rigorous step-by-step deductions and arithmetic checks.`,
  },
  'rapid-drill': {
    name: 'Rapid MCQ Drill Master',
    taskType: 'fast',
    defaultModel: 'gemini-3.1-flash-lite',
    systemInstruction: `You are the "Rapid MCQ Drill Master" on MUQABIL powered by Gemini 3.1 Flash-Lite. Your mission is high-speed question-answering, flashcard review, and instant fact verification. Deliver punchy, succinct, high-accuracy answers without filler.`,
  },
  'language-coach': {
    name: 'Sindh & Pakistan Language Specialist',
    taskType: 'general',
    defaultModel: 'gemini-3.8-flash',
    systemInstruction: `You are the "Sindh & Pakistan Language Specialist" on MUQABIL. Master English grammar, Urdu linguistics (محاورے، تلمیح، قواعد), and Sindhi grammar (سنڌي وياڪرڻ: پهاڪا، اصطلاح، علمِ بيان). Assist candidates with idioms, translation, and grammatical correction in English, Urdu, and Sindhi.`,
  },
  'math-wizard': {
    name: 'Quantitative Reasoning & Math Shortcut Wizard',
    taskType: 'complex',
    defaultModel: 'gemini-3.1-pro-preview',
    systemInstruction: `You are the "Quantitative Reasoning & Math Shortcut Wizard" on MUQABIL. Specialize in speed arithmetic, percentage shortcuts, ratio & proportions, time-speed-distance, algebraic equations, LCM/HCF, geometry, and probability. Always show the conventional formula alongside a 10-second mental shortcut.`,
  },
  'pedagogy-coach': {
    name: 'Teaching License & Pedagogy Specialist',
    taskType: 'general',
    defaultModel: 'gemini-3.8-flash',
    systemInstruction: `You are the "Teaching License & Pedagogy Specialist" on MUQABIL. Specialize in Sindh Teaching License examinations, PST, JEST, SST, Child Development, Bloom's Revised Taxonomy, Classroom Management, Lesson Planning, Formative/Summative Assessment, and Inclusive Education.`,
  },
};

export default async function handler(request: ApiRequest, response: ApiResponse) {
  // Allow GET request for health check and endpoint info
  if (request.method === 'GET') {
    return response.status(200).json({
      status: 'ok',
      endpoint: '/api/chat',
      supportedMethods: ['POST', 'GET'],
      models: ['gemini-3.8-flash', 'gemini-3.1-pro-preview', 'gemini-3.1-flash-lite'],
      roles: Object.keys(ROLES),
    });
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  // Safe parsing of request body on serverless runtime
  let parsedBody = request.body;
  if (typeof parsedBody === 'string') {
    try {
      parsedBody = JSON.parse(parsedBody);
    } catch {
      parsedBody = {};
    }
  }

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
  } = parsedBody || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return response.status(400).json({ error: 'Messages array is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(200).json({
      fallback: true,
      reply: 'The server GEMINI_API_KEY is currently unconfigured in Vercel environment variables. Please add GEMINI_API_KEY in your Vercel Project Settings > Environment Variables, or continue practicing questions and past papers in the platform modules while AI cloud connectivity is established.',
      model: 'offline-knowledge-engine',
    });
  }

  const activeRole = ROLES[roleId] || ROLES['general-mentor'];
  const roleInstruction = customInstruction || activeRole.systemInstruction;
  const voiceInstruction = mode === 'voice'
    ? '\n[VOICE INTERACTION MODE ACTIVE]: Respond in conversational, spoken-friendly sentences without large code blocks or markdown tables.'
    : '';
  const candidateContext = userContext ? `\n[Candidate Profile]: Target Exam: ${userContext.targetExam || 'STS BPS-05 to 15'}, Province: ${userContext.province || 'Sindh'}.` : '';
  const fullSystemInstruction = `${BASE_SYSTEM_PROMPT}\n\n[ACTIVE ROLE: ${activeRole.name}]\n${roleInstruction}${voiceInstruction}${candidateContext}`;

  const lastUserMsg = messages.filter((m) => m.role === 'user').slice(-1)[0]?.content?.toLowerCase() || '';
  const isComplex = /\b(solve step-by-step|derive|mathematical proof|calculus|pedagogy|bloom|piaget|vygotsky|constitutional article|deep reasoning|trap analysis)\b/.test(lastUserMsg) || lastUserMsg.length > 400;
  const isFast = /\b(quick|rapid|drill|flashcard|synonym|antonym|fast|instant|meaning of|define in one line)\b/.test(lastUserMsg);

  // Model determination:
  let targetModel: string = 'gemini-3.8-flash';
  if (requestedModel && ['gemini-3.1-pro-preview', 'gemini-3.8-flash', 'gemini-3.1-flash-lite'].includes(requestedModel)) {
    targetModel = requestedModel;
  } else if (taskType === 'complex' || roleId === 'complex-solver' || roleId === 'math-wizard' || isComplex) {
    targetModel = 'gemini-3.1-pro-preview';
  } else if (taskType === 'fast' || roleId === 'rapid-drill' || isFast) {
    targetModel = 'gemini-3.1-flash-lite';
  } else {
    targetModel = 'gemini-3.8-flash';
  }

  const candidateModels = [
    targetModel,
    ...(targetModel !== 'gemini-3.8-flash' ? ['gemini-3.8-flash'] : []),
    ...(targetModel !== 'gemini-3.1-flash-lite' ? ['gemini-3.1-flash-lite'] : []),
  ];

  const conversationHistory = messages.slice(-16).map((m, idx, arr) => {
    const isLast = idx === arr.length - 1;
    const parts: any[] = [];
    if (isLast && m.role === 'user' && imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+]+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType: imageMimeType || 'image/jpeg',
          data: cleanBase64,
        },
      });
    }
    parts.push({ 
      text: m.content || (imageBase64 ? 'Please analyze this exam question from the attached image, determine the correct answer, and explain why.' : '') 
    });
    return {
      role: m.role === 'user' ? 'user' : 'model',
      parts,
    };
  });

  const needsSearch = enableSearchGrounding || /\b(current|latest|recent|news|update|who is the current|chief justice|governor|prime minister|2025|2026)\b/i.test(lastUserMsg);

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    let lastError: string | null = null;
    for (const modelToTry of candidateModels) {
      try {
        const tools = (needsSearch && (modelToTry === 'gemini-3.8-flash' || modelToTry === 'gemini-3.1-flash-lite')) 
          ? [{ googleSearch: {} }] 
          : undefined;

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
        const candidate = genResponse.candidates?.[0] as any;
        const groundingChunks = candidate?.groundingMetadata?.groundingChunks;
        const groundingSources: Array<{ title: string; url: string }> = [];
        if (Array.isArray(groundingChunks)) {
          for (const c of groundingChunks) {
            if (c.web?.uri) {
              groundingSources.push({
                title: c.web.title || 'Web Reference',
                url: c.web.uri,
              });
            }
          }
        }

        if (groundingSources.length > 0) {
          reply += `\n\n<<<GROUNDING_SOURCES: ${JSON.stringify(groundingSources.slice(0, 5))}>>>`;
        }

        return response.status(200).json({
          reply,
          model: modelToTry,
          roleId,
          roleName: activeRole.name,
          taskType: activeRole.taskType,
          groundingSources: groundingSources.slice(0, 5),
          fallback: false,
        });
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : String(err);
        continue;
      }
    }

    return response.status(200).json({
      fallback: true,
      reply: `### Study Guidance (${activeRole.name})\n\nFocus on syllabus weightage and key concepts across English, Math, and General Knowledge. Practice with the timed test simulator in the **Past Papers** tab.\n\n*(Diagnostic: ${lastError || 'Service temporarily busy'})*`,
      model: 'fallback-intelligence',
      error: lastError,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return response.status(500).json({ error: msg, fallback: true });
  }
}
