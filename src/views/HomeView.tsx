import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  BookOpen, 
  Trophy, 
  FileText, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Clock, 
  Globe2, 
  Landmark, 
  Moon, 
  BookOpenCheck, 
  Laptop, 
  Atom, 
  Calculator, 
  Zap, 
  FlaskConical, 
  Dna, 
  GraduationCap, 
  PenTool, 
  Compass, 
  Hourglass, 
  TrendingUp, 
  Building2, 
  Network, 
  Sprout,
  Bookmark,
  Share2,
  ChevronRight,
  Briefcase,
  Target,
  FileCheck2
} from 'lucide-react';
import { POPULAR_CATEGORIES } from '../data/categoriesData';
import { EXAMS_DATA } from '../data/examsData';
import { PersonalizedDashboard } from '../components/PersonalizedDashboard';
import { TopSubjectsAndTestingServicesHub } from '../components/TopSubjectsAndTestingServicesHub';
import { StsCategoryTierHub } from '../components/StsCategoryTierHub';

// Map string icon names to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  Globe2: <Globe2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Landmark: <Landmark className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Flame: <Flame className="w-5 h-5 text-amber-500" />,
  Moon: <Moon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  BookOpenCheck: <BookOpenCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Laptop: <Laptop className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Atom: <Atom className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Calculator: <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Zap: <Zap className="w-5 h-5 text-amber-500" />,
  FlaskConical: <FlaskConical className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Dna: <Dna className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  PenTool: <PenTool className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Compass: <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Hourglass: <Hourglass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Users: <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Building2: <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Network: <Network className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Sprout: <Sprout className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Briefcase: <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Target: <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  FileCheck2: <FileCheck2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
};

