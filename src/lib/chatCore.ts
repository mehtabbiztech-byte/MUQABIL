/**
 * Shared AI chat core — single source of truth for both runtimes
 * (the Express server in `server.ts` and the Vercel handler in `api/chat.ts`).
 *
 * Keeping roles, the base system prompt and model routing here prevents the
 * two runtimes from drifting apart.
 */

export type TaskType = 'general' | 'complex' | 'fast';

export interface ChatbotRole {
  id: string;
  name: string;
  subtitle: string;
  taskType: TaskType;
  recommendedModel: string;
  systemInstruction: string;
  starterPrompts: string[];
}

/** Every Gemini model id this platform may call. The allowlist is enforced
 *  server-side so clients cannot request arbitrary models. */
export const ALLOWED_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.5-flash',
  'gemini-3.1-pro-preview',
  'gemini-3.1-flash-lite',
] as const;

/** Models that support the Google Search grounding tool in this deployment. */
export const SEARCH_GROUNDING_MODELS = new Set<string>([
  'gemini-3.8-flash',
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
]);

export const CHATBOT_ROLES: Record<string, ChatbotRole> = {
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
      "Compare Piaget's formal operational stage with Vygotsky's Scaffolding in classroom pedagogy.",
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
  'math-wizard': {
    id: 'math-wizard',
    name: 'Quantitative Reasoning & Math Shortcut Wizard',
    subtitle: 'Speed arithmetic, percentage shortcuts, algebra & geometry proofs',
    taskType: 'complex',
    recommendedModel: 'gemini-3.1-pro-preview',
    systemInstruction: `You are the "Quantitative Reasoning & Math Shortcut Wizard" on MUQABIL. Specialize in speed arithmetic, percentage shortcuts, ratio & proportions, time-speed-distance, algebraic equations, LCM/HCF, geometry, and probability. Always show the conventional formula alongside a 10-second mental shortcut. Highlight common trap answers examiners put in options C and D.`,
    starterPrompts: [
      'Solve in 10 seconds: A train 150m long passes a pole in 9 seconds. What is its speed in km/h?',
      'Explain the fast shortcut formula for Compound Interest vs Simple Interest difference for 2 years.',
      'How to quickly solve age word problems with ratio methods instead of lengthy equations?',
      'Give me 4 high-yield geometry formulas for circles and triangles frequently tested in STS.',
    ],
  },
  'pedagogy-coach': {
    id: 'pedagogy-coach',
    name: 'Teaching License & Pedagogy Specialist',
    subtitle: "Sindh Teaching License, Bloom's Taxonomy, Piaget, Lesson Plans & CRQs",
    taskType: 'general',
    recommendedModel: 'gemini-3.8-flash',
    systemInstruction: `You are the "Teaching License & Pedagogy Specialist" on MUQABIL. Specialize in Sindh Teaching License examinations, PST, JEST, SST, Child Development, Bloom's Revised Taxonomy, Classroom Management, Lesson Planning, Formative/Summative Assessment, and Inclusive Education.`,
    starterPrompts: [
      "Break down Bloom's Revised Taxonomy with classroom assessment verbs for STS Teaching License.",
      'Explain the difference between Formative and Summative assessment with 3 exam scenarios.',
      'How does Jacob Kounin\'s "Withitness" apply to managing multi-grade classrooms in Sindh?',
      'Provide a sample model answer for a 10-mark Constructive Response Question (CRQ) on Lesson Planning.',
    ],
  },
};

export const DEFAULT_ROLE_ID = 'general-mentor';

export function getRole(roleId: string | undefined): ChatbotRole {
  return CHATBOT_ROLES[roleId || ''] || CHATBOT_ROLES[DEFAULT_ROLE_ID];
}

