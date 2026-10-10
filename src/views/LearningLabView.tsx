import React, { useMemo, useState } from 'react';
import {
  Sparkles,
  Zap,
  Bot,
  Gauge,
  Swords,
  Headphones,
  BrainCircuit,
  RotateCcw,
  CalendarClock,
  CheckCircle2,
  ShieldCheck,
  Award,
  Layers,
} from 'lucide-react';
import { SmartAdaptiveTesting } from '../components/learning-lab/SmartAdaptiveTesting';
import { AITutoringCrafting } from '../components/learning-lab/AITutoringCrafting';
import { ExamDiagnostics } from '../components/learning-lab/ExamDiagnostics';
import { CommunityCompetitive } from '../components/learning-lab/CommunityCompetitive';
import { AudioAccessibility } from '../components/learning-lab/AudioAccessibility';
import {
  SrsCard,
  dueCards,
  scheduleReview,
  RecallGrade,
  analyseAnswerHabits,
  getStoredMistakes,
} from '../lib/adaptiveLearning';
import { MCQS_DATA } from '../data/mcqsData';

type PillarTab = 'all' | 'adaptive' | 'tutoring' | 'diagnostics' | 'community' | 'audio';

const STORAGE_KEY = 'matb_learning_engine_v1';

const loadCards = (): SrsCard[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    /* fallback */
  }
  const yesterday = new Date(Date.now() - 86_400_000).toISOString();
  return MCQS_DATA.slice(0, 6).map((mcq, index) => ({
    questionId: mcq.id,
    topic: mcq.subtopic || mcq.category,
    repetitions: index % 3,
    intervalDays: index ? 3 : 1,
    easeFactor: 2.5,
    dueAt: yesterday,
    lastGrade: 3,
  }));
};

export const LearningLabView: React.FC = () => {
  const [activePillar, setActivePillar] = useState<PillarTab>('adaptive');
  const [cards, setCards] = useState<SrsCard[]>(loadCards);

  const reviews = dueCards(cards);
  const mistakes = getStoredMistakes();
  const pendingMistakes = mistakes.filter((m) => !m.mastered);

  const handleReviewCard = (questionId: string, grade: RecallGrade) => {
    const next = cards.map((card) =>
      card.questionId === questionId ? scheduleReview(card, grade) : card
    );
    setCards(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <div
      id="learning-lab-view-container"
      className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8"
    >
      {/* Hero Header */}
      <section
        id="learning-lab-hero"
        className="overflow-hidden rounded-3xl border border-indigo-400/30 bg-gradient-to-br from-slate-950 via-indigo-950 to-emerald-950 p-7 text-white shadow-xl sm:p-10 relative"
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/10 px-3.5 py-1 text-xs font-bold text-cyan-200 backdrop-blur-md">
              <Sparkles className="h-4 w-4" /> Next-Gen AI Learning & Exam Laboratory
            </div>
            <h1 className="font-display text-3xl font-black sm:text-5xl tracking-tight">
              Cognitive Exam Intelligence Suite
            </h1>
            <p className="mt-3 text-sm leading-6 text-indigo-100 sm:text-base">
              Supercharged with Item Response Theory (IRT), automated mistake quarantine, multilingual Socratic reasoning (English, Urdu, Sindhi), official cutoff predictors, and commute-mode audio flashcards.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs shrink-0">
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/15">
              <strong className="block text-2xl text-cyan-300 font-extrabold">
                {reviews.length}
              </strong>
              <span className="text-slate-300 font-medium">SRS Due</span>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/15">
              <strong className="block text-2xl text-rose-300 font-extrabold">
                {pendingMistakes.length}
              </strong>
              <span className="text-slate-300 font-medium">Quarantined</span>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/15">
              <strong className="block text-2xl text-emerald-300 font-extrabold">+1.2</strong>
              <span className="text-slate-300 font-medium">IRT Theta</span>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Pillar Navigation Tabs */}
      <div
        id="learning-lab-pillar-tabs"
        className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none"
      >
        <button
          onClick={() => setActivePillar('adaptive')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activePillar === 'adaptive'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>1. Smart Adaptive & Memory</span>
          {pendingMistakes.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-black">
              {pendingMistakes.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActivePillar('tutoring')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activePillar === 'tutoring'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>2. AI Tutoring & Question Crafting</span>
        </button>

        <button
          onClick={() => setActivePillar('diagnostics')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activePillar === 'diagnostics'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span>3. Exam Diagnostics & Forecaster</span>
        </button>

        <button
          onClick={() => setActivePillar('community')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activePillar === 'community'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Swords className="w-4 h-4" />
          <span>4. 1v1 Battle & Mnemonics</span>
        </button>

        <button
          onClick={() => setActivePillar('audio')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activePillar === 'audio'
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Headphones className="w-4 h-4" />
          <span>5. Audio & Print Sheet</span>
        </button>

        <button
          onClick={() => setActivePillar('all')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activePillar === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>All Modules</span>
        </button>
      </div>

      {/* PILLAR 1: SMART ADAPTIVE TESTING & MEMORY RETENTION */}
      {(activePillar === 'adaptive' || activePillar === 'all') && (
        <section id="pillar-adaptive-testing" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Pillar 1: Smart Adaptive Testing & Memory Retention</span>
            </h2>
            <span className="text-xs font-bold text-slate-400 hidden sm:inline">
              IRT Dynamic Difficulty • Mistake Vault • Formula Cards
            </span>
          </div>

          <SmartAdaptiveTesting />
        </section>
      )}

      {/* PILLAR 2: GENERATIVE AI TUTORING & QUESTION CRAFTING */}
      {(activePillar === 'tutoring' || activePillar === 'all') && (
        <section id="pillar-ai-tutoring" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>Pillar 2: Generative AI Tutoring & Question Crafting</span>
            </h2>
            <span className="text-xs font-bold text-slate-400 hidden sm:inline">
              Agency Exam Generator • Multilingual Socratic Chat • Trap Explainer
            </span>
          </div>

          <AITutoringCrafting />
        </section>
      )}

      {/* PILLAR 3: EXAM DIAGNOSTICS & READINESS FORECASTER */}
      {(activePillar === 'diagnostics' || activePillar === 'all') && (
        <section id="pillar-exam-diagnostics" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Gauge className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Pillar 3: Exam Diagnostics & Readiness Forecaster</span>
            </h2>
            <span className="text-xs font-bold text-slate-400 hidden sm:inline">
              Official Cut-Off Forecast • Pacing Radar • Category Heatmap
            </span>
          </div>

          <ExamDiagnostics />
        </section>
      )}

      {/* PILLAR 4: COMMUNITY & COMPETITIVE LEARNING */}
      {(activePillar === 'community' || activePillar === 'all') && (
        <section id="pillar-community-learning" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Swords className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <span>Pillar 4: Community & Competitive Learning</span>
            </h2>
            <span className="text-xs font-bold text-slate-400 hidden sm:inline">
              1v1 Practice Showdown • Academy Cohorts • Verified Mnemonics
            </span>
          </div>

          <CommunityCompetitive />
        </section>
      )}

      {/* PILLAR 5: AUDIO & ACCESSIBILITY ENHANCEMENTS */}
      {(activePillar === 'audio' || activePillar === 'all') && (
        <section id="pillar-audio-accessibility" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Headphones className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span>Pillar 5: Audio & Accessibility Enhancements</span>
            </h2>
            <span className="text-xs font-bold text-slate-400 hidden sm:inline">
              Commute Audio Mode • 1-Click Printable PDF Sheet
            </span>
          </div>

          <AudioAccessibility />
        </section>
      )}
    </div>
  );
};
