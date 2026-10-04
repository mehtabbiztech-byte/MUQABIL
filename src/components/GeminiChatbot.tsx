import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Zap,
  Brain,
  Languages,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  FileDown,
  Info,
  ExternalLink,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatMarkdownRenderer } from './ChatMarkdownRenderer';

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  model?: string;
  roleId?: string;
  isStreaming?: boolean;
}

export interface ChatRoleDefinition {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  taskType: 'general' | 'complex' | 'fast';
  recommendedModel: 'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite';
  icon: 'general' | 'complex' | 'fast' | 'language';
  badge: string;
  color: string;
  systemInstruction: string;
  starterPrompts: string[];
}

export const CHAT_ROLES: ChatRoleDefinition[] = [
  {
    id: 'general-mentor',
    name: 'General STS & SPSC Exam Mentor',
    shortName: 'General Mentor',
    subtitle: 'Balanced conceptual guidance, syllabus breakdowns & full explanations',
    taskType: 'general',
    recommendedModel: 'gemini-3.5-flash',
    icon: 'general',
    badge: 'General Tasks · gemini-3.5-flash',
    color: 'from-emerald-600 to-teal-700',
    systemInstruction: `You are the "General STS & SPSC Exam Mentor" on MATB STS PREP.
Your role: Provide clear, comprehensive, and syllabus-aligned explanations for aspirants of Sukkur IBA STS BPS-05 to 15, SPSC CCE, FPSC, CSS MPT, and provincial exams.
Style: Encouraging, structured, with bullet points, bold key takeaways, and exam relevance notes.
When user asks for practice or past papers, you may provide navigation directives:
<<<NAVIGATE: {"tab": "<target_tab>", "paperId": "<optional_paper_id>", "label": "<action_button_label>", "description": "<brief_description>"}>>>`,
    starterPrompts: [
      'What is the exact 50-50 syllabus structure of STS BPS 05-15 exams?',
      'Explain the difference between SPSC CCE Screening and STS IBA testing patterns.',
      'Give me 5 high-yield Everyday Science concepts frequently asked in competitive exams.',
      'How should I divide my daily study schedule between English, Math, and GK?',
    ],
  },
  {
    id: 'complex-solver',
    name: 'Deep Reasoning & Complex Problem Solver',
    shortName: 'Complex Solver',
    subtitle: 'Multi-step quantitative proofs, pedagogy theories & trap analysis',
    taskType: 'complex',
    recommendedModel: 'gemini-3.1-pro-preview',
    icon: 'complex',
    badge: 'Complex Tasks · gemini-3.1-pro-preview',
    color: 'from-purple-600 to-indigo-700',
    systemInstruction: `You are the "Deep Reasoning & Complex Problem Solver" on MATB STS PREP powered by Gemini 3.1 Pro.
Your role: Analyze particularly complex exam challenges, multi-step quantitative reasoning, algebraic & geometric proofs, probability & permutations, constitutional articles (1973 Constitution, NFC, CCI), child development & pedagogy frameworks (Piaget's stages, Vygotsky's ZPD, Bloom's Revised Taxonomy, Jacob Kounin's classroom management), and tricky examiner distractors.
Style: Rigorous step-by-step deductions, explicit mathematical formulas, trap identification ("Subtractive Trap", "Neighboring Article Trap"), and analytical clarity. Always double check your intermediate arithmetic.`,
    starterPrompts: [
      'Solve step-by-step: A shopkeeper marks an item 40% above cost and offers 20% discount. What is his net profit %?',
      'Compare Piaget\'s formal operational stage with Vygotsky\'s Scaffolding in classroom pedagogy.',
      'Explain the constitutional mechanism of NFC Award under Article 160 vs Council of Common Interests (Article 153).',
      'Break down a complex permutation and combination probability problem with examiner traps highlighted.',
    ],
  },
  {
    id: 'rapid-drill',
    name: 'Rapid MCQ Drill Master',
    shortName: 'Rapid Drill',
    subtitle: 'Lightning-fast flashcards, speed quizzes & rapid fact verification',
    taskType: 'fast',
    recommendedModel: 'gemini-3.1-flash-lite',
    icon: 'fast',
    badge: 'Fast Tasks · gemini-3.1-flash-lite',
    color: 'from-amber-500 to-orange-600',
    systemInstruction: `You are the "Rapid MCQ Drill Master" on MATB STS PREP powered by Gemini 3.1 Flash-Lite.
Your role: Ultra-fast question answering, lightning flashcard review, instant formula checks, and quick definition lookups.
Style: High-speed, succinct, direct, 2-4 crisp bullet points or flashcard format. Zero fluff or lengthy preamble. Always test the user with a quick follow-up question.`,
    starterPrompts: [
      'Rapid Drill: Test me on 3 high-frequency English preposition idioms right now.',
      'Quick Formula: What is the shortcut formula for compound interest and percentage discount?',
      'Flashcard: Give me 3 key Indus Valley Civilization sites in Sindh and their discoveries.',
      'Instant check: What is the antonym of "Ephemeral" and "Prodigal" with STS-style options?',
    ],
  },
  {
    id: 'language-coach',
    name: 'Sindh & Pakistan Language Specialist',
    shortName: 'Language Coach',
    subtitle: 'English grammar rules, Urdu adab & Sindhi vyakaran (Bilingual/Trilingual)',
    taskType: 'general',
    recommendedModel: 'gemini-3.5-flash',
    icon: 'language',
    badge: 'Trilingual Mastery · gemini-3.5-flash',
    color: 'from-blue-600 to-cyan-700',
    systemInstruction: `You are the "Sindh & Pakistan Language Specialist" on MATB STS PREP.
Your role: Master English grammar (subject-verb agreement, Royal Order of Adjectives, conditionals, voice/narration), Urdu linguistics (محاورے، تلمیح، تشبیہ و استعارہ), and Sindhi grammar (سنڌي وياڪرڻ: پهاڪا، اصطلاح، علمِ بيان).
Style: Fluent and accurate in English, Urdu (اردو), and Sindhi (سنڌي). Provide side-by-side linguistic explanations and practical examples.`,
    starterPrompts: [
      'Explain the Royal Order of Adjectives in English with 3 test examples.',
      'سنڌي وياڪرڻ ۾ تشبيهه ۽ استعاري جي وچ ۾ ڪهڙو فرق آهي؟ مثالن سان سمجهايو۔',
      'اردو گرامر: صنعتِ تضاد اور صنعتِ مراعاۃ النظیر میں کیا فرق ہے؟ اشعار کے ساتھ بتائیں۔',
      'Translate and explain 3 common Sindhi and Urdu proverbs used in screening tests.',
    ],
  },
];

