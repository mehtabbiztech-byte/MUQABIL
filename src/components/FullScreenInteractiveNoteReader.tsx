import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  FileText,
  FileSpreadsheet,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Trophy,
  AlertTriangle,
  Lightbulb,
  School,
  Table,
  CheckCircle2,
  HelpCircle,
  Bookmark,
  Share2,
  Compass,
  ArrowRight
} from 'lucide-react';
import { PedagogicalSubjectTopic, PedagogicalSubject } from '../data/pedagogicalSubjectsData';
import { exportStudyLessonToPdf, exportMcqsToExcel } from '../lib/exportUtils';
import { StudyLesson, MCQ } from '../types';

interface FullScreenInteractiveNoteReaderProps {
  topic: PedagogicalSubjectTopic;
  subject: PedagogicalSubject;
  onClose: () => void;
  onNavigateTopic: (direction: 'prev' | 'next') => void;
  hasPrevTopic: boolean;
  hasNextTopic: boolean;
}

export const FullScreenInteractiveNoteReader: React.FC<FullScreenInteractiveNoteReaderProps> = ({
  topic,
  subject,
  onClose,
  onNavigateTopic,
  hasPrevTopic,
  hasNextTopic,
}) => {
  const [isBrowserFullScreen, setIsBrowserFullScreen] = useState(false);
  const [isActiveRecall, setIsActiveRecall] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Quiz interactive state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Active recall revealed concept items
  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});

  const contentRef = useRef<HTMLDivElement>(null);

  // Lock body scroll on mount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrevTopic) {
        onNavigateTopic('prev');
      } else if (e.key === 'ArrowRight' && hasNextTopic) {
        onNavigateTopic('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [onClose, onNavigateTopic, hasPrevTopic, hasNextTopic]);

  // Cancel speech on topic change
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setQuizAnswers({});
    setQuizSubmitted({});
    setRevealedItems({});
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [topic.id]);

  // Track scroll reading progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setReadingProgress(Math.min(100, Math.max(0, Math.round(progress))));
  };

  // Toggle Browser native fullscreen
  const toggleBrowserFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsBrowserFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsBrowserFullScreen(false);
      }
    }
  };

  // Text-To-Speech
  const handleToggleSpeech = (rate = speechRate) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${subject.name}. ${topic.title}. DCAR STBB Competency: ${topic.dcarClassRange}. ${topic.summary}. Examiner Alert: ${topic.highYieldAlert}. Didactic Strategy: ${topic.didacticStrategy.frameworkName}. ${topic.didacticStrategy.classroomImplementation}. Key Concepts: ${topic.concepts.map(c => c.conceptTitle + '. ' + (c.explanation || '')).join('. ')}`;
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
    const text = `=====================================================
STS IBA TEACHING LICENSE PREP · MASTER STUDY NOTE
Subject: ${subject.name}
Topic ${topic.topicNumber}: ${topic.title}
Benchmark: ${topic.dcarClassRange}
=====================================================

OVERVIEW & SUMMARY:
${topic.summary}

HIGH-YIELD EXAMINER ALERT:
${topic.highYieldAlert}

DIDACTIC FRAMEWORK (${topic.didacticStrategy.frameworkName}):
Creator: ${topic.didacticStrategy.creatorOrOrigin}
Core Stages:
${topic.didacticStrategy.coreStages.join('\n')}

Classroom Implementation:
${topic.didacticStrategy.classroomImplementation}

Common Misconception:
${topic.didacticStrategy.commonStudentMisconception}
Remediation:
${topic.didacticStrategy.diagnosticIntervention}

${topic.keyFormulasOrRules ? `KEY RULES / FORMULAS:\n${topic.keyFormulasOrRules.join('\n')}\n\n` : ''}
CLASSROOM SCENARIO:
${topic.classroomApplication || ''}

MEMORY AID:
${topic.mnemonicAid || ''}

