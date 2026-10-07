import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  Search, 
  CheckCircle2, 
  XCircle,
  Flame, 
  ArrowRight, 
  Trophy,
  Landmark,
  Sparkles,
  Bookmark,
  BookOpen,
  Filter,
  Layers,
  HelpCircle,
  Clock,
  Eye,
  Check,
  FileText,
  FileSpreadsheet
} from 'lucide-react';
import { CURRENT_AFFAIRS_DATA } from '../data/currentAffairsData';
import { CURRENT_AFFAIRS_SOURCED, PAKISTAN_CURRENT_AFFAIRS_MCQS, WORLD_CURRENT_AFFAIRS_MCQS } from '../data/currentAffairs2000';
import { MCQ } from '../types';
import { useCmsContent } from '../context/CmsContentContext';
import { exportMcqsToPdf, exportMcqsToExcel } from '../lib/exportUtils';

export const CurrentAffairsView: React.FC = () => {
  const { mcqs: cmsMcqs } = useCmsContent();
  const allCurrentMcqs = useMemo(() => [...cmsMcqs.filter(item => item.category === 'current-affairs'), ...CURRENT_AFFAIRS_SOURCED], [cmsMcqs]);
  const { setTab, setSelectedCategorySlug, toggleBookmark, isBookmarked, addMistake } = useApp();
  
  const [activeTab, setActiveTab] = useState<'mcqs' | 'timeline'>('mcqs');
  const [scopeFilter, setScopeFilter] = useState<'All' | 'Pakistan' | 'International'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [subtopicFilter, setSubtopicFilter] = useState<string>('All');
  const [sourceFilter, setSourceFilter] = useState<'All' | 'Sourced'>('All');
  const [mcqScope, setMcqScope] = useState<'All' | 'Pakistan' | 'World'>('All');
  const [page, setPage] = useState(1);
  const pageSize = 24;
  
  // Interactive answers state for MCQs { [mcqId]: selectedOptionIndex }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  // Subtopics list for filter pills
  const subtopics = useMemo(() => {
    const set = new Set<string>();
    allCurrentMcqs.forEach((m) => {
      if (m.subtopic) set.add(m.subtopic);
    });
    return ['All', ...Array.from(set)];
  }, [allCurrentMcqs]);

  // Filtered MCQs
  const filteredMcqs = useMemo(() => {
    return allCurrentMcqs.filter((mcq) => {
      if (sourceFilter === 'Sourced' && !mcq.sourceUrl) return false;
      if (mcqScope === 'Pakistan' && !mcq.subtopic?.toLowerCase().includes('pakistan')) return false;
      if (mcqScope === 'World' && !mcq.subtopic?.toLowerCase().includes('world') && !mcq.subtopic?.toLowerCase().includes('international')) return false;
      if (subtopicFilter !== 'All' && mcq.subtopic !== subtopicFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchQuestion = mcq.question.toLowerCase().includes(q);
        const matchOptions = mcq.options.some((opt) => opt.toLowerCase().includes(q));
        const matchExplanation = mcq.explanation.toLowerCase().includes(q);
        const matchTags = mcq.examTags?.some((t) => t.toLowerCase().includes(q));
        if (!matchQuestion && !matchOptions && !matchExplanation && !matchTags) {
          return false;
        }
      }
      return true;
    });
  }, [allCurrentMcqs, subtopicFilter, searchQuery, sourceFilter, mcqScope]);

  const totalPages = Math.ceil(filteredMcqs.length / pageSize) || 1;
  const visibleMcqs = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredMcqs.slice(start, start + pageSize);
  }, [filteredMcqs, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [subtopicFilter, searchQuery, sourceFilter, mcqScope, activeTab]);

  // Filtered Timeline Items
  const filteredTimeline = useMemo(() => {
    return CURRENT_AFFAIRS_DATA.filter((item) => {
      if (scopeFilter !== 'All' && item.category !== scopeFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.date.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [scopeFilter, searchQuery]);

  const handleOptionSelect = (mcq: MCQ, optIdx: number) => {
    if (selectedAnswers[mcq.id] !== undefined) return; // Already answered
    
    setSelectedAnswers((prev) => ({ ...prev, [mcq.id]: optIdx }));
    setShowExplanations((prev) => ({ ...prev, [mcq.id]: true }));

    if (optIdx !== mcq.correctIndex) {
      addMistake(mcq.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white p-6 sm:p-10 border border-emerald-800/60 shadow-xl">
        {/* Decorative ambient aura */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-500/10 filter blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-72 h-72 rounded-full bg-teal-500/10 filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-3 shadow-xs">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Pakistan & World Current Affairs — source checked 13 September 2026</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Pakistan & World Current Affairs <span className="text-emerald-400">MCQs Bank</span>
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm mt-2.5 leading-relaxed max-w-2xl">
              Practice dated Pakistan and international events. New questions include a primary source and a verification date. Older questions remain available but need source review.
            </p>

            {/* Quick stats chips */}
            <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-semibold">
              <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {PAKISTAN_CURRENT_AFFAIRS_MCQS.length} questions in bank
              </span>
              <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                STS • CSS • SPSC preparation
              </span>
              <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                New sources checked 12 Sep 2026
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => exportMcqsToPdf(filteredMcqs.slice(0, 100), {
                title: 'Pakistan & World Current Affairs 2026',
                subtitle: 'Dated Sourced Questions for CSS, PMS, SPSC & STS IBA Screening',
                subject: 'Current Affairs',
                includeAnswers: true,
                includeExplanations: true,
              })}
              className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              title="Download Current Affairs questions as printable PDF"
            >
              <FileText className="w-4 h-4" />
              <span>PDF Digest</span>
            </button>

            <button
              onClick={() => exportMcqsToExcel(filteredMcqs, 'MUQABIL_Current_Affairs_2026', { subject: 'Current Affairs' })}
              className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              title="Export Current Affairs questions to Excel (.xlsx)"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Excel (.xlsx)</span>
            </button>

            <button
              onClick={() => {
                setTab('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-emerald-500/20 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Take Live Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setSelectedCategorySlug('current-affairs');
                setTab('mcqs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>Full Subject Library</span>
            </button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="relative z-10 flex items-center gap-2 mt-8 border-t border-emerald-800/60 pt-4">
          <button
            onClick={() => setActiveTab('mcqs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'mcqs'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-emerald-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>MCQs Practice Bank ({allCurrentMcqs.length.toLocaleString()})</span>
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-emerald-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Strategic Timeline & Analysis ({CURRENT_AFFAIRS_DATA.length})</span>
          </button>
        </div>
      </div>

      {/* Control / Filter Bar */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'mcqs' ? 'Search questions, options, tags...' : 'Search events, summits, appointments...'}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filters according to active tab */}
        {activeTab === 'mcqs' ? (
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <label className="text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">Scope
              <select value={mcqScope} onChange={e => setMcqScope(e.target.value as 'All' | 'Pakistan' | 'World')} className="ml-2 p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800">
                <option value="All">Pakistan & World</option><option value="Pakistan">Pakistan</option><option value="World">World</option>
              </select>
            </label>
            <label className="text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">Sources
              <select value={sourceFilter} onChange={e => setSourceFilter(e.target.value as 'All' | 'Sourced')} className="ml-2 p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800">
                <option value="All">All questions</option><option value="Sourced">Source-linked only</option>
              </select>
            </label>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-emerald-500" />
              Subtopic:
            </span>
            {subtopics.slice(0, 5).map((topic) => (
              <button
                key={topic}
                onClick={() => setSubtopicFilter(topic)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  subtopicFilter === topic
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {(['All', 'Pakistan', 'International'] as const).map((sc) => (
                <button
                  key={sc}
                  onClick={() => setScopeFilter(sc)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    scopeFilter === sc
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  {sc === 'All' ? 'All Developments' : `${sc} Affairs`}
                </button>
              ))}
            </div>
          </div>
        )}

        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0">
          Showing <strong className="text-emerald-600 dark:text-emerald-400">{activeTab === 'mcqs' ? filteredMcqs.length : filteredTimeline.length}</strong> items
        </span>
      </div>

      {/* TAB 1: MCQS PRACTICE BANK */}
      {activeTab === 'mcqs' && (
        <div className="space-y-4">
          {filteredMcqs.length === 0 ? (
            <div className="text-center py-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-700 dark:text-slate-300">No MCQs match your search filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSubtopicFilter('All');
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            visibleMcqs.map((mcq, idx) => {
              const selectedOpt = selectedAnswers[mcq.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === mcq.correctIndex;
              const bookmarked = isBookmarked(mcq.id);

              return (
                <div
                  key={mcq.id}
                  id={`mcq-card-${mcq.id}`}
                  className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs hover:border-emerald-500/40 transition-all"
                >
                  {/* Card Header: Number, Subtopic, Exam Tags & Bookmark */}
                  <div className="flex items-center justify-between gap-3 text-xs mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px]">
                        Q{(page - 1) * pageSize + idx + 1}
                      </span>
                      {mcq.subtopic && (
                        <span className="px-2.5 py-0.5 rounded-md font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px]">
                          {mcq.subtopic}
                        </span>
                      )}
                      {mcq.year && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                          {mcq.year}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${mcq.sourceUrl ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                        {mcq.sourceUrl ? 'Source-linked' : 'Source review pending'}
                      </span>
                      {mcq.examTags?.map((tag) => (
                        <span key={tag} className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBookmark(mcq.id)}
                        className={`p-1.5 rounded-lg transition cursor-pointer ${
                          bookmarked 
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950' 
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`}
                        title={bookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                        aria-label="Bookmark MCQ"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-emerald-600' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed font-display mb-4">
                    {mcq.question}
                  </h3>

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {mcq.options.map((option, optIdx) => {
                      const letter = String.fromCharCode(65 + optIdx);
                      const isThisSelected = selectedOpt === optIdx;
                      const isThisCorrect = optIdx === mcq.correctIndex;

                      let btnStyle = 'bg-slate-50/80 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';

                      if (isAnswered) {
                        if (isThisCorrect) {
                          btnStyle = 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500/50';
                        } else if (isThisSelected) {
                          btnStyle = 'bg-rose-50 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200 font-bold ring-1 ring-rose-500/50';
                        } else {
                          btnStyle = 'bg-slate-50/40 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 text-slate-400 dark:text-slate-600 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleOptionSelect(mcq, optIdx)}
                          className={`flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm text-left transition cursor-pointer ${btnStyle}`}
                        >
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isAnswered && isThisCorrect 
                              ? 'bg-emerald-600 text-white' 
                              : isAnswered && isThisSelected 
                              ? 'bg-rose-600 text-white' 
                              : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                          }`}>
                            {letter}
                          </span>
                          <span className="pt-0.5 leading-snug flex-1">{option}</span>
                          {isAnswered && isThisCorrect && (
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          )}
                          {isAnswered && isThisSelected && !isThisCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Answer & Explanation Box */}
                  {(showExplanations[mcq.id] || isAnswered) && (
                    <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Correct Answer: Option {String.fromCharCode(65 + mcq.correctIndex)} ({mcq.options[mcq.correctIndex]})</span>
                        </div>
                        {mcq.viewsCount && (
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {mcq.viewsCount.toLocaleString()} views
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                        <strong className="text-slate-800 dark:text-slate-200">Detailed Explanation: </strong>
                        {mcq.explanation}
                      </p>
                      {mcq.sourceUrl && <a href={mcq.sourceUrl} target="_blank" rel="noreferrer" className="inline-block text-xs font-semibold text-emerald-700 dark:text-emerald-400 underline pt-2">Original source ↗</a>}
                    </div>
                  )}

                  {/* Bottom reveal button if user wants to see answer without attempting */}
                  {!isAnswered && (
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                      <span>Click an option to test your preparation</span>
                      <button
                        onClick={() => {
                          setSelectedAnswers((prev) => ({ ...prev, [mcq.id]: mcq.correctIndex }));
                          setShowExplanations((prev) => ({ ...prev, [mcq.id]: true }));
                        }}
                        className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
                      >
                        Show Answer
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
          {filteredMcqs.length > pageSize && <div className="flex items-center justify-center gap-3 pt-4"><button disabled={page === 1} onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-4 py-2 rounded-xl border disabled:opacity-40">Previous</button><span className="text-sm font-bold">Page {page} of {totalPages}</span><button disabled={page === totalPages} onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-4 py-2 rounded-xl bg-emerald-600 text-white disabled:opacity-40">Next</button></div>}
        </div>
      )}

      {/* TAB 2: TIMELINE & STRATEGIC ANALYSIS */}
      {activeTab === 'timeline' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTimeline.map((item) => (
            <div
              key={item.id}
              className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:border-emerald-500/60 transition group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                    item.category === 'Pakistan'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                  }`}>
                    {item.category}
                  </span>

                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition leading-snug font-display">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {item.summary}
                </p>

                {item.bullets && item.bullets.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                    {item.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                )}

                {/* Related High-Yield Examination Question */}
                {item.relatedMcq && (
                  <div className="mt-4 p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Expected Exam Question:</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">
                      {item.relatedMcq.question}
                    </p>
                    <div className="text-xs text-emerald-900 dark:text-emerald-200 font-medium">
                      Answer: <strong>{item.relatedMcq.options[item.relatedMcq.correctIndex]}</strong>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Importance: <strong className="text-emerald-600 dark:text-emerald-400">{item.importance}</strong>
                </span>

                <button
                  onClick={() => {
                    setActiveTab('mcqs');
                    setSearchQuery(item.title.split(' ')[0] || '');
                  }}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Practice Related MCQs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
