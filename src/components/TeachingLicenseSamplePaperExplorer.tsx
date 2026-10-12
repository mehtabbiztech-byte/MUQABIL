import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Award,
  Layers,
  Sparkles,
  BookOpen,
  GraduationCap,
  ChevronRight,
  ChevronDown,
  Printer,
  RotateCcw,
  Check,
  Search,
  Filter,
  BarChart3,
  Lightbulb,
  Edit3,
  BookmarkCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  TEST_DIVISION_SUMMARY,
  SAMPLE_PAPER_ERQ,
  SAMPLE_PAPER_CRQS,
  SAMPLE_PAPER_MCQS,
  SamplePaperMCQ,
  CRQItem,
} from '../data/teachingLicenseSamplePaperData';

interface Props {
  onBackToSyllabus?: () => void;
}

export const TeachingLicenseSamplePaperExplorer: React.FC<Props> = ({ onBackToSyllabus }) => {
  const [activeSection, setActiveSection] = useState<'specification' | 'erq' | 'crq' | 'mcqs'>('specification');
  const [selectedCrqIndex, setSelectedCrqIndex] = useState<number>(0);
  
  // ERQ Practice State
  const [erqUserDraft, setErqUserDraft] = useState<string>(() => {
    return localStorage.getItem('tl_sample_erq_draft') || '';
  });
  const [showErqModelAnswer, setShowErqModelAnswer] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem('tl_sample_erq_draft', erqUserDraft);
  }, [erqUserDraft]);

  // CRQ Practice State
  const [crqUserDrafts, setCrqUserDrafts] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('tl_sample_crq_drafts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [showCrqModelAnswer, setShowCrqModelAnswer] = useState<boolean>(true);

  const handleCrqDraftChange = (qNo: number, val: string) => {
    const next = { ...crqUserDrafts, [qNo]: val };
    setCrqUserDrafts(next);
    localStorage.setItem('tl_sample_crq_drafts', JSON.stringify(next));
  };

  // MCQs Interactive State
  const [mcqUserAnswers, setMcqUserAnswers] = useState<Record<number, number>>({});
  const [mcqFilterLevel, setMcqFilterLevel] = useState<string>('all');
  const [mcqMode, setMcqMode] = useState<'practice' | 'test'>('practice');
  const [mcqSubmitted, setMcqSubmitted] = useState<boolean>(false);

  const filteredMcqs = useMemo(() => {
    if (mcqFilterLevel === 'all') return SAMPLE_PAPER_MCQS;
    return SAMPLE_PAPER_MCQS.filter((m) => m.cognitiveLevel.toLowerCase().includes(mcqFilterLevel.toLowerCase()));
  }, [mcqFilterLevel]);

  const scoreStats = useMemo(() => {
    let correct = 0;
    let answered = 0;
    SAMPLE_PAPER_MCQS.forEach((m) => {
      const userAns = mcqUserAnswers[m.qNo];
      if (userAns !== undefined) {
        answered++;
        if (userAns === m.correctIndex) {
          correct++;
        }
      }
    });
    return {
      correct,
      answered,
      total: SAMPLE_PAPER_MCQS.length,
      marks: correct,
      weightageEarned: (correct * 0.5).toFixed(1),
    };
  }, [mcqUserAnswers]);

  const handleSelectOption = (qNo: number, optionIdx: number) => {
    if (mcqSubmitted && mcqMode === 'test') return;
    setMcqUserAnswers((prev) => ({ ...prev, [qNo]: optionIdx }));
  };

  const handleResetMcqs = () => {
    setMcqUserAnswers({});
    setMcqSubmitted(false);
  };

  const currentCrq = SAMPLE_PAPER_CRQS[selectedCrqIndex] || SAMPLE_PAPER_CRQS[0];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider">
              Official Document
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white font-bold text-xs">
              Sindh Teacher Licensing Test
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
              Total 300 Marks · 150 Mins
            </span>
          </div>

          {onBackToSyllabus && (
            <button
              onClick={onBackToSyllabus}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 transition cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-300" />
              <span>Back to Syllabus Explorer</span>
            </button>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white">
          IBA STS 2024 Past Paper for Teacher Licensing Test with Specification
        </h2>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          The complete official specification blueprint and past examination paper comprising <strong>Section 1: Case Study Analysis (ERQ - 100 Marks, Mr. Ahmed Interior Sindh Case)</strong>, <strong>Section 2: Constructed Response Questions (10 CRQs - 150 Marks)</strong>, and <strong>Section 3: 50 Multiple Choice Questions (50 Marks)</strong> with full marking rubrics and official answer keys.
        </p>

        {/* Section Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/10">
          {[
            { id: 'specification', label: '📊 Test Specification', count: 'Overview' },
            { id: 'erq', label: '📝 Section 1: Case Study (ERQ)', count: '100 Marks (25%)' },
            { id: 'crq', label: '✍️ Section 2: CRQs (10 Qs)', count: '150 Marks (50%)' },
            { id: 'mcqs', label: '🔘 Section 3: MCQs (50 Qs)', count: '50 Marks (25%)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 ${
                activeSection === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/40 font-extrabold ring-2 ring-purple-400/40'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/30 text-amber-300 font-extrabold">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 0: SPECIFICATION & SUMMARY OF TEST DIVISION */}
      {activeSection === 'specification' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Official Summary Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-pink-400">
                  Official Blueprint
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display mt-0.5">
                  Summary of Test Division
                </h3>
              </div>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>Print Specification</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3.5 rounded-l-xl">S#</th>
                    <th className="p-3.5">Type of Assessment</th>
                    <th className="p-3.5 text-center">No of Questions</th>
                    <th className="p-3.5 text-center">Marks</th>
                    <th className="p-3.5 text-center">Weightage</th>
                    <th className="p-3.5 text-center rounded-r-xl">Time Allowed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {TEST_DIVISION_SUMMARY.map((row) => (
                    <tr key={row.sNo} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-slate-500">{row.sNo}</td>
                      <td className="p-3.5 font-extrabold text-slate-900 dark:text-white">
                        {row.type}
                      </td>
                      <td className="p-3.5 text-center font-bold text-purple-600 dark:text-pink-400">
                        {row.numberOfQuestions}
                      </td>
                      <td className="p-3.5 text-center font-bold text-amber-600 dark:text-amber-400">
                        {row.marks}
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-pink-300 font-extrabold text-xs">
                          {row.weightagePercent}%
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-semibold text-slate-600 dark:text-slate-400">
                        {row.timeMinutes} Mins
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 dark:bg-slate-800/60 font-black text-slate-900 dark:text-white border-t-2 border-slate-300 dark:border-slate-700">
                    <td className="p-3.5 rounded-l-xl" colSpan={2}>Total Grand Aggregate</td>
                    <td className="p-3.5 text-center text-purple-600 dark:text-pink-400">61 Items</td>
                    <td className="p-3.5 text-center text-amber-600 dark:text-amber-400">300 Marks</td>
                    <td className="p-3.5 text-center text-emerald-600 dark:text-emerald-400">100%</td>
                    <td className="p-3.5 text-center rounded-r-xl">150 Mins (2.5 Hours)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3 Visual Division Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1: ERQ */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-extrabold">
                  Section 1 · 25% Weightage
                </span>
                <span className="text-xs text-slate-400 font-bold">50 Minutes</span>
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                Case Study Analysis (ERQ)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                1 comprehensive situational case study (100 Marks) testing dynamic teaching, socio-economic context adaptation, and low-resource mathematical instruction.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveSection('erq')}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Examine Case Study & Rubrics</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 2: CRQ */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-pink-300 text-xs font-extrabold">
                  Section 2 · 50% Weightage
                </span>
                <span className="text-xs text-slate-400 font-bold">50 Minutes</span>
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                10 Constructed Response (CRQs)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                10 targeted questions (15 marks each = 150 Marks). Assessing differentiated instruction, Deweyan principles, lesson planning, ethics, policies, and parental engagement.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveSection('crq')}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Practice 10 CRQ Items</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 3: MCQs */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold">
                  Section 3 · 25% Weightage
                </span>
                <span className="text-xs text-slate-400 font-bold">50 Minutes</span>
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                50 Objective MCQs
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                50 items (1 mark each, 0.5% weightage). Spanning Content Knowledge (Math, Science, Bio), Assessment, Learning Styles, Classroom Management, and Policy.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveSection('mcqs')}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Launch 50 MCQs Practice Test</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SECTION 1: EXTENDED RESPONSE CASE STUDY (ERQ) */}
      {activeSection === 'erq' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* ERQ Prompt & Scenario */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-extrabold">
                  {SAMPLE_PAPER_ERQ.section}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display mt-2">
                  {SAMPLE_PAPER_ERQ.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
                  Level: {SAMPLE_PAPER_ERQ.level}
                </span>
                <span className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-black text-xs">
                  {SAMPLE_PAPER_ERQ.marks} Marks (25% Weightage)
                </span>
              </div>
            </div>

            {/* Scenario Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-600 dark:text-pink-400">
                <BookOpen className="w-4 h-4" />
                <span>The Classroom Scenario</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line font-serif">
                {SAMPLE_PAPER_ERQ.scenario}
              </div>
            </div>

            {/* Prompt Question */}
            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-2">
              <div className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>Official Question Prompt</span>
              </div>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-relaxed">
                {SAMPLE_PAPER_ERQ.prompt}
              </p>
            </div>

            {/* Official Scoring Rubric */}
            <div>
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-600 dark:text-pink-400" />
                <span>Official Marking Rubric Breakdown (100 Points Total)</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SAMPLE_PAPER_ERQ.rubric.map((r, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {r.criterion}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-pink-300 font-black text-xs">
                        {r.maxPoints} pts
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Practice Pad & Model Answer Accordion */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              
              {/* Draft Pad */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    <Edit3 className="w-4 h-4 text-purple-600 dark:text-pink-400" />
                    <span>Your Written Response Draft (Autosaved)</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {erqUserDraft.trim() ? `${erqUserDraft.trim().split(/\s+/).length} words` : '0 words'}
                  </span>
                </div>
                <textarea
                  value={erqUserDraft}
                  onChange={(e) => setErqUserDraft(e.target.value)}
                  placeholder="Structure your response: 1) Diagnostic understanding, 2) Teaching strategies, 3) Diversity & equity, 4) Resource management in low-resource settings, 5) Summary plan..."
                  rows={8}
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500 font-sans leading-relaxed"
                />
              </div>

              {/* Model Answer Toggle */}
              <div>
                <button
                  onClick={() => setShowErqModelAnswer(!showErqModelAnswer)}
                  className="w-full p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-between text-left cursor-pointer transition hover:bg-purple-100/60 dark:hover:bg-purple-900/40"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-pink-400" />
                    <span className="text-sm font-extrabold text-purple-950 dark:text-pink-200">
                      {showErqModelAnswer ? 'Hide Exemplary Model Answer (100/100 Points)' : 'Reveal Exemplary Model Answer (100/100 Points)'}
                    </span>
                  </div>
                  {showErqModelAnswer ? (
                    <ChevronDown className="w-4 h-4 text-purple-700 dark:text-pink-300" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-purple-700 dark:text-pink-300" />
                  )}
                </button>

                {showErqModelAnswer && (
                  <div className="mt-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xs animate-in fade-in duration-200">
                    <h5 className="text-base font-black text-slate-900 dark:text-white">
                      {SAMPLE_PAPER_ERQ.modelAnswer.title}
                    </h5>

                    <div className="space-y-4">
                      {SAMPLE_PAPER_ERQ.modelAnswer.sections.map((sec, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h6 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {sec.heading}
                            </h6>
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                              {sec.rubricMapped}
                            </span>
                          </div>
                          <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 pl-4 list-disc">
                            {sec.content.map((point, pIdx) => (
                              <li key={pIdx} className="leading-relaxed">
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* SECTION 2: CONSTRUCTED RESPONSE QUESTIONS (CRQS) */}
      {activeSection === 'crq' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Header Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-pink-400">
                  Section 2 · 10 Questions
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display mt-0.5">
                  Constructed Response Questions (CRQs) — 150 Marks (50% Weightage)
                </h3>
              </div>
              <span className="px-3 py-1 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-pink-300 font-extrabold text-xs">
                15 Marks Each · 5% Weightage Each
              </span>
            </div>

            {/* Horizontal Question Switcher Buttons */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {SAMPLE_PAPER_CRQS.map((q, idx) => {
                const isSelected = selectedCrqIndex === idx;
                const hasDraft = !!crqUserDrafts[q.qNo]?.trim();
                return (
                  <button
                    key={q.qNo}
                    onClick={() => setSelectedCrqIndex(idx)}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center ${
                      isSelected
                        ? 'border-purple-600 bg-purple-600 text-white font-black shadow-md ring-2 ring-purple-400/40'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-300'
                    }`}
                  >
                    <span className="text-xs font-bold">Q{q.qNo}</span>
                    {hasDraft && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active CRQ Question Detail Pane */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center">
                  {currentCrq.qNo}
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Subject Matter: {currentCrq.subjectMatter}
                  </div>
                  <div className="text-xs font-semibold text-purple-600 dark:text-pink-400">
                    Cognitive Level: {currentCrq.level}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-extrabold">
                  {currentCrq.marks} Marks (5% Weightage)
                </span>
              </div>
            </div>

            {/* Question Text */}
            <div className="p-5 rounded-2xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/60">
              <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-relaxed">
                {currentCrq.question}
              </h4>
            </div>

            {/* Rubric Breakdown for this CRQ */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-purple-600 dark:text-pink-400" />
                <span>Marking Rubric (3 x 5 = 15 Points)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium text-slate-700 dark:text-slate-300">
                  {currentCrq.rubric.point1}
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium text-slate-700 dark:text-slate-300">
                  {currentCrq.rubric.point2}
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium text-slate-700 dark:text-slate-300">
                  {currentCrq.rubric.point3}
                </div>
              </div>
            </div>

            {/* Practice Draft Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-purple-600 dark:text-pink-400" />
                  <span>Draft Your Response for Question {currentCrq.qNo}:</span>
                </span>
                <span className="text-slate-400 font-normal">
                  {crqUserDrafts[currentCrq.qNo]?.trim() ? `${crqUserDrafts[currentCrq.qNo].trim().split(/\s+/).length} words` : 'Empty'}
                </span>
              </div>
              <textarea
                value={crqUserDrafts[currentCrq.qNo] || ''}
                onChange={(e) => handleCrqDraftChange(currentCrq.qNo, e.target.value)}
                placeholder="Write your 15-mark structured response here adhering to the 3 rubric components above..."
                rows={5}
                className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500 font-sans leading-relaxed"
              />
            </div>

            {/* Model Answer Toggle */}
            <div>
              <button
                onClick={() => setShowCrqModelAnswer(!showCrqModelAnswer)}
                className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer transition"
              >
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{showCrqModelAnswer ? 'Hide High-Scoring Model Answer' : 'Show High-Scoring Model Answer'}</span>
                </span>
                {showCrqModelAnswer ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {showCrqModelAnswer && (
                <div className="mt-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800/80 space-y-3 animate-in fade-in duration-150">
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                    {currentCrq.modelAnswer.summary}
                  </p>
                  <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 pl-4 list-disc">
                    {currentCrq.modelAnswer.keyPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="leading-relaxed">
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-950 dark:text-pink-200">
                    <strong className="font-bold">Classroom Practical Insight:</strong> {currentCrq.modelAnswer.practicalApplication}
                  </div>
                </div>
              )}
            </div>

            {/* Previous / Next buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                disabled={selectedCrqIndex === 0}
                onClick={() => setSelectedCrqIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer disabled:cursor-not-allowed"
              >
                ← Previous CRQ
              </button>

              <span className="text-xs text-slate-400 font-medium">
                Question {selectedCrqIndex + 1} of {SAMPLE_PAPER_CRQS.length}
              </span>

              <button
                disabled={selectedCrqIndex === SAMPLE_PAPER_CRQS.length - 1}
                onClick={() => setSelectedCrqIndex((prev) => Math.min(SAMPLE_PAPER_CRQS.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-xs font-bold text-white cursor-pointer disabled:cursor-not-allowed"
              >
                Next CRQ →
              </button>
            </div>

          </div>

        </div>
      )}

      {/* SECTION 3: MULTIPLE CHOICE QUESTIONS (MCQS) */}
      {activeSection === 'mcqs' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Header Bar with Score Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Section 3 · 50 Questions
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display mt-0.5">
                  Multiple Choice Questions (50 Marks · 25% Weightage)
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMcqMode(mcqMode === 'practice' ? 'test' : 'practice')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer border ${
                    mcqMode === 'practice'
                      ? 'bg-purple-50 dark:bg-purple-950 border-purple-200 text-purple-700 dark:text-pink-300'
                      : 'bg-amber-50 dark:bg-amber-950 border-amber-200 text-amber-800 dark:text-amber-300'
                  }`}
                >
                  Mode: {mcqMode === 'practice' ? '💡 Practice (Instant Reveal)' : '⏱️ Timed Mock Test'}
                </button>

                <button
                  onClick={handleResetMcqs}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
                  title="Reset all MCQ choices"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Score & Progress Tracker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Answered</div>
                <div className="text-lg font-black text-slate-900 dark:text-white">
                  {scoreStats.answered} / {scoreStats.total}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Correct</div>
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                  {scoreStats.correct} Qs
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Score Earned</div>
                <div className="text-lg font-black text-amber-600 dark:text-amber-400">
                  {scoreStats.marks} / 50 Marks
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Weightage Earned</div>
                <div className="text-lg font-black text-purple-600 dark:text-pink-400">
                  {scoreStats.weightageEarned}% / 25%
                </div>
              </div>
            </div>

            {/* Filter Pills for Cognitive Levels */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Level Filter:</span>
              </span>
              {[
                { id: 'all', label: 'All 50 MCQs' },
                { id: 'content', label: 'Content Knowledge (Q1–Q10)' },
                { id: 'comprehension', label: 'Comprehension (Q11–Q20)' },
                { id: 'analytical', label: 'Analytical (Q21–Q45)' },
                { id: 'evaluative', label: 'Evaluative (Q46–Q50)' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setMcqFilterLevel(lvl.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    mcqFilterLevel === lvl.id
                      ? 'bg-purple-600 text-white shadow-xs font-extrabold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* MCQs List */}
          <div className="space-y-4">
            {filteredMcqs.map((mcq) => {
              const selectedOpt = mcqUserAnswers[mcq.qNo];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === mcq.correctIndex;
              const shouldShowAnswer = mcqMode === 'practice' ? isAnswered : mcqSubmitted;

              return (
                <div
                  key={mcq.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  {/* Question header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black text-xs flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                        {mcq.qNo}
                      </span>
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-relaxed">
                          {mcq.question}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-pink-300">
                            Level: {mcq.cognitiveLevel}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            1 Mark · 0.5% weightage
                          </span>
                        </div>
                      </div>
                    </div>

                    {shouldShowAnswer && (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold shrink-0 ${
                        isCorrect
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                      }`}>
                        {isCorrect ? 'Correct ✅' : 'Incorrect ❌'}
                      </span>
                    )}
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-9">
                    {mcq.options.map((opt, optIdx) => {
                      const isThisSelected = selectedOpt === optIdx;
                      const isThisCorrect = mcq.correctIndex === optIdx;

                      let optClasses = 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-purple-300';
                      
                      if (shouldShowAnswer) {
                        if (isThisCorrect) {
                          optClasses = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 font-bold';
                        } else if (isThisSelected && !isThisCorrect) {
                          optClasses = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-950 dark:text-rose-200 line-through';
                        }
                      } else if (isThisSelected) {
                        optClasses = 'border-purple-600 bg-purple-50 dark:bg-purple-950/60 text-purple-950 dark:text-white font-extrabold ring-2 ring-purple-500/30';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(mcq.qNo, optIdx)}
                          className={`p-3 rounded-2xl border text-left text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${optClasses}`}
                        >
                          <span>
                            <strong className="mr-1.5 uppercase font-mono text-[11px] text-slate-400">
                              {String.fromCharCode(97 + optIdx)}.
                            </strong>
                            {opt}
                          </span>
                          {shouldShowAnswer && isThisCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Block */}
                  {shouldShowAnswer && (
                    <div className="ml-9 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        <span>Official Key & Explanation: Option ({String.fromCharCode(97 + mcq.correctIndex)})</span>
                      </div>
                      <p className="leading-relaxed">
                        {mcq.explanation}
                      </p>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
