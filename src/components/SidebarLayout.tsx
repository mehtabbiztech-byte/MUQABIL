import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLayout } from '../context/LayoutContext';
import { NavigationTab } from '../types';
import { 
  Home, 
  BookOpen, 
  Trophy, 
  FileText, 
  Globe2, 
  GraduationCap, 
  Briefcase, 
  FileCheck2, 
  BookMarked, 
  Award, 
  BrainCircuit, 
  Bot, 
  Bookmark, 
  AlertTriangle, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Sparkles, 
  Clock, 
  Download,
  Info 
} from 'lucide-react';
import { LayoutButton } from './LayoutButton';
import { QuickLayoutSwitcher } from './QuickLayoutSwitcher';
import { ThemeSwitcherWidget } from './AttractiveBackground';
import { TechnicalDetailsModal } from './TechnicalDetailsModal';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

interface NavSection {
  title: string;
  items: {
    id: NavigationTab;
    label: string;
    subtitle?: string;
    icon: React.ReactNode;
    badge?: string;
    badgeColor?: string;
  }[];
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const { 
    tab, 
    setTab, 
    user, 
    userProfile, 
    darkMode, 
    toggleDarkMode, 
    setSearchOpen, 
    setAuthModalOpen,
  } = useApp();

  const { 
    sidebarCollapsed, 
    toggleSidebar, 
    getContainerClass, 
    getContentSpacingClass,
    setLayoutModalOpen 
  } = useLayout();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [techModalOpen, setTechModalOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<NavigationTab | null>(null);

  // Tab metadata for clean top-bar breadcrumbs & titles
  const getTabInfo = (currentTab: NavigationTab) => {
    switch (currentTab) {
      case 'home':
        return { label: 'Dashboard & Study Hub', subtitle: 'Targeted preparation & performance summary', icon: <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> };
      case 'mcqs':
        return { label: 'MCQs Question Bank', subtitle: 'Curated and authentic items across 15+ subjects', icon: <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> };
      case 'quiz':
        return { label: 'CBT Exam Simulator & Quizzes', subtitle: 'Authentic countdown, negative marking & OMR bubble sheets', icon: <Trophy className="w-4 h-4 text-amber-500" /> };
      case 'past-papers':
        return { label: 'Solved Past Papers & CSS Archive', subtitle: 'Official papers spanning 2010 to 2025 with source PDFs', icon: <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> };
      case 'current-affairs':
        return { label: 'Pakistan & Global Current Affairs 2026', subtitle: 'High-yield monthly, regional and global dossiers', icon: <Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> };
      case 'exams':
        return { label: 'Testing Agencies & Official Syllabi', subtitle: 'FPSC, PPSC, SPSC, STS IBA, NTS, ETEA, CSS schemes', icon: <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> };
      case 'jobs':
        return { label: 'Government Job Bulletins', subtitle: 'Active federal & provincial recruitment announcements (BPS 5–19)', icon: <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> };
      case 'age-calculator':
        return { label: 'Official Age Eligibility Calculator', subtitle: '15-Year Rule and provincial quota age relaxation limits', icon: <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> };
      case 'study-notes':
        return { label: 'High-Yield Study Notes Hub', subtitle: 'Core theory, pedagogy, STEDA and constitutional notes', icon: <BookMarked className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> };
      case 'resume':
        return { label: 'ATS Government Resume Builder', subtitle: 'Clean, printable civil service & academic CV generator', icon: <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> };
      case 'ai-chat':
        return { label: 'Gemini AI Exam Mentor', subtitle: 'Real-time multi-role question explanations & guidance', icon: <Bot className="w-4 h-4 text-purple-500" /> };
      case 'learning-lab':
        return { label: 'AI Adaptive Learning Lab', subtitle: 'Cognitive insights, spaced repetition & speed drill battles', icon: <BrainCircuit className="w-4 h-4 text-purple-500" /> };
      case 'rankings':
        return { label: 'National Merit Leaderboard', subtitle: 'Real-time competitive standings & test percentiles', icon: <Award className="w-4 h-4 text-amber-500" /> };
      case 'bookmarks':
        return { label: 'Saved Bookmarks', subtitle: 'Bookmarked questions for rapid high-yield revision', icon: <Bookmark className="w-4 h-4 text-amber-500" /> };
      case 'mistakes':
        return { label: 'Mistake Review Notebook', subtitle: 'Automatic log of incorrect choices for error elimination', icon: <AlertTriangle className="w-4 h-4 text-rose-500" /> };
      case 'about':
        return { label: 'About MUQABIL & Platform Architecture', subtitle: 'Founder profile, methodology & technical specification', icon: <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> };
      default:
        return { label: 'Competitive Exam Preparation', subtitle: 'Har Test Mein Sab Se Agay', icon: <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> };
    }
  };

  const currentTabInfo = getTabInfo(tab);

  const navSections: NavSection[] = [
    {
      title: 'Core Practice',
      items: [
        { id: 'home', label: 'Home Dashboard', subtitle: 'Targeted preparation overview', icon: <Home className="w-4 h-4" /> },
        { id: 'mcqs', label: 'MCQs Question Bank', subtitle: '1,200+ curated items', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'quiz', label: 'CBT Exam Simulator', subtitle: 'Timed test with negative marking', icon: <Trophy className="w-4 h-4" />, badge: 'LIVE', badgeColor: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-400/30' },
        { id: 'past-papers', label: 'Solved Past Papers', subtitle: '2010–2025 archive with CSS', icon: <FileText className="w-4 h-4" />, badge: '16 Yrs', badgeColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25' },
      ]
    },
    {
      title: 'Academic & Career Hubs',
      items: [
        { id: 'current-affairs', label: 'Current Affairs 2026', subtitle: 'Pakistan & global monthly review', icon: <Globe2 className="w-4 h-4" /> },
        { id: 'exams', label: 'Exams & Syllabi', subtitle: 'FPSC, PPSC, SPSC, STS schemes', icon: <GraduationCap className="w-4 h-4" /> },
        { id: 'jobs', label: 'Government Jobs', subtitle: 'Federal & provincial bulletins', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'study-notes', label: 'High-Yield Notes', subtitle: 'Theory, pedagogy & laws', icon: <BookMarked className="w-4 h-4" /> },
        { id: 'age-calculator', label: 'Age Calculator', subtitle: 'Official 15-Year Rule limits', icon: <Clock className="w-4 h-4" /> },
        { id: 'resume', label: 'ATS Resume Builder', subtitle: 'Printable civil service CV', icon: <FileCheck2 className="w-4 h-4" /> },
      ]
    },
    {
      title: 'AI & Performance',
      items: [
        { id: 'ai-chat', label: 'Gemini AI Mentor', subtitle: 'Real-time multi-role guidance', icon: <Bot className="w-4 h-4 text-purple-500" />, badge: 'AI', badgeColor: 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-400/30' },
        { id: 'learning-lab', label: 'AI Learning Lab', subtitle: 'Cognitive insights & drills', icon: <BrainCircuit className="w-4 h-4 text-purple-500" /> },
        { id: 'rankings', label: 'Merit Leaderboard', subtitle: 'National percentile standings', icon: <Award className="w-4 h-4 text-amber-500" /> },
        { id: 'bookmarks', label: 'Saved Bookmarks', subtitle: 'Bookmarked questions for revision', icon: <Bookmark className="w-4 h-4" />, badge: userProfile.bookmarks.length > 0 ? String(userProfile.bookmarks.length) : undefined, badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300' },
        { id: 'mistakes', label: 'Mistake Notebook', subtitle: 'Targeted error elimination', icon: <AlertTriangle className="w-4 h-4 text-rose-500" />, badge: userProfile.mistakeIds.length > 0 ? String(userProfile.mistakeIds.length) : undefined, badgeColor: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-400/30' },
      ]
    }
  ];

  const handleNavClick = (tabId: NavigationTab) => {
    setTab(tabId);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex bg-transparent text-slate-900 dark:text-slate-100 w-full relative">
      
      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Desktop & Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-xl lg:shadow-none ${
          mobileSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-72'}`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer overflow-hidden group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 flex items-center justify-center text-white font-black text-lg shadow-md shadow-emerald-900/20 shrink-0 group-hover:scale-105 transition-transform">
              M
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base tracking-tight text-slate-900 dark:text-white font-display truncate">
                    MUQABIL
                  </span>
                  <span className="px-1.5 py-0.2 rounded-md bg-emerald-500 text-white text-[9px] font-black">
                    مقابل
                  </span>
                </div>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold truncate">
                  muqabil.pk • Executive Workspace
                </p>
              </div>
            )}
          </div>

          {/* Desktop collapse button */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5 text-emerald-600" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Mini Profile Card (only when expanded) */}
        {!sidebarCollapsed && (
          <div className="p-3 mx-3 mt-3 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/50 dark:from-slate-800/60 dark:to-emerald-950/20 border border-slate-200 dark:border-slate-800 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  {userProfile.name?.charAt(0) || 'A'}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {userProfile.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {userProfile.targetExam || 'STS BPS 5–15 Aspirant'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-black text-amber-500">
                <Flame className="w-3.5 h-3.5 fill-amber-500 animate-pulse" />
                <span>{userProfile.streakDays}d</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/80 dark:border-slate-700/60">
              <span className="text-slate-500">Merit Points</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                {userProfile.points} pts
              </span>
            </div>
          </div>
        )}

        {/* Search Quick Button */}
        <div className="px-3 mt-3 shrink-0">
          <button
            onClick={() => setSearchOpen(true)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-medium transition cursor-pointer ${
              sidebarCollapsed ? 'justify-center px-2' : ''
            }`}
            title="Search MCQs & Past Papers (⌘K)"
          >
            <Search className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            {!sidebarCollapsed && (
              <>
                <span className="flex-1 text-left truncate">Search 15k+ bank...</span>
                <kbd className="px-1.5 py-0.5 rounded-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-mono shrink-0">
                  ⌘K
                </kbd>
              </>
            )}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {!sidebarCollapsed && (
                <div className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  {section.title}
                </div>
              )}

              {section.items.map((item) => {
                const isActive = tab === item.id;
                return (
                  <div 
                    key={item.id} 
                    className="relative"
                    onMouseEnter={() => setHoveredTab(item.id)}
                    onMouseLeave={() => setHoveredTab(null)}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative group ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/20 font-extrabold'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                      } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
                    >
                      {/* Active indicator bar on left when expanded */}
                      {isActive && !sidebarCollapsed && (
                        <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-white shadow-xs" />
                      )}

                      <span className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'}`}>
                        {item.icon}
                      </span>

                      {!sidebarCollapsed && (
                        <>
                          <span className="flex-1 text-left truncate">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase shrink-0 ${
                              isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-slate-100 text-slate-600'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>

                    {/* Floating Tooltip when sidebar is collapsed */}
                    {sidebarCollapsed && hoveredTab === item.id && (
                      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 rounded-md bg-emerald-500 text-white text-[9px] font-black uppercase">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Technical Details PDF Shortcut in Sidebar */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setTechModalOpen(true)}
              className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl border border-emerald-300/80 dark:border-emerald-800/80 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition cursor-pointer ${
                sidebarCollapsed ? 'justify-center px-2' : ''
              }`}
              title="Technical Details & Architecture Manual (PDF)"
            >
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              {!sidebarCollapsed && (
                <div className="flex-1 text-left min-w-0">
                  <div className="truncate">Technical Details (PDF)</div>
                  <div className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 font-normal truncate">Architecture &amp; Specs</div>
                </div>
              )}
              {!sidebarCollapsed && <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
            </button>
          </div>
        </div>

        {/* Bottom Dock / System controls */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/60 dark:bg-slate-900/60">
          {!sidebarCollapsed ? (
            <div className="space-y-2">
              <button
                onClick={() => setLayoutModalOpen(true)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer border border-slate-200 dark:border-slate-700/80"
              >
                <span>Layout Settings</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase">
                  Executive
                </span>
              </button>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                  <ThemeSwitcherWidget />
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  {user ? (userProfile.name?.split(' ')[0] || 'Account') : 'Sign In'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => setLayoutModalOpen(true)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Layout Settings"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title={darkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>

      </aside>

      {/* Main Workspace Frame */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
      }`}>
        
        {/* Executive Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between px-3 sm:px-6 lg:px-8 gap-4 shadow-xs">
          
          {/* Left: Mobile trigger & Breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
              aria-label="Open Sidebar Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Display */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-slate-400 text-xs font-medium hidden sm:inline">MUQABIL</span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>
              <div className="flex items-center gap-2 min-w-0">
                <span className="shrink-0">{currentTabInfo.icon}</span>
                <div className="min-w-0">
                  <h1 className="text-sm font-bold text-slate-900 dark:text-white truncate leading-tight">
                    {currentTabInfo.label}
                  </h1>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate hidden md:block leading-none mt-0.5">
                    {currentTabInfo.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Tools, Instant Layout Switcher & Candidate Status */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-500 transition cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Search...</span>
              <kbd className="px-1.5 py-0.2 rounded-sm bg-white dark:bg-slate-700 text-[10px] font-mono border border-slate-200 dark:border-slate-600">⌘K</kbd>
            </button>

            {/* 1-Click Interactive Layout Switcher */}
            <QuickLayoutSwitcher variant="header" />

            {/* Technical Details PDF Button */}
            <button
              onClick={() => setTechModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition cursor-pointer"
              title="Technical Details & Architecture Manual (PDF)"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Tech PDF</span>
            </button>

            {/* Target Exam Pill */}
            {userProfile.targetExam && (
              <span className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>{userProfile.targetExam}</span>
              </span>
            )}

            {/* Candidate Profile Avatar */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:border-emerald-400 transition cursor-pointer"
              title={user ? `Signed in as ${user.displayName || user.email}` : 'Sign In'}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                {userProfile.name?.charAt(0) || 'A'}
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 hidden sm:inline">
                {userProfile.name?.split(' ')[0] || 'Candidate'}
              </span>
              <div className="flex items-center gap-0.5 text-amber-500 text-[11px] font-black">
                <Flame className="w-3 h-3 fill-amber-500" />
                <span>{userProfile.streakDays}d</span>
              </div>
            </button>
          </div>

        </header>

        {/* Content Body */}
        <main className={`flex-1 relative z-10 w-full ${getContainerClass()} ${getContentSpacingClass()}`}>
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