export const BASE_SYSTEM_PROMPT = `You are "Mehtab AI", an advanced, universal AI assistant and official smart mentor for MUQABIL (muqabil.pk).

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
- "pp-ppsc-tehsildar-2024" -> PPSC Tehsildar & Naib Tehsildar Solved Paper
- "sts-matric-bps-5-15-2025-record" -> STS BPS-05 to 15 Matriculation Category Archive
- "sts-intermediate-bps-5-15-2026-record" -> STS BPS-05 to 15 Intermediate Category Archive
- "sts-jest-2021-official-record" -> STS JEST (BPS-14) Official Record
- "sts-pst-2021-official-record" -> STS PST (BPS-14) Official Record

Available tabs:
- "past-papers" -> Past papers repository and live test simulator
- "learning-lab" -> IRT Adaptive testing, Mistake vault, 1v1 timed practice match
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

export interface ChatMessageInput {
  role: string;
  content: string;
}

export interface GeminiPart {
  text?: string;
  inlineData?: { mimeType: string; data: string };
}

/**
 * Convert a client conversation into Gemini multi-turn contents, attaching an
 * optional image (base64) to the last user message only.
 */
export function buildConversationHistory(
  messages: ChatMessageInput[],
  imageBase64?: string,
  imageMimeType?: string
): Array<{ role: 'user' | 'model'; parts: GeminiPart[] }> {
  return messages.slice(-16).map((m, idx, arr) => {
    const isLast = idx === arr.length - 1;
    const parts: GeminiPart[] = [];
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
      text: m.content || (imageBase64 ? 'Please analyze this exam question from the attached image, determine the correct answer, and explain why.' : ''),
    });
    return {
      role: m.role === 'user' ? 'user' : 'model',
      parts,
    };
  });
}

/**
 * Decide which model should serve the request. Explicit client choices are
 * only honored when they are on the allowlist; otherwise the role/task type
 * and lightweight signal detection decide.
 */
export function resolveTargetModel(options: {
  requestedModel?: string;
  taskType?: TaskType;
  roleId?: string;
  lastUserMessage?: string;
}): string {
  const { requestedModel, taskType, roleId, lastUserMessage = '' } = options;
  const lastUserMsg = lastUserMessage.toLowerCase();
  const isComplex =
    /\b(solve step-by-step|derive|mathematical proof|calculus|algebraic proof|pedagogy|bloom|piaget|vygotsky|constitutional article|deep reasoning|trap analysis)\b/.test(lastUserMsg) ||
    lastUserMsg.length > 400;
  const isFast = /\b(quick|rapid|drill|flashcard|synonym|antonym|fast|instant|meaning of|define in one line|mcq quiz)\b/.test(lastUserMsg);

  if (requestedModel && (ALLOWED_MODELS as readonly string[]).includes(requestedModel)) {
    return requestedModel;
  }
  if (taskType === 'complex' || roleId === 'complex-solver' || roleId === 'math-wizard' || isComplex) {
    return 'gemini-3.1-pro-preview';
  }
  if (taskType === 'fast' || roleId === 'rapid-drill' || isFast) {
    return 'gemini-3.1-flash-lite';
  }
  return 'gemini-3.8-flash';
}

/**
 * Ordered fallback candidates: the chosen model first, then cheaper/faster
 * models in ascending cost order.
 */
export function candidateModelsFor(targetModel: string): string[] {
  const ordered = ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.8-flash', 'gemini-3.1-pro-preview'];
  return [targetModel, ...ordered.filter((m) => m !== targetModel)];
}

/** Heuristic: should this request try Google Search grounding? */
export function needsSearchGrounding(enableSearchGrounding: boolean, lastUserMessage: string): boolean {
  return (
    enableSearchGrounding ||
    /\b(current|latest|recent|news|update|who is the current|chief justice|governor|prime minister|2025|2026)\b/i.test(lastUserMessage)
  );
}

/** Extract web grounding sources from a Gemini generateContent response. */
export function extractGroundingSources(response: { candidates?: unknown[] } | null | undefined): Array<{ title: string; url: string }> {
  const candidate = response?.candidates?.[0] as
    | { groundingMetadata?: { groundingChunks?: Array<{ web?: { title?: string; uri?: string } }> } }
    | undefined;
  const chunks = candidate?.groundingMetadata?.groundingChunks;
  const sources: Array<{ title: string; url: string }> = [];
  if (Array.isArray(chunks)) {
    for (const chunk of chunks) {
      if (chunk?.web?.uri) {
        sources.push({ title: chunk.web.title || 'Web Reference', url: chunk.web.uri });
      }
    }
  }
  return sources;
}
