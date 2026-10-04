import React from 'react';
import { useApp } from '../context/AppContext';
import { useLayout } from '../context/LayoutContext';
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
  ArrowLeft,
  Home,
  Info,
  Mail,
  LogIn 
} from 'lucide-react';
import { POPULAR_CATEGORIES } from '../data/categoriesData';
import { LayoutButton } from './LayoutButton';
import { ThemeSwitcherWidget } from './AttractiveBackground';

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
    setSearchOpen,
    setAuthModalOpen,
    setContactModalOpen,
    launchSimulator
  } = useApp();

  const { getContainerClass, getContentSpacingClass } = useLayout();

  const quickRooms = [
    { id: 'sts', title: 'STS BPS 5–15 Room', badge: '40-20-40 Blueprint' },
    { id: 'steda', title: 'STEDA Teaching License', badge: 'DCAR Aligned' },
    { id: 'fpsc', title: 'FPSC One-Paper FIA', badge: 'Negative Marking' },
    { id: 'spsc', title: 'SPSC CCE Combined Comp.', badge: 'Merit Pool' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900 dark:text-slate-100 w-full">
      
      {/* Top Slim Header */}
      <header className="sticky top-0 z-30 h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setTab('home')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black text-sm">
              M
            </div>
            <span className="font-black text-sm text-slate-900 dark:text-white font-display hidden sm:inline">
              MUQABIL <span className="text-emerald-500 font-urdu text-xs">مقابل</span>
            </span>
          </div>

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

          <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] font-black uppercase hidden lg:inline">
            Split Workspace
          </span>
        </div>

        {/* Center Navigation Links: Home, Important MCQs, Past Papers, About Us, Contact, Login */}
        <nav className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mx-1 sm:mx-3 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => { setTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              tab === 'home'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => { setTab('mcqs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              tab === 'mcqs'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Important MCQs</span>
          </button>

          <button
            onClick={() => { setTab('past-papers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              tab === 'past-papers'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Past Papers</span>
          </button>

          <button
            onClick={() => { setTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
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
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition whitespace-nowrap cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>

          <button
            onClick={() => setAuthModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300/70 dark:border-emerald-800 transition whitespace-nowrap cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{user ? (userProfile.name?.split(' ')[0] || 'Account') : 'Login'}</span>
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search bank...</span>
          </button>

          <LayoutButton variant="navbar" />

          <ThemeSwitcherWidget />
        </div>
      </header>

      {/* Dual Column Workspace Container */}
      <div className="flex-1 flex max-w-full overflow-hidden">
        
        {/* Left Column: Master Syllabus & Category Navigator (desktop) */}
        <aside className="hidden lg:block w-72 xl:w-80 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto max-h-[calc(100vh-3.5rem)] sticky top-14 space-y-6">
          
          {/* Candidate Quick Stats */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/30">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Aspirant Progress</span>
              <div className="flex items-center gap-1 text-xs font-black text-amber-500">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                <span>{userProfile.streakDays}d</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Merit Points</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{userProfile.points} pts</span>
            </div>
          </div>

          {/* Quick Exam Rooms */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              ⚡ Priority Exam Hubs
            </h4>
            <div className="space-y-1.5">
              {quickRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => {
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
            <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              📚 Subject MCQs Jumper
            </h4>
            <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
              <button
                onClick={() => {
                  setSelectedCategorySlug(null);
                  setTab('mcqs');
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                  tab === 'mcqs' && !selectedCategorySlug
                    ? 'bg-emerald-600 text-white font-extrabold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>All Subjects (15k+)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {POPULAR_CATEGORIES.map((cat) => {
                const isActive = tab === 'mcqs' && selectedCategorySlug === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategorySlug(cat.slug);
                      setTab('mcqs');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white font-extrabold'
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

          {/* Practice shortcuts */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
            <button
              onClick={() => setTab('past-papers')}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-purple-600" />
              <span>Solved Past Papers</span>
            </button>
            <button
              onClick={() => setTab('current-affairs')}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <Globe2 className="w-4 h-4 text-rose-500" />
              <span>Current Affairs 2026</span>
            </button>
            <button
              onClick={() => setTab('bookmarks')}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>Saved Bookmarks ({userProfile.bookmarks.length})</span>
            </button>
          </div>

        </aside>

        {/* Right Column: Main Content Canvas */}
        <main className={`flex-1 min-w-0 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 ${getContentSpacingClass()}`}>
          {children}
        </main>

      </div>

    </div>
  );
};