export const HomeView: React.FC = () => {
  const { 
    setTab, 
    setSelectedCategorySlug, 
    setSelectedExamId, 
    setSelectedPastPaperId,
    setSearchOpen,
    toggleBookmark,
    isBookmarked,
    launchSimulator
  } = useApp();

  const [searchInput, setSearchInput] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Daily Question interactive state
  const dailyMcq = {
    id: 'daily-constitution',
    question: 'In which year was Pakistan’s current Constitution adopted?',
    options: ['1956', '1962', '1973', '1985'],
    correctIndex: 2,
    explanation: 'Pakistan’s current Constitution was adopted in 1973.',
    examTags: ['Pakistan Studies', 'General Knowledge'],
  };
  const featuredPaperRecords = [
    { id: 'sts-jest-official-sample', exam: 'STS', year: 2021, title: 'JEST — Official STS Sample Paper', postName: 'JEST', bps: 'BPS-14', totalQuestions: 100 },
    { id: 'sts-graduation-bps-5-15-2025-record', exam: 'STS', year: 2025, title: 'Graduation Category — Official Date Record', postName: 'Screening test record', bps: 'BPS-05–15', totalQuestions: 0 },
    { id: 'pp-css-mpt-2025', exam: 'CSS', year: 2025, title: 'CSS MPT — Tagged Practice Selection', postName: 'CSS MPT practice', bps: 'BS-17', totalQuestions: 100 },
  ];
  const [dailySelected, setDailySelected] = useState<number | null>(null);
  const [dailyShowExplanation, setDailyShowExplanation] = useState(false);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(true);
  };

  const visibleCategories = showAllCategories 
    ? POPULAR_CATEGORIES 
    : POPULAR_CATEGORIES.slice(0, 8);

  return (
    <div className="space-y-8 pb-8">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-y border-white/15 shadow-2xl" style={{ backgroundImage: "linear-gradient(125deg, rgba(8,18,52,.94) 0%, rgba(42,35,110,.88) 48%, rgba(5,100,138,.82) 100%), url('/themes/pastel-network-uhd.webp')", backgroundPosition: 'center', backgroundSize: 'cover' }}>
        
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(rgba(255,255,255,.65)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-28 -right-20 w-[32rem] h-[32rem] bg-cyan-400/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-20 w-[34rem] h-[34rem] bg-violet-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          
          {/* Left Column: Hero Headline, Subtitle, Buttons, & Search */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-cyan-200/30 text-cyan-100 text-xs font-semibold mb-6 shadow-lg shadow-cyan-950/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Pakistan’s Most Comprehensive Competitive Exam Portal</span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
              Prepare for Pakistan's <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-200 to-fuchsia-300 drop-shadow-sm">
                Competitive & Government Exams
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg xl:text-xl text-blue-50/90 max-w-2xl font-normal leading-relaxed">
              “Practice thousands of MCQs, solve past papers, take timed quizzes, and track your preparation.”
            </p>

            {/* Buttons: Start Practicing, Take a Quiz */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-start-practicing-btn"
                onClick={() => {
                  setTab('mcqs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-cyan-950/40 hover:shadow-cyan-400/20 transition transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 border border-white/20"
              >
                <span>Start Practicing</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-take-quiz-btn"
                onClick={() => {
                  setTab('quiz');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 sm:px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-xl text-white font-semibold text-sm sm:text-base border border-white/20 hover:border-cyan-200/50 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>⚡ STS & FPSC Simulator</span>
              </button>
            </div>

            {/* Prominent Global Search Bar */}
            <div className="mt-10 w-full max-w-2xl">
              <form onSubmit={handleHeroSearchSubmit} className="relative group">
                <div className="relative flex items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-950/30 border-2 border-white/40 group-focus-within:border-emerald-300 transition-all overflow-hidden p-1.5">
                  <Search className="w-6 h-6 text-emerald-600 dark:text-emerald-400 ml-3.5 shrink-0" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onClick={() => setSearchOpen(true)}
                    placeholder="Search MCQs, subjects, exams, topics..."
                    className="w-full px-3 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm sm:text-base bg-transparent focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-sm transition shrink-0 cursor-pointer hidden sm:block shadow-md shadow-emerald-950/20"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Quick Keyword Pills */}
              <div className="mt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Popular:</span>
                {[
                  { 
                    label: '🔥 Teaching License', 
                    action: () => {
                      launchSimulator({
                        simulatorId: 'sts',
                        title: 'STS IBA Teaching License Test (STEDA)',
                        category: 'STS IBA Teaching License Test',
                        durationMinutes: 120,
                        questionCount: 100,
                        negativeMarking: false,
                      });
                    } 
                  },
                  { label: 'STS BPS 5-15', action: () => { setSelectedExamId('sts'); setTab('exams'); } },
                  { label: 'CSS MPT 2025', action: () => { setSelectedExamId('css'); setTab('exams'); } },
                  { label: 'Current Affairs 2026', action: () => setTab('current-affairs') },
                  { label: 'Pakistan Studies', action: () => { setSelectedCategorySlug('pakistan-studies'); setTab('mcqs'); } },
                ].map((p, idx) => (
                  <button
                    key={idx}
                    onClick={p.action}
                    className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-emerald-900/60 border border-slate-700/60 hover:border-emerald-500/40 text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Highlights (Teaching License Test, Hot Updates & Simulator Launches) */}
          <div className="lg:col-span-5 w-full mt-4 lg:mt-0">
            <div className="relative rounded-3xl bg-slate-900/90 backdrop-blur-2xl border-2 border-amber-400/40 dark:border-amber-500/40 p-4 sm:p-6 shadow-2xl shadow-cyan-950/70 overflow-hidden text-left">
              
              {/* Decorative Ambient Glow in Card */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500/30 to-rose-500/30 border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-xs">
                    <Flame className="w-4.5 h-4.5 fill-amber-400 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-white font-display flex items-center gap-1.5">
                      Highlights
                      <span className="text-[11px] font-bold text-amber-300">Hot Updates</span>
                    </h2>
                    <p className="text-[10px] text-slate-400">Verified official test dates & blueprints</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-black uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping inline-block" />
                  Live 2026
                </div>
              </div>

              {/* Highlights Items */}
              <div className="mt-4 space-y-3 relative z-10">
                
                {/* 1. TOP SPOTLIGHT: STS IBA Teaching License Test (STEDA) */}
                <div className="rounded-2xl p-4 bg-gradient-to-br from-amber-500/20 via-rose-500/15 to-purple-950/40 border border-amber-400/50 shadow-md relative overflow-hidden group">
                  <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-gradient-to-l from-rose-600 to-amber-600 text-white text-[9px] font-black tracking-wider uppercase rounded-bl-xl shadow-xs">
                    🔥 SPOTLIGHT
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-amber-400/25 border border-amber-300/40 text-amber-200 text-[10px] font-extrabold">
                      STEDA BPS-16/17
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-violet-400/25 border border-violet-300/40 text-violet-200 text-[10px] font-bold">
                      100 MCQs CBT
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-400/25 border border-emerald-300/40 text-emerald-200 text-[10px] font-bold">
                      Pass: 60%
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    STS IBA Teaching License Examination
                  </h3>
                  
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Official <strong className="text-amber-300">50–50 STEDA Syllabus</strong>: 50% Content Knowledge (Class 1–8 DCAR) & 50% Pedagogical Content Knowledge (HEC B.Ed).
                  </p>

                  {/* Actions for Teaching License */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        launchSimulator({
                          simulatorId: 'sts',
                          title: 'STS IBA Teaching License Test (STEDA)',
                          category: 'STS IBA Teaching License Test',
                          durationMinutes: 120,
                          questionCount: 100,
                          negativeMarking: false,
                        });
                      }}
                      className="flex-1 min-w-[130px] px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-extrabold text-xs shadow-md shadow-amber-950/40 transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Start 100-Mark Mock</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPastPaperId('sts-teaching-license-paper-1');
                        setTab('past-papers');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1"
                      title="Solved Past Paper 1 (100 Questions)"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-300" />
                      <span>Paper 1</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPastPaperId('sts-teaching-license-paper-2');
                        setTab('past-papers');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1"
                      title="Solved Past Paper 2 (100 Questions)"
                    >
                      <FileText className="w-3.5 h-3.5 text-rose-300" />
                      <span>Paper 2</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPastPaperId('sts-teaching-license-paper-3');
                        setTab('past-papers');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1"
                      title="Solved Past Paper 3 (100 Questions) - Latest Model"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Paper 3</span>
                    </button>
                    <button
                      onClick={() => {
                        setTab('study-notes');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-2 rounded-xl bg-purple-500/30 hover:bg-purple-500/50 border border-purple-400/50 text-purple-200 font-bold text-xs transition cursor-pointer flex items-center gap-1 shadow-xs"
                      title="10-Part Master Syllabus Notes & Child Psychology Theory"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-purple-300" />
                      <span>10-Part Notes</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedExamId('sts-teaching-license');
                        setTab('exams');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 font-bold text-xs transition cursor-pointer flex items-center gap-1"
                      title="View Detailed Teaching License Syllabus & Passing Criteria"
                    >
                      <span>Syllabus & Rules</span>
                    </button>
                  </div>
                </div>

                {/* 2. STS BPS 5 to 15 Screening Results & Next Phase */}
                <div className="rounded-xl p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/40 transition">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span className="text-xs font-bold text-white">STS BPS 5–15 Screening</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-400/30">
                      40-20-40 Pattern
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Graduation, Intermediate & Matric categories. Solved keys, typing tests & district quotas.
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() => {
                        launchSimulator({
                          simulatorId: 'sts',
                          title: 'STS BPS 05–15 Screening Simulator',
                          category: 'Graduation (BPS 11–15)',
                          durationMinutes: 100,
                          questionCount: 100,
                          negativeMarking: false,
                        });
                      }}
                      className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>Take 40-20-40 CBT Mock</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                    <span className="text-slate-600">•</span>
                    <button
                      onClick={() => { setSelectedExamId('sts'); setTab('exams'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-[11px] text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      View STS Hub
                    </button>
                  </div>
                </div>

                {/* 3. FPSC General Recruitment 2026 */}
                <div className="rounded-xl p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-400/40 transition">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
                      <span className="text-xs font-bold text-white">FPSC One-Paper 2026</span>
                    </div>
                    <span className="text-[10px] font-bold text-violet-300 bg-violet-500/20 px-1.5 py-0.5 rounded border border-violet-400/30">
                      FIA · Customs · SST
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    20 English + 80 Professional ability tests with official 0.25 negative marking.
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() => {
                        launchSimulator({
                          simulatorId: 'fpsc',
                          title: 'FPSC One-Paper General Recruitment Simulator',
                          category: 'General Recruitment',
                          durationMinutes: 100,
                          questionCount: 100,
                          negativeMarking: true,
                        });
                      }}
                      className="text-[11px] font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>Take FPSC 100-Mark Mock</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                    <span className="text-slate-600">•</span>
                    <button
                      onClick={() => { setSelectedExamId('fpsc'); setTab('exams'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-[11px] text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      View Syllabus
                    </button>
                  </div>
                </div>

                {/* 4. Current Affairs 2026 Digest */}
                <div className="rounded-xl p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-400/40 transition">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                      <span className="text-xs font-bold text-white">Current Affairs 2026</span>
                    </div>
                    <span className="text-[10px] font-bold text-sky-300 bg-sky-500/20 px-1.5 py-0.5 rounded border border-sky-400/30">
                      Monthly Roundups
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Constitutional amendments, Pakistan economy, international summits & sports.
                  </p>
                  <div className="mt-2">
                    <button
                      onClick={() => { setTab('current-affairs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>Explore 2026 Daily Capsules</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* 2. STATISTICS SECTION (Below hero show statistics) */}
        <div className="mt-16 max-w-6xl mx-auto pt-10 border-t border-emerald-900/40">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 text-center">
            
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg">
              <div className="font-extrabold text-2xl sm:text-3xl text-emerald-400 font-display">
                5,000
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Generated STS Practice Items
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg">
              <div className="font-extrabold text-2xl sm:text-3xl text-teal-400 font-display">
                100+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Subjects & Topics
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg">
              <div className="font-extrabold text-2xl sm:text-3xl text-amber-400 font-display">
                500+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Timed Quizzes
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg">
              <div className="font-extrabold text-2xl sm:text-3xl text-cyan-400 font-display">
                100+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Solved Past Papers
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg col-span-2 md:col-span-1">
              <div className="font-extrabold text-2xl sm:text-3xl text-emerald-300 font-display">
                Thousands
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                of Students & Aspirants
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 2. COMPLETE EDUCATIONAL TIER SEPARATION (Matric vs Intermediate vs Graduation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StsCategoryTierHub />
      </section>

      {/* 3. ADAPTIVE PERSONALIZED DASHBOARD */}
      <PersonalizedDashboard />

      {/* 3. INTERACTIVE QUESTION OF THE DAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50/40 to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <Flame className="w-3.5 h-3.5 fill-white" />
                Question of the Day
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Pakistan Studies • Constitutional History
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(dailyMcq.id)}
                className={`p-2 rounded-lg border transition cursor-pointer ${
                  isBookmarked(dailyMcq.id)
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-emerald-600'
                }`}
                title="Bookmark this question"
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(`${dailyMcq.question}\nOptions: ${dailyMcq.options.join(', ')}`);
                  }
                }}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-emerald-600 transition cursor-pointer"
                title="Copy question text"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed mb-6">
            {dailyMcq.question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {dailyMcq.options.map((option, idx) => {
              const isSelected = dailySelected === idx;
              const isCorrect = idx === dailyMcq.correctIndex;
              let btnStyle = 'border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200';

              if (dailySelected !== null) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setDailySelected(idx);
                    setDailyShowExplanation(true);
                  }}
                  className={`p-3.5 rounded-xl border text-left text-sm font-medium transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {dailySelected !== null && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {dailyShowExplanation && (
            <div className="p-4 rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800/80 text-emerald-950 dark:text-emerald-200 text-sm space-y-1 animate-in fade-in duration-200">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Correct Answer: Option {String.fromCharCode(65 + dailyMcq.correctIndex)} ({dailyMcq.options[dailyMcq.correctIndex]})</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {dailyMcq.explanation}
              </p>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Tags: {dailyMcq.examTags?.join(', ')}</span>
            <button
              onClick={() => {
                setSelectedCategorySlug('pakistan-studies');
                setTab('mcqs');
              }}
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
            >
              Practice More Pakistan Studies MCQs →
            </button>
          </div>
        </div>
      </section>

      {/* 3.5 OFFICIAL STS & FPSC PATTERN SIMULATORS & OMR CHECKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Exact Official Blueprints & Carbon-Copy OMR Suite</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">100 Marks • 100 Minutes • Official Blueprints</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  STS BPS 05–15 & FPSC One-Paper Exam Simulators
                </h3>
                <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
                  Practice under verified official test formats. Experience Sukkur IBA’s strict 40–20–40 sectional split, FPSC General Recruitment & Professional Law papers, and evaluate your responses with our virtual Carbon-Copy OMR Key Checker.
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => {
                      launchSimulator({
                        simulatorId: 'sts',
                        category: 'Graduation (BPS 11–15)',
                        negativeMarking: false,
                        timeMinutes: 100,
                      });
                    }}
                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/40 transition cursor-pointer flex items-center gap-2"
                  >
                    <Trophy className="w-4 h-4 text-amber-300" />
                    <span>Launch STS 100-Mark Mock</span>
                  </button>

                  <button
                    onClick={() => {
                      launchSimulator({
                        simulatorId: 'fpsc',
                        category: 'General Recruitment',
                        negativeMarking: false,
                        timeMinutes: 100,
                      });
                    }}
                    className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs sm:text-sm border border-slate-700 hover:border-slate-600 transition cursor-pointer flex items-center gap-2"
                  >
                    <BookOpenCheck className="w-4 h-4 text-cyan-300" />
                    <span>Launch FPSC One-Paper Mock</span>
                  </button>

                  <button
                    onClick={() => {
                      setTab('quiz');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition cursor-pointer flex items-center gap-2"
                  >
                    <span>Open Carbon-Copy OMR Suite →</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                    <span>Sukkur IBA STS (40–20–40)</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px]">Active</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1">
                    <li>• English (40 Marks): RC, Syn/Ant, Spellings</li>
                    <li>• Mathematics (20 Marks): Arithmetic, Algebra</li>
                    <li>• General Knowledge (40 Marks): GK, Science, CA</li>
                    <li>• Tiers: Graduation, Inter, Matric, PST/JEST</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
                  <div className="flex items-center justify-between text-xs text-cyan-400 font-bold">
                    <span>FPSC One-Paper & Laws</span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px]">Active</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1">
                    <li>• Part I: English Grammar & Vocab (20%)</li>
                    <li>• Part II: Professional & Law Modules (80%)</li>
                    <li>• FIA Act 1974, PECA 2016, AML Act 2010</li>
                    <li>• Customs Act 1969 & PPRA Rules 2004</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5. FEATURED STBB CLASS 5 SCIENCE CURRICULUM MODULE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 border border-emerald-800/60 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-wider">
                <Atom className="w-3.5 h-3.5" />
                <span>STBB (Sindh Textbook Board) · Class 5 General Science</span>
                <span className="px-1.5 py-0.2 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black">
                  Chapter 1 Complete
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                Classification of Living Things — Interactive Learning Experience
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Full 8-topic breakdown with 5 Kingdoms, Vertebrates vs Invertebrates, Monocots vs Dicots, interactive Dichotomous Key simulation, and 40 verified topic-covering MCQs. Essential for Sukkur IBA STS PST &amp; JEST test candidates.
              </p>

              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-emerald-200">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 8 Topic Deep-Dives</span>
                <span className="text-emerald-500">•</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 40 Solved MCQs</span>
                <span className="text-emerald-500">•</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Dichotomous Key Tool</span>
                <span className="text-emerald-500">•</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Mnemonics &amp; Riddles</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <button
                onClick={() => {
                  sessionStorage.setItem('matb_open_stbb_science', 'true');
                  setTab('study-notes');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <span>Launch Interactive Module</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setTab('mcqs');
                  sessionStorage.setItem('matb_quick_exam_filter', 'STBB');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs transition cursor-pointer text-center"
              >
                Practice 40 Chapter MCQs
              </button>
            </div>
          </div>

          <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* 4. TOP SUBJECTS & TEST PREPARATION ONLINE HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopSubjectsAndTestingServicesHub />
      </section>

      {/* 5. ALL POPULAR SUBJECT CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Subject-Wise MCQ Banks
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
              All Subjects &amp; Disciplines ({POPULAR_CATEGORIES.length})
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Select any core competitive discipline to study chapter-wise and topic-wise MCQs.
            </p>
          </div>

          <button
            onClick={() => setShowAllCategories((prev) => !prev)}
            className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            <span>{showAllCategories ? 'Show Fewer Categories' : `View All ${POPULAR_CATEGORIES.length} Categories`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategorySlug(cat.slug);
                setTab('mcqs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 dark:hover:border-emerald-500/70 hover:shadow-md transition group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/80 flex items-center justify-center transition">
                    {iconMap[cat.iconName] || <BookOpen className="w-5 h-5 text-emerald-600" />}
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    {cat.totalMcqs.toLocaleString()} items
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition font-display">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">{cat.subtopics.length} Subtopics</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline flex items-center gap-1">
                  <span>Practice</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories Button */}
        {!showAllCategories && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAllCategories(true)}
              className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-emerald-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-sm transition hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              View All {POPULAR_CATEGORIES.length} Categories (Management Sciences, CS, Law, Geography, Agriculture &amp; more)
            </button>
          </div>
        )}
      </section>

      {/* 5. EXAM CATEGORIES (Dedicated preparation areas) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
            Official Commission Portals
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Dedicated Exam Preparation Hubs
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Access exam overview, official syllabus, subject weightage, solved past papers, and mock tests for every Pakistani testing commission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXAMS_DATA.map((exam) => (
            <div
              key={exam.id}
              onClick={() => {
                setSelectedExamId(exam.id);
                setTab('exams');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 dark:hover:border-emerald-500/70 hover:shadow-md transition group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-extrabold text-lg text-emerald-700 dark:text-emerald-400 font-display">
                    {exam.shortName}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    {exam.conductedBy.split(' ')[0]}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition line-clamp-1">
                  {exam.name}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {exam.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {exam.subjects.slice(0, 3).map((sub, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {sub}
                    </span>
                  ))}
                  {exam.subjects.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-400">
                      +{exam.subjects.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  {exam.pastPapersCount} Papers • {exam.mockTestsCount} Mocks
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                  View Syllabus →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LATEST SOLVED PAST PAPERS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                Authentic Solved Archive
              </div>
              <h3 className="text-2xl font-bold font-display">
                Latest Solved Competitive Past Papers
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Use clearly labelled official records, official samples and reconstructed practice selections.
              </p>
            </div>

            <button
              onClick={() => {
                setTab('past-papers');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition cursor-pointer"
            >
              Browse All Papers
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPaperRecords.map((paper) => (
              <div
                key={paper.id}
                onClick={() => {
                  setSelectedPastPaperId(paper.id);
                  setTab('past-papers');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500 transition cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-emerald-400">{paper.exam}</span>
                  <span>{paper.year}</span>
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition line-clamp-1">
                  {paper.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {paper.postName} ({paper.bps})
                </p>
                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-700 text-slate-400">
                  <span>{paper.totalQuestions} Questions</span>
                  <span className="text-emerald-400 font-semibold group-hover:underline">Solve Online →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. QUIZ ENGINE PROMOTIONAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-xl border border-emerald-800/40">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/60 border border-teal-400/30 text-teal-200 text-xs font-semibold mb-3">
              <Clock className="w-3.5 h-3.5" />
              <span>Real-Time Exam Simulator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Test Your Speed with Timed Online Quizzes
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base mt-2 leading-relaxed">
              Experience the pressure of actual exam conditions with countdown timers, 0.25 negative marking toggles, instant graphical performance scorecards, and a dedicated mistake review book.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setTab('quiz');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3 rounded-xl bg-white text-emerald-950 font-bold text-sm shadow-md hover:bg-emerald-50 transition cursor-pointer flex items-center gap-2"
              >
                <span>Launch Mock Exam</span>
                <ArrowRight className="w-4 h-4 text-emerald-800" />
              </button>
              <button
                onClick={() => {
                  setTab('mistakes');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-emerald-800/60 hover:bg-emerald-800 text-white font-semibold text-sm border border-emerald-500/40 transition cursor-pointer"
              >
                Review My Mistakes Notebook
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