PREPARED VIA MEHTAB STS IBA PREP
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Export to PDF
  const handleExportPdf = () => {
    const lesson: StudyLesson = {
      id: topic.id,
      title: `${subject.shortName}: Topic ${topic.topicNumber} — ${topic.title}`,
      audience: 'advanced',
      readTime: topic.readTime,
      explanation: `${topic.summary}\n\nDCAR Curriculum Benchmark: ${topic.dcarClassRange}\n\nExaminer Alert: ${topic.highYieldAlert}\n\nDidactic Strategy: ${topic.didacticStrategy.frameworkName}\n${topic.didacticStrategy.classroomImplementation}`,
      importantPoints: [
        ...topic.didacticStrategy.coreStages,
        `Common Misconception: ${topic.didacticStrategy.commonStudentMisconception}`,
        `Diagnostic Remediation: ${topic.didacticStrategy.diagnosticIntervention}`,
        ...(topic.concepts || []).map((c) => `${c.conceptTitle}: ${c.explanation || ''}`)
      ],
      examples: [
        topic.classroomApplication || '',
        topic.mnemonicAid || ''
      ],
      tables: topic.comparisonTable ? [topic.comparisonTable] : [],
      formulas: topic.keyFormulasOrRules || [],
      practice: (topic.frequentExamQuestions || []).map((q) => ({
        prompt: q.question,
        answer: q.answer
      })),
      relatedQuestionIds: [],
      mcqs: (topic.quickQuiz || []).map((q, idx) => ({
        id: `${topic.id}-q-${idx}`,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        category: 'pedagogy',
        difficulty: 'Medium'
      }))
    };
    exportStudyLessonToPdf(lesson);
  };

  // Export MCQs to Excel
  const handleExportExcel = () => {
    if (!topic.quickQuiz || topic.quickQuiz.length === 0) return;
    const mcqs: MCQ[] = topic.quickQuiz.map((q, idx) => ({
      id: `${topic.id}-quiz-${idx}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      category: 'pedagogy',
      difficulty: 'Medium',
      examTags: ['STS IBA Teaching License', subject.shortName, `Topic ${topic.topicNumber}`]
    }));
    exportMcqsToExcel(mcqs, `STEDA_${subject.shortName}_Topic_${topic.topicNumber}`, {
      subject: subject.name
    });
  };

  // Handle Quiz selection
  const handleSelectQuizOption = (quizId: string, optIndex: number) => {
    if (quizSubmitted[quizId]) return;
    setQuizAnswers((prev) => ({ ...prev, [quizId]: optIndex }));
  };

  const handleCheckQuiz = (quizId: string) => {
    setQuizSubmitted((prev) => ({ ...prev, [quizId]: true }));
  };

  // Font size classes
  const fontClass =
    fontSize === 'huge'
      ? 'text-lg sm:text-xl leading-loose'
      : fontSize === 'large'
      ? 'text-base sm:text-lg leading-relaxed'
      : 'text-sm sm:text-base leading-relaxed';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${topic.title} Interactive Full Screen Note`}
      className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-100 overflow-hidden animate-in fade-in duration-200"
    >
      {/* 1. TOP STICKY HEADER & COMMAND BAR */}
      <header className="shrink-0 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg z-20">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer shrink-0"
            title="Close Full Screen Note (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="min-w-0 space-y-0.5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className={`px-2 py-0.5 rounded-md font-extrabold ${subject.badgeBg} ${subject.badgeText}`}>
                {subject.shortName} · Topic {topic.topicNumber}
              </span>
              <span className="hidden md:inline text-slate-500">•</span>
              <span className="hidden md:inline text-slate-400 font-medium">
                {topic.dcarClassRange}
              </span>
              <span className="hidden sm:inline text-emerald-400 font-bold">
                {topic.readTime}
              </span>
            </div>
            <h1 className="text-sm sm:text-lg font-black tracking-tight text-white truncate max-w-2xl">
              {topic.title}
            </h1>
          </div>
        </div>

        {/* Toolbar Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0 self-end sm:self-auto">
          {/* Active Recall Mode */}
          <button
            onClick={() => setIsActiveRecall(!isActiveRecall)}
            title={isActiveRecall ? 'Turn off Recall Mode' : 'Turn on Active Recall Mode (masks answers to test yourself)'}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isActiveRecall
                ? 'bg-purple-600 text-white border-purple-500 shadow-md ring-2 ring-purple-400/30'
                : 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {isActiveRecall ? <EyeOff className="w-3.5 h-3.5 text-amber-300" /> : <Eye className="w-3.5 h-3.5 text-purple-400" />}
            <span className="hidden md:inline">{isActiveRecall ? 'Recall Mode ON' : 'Self-Test Mode'}</span>
          </button>

          {/* Text-To-Speech */}
          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 overflow-hidden text-xs">
            <button
              onClick={() => handleToggleSpeech(speechRate)}
              title={isSpeaking ? 'Stop audio recitation' : 'Listen to this study note'}
              className={`px-2.5 py-1.5 font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                isSpeaking
                  ? 'bg-amber-500 text-slate-950 font-bold animate-pulse'
                  : 'hover:bg-slate-700 text-slate-300'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
              <span className="hidden lg:inline">{isSpeaking ? 'Stop' : 'Listen'}</span>
            </button>
            {isSpeaking && (
              <select
                value={speechRate}
                onChange={(e) => {
                  const rate = parseFloat(e.target.value);
                  setSpeechRate(rate);
                  handleToggleSpeech(rate);
                }}
                className="bg-transparent text-[11px] font-bold text-slate-300 pr-1 focus:outline-hidden"
              >
                <option value="0.8">0.8x</option>
                <option value="1.0">1.0x</option>
                <option value="1.2">1.2x</option>
              </select>
            )}
          </div>

          {/* Font Size Adjuster */}
          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 overflow-hidden text-xs">
            {(['normal', 'large', 'huge'] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => setFontSize(sz)}
                className={`px-2 py-1 font-bold transition cursor-pointer ${
                  fontSize === sz
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-700'
                }`}
              >
                {sz === 'normal' ? 'A' : sz === 'large' ? 'A+' : 'A++'}
              </button>
            ))}
          </div>

          {/* Download PDF */}
          <button
            onClick={handleExportPdf}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            title="Download complete lesson notes in PDF format"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">PDF</span>
          </button>

          {/* Export MCQs Excel */}
          {topic.quickQuiz && topic.quickQuiz.length > 0 && (
            <button
              onClick={handleExportExcel}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-blue-400 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Download practice quiz in Excel (.xlsx)"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Excel</span>
            </button>
          )}

          {/* Copy Note */}
          <button
            onClick={handleCopyNote}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            title="Copy entire note to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden xl:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Browser Fullscreen Toggle */}
          <button
            onClick={toggleBrowserFullScreen}
            className="p-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            title="Toggle Browser Full Screen (F11)"
          >
            {isBrowserFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Reading Progress Indicator */}
      <div className="w-full h-1 bg-slate-900 shrink-0">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* 2. MAIN SCROLLABLE CONTENT BODY */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-16 py-8 space-y-8 max-w-6xl mx-auto w-full"
      >
        {/* Banner Card */}
        <section className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${subject.gradient} text-white shadow-2xl relative overflow-hidden border border-white/10`}>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-xs font-extrabold uppercase tracking-widest text-amber-300 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DCAR CLASS 1–8 &amp; STEDA LICENSING BLUEPRINT · 10 MCQs WEIGHTAGE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
              {topic.title}
            </h2>
            <p className="text-slate-100/90 text-sm sm:text-base leading-relaxed max-w-3xl font-medium">
              {topic.summary}
            </p>
          </div>
        </section>

        {/* High-Yield Examiner Alert Box */}
        <section className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-slate-900 to-orange-950/40 p-5 sm:p-6 text-amber-200 shadow-md space-y-2">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
            <h3 className="text-sm sm:text-base font-black text-amber-300 tracking-wide uppercase">
              Sukkur IBA &amp; STEDA High-Yield Examiner Alert
            </h3>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-200 whitespace-pre-line font-medium pl-7">
            {topic.highYieldAlert}
          </p>
        </section>

        {/* Subject Didactic Strategy Studio */}
        <section className="rounded-3xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-400 uppercase tracking-wider">
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>Pedagogical Didactics &amp; Teaching Framework</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {topic.didacticStrategy.frameworkName}
              </h3>
              <p className="text-xs text-slate-400">
                Origin / Theorist: <strong className="text-slate-200">{topic.didacticStrategy.creatorOrOrigin}</strong>
              </p>
            </div>
          </div>

          {/* Didactic Stages */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Core Instructional Stages
            </h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topic.didacticStrategy.coreStages.map((stage, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-1.5 hover:border-indigo-500/40 transition"
                >
                  <span className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-black text-xs">
                    {sIdx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-snug">
                    {stage}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation & Misconception Breakdown */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <School className="w-4 h-4" />
                <span>Classroom Implementation Strategy</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {topic.didacticStrategy.classroomImplementation}
              </p>
            </div>

            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Common Student Misconception &amp; Diagnostic Fix</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-300">Misconception:</strong> {topic.didacticStrategy.commonStudentMisconception}
              </p>
              <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed border-t border-rose-500/20 pt-2">
                <strong className="text-emerald-400">Diagnostic Intervention:</strong> {topic.didacticStrategy.diagnosticIntervention}
              </p>
            </div>
          </div>
        </section>

        {/* Key Formulas or Rules (If present) */}
        {topic.keyFormulasOrRules && topic.keyFormulasOrRules.length > 0 && (
          <section className="rounded-3xl border border-cyan-500/30 bg-slate-900/80 p-6 space-y-3 shadow-lg">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Essential Formulas &amp; Foundational Rules</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {topic.keyFormulasOrRules.map((rule, rIdx) => (
                <div
                  key={rIdx}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs sm:text-sm text-cyan-200"
                >
                  {rule}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Deep Dive Concept Blocks */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-purple-400 font-black uppercase text-xs tracking-widest">
            <BookOpen className="w-4 h-4" />
            <span>In-Depth Conceptual Analysis</span>
          </div>

          <div className="space-y-6">
            {topic.concepts.map((concept, cIdx) => (
              <article
                key={cIdx}
                className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-4 shadow-xl"
              >
                <h4 className="text-lg sm:text-xl font-black text-white flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/40 flex items-center justify-center text-xs font-black shrink-0">
                    {cIdx + 1}
                  </span>
                  <span>{concept.conceptTitle}</span>
                </h4>

                {concept.explanation && (
                  <p className={`${fontClass} text-slate-300 leading-relaxed`}>
                    {concept.explanation}
                  </p>
                )}

                {/* Key Terms */}
                {concept.keyTerms && concept.keyTerms.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Key Terminology &amp; Definitions
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {concept.keyTerms.map((term, tIdx) => (
                        <div
                          key={tIdx}
                          className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-1.5"
                        >
                          <span className="font-black text-xs sm:text-sm text-indigo-300 block">
                            {term.term}
                          </span>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {isActiveRecall && !revealedItems[`${cIdx}-${tIdx}`] ? (
                              <button
                                onClick={() =>
                                  setRevealedItems((prev) => ({
                                    ...prev,
                                    [`${cIdx}-${tIdx}`]: true,
                                  }))
                                }
                                className="w-full py-2 rounded-lg bg-purple-950/60 border border-purple-700/60 text-purple-300 font-bold text-xs hover:bg-purple-900/60 transition cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Click to Reveal Definition (Self-Test)</span>
                              </button>
                            ) : (
                              term.definition
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bullet Points */}
                {concept.bulletPoints && concept.bulletPoints.length > 0 && (
                  <ul className="space-y-2 pt-2 pl-4 list-disc marker:text-purple-400 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {concept.bulletPoints.map((point, pIdx) => (
                      <li key={pIdx}>{point}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        {topic.comparisonTable && (
          <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-4 shadow-xl overflow-hidden">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <Table className="w-4 h-4" />
              <span>Comparative Analytical Matrix</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              {topic.comparisonTable.title}
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                    {topic.comparisonTable.headers.map((h, hIdx) => (
                      <th key={hIdx} className="p-3.5 font-black uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {topic.comparisonTable.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="hover:bg-slate-800/40 transition even:bg-slate-950/40"
                    >
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`p-3.5 leading-relaxed ${
                            cIdx === 0 ? 'font-bold text-white' : ''
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
          </section>
        )}

        {/* Sindh Classroom Application Case Study */}
        {topic.classroomApplication && (
          <section className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-6 sm:p-8 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <School className="w-4 h-4" />
              <span>Sindh Classroom Practical Case Study (DCAR Class 1–8)</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Implementation in a Government Elementary School
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {topic.classroomApplication}
            </p>
          </section>
        )}

        {/* Memory Mnemonics Box */}
        {topic.mnemonicAid && (
          <section className="rounded-2xl border border-pink-500/30 bg-pink-950/20 p-5 space-y-2">
            <div className="flex items-center gap-2 text-pink-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Memory Aids &amp; Mnemonics</span>
            </div>
            <p className="text-xs sm:text-sm text-pink-200 font-medium whitespace-pre-line leading-relaxed">
              {topic.mnemonicAid}
            </p>
          </section>
        )}

        {/* Interactive Self-Check Practice Quiz */}
        {topic.quickQuiz && topic.quickQuiz.length > 0 && (
          <section className="rounded-3xl border border-purple-500/40 bg-gradient-to-br from-purple-950/30 via-slate-900 to-indigo-950/30 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-500/30 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black">
                  <Trophy className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    Interactive Self-Check Practice Quiz
                  </h3>
                  <p className="text-xs text-slate-400">
                    {topic.quickQuiz.length} authentic MCQs aligned with STS IBA screening tests
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {topic.quickQuiz.map((item, qIdx) => {
                const selectedAns = quizAnswers[item.id];
                const isChecked = quizSubmitted[item.id];
                const isCorrect = selectedAns === item.correctIndex;

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-black text-xs flex items-center justify-center shrink-0">
                        {qIdx + 1}
                      </span>
                      <p className="font-bold text-sm sm:text-base text-white leading-relaxed">
                        {item.question}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="grid gap-2 sm:grid-cols-2">
                      {item.options.map((opt, oIdx) => {
                        const isSelected = selectedAns === oIdx;
                        let btnStyle = 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-purple-500/60';

                        if (isChecked) {
                          if (oIdx === item.correctIndex) {
                            btnStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'border-rose-500 bg-rose-950/60 text-rose-200 line-through';
                          }
                        } else if (isSelected) {
                          btnStyle = 'border-purple-500 bg-purple-950/60 text-purple-200 font-bold';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isChecked}
                            onClick={() => handleSelectQuizOption(item.id, oIdx)}
                            className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition cursor-pointer flex items-center gap-2.5 ${btnStyle}`}
                          >
                            <span
                              className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 ${
                                isChecked && oIdx === item.correctIndex
                                  ? 'bg-emerald-600 text-white'
                                  : isSelected
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Check / Explanation */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      {!isChecked ? (
                        <button
                          disabled={selectedAns === undefined}
                          onClick={() => handleCheckQuiz(item.id)}
                          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs transition cursor-pointer"
                        >
                          Check Answer
                        </button>
                      ) : (
                        <div
                          className={`w-full p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                            isCorrect
                              ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-200'
                              : 'bg-rose-950/40 border border-rose-500/40 text-rose-200'
                          }`}
                        >
                          <strong className="block mb-1 font-black">
                            {isCorrect ? '✓ Correct Answer!' : `✗ Incorrect (Correct: ${String.fromCharCode(65 + item.correctIndex)}: ${item.options[item.correctIndex]})`}
                          </strong>
                          <span>{item.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Frequent Exam Questions */}
        {topic.frequentExamQuestions && topic.frequentExamQuestions.length > 0 && (
          <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Past Exam Questions &amp; Model Answers</span>
            </div>
            <div className="space-y-3">
              {topic.frequentExamQuestions.map((fq, fqIdx) => (
                <details
                  key={fqIdx}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-4 transition group"
                >
                  <summary className="font-bold text-xs sm:text-sm text-slate-200 cursor-pointer list-none flex items-center justify-between gap-3">
                    <span>Q{fqIdx + 1}: {fq.question}</span>
                    <span className="text-purple-400 text-xs group-open:rotate-90 transition">▸</span>
                  </summary>
                  <div className="mt-3 pt-3 border-t border-slate-800 text-xs sm:text-sm text-emerald-300 leading-relaxed">
                    <strong className="block mb-1 text-slate-400 text-xs font-semibold uppercase">Verified Model Answer:</strong>
                    {fq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* 3. BOTTOM TOPIC NAVIGATION FOOTER */}
        <footer className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 pb-12">
          <button
            disabled={!hasPrevTopic}
            onClick={() => onNavigateTopic('prev')}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-800 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Topic</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-extrabold text-xs sm:text-sm transition cursor-pointer text-center"
          >
            Exit to Subject Library
          </button>

          <button
            disabled={!hasNextTopic}
            onClick={() => onNavigateTopic('next')}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:opacity-30 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
          >
            <span>Next Topic</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </div>
  );
};
