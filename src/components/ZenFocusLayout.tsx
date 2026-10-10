import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLayout } from '../context/LayoutContext';
import { NavigationTab } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Search, 
  Bookmark, 
  Sun, 
  Moon, 
  Layout, 
  Minimize2, 
  ArrowLeft, 
  Type,
  Clock,
  Sparkles,
  BookOpen,
  Trophy,
  FileText,
  BookMarked,
  Globe2,
  FileText as TechPdfIcon
} from 'lucide-react';
import { LayoutButton } from './LayoutButton';
import { TechnicalDetailsModal } from './TechnicalDetailsModal';

interface ZenFocusLayoutProps {
  children: React.ReactNode;
}

export const ZenFocusLayout: React.FC<ZenFocusLayoutProps> = ({ children }) => {
  const { 
    tab, 
    setTab, 
    userProfile, 
    darkMode, 
    toggleDarkMode, 
    setSearchOpen 
  } = useApp();

  const { 
    setShellLayout, 
    setLayoutModalOpen, 
    fontSize, 
    setFontSize, 
    getContainerClass, 
    getContentSpacingClass 
  } = useLayout();

  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [techModalOpen, setTechModalOpen] = useState(false);

  useEffect(() => {
    let interval: number | undefined;
    if (timerRunning) {
      interval = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getModuleLabel = () => {
    switch (tab) {
      case 'mcqs': return 'MCQs Bank';
      case 'quiz': return 'Exam Simulator';
      case 'past-papers': return 'Past Papers';
      case 'study-notes': return 'Study Notes';
      case 'current-affairs': return 'Current Affairs 2026';
      case 'learning-lab': return 'AI Learning Lab';
      case 'ai-chat': return 'Gemini AI Tutor';
      default: return 'Study Session';
    }
  };

  const cycleFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
    else setFontSize('normal');
  };

  const quickNavTabs: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'mcqs', label: 'MCQs', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'quiz', label: 'CBT Exam', icon: <Trophy className="w-3.5 h-3.5" /> },
    { id: 'past-papers', label: 'Papers', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'study-notes', label: 'Notes', icon: <BookMarked className="w-3.5 h-3.5" /> },
    { id: 'current-affairs', label: 'Current Affairs', icon: <Globe2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 dark:bg-slate-950/70 text-slate-900 dark:text-slate-100 transition-colors duration-300 w-full relative">
      
      {/* Subtle Top Escape Pill & Navigation Bar */}
      <div className="sticky top-2 z-40 mx-auto px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3 text-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-bold text-slate-800 dark:text-slate-200">
          Zen Focus Mode • {getModuleLabel()}
        </span>

        {/* Quick Nav Chips */}
        <div className="hidden md:flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-700 pl-3">
          {quickNavTabs.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                tab === item.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="border-l border-slate-200 dark:border-slate-700 pl-2 flex items-center gap-1.5">
          <button
            onClick={() => setShellLayout('standard')}
            className="text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold text-[11px] cursor-pointer"
            title="Exit Zen Focus Mode"
          >
            Exit Zen
          </button>
        </div>
      </div>

      {/* Main Study Canvas */}
      <main className={`flex-1 relative z-10 w-full pb-28 pt-4 ${getContainerClass()} ${getContentSpacingClass()}`}>
        {children}
      </main>

      {/* Floating Glass Bottom Command Hub */}
      <aside aria-label="Zen study controls" className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-2 border-emerald-500/40 shadow-2xl shadow-slate-950/50 text-xs font-bold text-slate-700 dark:text-slate-200">
          
          {/* Live Study Stopwatch */}
          <div className="flex items-center gap-1.5 pl-2 pr-1 text-emerald-700 dark:text-emerald-400 font-mono text-xs sm:text-sm font-black">
            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{formatTimer(seconds)}</span>
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition cursor-pointer"
              title={timerRunning ? 'Pause Timer' : 'Resume Timer'}
            >
              {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                setTimerRunning(false);
                setSeconds(0);
              }}
              className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition cursor-pointer"
              title="Reset Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Quick Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Search MCQs (⌘K)"
          >
            <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </button>

          {/* Saved Bookmarks */}
          <button
            onClick={() => setTab('bookmarks')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Saved Bookmarks"
          >
            <Bookmark className="w-4 h-4 text-amber-500" />
            <span className="text-[11px] font-bold">{userProfile.bookmarks.length}</span>
          </button>

          {/* Font Scaler */}
          <button
            onClick={cycleFontSize}
            className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title={`Font Size: ${fontSize.toUpperCase()} (Click to toggle)`}
          >
            <Type className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold">{fontSize}</span>
          </button>

          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Technical Details PDF button */}
          <button
            onClick={() => setTechModalOpen(true)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer text-emerald-600 dark:text-emerald-400"
            title="Technical Details & Architecture Manual (PDF)"
          >
            <TechPdfIcon className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Layout Switcher Trigger */}
          <button
            onClick={() => setLayoutModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xs transition cursor-pointer"
            title="Switch Layout or Exit Zen Mode"
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Layouts</span>
          </button>

        </div>
      </aside>

      {/* Technical Details Modal */}
      <TechnicalDetailsModal 
        isOpen={techModalOpen} 
        onClose={() => setTechModalOpen(false)} 
      />

    </div>
  );
};
