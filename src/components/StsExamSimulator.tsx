import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trophy, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Flag, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  BookOpen, 
  Bookmark, 
  Share2, 
  Award, 
  ShieldCheck,
  GraduationCap,
  Layers,
  FileText,
  Calculator,
  Globe2,
  Compass,
  Check,
  Eye,
  HelpCircle,
  BarChart3,
  Flame,
  ChevronDown,
  ChevronUp,
  Grid,
  FileSpreadsheet
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  StsCategory, 
  STS_CATEGORIES, 
  generateStsExamPaper, 
  StsGeneratedPaper,
  StsQuestionItem,
  STS_READING_PASSAGES
} from '../data/stsPatternData';
import { useApp } from '../context/AppContext';
import { MCQ, QuizAttempt } from '../types';
import { 
  exportMcqsToPdf, 
  exportMcqsToExcel, 
  exportQuizScorecardToPdf, 
  exportQuizAttemptToExcel 
} from '../lib/exportUtils';

interface StsExamSimulatorProps {
  initialCategory?: StsCategory;
  onClose?: () => void;
}

export const StsExamSimulator: React.FC<StsExamSimulatorProps> = ({ 
  initialCategory = 'graduation',
  onClose
}) => {
  const { toggleBookmark, isBookmarked, recordQuizAttempt, userProfile } = useApp();

  // Mode: 'overview' (Syllabus & Blueprint), 'in-progress' (Live CBT), 'results'
  const [activeMode, setActiveMode] = useState<'overview' | 'in-progress' | 'results'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<StsCategory>(initialCategory);
  
  // Generated Paper Data
  const paper: StsGeneratedPaper = useMemo(() => {
    return generateStsExamPaper(selectedCategory);
  }, [selectedCategory]);

  // Convert questions to standard MCQ format for exports
  const convertedMcqs: MCQ[] = useMemo(() => {
    return paper.allQuestions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      category: q.part,
      subtopic: q.subSection,
      difficulty: (q.difficulty as any) || 'Medium',
      examTags: ['Sukkur IBA STS', paper.categoryInfo.name, paper.categoryInfo.bps]
    }));
  }, [paper]);

  const handleDownloadPaperPdf = (withAnswers: boolean = false) => {
    exportMcqsToPdf(convertedMcqs, {
      title: `${paper.categoryInfo.name} Practice Paper`,
      subtitle: `Sukkur IBA STS Screening Pattern (${paper.categoryInfo.bps}) • 100 MCQs`,
      subject: 'Screening Test (English, Math, General Knowledge)',
      includeAnswers: withAnswers,
      includeExplanations: withAnswers,
      includeOmrSheet: true,
    });
  };

  const handleExportQuestionsExcel = () => {
    exportMcqsToExcel(convertedMcqs, `MUQABIL_STS_${selectedCategory}_100_MCQs`, {
      subject: paper.categoryInfo.name,
      filterName: paper.categoryInfo.bps
    });
  };

  // Exam Progress State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(100 * 60); // 100 Mins
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [showOmrDrawer, setShowOmrDrawer] = useState<boolean>(false);
  const [activeSectionTab, setActiveSectionTab] = useState<'all' | 'english' | 'mathematics' | 'general'>('all');

  // Results & Review Filter
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'flagged' | 'correct'>('all');

  // Launch Simulator
  const handleStartExam = () => {
    setUserAnswers({});
    setFlaggedQuestions({});
    setCurrentIndex(0);
    setSecondsRemaining(paper.durationMinutes * 60);
    setIsTimerPaused(false);
    setStartTime(Date.now());
    setActiveMode('in-progress');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Timer Tick
  useEffect(() => {
    if (activeMode !== 'in-progress' || isTimerPaused) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeMode, isTimerPaused]);

  // Submit Exam
  const handleSubmitExam = () => {
    setActiveMode('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Calculate score
    let score = 0;
    paper.allQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });

    // Confetti on passing
    if (score >= paper.categoryInfo.passingThreshold) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch (e) {
        // Safe fallback
      }
    }

    // Record attempt
    recordQuizAttempt({
      id: `sts-${selectedCategory}-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      title: paper.paperTitle,
      totalQuestions: paper.allQuestions.length,
      score: score,
      timeSpentSeconds: (paper.durationMinutes * 60) - secondsRemaining,
      incorrectQuestions: paper.allQuestions
        .map((q, idx) => ({
          mcq: {
            id: q.id,
            question: q.question,
            options: q.options,
            correctIndex: q.correctIndex,
            explanation: q.explanation,
            category: q.part,
            difficulty: q.difficulty,
          },
          selectedIndex: userAnswers[idx] !== undefined ? userAnswers[idx] : -1,
        }))
        .filter((item) => item.selectedIndex !== item.mcq.correctIndex),
    });
  };

  // Format Time
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Current Question
  const currentQ: StsQuestionItem = paper.allQuestions[currentIndex] || paper.allQuestions[0];

  // Associated Reading Passage
  const activePassage = useMemo(() => {
    if (!currentQ?.isReadingPassage || !currentQ?.passageId) return null;
    return STS_READING_PASSAGES.find((p) => p.id === currentQ.passageId) || null;
  }, [currentQ]);

  // Section Jump Helpers
  const englishQuestions = paper.allQuestions.slice(0, 40);
  const mathQuestions = paper.allQuestions.slice(40, 60);
  const gkQuestions = paper.allQuestions.slice(60, 100);

  // Computed Scores in Result
  const resultsData = useMemo(() => {
    let totalScore = 0;
    let englishScore = 0;
    let mathScore = 0;
    let gkScore = 0;
    let contentScore = 0;
    let pedagogyScore = 0;

    paper.allQuestions.forEach((q, idx) => {
      const isCorrect = userAnswers[idx] === q.correctIndex;
      if (isCorrect) {
        totalScore += 1;
        if (selectedCategory === 'teaching_license') {
          if (idx < 50) contentScore += 1;
          else pedagogyScore += 1;
        }
        if (q.part === 'english') englishScore += 1;
        else if (q.part === 'mathematics') mathScore += 1;
        else gkScore += 1;
      }
    });

    const isQualified = totalScore >= paper.categoryInfo.passingThreshold;
    const isQuotaEligible = totalScore >= paper.categoryInfo.quotaThreshold && !isQualified;

    return {
      totalScore,
      englishScore,
      mathScore,
      gkScore,
      contentScore,
      pedagogyScore,
      isQualified,
      isQuotaEligible,
      percentage: (totalScore / paper.allQuestions.length) * 100,
    };
  }, [paper, userAnswers, selectedCategory]);

  const handleDownloadScorecardPdf = () => {
    const attempt: QuizAttempt = {
      id: `sts-${selectedCategory}-${Date.now()}`,
      title: `Sukkur IBA STS ${paper.categoryInfo.name} Simulator`,
      date: new Date().toISOString(),
      score: resultsData.totalScore,
      totalQuestions: 100,
      timeSpentSeconds: (paper.durationMinutes * 60) - secondsRemaining,
      incorrectQuestions: paper.allQuestions
        .filter((q, idx) => userAnswers[idx] !== q.correctIndex)
        .map(q => q.id),
      certificate: {
        id: `sts-cert-${Date.now()}`,
        quizAttemptId: `sts-${selectedCategory}-${Date.now()}`,
        candidateName: userProfile.name || 'Candidate',
        quizTitle: `Sukkur IBA STS ${paper.categoryInfo.name}`,
        dateIssued: new Date().toISOString(),
        score: resultsData.totalScore,
        totalQuestions: 100,
        percentage: resultsData.percentage,
        verificationCode: `STS-IBA-${resultsData.totalScore}-${Date.now().toString().slice(-4)}`,
        rankTier: resultsData.isQualified ? 'Gold Distinction' : resultsData.isQuotaEligible ? 'Silver Merit' : 'Participation'
      }
    };
    exportQuizScorecardToPdf(attempt, convertedMcqs, userAnswers, userProfile.name || 'Candidate');
  };

  const handleExportSolutionsExcel = () => {
    const attempt: QuizAttempt = {
      id: `sts-${selectedCategory}-${Date.now()}`,
      title: `Sukkur IBA STS ${paper.categoryInfo.name} Simulator`,
      date: new Date().toISOString(),
      score: resultsData.totalScore,
      totalQuestions: 100,
      timeSpentSeconds: (paper.durationMinutes * 60) - secondsRemaining,
      incorrectQuestions: paper.allQuestions
        .filter((q, idx) => userAnswers[idx] !== q.correctIndex)
        .map(q => q.id),
      certificate: {
        id: `sts-cert-${Date.now()}`,
        quizAttemptId: `sts-${selectedCategory}-${Date.now()}`,
        candidateName: userProfile.name || 'Candidate',
        quizTitle: `Sukkur IBA STS ${paper.categoryInfo.name}`,
        dateIssued: new Date().toISOString(),
        score: resultsData.totalScore,
        totalQuestions: 100,
        percentage: resultsData.percentage,
        verificationCode: `STS-IBA-${resultsData.totalScore}-${Date.now().toString().slice(-4)}`,
        rankTier: resultsData.isQualified ? 'Gold Distinction' : resultsData.isQuotaEligible ? 'Silver Merit' : 'Participation'
      }
    };
    exportQuizAttemptToExcel(attempt, convertedMcqs, userAnswers, userProfile.name || 'Candidate');
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* 1. TOP TITLE BANNER */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Sukkur IBA Testing Services (STS) Pattern</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display">
              STS BPS 05–15 Screening & Teaching Simulator
            </h1>
            <p className="text-emerald-100/80 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Standardized Computer-Based Test (CBT) conforming to the authentic <span className="text-emerald-300 font-bold">40–20–40 sectional split</span> (100 Marks / 100 Mins) with category-specific difficulty tiers and dedicated PST/JEST pedagogy modules.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 bg-black/30 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-500/30 shrink-0">
            <div className="text-center px-2">
              <div className="text-xs text-slate-400 font-medium">Marks</div>
              <div className="text-lg font-black text-amber-400">100</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center px-2">
              <div className="text-xs text-slate-400 font-medium">Time</div>
              <div className="text-lg font-black text-emerald-300">100 Mins</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center px-2">
              <div className="text-xs text-slate-400 font-medium">Penalty</div>
              <div className="text-lg font-black text-teal-300">0.0 (None)</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center px-2">
              <div className="text-xs text-slate-400 font-medium">Pass Cutoff</div>
              <div className="text-lg font-black text-rose-400">50%</div>
            </div>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        {activeMode === 'overview' && (
          <div className="mt-8 pt-6 border-t border-white/15">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-200/90 mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Select STS Recruitment & Teaching Track:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {(Object.keys(STS_CATEGORIES) as StsCategory[]).map((catKey) => {
                const info = STS_CATEGORIES[catKey];
                const isSelected = selectedCategory === catKey;
                return (
                  <button
                    key={catKey}
                    onClick={() => setSelectedCategory(catKey)}
                    className={`p-3 rounded-2xl text-left transition border cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-lg shadow-emerald-950/40 ring-2 ring-white/50'
                        : 'bg-white/10 hover:bg-white/15 text-white border-white/10'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                      {info.bps}
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold truncate mt-0.5">
                      {info.name}
                    </div>
                    <div className="text-[11px] opacity-75 truncate mt-1">
                      {info.badge}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. OVERVIEW & BLUEPRINT MODE */}
      {/* ========================================================================= */}
      {activeMode === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Active Category Description Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-wide">
                    {paper.categoryInfo.bps}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Eligibility: {paper.categoryInfo.eligibility}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
                  {paper.categoryInfo.name}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {paper.categoryInfo.description}
                </p>
              </div>

              {/* Action Button & Downloads */}
              <div className="flex flex-col gap-3 shrink-0">
                <button
                  onClick={handleStartExam}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base transition shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
                  <span>Start {paper.totalMarks}-Mark Mock Simulator</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleDownloadPaperPdf(false)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700 shadow-2xs"
                    title="Download 100-MCQ Blank Exam Paper with OMR Grid in PDF format"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Download Paper (PDF)</span>
                  </button>
                  <button
                    onClick={handleExportQuestionsExcel}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-blue-200 dark:border-blue-900/50 shadow-2xs"
                    title="Export 100 questions to Excel (.xlsx)"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Export MCQs (.xlsx)</span>
                  </button>
                </div>
                <div className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                  Strict {paper.durationMinutes}-minute timer · {paper.totalQuestions} MCQs · Full Explanations
                </div>
              </div>
            </div>
          </div>

          {/* Blueprint Cards */}
          {selectedCategory === 'teaching_license' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                    The Official 50–50 STEDA Teaching License Blueprint
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                    Sukkur IBA Testing Services (STS) pattern under STEDA licensing standards.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Part I: Content Knowledge (50%) */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-extrabold text-xs">
                      50 MCQs · 50%
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      Part I: Content Knowledge (Class 1–8 DCAR)
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      Curriculum content mandated by the Directorate of Curriculum, Assessment and Research (DCAR).
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">English (Grammar, Reading & Vocabulary)</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">10 MCQs</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Mathematics (Arithmetic, Algebra & Geometry)</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">10 MCQs</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">General Science (Physics, Chemistry & Biology)</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">10 MCQs</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Social Studies & Pakistan Studies</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">10 MCQs</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Mother Tongue (Sindhi / Urdu Grammar & Prose)</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">10 MCQs</span>
                    </div>
                  </div>
                </div>

                {/* Part II: Pedagogical Content Knowledge (50%) */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs">
                      50 MCQs · 50%
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      Part II: Pedagogical Content Knowledge (HEC B.Ed)
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      Professional competencies based on National Professional Standards for Teachers (NPST).
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Teaching Methods & Strategies</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">10 MCQs</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Child Development & Educational Psychology</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">10 MCQs</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Classroom Management & Inclusive Environment</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">10 MCQs</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Assessment, Testing & Evaluation</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">10 MCQs</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">School, Community & Teacher Ethics</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">10 MCQs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  The Strict 40–20–40 Sectional Weightage Blueprint
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                  Official Sukkur IBA distribution followed in BPS 05–15 screening examinations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Part I: English (40%) */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-extrabold text-xs">
                    40 MCQs · 40%
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Part I: English
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                    Language competence, comprehension passages, and vocabulary testing.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Reading Comprehension</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">10 MCQs</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Synonyms & Antonyms</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">10 MCQs</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Spellings Check</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">5 MCQs</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Error Detection (A, B, C, D)</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">5 MCQs</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Prepositions & Grammar</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">10 MCQs</span>
                  </div>
                </div>
              </div>

              {/* Part II: Mathematics (20%) */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-extrabold text-xs">
                    20 MCQs · 20%
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Part II: Mathematics
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                    Fundamental quantitative reasoning, arithmetic, algebra, and word problems.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Arithmetic & Fractions (BODMAS)</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">4 MCQs</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Percentages, Profit & Loss</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">4 MCQs</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Ratios & Direct/Inverse Proportions</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">4 MCQs</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Algebraic Equations & Factoring</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">4 MCQs</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Averages, Speed & Word Problems</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">4 MCQs</span>
                  </div>
                </div>
              </div>

              {/* Part III: General Knowledge (40%) */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs">
                    40 MCQs · 40%
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Part III: General Knowledge
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                    Science, regional history, current affairs, computer shortcuts, and Islamic studies.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Everyday Science (Vitamins, Physics, Body)</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">10 MCQs</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Current Affairs & World GK (UN, Capitals)</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">10 MCQs</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Pakistan Affairs & Sindh Studies</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">10 MCQs</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Computer Basics & MS Office Shortcuts</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">5 MCQs</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Islamiat / Ethics</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">5 MCQs</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          )}

          {/* Dedicated Teaching Tracks Feature Card (Teaching License, PST & JEST) */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20 rounded-3xl border border-violet-200 dark:border-violet-900/50 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-200 dark:bg-violet-900/60 text-violet-800 dark:text-violet-300 text-xs font-bold uppercase tracking-wide">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Teaching Cadre & Licensing Included</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
                  Sindh Teaching License (STEDA), PST & JEST Specialized Syllabi
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Sindh School Education Department teaching recruitments through STS include mandatory <span className="font-bold text-violet-700 dark:text-violet-300">Mother Tongue (Sindhi / Urdu literature & grammar)</span> and <span className="font-bold text-violet-700 dark:text-violet-300">Pedagogy & Child Psychology</span> (Piagetian development, Bloom’s taxonomy, and classroom management).
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setSelectedCategory('teaching_license'); handleStartExam(); }}
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition cursor-pointer shadow-md"
                >
                  Start Teaching License Mock (BPS-16)
                </button>
                <button
                  onClick={() => { setSelectedCategory('pst'); handleStartExam(); }}
                  className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition cursor-pointer"
                >
                  Start PST Mock (BPS-14)
                </button>
                <button
                  onClick={() => { setSelectedCategory('jest'); handleStartExam(); }}
                  className="px-5 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs transition cursor-pointer"
                >
                  Start JEST Mock (BPS-14)
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. IN-PROGRESS CBT EXAM SIMULATOR */}
      {/* ========================================================================= */}
      {activeMode === 'in-progress' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Top Sticky Test Bar */}
          <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-md flex items-center justify-between gap-4">
            
            {/* Left: Question Counter & Section Indicator */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs sm:text-sm">
                Q {currentIndex + 1} of 100
              </span>
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {currentQ.part === 'english' ? 'Part I: English' : currentQ.part === 'mathematics' ? 'Part II: Mathematics' : 'Part III: General Knowledge'}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs">
                  {currentQ.subSection}
                </div>
              </div>
            </div>

            {/* Middle: Timer */}
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl font-mono text-sm sm:text-base font-black ${
                secondsRemaining < 600 
                  ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
              }`}>
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
            </div>

            {/* Right: OMR Bubble Sheet Drawer & Finish Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOmrDrawer(!showOmrDrawer)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
                title="View Question Grid"
              >
                <Grid className="w-4 h-4" />
                <span className="hidden md:inline">OMR Grid</span>
              </button>

              <button
                onClick={handleSubmitExam}
                className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold shadow-md transition cursor-pointer"
              >
                Submit Paper
              </button>
            </div>
          </div>

          {/* Section Jump Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => {
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                currentIndex < 40
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Part I: English (1–40)
            </button>
            <button
              onClick={() => {
                setCurrentIndex(40);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                currentIndex >= 40 && currentIndex < 60
                  ? 'bg-amber-600 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Part II: Mathematics (41–60)
            </button>
            <button
              onClick={() => {
                setCurrentIndex(60);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                currentIndex >= 60
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Part III: General Knowledge (61–100)
            </button>
          </div>

          {/* Main Question Display Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Reading Comprehension Passage Column (When Active) */}
            {activePassage && (
              <div className="lg:col-span-5 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-3xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>STS Reading Passage</span>
                  </span>
                  <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                    Questions 1 to 10
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {activePassage.title}
                </h4>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-h-[50vh] overflow-y-auto pr-2 whitespace-pre-line">
                  {activePassage.text}
                </div>
              </div>
            )}

            {/* Question Card */}
            <div className={`${activePassage ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6`}>
              
              {/* Question Sub-header */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                    {currentQ.subSection}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    1 Mark
                  </span>
                </div>

                <button
                  onClick={() => {
                    setFlaggedQuestions((prev) => ({
                      ...prev,
                      [currentIndex]: !prev[currentIndex],
                    }));
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    flaggedQuestions[currentIndex]
                      ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300'
                      : 'text-slate-500 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{flaggedQuestions[currentIndex] ? 'Flagged for Review' : 'Flag Question'}</span>
                </button>
              </div>

              {/* Question Prompt */}
              <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">
                {currentQ.question}
              </div>

              {/* Multiple Choice Options (A, B, C, D) */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                  const isSelected = userAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => {
                        setUserAnswers((prev) => ({
                          ...prev,
                          [currentIndex]: optIdx,
                        }));
                      }}
                      className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition flex items-center gap-4 cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center shrink-0 text-xs transition ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {letter}
                      </div>
                      <span className="text-sm sm:text-base font-medium">
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Nav Controls */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 transition flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {userAnswers[currentIndex] !== undefined ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Answer Saved</span>
                  ) : (
                    <span>Not Answered Yet</span>
                  )}
                </div>

                <button
                  onClick={() => setCurrentIndex((prev) => Math.min(paper.allQuestions.length - 1, prev + 1))}
                  disabled={currentIndex === paper.allQuestions.length - 1}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md disabled:opacity-40 transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Save & Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* OMR Question Palette Drawer / Bottom Panel */}
          {showOmrDrawer && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    100-Question STS OMR Answer Grid
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Click any bubble number to jump directly to that question.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-md bg-emerald-600" />
                    <span>Answered ({Object.keys(userAnswers).length})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-md bg-amber-500" />
                    <span>Flagged ({Object.keys(flaggedQuestions).filter(k => flaggedQuestions[Number(k)]).length})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-md bg-slate-200 dark:bg-slate-800" />
                    <span>Unanswered ({100 - Object.keys(userAnswers).length})</span>
                  </div>
                </div>
              </div>

              {/* Numbers Grid 1 to 100 */}
              <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5 max-h-48 overflow-y-auto p-1">
                {paper.allQuestions.map((_, idx) => {
                  const isAnswered = userAnswers[idx] !== undefined;
                  const isFlagged = flaggedQuestions[idx];
                  const isCurrent = currentIndex === idx;

                  let bgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
                  if (isFlagged) {
                    bgClass = 'bg-amber-500 text-white font-bold';
                  } else if (isAnswered) {
                    bgClass = 'bg-emerald-600 text-white font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-8 rounded-lg text-xs font-medium transition cursor-pointer flex items-center justify-center ${bgClass} ${
                        isCurrent ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900 scale-105' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. RESULTS & ANALYTICS MODE */}
      {/* ========================================================================= */}
      {activeMode === 'results' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Result Score Card */}
          <div className={`rounded-3xl border p-6 sm:p-10 shadow-xl text-center space-y-6 ${
            resultsData.isQualified
              ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-white dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border-emerald-300 dark:border-emerald-800'
              : resultsData.isQuotaEligible
              ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-white dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 border-amber-300 dark:border-amber-800'
              : 'bg-gradient-to-br from-rose-50 via-red-50 to-white dark:from-rose-950/40 dark:via-slate-900 dark:to-slate-900 border-rose-300 dark:border-rose-800'
          }`}>
            
            {/* Qualification Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-sm">
              {resultsData.isQualified ? (
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-4 py-1 rounded-full">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Qualified · Merit List Eligible (≥ 50%)</span>
                </div>
              ) : resultsData.isQuotaEligible ? (
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-4 py-1 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>Eligible for Quota Threshold (40% to 49%)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/80 px-4 py-1 rounded-full">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span>Below 40% Minimum Passing Threshold</span>
                </div>
              )}
            </div>

            {/* Big Score */}
            <div>
              <div className="text-5xl sm:text-7xl font-black text-slate-900 dark:text-white font-display">
                {resultsData.totalScore}
                <span className="text-2xl sm:text-3xl text-slate-400 font-normal"> / 100</span>
              </div>
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 mt-2">
                Overall Accuracy: {resultsData.percentage.toFixed(1)}% · Time Spent: {formatTime((paper.durationMinutes * 60) - secondsRemaining)}
              </div>
            </div>

            {/* Sectional Breakdown Grid */}
            {selectedCategory === 'teaching_license' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Part I: Content Knowledge (DCAR)
                  </div>
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                    {resultsData.contentScore} / 50
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {((resultsData.contentScore / 50) * 100).toFixed(0)}% accuracy
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Part II: Pedagogical Content Knowledge (B.Ed)
                  </div>
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                    {resultsData.pedagogyScore} / 50
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {((resultsData.pedagogyScore / 50) * 100).toFixed(0)}% accuracy
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4 border-t border-slate-200 dark:border-slate-800">
                
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Part I: English
                  </div>
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                    {resultsData.englishScore} / 40
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {((resultsData.englishScore / 40) * 100).toFixed(0)}% accuracy
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Part II: Mathematics
                  </div>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                    {resultsData.mathScore} / 20
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {((resultsData.mathScore / 20) * 100).toFixed(0)}% accuracy
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Part III: General Knowledge
                  </div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                    {resultsData.gkScore} / 40
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {((resultsData.gkScore / 40) * 100).toFixed(0)}% accuracy
                  </div>
                </div>

              </div>
            )}

            {/* Retake & Navigation Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadScorecardPdf}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                title="Download complete result scorecard & explanations in PDF format"
              >
                <FileText className="w-4 h-4" />
                <span>Download Scorecard (PDF)</span>
              </button>

              <button
                onClick={handleExportSolutionsExcel}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                title="Export complete 100-question attempt log to Excel (.xlsx)"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export Solutions (Excel)</span>
              </button>

              <button
                onClick={handleStartExam}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer border border-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake This Simulator</span>
              </button>

              <button
                onClick={() => setActiveMode('overview')}
                className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm transition cursor-pointer"
              >
                Change Category / View Syllabus
              </button>
            </div>

          </div>

          {/* Solution & Mistakes Review Section */}
          <div className="space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  Official STS Answer Key & Solutions
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Detailed step-by-step rationales and grammar rules for all 100 questions.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {[
                  { id: 'all', label: 'All 100' },
                  { id: 'incorrect', label: `Mistakes (${100 - resultsData.totalScore})` },
                  { id: 'correct', label: `Correct (${resultsData.totalScore})` },
                  { id: 'flagged', label: 'Flagged' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setReviewFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      reviewFilter === tab.id
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {paper.allQuestions
                .map((q, idx) => ({ q, idx }))
                .filter(({ q, idx }) => {
                  const isCorrect = userAnswers[idx] === q.correctIndex;
                  if (reviewFilter === 'incorrect') return !isCorrect;
                  if (reviewFilter === 'correct') return isCorrect;
                  if (reviewFilter === 'flagged') return flaggedQuestions[idx];
                  return true;
                })
                .map(({ q, idx }) => {
                  const selected = userAnswers[idx];
                  const isCorrect = selected === q.correctIndex;
                  const isUnanswered = selected === undefined;

                  return (
                    <div
                      key={q.id}
                      className={`bg-white dark:bg-slate-900 rounded-2xl border p-5 sm:p-6 space-y-4 shadow-2xs ${
                        isCorrect
                          ? 'border-emerald-200 dark:border-emerald-900/50'
                          : isUnanswered
                          ? 'border-slate-200 dark:border-slate-800'
                          : 'border-rose-200 dark:border-rose-900/50'
                      }`}
                    >
                      
                      {/* Item Header */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                            isCorrect
                              ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                              : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            {q.subSection}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isCorrect ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Correct (+1)</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 text-xs font-bold">
                              <XCircle className="w-4 h-4" />
                              <span>{isUnanswered ? 'Unanswered (0)' : 'Incorrect (0)'}</span>
                            </span>
                          )}

                          <button
                            onClick={() => toggleBookmark(q.id)}
                            className={`p-1 rounded-lg text-xs cursor-pointer ${
                              isBookmarked(q.id)
                                ? 'text-amber-500'
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                            title="Save to revision notebook"
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Question Text */}
                      <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                        {q.question}
                      </div>

                      {/* Options with Highlighted Correct / Selected */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                        {q.options.map((opt, optIdx) => {
                          const letter = String.fromCharCode(65 + optIdx);
                          const isThisCorrect = optIdx === q.correctIndex;
                          const isThisUserSelected = selected === optIdx;

                          let optionStyle = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                          if (isThisCorrect) {
                            optionStyle = 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold';
                          } else if (isThisUserSelected) {
                            optionStyle = 'bg-rose-100/70 dark:bg-rose-950/60 border-rose-400 dark:border-rose-700 text-rose-900 dark:text-rose-200 line-through';
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`p-3 rounded-xl border flex items-center gap-2.5 ${optionStyle}`}
                            >
                              <div className="w-5 h-5 rounded-md font-bold text-[11px] flex items-center justify-center shrink-0 bg-black/10 dark:bg-white/10">
                                {letter}
                              </div>
                              <span className="flex-1">{opt}</span>
                              {isThisCorrect && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation Callout */}
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">STS Explanation & Rule: </span>
                        {q.explanation}
                      </div>

                    </div>
                  );
                })}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
