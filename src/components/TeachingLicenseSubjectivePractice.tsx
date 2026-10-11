import React, { useEffect, useMemo, useState } from 'react';
import { 
  BookOpenCheck, 
  CheckCircle2, 
  ChevronDown, 
  Clock3, 
  Search, 
  Sparkles, 
  Target, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle,
  GraduationCap,
  Layers,
  Award,
  Hash
} from 'lucide-react';
import { SubjectiveAnswerEditor } from './SubjectiveAnswerEditor';
import { TEACHING_LICENSE_SUBJECTIVE_QUESTIONS, type SubjectiveQuestionType } from '../data/teachingLicenseSubjectiveData';
import { exportSubjectivePracticeToPdf } from '../lib/exportUtils';

export const TeachingLicenseSubjectivePractice: React.FC = () => {
  const [type, setType] = useState<SubjectiveQuestionType>('CRQ');
  const [areaFilter, setAreaFilter] = useState<'All' | 'Pedagogy' | 'Content Knowledge'>('All');
  const [subjectFilter, setSubjectFilter] = useState<string>('All');
  const [query, setQuery] = useState('');
  
  const typeQuestions = useMemo(
    () => TEACHING_LICENSE_SUBJECTIVE_QUESTIONS.filter((item) => item.type === type), 
    [type]
  );

  // Extract distinct subjects for the active type
  const availableSubjects = useMemo(() => {
    const set = new Set<string>();
    typeQuestions.forEach((q) => {
      if (areaFilter === 'All' || q.area === areaFilter) {
        set.add(q.subject);
      }
    });
    return Array.from(set).sort();
  }, [typeQuestions, areaFilter]);

  // Reset subject filter if it's no longer available
  useEffect(() => {
    if (subjectFilter !== 'All' && !availableSubjects.includes(subjectFilter)) {
      setSubjectFilter('All');
    }
  }, [availableSubjects, subjectFilter]);

  const questions = useMemo(() => {
    let list = typeQuestions;
    if (areaFilter !== 'All') {
      list = list.filter((item) => item.area === areaFilter);
    }
    if (subjectFilter !== 'All') {
      list = list.filter((item) => item.subject === subjectFilter);
    }
    const normalized = query.trim().toLowerCase();
    if (normalized) {
      list = list.filter((item) => 
        `${item.subject} ${item.area} ${item.prompt} ${item.id}`.toLowerCase().includes(normalized)
      );
    }
    return list;
  }, [typeQuestions, areaFilter, subjectFilter, query]);

  const [selectedId, setSelectedId] = useState<string>(() => typeQuestions[0]?.id || 'tl-crq-1');
  const [timed, setTimed] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [showModel, setShowModel] = useState(false);

  // Maintain valid selected item
  const selected = useMemo(() => {
    return questions.find((item) => item.id === selectedId) || questions[0] || typeQuestions[0];
  }, [questions, selectedId, typeQuestions]);

  const currentIndex = useMemo(() => {
    return questions.findIndex((item) => item.id === selected.id);
  }, [questions, selected.id]);

  useEffect(() => {
    if (questions.length > 0 && !questions.some((item) => item.id === selectedId)) {
      setSelectedId(questions[0].id);
    }
  }, [questions, selectedId]);

  useEffect(() => { 
    setShowPlan(false); 
    setShowModel(false); 
  }, [selected.id]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedId(questions[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setSelectedId(questions[currentIndex + 1].id);
    }
  };

  const rubricTotal = selected.rubric.reduce((sum, item) => sum + item.marks, 0);

  const totalCRQs = TEACHING_LICENSE_SUBJECTIVE_QUESTIONS.filter((item) => item.type === 'CRQ').length;
  const totalERQs = TEACHING_LICENSE_SUBJECTIVE_QUESTIONS.filter((item) => item.type === 'ERQ').length;

  return (
    <section className="space-y-6" aria-label="Teaching License CRQ and ERQ practice">
      {/* Hero Header */}
      <header className="overflow-hidden rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-600 via-fuchsia-700 to-purple-800 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Official Subjective Answer Lab • Over 200 Questions</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl tracking-tight">
              CRQ &amp; ERQ Writing Master Bank
            </h2>
            <p className="mt-3 text-sm leading-6 text-rose-100">
              Master Constructed Response (CRQs, 5 marks) and Extended Response (ERQs, 10 marks) questions for STEDA Teaching License, FPSC, and SPSC exams. Complete with step-by-step answer plans, model answers, and marking rubrics.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 rounded-2xl border border-white/15 bg-slate-950/30 p-2.5 backdrop-blur-md">
            <div className="rounded-xl bg-white/10 px-3.5 py-2.5 text-center">
              <p className="text-2xl font-black text-rose-200">{totalCRQs}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-rose-300">CRQs (5m)</p>
            </div>
            <div className="rounded-xl bg-white/10 px-3.5 py-2.5 text-center">
              <p className="text-2xl font-black text-fuchsia-200">{totalERQs}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-300">ERQs (10m)</p>
            </div>
            <div className="rounded-xl bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-2.5 text-center">
              <p className="text-2xl font-black text-emerald-300">{totalCRQs + totalERQs}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Total Bank</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Study Container */}
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        
        {/* Top Filter Controls */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800/80">
          
          {/* Format Switcher (CRQ vs ERQ) */}
          <div className="flex items-center gap-2">
            <div className="grid grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800/80">
              {(['CRQ', 'ERQ'] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setType(item);
                    setSubjectFilter('All');
                  }}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-extrabold transition cursor-pointer ${
                    type === item
                      ? 'bg-white text-purple-700 shadow-sm dark:bg-slate-950 dark:text-purple-300'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                  }`}
                >
                  <span>{item}</span>
                  <span className="rounded-full bg-purple-100 px-1.5 py-0.2 text-[10px] font-black text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                    {item === 'CRQ' ? totalCRQs : totalERQs}
                  </span>
                </button>
              ))}
            </div>

            {/* Area Filter */}
            <div className="hidden sm:flex items-center gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800/80">
              {(['All', 'Pedagogy', 'Content Knowledge'] as const).map((area) => (
                <button
                  key={area}
                  onClick={() => setAreaFilter(area)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    areaFilter === area
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {area === 'All' ? 'All Areas' : area}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Filter Dropdown & Question Count */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden md:inline font-medium">Subject:</span>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-purple-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white cursor-pointer"
              >
                <option value="All">All Subjects ({typeQuestions.length})</option>
                {availableSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
              {questions.length} Questions
            </div>
          </div>
        </div>

        {/* Master-Detail Split Grid */}
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          
          {/* Left Column: Search & Question List */}
          <aside className="space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${type}s by topic, prompt, or keyword…`}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs text-slate-900 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Area Filter on Mobile */}
            <div className="sm:hidden flex items-center gap-1 overflow-x-auto pb-1">
              {(['All', 'Pedagogy', 'Content Knowledge'] as const).map((area) => (
                <button
                  key={area}
                  onClick={() => setAreaFilter(area)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold shrink-0 ${
                    areaFilter === area
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>

            {/* Questions Scrollable List */}
            <div className="max-h-[680px] space-y-2 overflow-y-auto pr-1 [scrollbar-color:rgb(168_85_247)_transparent] [scrollbar-width:thin]">
              {questions.map((item, index) => {
                const isSelected = selected.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full rounded-2xl border p-3 text-left transition cursor-pointer group ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50/80 shadow-xs dark:border-purple-600 dark:bg-purple-950/40 ring-1 ring-purple-400/30'
                        : 'border-slate-200 bg-white hover:border-purple-200 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-purple-900'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                          isSelected 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-slate-100 text-purple-700 dark:bg-slate-800 dark:text-purple-300'
                        }`}>
                          {type} #{index + 1}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                          {item.subject}
                        </span>
                      </div>
                      <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400">
                        {item.marks} marks
                      </span>
                    </div>

                    <p className="mt-1.5 line-clamp-2 text-xs font-semibold leading-5 text-slate-800 dark:text-slate-200 group-hover:text-purple-900 dark:group-hover:text-purple-200">
                      {item.prompt}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{item.area}</span>
                      <span>{item.suggestedMinutes} mins</span>
                    </div>
                  </button>
                );
              })}

              {!questions.length && (
                <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-xs text-slate-500 dark:border-slate-700">
                  <p className="font-bold">No matching questions found.</p>
                  <p className="mt-1 text-slate-400">Try adjusting your search keyword or filters.</p>
                  <button
                    onClick={() => {
                      setQuery('');
                      setAreaFilter('All');
                      setSubjectFilter('All');
                    }}
                    className="mt-3 inline-block rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-bold text-white"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* Right Column: Question Workspace Canvas */}
          <article className="min-w-0 space-y-5 rounded-3xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40 sm:p-6">
            
            {/* Top Navigation & Dossier Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4 dark:border-slate-800">
              
              {/* Question Position & Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-black text-white shadow-xs">
                  {selected.type} Question {currentIndex >= 0 ? currentIndex + 1 : 1} of {questions.length}
                </span>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-extrabold text-purple-800 dark:bg-purple-950 dark:text-purple-200">
                  {selected.area}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-xs dark:bg-slate-900 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                  {selected.subject}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-xs dark:bg-slate-900 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                  <Clock3 className="h-3.5 w-3.5 text-amber-500" />
                  {selected.suggestedMinutes} minutes
                </span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                  {selected.marks} marks ({selected.wordRange})
                </span>
              </div>

              {/* Prev / Next & PDF Export Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex <= 0}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 cursor-pointer shadow-xs"
                  title="Previous Question"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentIndex >= questions.length - 1}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 cursor-pointer shadow-xs"
                  title="Next Question"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => exportSubjectivePracticeToPdf(selected)}
                  className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-purple-500 transition cursor-pointer"
                  title="Download prompt, answer plan, model answer and rubric as PDF"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Dossier PDF</span>
                </button>
              </div>
            </div>

            {/* Prompt Display */}
            <div className="rounded-2xl bg-white p-5 shadow-xs border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <p className="text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Official Prompt &amp; Command Focus
                </p>
                <span className="text-xs font-mono text-slate-400">ID: {selected.id}</span>
              </div>
              <h3 className="mt-2 text-lg sm:text-xl font-extrabold leading-8 text-slate-950 dark:text-white">
                {selected.prompt}
              </h3>
              
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Key Command Words:</span>
                {selected.commandWords.map((word) => (
                  <span 
                    key={word} 
                    className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-extrabold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Candidate Writing Area */}
            <SubjectiveAnswerEditor 
              key={selected.id} 
              question={selected} 
              onTimedChange={(active) => { 
                setTimed(active); 
                if (active) { 
                  setShowPlan(false); 
                  setShowModel(false); 
                } 
              }} 
            />

            {/* Plan and Model Answer Toggle Buttons */}
            <div className="grid gap-3 sm:grid-cols-2">
              <button 
                disabled={timed} 
                title={timed ? 'Available after exam timer completes' : undefined} 
                onClick={() => setShowPlan((value) => !value)} 
                className="flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50/80 p-4 text-left text-sm font-extrabold text-blue-900 hover:bg-blue-100/80 transition dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200 cursor-pointer shadow-xs"
              >
                <span className="inline-flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span>Structured Answer Plan ({selected.answerPlan.length} Steps)</span>
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showPlan ? 'rotate-180' : ''}`} />
              </button>

              <button 
                disabled={timed} 
                title={timed ? 'Available after exam timer completes' : undefined} 
                onClick={() => setShowModel((value) => !value)} 
                className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-left text-sm font-extrabold text-emerald-900 hover:bg-emerald-100/80 transition dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200 cursor-pointer shadow-xs"
              >
                <span className="inline-flex items-center gap-2">
                  <BookOpenCheck className="h-4 w-4 text-emerald-600" />
                  <span>Model Answer &amp; Rubric ({selected.marks} Marks)</span>
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showModel ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Answer Plan Reveal */}
            {showPlan && !timed && (
              <div className="rounded-2xl border border-blue-200 bg-white p-5 dark:border-blue-900 dark:bg-slate-900 shadow-sm animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200">
                  <Target className="h-4 w-4" />
                  <h4 className="font-extrabold text-base">Recommended Pre-Writing Strategy</h4>
                </div>
                <ol className="mt-3 space-y-2.5">
                  {selected.answerPlan.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-100 text-xs font-black text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Model Answer & Rubric Reveal */}
            {showModel && !timed && (
              <div className="space-y-4 rounded-2xl border border-emerald-200 bg-white p-5 dark:border-emerald-900 dark:bg-slate-900 shadow-sm animate-in fade-in duration-200">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-emerald-900 dark:text-emerald-200 text-base">
                      Exemplar Model Response
                    </h4>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-black text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Target: {selected.wordRange}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800 whitespace-pre-line">
                    {selected.modelAnswer}
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                      Official Marking Scheme &amp; Rubric
                    </h4>
                    <span className="text-xs font-black text-emerald-700 dark:text-emerald-300">
                      Maximum Marks: {rubricTotal}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {selected.rubric.map((item) => (
                      <div 
                        key={item.criterion} 
                        className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80"
                      >
                        <span className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>{item.criterion}</span>
                        </span>
                        <strong className="text-emerald-700 dark:text-emerald-400 font-black shrink-0">
                          {item.marks} marks
                        </strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Quick Jump Bar */}
            <div className="flex items-center justify-between border-t border-slate-200/80 pt-4 text-xs text-slate-500 dark:border-slate-800">
              <span className="font-medium">
                Showing question {currentIndex + 1} of {questions.length} ({type})
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex <= 0}
                  className="hover:text-purple-600 disabled:opacity-40 font-bold cursor-pointer"
                >
                  ← Previous
                </button>
                <span>•</span>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= questions.length - 1}
                  className="hover:text-purple-600 disabled:opacity-40 font-bold cursor-pointer"
                >
                  Next →
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Advisory Notice */}
      <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
        <strong>Practice notice:</strong> This comprehensive bank of {totalCRQs} CRQs and {totalERQs} ERQs is aligned with the Sindh Teacher Education Development Authority (STEDA), DCAR curriculum guidelines, and provincial test patterns. They build critical reasoning, classroom pedagogy, and content mastery.
      </p>
    </section>
  );
};
