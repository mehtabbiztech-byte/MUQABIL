import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen,
  Calculator,
  Atom,
  Globe,
  Languages,
  Lightbulb,
  Brain,
  ShieldCheck,
  Award,
  School,
  Search,
  Volume2,
  VolumeX,
  CheckCircle2,
  Circle,
  Sparkles,
  Clock,
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  Trophy,
  Zap,
  HelpCircle,
  Layers,
  Eye,
  EyeOff,
  Star,
  Printer,
  Maximize2,
  Minimize2,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Menu,
  X,
  Compass,
  BookmarkCheck,
  GraduationCap,
  FileText,
  FileSpreadsheet
} from 'lucide-react';
import {
  TEACHING_LICENSE_PARTS,
  LicensePartModule,
  LicenseTopicNote,
} from '../data/teachingLicenseNotesData';
import { useApp } from '../context/AppContext';
import { StudyLesson, MCQ } from '../types';
import { exportStudyLessonToPdf, exportMcqsToExcel } from '../lib/exportUtils';
import { InteractivePartsOfSpeechExplorer } from './InteractivePartsOfSpeechExplorer';
import { InteractiveTensesExplorer } from './InteractiveTensesExplorer';
import { InteractiveVoiceExplorer } from './InteractiveVoiceExplorer';
import { InteractiveNarrationExplorer } from './InteractiveNarrationExplorer';
import { InteractiveMathNumberStudio } from './InteractiveMathNumberStudio';
import { TeachingLicenseSubjectivePractice } from './TeachingLicenseSubjectivePractice';

interface TeachingLicenseNotesHubProps {
  initialPartId?: string;
  initialTopicId?: string;
  onOpenPaperSimulator?: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Calculator,
  Atom,
  Globe,
  Languages,
  Lightbulb,
  Brain,
  ShieldCheck,
  Award,
  School,
};

