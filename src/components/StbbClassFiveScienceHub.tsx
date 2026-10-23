import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Sparkles,
  Trophy,
  HelpCircle,
  RotateCcw,
  ChevronRight,
  Layers,
  Clock,
  Compass,
  ArrowRight,
  ArrowLeft,
  X,
  Eye,
  EyeOff,
  Bookmark,
  Check,
  AlertCircle,
  Shuffle,
  Microscope
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  STBB_CLASS_5_CHAPTERS
} from '../data/stbbChaptersRegistry';
import {
  StbbDecisionResultDetail,
  StbbDecisionSpecimen
} from '../data/stbbChapterTwoMicroorganismsData';
import { useApp } from '../context/AppContext';

function formatTimer(seconds: number): string {
  const safe = Math.max(0, seconds);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const StbbClassFiveScienceHub: React.FC<{
  onClose?: () => void;
  initialTab?: 'topics' | 'key-tool' | 'mcqs' | 'summary';
  initialChapterId?: string;
}> = ({ onClose, initialTab = 'topics', initialChapterId }) => {
  const { toggleBookmark, isBookmarked, addMistake } = useApp();

  const [activeChapterId, setActiveChapterId] = useState<string>(() => {
    if (initialChapterId) return initialChapterId;
    try {
      const savedChapter = sessionStorage.getItem('matb_open_stbb_chapter');
      if (savedChapter) {
        sessionStorage.removeItem('matb_open_stbb_chapter');
        if (STBB_CLASS_5_CHAPTERS.some((c) => c.id === savedChapter)) {
          return savedChapter;
        }
      }
    } catch {
      // ignore storage errors in restricted environments
    }
    return 'ch3-seeds-germination';
  });

  const activeChapter = useMemo(() => {
    return (
      STBB_CLASS_5_CHAPTERS.find((c) => c.id === activeChapterId) ||
      STBB_CLASS_5_CHAPTERS[STBB_CLASS_5_CHAPTERS.length - 1]
    );
  }, [activeChapterId]);

  const [activeMainTab, setActiveMainTab] = useState<'topics' | 'key-tool' | 'mcqs' | 'summary'>(initialTab);

  // Topic Reader State
  const [selectedTopicId, setSelectedTopicId] = useState<number>(1);
  const activeTopic = useMemo(() => {
    return activeChapter.topics.find((t) => t.id === selectedTopicId) || activeChapter.topics[0];
  }, [activeChapter, selectedTopicId]);

  // Riddle Reveals
  const [revealedRiddles, setRevealedRiddles] = useState<Record<string, boolean>>({});

  // Unscramble Game State
  const [unscrambleInputs, setUnscrambleInputs] = useState<Record<string, string>>({});

  // Secret Code Decoder Interactive State
  const [decoderInputs, setDecoderInputs] = useState<Record<string, string>>({});
  const [revealedCodes, setRevealedCodes] = useState<Record<string, boolean>>({});

  // MCQ Practice State
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [userSelections, setUserSelections] = useState<Record<string, number>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});

  // Timed Test Mode State (40 minutes = 2400s)
  const [isTestMode, setIsTestMode] = useState<boolean>(false);
  const [testTimeLeft, setTestTimeLeft] = useState<number>(40 * 60);
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);

  // Interactive Decision Tree Simulator State
  const [currentNodeId, setCurrentNodeId] = useState<number>(1);
  const [keyHistory, setKeyHistory] = useState<
    { step: number; shortCode: string; question: string; answer: string }[]
  >([]);
  const [keyResult, setKeyResult] = useState<StbbDecisionResultDetail | null>(null);
  const [recheckMessage, setRecheckMessage] = useState<string | null>(null);
  const [selectedSpecimen, setSelectedSpecimen] = useState<{
    specimen: StbbDecisionSpecimen;
    isMystery: boolean;
  } | null>(null);

  // Live 1-second countdown ticker in Mock Exam Mode
  useEffect(() => {
    if (!isTestMode || testSubmitted) return;
    const timer = window.setInterval(() => {
      setTestTimeLeft((prev) => {
        if (prev <= 1) {
          setTestSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isTestMode, testSubmitted]);

  const handleSelectChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    setSelectedTopicId(1);
    setSelectedSection('All');
    setIsTestMode(false);
    setTestSubmitted(false);
    setTestTimeLeft(40 * 60);
    setCurrentNodeId(1);
    setKeyHistory([]);
    setKeyResult(null);
    setRecheckMessage(null);
    setSelectedSpecimen(null);
  };

  // Filtered MCQs
  const filteredMcqs = useMemo(() => {
    if (selectedSection === 'All') return activeChapter.mcqs;
    return activeChapter.mcqs.filter((m) => m.section === selectedSection);
  }, [activeChapter, selectedSection]);

  // Score calculation against full chapter bank & current filter
  const scoreStats = useMemo(() => {
    const sourceList = isTestMode ? activeChapter.mcqs : filteredMcqs;
    let answered = 0;
    let correct = 0;
    sourceList.forEach((m) => {
      if (userSelections[m.id] !== undefined) {
        answered++;
        if (userSelections[m.id] === m.correctIndex) {
          correct++;
        }
      }
    });
    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    const examGradePercent = Math.round((correct / sourceList.length) * 100);
    return {
      answered,
      correct,
      total: sourceList.length,
      accuracy,
      examGradePercent
    };
  }, [activeChapter.mcqs, filteredMcqs, isTestMode, userSelections]);

  const triggerSafeConfetti = (opts: confetti.Options) => {
    try {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        confetti(opts);
      }
    } catch {
      // ignore canvas errors in headless environments
    }
  };

  const handleSelectOption = (mcqId: string, optIndex: number, correctIndex: number) => {
    if (testSubmitted) return;
    setUserSelections((prev) => ({ ...prev, [mcqId]: optIndex }));
    if (!isTestMode) {
      setRevealedExplanations((prev) => ({ ...prev, [mcqId]: true }));
    }

    if (optIndex !== correctIndex) {
      addMistake(mcqId);
    } else if (!isTestMode) {
      triggerSafeConfetti({ particleCount: 28, spread: 55, origin: { y: 0.8 } });
    }
  };

  const handleStartTest = () => {
    setActiveMainTab('mcqs');
    setSelectedSection('All');
    setIsTestMode(true);
    setTestSubmitted(false);
    setUserSelections((prev) => {
      const next = { ...prev };
      activeChapter.mcqs.forEach((m) => {
        delete next[m.id];
      });
      return next;
    });
    setRevealedExplanations((prev) => {
      const next = { ...prev };
      activeChapter.mcqs.forEach((m) => {
        delete next[m.id];
      });
      return next;
    });
    setTestTimeLeft(40 * 60);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);
    if (scoreStats.examGradePercent >= 60) {
      triggerSafeConfetti({ particleCount: 85, spread: 90, origin: { y: 0.6 } });
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExitTest = () => {
    setIsTestMode(false);
    setTestSubmitted(false);
  };

  const handleResetChapterMcqs = () => {
    setUserSelections((prev) => {
      const next = { ...prev };
      activeChapter.mcqs.forEach((m) => {
        delete next[m.id];
      });
      return next;
    });
    setRevealedExplanations((prev) => {
      const next = { ...prev };
      activeChapter.mcqs.forEach((m) => {
        delete next[m.id];
      });
      return next;
    });
  };

  // Decision Tree Simulator Logic
  const currentDecisionNode = useMemo(() => {
    return (
      activeChapter.decisionTool.nodes.find((n) => n.id === currentNodeId) ||
      activeChapter.decisionTool.nodes[0]
    );
  }, [activeChapter.decisionTool.nodes, currentNodeId]);

  const handleKeyChoice = (choice: 'yes' | 'no') => {
    if (!currentDecisionNode) return;
    const branch = choice === 'yes' ? currentDecisionNode.onYes : currentDecisionNode.onNo;
    const answerLabel = choice === 'yes' ? 'Yes' : 'No';

    setKeyHistory((prev) => [
      ...prev,
      {
        step: currentDecisionNode.id,
        shortCode: branch.shortCode,
        question: currentDecisionNode.question,
        answer: answerLabel
      }
    ]);

    if (branch.type === 'next') {
      setRecheckMessage(null);
      setCurrentNodeId(branch.nextNodeId);
    } else if (branch.type === 'recheck') {
      setRecheckMessage(branch.message);
    } else if (branch.type === 'result') {
      setRecheckMessage(null);
      setKeyResult(branch.result);
      triggerSafeConfetti({ particleCount: 40, spread: 65, origin: { y: 0.7 } });
    }
  };

  const resetDecisionTree = (keepSpecimen = false) => {
    setCurrentNodeId(1);
    setKeyHistory([]);
    setKeyResult(null);
    setRecheckMessage(null);
    if (!keepSpecimen) {
      setSelectedSpecimen(null);
    }
  };

  const handlePickSpecimen = (specimen: StbbDecisionSpecimen, isMystery = false) => {
    setSelectedSpecimen({ specimen, isMystery });
    setCurrentNodeId(1);
    setKeyHistory([]);
    setKeyResult(null);
    setRecheckMessage(null);
  };

  const handlePickRandomMystery = () => {
    const list = activeChapter.decisionTool.specimens;
    if (!list.length) return;
    const picked = list[Math.floor(Math.random() * list.length)];
    handlePickSpecimen(picked, true);
  };

  const auditTrailSummary = useMemo(() => {
    if (!keyHistory.length) return '';
    const stepsPart = keyHistory.map((h) => h.shortCode).join(' → ');
    return keyResult ? `${stepsPart} → ${keyResult.group}` : stepsPart;
  }, [keyHistory, keyResult]);

  const getCellStyleClass = (
    style?: 'emerald' | 'teal' | 'amber' | 'rose' | 'indigo' | 'cyan' | 'bold'
  ) => {
    switch (style) {
      case 'emerald':
        return 'font-extrabold text-emerald-700 dark:text-emerald-400';
      case 'teal':
        return 'font-extrabold text-teal-700 dark:text-teal-400';
      case 'amber':
        return 'font-extrabold text-amber-700 dark:text-amber-400';
      case 'rose':
        return 'font-extrabold text-rose-600 dark:text-rose-400';
      case 'indigo':
        return 'font-extrabold text-indigo-700 dark:text-indigo-400';
      case 'cyan':
        return 'font-extrabold text-cyan-700 dark:text-cyan-400';
      case 'bold':
        return 'font-bold text-slate-900 dark:text-white';
      default:
        return 'font-medium text-slate-700 dark:text-slate-300';
    }
  };

  const renderMetricIcon = (icon: 'book' | 'check' | 'compass' | 'sparkles') => {
    switch (icon) {
      case 'book':
        return <BookOpen className="w-3.5 h-3.5 text-emerald-400" />;
      case 'check':
        return <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />;
      case 'compass':
        return <Compass className="w-3.5 h-3.5 text-cyan-400" />;
      case 'sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-rose-400" />;
    }
  };

  const displayedMcqs = isTestMode ? activeChapter.mcqs : filteredMcqs;
  const riddleStateKey = `${activeChapter.id}-${activeTopic.id}`;

  return (
    <div className="max-w-7xl mx-auto space-y-5 text-slate-900 dark:text-slate-100">
      {/* CHAPTER SWITCHER BAR (STBB CLASS 5 SCIENCE CHAPTERS) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-2">
            STBB Class 5 Chapters:
          </span>
          {STBB_CLASS_5_CHAPTERS.map((chap) => {
            const isSelected = chap.id === activeChapter.id;
            return (
              <button
                key={chap.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleSelectChapter(chap.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-sm ring-2 ring-emerald-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50'
                }`}
              >
                <span>{chap.navEmoji}</span>
                <span>{chap.shortNavLabel}</span>
                {chap.isFeaturedNew && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                    New
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60">
          Chapter {activeChapter.chapterNumber} of {STBB_CLASS_5_CHAPTERS.length} Active
        </span>
      </div>

      {/* 1. HERO HEADER BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white p-6 sm:p-10 shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-wider">
              {activeChapter.boardBadge}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
              {activeChapter.syllabusBadge}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
            {activeChapter.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            {activeChapter.heroDescription}
          </p>

          {/* 4 Quick Metric Glass Pills */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {activeChapter.quickMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs text-xs font-bold border border-white/10 flex items-center gap-1.5"
              >
                {renderMetricIcon(metric.icon)}
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button if opened in modal */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            title="Close Module"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* 2. PRIMARY 4-TAB SUB-NAVIGATION BAR + TIMED MOCK EXAM TRIGGER */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveMainTab('topics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
              activeMainTab === 'topics'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{activeChapter.tabs.topicsLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('key-tool')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
              activeMainTab === 'key-tool'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{activeChapter.tabs.toolLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('mcqs')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
              activeMainTab === 'mcqs'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>
              {activeChapter.tabs.mcqsLabel} ({filteredMcqs.length})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('summary')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
              activeMainTab === 'summary'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{activeChapter.tabs.summaryLabel}</span>
          </button>
        </div>

        {/* Always-Accessible Timed Mock Exam Trigger */}
        <div className="flex items-center gap-2 self-end sm:self-center pr-1.5">
          {!isTestMode ? (
            <button
              type="button"
              onClick={handleStartTest}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Start 40-Min Mock Exam</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveMainTab('mcqs')}
              className="px-3.5 py-2 rounded-xl bg-emerald-950 text-amber-300 border border-amber-400/40 text-xs font-black flex items-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span>Timer: {formatTimer(testTimeLeft)}</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. TAB 1: INTERACTIVE TOPICS */}
      {activeMainTab === 'topics' && (
        <div className="grid lg:grid-cols-[300px_1fr] gap-6 items-start">
          {/* Sticky Left Sidebar Navigation */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-xs space-y-2 lg:sticky lg:top-20">
            <div className="px-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-black uppercase tracking-wider text-slate-400">
              {activeChapter.sidebarHeading}
            </div>

            <div className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin">
              {activeChapter.topics.map((topic) => {
                const isSelected = selectedTopicId === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      setSelectedTopicId(topic.id);
                      if (typeof window !== 'undefined') {
                        window.scrollTo({ top: 320, behavior: 'smooth' });
                      }
                    }}
                    className={`w-full p-3 rounded-2xl text-left transition cursor-pointer flex items-center justify-between gap-2 text-xs font-bold ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-extrabold text-[11px] shrink-0 ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {topic.id}
                      </span>
                      <span className="line-clamp-1">{topic.title.replace(/^Topic \d+: /, '')}</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'translate-x-0.5' : ''
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setActiveMainTab('mcqs');
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-black hover:bg-emerald-100 dark:hover:bg-emerald-900 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Practice {activeChapter.mcqs.length} Chapter MCQs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Topic Content Reader */}
          <div className="space-y-6">
            <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              {/* Topic Header Badge & Title */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
                  <span>
                    Topic #{activeTopic.id} of {activeChapter.topics.length}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                  {activeTopic.title}
                </h2>
              </div>

              {/* 1. Short Explanation — The Big Picture */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Short Explanation — The Big Picture</span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {activeTopic.shortExplanation}
                </p>
              </div>

              {/* 2. Key Characteristics & Scientific Rules */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>
                    {activeTopic.keyCharacteristics.heading ||
                      'Key Characteristics & Scientific Rules'}
                  </span>
                </h3>

                <ul className="space-y-2 pl-2">
                  {activeTopic.keyCharacteristics.points.map((pt, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Structured Comparison Table */}
                {activeTopic.keyCharacteristics.table && (
                  <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                          {activeTopic.keyCharacteristics.table.headers.map((h, i) => (
                            <th key={i} className="p-3 whitespace-nowrap">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {activeTopic.keyCharacteristics.table.rows.map((row, i) => (
                          <tr
                            key={i}
                            className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                          >
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className={`p-3 ${
                                  j === 0
                                    ? 'font-bold text-slate-900 dark:text-white'
                                    : 'font-medium text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* 3. Deep-Dive Breakdown Cards (2-column cards, emoji icons + sub-points) */}
              {activeTopic.deepDiveSections && activeTopic.deepDiveSections.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                    {activeTopic.deepDiveHeading || 'Deep-Dive Concept Breakdown'}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeTopic.deepDiveSections.map((sec, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2"
                      >
                        <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                          <span className="text-lg">{sec.emoji}</span>
                          <span>{sec.title}</span>
                        </div>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 pl-4 list-disc">
                          {sec.points.map((p, pIdx) => (
                            <li key={pIdx}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Real-World Examples & Fun Facts (3-column cards) */}
              {activeTopic.realWorldExamples.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-xl">🌍</span>
                    <span>Real-World Examples &amp; Fun Facts</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {activeTopic.realWorldExamples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
                      >
                        <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-white dark:bg-slate-700 shadow-2xs">
                          {ex.emoji}
                        </span>
                        <div>
                          <strong className="block text-xs font-extrabold text-slate-900 dark:text-white">
                            {ex.name}
                          </strong>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                            {ex.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Mnemonic Memory Aid */}
              {activeTopic.mnemonic && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800/50 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>
                      Mnemonic Memory Aid — &quot;{activeTopic.mnemonic.acronym}&quot;
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {activeTopic.mnemonic.meaning}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {activeTopic.mnemonic.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-900 text-center shadow-2xs"
                      >
                        <span className="text-xl font-black text-amber-600 dark:text-amber-400 block font-display">
                          {item.letter}
                        </span>
                        <strong className="text-xs text-slate-900 dark:text-white block mt-0.5">
                          {item.word}
                        </strong>
                        {item.note && (
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-3 mt-1 block">
                            {item.note}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Visual Mental Model & Hierarchy */}
              {activeTopic.flowchartAscii && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Visual Mental Model &amp; Hierarchy</span>
                  </h4>
                  <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                    {activeTopic.flowchartAscii}
                  </pre>
                </div>
              )}

              {/* 7. Venn Diagram — Similarities & Differences */}
              {activeTopic.vennDiagram && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Venn Diagram — Similarities &amp; Differences
                  </h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
                      <strong className="text-xs font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-wider block">
                        {activeTopic.vennDiagram.leftTitle}
                      </strong>
                      <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-4">
                        {activeTopic.vennDiagram.leftPoints.map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
                      <strong className="text-xs font-black text-emerald-900 dark:text-emerald-300 uppercase tracking-wider block">
                        {activeTopic.vennDiagram.middleTitle}
                      </strong>
                      <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-4">
                        {activeTopic.vennDiagram.middlePoints.map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-2">
                      <strong className="text-xs font-black text-rose-900 dark:text-rose-300 uppercase tracking-wider block">
                        {activeTopic.vennDiagram.rightTitle}
                      </strong>
                      <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-4">
                        {activeTopic.vennDiagram.rightPoints.map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* 8. Interactive Check Your Understanding Riddle */}
              {activeTopic.riddle && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      <HelpCircle className="w-4 h-4 text-emerald-600" />
                      <span>Check Your Understanding Riddle</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setRevealedRiddles((prev) => ({
                          ...prev,
                          [riddleStateKey]: !prev[riddleStateKey]
                        }))
                      }
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      {revealedRiddles[riddleStateKey] ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {revealedRiddles[riddleStateKey] ? 'Hide Answer' : 'Reveal Answer'}
                      </span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white italic">
                    &quot;{activeTopic.riddle.prompt}&quot;
                  </p>

                  {revealedRiddles[riddleStateKey] && (
                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700/60 animate-in fade-in duration-150 space-y-1">
                      <strong className="text-xs text-emerald-700 dark:text-emerald-300 block font-bold">
                        Answer: {activeTopic.riddle.answer}
                      </strong>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {activeTopic.riddle.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 9. Interactive Word Unscrambles */}
              {activeTopic.unscrambles && activeTopic.unscrambles.length > 0 && (
                <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900 space-y-3">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Interactive Unscramble Challenge</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeTopic.unscrambles.map((item, idx) => {
                      const key = `${activeChapter.id}-${activeTopic.id}-${idx}`;
                      const userVal = unscrambleInputs[key] || '';
                      const isCorrect =
                        userVal.trim().toUpperCase() === item.solution.toUpperCase();
                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-slate-800 space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                            <span className="font-mono font-black text-indigo-700 dark:text-indigo-300 text-sm tracking-wider">
                              {item.scrambled}
                            </span>
                            <span className="text-[10px] text-slate-400">Hint: {item.hint}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={userVal}
                              onChange={(e) =>
                                setUnscrambleInputs((prev) => ({
                                  ...prev,
                                  [key]: e.target.value
                                }))
                              }
                              placeholder="Type solution..."
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold uppercase focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                            />
                            {isCorrect && (
                              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-black flex items-center gap-1 shrink-0">
                                <Check className="w-3.5 h-3.5" />
                                <span>Correct!</span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 10. Interactive Secret Code Decoder Activity (A=1 ... Z=26) */}
              {activeTopic.secretCodeActivity && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-emerald-600" />
                      <span>
                        Secret Code Decoder Activity ({activeTopic.secretCodeActivity.cipher})
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                      A=1 · E=5 · I=9 · M=13 · O=15 · S=19 · Z=26
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {activeTopic.secretCodeActivity.items.map((codeItem, idx) => {
                      const codeKey = `${activeChapter.id}-${activeTopic.id}-code-${idx}`;
                      const typed = decoderInputs[codeKey] || '';
                      const isDecoded =
                        typed.trim().toUpperCase() === codeItem.answer.toUpperCase();
                      const showDecoded = isDecoded || !!revealedCodes[codeKey];

                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-mono text-emerald-700 dark:text-emerald-300 font-extrabold text-sm">
                              Cipher: {codeItem.encoded}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setRevealedCodes((prev) => ({
                                  ...prev,
                                  [codeKey]: !prev[codeKey]
                                }))
                              }
                              className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                            >
                              {revealedCodes[codeKey] ? 'Hide Solution' : 'Reveal Decoded Word'}
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={typed}
                              onChange={(e) =>
                                setDecoderInputs((prev) => ({
                                  ...prev,
                                  [codeKey]: e.target.value
                                }))
                              }
                              placeholder="Decode numbers into letters..."
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold uppercase focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                            />
                            {isDecoded && (
                              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-black flex items-center gap-1 shrink-0">
                                <Check className="w-3.5 h-3.5" />
                                <span>Decoded!</span>
                              </span>
                            )}
                          </div>

                          {showDecoded && (
                            <p className="text-slate-700 dark:text-slate-300 pt-1 border-t border-slate-100 dark:border-slate-800">
                              <strong className="text-emerald-700 dark:text-emerald-400">
                                {codeItem.answer}:
                              </strong>{' '}
                              {codeItem.sentence}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Topic Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  disabled={selectedTopicId <= 1}
                  onClick={() => {
                    setSelectedTopicId((prev) => Math.max(1, prev - 1));
                    if (typeof window !== 'undefined') {
                      window.scrollTo({ top: 320, behavior: 'smooth' });
                    }
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Topic</span>
                </button>

                <button
                  type="button"
                  disabled={selectedTopicId >= activeChapter.topics.length}
                  onClick={() => {
                    setSelectedTopicId((prev) =>
                      Math.min(activeChapter.topics.length, prev + 1)
                    );
                    if (typeof window !== 'undefined') {
                      window.scrollTo({ top: 320, behavior: 'smooth' });
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-30 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Next Topic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* 4. TAB 2: INTERACTIVE DECISION TREE / DICHOTOMOUS KEY SIMULATOR */}
      {activeMainTab === 'key-tool' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 text-xs font-black uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>{activeChapter.decisionTool.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                {activeChapter.decisionTool.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {activeChapter.decisionTool.subtitle}
              </p>
            </div>

            {/* Sample Quick-Buttons (+ Random Mystery Generator) */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                {activeChapter.decisionTool.samplePromptLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {activeChapter.decisionTool.specimens.map((spec) => {
                  const isActiveSpec =
                    !selectedSpecimen?.isMystery && selectedSpecimen?.specimen.id === spec.id;
                  return (
                    <button
                      key={spec.id}
                      type="button"
                      onClick={() => handlePickSpecimen(spec, false)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                        isActiveSpec
                          ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-700 dark:text-slate-300 hover:text-emerald-700'
                      }`}
                    >
                      <span>{spec.emoji}</span>
                      <span>{spec.name}</span>
                    </button>
                  );
                })}

                {activeChapter.decisionTool.enableRandomMystery && (
                  <button
                    type="button"
                    onClick={handlePickRandomMystery}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                      selectedSpecimen?.isMystery
                        ? 'bg-amber-500 text-slate-950 shadow-xs ring-2 ring-amber-400/50'
                        : 'bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 hover:bg-amber-100'
                    }`}
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Random</span>
                  </button>
                )}
              </div>
            </div>

            {/* Active Specimen Observation Slide (if user clicked a sample button or Random) */}
            {selectedSpecimen && (
              <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/70 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-2xs text-xl shrink-0">
                  {selectedSpecimen.isMystery && !keyResult ? (
                    <Microscope className="w-5 h-5 text-cyan-600" />
                  ) : (
                    selectedSpecimen.specimen.emoji
                  )}
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-black uppercase tracking-wider text-cyan-900 dark:text-cyan-300">
                    {selectedSpecimen.isMystery && !keyResult
                      ? 'Mystery Microscope Specimen — Read Clue & Classify!'
                      : `Selected Specimen: ${selectedSpecimen.specimen.name}`}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedSpecimen.specimen.clue}
                  </p>
                </div>
              </div>
            )}

            {/* Decision Tree Active Node, Re-check Prompt, or Classification Result Card */}
            {recheckMessage ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-center space-y-4 animate-in fade-in duration-150">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-black font-display text-slate-900 dark:text-white">
                  Re-Check Specimen Observation
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                  {recheckMessage}
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRecheckMessage(null)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold cursor-pointer"
                  >
                    Re-Answer Node #{currentNodeId}
                  </button>
                  <button
                    type="button"
                    onClick={() => resetDecisionTree(true)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-extrabold cursor-pointer"
                  >
                    Restart from Node #1
                  </button>
                </div>
              </div>
            ) : !keyResult ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/50 dark:from-slate-800/80 dark:to-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 space-y-6 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                    Decision Node #{currentDecisionNode.id}
                  </span>
                  <span className="text-slate-400 font-semibold">
                    Step {currentDecisionNode.id} of {activeChapter.decisionTool.totalSteps}
                  </span>
                </div>

                <div className="text-center max-w-xl mx-auto space-y-2 py-4">
                  <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white">
                    {currentDecisionNode.question}
                  </h3>
                  {currentDecisionNode.helperText && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {currentDecisionNode.helperText}
                    </p>
                  )}
                </div>

                {/* Yes / No Choices */}
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={() => handleKeyChoice('yes')}
                    className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-md transition transform hover:-translate-y-0.5 cursor-pointer text-center"
                  >
                    YES ✅
                  </button>
                  <button
                    type="button"
                    onClick={() => handleKeyChoice('no')}
                    className="p-4 rounded-2xl bg-slate-700 hover:bg-slate-800 text-white font-black text-sm sm:text-base shadow-md transition transform hover:-translate-y-0.5 cursor-pointer text-center"
                  >
                    NO ❌
                  </button>
                </div>
              </div>
            ) : (
              /* Classification Result Card (Group, Size Rank, Key Trait, Examples) */
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white border border-emerald-500/50 space-y-5 animate-in zoom-in-95 duration-200">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-3xl flex items-center justify-center mx-auto border border-emerald-400/40">
                    {keyResult.emoji}
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-300 block">
                    Classification Determined!
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black font-display text-white">
                    {keyResult.group}
                  </h3>
                  {selectedSpecimen && (
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold ${
                        selectedSpecimen.specimen.targetGroup === keyResult.group
                          ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/40'
                          : 'bg-amber-500/25 text-amber-200 border border-amber-400/40'
                      }`}
                    >
                      <span>
                        {selectedSpecimen.specimen.targetGroup === keyResult.group
                          ? `✓ Spot-On Match for ${selectedSpecimen.specimen.name}!`
                          : `Note: Your selected specimen was ${selectedSpecimen.specimen.name} (${selectedSpecimen.specimen.expectedPath})`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Structured 3-Card Breakdown: Size Rank | Key Trait | Examples */}
                <div className="grid sm:grid-cols-3 gap-3 text-left">
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                      Size Rank / Status
                    </span>
                    <p className="text-xs font-bold text-white leading-relaxed">
                      {keyResult.sizeRank}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 block">
                      Key Defining Trait
                    </span>
                    <p className="text-xs font-bold text-white leading-relaxed">
                      {keyResult.keyTrait}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 block">
                      Textbook Examples
                    </span>
                    <p className="text-xs font-bold text-white leading-relaxed">
                      {keyResult.examples}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => resetDecisionTree(false)}
                    className="px-6 py-2.5 rounded-xl bg-white text-emerald-950 font-extrabold text-xs hover:bg-emerald-50 transition cursor-pointer"
                  >
                    Classify Another Specimen ↺
                  </button>
                  {activeChapter.decisionTool.enableRandomMystery && (
                    <button
                      type="button"
                      onClick={handlePickRandomMystery}
                      className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>Next Random Specimen</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Audit Trail Log */}
            {keyHistory.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Classification Audit Trail:
                  </span>
                  <code className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 text-xs font-bold">
                    {auditTrailSummary}
                  </code>
                </div>
                <div className="space-y-1 text-xs pt-1 border-t border-slate-200/70 dark:border-slate-700/60">
                  {keyHistory.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-3 text-slate-700 dark:text-slate-300"
                    >
                      <span>{h.question}</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 shrink-0">
                        {h.answer}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. TAB 3: 40-QUESTION MCQ PRACTICE BANK & TIMED MOCK EXAM */}
      {activeMainTab === 'mcqs' && (
        <div className="space-y-6">
          {/* Section Filter Pills & Live Score / Accuracy Tracker */}
          {!isTestMode ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-slate-400 mr-1">Section:</span>
                {activeChapter.mcqSections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setSelectedSection(sec.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      selectedSection === sec.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
                  <span className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60">
                    Score:{' '}
                    <strong className="text-emerald-700 dark:text-emerald-400">
                      {scoreStats.correct} / {scoreStats.total}
                    </strong>
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                    Accuracy:{' '}
                    <strong className="text-indigo-600 dark:text-indigo-400">
                      {scoreStats.accuracy}%
                    </strong>
                    {scoreStats.answered > 0 && (
                      <span className="text-slate-400 ml-1">
                        ({scoreStats.answered} attempted)
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetChapterMcqs}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* 40-Minute Timed Mock Exam Header */
            <div className="bg-emerald-950 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  STBB Class 5 Science · 40-Minute Timed Mock Exam
                </div>
                <h3 className="text-xl font-bold font-display text-white mt-0.5">
                  {activeChapter.heroTitle} ({scoreStats.answered} / {scoreStats.total} Answered)
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-amber-400/40 font-mono text-sm font-black text-amber-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimer(testTimeLeft)}</span>
                </div>

                <button
                  type="button"
                  onClick={handleExitTest}
                  className="px-3.5 py-1.5 rounded-xl border border-rose-400/40 text-rose-300 hover:bg-rose-950/60 text-xs font-bold transition cursor-pointer"
                >
                  Exit Exam
                </button>

                {!testSubmitted ? (
                  <button
                    type="button"
                    onClick={handleSubmitTest}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black shadow-xs cursor-pointer"
                  >
                    Submit &amp; Evaluate (60% Pass)
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStartTest}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-black cursor-pointer"
                  >
                    Retake Mock Exam ↺
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Evaluation Banner on Mock Exam Submission (60% Passing Threshold) */}
          {testSubmitted && (
            <div
              className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 shadow-md space-y-3 text-center ${
                scoreStats.examGradePercent >= 60
                  ? 'border-emerald-500'
                  : 'border-rose-500'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto ${
                  scoreStats.examGradePercent >= 60
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                    : 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                }`}
              >
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 ${
                    scoreStats.examGradePercent >= 60
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  {scoreStats.examGradePercent >= 60
                    ? 'PASS ✅ — Cleared 60% STS Qualifying Benchmark!'
                    : 'FAIL ❌ — Below 60% Passing Threshold'}
                </span>
                <h3 className="text-2xl font-black font-display text-slate-900 dark:text-white">
                  Final Score: {scoreStats.correct} / {scoreStats.total} (
                  {scoreStats.examGradePercent}%)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {scoreStats.examGradePercent >= 60
                    ? 'Outstanding mastery! Review any missed explanations below to lock in 100% accuracy.'
                    : 'Review the detailed answer explanations below, revise weak topics in Tab 1, and retake the mock exam!'}
                </p>
              </div>
            </div>
          )}

          {/* Per-Question Interactive MCQ Cards */}
          <div className="space-y-4">
            {displayedMcqs.map((mcq) => {
              const selectedIdx = userSelections[mcq.id];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = isAnswered && selectedIdx === mcq.correctIndex;
              const showOutcome = (!isTestMode && isAnswered) || testSubmitted;
              const isExplanationOpen =
                (!isTestMode && revealedExplanations[mcq.id]) || testSubmitted;

              return (
                <div
                  key={mcq.id}
                  className={`p-5 sm:p-6 rounded-3xl border transition ${
                    showOutcome && isAnswered
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
                        : 'border-rose-400 bg-rose-50/20 dark:bg-rose-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs flex items-center justify-center">
                        {mcq.number}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {mcq.sectionTitle}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleBookmark(mcq.id)}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        isBookmarked(mcq.id)
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-600'
                          : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600'
                      }`}
                      title="Bookmark Question"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug mb-4">
                    {mcq.question}
                  </h4>

                  {/* A / B / C / D Options */}
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {mcq.options.map((opt, oIdx) => {
                      const isOptionSelected = selectedIdx === oIdx;
                      const isOptionCorrect = oIdx === mcq.correctIndex;

                      let optClasses =
                        'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/60 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200';

                      if (showOutcome) {
                        if (isOptionCorrect) {
                          optClasses =
                            'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500';
                        } else if (isOptionSelected) {
                          optClasses =
                            'border-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-900 dark:text-rose-200 font-bold';
                        }
                      } else if (isTestMode && isOptionSelected) {
                        optClasses =
                          'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-slate-900 dark:text-white font-bold ring-1 ring-amber-500';
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          disabled={testSubmitted}
                          onClick={() => handleSelectOption(mcq.id, oIdx, mcq.correctIndex)}
                          className={`p-3 rounded-2xl border text-left text-xs sm:text-sm transition cursor-pointer flex items-start gap-2.5 ${optClasses}`}
                        >
                          <span
                            className={`w-5 h-5 rounded-md font-bold text-xs flex items-center justify-center shrink-0 ${
                              showOutcome && isOptionCorrect
                                ? 'bg-emerald-600 text-white'
                                : isTestMode && isOptionSelected && !testSubmitted
                                  ? 'bg-amber-500 text-slate-950'
                                  : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="flex-1 leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Instant Detailed Answer Explanation */}
                  {isExplanationOpen && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 animate-in fade-in duration-150">
                      <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/60 space-y-1">
                        <strong className="text-xs text-emerald-800 dark:text-emerald-300 font-extrabold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>
                            Correct Answer: ({String.fromCharCode(65 + mcq.correctIndex)}){' '}
                            {mcq.options[mcq.correctIndex]}
                          </span>
                        </strong>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {mcq.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. TAB 4: KEY CONCEPTS & TABLES (OFFICIAL EXAM CHEAT SHEET) */}
      {activeMainTab === 'summary' && (
        <div className="space-y-6">
          {/* Quick Takeaway Summary Grid Cards */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Official Exam Cheat Sheet
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white mt-1">
                Summary of Key Concepts &amp; Takeaways
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {activeChapter.summaryConcepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center gap-1.5">
                    {concept.icon && <span className="text-base">{concept.icon}</span>}
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-display">
                      {concept.topic}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {concept.takeaway}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Master Comparison Matrices */}
          {activeChapter.summaryMatrices.map((matrix, mIdx) => (
            <div
              key={mIdx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4"
            >
              <div>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  {matrix.title}
                </h3>
                {matrix.subtitle && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {matrix.subtitle}
                  </p>
                )}
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                      {matrix.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {matrix.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                      >
                        {row.cells.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-3 ${getCellStyleClass(row.cellStyles?.[cIdx])}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
