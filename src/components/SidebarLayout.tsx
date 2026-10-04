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
  Layers, 
  User, 
  Clock, 
  Check, 
  Compass, 
  ShieldCheck,
  LogIn,
  Mail,
  Info 
} from 'lucide-react';
import { LayoutButton } from './LayoutButton';
import { ThemeSwitcherWidget } from './AttractiveBackground';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

interface NavSection {
  title: string;
  items: {
    id: NavigationTab;
    label: string;
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
    setContactModalOpen
  } = useApp();

  const { 
    sidebarCollapsed, 
    toggleSidebar, 
    getContainerClass, 
    getContentSpacingClass,
    setLayoutModalOpen 
  } = useLayout();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navSections: NavSection[] = [
    {
      title: 'Core Preparation',
      items: [
        { id: 'home', label: 'Home Dashboard', icon: <Home className="w-4 h-4" /> },
        { id: 'mcqs', label: 'MCQs Question Bank', icon: <BookOpen className="w-4 h-4" />, badge: '15k+', badgeColor: 'bg-emerald-500 text-white' },
        { id: 'quiz', label: 'Exact Simulator & Quiz', icon: <Trophy className="w-4 h-4" />, badge: 'CBT', badgeColor: 'bg-amber-500 text-slate-950 font-black' },
        { id: 'past-papers', label: 'Solved Past Papers', icon: <FileText className="w-4 h-4" />, badge: 'Official', badgeColor: 'bg-purple-600 text-white' },
      ]
    },
    {
      title: 'Hubs & Career',
      items: [
        { id: 'current-affairs', label: 'Current Affairs 2026', icon: <Globe2 className="w-4 h-4" />, badge: 'Daily', badgeColor: 'bg-rose-500 text-white' },
        { id: 'exams', label: 'Exams & Syllabi', icon: <GraduationCap className="w-4 h-4" /> },
        { id: 'jobs', label: 'Government Jobs', icon: <Briefcase className="w-4 h-4" />, badge: 'BPS 5-17', badgeColor: 'bg-blue-600 text-white' },
        { id: 'study-notes', label: 'Study Notes Hub', icon: <BookMarked className="w-4 h-4" /> },
        { id: 'resume', label: 'ATS Resume Builder', icon: <FileCheck2 className="w-4 h-4" />, badge: 'New', badgeColor: 'bg-teal-500 text-white' },
      ]
    },
    {
      title: 'AI & Performance',
      items: [
        { id: 'ai-chat', label: 'Gemini AI Assistant', icon: <Bot className="w-4 h-4" />, badge: '2.5 Flash', badgeColor: 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-extrabold' },
        { id: 'learning-lab', label: 'AI Learning Lab', icon: <BrainCircuit className="w-4 h-4" /> },
        { id: 'rankings', label: 'Merit Leaderboard', icon: <Award className="w-4 h-4" /> },
        { id: 'bookmarks', label: 'Saved Bookmarks', icon: <Bookmark className="w-4 h-4" />, badge: String(userProfile.bookmarks.length) },
        { id: 'mistakes', label: 'Mistake Book', icon: <AlertTriangle className="w-4 h-4" />, badge: String(userProfile.mistakeIds.length), badgeColor: 'bg-rose-500 text-white' },
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
            className="flex items-center gap-2.5 cursor-pointer overflow-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 flex items-center justify-center text-white font-black text-lg shadow-md shadow-emerald-900/20 shrink-0">
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
                  muqabil.pk • Sab Se Agay
                </p>
              </div>
            )}
          </div>

          {/* Desktop collapse button */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
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
                    {userProfile.targetExam || 'STS BPS 5–15'}
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
            title="Search MCQs (Ctrl+K)"
          >
            <Search className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            {!sidebarCollapsed && (
              <>
                <span className="flex-1 text-left">Search MCQs...</span>
                <kbd className="px-1.5 py-0.5 rounded-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-mono">
                  ⌘K
                </kbd>
              </>
            )}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {!sidebarCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const isActive = tab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer relative group ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/20'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                    } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {item.badge && (
                          <span className={`px-2 py-0.2 rounded-full text-[10px] font-black ${
                            isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}

                    {/* Tooltip for rail mode */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition z-50 shadow-xl border border-slate-800">
                        {item.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Dock / System controls */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          {!sidebarCollapsed ? (
            <div className="space-y-1">
              <LayoutButton variant="sidebar" />
              <div className="flex items-center justify-between px-2 pt-1">
                <div className="flex items-center gap-1.5">
                  <ThemeSwitcherWidget />
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
                    title={darkMode ? 'Light Mode' : 'Dark Mode'}
                  >
                    {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  {user ? 'Account' : 'Sign In'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <LayoutButton variant="compact" />
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
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
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between px-3 sm:px-6 lg:px-8 gap-3">
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
              aria-label="Open Sidebar Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Navigation Links: Home, Important MCQs, Past Papers, About Us, Contact, Login */}
            <nav className="flex items-center gap-1 sm:gap-1.5 md:gap-2 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => handleNavClick('home')}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  tab === 'home'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>

              <button
                onClick={() => handleNavClick('mcqs')}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  tab === 'mcqs'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Important MCQs</span>
              </button>

              <button
                onClick={() => handleNavClick('past-papers')}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  tab === 'past-papers'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Past Papers</span>
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  tab === 'about'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>About Us</span>
              </button>

              <button
                onClick={() => setContactModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition whitespace-nowrap cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </button>

              <button
                onClick={() => setAuthModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300/70 dark:border-emerald-800 transition whitespace-nowrap cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{user ? (userProfile.name?.split(' ')[0] || 'Account') : 'Login'}</span>
              </button>
            </nav>
          </div>

          {/* Right Profile Tool */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="p-1.5 rounded-full ring-2 ring-emerald-500/30 hover:ring-emerald-500 transition cursor-pointer"
              title={user ? `Signed in as ${user.displayName || user.email}` : 'Sign In'}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                {userProfile.name?.charAt(0) || 'A'}
              </div>
            </button>
          </div>

        </header>

        {/* Content Body */}
        <main className={`flex-1 relative z-10 w-full ${getContainerClass()} ${getContentSpacingClass()}`}>
          {children}
        </main>

      </div>

    </div>
  );
};
