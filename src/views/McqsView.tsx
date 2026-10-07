import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLayout } from '../context/LayoutContext';
import { 
  Filter, 
  Search, 
  Bookmark, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  EyeOff, 
  Share2, 
  AlertTriangle, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  MessageSquare,
  LayoutGrid,
  List,
  Columns,
  ListOrdered,
  Layers,
  ChevronRight,
  HelpCircle,
  Clock,
  Sparkle,
  FileDown,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import { MCQS_DATA } from '../data/mcqsData';
import { POPULAR_CATEGORIES, TOP_SUBJECTS_DIRECTORY } from '../data/categoriesData';
import { MCQ } from '../types';
import { useCmsContent } from '../context/CmsContentContext';
import { MeaningText } from '../components/MeaningText';
import { ExportModal } from '../components/ExportModal';
import { exportMcqsToExcel, exportMcqsToPdf } from '../lib/exportUtils';

export type McqDisplayLayout = 'standard-paper' | 'grid' | 'split-pane' | 'omr-compact';

export const McqsView: React.FC = () => {
  const { mcqs: liveMcqs } = useCmsContent();
  const allMcqs = useMemo(() => [...liveMcqs, ...MCQS_DATA], [liveMcqs]);
  const pageSize = 24;
  const { 
    selectedCategorySlug, 
    setSelectedCategorySlug, 
    toggleBookmark, 
    isBookmarked,
    addMistake,
    userProfile,
    setTab
  } = useApp();

  const { getContainerClass, getContentSpacingClass } = useLayout();

  const [searchFilter, setSearchFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [examTagFilter, setExamTagFilter] = useState<string>(() => {
    const saved = sessionStorage.getItem('matb_quick_exam_filter');
    if (saved) {
      sessionStorage.removeItem('matb_quick_exam_filter');
      return saved;
    }
    return 'All';
  });
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [userSelections, setUserSelections] = useState<Record<string, number>>({});
  const [reportedMcqId, setReportedMcqId] = useState<string | null>(null);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Reset subtopic when category changes
  useEffect(() => {
    setSelectedSubtopic(null);
  }, [selectedCategorySlug]);

  // Content Layout State
  const [displayLayout, setDisplayLayout] = useState<McqDisplayLayout>(() => {
    const saved = localStorage.getItem('matb_mcqs_layout');
    if (saved && ['standard-paper', 'grid', 'split-pane', 'omr-compact'].includes(saved)) {
      return saved as McqDisplayLayout;
    }
    return 'standard-paper';
  });

  const handleLayoutChange = (layout: McqDisplayLayout) => {
    setDisplayLayout(layout);
    localStorage.setItem('matb_mcqs_layout', layout);
  };

  // Active question for split-pane master-detail view
  const [activeSplitId, setActiveSplitId] = useState<string | null>(null);

  // Active category object
  const activeCategory = useMemo(() => {
    return POPULAR_CATEGORIES.find((c) => c.slug === selectedCategorySlug) || null;
  }, [selectedCategorySlug]);

  // Filtered MCQs list
  const filteredMcqs = useMemo(() => {
    return allMcqs.filter((mcq) => {
      // Category filter with intelligent aliases
      if (selectedCategorySlug) {
        if (selectedCategorySlug === 'management-sciences') {
          const mgmtSlugs = ['management-sciences', 'accounting', 'auditing', 'finance', 'hrm', 'marketing'];
          if (!mgmtSlugs.includes(mcq.category)) return false;
        } else if (selectedCategorySlug === 'pakistan-affairs') {
          if (mcq.category !== 'pakistan-affairs' && mcq.category !== 'pakistan-studies') return false;
        } else if (selectedCategorySlug === 'pakistan-studies') {
          if (mcq.category !== 'pakistan-studies' && mcq.category !== 'pakistan-affairs') return false;
        } else if (selectedCategorySlug === 'computer-science') {
          if (mcq.category !== 'computer-science' && mcq.category !== 'computer') return false;
        } else if (selectedCategorySlug === 'computer') {
          if (mcq.category !== 'computer' && mcq.category !== 'computer-science') return false;
        } else if (mcq.category !== selectedCategorySlug) {
          return false;
        }
      }
      // Subtopic filter
      if (selectedSubtopic) {
        const qSub = selectedSubtopic.toLowerCase();
        const matchesSub = 
          mcq.subtopic?.toLowerCase().includes(qSub) ||
          mcq.question.toLowerCase().includes(qSub) ||
          mcq.explanation.toLowerCase().includes(qSub) ||
          qSub.split(/[ &,/]+/).some(word => word.length > 3 && (mcq.question.toLowerCase().includes(word) || mcq.subtopic?.toLowerCase().includes(word)));
        if (!matchesSub) return false;
      }
      // Difficulty
      if (difficultyFilter !== 'All' && mcq.difficulty !== difficultyFilter) {
        return false;
      }
      // Exam Tag
      if (examTagFilter !== 'All') {
        const matchesTag = mcq.examTags?.some((t) => 
          t.toLowerCase() === examTagFilter.toLowerCase() || 
          t.toLowerCase().includes(examTagFilter.toLowerCase()) ||
          examTagFilter.toLowerCase().includes(t.toLowerCase())
        );
        if (!matchesTag) return false;
      }
      // Search
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const matchesQ = mcq.question.toLowerCase().includes(q) ||
          mcq.explanation.toLowerCase().includes(q) ||
          mcq.options.some((o) => o.toLowerCase().includes(q));
        if (!matchesQ) return false;
      }
      return true;
    });
  }, [allMcqs, selectedCategorySlug, selectedSubtopic, difficultyFilter, examTagFilter, searchFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredMcqs.length / pageSize));
  const visibleMcqs = filteredMcqs.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => setPage(1), [selectedCategorySlug, selectedSubtopic, difficultyFilter, examTagFilter, searchFilter]);
  useEffect(() => { if (page > pageCount) setPage(pageCount); }, [page, pageCount]);

  // Sync split-pane active question
  useEffect(() => {
    if (visibleMcqs.length > 0 && (!activeSplitId || !visibleMcqs.some(m => m.id === activeSplitId))) {
      setActiveSplitId(visibleMcqs[0].id);
    }
  }, [visibleMcqs, activeSplitId]);

  const toggleReveal = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (mcq: MCQ, optionIndex: number) => {
    setUserSelections((prev) => ({ ...prev, [mcq.id]: optionIndex }));
    setRevealedAnswers((prev) => ({ ...prev, [mcq.id]: true }));

    // If selected answer is wrong, record in Mistake Book
    if (optionIndex !== mcq.correctIndex) {
      addMistake(mcq.id);
    }
  };

  const handleShare = (mcq: MCQ) => {
    const text = `MATB STS Prep MCQ:\n${mcq.question}\nOptions:\nA) ${mcq.options[0]}\nB) ${mcq.options[1]}\nC) ${mcq.options[2]}\nD) ${mcq.options[3]}\n\nPractice more on MATB STS Prep!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(mcq.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setReportedMcqId(null);
    }, 1200);
  };

  // Toggle reveal all in visible page
  const [revealAll, setRevealAll] = useState(false);
  const handleToggleRevealAll = () => {
    const next = !revealAll;
    setRevealAll(next);
    const newRevealed: Record<string, boolean> = {};
    if (next) {
      visibleMcqs.forEach(m => { newRevealed[m.id] = true; });
    }
    setRevealedAnswers(newRevealed);
  };

  const handleResetChoices = () => {
    setUserSelections({});
    setRevealedAnswers({});
    setRevealAll(false);
  };

  const activeSplitMcq = useMemo(() => {
    return visibleMcqs.find(m => m.id === activeSplitId) || visibleMcqs[0] || null;
  }, [visibleMcqs, activeSplitId]);

  return (
    <div className={`space-y-6 sm:space-y-8 ${getContentSpacingClass()}`}>
      
      {/* Category Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
              {activeCategory ? activeCategory.name : 'All Subjects'}
            </span>
            <span className="text-slate-400 text-xs">• 15,000+ Verified Practice Questions</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display mb-3">
            {activeCategory ? activeCategory.name : 'Master MCQs Question Bank'}
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            {activeCategory 
              ? activeCategory.description 
              : 'Authentic syllabus questions aligned with STS IBA, STEDA Teaching License, FPSC One-Paper, and SPSC CCE exam blueprints.'}
          </p>

          {activeCategory && activeCategory.subtopics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {activeCategory.subtopics.map((sub, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 rounded-lg bg-white/10 text-white/90 text-xs font-medium hover:bg-white/20 transition cursor-pointer"
                  onClick={() => setSearchFilter(sub)}
                >
                  {sub}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Ambient decorative circle */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search questions, keywords, or topics..."
            className="w-full pl-9 pr-12 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter('')}
              className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Subject Filter Dropdown */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 font-medium whitespace-nowrap">Subject:</span>
            <select
              value={selectedCategorySlug || 'all'}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedCategorySlug(val === 'all' ? null : val);
                setSelectedSubtopic(null);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Subjects (General Bank)</option>
              <optgroup label="Top Core Subjects">
                <option value="general-knowledge">General Knowledge MCQs</option>
                <option value="pakistan-affairs">Pakistan Affairs MCQs</option>
                <option value="current-affairs">Current Affairs MCQs</option>
                <option value="english">English Language MCQs</option>
                <option value="islamic-studies">Islamic Studies / Islamiat MCQs</option>
                <option value="computer-science">Computer Science MCQs</option>
                <option value="pakistan-studies">Pakistan Studies MCQs</option>
                <option value="everyday-science">Everyday Science MCQs</option>
                <option value="mathematics">Mathematics MCQs</option>
                <option value="biology">Biology MCQs</option>
              </optgroup>
              <optgroup label="Management Sciences Suite">
                <option value="management-sciences">Management Sciences (All)</option>
                <option value="accounting">Accounting MCQs</option>
                <option value="auditing">Auditing MCQs</option>
                <option value="finance">Finance MCQs</option>
                <option value="hrm">HRM MCQs</option>
                <option value="marketing">Marketing MCQs</option>
              </optgroup>
              <optgroup label="Other Specialized Disciplines">
                <option value="history">History</option>
                <option value="economics">Economics</option>
                <option value="political-science">Political Science</option>
                <option value="international-relations">International Relations</option>
                <option value="sociology">Sociology</option>
                <option value="agriculture">Agriculture</option>
                <option value="pedagogy">Pedagogy &amp; Education</option>
                <option value="urdu">Urdu</option>
              </optgroup>
            </select>
          </div>

          {/* Exam Tag */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 font-medium whitespace-nowrap">Testing Body:</span>
            <select
              value={examTagFilter}
              onChange={(e) => setExamTagFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="All">All Exams &amp; Services</option>
              <optgroup label="Civil &amp; Provincial Commissions">
                <option value="FPSC">FPSC (Federal Public Service Commission)</option>
                <option value="PPSC">PPSC (Punjab Public Service Commission)</option>
                <option value="SPSC">SPSC (Sindh Public Service Commission)</option>
                <option value="CSS">CSS (Central Superior Services)</option>
                <option value="KPPSC">KPPSC (Khyber Pakhtunkhwa PSC)</option>
                <option value="BPSC">BPSC (Balochistan Public Service Commission)</option>
              </optgroup>
              <optgroup label="Standardized Testing Services">
                <option value="STS">SIBA Testing Service (STS Sukkur IBA)</option>
                <option value="NTS">NTS (National Testing Service)</option>
                <option value="PTS">PTS (Pakistan Testing Service)</option>
                <option value="BTS">BTS (Balochistan Testing Service)</option>
                <option value="CTS">CTS (Candidates Testing Services)</option>
                <option value="JTS">JTS (Job Testing Service)</option>
                <option value="LAT">LAT (Law Admission Test - HEC)</option>
                <option value="MTSP">MTSP (Modern Testing Service Pakistan)</option>
                <option value="OTS">OTS (Open Testing Service)</option>
                <option value="UTS">UTS (Universal Testing Service)</option>
                <option value="Teaching License">STEDA Teaching License</option>
              </optgroup>
            </select>
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 font-medium whitespace-nowrap">Level:</span>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="All">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-2 whitespace-nowrap">
            Found <strong className="text-emerald-600 dark:text-emerald-400">{filteredMcqs.length.toLocaleString()}</strong> questions
          </div>
        </div>
      </div>

      {/* Top Subjects Quick Filter Strip */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Top Subjects:
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Instant topic filtering
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Quick dropdown in strip header */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-400 text-[11px] font-semibold hidden md:inline">Select:</span>
              <select
                value={selectedCategorySlug || 'all'}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedCategorySlug(val === 'all' ? null : val);
                  setSelectedSubtopic(null);
                }}
                className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:outline-hidden cursor-pointer"
              >
                <option value="all">Select Subject...</option>
                {TOP_SUBJECTS_DIRECTORY.map((subj) => (
                  <option key={subj.id} value={subj.categorySlug}>
                    {subj.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategorySlug && (
              <button
                onClick={() => {
                  setSelectedCategorySlug(null);
                  setSelectedSubtopic(null);
                }}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer whitespace-nowrap"
              >
                Reset to All Subjects
              </button>
            )}
          </div>
        </div>

        {/* Primary Top Subjects Pills Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => {
              setSelectedCategorySlug(null);
              setSelectedSubtopic(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
              !selectedCategorySlug
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
            }`}
          >
            All Subjects
          </button>

          {TOP_SUBJECTS_DIRECTORY.map((subj) => {
            const isSelected = selectedCategorySlug === subj.categorySlug;
            return (
              <button
                key={subj.id}
                onClick={() => {
                  setSelectedCategorySlug(subj.categorySlug);
                  setSelectedSubtopic(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                }`}
              >
                <span>{subj.shortLabel}</span>
                {subj.badge && !isSelected && (
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {subj.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Subcategories & Topics Tray Opened Directly Under Top Subjects */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {selectedCategorySlug ? (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    {activeCategory?.name || 'Subject'} Subcategories &amp; Topics:
                  </span>
                  <span className="text-[11px] text-slate-400">
                    ({filteredMcqs.length} MCQs found)
                  </span>
                </div>

                {selectedSubtopic && (
                  <button
                    onClick={() => setSelectedSubtopic(null)}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    Show All {activeCategory?.name} Topics
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                <button
                  onClick={() => setSelectedSubtopic(null)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                    !selectedSubtopic
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                  }`}
                >
                  All {activeCategory?.name || 'Topics'}
                </button>

                {/* If Management Sciences is selected, show child discipline buttons */}
                {selectedCategorySlug === 'management-sciences' && (
                  <>
                    {[
                      { label: 'Accounting MCQs', slug: 'accounting' },
                      { label: 'Auditing MCQs', slug: 'auditing' },
                      { label: 'Finance MCQs', slug: 'finance' },
                      { label: 'HRM MCQs', slug: 'hrm' },
                      { label: 'Marketing MCQs', slug: 'marketing' },
                    ].map((child) => (
                      <button
                        key={child.slug}
                        onClick={() => {
                          setSelectedCategorySlug(child.slug);
                          setSelectedSubtopic(null);
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 flex items-center gap-1"
                      >
                        <span>{child.label}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    ))}
                  </>
                )}

                {/* Subtopics from activeCategory */}
                {activeCategory?.subtopics?.map((topic, i) => {
                  const isSelected = selectedSubtopic === topic;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedSubtopic(isSelected ? null : topic)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-emerald-600 text-white font-bold shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* When All Subjects is active: show all subject categories opened under it */
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>All Subject Categories:</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  Click any subject to open its specific topics
                </span>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                <button
                  onClick={() => {
                    setSelectedCategorySlug(null);
                    setSelectedSubtopic(null);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 bg-emerald-600 text-white shadow-xs"
                >
                  All Combined (Full Bank)
                </button>

                {POPULAR_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategorySlug(cat.slug);
                      setSelectedSubtopic(null);
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 border border-transparent"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Advanced Layout & Display Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
        
        {/* Layout Switcher Buttons */}
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1.5 hidden sm:inline">
            Layout:
          </span>

          <div className="inline-flex rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-0.5 shadow-2xs">
            {/* 1. Standard Paper (Official single-col format) */}
            <button
              onClick={() => handleLayoutChange('standard-paper')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                displayLayout === 'standard-paper'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Official Standard Test Paper layout"
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Standard Paper</span>
            </button>

            {/* 2. Grid Cards (Modern multi-col) */}
            <button
              onClick={() => handleLayoutChange('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                displayLayout === 'grid'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Card Grid layout"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>2-Col Grid</span>
            </button>

            {/* 3. Split Reading Pane */}
            <button
              onClick={() => handleLayoutChange('split-pane')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                displayLayout === 'split-pane'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Split Master-Detail reading pane"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Split Pane</span>
            </button>

            {/* 4. OMR Speed Drill */}
            <button
              onClick={() => handleLayoutChange('omr-compact')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                displayLayout === 'omr-compact'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="OMR Bubble Speed Drill layout"
            >
              <List className="w-3.5 h-3.5" />
              <span>OMR Sheet</span>
            </button>
          </div>
        </div>

        {/* Practice Tools */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick PDF Export */}
          <button
            onClick={() => setExportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-2xs cursor-pointer"
            title="Download questions as printable PDF Question Paper with Answer Key"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>

          {/* Quick Excel Export */}
          <button
            onClick={() => {
              const cleanTitle = (activeCategory?.name || (selectedSubtopic ? `${activeCategory?.name}_${selectedSubtopic}` : 'MUQABIL_MCQs')).replace(/[^a-zA-Z0-9_-]/g, '_');
              exportMcqsToExcel(filteredMcqs, cleanTitle, { subject: activeCategory?.name || 'All Subjects' });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-xs font-bold transition cursor-pointer"
            title="Download full filtered question bank as an Excel (.xlsx) spreadsheet"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Download Excel</span>
          </button>

          <button
            onClick={handleToggleRevealAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Reveal or hide all correct answers at once"
          >
            {revealAll ? <EyeOff className="w-3.5 h-3.5 text-rose-500" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{revealAll ? 'Hide Answers' : 'Reveal All'}</span>
          </button>

          {Object.keys(userSelections).length > 0 && (
            <button
              onClick={handleResetChoices}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-500 hover:text-rose-600 transition cursor-pointer"
              title="Clear all selections on this page"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* MCQs Render Container based on selected layout */}
      {filteredMcqs.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400">
          <BookOpen className="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No MCQs Match Your Current Filters</h3>
          <p className="text-xs mt-1">Try resetting the difficulty or exam commission filter.</p>
          <button
            onClick={() => {
              setSearchFilter('');
              setDifficultyFilter('All');
              setExamTagFilter('All');
              setSelectedCategorySlug(null);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : displayLayout === 'split-pane' ? (
        /* 1. Split-Pane Master-Detail Layout */
        <div className="flex flex-col lg:flex-row items-start gap-6">
          
          {/* Left Master List */}
          <div className="w-full lg:w-5/12 space-y-2.5 max-h-[82vh] overflow-y-auto pr-1">
            <div className="text-xs font-bold text-slate-500 mb-1 px-1">
              Select question to inspect explanation &amp; syllabus notes:
            </div>
            {visibleMcqs.map((mcq, idx) => {
              const qNumber = (page - 1) * pageSize + idx + 1;
              const isSelected = activeSplitId === mcq.id;
              const userChoice = userSelections[mcq.id];
              const isCorrect = userChoice === mcq.correctIndex;
              const isAnswered = userChoice !== undefined;

              return (
                <div
                  key={mcq.id}
                  onClick={() => setActiveSplitId(mcq.id)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500/30'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-300 dark:hover:border-emerald-700'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 text-[11px]">
                      <span className="font-extrabold text-emerald-700 dark:text-emerald-400">
                        Q #{qNumber}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 dark:text-slate-400 truncate">
                        {mcq.category.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 leading-relaxed">
                      {mcq.question}
                    </p>
                  </div>

                  <div className="shrink-0 flex flex-col items-end gap-1.5">
                    {isAnswered ? (
                      isCorrect ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
                          Correct
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-[10px] font-bold">
                          Wrong
                        </span>
                      )
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 text-[10px] font-medium">
                        Unattempted
                      </span>
                    )}

                    {isBookmarked(mcq.id) && (
                      <Bookmark className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Detail Reading Pane */}
          {activeSplitMcq && (
            <div className="w-full lg:w-7/12 sticky top-20 bg-white dark:bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-7 shadow-xl">
              {(() => {
                const mcq = activeSplitMcq;
                const isRevealed = revealedAnswers[mcq.id] || false;
                const userChoice = userSelections[mcq.id];
                const bookmarked = isBookmarked(mcq.id);
                const qNumber = (page - 1) * pageSize + visibleMcqs.findIndex(m => m.id === mcq.id) + 1;

                return (
                  <div className="space-y-5">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs uppercase">
                          Question #{qNumber}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {mcq.category.replace('-', ' ')}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {mcq.examTags?.map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                            {tag}
                          </span>
                        ))}
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                          {mcq.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Question text */}
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                      <MeaningText text={mcq.question} />
                    </h2>

                    {/* Options list */}
                    <div className="space-y-2.5">
                      {mcq.options.map((option, idx) => {
                        const isSelected = userChoice === idx;
                        const isCorrect = idx === mcq.correctIndex;
                        let optionClass = 'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';

                        if (userChoice !== undefined) {
                          if (isCorrect) {
                            optionClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 font-semibold ring-1 ring-emerald-500';
                          } else if (isSelected && !isCorrect) {
                            optionClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-100 font-semibold ring-1 ring-rose-500';
                          }
                        } else if (isRevealed && isCorrect) {
                          optionClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 font-semibold';
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(mcq, idx)}
                            className={`w-full p-3.5 rounded-xl border text-left text-sm transition flex items-center justify-between cursor-pointer ${optionClass}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-black flex items-center justify-center shrink-0">
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <MeaningText text={option} className="leading-snug" />
                            </div>

                            {userChoice !== undefined && isCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            )}
                            {userChoice !== undefined && isSelected && !isCorrect && (
                              <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Solution Explanation Box */}
                    {(isRevealed || userChoice !== undefined) && (
                      <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 space-y-2 animate-in fade-in duration-150">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Correct Answer: Option {String.fromCharCode(65 + mcq.correctIndex)} — {mcq.options[mcq.correctIndex]}</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          <MeaningText text={mcq.explanation} />
                        </p>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleReveal(mcq.id)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center gap-1.5"
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{isRevealed ? 'Hide Explanation' : 'Show Explanation'}</span>
                        </button>

                        <button
                          onClick={() => toggleBookmark(mcq.id)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                            bookmarked
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                          <span>{bookmarked ? 'Saved' : 'Save'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleShare(mcq)}
                          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition"
                          title="Share question"
                        >
                          {copiedId === mcq.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setReportedMcqId(mcq.id)}
                          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-600 transition"
                          title="Report discrepancy"
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })()}
            </div>
          )}

        </div>
      ) : displayLayout === 'omr-compact' ? (
        /* 2. OMR Speed Drill Sheet Layout */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              STS / SPSC OMR Rapid Practice Sheet
            </span>
            <span className="text-slate-500">
              Click options A, B, C, or D directly to record response
            </span>
          </div>

          <div className="space-y-3">
            {visibleMcqs.map((mcq, mcqIndex) => {
              const qNumber = (page - 1) * pageSize + mcqIndex + 1;
              const isRevealed = revealedAnswers[mcq.id] || false;
              const userChoice = userSelections[mcq.id];
              const isAnswered = userChoice !== undefined;
              const isCorrect = userChoice === mcq.correctIndex;

              return (
                <div 
                  key={mcq.id}
                  className={`p-3 rounded-2xl border transition ${
                    isAnswered 
                      ? isCorrect 
                        ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20' 
                        : 'border-rose-300 dark:border-rose-800 bg-rose-50/30 dark:bg-rose-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <span className="px-2 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-xs shrink-0">
                        {qNumber}
                      </span>
                      <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                        <MeaningText text={mcq.question} />
                      </div>
                    </div>

                    {/* OMR Radio Bubbles */}
                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                      {mcq.options.map((option, idx) => {
                        const isSelected = userChoice === idx;
                        const isOptionCorrect = idx === mcq.correctIndex;

                        let bubbleStyle = 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500';
                        if (userChoice !== undefined) {
                          if (isOptionCorrect) {
                            bubbleStyle = 'border-emerald-500 bg-emerald-600 text-white font-black shadow-xs';
                          } else if (isSelected && !isOptionCorrect) {
                            bubbleStyle = 'border-rose-500 bg-rose-600 text-white font-black shadow-xs';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(mcq, idx)}
                            className={`w-8 h-8 rounded-full border-2 text-xs font-bold flex items-center justify-center transition cursor-pointer ${bubbleStyle}`}
                            title={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => toggleReveal(mcq.id)}
                        className="ml-2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        title="Toggle Explanation"
                      >
                        {isRevealed ? <EyeOff className="w-4 h-4 text-emerald-600" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Inline Explanation if opened */}
                  {isRevealed && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300">
                      <strong className="text-emerald-600 dark:text-emerald-400">Correct: ({String.fromCharCode(65 + mcq.correctIndex)}) {mcq.options[mcq.correctIndex]}</strong> — {mcq.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* 3 & 4. Standard Paper (1-Col) or Card Grid (2-Col) */
        <div className={displayLayout === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-4'}>
          {visibleMcqs.map((mcq, mcqIndex) => {
            const isRevealed = revealedAnswers[mcq.id] || false;
            const userChoice = userSelections[mcq.id];
            const bookmarked = isBookmarked(mcq.id);
            const qNumber = (page - 1) * pageSize + mcqIndex + 1;

            return (
              <div 
                key={mcq.id}
                id={`mcq-card-${mcq.id}`}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-800 transition flex flex-col justify-between"
              >
                <div>
                  {/* Meta header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider text-[11px] bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md">
                        Q {qNumber} • {mcq.category.replace('-', ' ')}
                      </span>
                      {mcq.subtopic && (
                        <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">
                          • {mcq.subtopic}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {mcq.examTags?.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        mcq.difficulty === 'Easy'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : mcq.difficulty === 'Medium'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {mcq.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Question statement */}
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed mb-4">
                    <MeaningText text={mcq.question} />
                  </h3>

                  {/* Options List / Grid */}
                  <div className={`gap-2.5 mb-4 ${displayLayout === 'grid' ? 'grid grid-cols-1 gap-2' : 'grid grid-cols-1 sm:grid-cols-2'}`}>
                    {mcq.options.map((option, idx) => {
                      const isSelected = userChoice === idx;
                      const isCorrect = idx === mcq.correctIndex;
                      
                      let optionClass = 'border-slate-200 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';

                      if (userChoice !== undefined) {
                        if (isCorrect) {
                          optionClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 font-semibold ring-1 ring-emerald-500';
                        } else if (isSelected && !isCorrect) {
                          optionClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-100 font-semibold ring-1 ring-rose-500';
                        }
                      } else if (isRevealed && isCorrect) {
                        optionClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 font-semibold';
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(mcq, idx)}
                          className={`p-3 rounded-xl border text-left text-sm transition flex items-center justify-between cursor-pointer ${optionClass}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <MeaningText text={option} className="leading-snug" />
                          </div>

                          {userChoice !== undefined && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          )}
                          {userChoice !== undefined && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Solution Explanation Box */}
                  {(isRevealed || userChoice !== undefined) && (
                    <div className="mb-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 animate-in fade-in duration-200">
                      <div className="font-bold text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Correct Answer: Option {String.fromCharCode(65 + mcq.correctIndex)} — {mcq.options[mcq.correctIndex]}</span>
                      </div>
                      <p className="leading-relaxed mt-1 text-slate-600 dark:text-slate-300">
                        <MeaningText text={mcq.explanation} />
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleReveal(mcq.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 transition cursor-pointer"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5 text-rose-500" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
                      <span>{isRevealed ? 'Hide Answer' : 'Show Answer'}</span>
                    </button>

                    <button
                      onClick={() => toggleBookmark(mcq.id)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border font-semibold transition cursor-pointer ${
                        bookmarked
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                      <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare(mcq)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition cursor-pointer"
                      title="Copy Question"
                    >
                      {copiedId === mcq.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => setReportedMcqId(mcq.id)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-600 transition cursor-pointer"
                      title="Report discrepancy in question or answer"
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Report Form Inline */}
                {reportedMcqId === mcq.id && (
                  <div className="mt-4 p-4 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/40 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-rose-800 dark:text-rose-300">
                        Report Issue in Question #{qNumber}
                      </span>
                      <button 
                        onClick={() => setReportedMcqId(null)}
                        className="text-xs text-slate-400 hover:text-slate-600"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleReportSubmit} className="space-y-2">
                      <select className="w-full text-xs p-2 rounded-lg border border-rose-200 dark:border-rose-800 bg-white dark:bg-slate-800">
                        <option>Incorrect correct answer indicated</option>
                        <option>Factual error in explanation</option>
                        <option>Typo or spelling mistake</option>
                        <option>Outdated current affairs fact</option>
                      </select>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition cursor-pointer"
                      >
                        {reportSuccess ? 'Submitted for Editorial Review!' : 'Submit Report'}
                      </button>
                    </form>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Bar */}
      {filteredMcqs.length > pageSize && (
        <nav aria-label="MCQ pages" className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <button 
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer" 
            disabled={page === 1} 
            onClick={() => { setPage(p => p - 1); window.scrollTo({top:0,behavior:'smooth'}); }}
          >
            Previous
          </button>
          <span className="text-xs sm:text-sm font-semibold">
            Page {page.toLocaleString()} of {pageCount.toLocaleString()}
          </span>
          <button 
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer" 
            disabled={page === pageCount} 
            onClick={() => { setPage(p => p + 1); window.scrollTo({top:0,behavior:'smooth'}); }}
          >
            Next
          </button>
        </nav>
      )}

      {/* Export Options Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        mcqs={filteredMcqs}
        subjectTitle={activeCategory?.name || (selectedSubtopic ? `${activeCategory?.name} - ${selectedSubtopic}` : 'MUQABIL All Subjects')}
        defaultCandidateName={userProfile?.name}
      />

    </div>
  );
};
