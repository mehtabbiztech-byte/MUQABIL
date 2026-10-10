import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLayout } from '../context/LayoutContext';
import { NavigationTab } from '../types';
import { 
  BookOpen, 
  Trophy, 
  FileText, 
  GraduationCap, 
  Globe2, 
  Briefcase, 
  ChevronRight, 
  Flame, 
  Sparkles, 
  Search, 
  Bookmark, 
  ShieldCheck, 
  Home, 
  Info, 
  Mail, 
  LogIn, 
  PanelLeftClose, 
  PanelLeft, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Layers, 
  Clock, 
  BookMarked,
  Download,
  Bot,
  BrainCircuit,
  FileCheck2,
  Award
} from 'lucide-react';
import { POPULAR_CATEGORIES } from '../data/categoriesData';
import { LayoutButton } from './LayoutButton';
import { QuickLayoutSwitcher } from './QuickLayoutSwitcher';
import { ThemeSwitcherWidget } from './AttractiveBackground';
import { TechnicalDetailsModal } from './TechnicalDetailsModal';

interface SplitWorkspaceLayoutProps {
  children: React.ReactNode;
}

export const SplitWorkspaceLayout: React.FC<SplitWorkspaceLayoutProps> = ({ children }) => {
  const { 
    tab, 
    setTab, 
    selectedCategorySlug, 
    setSelectedCategorySlug, 
    user,
    userProfile, 
    darkMode,
    toggleDarkMode,
    setSearchOpen,
    setAuthModalOpen,
    launchSimulator
  } = useApp();

  const { getContainerClass, getContentSpacingClass } = useLayout();
  const [navigatorCollapsed, setNavigatorCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [techModalOpen, setTechModalOpen] = useState(false);
  const [subjectSearch, setSubjectSearch] = useState('');

  const quickRooms = [
    { id: 'sts', title: 'STS BPS 5–15 Room', badge: '40-20-40 Blueprint' },
    { id: 'steda', title: 'STEDA Teaching License', badge: 'DCAR Aligned' },
    { id: 'fpsc', title: 'FPSC One-Paper FIA', badge: 'Negative Marking' },
    { id: 'spsc', title: 'SPSC CCE Combined Comp.', badge: 'Merit Pool' },
  ];

  const primaryModules: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Study Hub Dashboard', icon: <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> },
    { id: 'mcqs', label: 'MCQs Question Bank', icon: <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> },
    { id: 'quiz', label: 'CBT Exam Simulator', icon: <Trophy className="w-4 h-4 text-amber-500" />, badge: 'LIVE' },
    { id: 'past-papers', label: 'Solved Past Papers (2010–25)', icon: <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />, badge: '16 Yrs CSS' },
    { id: 'current-affairs', label: 'Current Affairs 2026', icon: <Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> },
    { id: 'exams', label: 'Syllabi & Agencies', icon: <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> },
    { id: 'jobs', label: 'Government Jobs (BPS 5–19)', icon: <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> },
    { id: 'study-notes', label: 'High-Yield Notes', icon: <BookMarked className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> },
    { id: 'resume', label: 'ATS Resume Builder', icon: <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> },
    { id: 'ai-chat', label: 'Gemini AI Mentor', icon: <Bot className="w-4 h-4 text-purple-500" /> },
    { id: 'rankings', label: 'Merit Leaderboard', icon: <Award className="w-4 h-4 text-amber-500" /> },
  ];

  const filteredCategories = POPULAR_CATEGORIES.filter(cat => 
    !subjectSearch || cat.name.toLowerCase().includes(subjectSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900 dark:text-slate-100 w-full relative">
      
      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between px-3 sm:px-6 gap-3 shadow-xs">
        
        {/* Left: Brand & Navigator Toggle */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 flex items-center justify-center text-white font-black text-sm shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              M
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-sm text-slate-900 dark:text-white font-display">
                MUQABIL <span className="text-emerald-500 font-urdu text-xs">مقابل</span>
              </span>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold leading-none">
                Dual Split Workspace
              </p>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

          {/* Desktop Left-Pane Toggle */}
          <button
            onClick={() => setNavigatorCollapsed(prev => !prev)}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
            title={navigatorCollapsed ? 'Expand Study Navigator' : 'Collapse Study Navigator for full width'}
          >
            {navigatorCollapsed ? <PanelLeft className="w-4 h-4 text-emerald-600" /> : <PanelLeftClose className="w-4 h-4 text-slate-400" />}
            <span className="text-[11px]">{navigatorCollapsed ? 'Show Navigator' : 'Hide Navigator'}</span>
          </button>

          {/* Mobile Navigator Drawer Toggle */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Open Study Navigator"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Breadcrumb indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-500 truncate">
          <span>Module:</span>
          <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
            {tab === 'mcqs' ? 'Question Bank (MCQs)' : tab === 'quiz' ? 'CBT Exam Simulator' : tab === 'past-papers' ? 'Past Papers (2010–2025)' : tab === 'jobs' ? 'Government Jobs' : tab === 'current-affairs' ? 'Current Affairs 2026' : 'Study Workspace'}
          </span>
          {selectedCategorySlug && tab === 'mcqs' && (
            <>
              <span>/</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold truncate">
                {selectedCategorySlug}
              </span>
            </>
          )}
        </div>

        {/* Right Tools: Search, Layout Switcher, Technical PDF, Theme, Candidate Chip */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 hover:border-emerald-400 transition cursor-pointer"
            title="Search MCQs & Past Papers (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden md:inline px-1.5 py-0.2 rounded-sm bg-white dark:bg-slate-700 text-[10px] font-mono border border-slate-200 dark:border-slate-600">⌘K</kbd>
          </button>

          {/* 1-Click Interactive Layout Switcher */}
          <QuickLayoutSwitcher variant="header" />

          {/* Technical Details PDF Button */}
          <button
            onClick={() => setTechModalOpen(true)}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition cursor-pointer"
            title="Technical Details & Architecture Manual (PDF)"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Tech PDF</span>
          </button>

          <ThemeSwitcherWidget />

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setAuthModalOpen(true)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:border-emerald-400 transition cursor-pointer shrink-0"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              {userProfile.name?.charAt(0) || 'A'}
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 hidden sm:inline">
              {userProfile.name?.split(' ')[0] || 'Account'}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500 text-[11px] font-black">
              <Flame className="w-3 h-3 fill-amber-500" />
              <span>{userProfile.streakDays}d</span>
            </div>
          </button>
        </div>

      </header>

      {/* Dual Column Workspace Container */}
      <div className="flex-1 flex max-w-full overflow-hidden relative">
        
        {/* Left Column: Master Syllabus & Category Navigator (desktop & mobile drawer) */}
        <aside className={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-slate-200 dark:border-slate-800 p-4 overflow-y-auto z-40 transition-all duration-300 ${
          mobileDrawerOpen 
            ? 'fixed inset-y-0 left-0 w-80 shadow-2xl block'
            : navigatorCollapsed 
            ? 'hidden' 
            : 'hidden lg:block w-72 xl:w-80 shrink-0 max-h-[calc(100vh-4rem)] sticky top-16'
        } space-y-5 scrollbar-thin`}>
          
          {/* Mobile drawer header */}
          {mobileDrawerOpen && (
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 lg:hidden">
              <span className="font-bold text-sm text-slate-900 dark:text-white">Study Navigator</span>
              <button onClick={() => setMobileDrawerOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Candidate Quick Stats */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/30">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Aspirant Progress</span>
              <div className="flex items-center gap-1 text-xs font-black text-amber-500">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                <span>{userProfile.streakDays}d streak</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Merit Score</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{userProfile.points} pts</span>
            </div>
          </div>

          {/* Primary Study Navigation */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Practice Modules
            </h4>
            <div className="space-y-1">
              {primaryModules.map((mod) => {
                const isActive = tab === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setTab(mod.id);
                      setMobileDrawerOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white font-extrabold shadow-xs'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {mod.icon}
                      <span className="truncate">{mod.label}</span>
                    </div>
                    {mod.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-black ${
                        isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      }`}>
                        {mod.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Exam Rooms */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Testing Agency Blueprints
            </h4>
            <div className="space-y-1.5">
              {quickRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    if (room.id === 'steda') {
                      launchSimulator({
                        simulatorId: 'sts',
                        title: 'STS IBA Teaching License Test (STEDA)',
                        category: 'STS IBA Teaching License Test',
                        durationMinutes: 120,
                        timeMinutes: 120,
                        questionCount: 100,
                        negativeMarking: false,
                      });
                    } else {
                      setTab('exams');
                    }
                  }}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition cursor-pointer"
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {room.title}
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                    {room.badge}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Subject Categories Quick Switcher */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Subject MCQs Index
              </h4>
              <span className="text-[10px] text-slate-400">{filteredCategories.length} Subjects</span>
            </div>

            {/* Quick search input */}
            <div className="mb-2">
              <input
                type="text"
                placeholder="Filter subjects..."
                value={subjectSearch}
                onChange={(e) => setSubjectSearch(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
              <button
                onClick={() => {
                  setSelectedCategorySlug(null);
                  setTab('mcqs');
                  setMobileDrawerOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                  tab === 'mcqs' && !selectedCategorySlug
                    ? 'bg-emerald-600 text-white font-extrabold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>All Subjects (1,200+)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {filteredCategories.map((cat) => {
                const isActive = tab === 'mcqs' && selectedCategorySlug === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategorySlug(cat.slug);
                      setTab('mcqs');
                      setMobileDrawerOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {cat.totalMcqs}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Technical Details PDF Shortcut in Sidebar */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileDrawerOpen(false);
                setTechModalOpen(true);
              }}
              className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-800/80 text-white hover:border-emerald-500 transition cursor-pointer flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold">Technical Details PDF</div>
                  <div className="text-[10px] text-emerald-300">Complete Architecture Manual</div>
                </div>
              </div>
              <Download className="w-4 h-4 text-emerald-400 shrink-0" />
            </button>
          </div>

        </aside>

        {/* Right Column: Main Content Canvas */}
        <main className={`flex-1 min-w-0 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 ${getContentSpacingClass()}`}>
          {children}
        </main>

      </div>

      {/* Technical Details Modal */}
      <TechnicalDetailsModal 
        isOpen={techModalOpen} 
        onClose={() => setTechModalOpen(false)} 
      />

    </div>
  );
};
