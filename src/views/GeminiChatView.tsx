import React from 'react';
import { 
  Bot, 
  Sparkles, 
  Brain, 
  Zap, 
  Languages, 
  BookOpen, 
  HelpCircle,
  ShieldCheck,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { GeminiChatbot } from '../components/GeminiChatbot';
import { useApp } from '../context/AppContext';

export const GeminiChatView: React.FC = () => {
  const { setTab, setSelectedPastPaperId } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* 1. HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 text-white p-6 sm:p-10 border border-purple-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Next-Gen Gemini Multi-Turn Intelligence</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Gemini AI Exam Mentor &amp; Reasoning Studio
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Experience multi-turn conversational exam preparation powered by Google Gemini. Switch dynamically between specialized roles and task-optimized engines: 
            <strong className="text-purple-300 font-bold"> Gemini 3.1 Pro</strong> for deep mathematical &amp; pedagogy reasoning, 
            <strong className="text-emerald-300 font-bold"> Gemini 3.8 Flash</strong> for general syllabus mentoring &amp; multimodal question OCR, and 
            <strong className="text-amber-300 font-bold"> Gemini 3.1 Flash-Lite</strong> for lightning-fast speed drills.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-xl">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Multi-Turn History</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-xl">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Multimodal Question OCR</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-xl">
              <Languages className="w-3.5 h-3.5 text-blue-400" />
              <span>English • اردو • سنڌي</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-xl">
              <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
              <span>STS, SPSC &amp; Teaching License</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. THREE-MODEL TASK MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: General Tasks */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3 relative overflow-hidden group hover:border-emerald-400/50 transition">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              General Tasks
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              gemini-3.8-flash
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              General study mentoring, syllabus breakdowns, question image OCR, and real-time Google search grounding.
            </p>
          </div>
        </div>

        {/* Card 2: Complex Tasks */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3 relative overflow-hidden group hover:border-purple-400/50 transition">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Brain className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              Complex Tasks
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              gemini-3.1-pro-preview
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Particularly complex tasks: multi-step math derivations, constitutional law articles, pedagogy frameworks &amp; examiner trap analysis.
            </p>
          </div>
        </div>

        {/* Card 3: Fast Tasks */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3 relative overflow-hidden group hover:border-amber-400/50 transition">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              Fast Tasks
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              gemini-3.1-flash-lite
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Rapid flashcard drills, high-speed vocabulary checks, quick math formulas, and instant definition lookups with zero latency.
            </p>
          </div>
        </div>

      </div>

      {/* 3. MAIN CHATBOT THREAD INTERFACE */}
      <div className="space-y-4">
        <GeminiChatbot 
          onNavigateTab={(targetTab, paperId) => {
            if (paperId && setSelectedPastPaperId) {
              setSelectedPastPaperId(paperId);
            }
            if (setTab) {
              setTab(targetTab as any);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />
      </div>

    </div>
  );
};
