import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Download,
  Printer,
  Clock,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Sparkles,
  ExternalLink,
  PenTool,
  Save,
  Check,
  ChevronLeft,
  ChevronRight,
  Landmark,
  ShieldAlert,
  Info
} from 'lucide-react';
import {
  CssSubjectivePaper,
  CssSubjectiveQuestion,
  getAllCssSubjectivePapers,
  getCssSubjectivePaperByYear
} from '../data/cssSubjectivePapersData';

interface CssSubjectivePaperViewProps {
  initialYear?: number;
  initialEntryNumber?: number;
  onClose: () => void;
}

export const CssSubjectivePaperView: React.FC<CssSubjectivePaperViewProps> = ({
  initialYear = 2025,
  initialEntryNumber,
  onClose
}) => {
  const allPapers = useMemo(() => getAllCssSubjectivePapers(), []);

  // Determine starting year based on props
  const startingYear = useMemo(() => {
    if (initialEntryNumber && initialEntryNumber >= 201 && initialEntryNumber <= 216) {
      return 2010 + (initialEntryNumber - 201);
    }
    if (initialYear && initialYear >= 2010 && initialYear <= 2025) {
      return initialYear;
    }
    return 2025;
  }, [initialYear, initialEntryNumber]);

  const [selectedYear, setSelectedYear] = useState<number>(startingYear);
  const [maxWarning, setMaxWarning] = useState<string | null>(null);

  // Sync selectedYear whenever startingYear prop changes
  useEffect(() => {
    setSelectedYear(startingYear);
  }, [startingYear]);

  const currentPaper = useMemo<CssSubjectivePaper>(() => {
    return getCssSubjectivePaperByYear(selectedYear) || allPapers[allPapers.length - 1];
  }, [selectedYear, allPapers]);

  // Track attempted questions (candidate must select 4 out of 7)
  const [attemptedQuestionNums, setAttemptedQuestionNums] = useState<number[]>([]);

  // Expandable outlines state: which question outline is expanded
  const [expandedOutlines, setExpandedOutlines] = useState<Record<number, boolean>>({});

  // Active tab for question view: 'questions' | 'part1-overview'
  const [activeSectionTab, setActiveSectionTab] = useState<'part2' | 'part1'>('part2');

  // Candidate practice notes stored by paper year and question
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});
  const [noteSavedFeedback, setNoteSavedFeedback] = useState<Record<number, boolean>>({});

  // Exam Countdown Timer (180 Minutes = 10,800 Seconds)
  const [timeLeft, setTimeLeft] = useState<number>(180 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Load notes from localStorage on year change
  useEffect(() => {
    const storageKey = `css_notes_${currentPaper.year}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setUserNotes(JSON.parse(saved));
      } catch {
        setUserNotes({});
      }
    } else {
      setUserNotes({});
    }
    // Auto-expand first outline for quick preview
    setExpandedOutlines({ 2: true });
    setAttemptedQuestionNums([]);
    setMaxWarning(null);
  }, [currentPaper.year]);

  // Save notes to localStorage
  const handleNoteChange = (qNum: number, text: string) => {
    const updated = { ...userNotes, [qNum]: text };
    setUserNotes(updated);
    localStorage.setItem(`css_notes_${currentPaper.year}`, JSON.stringify(updated));
  };

  const handleSaveNoteClick = (qNum: number) => {
    setNoteSavedFeedback(prev => ({ ...prev, [qNum]: true }));
    setTimeout(() => {
      setNoteSavedFeedback(prev => ({ ...prev, [qNum]: false }));
    }, 2000);
  };

  // Toggle attempt selection
  const toggleAttemptQuestion = (qNum: number) => {
    if (attemptedQuestionNums.includes(qNum)) {
      setAttemptedQuestionNums(attemptedQuestionNums.filter(n => n !== qNum));
      setMaxWarning(null);
    } else {
      if (attemptedQuestionNums.length >= 4) {
        setMaxWarning('FPSC Rule: You must select only 4 questions to attempt from Part-II (80 marks). Deselect one chosen question first if you wish to change.');
        setTimeout(() => setMaxWarning(null), 4000);
        return;
      }
      setAttemptedQuestionNums([...attemptedQuestionNums, qNum]);
      setMaxWarning(null);
    }
  };

  // Toggle outline
  const toggleOutline = (qNum: number) => {
    setExpandedOutlines(prev => ({ ...prev, [qNum]: !prev[qNum] }));
  };

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(180 * 60);
  };

  // Year navigation helpers
  const currentIndex = allPapers.findIndex(p => p.year === selectedYear);
  const prevPaper = currentIndex > 0 ? allPapers[currentIndex - 1] : null;
  const nextPaper = currentIndex < allPapers.length - 1 ? allPapers[currentIndex + 1] : null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Back & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 font-medium text-sm"
              title="Return to Past Papers Directory"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Directory</span>
            </button>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <Landmark className="w-3.5 h-3.5" />
                FPSC CSS Official
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Paper #{currentPaper.entryNumber} ({currentPaper.year})
              </span>
            </div>
          </div>

          {/* Quick Actions & Countdown Timer */}
          <div className="flex items-center flex-wrap gap-2.5 justify-end">
            {/* 3-Hour Exam Timer */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono">
              <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className={`font-semibold ${timeLeft < 1800 ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-800 dark:text-slate-200'}`}>
                {formatTimer(timeLeft)}
              </span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="ml-1 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                title={isTimerRunning ? 'Pause Timer' : 'Start Timer'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors text-slate-400 hover:text-slate-600"
                title="Reset Timer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Official PDF Download */}
            <a
              href={currentPaper.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              download={`CSS_Current_Affairs_${currentPaper.year}.pdf`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Official PDF</span>
            </a>

            {/* Print Paper */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              title="Print Paper & Outlines"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 16-Year Series Quick Selector Bar (2010 to 2025) */}
        <div className="max-w-6xl mx-auto mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 overflow-x-auto scrollbar-none flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
            Series (2010–2025):
          </span>
          {allPapers.map(p => {
            const isSelected = p.year === selectedYear;
            return (
              <button
                key={p.year}
                onClick={() => setSelectedYear(p.year)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-bold shadow-xs ring-2 ring-emerald-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span className="font-mono">{p.entryNumber}</span> ({p.year})
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        {/* Notice Banner: Descriptive Paper (Not MCQs) */}
        <div className="bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-blue-600/10 border border-emerald-500/25 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Official Subjective / Descriptive Examination Paper (Part-II)
                </h3>
                <span className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Not An MCQ Test
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Contains the complete official essay questions, model outlines, analytical frameworks, and answer drafting scratchpad for CSS aspirants.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Attempted: <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">{attemptedQuestionNums.length} / 4</strong>
            </span>
          </div>
        </div>

        {/* Official FPSC Paper Header Card (Simulating Federal Public Service Commission Examination Hall Paper) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs text-center relative overflow-hidden">
          {/* Subtle watermarked crest styling */}
          <div className="absolute inset-0 bg-radial from-emerald-500/5 to-transparent pointer-events-none" />

          {/* FPSC Title Block */}
          <div className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-5">
            <p className="text-xs font-bold tracking-widest uppercase text-emerald-700 dark:text-emerald-400">
              FEDERAL PUBLIC SERVICE COMMISSION
            </p>
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
              COMPETITIVE EXAMINATION FOR RECRUITMENT TO POSTS IN BS-17 UNDER THE FEDERAL GOVERNMENT, {currentPaper.year}
            </h1>
            <h2 className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
              GENERAL KNOWLEDGE, PAPER-II (CURRENT AFFAIRS)
            </h2>
            <div className="inline-flex items-center gap-2 pt-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Directory Entry #{currentPaper.entryNumber}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                16-Year Series (2010–2025)
              </span>
            </div>
          </div>

          {/* Time & Marks Distribution Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-100 dark:border-slate-800/80 text-left text-xs">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-400 block font-medium">TIME ALLOWED</span>
              <span className="font-bold text-slate-900 dark:text-white">THREE HOURS (180 MINS)</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-400 block font-medium">TOTAL MARKS</span>
              <span className="font-bold text-slate-900 dark:text-white">100 MARKS</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-400 block font-medium">PART-I (MCQs)</span>
              <span className="font-bold text-slate-900 dark:text-white">20 MARKS (30 MINS)</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-400 block font-medium">PART-II (DESCRIPTIVE)</span>
              <span className="font-bold text-slate-900 dark:text-white">80 MARKS (ATTEMPT 4)</span>
            </div>
          </div>

          {/* Official Instructions Box */}
          <div className="mt-4 p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-2xl text-left text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <p className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <Info className="w-4 h-4 shrink-0" />
              OFFICIAL EXAMINATION INSTRUCTIONS:
            </p>
            <ol className="list-decimal list-inside space-y-0.5 text-slate-600 dark:text-slate-400 pl-1">
              <li>First attempt <strong>PART-I (MCQs)</strong> on separate OMR Answer Sheet which is collected after 30 minutes.</li>
              <li><strong>PART-II</strong> is to be attempted on the separate Answer Book. Attempt <strong>ONLY FOUR</strong> questions from Part-II (Q.No. 2 to Q.No. 8).</li>
              <li><strong>ALL questions carry EQUAL marks (20 Marks each).</strong> Extra attempt of any question will not be evaluated.</li>
              <li>Candidates are expected to substantiate their answers with analytical depth, international relations theories, quotes, and contemporary data.</li>
            </ol>
          </div>

          {/* Section Navigation Switcher */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <button
              onClick={() => setActiveSectionTab('part2')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSectionTab === 'part2'
                  ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>PART-II: Subjective Essay Questions (Q.2 – Q.8)</span>
            </button>
            <button
              onClick={() => setActiveSectionTab('part1')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSectionTab === 'part1'
                  ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>PART-I: 20 MCQs Structure & Syllabus Overview</span>
            </button>
          </div>
        </div>

        {/* PART-I TAB CONTENT */}
        {activeSectionTab === 'part1' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                P-I
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  PART-I: Objective MCQs (20 Marks · 30 Minutes)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Conducted on OMR answer sheet at the start of the examination before Part-II subjective paper.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Topics Tested in {currentPaper.year} Objective Section:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentPaper.objectiveTopicsOverview.map((topic, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl text-xs space-y-1.5">
                <p className="font-bold text-emerald-800 dark:text-emerald-300">
                  CSS Preparation Strategy for Part-I (Current Affairs):
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  The 20 MCQs in Current Affairs cover international summits (UN, SCO, BRICS, G20, OIC), multilateral treaties, global heads of state, international organizations, geography capitals, and major national economic figures. Scoring 16–20 marks in Part-I forms the critical distinction between qualifying and failing the CSS General Knowledge Paper-II.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveSectionTab('part2')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
                >
                  <span>Proceed to Part-II Subjective Questions</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PART-II QUESTIONS (Q.No. 2 to Q.No. 8) */}
        {activeSectionTab === 'part2' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>PART-II (DESCRIPTIVE QUESTIONS)</span>
                  <span className="text-xs font-normal text-slate-500">· 80 Marks Total</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Attempt any 4 questions (20 marks each). Click "Attempt" to mark your 4 chosen questions.
                </p>
              </div>
              <button
                onClick={() => {
                  const allExpanded = Object.keys(expandedOutlines).length === currentPaper.questions.length;
                  if (allExpanded) {
                    setExpandedOutlines({});
                  } else {
                    const all: Record<number, boolean> = {};
                    currentPaper.questions.forEach(q => { all[q.qNumber] = true; });
                    setExpandedOutlines(all);
                  }
                }}
                className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {Object.keys(expandedOutlines).length === currentPaper.questions.length ? 'Collapse All Outlines' : 'Expand All Outlines'}
              </button>
            </div>

            {/* Attempt Tracker Banner & Warning */}
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-700 dark:text-slate-300">Attempted Selection:</span>
                <span className={`px-2.5 py-0.5 rounded-full font-black ${
                  attemptedQuestionNums.length === 4
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-200/80 dark:bg-emerald-800/80 text-emerald-900 dark:text-emerald-100'
                }`}>
                  {attemptedQuestionNums.length} / 4 Questions Selected
                </span>
                {attemptedQuestionNums.length > 0 && (
                  <span className="text-slate-500 dark:text-slate-400">
                    (Q.{attemptedQuestionNums.sort((a,b)=>a-b).join(', Q.')})
                  </span>
                )}
              </div>

              {attemptedQuestionNums.length === 4 ? (
                <span className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Target 4 Questions Chosen (80 Marks Total)
                </span>
              ) : (
                <span className="text-slate-500 dark:text-slate-400">
                  Select {4 - attemptedQuestionNums.length} more question{4 - attemptedQuestionNums.length === 1 ? '' : 's'} to complete your attempt
                </span>
              )}
            </div>

            {maxWarning && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-xl animate-in fade-in duration-150 flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0 text-amber-600" />
                <span>{maxWarning}</span>
              </div>
            )}

            {/* Questions Cards */}
            <div className="space-y-5">
              {currentPaper.questions.map((q: CssSubjectiveQuestion) => {
                const isAttempted = attemptedQuestionNums.includes(q.qNumber);
                const isExpanded = !!expandedOutlines[q.qNumber];
                const noteText = userNotes[q.qNumber] || '';
                const wordCount = noteText.trim() ? noteText.trim().split(/\s+/).length : 0;
                const isSaved = !!noteSavedFeedback[q.qNumber];

                return (
                  <div
                    key={q.qNumber}
                    className={`bg-white dark:bg-slate-900 border rounded-3xl p-5 sm:p-7 shadow-xs transition-all ${
                      isAttempted
                        ? 'border-emerald-500/60 dark:border-emerald-500/60 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {/* Question Header & Action Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="w-8 h-8 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center font-bold text-xs">
                          Q.{q.qNumber}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {q.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400">
                          20 MARKS
                        </span>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => toggleAttemptQuestion(q.qNumber)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            isAttempted
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isAttempted ? 'text-white' : 'text-slate-400'}`} />
                          <span>{isAttempted ? 'Selected to Attempt' : 'Attempt Question'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Question Text */}
                    <div className="my-4">
                      <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                        Q. No. {q.qNumber}. {q.questionText} <span className="text-xs text-slate-400 font-bold ml-1">(20)</span>
                      </p>
                    </div>

                    {/* Expandable Model Outline & Framework Accordion */}
                    <div className="mt-4 border-t border-slate-100 dark:border-slate-800/80 pt-3">
                      <button
                        onClick={() => toggleOutline(q.qNumber)}
                        className="w-full flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 py-1"
                      >
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>High-Scoring Strategic Outline & Dimensions</span>
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-xs space-y-3.5 animate-in fade-in duration-150">
                          {/* Introduction / Thesis Statement */}
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                              1. Introduction & Contextual Anchor:
                            </span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                              {q.modelOutline.introduction}
                            </p>
                          </div>

                          {/* Key Analytical Dimensions */}
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                              2. Core Dimensions & Critical Analysis:
                            </span>
                            <ul className="space-y-1.5 pl-1">
                              {q.modelOutline.keyDimensions.map((dim, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                  <span>{dim}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Theoretical Angle */}
                          {q.modelOutline.theoreticalAngle && (
                            <div className="p-2.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/40 dark:border-emerald-800/30">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-0.5">
                                IR Theoretical Lens / Analytical Angle:
                              </span>
                              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                                {q.modelOutline.theoreticalAngle}
                              </span>
                            </div>
                          )}

                          {/* Pragmatic Policy Recommendations */}
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                              3. Pragmatic Policy Recommendations for Pakistan:
                            </span>
                            <ul className="space-y-1.5 pl-1">
                              {q.modelOutline.recommendations.map((rec, rIdx) => (
                                <li key={rIdx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                  <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Authoritative References & Treaties */}
                          {q.modelOutline.keyReferences.length > 0 && (
                            <div className="pt-1">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                                Authoritative Treaties / Reports / Citations:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {q.modelOutline.keyReferences.map((ref, fIdx) => (
                                  <span
                                    key={fIdx}
                                    className="px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-[11px] text-slate-600 dark:text-slate-300"
                                  >
                                    {ref}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Candidate Answer Scratchpad */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <PenTool className="w-3.5 h-3.5 text-slate-400" />
                          <span>Candidate Practice Scratchpad (Auto-saved locally):</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400 font-mono">
                            {wordCount} words
                          </span>
                          <button
                            onClick={() => handleSaveNoteClick(q.qNumber)}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-500 hover:text-emerald-600 transition-colors"
                            title="Save Note"
                          >
                            {isSaved ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Save className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <textarea
                        rows={3}
                        value={noteText}
                        onChange={e => handleNoteChange(q.qNumber, e.target.value)}
                        placeholder={`Draft your outline headings, case studies, and arguments for Q.${q.qNumber}...`}
                        className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800 dark:text-slate-200 resize-y placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Year-to-Year Navigation Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6">
          {prevPaper ? (
            <button
              onClick={() => setSelectedYear(prevPaper.year)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Paper #{prevPaper.entryNumber} ({prevPaper.year})</span>
            </button>
          ) : (
            <div />
          )}

          <div className="text-center text-xs text-slate-500 dark:text-slate-400">
            CSS Current Affairs Past Papers · 2010 to 2025 Complete 16-Year Series
          </div>

          {nextPaper ? (
            <button
              onClick={() => setSelectedYear(nextPaper.year)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <span>Paper #{nextPaper.entryNumber} ({nextPaper.year})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </main>
    </div>
  );
};