export const TeachingLicenseNotesHub: React.FC<TeachingLicenseNotesHubProps> = ({
  initialPartId,
  initialTopicId,
  onOpenPaperSimulator,
}) => {
  const { setTab, setSelectedPastPaperId } = useApp();

  // Selected Part and Topic State
  const [selectedPartId, setSelectedPartId] = useState<string>(
    initialPartId || (TEACHING_LICENSE_PARTS[0]?.id ?? '')
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    initialTopicId || (TEACHING_LICENSE_PARTS[0]?.topics?.[0]?.id ?? '')
  );
  const [workspaceView, setWorkspaceView] = useState<'overview' | 'reader' | 'subjective'>(() =>
    initialPartId || initialTopicId ? 'reader' : 'overview'
  );

  useEffect(() => {
    if (initialPartId) {
      setSelectedPartId(initialPartId);
      setWorkspaceView('reader');
    }
  }, [initialPartId]);

  useEffect(() => {
    if (initialTopicId) {
      setSelectedTopicId(initialTopicId);
      setWorkspaceView('reader');
    }
  }, [initialTopicId]);

  // Category Filter: 'all' | 'part1' | 'part2' | 'starred'
  const [partCategoryFilter, setPartCategoryFilter] = useState<'all' | 'part1' | 'part2' | 'starred'>('all');

  // Search queries
  const [searchQuery, setSearchQuery] = useState('');
  const [inNoteSearch, setInNoteSearch] = useState('');

  // Reader Settings
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Mobile / Tablet Syllabus Drawer Toggle
  const [isSyllabusDrawerOpen, setIsSyllabusDrawerOpen] = useState(false);

  // Interactive Active Recall Mode
  const [isActiveRecall, setIsActiveRecall] = useState(false);
  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});

  // Starred Topics (Bookmarks)
  const [starredTopics, setStarredTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('steda_starred_topics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Mastered Topics tracked in localStorage
  const [masteredTopics, setMasteredTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('steda_mastered_topics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Selected Key Term for Modal/Inspector
  const [inspectTerm, setInspectTerm] = useState<{ term: string; definition: string } | null>(null);

  // Interactive Quiz Answers per topic
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Reading progress percentage within current note
  const [readingProgress, setReadingProgress] = useState(0);
  const noteArticleRef = useRef<HTMLElement>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('steda_mastered_topics', JSON.stringify(masteredTopics));
    } catch {
      // ignore
    }
  }, [masteredTopics]);

  useEffect(() => {
    try {
      localStorage.setItem('steda_starred_topics', JSON.stringify(starredTopics));
    } catch {
      // ignore
    }
  }, [starredTopics]);

  // Clean up speech synthesis when unmounting or switching topic
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [selectedTopicId]);

  // Calculate Reading Progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!noteArticleRef.current) return;
      const el = noteArticleRef.current;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = el.offsetHeight;
      const visibleFromTop = windowHeight - rect.top;

      if (rect.top > windowHeight) {
        setReadingProgress(0);
      } else if (rect.bottom < 0) {
        setReadingProgress(100);
      } else {
        const progress = Math.min(100, Math.max(0, Math.round((visibleFromTop / (totalHeight + windowHeight * 0.3)) * 100)));
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedTopicId]);

  // Active module & topic
  const currentPart = useMemo(() => {
    return TEACHING_LICENSE_PARTS.find((p) => p.id === selectedPartId) || TEACHING_LICENSE_PARTS[0];
  }, [selectedPartId]);

  const currentTopic = useMemo(() => {
    return currentPart.topics.find((t) => t.id === selectedTopicId) || currentPart.topics[0];
  }, [currentPart, selectedTopicId]);

  // Total topics count & mastered count
  const allTopics = useMemo(() => {
    return TEACHING_LICENSE_PARTS.flatMap((p) => p.topics);
  }, []);

  const totalMasteredCount = useMemo(() => {
    return Object.values(masteredTopics).filter(Boolean).length;
  }, [masteredTopics]);

  const totalStarredCount = useMemo(() => {
    return Object.values(starredTopics).filter(Boolean).length;
  }, [starredTopics]);

  const progressPercentage = Math.round((totalMasteredCount / allTopics.length) * 100);

  // Filtered Parts for sidebar navigation
  const filteredParts = useMemo(() => {
    let parts = TEACHING_LICENSE_PARTS;
    if (partCategoryFilter === 'part1') {
      parts = parts.filter((p) => p.partCategory.startsWith('Part I'));
    } else if (partCategoryFilter === 'part2') {
      parts = parts.filter((p) => p.partCategory.startsWith('Part II'));
    } else if (partCategoryFilter === 'starred') {
      parts = parts
        .map((p) => ({
          ...p,
          topics: p.topics.filter((t) => starredTopics[t.id]),
        }))
        .filter((p) => p.topics.length > 0);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      parts = parts
        .map((p) => {
          const matchPart =
            p.subjectName.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q);
          const matchingTopics = p.topics.filter(
            (t) =>
              t.title.toLowerCase().includes(q) ||
              t.summary.toLowerCase().includes(q) ||
              t.highYieldAlert.toLowerCase().includes(q)
          );

          if (matchPart) {
            return p;
          }
          if (matchingTopics.length > 0) {
            return {
              ...p,
              topics: matchingTopics,
            };
          }
          return null;
        })
        .filter((p): p is LicensePartModule => p !== null);
    }

    return parts;
  }, [partCategoryFilter, searchQuery, starredTopics]);

  // Toggle Mastered
  const toggleMastered = (topicId: string) => {
    setMasteredTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  // Toggle Starred
  const toggleStarred = (topicId: string) => {
    setStarredTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  // Toggle Active Recall item reveal
  const toggleReveal = (itemId: string) => {
    setRevealedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Scroll to section smoothly
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Text-To-Speech with Rate
  const handleToggleSpeech = (rate = speechRate) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${currentTopic.title}. ${currentTopic.summary}. STEDA High Yield Alert: ${currentTopic.highYieldAlert}. ${currentTopic.concepts
        .map((c) => (c.explanation ? `${c.conceptTitle}. ${c.explanation}` : c.conceptTitle))
        .join('. ')}`;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = rate;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Copy Note Text
  const handleCopyNote = () => {
    const text = `STEDA Sindh Teaching License Notes
Module: ${currentPart.subjectName} (Part ${currentPart.partNumber})
Topic: ${currentTopic.topicNumber} ${currentTopic.title}
----------------------------------------
SUMMARY:
${currentTopic.summary}

STEDA HIGH-YIELD ALERT:
${currentTopic.highYieldAlert}

KEY CONCEPTS:
${currentTopic.concepts
  .map(
    (c) =>
      `• ${c.conceptTitle}${c.explanation ? ': ' + c.explanation : ''}${
        c.bulletPoints ? '\n  - ' + c.bulletPoints.join('\n  - ') : ''
      }`
  )
  .join('\n\n')}

${currentTopic.mnemonicAid ? `MNEMONIC AID:\n${currentTopic.mnemonicAid}\n\n` : ''}
${currentTopic.classroomApplication ? `CLASSROOM APPLICATION:\n${currentTopic.classroomApplication}\n\n` : ''}
PREPARED VIA MEHTAB STS IBA PREP
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download Current Topic Note as PDF
  const handleDownloadTopicPdf = () => {
    const lesson: StudyLesson = {
      id: currentTopic.id,
      title: `STEDA Teaching License: ${currentPart.subjectName} — ${currentTopic.title}`,
      audience: 'advanced',
      readTime: '12 min',
      explanation: `${currentTopic.summary}\n\nSTEDA High-Yield Alert: ${currentTopic.highYieldAlert}`,
      importantPoints: (currentTopic.concepts || []).map((c) => `${c.conceptTitle}: ${c.explanation || ''}`),
      examples: (currentTopic.examDistractorTraps || []),
      practice: [],
      mcqs: (currentTopic.quiz || []).map((q, qIdx) => ({
        id: `${currentTopic.id}-q-${qIdx}`,
        question: q.question,
        options: q.options,
        correctIndex: q.correctAnswer,
        explanation: q.explanation,
        category: 'pedagogy',
        difficulty: 'Medium'
      }))
    };
    exportStudyLessonToPdf(lesson);
  };

  // Download Topic Quiz to Excel
  const handleDownloadQuizExcel = () => {
    if (!currentTopic.quiz || currentTopic.quiz.length === 0) return;
    const mcqs: MCQ[] = currentTopic.quiz.map((q, qIdx) => ({
      id: `${currentTopic.id}-q-${qIdx}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correctAnswer,
      explanation: q.explanation,
      category: 'pedagogy',
      difficulty: 'Medium',
      examTags: ['STEDA Teaching License', `Part ${currentPart.partNumber}`]
    }));
    exportMcqsToExcel(mcqs, `STEDA_${currentTopic.title.replace(/\s+/g, '_')}`, { subject: currentPart.subjectName });
  };

  // Handle Quiz selection
  const handleSelectQuizOption = (quizId: string, optionIndex: number) => {
    if (quizSubmitted[quizId]) return;
    setQuizAnswers((prev) => ({ ...prev, [quizId]: optionIndex }));
  };

  const handleCheckQuiz = (quizId: string) => {
    setQuizSubmitted((prev) => ({ ...prev, [quizId]: true }));
  };

  const handleResetQuiz = (quizId: string) => {
    setQuizAnswers((prev) => {
      const copy = { ...prev };
      delete copy[quizId];
      return copy;
    });
    setQuizSubmitted((prev) => {
      const copy = { ...prev };
      delete copy[quizId];
      return copy;
    });
  };

  // Font size classes
  const fontClass =
    fontSize === 'huge'
      ? 'text-lg sm:text-xl leading-relaxed'
      : fontSize === 'large'
      ? 'text-base sm:text-lg leading-relaxed'
      : 'text-sm sm:text-base leading-relaxed';

  // Topic Navigation
  const currentPartTopics = currentPart.topics;
  const currentTopicIndex = currentPartTopics.findIndex((t) => t.id === currentTopic.id);
  const prevTopic = currentTopicIndex > 0 ? currentPartTopics[currentTopicIndex - 1] : null;
  const nextTopic =
    currentTopicIndex < currentPartTopics.length - 1
      ? currentPartTopics[currentTopicIndex + 1]
      : null;

  // Highlight helper for in-note search
  const highlightText = (content: string) => {
    if (!inNoteSearch.trim()) return content;
    const regex = new RegExp(`(${inNoteSearch.trim()})`, 'gi');
    const parts = content.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-300 dark:bg-amber-500/80 text-slate-950 font-bold px-1 rounded-sm">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Helper to switch topic & close mobile drawer if open
  const handleSelectTopic = (partId: string, topicId: string) => {
    setSelectedPartId(partId);
    setSelectedTopicId(topicId);
    setWorkspaceView('reader');
    setIsSyllabusDrawerOpen(false);
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  if (TEACHING_LICENSE_PARTS.length === 0) {
    return (
      <div id="steda-notes-hub" className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-3 shadow-xs">
        <BookOpen className="w-8 h-8 mx-auto text-slate-400" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Teaching License Notes</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">All subject notes have been removed.</p>
      </div>
    );
  }

  return (
    <div id="steda-notes-hub" className="space-y-6 animate-in fade-in duration-300">
      {/* 1. TOP HEADER & EXECUTIVE COCKPIT (Hidden in Focus Mode) */}
      {!isFocusMode && (
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>OFFICIAL SINDH TEACHING LICENSE · STEDA &amp; STS BLUEPRINT</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                Teaching License Master Notes Hub
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Comprehensive study repository for <strong>Elementary (BPS-16)</strong> &amp; <strong>Secondary (BPS-17)</strong>. Structured across the verified 50-50 exam format: Part I (50% Subject Content) and Part II (50% Pedagogical Science).
              </p>

              {/* Stats Strip */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  10 Modules (100 Marks)
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  {allTopics.length} Detailed Topics
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  60% Passing Benchmark
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                  <Star className="w-3.5 h-3.5 text-yellow-400" />
                  {totalStarredCount} Starred
                </span>
              </div>
            </div>

            {/* Syllabus Mastery Progress Card */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 sm:p-5 lg:w-72 shrink-0 space-y-3 shadow-lg">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300 uppercase tracking-wider text-[11px]">Syllabus Progress</span>
                <span className="text-emerald-400 font-extrabold text-sm">{progressPercentage}%</span>
              </div>

              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(4, progressPercentage)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{totalMasteredCount} of {allTopics.length} Mastered</span>
                <span className="text-emerald-400 font-bold">
                  {totalMasteredCount >= 20 ? '🏆 Exam Ready' : 'In Preparation'}
                </span>
              </div>

              <button
                onClick={() => {
                  if (onOpenPaperSimulator) {
                    onOpenPaperSimulator();
                  } else {
                    setSelectedPastPaperId('tlt-2024-paper-3');
                    setTab('past-papers');
                  }
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:from-amber-600 hover:to-orange-700 transition cursor-pointer"
              >
                <Trophy className="w-4 h-4" />
                <span>Launch 100-MCQ Exam Test</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {!isFocusMode && (
        <nav aria-label="Teaching License workspace" className="sticky top-2 z-20 mx-auto grid w-full max-w-2xl grid-cols-3 gap-1 rounded-2xl border border-slate-200 bg-white/90 p-1.5 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
          <button
            onClick={() => setWorkspaceView('overview')}
            aria-pressed={workspaceView === 'overview'}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${workspaceView === 'overview' ? 'bg-slate-950 text-white shadow-md dark:bg-white dark:text-slate-950' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
          >
            Study Dashboard
          </button>
          <button
            onClick={() => setWorkspaceView('reader')}
            aria-pressed={workspaceView === 'reader'}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${workspaceView === 'reader' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
          >
            Notes Reader
          </button>
          <button
            onClick={() => setWorkspaceView('subjective')}
            aria-pressed={workspaceView === 'subjective'}
            className={`rounded-xl px-2 py-2.5 text-xs font-extrabold transition sm:px-4 sm:text-sm ${workspaceView === 'subjective' ? 'bg-gradient-to-r from-rose-600 to-fuchsia-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
          >
            CRQs &amp; ERQs
          </button>
        </nav>
      )}

      {/* 2. DUAL-PANE WORKSPACE: LEFT SYLLABUS NAVIGATOR + RIGHT NOTE CANVAS */}
      {workspaceView === 'overview' && !isFocusMode ? (
        <section className="space-y-6" aria-label="Teaching License study dashboard">
          <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-6 text-white shadow-xl sm:p-8">
              <div className="flex h-full flex-col justify-between gap-7">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-purple-200">Continue your preparation</p>
                  <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-4xl">One syllabus. Ten focused modules. A clear route to 60+.</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100">Resume your current topic, mark lessons as mastered, and use the 50–50 blueprint to keep content knowledge and pedagogy balanced.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setWorkspaceView('reader')} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-indigo-700 shadow-lg transition hover:-translate-y-0.5">
                    Continue: {currentTopic.title}<ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => { setPartCategoryFilter('starred'); setWorkspaceView('reader'); }} className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur hover:bg-white/20">
                    <Star className="h-4 w-4 text-amber-300" /> {totalStarredCount} saved topics
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-5 dark:border-cyan-900 dark:bg-cyan-950/30">
                <div className="flex items-center justify-between"><span className="text-xs font-extrabold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">Part I · Content</span><span className="text-2xl font-black text-cyan-900 dark:text-cyan-100">50%</span></div>
                <p className="mt-2 text-sm leading-6 text-cyan-900/75 dark:text-cyan-200/80">English, Mathematics, Science, Social Studies and language content.</p>
              </div>
              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">
                <div className="flex items-center justify-between"><span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300">Part II · Pedagogy</span><span className="text-2xl font-black text-amber-900 dark:text-amber-100">50%</span></div>
                <p className="mt-2 text-sm leading-6 text-amber-900/75 dark:text-amber-200/80">Teaching methods, assessment, psychology, curriculum and classroom practice.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-purple-600">Complete syllabus</p><h2 className="mt-1 font-display text-2xl font-extrabold text-slate-950 dark:text-white">Choose a module to begin</h2><p className="mt-1 text-sm text-slate-500">Progress is saved automatically on this device.</p></div>
              <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{totalMasteredCount}/{allTopics.length} topics mastered</div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {TEACHING_LICENSE_PARTS.map((part) => {
                const IconComp = ICON_MAP[part.iconName] || BookOpen;
                const done = part.topics.filter((topic) => masteredTopics[topic.id]).length;
                const completion = Math.round((done / part.topics.length) * 100);
                return <button key={part.id} onClick={() => handleSelectTopic(part.id, part.topics[0].id)} className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-left transition hover:-translate-y-1 hover:border-purple-300 hover:bg-white hover:shadow-xl dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-purple-700 dark:hover:bg-slate-900">
                  <div className="flex items-start justify-between gap-3"><span className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${part.themeColor} text-white shadow-md`}><IconComp className="h-5 w-5" /></span><span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold text-slate-500 shadow-sm dark:bg-slate-800">{part.weightage}</span></div>
                  <p className="mt-4 text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400">Part {part.partNumber} · {part.partCategory}</p>
                  <h3 className="mt-1 text-base font-extrabold text-slate-950 group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-300">{part.subjectName}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{part.description}</p>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ width: `${Math.max(completion, 3)}%` }} /></div>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-slate-500"><span>{part.topics.length} topics</span><span>{completion}% complete</span></div>
                </button>;
              })}
            </div>
          </div>
        </section>
      ) : workspaceView === 'subjective' && !isFocusMode ? (
        <TeachingLicenseSubjectivePractice />
      ) : (
      <div className="flex flex-col lg:flex-row items-start gap-6 relative">
        {/* MOBILE SYLLABUS DRAWER TRIGGER (Hidden on Large screens and in focus mode) */}
        {!isFocusMode && (
          <div className="lg:hidden w-full flex items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setIsSyllabusDrawerOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-sm"
            >
              <Menu className="w-4 h-4" />
              <span>Browse Syllabus Index (10 Modules · {allTopics.length} Topics)</span>
            </button>

            <button
              onClick={() => setIsActiveRecall(!isActiveRecall)}
              className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                isActiveRecall
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isActiveRecall ? <EyeOff className="w-4 h-4 text-amber-300" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* LEFT SYLLABUS EXPLORER SIDEBAR (Desktop Sticky, Mobile Drawer) */}
        {!isFocusMode && (
          <aside
            className={`
              fixed lg:sticky top-0 lg:top-4 z-40 lg:z-10
              w-full sm:w-96 lg:w-80 xl:w-96 h-screen lg:h-[calc(100vh-2rem)]
              bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
              lg:rounded-3xl shadow-xl lg:shadow-sm
              flex flex-col overflow-hidden transition-all duration-300
              ${
                isSyllabusDrawerOpen
                  ? 'left-0'
                  : '-left-full lg:left-0'
              }
            `}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    Syllabus Navigator
                  </h2>
                  <p className="text-[10px] text-slate-500">10 Modules · 100 Marks</p>
                </div>
              </div>

              {/* Close Drawer Button (Mobile only) */}
              <button
                onClick={() => setIsSyllabusDrawerOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Filter Tabs */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 shrink-0 space-y-2.5">
              {/* Category Segment */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/60 dark:bg-slate-800 rounded-xl text-[11px] font-bold">
                <button
                  onClick={() => setPartCategoryFilter('all')}
                  className={`py-1 rounded-lg text-center transition cursor-pointer ${
                    partCategoryFilter === 'all'
                      ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setPartCategoryFilter('part1')}
                  className={`py-1 rounded-lg text-center transition cursor-pointer ${
                    partCategoryFilter === 'part1'
                      ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Part I
                </button>
                <button
                  onClick={() => setPartCategoryFilter('part2')}
                  className={`py-1 rounded-lg text-center transition cursor-pointer ${
                    partCategoryFilter === 'part2'
                      ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Part II
                </button>
                <button
                  onClick={() => setPartCategoryFilter('starred')}
                  className={`py-1 rounded-lg text-center transition cursor-pointer flex items-center justify-center gap-1 ${
                    partCategoryFilter === 'starred'
                      ? 'bg-white dark:bg-slate-700 text-amber-500 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Star className="w-3 h-3 fill-current" />
                  <span>({totalStarredCount})</span>
                </button>
              </div>

              {/* Live Search Input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter modules & topics..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Modules & Topics Accordion List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {filteredParts.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 space-y-2">
                  <HelpCircle className="w-8 h-8 mx-auto text-slate-300" />
                  <p>No matching topics found.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setPartCategoryFilter('all');
                    }}
                    className="text-purple-600 font-bold hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                filteredParts.map((part) => {
                  const IconComp = ICON_MAP[part.iconName] || BookOpen;
                  const isCurrentPart = part.id === currentPart.id;
                  const partDoneCount = part.topics.filter((t) => masteredTopics[t.id]).length;

                  return (
                    <div
                      key={part.id}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isCurrentPart
                          ? 'border-purple-300 dark:border-purple-800 bg-purple-50/20 dark:bg-purple-950/20'
                          : 'border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-slate-300'
                      }`}
                    >
                      {/* Module Item Header */}
                      <button
                        onClick={() => {
                          setSelectedPartId(part.id);
                          if (!part.topics.some((t) => t.id === selectedTopicId)) {
                            setSelectedTopicId(part.topics[0].id);
                          }
                        }}
                        className="w-full p-3 flex items-center justify-between text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs bg-gradient-to-br ${part.themeColor} text-white shrink-0 shadow-2xs`}
                          >
                            <IconComp className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                              <span>Part {part.partNumber}</span>
                              <span>·</span>
                              <span className="text-purple-600 dark:text-purple-400">{part.weightage}</span>
                            </div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {part.subjectName}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {partDoneCount > 0 && (
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              {partDoneCount}/{part.topics.length}
                            </span>
                          )}
                          {isCurrentPart ? (
                            <ChevronDown className="w-4 h-4 text-purple-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {/* Module Topics Nested List (Expanded if selected) */}
                      {isCurrentPart && (
                        <div className="px-2 pb-2.5 pt-1 space-y-1 border-t border-purple-100/60 dark:border-purple-900/40">
                          {part.topics.map((t) => {
                            const isTopicActive = t.id === currentTopic.id;
                            const isDone = masteredTopics[t.id];
                            const isStarred = starredTopics[t.id];

                            return (
                              <div
                                key={t.id}
                                className={`group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition cursor-pointer ${
                                  isTopicActive
                                    ? 'bg-purple-600 text-white font-bold shadow-xs'
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                                onClick={() => handleSelectTopic(part.id, t.id)}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span
                                    className={`text-[10px] shrink-0 font-mono ${
                                      isTopicActive
                                        ? 'text-purple-200'
                                        : 'text-slate-400 dark:text-slate-500'
                                    }`}
                                  >
                                    {t.topicNumber}
                                  </span>
                                  <span className="truncate">{t.title}</span>
                                </div>

                                <div className="flex items-center gap-1 shrink-0 ml-1.5">
                                  {isStarred && (
                                    <Star className={`w-3 h-3 ${isTopicActive ? 'text-amber-300 fill-amber-300' : 'text-amber-500 fill-amber-500'}`} />
                                  )}
                                  {isDone ? (
                                    <CheckCircle2 className={`w-3.5 h-3.5 ${isTopicActive ? 'text-emerald-300' : 'text-emerald-500'}`} />
                                  ) : (
                                    <Circle className={`w-3 h-3 opacity-30 ${isTopicActive ? 'text-white' : 'text-slate-400'}`} />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Sidebar Bottom Quick Benchmark */}
            <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between shrink-0">
              <span>STS Target: 60/100</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">No Negative Marking</span>
            </div>
          </aside>
        )}

        {/* Mobile Backdrop Overlay for Drawer */}
        {isSyllabusDrawerOpen && (
          <div
            onClick={() => setIsSyllabusDrawerOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs lg:hidden animate-in fade-in"
          />
        )}

        {/* 3. RIGHT MAIN EDITORIAL NOTE CANVAS */}
        <main
          className={`
            flex-1 min-w-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
            rounded-3xl shadow-xs transition-all duration-300
            ${isFocusMode ? 'max-w-4xl mx-auto ring-4 ring-purple-500/20' : ''}
          `}
        >
          {/* Top Reading Progress Bar */}
          <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-t-3xl overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-150"
              style={{ width: `${readingProgress}%` }}
            />
          </div>

          <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
            {/* Breadcrumbs & Reader Toolbar Container */}
            <div className="pb-5 border-b border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Breadcrumbs */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className={`px-2.5 py-0.5 rounded-md font-extrabold ${currentPart.badgeBg} ${currentPart.badgeText}`}>
                      Part {currentPart.partNumber}: {currentPart.partCategory}
                    </span>
                    <span className="text-slate-400">/</span>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">
                      {currentPart.subjectName} ({currentPart.weightage})
                    </span>
                    <span className="text-slate-400">/</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      Topic {currentTopic.topicNumber}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {currentPart.subjectName} — Core Note
                  </h2>
                </div>

                {/* Reader Controls Toolbar */}
                <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto bg-slate-50 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
                  {/* Active Recall / Self-Test Toggle */}
                  <button
                    onClick={() => setIsActiveRecall(!isActiveRecall)}
                    title={isActiveRecall ? 'Turn off Active Recall Mode' : 'Turn on Active Recall Mode (masks answers for self-testing)'}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      isActiveRecall
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isActiveRecall ? <EyeOff className="w-3.5 h-3.5 text-amber-300" /> : <Eye className="w-3.5 h-3.5 text-purple-600" />}
                    <span className="hidden sm:inline">{isActiveRecall ? 'Recall Mode' : 'Self-Test'}</span>
                  </button>

                  {/* Text-To-Speech with Speed Selector */}
                  <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800">
                    <button
                      onClick={() => handleToggleSpeech(speechRate)}
                      title={isSpeaking ? 'Pause audio read-aloud' : 'Listen to this study note'}
                      className={`px-2.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                        isSpeaking
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 animate-pulse'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-600" /> : <Volume2 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />}
                      <span className="hidden md:inline">{isSpeaking ? 'Stop' : 'Listen'}</span>
                    </button>
                    {isSpeaking && (
                      <select
                        value={speechRate}
                        onChange={(e) => {
                          const newRate = parseFloat(e.target.value);
                          setSpeechRate(newRate);
                          handleToggleSpeech(newRate);
                        }}
                        className="text-[10px] font-bold bg-transparent pr-1 text-slate-600 dark:text-slate-400 focus:outline-hidden"
                      >
                        <option value="0.8">0.8x</option>
                        <option value="1.0">1.0x</option>
                        <option value="1.2">1.2x</option>
                      </select>
                    )}
                  </div>

                  {/* Font Size Adjuster Segment */}
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 text-xs">
                    {(['normal', 'large', 'huge'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setFontSize(size)}
                        className={`px-2 py-1 font-bold transition cursor-pointer ${
                          fontSize === size
                            ? 'bg-purple-600 text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                      </button>
                    ))}
                  </div>

                  {/* Star / Bookmark */}
                  <button
                    onClick={() => toggleStarred(currentTopic.id)}
                    title={starredTopics[currentTopic.id] ? 'Remove from Starred' : 'Star this topic'}
                    className={`p-1.5 rounded-xl border transition cursor-pointer ${
                      starredTopics[currentTopic.id]
                        ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/60 text-amber-500'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 text-slate-400'
                    }`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>

                  {/* Focus Mode Toggle */}
                  <button
                    onClick={() => setIsFocusMode(!isFocusMode)}
                    title={isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
                    className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                  >
                    {isFocusMode ? <Minimize2 className="w-4 h-4 text-purple-600" /> : <Maximize2 className="w-4 h-4" />}
                  </button>

                  {/* Download Topic Note as PDF */}
                  <button
                    onClick={handleDownloadTopicPdf}
                    title="Download this topic note as a PDF booklet"
                    className="p-1.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">PDF</span>
                  </button>

                  {/* Download Topic Quiz to Excel */}
                  {currentTopic.quiz && currentTopic.quiz.length > 0 && (
                    <button
                      onClick={handleDownloadQuizExcel}
                      title="Download this topic's practice quiz questions in Excel"
                      className="p-1.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span className="hidden lg:inline">Excel</span>
                    </button>
                  )}

                  {/* Print Note */}
                  <button
                    onClick={() => window.print()}
                    title="Print or Save Note as PDF"
                    className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer hidden sm:block"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  {/* Copy Note */}
                  <button
                    onClick={handleCopyNote}
                    title="Copy note text to clipboard"
                    className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  {/* Mark as Mastered */}
                  <button
                    onClick={() => toggleMastered(currentTopic.id)}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      masteredTopics[currentTopic.id]
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {masteredTopics[currentTopic.id] ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>{masteredTopics[currentTopic.id] ? 'Done' : 'Mark Done'}</span>
                  </button>
                </div>
              </div>

              {/* Module Topics Tabs Pill Row */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentPart.topics.map((t) => {
                  const active = t.id === currentTopic.id;
                  const isDone = masteredTopics[t.id];
                  const isStarred = starredTopics[t.id];

                  return (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTopic(currentPart.id, t.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                        active
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {isStarred && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                      {isDone ? (
                        <CheckCircle2 className={`w-3.5 h-3.5 ${active ? 'text-emerald-300' : 'text-emerald-500'}`} />
                      ) : (
                        <span className="opacity-60">{t.topicNumber}</span>
                      )}
                      <span>{t.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sticky Table of Contents Jump Nav & In-Note Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                    Jump:
                  </span>
                  <button
                    onClick={() => scrollToSection('sec-summary')}
                    className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-slate-700 dark:text-slate-300 text-[11px] font-semibold transition cursor-pointer"
                  >
                    📌 Summary
                  </button>
                  <button
                    onClick={() => scrollToSection('sec-alert')}
                    className="px-2 py-1 rounded-lg bg-amber-100/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 text-[11px] font-bold hover:bg-amber-200/80 transition cursor-pointer"
                  >
                    ⚡ High-Yield
                  </button>
                  {currentTopic.id === 'eng-topic-1' && (
                    <button
                      onClick={() => scrollToSection('sec-interactive-pos')}
                      className="px-2 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200 text-[11px] font-extrabold hover:bg-indigo-200 transition cursor-pointer flex items-center gap-1 border border-indigo-300/60"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      <span>Parts of Speech Studio</span>
                    </button>
                  )}
                  {currentTopic.id === 'eng-topic-2' && (
                    <button
                      onClick={() => scrollToSection('sec-interactive-tenses')}
                      className="px-2 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200 text-[11px] font-extrabold hover:bg-indigo-200 transition cursor-pointer flex items-center gap-1 border border-indigo-300/60"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      <span>12 Tenses Studio</span>
                    </button>
                  )}
                  {currentTopic.id === 'eng-topic-3' && (
                    <button
                      onClick={() => scrollToSection('sec-interactive-voice')}
                      className="px-2 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200 text-[11px] font-extrabold hover:bg-indigo-200 transition cursor-pointer flex items-center gap-1 border border-indigo-300/60"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      <span>Voice Studio</span>
                    </button>
                  )}
                  {currentTopic.id === 'eng-topic-4' && (
                    <button
                      onClick={() => scrollToSection('sec-interactive-narration')}
                      className="px-2 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200 text-[11px] font-extrabold hover:bg-indigo-200 transition cursor-pointer flex items-center gap-1 border border-indigo-300/60"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      <span>Narration Studio</span>
                    </button>
                  )}
                  {['math-topic-1', 'math-topic-2', 'math-topic-3', 'math-topic-4', 'math-topic-5'].includes(currentTopic.id) && (
                    <button
                      onClick={() => scrollToSection('sec-interactive-math')}
                      className="px-2 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-[11px] font-extrabold hover:bg-emerald-200 transition cursor-pointer flex items-center gap-1 border border-emerald-300/60"
                    >
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>Math Studio</span>
                    </button>
                  )}
                  <button
                    onClick={() => scrollToSection('sec-concepts')}
                    className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-slate-700 dark:text-slate-300 text-[11px] font-semibold transition cursor-pointer"
                  >
                    💡 Concepts ({currentTopic.concepts.length})
                  </button>
                  {currentTopic.comparisonTable && (
                    <button
                      onClick={() => scrollToSection('sec-matrix')}
                      className="px-2 py-1 rounded-lg bg-purple-100/70 dark:bg-purple-950/40 text-purple-800 dark:text-purple-200 text-[11px] font-semibold transition cursor-pointer"
                    >
                      📊 Comparison
                    </button>
                  )}
                  {currentTopic.classroomApplication && (
                    <button
                      onClick={() => scrollToSection('sec-classroom')}
                      className="px-2 py-1 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 text-[11px] font-semibold transition cursor-pointer"
                    >
                      🏫 Classroom
                    </button>
                  )}
                  {currentTopic.frequentExamQuestions.length > 0 && (
                    <button
                      onClick={() => scrollToSection('sec-exam-q')}
                      className="px-2 py-1 rounded-lg bg-indigo-100/70 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-200 text-[11px] font-semibold transition cursor-pointer"
                    >
                      🎯 Past MCQs
                    </button>
                  )}
                  {currentTopic.quickQuiz && currentTopic.quickQuiz.length > 0 && (
                    <button
                      onClick={() => scrollToSection('sec-quiz')}
                      className="px-2 py-1 rounded-lg bg-fuchsia-100/70 dark:bg-fuchsia-950/40 text-fuchsia-800 dark:text-fuchsia-200 text-[11px] font-bold transition cursor-pointer"
                    >
                      📝 Quiz
                    </button>
                  )}
                </div>

                {/* In-Note Real-time Keyword Search Filter */}
                <div className="relative min-w-[200px]">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                  <input
                    type="text"
                    value={inNoteSearch}
                    onChange={(e) => setInNoteSearch(e.target.value)}
                    placeholder="Find in this note..."
                    className="w-full pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-purple-500"
                  />
                  {inNoteSearch && (
                    <button
                      onClick={() => setInNoteSearch('')}
                      className="absolute right-2 top-1.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Note Article Body */}
            <article ref={noteArticleRef} className={`space-y-6 sm:space-y-8 ${fontClass}`}>
              {/* Topic Title Header */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2">
                    <span>Topic {currentTopic.topicNumber}</span>
                    {starredTopics[currentTopic.id] && (
                      <span className="text-amber-500 flex items-center gap-0.5 text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-300/40">
                        <Star className="w-2.5 h-2.5 fill-current" /> Starred
                      </span>
                    )}
                    {masteredTopics[currentTopic.id] && (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-300/40">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Mastered
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                    {highlightText(currentTopic.title)}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full font-medium shrink-0">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentTopic.readTime}</span>
                </div>
              </div>

              {/* Summary Block */}
              <div id="sec-summary" className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-l-4 border-l-purple-600 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed italic">
                &ldquo;{highlightText(currentTopic.summary)}&rdquo;
              </div>

              {/* STEDA High-Yield Alert Callout */}
              <div id="sec-alert" className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border-2 border-amber-500/40 dark:border-amber-500/30 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider">
                    <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>STEDA High-Yield Examination Alert</span>
                  </div>
                  {isActiveRecall && (
                    <button
                      onClick={() => toggleReveal('alert-' + currentTopic.id)}
                      className="text-xs font-bold text-amber-800 dark:text-amber-200 underline cursor-pointer"
                    >
                      {revealedItems['alert-' + currentTopic.id] ? 'Hide Answer' : '👁️ Reveal Alert'}
                    </button>
                  )}
                </div>

                {isActiveRecall && !revealedItems['alert-' + currentTopic.id] ? (
                  <div
                    onClick={() => toggleReveal('alert-' + currentTopic.id)}
                    className="p-3 bg-amber-500/10 rounded-xl border border-dashed border-amber-400 text-center cursor-pointer hover:bg-amber-500/20 transition"
                  >
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
                      🧠 Active Recall: Can you recall the key exam rule for this topic? Click to reveal.
                    </span>
                  </div>
                ) : (
                  <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold leading-relaxed">
                    {highlightText(currentTopic.highYieldAlert)}
                  </p>
                )}
              </div>

              {/* Embedded Interactive Studios for specific modules */}
              {currentTopic.id === 'eng-topic-1' && (
                <div id="sec-interactive-pos">
                  <InteractivePartsOfSpeechExplorer />
                </div>
              )}
              {currentTopic.id === 'eng-topic-2' && (
                <div id="sec-interactive-tenses">
                  <InteractiveTensesExplorer />
                </div>
              )}
              {currentTopic.id === 'eng-topic-3' && (
                <div id="sec-interactive-voice">
                  <InteractiveVoiceExplorer />
                </div>
              )}
              {currentTopic.id === 'eng-topic-4' && (
                <div id="sec-interactive-narration">
                  <InteractiveNarrationExplorer />
                </div>
              )}
              {['math-topic-1', 'math-topic-2', 'math-topic-3', 'math-topic-4', 'math-topic-5'].includes(currentTopic.id) && (
                <div id="sec-interactive-math">
                  <InteractiveMathNumberStudio />
                </div>
              )}

              {/* Core Concept Blocks */}
              <div id="sec-concepts" className="space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-purple-500" />
                  <span>Core Pedagogical Foundations &amp; Content</span>
                </div>

                <div className="space-y-4">
                  {currentTopic.concepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-2xs border-l-4 border-l-purple-500"
                    >
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-extrabold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{highlightText(concept.conceptTitle)}</span>
                      </h4>

                      {concept.explanation && (
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                          {highlightText(concept.explanation)}
                        </p>
                      )}

                      {/* Bullet points */}
                      {concept.bulletPoints && concept.bulletPoints.length > 0 && (
                        <ul className="space-y-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                          {concept.bulletPoints.map((bp, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                              <span className="leading-relaxed">{highlightText(bp)}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Key Terminology Badges (Clickable Inspector) */}
                      {concept.keyTerms && concept.keyTerms.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                            <span>Key Pedagogical Terminology (Click to Inspect)</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {concept.keyTerms.map((kt, kIdx) => (
                              <div
                                key={kIdx}
                                onClick={() => setInspectTerm(kt)}
                                className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 hover:border-purple-300 cursor-pointer transition"
                              >
                                <div className="text-xs font-extrabold text-purple-700 dark:text-purple-300 flex items-center justify-between">
                                  <span>{highlightText(kt.term)}</span>
                                  <span className="text-[10px] text-purple-500 font-normal">Inspect →</span>
                                </div>
                                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                                  {highlightText(kt.definition)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Structured Comparison Table (if present) */}
              {currentTopic.comparisonTable && (
                <div id="sec-matrix" className="space-y-3">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-purple-500" />
                    <span>Concept Comparison: {currentTopic.comparisonTable.title}</span>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold sticky top-0">
                        <tr>
                          {currentTopic.comparisonTable.headers.map((h, i) => (
                            <th key={i} className="p-3.5 border-b border-slate-200 dark:border-slate-700">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {currentTopic.comparisonTable.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-3.5 ${
                                  cIdx === 0
                                    ? 'font-bold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-800/30'
                                    : 'text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {highlightText(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Mnemonic Hook & Classroom Application */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentTopic.mnemonicAid && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-1.5 shadow-2xs">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Mnemonic Memory Hook</span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-medium leading-relaxed">
                      {highlightText(currentTopic.mnemonicAid)}
                    </p>
                  </div>
                )}

                {currentTopic.classroomApplication && (
                  <div id="sec-classroom" className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-1.5 shadow-2xs">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <School className="w-4 h-4 text-emerald-600" />
                      <span>Sindh Classroom Context</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed">
                      {highlightText(currentTopic.classroomApplication)}
                    </p>
                  </div>
                )}
              </div>

              {/* Frequently Tested STS Questions */}
              {currentTopic.frequentExamQuestions.length > 0 && (
                <div id="sec-exam-q" className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-indigo-500" />
                      <span>High-Frequency STS Exam Questions &amp; Direct Model Answers</span>
                    </div>
                    {isActiveRecall && (
                      <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">
                        Recall Mode
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {currentTopic.frequentExamQuestions.map((qa, i) => {
                      const isRevealed = revealedItems[`qa-${currentTopic.id}-${i}`];
                      return (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm space-y-1.5 shadow-2xs"
                        >
                          <div className="font-bold text-slate-900 dark:text-white">
                            Q: {highlightText(qa.question)}
                          </div>

                          {isActiveRecall && !isRevealed ? (
                            <button
                              onClick={() => toggleReveal(`qa-${currentTopic.id}-${i}`)}
                              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-lg hover:bg-indigo-100 transition cursor-pointer"
                            >
                              👁️ Click to Reveal Model Answer
                            </button>
                          ) : (
                            <div className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center justify-between">
                              <span>Ans: {highlightText(qa.answer)}</span>
                              {isActiveRecall && (
                                <button
                                  onClick={() => toggleReveal(`qa-${currentTopic.id}-${i}`)}
                                  className="text-[10px] text-slate-400 hover:text-slate-600"
                                >
                                  Hide
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Interactive Quick Self-Check Quiz */}
              {currentTopic.quickQuiz && currentTopic.quickQuiz.length > 0 && (
                <div id="sec-quiz" className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-purple-50 via-indigo-50/40 to-blue-50/40 dark:from-purple-950/30 dark:via-slate-900 dark:to-indigo-950/30 border border-purple-200 dark:border-purple-800/60 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                        Instant Self-Check Practice ({currentTopic.quickQuiz.length} Question{currentTopic.quickQuiz.length > 1 ? 's' : ''})
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Test your understanding of this topic with instant pedagogical rationale.
                      </p>
                    </div>
                  </div>

                  {currentTopic.quickQuiz.map((item) => {
                    const selectedAns = quizAnswers[item.id];
                    const isChecked = quizSubmitted[item.id];
                    const isCorrect = selectedAns === item.correctIndex;

                    return (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-2xs"
                      >
                        <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {highlightText(item.question)}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.options.map((opt, oIdx) => {
                            const isThisSelected = selectedAns === oIdx;
                            let optionStyle =
                              'border-slate-200 dark:border-slate-700/80 hover:border-purple-300 dark:hover:border-purple-700';

                            if (isChecked) {
                              if (oIdx === item.correctIndex) {
                                optionStyle =
                                  'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold';
                              } else if (isThisSelected && !isCorrect) {
                                optionStyle =
                                  'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 line-through';
                              }
                            } else if (isThisSelected) {
                              optionStyle =
                                'border-purple-600 bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 font-semibold';
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={isChecked}
                                onClick={() => handleSelectQuizOption(item.id, oIdx)}
                                className={`p-2.5 rounded-xl border text-left text-xs transition cursor-pointer flex items-center gap-2 ${optionStyle}`}
                              >
                                <span
                                  className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 ${
                                    isChecked && oIdx === item.correctIndex
                                      ? 'bg-emerald-600 text-white'
                                      : isThisSelected
                                      ? 'bg-purple-600 text-white'
                                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                  }`}
                                >
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{highlightText(opt)}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Check / Reset Buttons */}
                        <div className="flex items-center gap-2 pt-1">
                          {!isChecked ? (
                            <button
                              disabled={selectedAns === undefined}
                              onClick={() => handleCheckQuiz(item.id)}
                              className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition disabled:opacity-40 cursor-pointer"
                            >
                              Check Answer
                            </button>
                          ) : (
                            <button
                              onClick={() => handleResetQuiz(item.id)}
                              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Retry</span>
                            </button>
                          )}

                          {isChecked && (
                            <span
                              className={`text-xs font-bold ${
                                isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                              }`}
                            >
                              {isCorrect ? '✓ Correct Answer!' : '✗ Incorrect choice'}
                            </span>
                          )}
                        </div>

                        {/* Pedagogical Explanation */}
                        {isChecked && (
                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-700 dark:text-slate-300 border-l-4 border-purple-500">
                            <span className="font-bold text-slate-900 dark:text-white">Pedagogical Explanation: </span>
                            {highlightText(item.explanation)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Bottom Pagination & Progress Controls */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  {prevTopic ? (
                    <button
                      onClick={() => {
                        handleSelectTopic(currentPart.id, prevTopic.id);
                      }}
                      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous: {prevTopic.title}</span>
                    </button>
                  ) : (
                    <div />
                  )}
                </div>

                <button
                  onClick={() => toggleMastered(currentTopic.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    masteredTopics[currentTopic.id]
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs hover:from-purple-700 hover:to-indigo-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {masteredTopics[currentTopic.id] ? 'Topic Mastered! (Unmark)' : 'Mark Topic as Mastered'}
                  </span>
                </button>

                <div>
                  {nextTopic ? (
                    <button
                      onClick={() => {
                        handleSelectTopic(currentPart.id, nextTopic.id);
                      }}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <span>Next: {nextTopic.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const nextPartIndex =
                          (TEACHING_LICENSE_PARTS.findIndex((p) => p.id === currentPart.id) + 1) %
                          TEACHING_LICENSE_PARTS.length;
                        const nextPart = TEACHING_LICENSE_PARTS[nextPartIndex];
                        handleSelectTopic(nextPart.id, nextPart.topics[0].id);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <span>Proceed to Next Module →</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          </div>
        </main>
      </div>
      )}

      {/* 4. KEY TERM INSPECTOR MODAL */}
      {inspectTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setInspectTerm(null)}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              ×
            </button>

            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>STEDA Pedagogical Term Glossary</span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
              {inspectTerm.term}
            </h3>

            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              {inspectTerm.definition}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setInspectTerm(null)}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