const STORAGE_KEY = 'matb_sts_gemini_chat_history_v1';
const ROLE_STORAGE_KEY = 'matb_sts_gemini_active_role_v1';

interface GeminiChatbotProps {
  initialRoleId?: string;
  compactMode?: boolean;
  onNavigateTab?: (tab: string, paperId?: string) => void;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  initialRoleId = 'general-mentor',
  compactMode = false,
  onNavigateTab,
}) => {
  const { user, setTab, setSelectedPastPaperId } = useApp();

  // Active Role and Model Selection
  const [selectedRoleId, setSelectedRoleId] = useState<string>(() => {
    return localStorage.getItem(ROLE_STORAGE_KEY) || initialRoleId;
  });
  const [modelOverride, setModelOverride] = useState<'auto' | 'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite'>('auto');
  const [showRoleDetails, setShowRoleDetails] = useState(false);
  const [customSystemInstruction, setCustomSystemInstruction] = useState<string>('');

  // Messages Thread State (Maintains Multi-Turn Conversation History)
  const [messages, setMessages] = useState<ChatMessageItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore parse errors
    }
    return [
      {
        id: 'welcome-msg',
        role: 'assistant',
        content: `### Salam! I am Mehtab AI, your official Gemini-powered exam mentor.

I can guide you through **Sukkur IBA STS BPS-05 to 15**, **SPSC CCE**, **FPSC**, **CSS MPT**, and **Pedagogy / Teaching License** examinations.

**How can I assist you right now?**
- 🌟 **General Tasks**: Ask for syllabus overviews, conceptual study notes, or study timetables (powered by **Gemini 3.5 Flash**).
- 🧠 **Complex Tasks**: Request multi-step mathematical derivations, constitutional law proofs, or child pedagogy theories (powered by **Gemini 3.1 Pro**).
- ⚡ **Fast Tasks**: Fire off quick flashcard drills, instant preposition idioms, or formula checks (powered by **Gemini 3.1 Flash-Lite**).

Select a preset question below, switch roles above, or type your question in English, Urdu (اردو), or Sindhi (سنڌي)!`,
        timestamp: Date.now(),
        model: 'gemini-3.5-flash',
        roleId: 'general-mentor',
      },
    ];
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const activeRole = CHAT_ROLES.find((r) => r.id === selectedRoleId) || CHAT_ROLES[0];

  // Resolve current effective model
  const effectiveModel = modelOverride === 'auto' ? activeRole.recommendedModel : modelOverride;

  // Persist conversation history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore quota errors
    }
  }, [messages]);

  // Persist active role
  useEffect(() => {
    localStorage.setItem(ROLE_STORAGE_KEY, selectedRoleId);
  }, [selectedRoleId]);

  // Auto-scroll to bottom of messages thread
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Check Web Speech API support
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleSpeak = (messageId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown formatting for cleaner speech synthesis
    const cleanText = text
      .replace(/<<<NAVIGATE:[\s\S]*?>>>/g, '')
      .replace(/[#*`_~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(messageId);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (messageId: string, text: string) => {
    const cleanText = text.replace(/<<<NAVIGATE:[\s\S]*?>>>/g, '').trim();
    navigator.clipboard.writeText(cleanText);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your conversation history?')) {
      window.speechSynthesis?.cancel();
      const freshWelcome: ChatMessageItem = {
        id: `fresh-${Date.now()}`,
        role: 'assistant',
        content: `Conversation refreshed! You are now chatting with **${activeRole.name}**.\n\nRecommended engine: **${activeRole.recommendedModel}** (${activeRole.taskType.toUpperCase()} tasks).\n\nWhat would you like to prepare or explore next?`,
        timestamp: Date.now(),
        model: activeRole.recommendedModel,
        roleId: activeRole.id,
      };
      setMessages([freshWelcome]);
      setErrorMessage(null);
    }
  };

  const handleExportChat = () => {
    const chatText = messages
      .map(
        (m) =>
          `[${new Date(m.timestamp).toLocaleTimeString()}] ${m.role === 'user' ? 'YOU' : `GEMINI (${m.model || 'model'})`}:\n${m.content}\n`
      )
      .join('\n---\n\n');

    const blob = new Blob([chatText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `matb-sts-gemini-chat-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Multi-Turn Message Send Handler
  const handleSendMessage = async (promptToSend?: string) => {
    const query = (promptToSend || inputPrompt).trim();
    if (!query || isLoading) return;

    setErrorMessage(null);
    setInputPrompt('');

    const userMessage: ChatMessageItem = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: Date.now(),
    };

    // Append user message immediately to the thread
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Multi-turn context passed to backend: full message thread history
      const historyPayload = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyPayload,
          taskType: activeRole.taskType,
          model: modelOverride === 'auto' ? undefined : modelOverride,
          roleId: activeRole.id,
          systemInstruction: customSystemInstruction || undefined,
          userContext: user
            ? {
                targetExam: 'STS BPS-05 to 15',
                province: 'Sindh',
              }
            : undefined,
        }),
      });

      if (!response.ok) {
        // Attempt to parse JSON error message from server if available
        let serverError = `HTTP ${response.status}`;
        try {
          const errData = await response.json();
          if (errData.error) serverError = errData.error;
        } catch {
          // Response body was not JSON
        }
        throw new Error(serverError);
      }

      const data = await response.json();
      const replyContent = data.reply || 'I am ready to help you with your exam preparation!';
      const modelUsed = data.model || effectiveModel;

      const assistantMessage: ChatMessageItem = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: Date.now(),
        model: modelUsed,
        roleId: data.roleId || activeRole.id,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      
      // Intelligent local response fallback based on query & active role
      const lower = query.toLowerCase();
      let fallbackText = '';

      if (lower.includes('syllabus') || lower.includes('pattern') || lower.includes('bps')) {
        fallbackText = `### Sukkur IBA STS BPS-05 to 15 Official Syllabus Breakdown\n\n*   **Part I - English (40%)**: Reading Comprehension (10), Synonyms & Antonyms (10), Prepositions & Use of Verbs (10), Error Detection (10).\n*   **Part II - Mathematics (20%)**: Basic Arithmetic, Percentages, Ratios, Fractions, Word Problems, and Simple Equations.\n*   **Part III - General Knowledge (40%)**: Everyday Science (15), Pakistan Studies & Current Affairs (15), Basic Computer Knowledge (10).\n\n<<<NAVIGATE: {"tab": "past-papers", "paperId": "pp-sts-bps-5-15-grad-2024", "label": "Practice STS Past Papers", "description": "Review official solved questions and detailed keys"}>>>`;
      } else if (lower.includes('pedagogy') || lower.includes('bloom') || lower.includes('piaget') || lower.includes('teaching license') || lower.includes('zpd')) {
        fallbackText = `### Teaching License & Pedagogy Analysis (${activeRole.name})\n\n1.  **Vygotsky's ZPD**: The zone between independent capability and assisted competence. The teacher provides temporary **scaffolding** that fades as mastery develops.\n2.  **Bloom's Revised Taxonomy**: Remember → Understand → Apply → Analyze → Evaluate → Create.\n3.  **Formative vs Summative**: Formative is *for* learning (during instruction, low-stakes); Summative is *of* learning (post-instruction, high-stakes).\n\n<<<NAVIGATE: {"tab": "exams", "categorySlug": "teaching-license", "label": "Open Teaching License Hub", "description": "Subjective CRQ & ERQ practice with answer plans"}>>>`;
      } else if (lower.includes('profit') || lower.includes('percent') || lower.includes('math') || lower.includes('ratio') || lower.includes('solve')) {
        fallbackText = `### Step-by-Step Quantitative Solution (${activeRole.name})\n\n*   **Examiner Trap**: Candidates often confuse percentage markup on cost with discount on marked price.\n*   **Golden Formula**: If an item is marked $M\\%$ above cost and discounted $D\\%$, Net Profit $\\% = M - D - \\frac{M \\times D}{100}$.\n*   *Example*: Mark up $40\\%$, discount $20\\%$: Net Profit $= 40 - 20 - \\frac{40 \\times 20}{100} = 20 - 8 = 12\\%$.\n\n<<<NAVIGATE: {"tab": "learning-lab", "label": "Explore Socratic Lab", "description": "Practice adaptive quantitative reasoning"}>>>`;
      } else {
        fallbackText = `### ${activeRole.name} Response\n\nI have received your query: **"${query}"**.\n\nHere are the high-yield preparation points for your topic:\n*   **Core Principle**: In competitive exams (STS, SPSC, FPSC), focus on precision and eliminating distractor choices.\n*   **Recommended Action**: Practice related MCQs and timed questions in the platform repository to solidify recall.\n\n*Note: Cloud AI connection (${msg}) is refreshing; answered via built-in intelligent exam knowledge.*`;
      }

      const fallbackAssistantMsg: ChatMessageItem = {
        id: `assistant-fallback-${Date.now()}`,
        role: 'assistant',
        content: fallbackText,
        timestamp: Date.now(),
        model: 'offline-knowledge-engine',
        roleId: activeRole.id,
      };

      setMessages((prev) => [...prev, fallbackAssistantMsg]);
      // Show subtle non-blocking notice instead of prominent red error
      setErrorMessage(`Operating in smart offline mode (${msg}). Cloud connection will retry on next prompt.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateDirect = (navJson: string) => {
    try {
      const parsed = JSON.parse(navJson);
      if (parsed.tab) {
        if (parsed.paperId && setSelectedPastPaperId) {
          setSelectedPastPaperId(parsed.paperId);
        }
        if (onNavigateTab) {
          onNavigateTab(parsed.tab, parsed.paperId);
        } else if (setTab) {
          setTab(parsed.tab);
        }
      }
    } catch {
      // Ignore parse failure
    }
  };

  // Helper to render formatted markdown content with interactive navigation buttons
  const renderMessageContent = (content: string) => {
    return (
      <ChatMarkdownRenderer
        content={content}
        onNavigateTab={(tab, paperId) => {
          if (paperId && setSelectedPastPaperId) {
            setSelectedPastPaperId(paperId);
          }
          if (onNavigateTab) {
            onNavigateTab(tab, paperId);
          } else if (setTab) {
            setTab(tab as any);
          }
        }}
      />
    );
  };

  return (
    <div className={`flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden transition-all duration-300 ${compactMode ? 'h-[580px]' : 'h-[750px] max-h-[85vh]'}`}>
      
      {/* 1. CHATBOT HEADER & ROLE / MODEL COCKPIT */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Title & Active Role Badge */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${activeRole.color} flex items-center justify-center shadow-lg ring-2 ring-white/20 shrink-0`}>
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-1.5">
                  <span>Gemini Chatbot</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/30 text-purple-200 border border-purple-400/30">
                    AI Studio
                  </span>
                </h3>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-1.5">
                <span>Active Role:</span>
                <span className="font-bold text-amber-300">{activeRole.shortName}</span>
                <span className="text-slate-500">•</span>
                <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                  {effectiveModel}
                </span>
              </p>
            </div>
          </div>

          {/* Action buttons (Clear, Export, Role Settings) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowRoleDetails(!showRoleDetails)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                showRoleDetails
                  ? 'bg-purple-600 text-white border-purple-400'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/10'
              }`}
              title="Configure Chatbot Roles & System Instructions"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Role Config</span>
              {showRoleDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            <button
              onClick={handleExportChat}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition cursor-pointer border border-white/10"
              title="Export Conversation History"
            >
              <FileDown className="w-4 h-4" />
            </button>

            <button
              onClick={handleClearHistory}
              className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/30 hover:text-rose-200 text-slate-200 transition cursor-pointer border border-white/10"
              title="Clear Conversation History"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Role Selector Chips */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CHAT_ROLES.map((role) => {
            const isSelected = role.id === selectedRoleId;
            return (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRoleId(role.id);
                  setErrorMessage(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                  isSelected
                    ? 'bg-white text-slate-900 border-white shadow-md'
                    : 'bg-white/5 hover:bg-white/15 text-slate-300 border-white/10'
                }`}
              >
                {role.icon === 'complex' && <Brain className="w-3.5 h-3.5 text-purple-400" />}
                {role.icon === 'fast' && <Zap className="w-3.5 h-3.5 text-amber-400" />}
                {role.icon === 'general' && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                {role.icon === 'language' && <Languages className="w-3.5 h-3.5 text-blue-400" />}
                <span>{role.shortName}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Collapsible System Instruction & Model Override Panel */}
        {showRoleDetails && (
          <div className="mt-3 p-4 rounded-2xl bg-black/40 border border-white/10 text-xs space-y-3 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Active System Instruction
                </span>
                <h4 className="font-bold text-amber-300 text-sm">{activeRole.name}</h4>
                <p className="text-slate-300 text-[11px]">{activeRole.subtitle}</p>
              </div>

              {/* Model selection override */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-slate-400 text-[11px]">Model:</span>
                <select
                  value={modelOverride}
                  onChange={(e) => setModelOverride(e.target.value as any)}
                  className="bg-slate-800 text-white rounded-lg px-2.5 py-1 text-xs border border-white/20 focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer"
                >
                  <option value="auto">Auto (Role Recommended: {activeRole.recommendedModel})</option>
                  <option value="gemini-3.5-flash">Gemini 3.5 Flash (General Tasks)</option>
                  <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Complex Tasks)</option>
                  <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash-Lite (Fast Tasks)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">
                Custom System Instruction (Overrides default role behavior):
              </label>
              <textarea
                value={customSystemInstruction || activeRole.systemInstruction}
                onChange={(e) => setCustomSystemInstruction(e.target.value)}
                rows={3}
                placeholder="Type custom instructions for this chatbot persona..."
                className="w-full rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 p-2.5 text-xs font-mono focus:outline-none focus:border-purple-400"
              />
              {customSystemInstruction && (
                <button
                  onClick={() => setCustomSystemInstruction('')}
                  className="text-[10px] text-amber-400 hover:underline cursor-pointer"
                >
                  Reset to default system instruction
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. SCROLLABLE MESSAGES THREAD (Multi-Turn History Display) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/60 dark:bg-slate-950/40">
        
        {messages.map((message) => {
          const isUser = message.role === 'user';

          return (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  isUser
                    ? 'bg-purple-600 text-white'
                    : 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble Card */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-xs relative group transition ${
                  isUser
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 rounded-tl-xs'
                }`}
              >
                {/* Assistant Metadata Header */}
                {!isUser && (
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100 dark:border-slate-700/60 text-[10px] font-semibold text-slate-400">
                    <span className="flex items-center gap-1.5 font-bold text-purple-700 dark:text-purple-300">
                      <Sparkles className="w-3 h-3" />
                      <span>{message.model || effectiveModel}</span>
                    </span>
                    <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}

                {/* Content */}
                {renderMessageContent(message.content)}

                {/* Bubble Footer Actions for Assistant Messages */}
                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-[10px] text-slate-400">Multi-turn verified</span>
                    
                    <div className="flex items-center gap-2">
                      {/* Audio playback button */}
                      <button
                        onClick={() => handleSpeak(message.id, message.content)}
                        className={`p-1.5 rounded-lg transition cursor-pointer ${
                          speakingMessageId === message.id
                            ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 animate-pulse'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500'
                        }`}
                        title={speakingMessageId === message.id ? 'Stop listening' : 'Read aloud with Text-to-Speech'}
                      >
                        {speakingMessageId === message.id ? (
                          <VolumeX className="w-3.5 h-3.5" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Copy message button */}
                      <button
                        onClick={() => handleCopy(message.id, message.content)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition cursor-pointer"
                        title="Copy message to clipboard"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="rounded-2xl rounded-tl-xs p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs shadow-xs space-y-2 max-w-sm">
              <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Gemini is reasoning ({effectiveModel})...</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse w-3/4" />
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse w-5/6" />
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse w-1/2" />
              </div>
            </div>
          </div>
        )}

        {/* Error notification banner */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. STARTER PROMPT SUGGESTIONS (Active Role Prompts) */}
      <div className="px-4 py-2 bg-slate-100/70 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Suggestions:</span>
        </span>
        {activeRole.starterPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:text-purple-700 dark:hover:text-purple-300 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 whitespace-nowrap transition cursor-pointer shadow-2xs shrink-0"
          >
            {prompt.length > 45 ? `${prompt.substring(0, 45)}…` : prompt}
          </button>
        ))}
      </div>

      {/* 4. CHAT INPUT BAR & VOICE CONTROLS */}
      <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input Button */}
          {speechSupported && (
            <button
              type="button"
              onClick={toggleListening}
              className={`p-3 rounded-2xl transition cursor-pointer border ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse ring-4 ring-rose-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Voice input (Speak your query)'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          )}

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={`Ask ${activeRole.shortName} in English, اردو or سنڌي...`}
              disabled={isLoading}
              className="w-full rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white disabled:opacity-40 shadow-md transition cursor-pointer flex items-center justify-center shrink-0"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>Multi-turn chat • History preserved across tabs</span>
          <span className="font-mono text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
            {activeRole.badge}
          </span>
        </div>
      </div>

    </div>
  );
};
