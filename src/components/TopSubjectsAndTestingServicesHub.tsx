import React, { useMemo, useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  Flame, 
  Landmark, 
  Globe2, 
  BookOpenCheck, 
  Laptop, 
  Atom, 
  Calculator, 
  Dna, 
  Briefcase, 
  TrendingUp, 
  Users, 
  Target, 
  FileCheck2, 
  ChevronRight,
  ChevronDown,
  X,
  ExternalLink,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCmsContent } from '../context/CmsContentContext';
import { MCQS_DATA } from '../data/mcqsData';
import { countSubjectMcqs } from '../utils/subjectMcqCounts';
import { 
  TOP_SUBJECTS_DIRECTORY, 
  TEST_PREPARATION_ONLINE_SERVICES, 
  TopSubjectItem, 
  OnlineTestingService,
  POPULAR_CATEGORIES 
} from '../data/categoriesData';

export const TopSubjectsAndTestingServicesHub: React.FC<{
  variant?: 'full' | 'compact';
  onSelectSubject?: (slug: string) => void;
  onSelectExam?: (examId: string, examTag: string) => void;
}> = ({ variant = 'full', onSelectSubject, onSelectExam }) => {
  const { setTab, setSelectedCategorySlug, setSelectedExamId } = useApp();
  const { mcqs: liveMcqs } = useCmsContent();
  const availableMcqs = useMemo(() => [...liveMcqs, ...MCQS_DATA], [liveMcqs]);
  const getSubjectMcqCount = (slug: string) => countSubjectMcqs(availableMcqs, slug);
  const [activeTab, setActiveTab] = useState<'subjects' | 'testing-agencies'>('subjects');
  const [agencyFilter, setAgencyFilter] = useState<'All' | 'Federal' | 'Provincial' | 'Testing Agency' | 'Admission'>('All');
  const [subjectGroupFilter, setSubjectGroupFilter] = useState<'all' | 'general' | 'management-sciences'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected Subject for in-place opened category / subtopics
  const [selectedSubjectSlug, setSelectedSubjectSlug] = useState<string | null>(null);

  const handleSubjectClick = (slug: string) => {
    // If clicking already selected, toggle; otherwise open under this subject
    if (selectedSubjectSlug === slug) {
      setSelectedSubjectSlug(null);
    } else {
      setSelectedSubjectSlug(slug);
    }
  };

  const handleGoToMcqs = (slug: string, subtopic?: string) => {
    if (onSelectSubject) {
      onSelectSubject(slug);
    } else {
      setSelectedCategorySlug(slug);
      setTab('mcqs');
      if (subtopic) {
        sessionStorage.setItem('matb_quick_subtopic_filter', subtopic);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAgencyClick = (exam: OnlineTestingService, action: 'mcqs' | 'hub') => {
    if (onSelectExam) {
      onSelectExam(exam.examId, exam.tag);
    } else if (action === 'mcqs') {
      setSelectedCategorySlug(null);
      setTab('mcqs');
      // Store preferred exam filter in sessionStorage
      sessionStorage.setItem('matb_quick_exam_filter', exam.tag);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSelectedExamId(exam.examId);
      setTab('exams');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filtered Subjects
  const filteredSubjects = TOP_SUBJECTS_DIRECTORY.filter((subj) => {
    if (subjectGroupFilter === 'management-sciences' && subj.parentGroup !== 'management-sciences') {
      return false;
    }
    if (subjectGroupFilter === 'general' && subj.parentGroup === 'management-sciences') {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return subj.name.toLowerCase().includes(q) || subj.shortLabel.toLowerCase().includes(q);
    }
    return true;
  });

  // Filtered Testing Agencies
  const filteredAgencies = TEST_PREPARATION_ONLINE_SERVICES.filter((agency) => {
    if (agencyFilter !== 'All' && agency.category !== agencyFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        agency.name.toLowerCase().includes(q) ||
        agency.fullName.toLowerCase().includes(q) ||
        agency.code.toLowerCase().includes(q) ||
        agency.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getSubjectIcon = (slug: string) => {
    switch (slug) {
      case 'general-knowledge':
        return <Globe2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'pakistan-affairs':
      case 'pakistan-studies':
        return <Landmark className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'current-affairs':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'english':
        return <BookOpenCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'islamic-studies':
        return <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'computer-science':
        return <Laptop className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'everyday-science':
        return <Atom className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'mathematics':
        return <Calculator className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'biology':
        return <Dna className="w-5 h-5 text-rose-500" />;
      case 'management-sciences':
        return <Briefcase className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'accounting':
        return <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'auditing':
        return <FileCheck2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'finance':
        return <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'hrm':
        return <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
      case 'marketing':
        return <Target className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const activeCategoryData = selectedSubjectSlug 
    ? POPULAR_CATEGORIES.find(c => c.slug === selectedSubjectSlug) || null
    : null;

  const activeSubjectItem = selectedSubjectSlug
    ? TOP_SUBJECTS_DIRECTORY.find(s => s.categorySlug === selectedSubjectSlug) || null
    : null;

  return (
    <div className="space-y-6">
      {/* Navigation Header / Switcher */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Syllabus Blueprint</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white font-display tracking-tight">
              Top Subjects &amp; Test Preparation Online
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Study the most repeated MCQs by top competitive subjects or select your target Pakistani testing agency for full paper-pattern preparation.
            </p>
          </div>

          {/* Tab Selector: Top Subjects vs Test Preparation Online */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('subjects')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activeTab === 'subjects'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Top Subjects ({TOP_SUBJECTS_DIRECTORY.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('testing-agencies')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activeTab === 'testing-agencies'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Test Prep Online ({TEST_PREPARATION_ONLINE_SERVICES.length})</span>
            </button>
          </div>
        </div>

        {/* Filter controls and Search */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
          {activeTab === 'subjects' ? (
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {/* Dropdown to select subjects */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Select Subject:</span>
                </span>
                <select
                  value={selectedSubjectSlug || 'all'}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedSubjectSlug(val === 'all' ? null : val);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-emerald-500/40 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-2xs"
                >
                  <option value="all">All Subjects (Show All Categories)</option>
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
                </select>
              </div>

              {/* Group Filter Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setSubjectGroupFilter('all');
                    setSelectedSubjectSlug(null);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    subjectGroupFilter === 'all' && !selectedSubjectSlug
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSubjectGroupFilter('general')}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    subjectGroupFilter === 'general'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  General
                </button>
                <button
                  onClick={() => setSubjectGroupFilter('management-sciences')}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                    subjectGroupFilter === 'management-sciences'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  <Briefcase className="w-3 h-3" />
                  <span>Management (5)</span>
                </button>
              </div>

              {selectedSubjectSlug && (
                <button
                  onClick={() => setSelectedSubjectSlug(null)}
                  className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close Opened Category</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400 mr-1">Agency:</span>
              {(['All', 'Federal', 'Provincial', 'Testing Agency', 'Admission'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setAgencyFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    agencyFilter === cat
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Quick search input */}
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === 'subjects' ? 'Search subject...' : 'Search agency (FPSC, SPSC, OTS...)'}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* OPENED CATEGORY TRAY (Opened under as like All subjects) */}
        {activeTab === 'subjects' && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {selectedSubjectSlug ? (
              /* When a specific subject is clicked: its subcategories & topics are opened right under it */
              <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-slate-900 border border-emerald-200/80 dark:border-emerald-800/60 space-y-3 animate-in fade-in duration-150">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center shadow-xs">
                      {getSubjectIcon(selectedSubjectSlug)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                          {activeSubjectItem?.name || activeCategoryData?.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200/70 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">
                          Opened Category Under Subject
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        {activeCategoryData?.description || 'Explore verified chapter-wise multiple choice questions with explanations.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleGoToMcqs(selectedSubjectSlug)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Explore All {activeSubjectItem?.shortLabel || 'Subject'} MCQs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setSelectedSubjectSlug(null)}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                      title="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Subcategories & High-Yield Topics List */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Prescribed Subcategories &amp; Topics (Click any to practice):
                  </div>

                  {/* If Management Sciences: show sub-disciplines */}
                  {selectedSubjectSlug === 'management-sciences' && (
                    <div className="flex flex-wrap gap-2 mb-2.5">
                      {[
                        { name: 'Accounting MCQs', slug: 'accounting' },
                        { name: 'Auditing MCQs', slug: 'auditing' },
                        { name: 'Finance MCQs', slug: 'finance' },
                        { name: 'HRM MCQs', slug: 'hrm' },
                        { name: 'Marketing MCQs', slug: 'marketing' }
                      ].map((child) => (
                        <button
                          key={child.slug}
                          onClick={() => handleGoToMcqs(child.slug)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition cursor-pointer flex items-center gap-1 shadow-xs"
                        >
                          <span>{child.name}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Subtopics Pills */}
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto scrollbar-thin">
                    <button
                      onClick={() => handleGoToMcqs(selectedSubjectSlug)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold shadow-xs hover:bg-emerald-800 transition cursor-pointer"
                    >
                      All {activeSubjectItem?.shortLabel || 'Topics'} Combined
                    </button>

                    {activeCategoryData?.subtopics?.map((sub, i) => (
                      <button
                        key={i}
                        onClick={() => handleGoToMcqs(selectedSubjectSlug, sub)}
                        className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/80 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 transition cursor-pointer"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* When All Subjects is active: show overview of all subject categories under it */
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>All Subject Categories:</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Click any subject to open its specific topics under it
                  </span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                  <button
                    onClick={() => handleGoToMcqs('')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 bg-emerald-600 text-white shadow-xs"
                  >
                    All Subjects Combined
                  </button>

                  {TOP_SUBJECTS_DIRECTORY.map((subj) => (
                    <button
                      key={subj.id}
                      onClick={() => setSelectedSubjectSlug(subj.categorySlug)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 border border-transparent"
                    >
                      {subj.shortLabel}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 1. TOP SUBJECTS GRID */}
      {activeTab === 'subjects' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSubjects.map((subject) => {
            const isOpened = selectedSubjectSlug === subject.categorySlug;
            return (
              <div
                key={subject.id}
                onClick={() => handleSubjectClick(subject.categorySlug)}
                className={`group p-5 rounded-3xl border transition flex flex-col justify-between cursor-pointer ${
                  isOpened
                    ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-md ring-2 ring-emerald-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 dark:hover:border-emerald-500/70 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-center group-hover:scale-105 transition">
                      {getSubjectIcon(subject.categorySlug)}
                    </div>
                    {subject.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                        {subject.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition font-display">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Chapter-wise exam MCQs with authentic explanations &amp; key formulas.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-slate-600 dark:text-slate-400">
                    {getSubjectMcqCount(subject.categorySlug).toLocaleString()} MCQs
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                    <span>{isOpened ? 'Category Opened' : 'Open Category'}</span>
                    {isOpened ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. TEST PREPARATION ONLINE SERVICES GRID */}
      {activeTab === 'testing-agencies' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAgencies.map((agency) => (
            <div
              key={agency.id}
              className="group p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 dark:hover:border-emerald-500/70 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-lg font-black font-display text-emerald-700 dark:text-emerald-400">
                    {agency.code}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {agency.category}
                  </span>
                </div>

                <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1 mb-1.5">
                  {agency.fullName}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {agency.description}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-xl">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{agency.verifiedCount}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAgencyClick(agency, 'mcqs')}
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
                >
                  Solve MCQs
                </button>
                <button
                  type="button"
                  onClick={() => handleAgencyClick(agency, 'hub')}
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-black hover:bg-emerald-100 dark:hover:bg-emerald-900 transition cursor-pointer"
                >
                  Exam Hub
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
