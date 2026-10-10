import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../types';
import { 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Bookmark, 
  User, 
  Flame, 
  Sparkles,
  BookOpenCheck,
  Palette,
  Home,
  BookOpen,
  Trophy,
  FileText,
  Globe2,
  GraduationCap,
  Briefcase,
  BookMarked,
  Award,
  BrainCircuit,
  Info,
  ChevronRight,
  Check,
  FileCheck2,
  Bot
} from 'lucide-react';
import { ThemeSwitcherWidget, THEME_OPTIONS } from './AttractiveBackground';
import { LayoutButton } from './LayoutButton';

interface NavItemConfig {
  id: NavigationTab;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  badgeType?: 'live' | 'year' | 'alert';
  desc: string;
}

interface NavThemePalette {
  microBarBg: string;
  microBarText: string;
  microBarTargetText: string;
  microBarBorder: string;
  logoBg: string;
  logoRing: string;
  brandTextGradient: string;
  searchBorderHover: string;
  searchIcon: string;
  searchKbd: string;
  navBorder: string;
  activeBtn: string;
  activeIcon: string;
  inactiveIcon: string;
  inactiveBtnHover: string;
  badgeYearActive: string;
  badgeYearInactive: string;
  badgeLiveActive: string;
  badgeLiveInactive: string;
  badgeAlertActive: string;
  badgeAlertInactive: string;
  bookmarkActive: string;
  bookmarkBadge: string;
  authLoggedIn: string;
  authGuest: string;
  mobileMenuBtn: string;
  mobileBottomActive: string;
}

const NAV_THEME_PALETTES: Record<string, NavThemePalette> = {
  emerald: {
    microBarBg: 'bg-[#042017]',
    microBarText: 'text-emerald-100',
    microBarTargetText: 'text-amber-300 font-bold',
    microBarBorder: 'border-emerald-900/60',
    logoBg: 'bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700',
    logoRing: 'ring-emerald-400/40 shadow-emerald-950/20',
    brandTextGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300',
    searchBorderHover: 'hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50/40',
    searchIcon: 'text-emerald-600 dark:text-emerald-400',
    searchKbd: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-slate-900 border-emerald-200 dark:border-slate-700',
    navBorder: 'border-emerald-100 dark:border-emerald-950/40',
    activeBtn: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-extrabold shadow-md shadow-emerald-950/25 ring-2 ring-emerald-400/50 border border-emerald-400/40',
    activeIcon: 'text-white',
    inactiveIcon: 'text-emerald-600 dark:text-emerald-400',
    inactiveBtnHover: 'hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40 hover:border-emerald-400/80',
    badgeYearActive: 'bg-amber-400 text-slate-950 shadow-xs font-black',
    badgeYearInactive: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700',
    badgeLiveActive: 'bg-white/25 text-white',
    badgeLiveInactive: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
    badgeAlertActive: 'bg-white text-rose-700 font-black',
    badgeAlertInactive: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
    bookmarkActive: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60',
    bookmarkBadge: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white',
    authLoggedIn: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white',
    authGuest: 'bg-white/90 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-400/60 hover:bg-emerald-50 dark:hover:bg-slate-750',
    mobileMenuBtn: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 hover:bg-emerald-100 dark:bg-slate-800 dark:hover:bg-slate-700',
    mobileBottomActive: 'text-emerald-600 dark:text-emerald-400',
  },
  sapphire: {
    microBarBg: 'bg-[#071630]',
    microBarText: 'text-blue-100',
    microBarTargetText: 'text-cyan-300 font-bold',
    microBarBorder: 'border-blue-900/60',
    logoBg: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600',
    logoRing: 'ring-blue-400/40 shadow-blue-950/20',
    brandTextGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-300',
    searchBorderHover: 'hover:border-blue-400 dark:hover:border-cyan-500 hover:bg-blue-50/40',
    searchIcon: 'text-blue-600 dark:text-cyan-400',
    searchKbd: 'text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-slate-900 border-blue-200 dark:border-slate-700',
    navBorder: 'border-blue-100 dark:border-blue-950/40',
    activeBtn: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-extrabold shadow-md shadow-blue-900/25 ring-2 ring-blue-400/50 border border-blue-400/40',
    activeIcon: 'text-white',
    inactiveIcon: 'text-blue-600 dark:text-cyan-400',
    inactiveBtnHover: 'hover:text-blue-700 dark:hover:text-cyan-300 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 hover:border-blue-400/80',
    badgeYearActive: 'bg-cyan-400 text-slate-950 shadow-xs font-black',
    badgeYearInactive: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-700',
    badgeLiveActive: 'bg-white/25 text-white',
    badgeLiveInactive: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
    badgeAlertActive: 'bg-white text-rose-700 font-black',
    badgeAlertInactive: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
    bookmarkActive: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60',
    bookmarkBadge: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white',
    authLoggedIn: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white',
    authGuest: 'bg-white/90 dark:bg-slate-800 text-blue-700 dark:text-cyan-300 border border-blue-400/60 hover:bg-blue-50 dark:hover:bg-slate-750',
    mobileMenuBtn: 'text-blue-700 dark:text-cyan-300 bg-blue-50/80 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700',
    mobileBottomActive: 'text-blue-600 dark:text-cyan-400',
  },
  sunset: {
    microBarBg: 'bg-[#251204]',
    microBarText: 'text-amber-100',
    microBarTargetText: 'text-amber-300 font-bold',
    microBarBorder: 'border-amber-900/60',
    logoBg: 'bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600',
    logoRing: 'ring-amber-400/40 shadow-amber-950/20',
    brandTextGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-300',
    searchBorderHover: 'hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50/40',
    searchIcon: 'text-amber-600 dark:text-amber-400',
    searchKbd: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-slate-900 border-amber-200 dark:border-slate-700',
    navBorder: 'border-amber-100 dark:border-amber-950/40',
    activeBtn: 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-extrabold shadow-md shadow-amber-900/25 ring-2 ring-amber-400/50 border border-amber-400/40',
    activeIcon: 'text-white',
    inactiveIcon: 'text-amber-600 dark:text-orange-400',
    inactiveBtnHover: 'hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-50/80 dark:hover:bg-amber-950/40 hover:border-amber-400/80',
    badgeYearActive: 'bg-amber-300 text-slate-950 shadow-xs font-black',
    badgeYearInactive: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700',
    badgeLiveActive: 'bg-white/25 text-white',
    badgeLiveInactive: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
    badgeAlertActive: 'bg-white text-rose-700 font-black',
    badgeAlertInactive: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
    bookmarkActive: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60',
    bookmarkBadge: 'bg-gradient-to-r from-amber-600 to-rose-600 text-white',
    authLoggedIn: 'bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white',
    authGuest: 'bg-white/90 dark:bg-slate-800 text-amber-700 dark:text-amber-300 border border-amber-400/60 hover:bg-amber-50 dark:hover:bg-slate-750',
    mobileMenuBtn: 'text-amber-700 dark:text-amber-300 bg-amber-50/80 hover:bg-amber-100 dark:bg-slate-800 dark:hover:bg-slate-700',
    mobileBottomActive: 'text-amber-600 dark:text-amber-400',
  },
  cyber: {
    microBarBg: 'bg-[#0d041e]',
    microBarText: 'text-cyan-100',
    microBarTargetText: 'text-cyan-300 font-bold',
    microBarBorder: 'border-cyan-900/60',
    logoBg: 'bg-gradient-to-br from-cyan-600 via-violet-600 to-fuchsia-600',
    logoRing: 'ring-cyan-400/40 shadow-cyan-950/20',
    brandTextGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600 dark:from-cyan-400 dark:to-violet-300',
    searchBorderHover: 'hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-cyan-50/40',
    searchIcon: 'text-cyan-600 dark:text-cyan-400',
    searchKbd: 'text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-slate-900 border-cyan-200 dark:border-slate-700',
    navBorder: 'border-cyan-100 dark:border-cyan-950/40',
    activeBtn: 'bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 text-white font-extrabold shadow-md shadow-cyan-900/25 ring-2 ring-cyan-400/50 border border-cyan-400/40',
    activeIcon: 'text-white',
    inactiveIcon: 'text-cyan-600 dark:text-violet-400',
    inactiveBtnHover: 'hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-cyan-50/80 dark:hover:bg-cyan-950/40 hover:border-cyan-400/80',
    badgeYearActive: 'bg-cyan-400 text-slate-950 shadow-xs font-black',
    badgeYearInactive: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700',
    badgeLiveActive: 'bg-white/25 text-white',
    badgeLiveInactive: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
    badgeAlertActive: 'bg-white text-rose-700 font-black',
    badgeAlertInactive: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
    bookmarkActive: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/60',
    bookmarkBadge: 'bg-gradient-to-r from-cyan-600 to-violet-600 text-white',
    authLoggedIn: 'bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white',
    authGuest: 'bg-white/90 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 border border-cyan-400/60 hover:bg-cyan-50 dark:hover:bg-slate-750',
    mobileMenuBtn: 'text-cyan-700 dark:text-cyan-300 bg-cyan-50/80 hover:bg-cyan-100 dark:bg-slate-800 dark:hover:bg-slate-700',
    mobileBottomActive: 'text-cyan-600 dark:text-cyan-400',
  },
  ocean: {
    microBarBg: 'bg-[#031521]',
    microBarText: 'text-cyan-100',
    microBarTargetText: 'text-cyan-300 font-bold',
    microBarBorder: 'border-cyan-900/60',
    logoBg: 'bg-gradient-to-br from-cyan-600 via-teal-600 to-sky-600',
    logoRing: 'ring-cyan-400/40 shadow-cyan-950/20',
    brandTextGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-600 dark:from-cyan-400 dark:to-sky-300',
    searchBorderHover: 'hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-cyan-50/40',
    searchIcon: 'text-cyan-600 dark:text-sky-400',
    searchKbd: 'text-cyan-700 dark:text-sky-300 bg-cyan-50 dark:bg-slate-900 border-cyan-200 dark:border-slate-700',
    navBorder: 'border-cyan-100 dark:border-cyan-950/40',
    activeBtn: 'bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 text-white font-extrabold shadow-md shadow-cyan-900/25 ring-2 ring-cyan-400/50 border border-cyan-400/40',
    activeIcon: 'text-white',
    inactiveIcon: 'text-cyan-600 dark:text-sky-400',
    inactiveBtnHover: 'hover:text-cyan-700 dark:hover:text-sky-300 hover:bg-cyan-50/80 dark:hover:bg-cyan-950/40 hover:border-cyan-400/80',
    badgeYearActive: 'bg-cyan-400 text-slate-950 shadow-xs font-black',
    badgeYearInactive: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700',
    badgeLiveActive: 'bg-white/25 text-white',
    badgeLiveInactive: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
    badgeAlertActive: 'bg-white text-rose-700 font-black',
    badgeAlertInactive: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
    bookmarkActive: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/60',
    bookmarkBadge: 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white',
    authLoggedIn: 'bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white',
    authGuest: 'bg-white/90 dark:bg-slate-800 text-cyan-700 dark:text-sky-300 border border-cyan-400/60 hover:bg-cyan-50 dark:hover:bg-slate-750',
    mobileMenuBtn: 'text-cyan-700 dark:text-sky-300 bg-cyan-50/80 hover:bg-cyan-100 dark:bg-slate-800 dark:hover:bg-slate-700',
    mobileBottomActive: 'text-cyan-600 dark:text-sky-400',
  },
  rose: {
    microBarBg: 'bg-[#1e050f]',
    microBarText: 'text-rose-100',
    microBarTargetText: 'text-rose-300 font-bold',
    microBarBorder: 'border-rose-900/60',
    logoBg: 'bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700',
    logoRing: 'ring-rose-400/40 shadow-rose-950/20',
    brandTextGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-300',
    searchBorderHover: 'hover:border-rose-400 dark:hover:border-rose-500 hover:bg-rose-50/40',
    searchIcon: 'text-rose-600 dark:text-rose-400',
    searchKbd: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-slate-900 border-rose-200 dark:border-slate-700',
    navBorder: 'border-rose-100 dark:border-rose-950/40',
    activeBtn: 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-extrabold shadow-md shadow-rose-900/25 ring-2 ring-rose-400/50 border border-rose-400/40',
    activeIcon: 'text-white',
    inactiveIcon: 'text-rose-600 dark:text-pink-400',
    inactiveBtnHover: 'hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50/80 dark:hover:bg-rose-950/40 hover:border-rose-400/80',
    badgeYearActive: 'bg-rose-400 text-slate-950 shadow-xs font-black',
    badgeYearInactive: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
    badgeLiveActive: 'bg-white/25 text-white',
    badgeLiveInactive: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
    badgeAlertActive: 'bg-white text-rose-700 font-black',
    badgeAlertInactive: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
    bookmarkActive: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60',
    bookmarkBadge: 'bg-gradient-to-r from-rose-600 to-pink-600 text-white',
    authLoggedIn: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white',
    authGuest: 'bg-white/90 dark:bg-slate-800 text-rose-700 dark:text-rose-300 border border-rose-400/60 hover:bg-rose-50 dark:hover:bg-slate-750',
    mobileMenuBtn: 'text-rose-700 dark:text-rose-300 bg-rose-50/80 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-slate-700',
    mobileBottomActive: 'text-rose-600 dark:text-rose-400',
  },
};

const getNavPalette = (style: string): NavThemePalette => {
  return NAV_THEME_PALETTES[style] || NAV_THEME_PALETTES.emerald;
};

export const Navbar: React.FC = () => {
  const { 
    tab, 
    setTab, 
    darkMode, 
    toggleDarkMode, 
    themeStyle,
    setThemeStyle,
    setSearchOpen, 
    setAuthModalOpen,
    user,
    isSyncing,
    userProfile,
    updatePersona,
    setSelectedCategorySlug,
    selectedExamId,
    setSelectedExamId,
    setSelectedPastPaperId,
    launchSimulator,
    pendingSimulatorLaunch
  } = useApp();

  const palette = getNavPalette(themeStyle);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highlightsOpen, setHighlightsOpen] = useState(false);

  const openTeachingLicense = () => {
    launchSimulator({
      simulatorId: 'sts',
      title: 'STS IBA Teaching License Test (STEDA)',
      category: 'STS IBA Teaching License Test',
      durationMinutes: 120,
      questionCount: 100,
      negativeMarking: false,
    });
    setMobileMenuOpen(false);
    setHighlightsOpen(false);
  };

  const navItems: NavItemConfig[] = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: <Home className="w-4 h-4 shrink-0" />,
      desc: 'Dashboard overview, daily question & study tools'
    },
    { 
      id: 'mcqs', 
      label: 'MCQs', 
      icon: <BookOpen className="w-4 h-4 shrink-0" />,
      desc: 'Generated STS practice items plus curated sourced questions'
    },
    { 
      id: 'quiz', 
      label: 'Quiz', 
      badge: 'LIVE', 
      badgeType: 'live',
      icon: <Trophy className="w-4 h-4 shrink-0" />,
      desc: 'Timed practice quizzes, negative marking and personal results'
    },
    { 
      id: 'past-papers', 
      label: 'Past Papers', 
      icon: <FileText className="w-4 h-4 shrink-0" />,
      desc: 'Clearly labelled official records, samples and practice sets'
    },
    { 
      id: 'current-affairs', 
      label: 'Current Affairs', 
      badge: '2026', 
      badgeType: 'year',
      icon: <Globe2 className="w-4 h-4 shrink-0" />,
      desc: 'Monthly national & international roundups with quizzes'
    },
    { 
      id: 'exams', 
      label: 'Exams', 
      icon: <GraduationCap className="w-4 h-4 shrink-0" />,
      desc: 'CSS, PMS, SPSC CCE, FPSC syllabus, patterns & eligibility'
    },
    { 
      id: 'jobs', 
      label: 'Jobs', 
      badge: 'ALERTS', 
      badgeType: 'alert',
      icon: <Briefcase className="w-4 h-4 shrink-0" />,
      desc: 'Latest federal & provincial competitive job advertisements'
    },
    { 
      id: 'resume', 
      label: 'Create Resume', 
      badge: 'PRO', 
      badgeType: 'live',
      icon: <FileCheck2 className="w-4 h-4 shrink-0" />,
      desc: 'Build official STS screening and ATS-ready CV for Govt & Private jobs'
    },
    { 
      id: 'study-notes', 
      label: 'Study Notes', 
      icon: <BookMarked className="w-4 h-4 shrink-0" />,
      desc: 'High-yield revision summaries, timelines & formulas'
    },
    { 
      id: 'rankings', 
      label: 'Rankings', 
      icon: <Award className="w-4 h-4 shrink-0" />,
      desc: 'Your saved practice attempts and personal progress'
    },
    { 
      id: 'learning-lab',
      label: 'AI Learning',
      badge: 'NEW',
      badgeType: 'live',
      icon: <BrainCircuit className="w-4 h-4 shrink-0" />,
      desc: 'Adaptive SRS, tutor, cognitive insights, battles & study circles'
    },
    { 
      id: 'ai-chat',
      label: 'Gemini AI',
      badge: 'GEMINI',
      badgeType: 'live',
      icon: <Bot className="w-4 h-4 shrink-0 text-purple-400" />,
      desc: 'Multi-turn Gemini chatbot with custom roles, complex reasoning & fast drills'
    },
    {
      id: 'about', 
      label: 'About', 
      icon: <Info className="w-4 h-4 shrink-0" />,
      desc: 'Platform mission, creator Mehtab Ali & methodology'
    },
  ];

  const handleNavClick = (navId: NavigationTab) => {
    if (navId === 'mcqs') {
      setSelectedCategorySlug(null);
    }
    if (navId === 'exams') {
      setSelectedExamId(null);
    }
    setTab(navId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openExamHub = (examId: 'sts' | 'fpsc' | 'spsc-cce') => {
    setSelectedExamId(examId);
    setTab('exams');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openKids = () => {
    updatePersona('kids');
    setTab('home');
    setMobileMenuOpen(false);
    window.setTimeout(() => document.getElementById('kids-hub')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 70);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full max-w-full overflow-x-clip border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors shadow-xs">
        
        {/* Top Micro-Bar: Announcements & Exam Target (Responsive & safely constrained) */}
        <div className={`${palette.microBarBg} ${palette.microBarText} text-xs py-1.5 px-3 sm:px-4 hidden sm:block border-b ${palette.microBarBorder} w-full max-w-full overflow-hidden transition-colors`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-hidden">
            <div className="flex items-center gap-2 truncate min-w-0">
              <span className={`inline-flex items-center gap-1 font-semibold ${palette.microBarTargetText} shrink-0`}>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Targeting:
              </span>
              <button 
                onClick={() => setAuthModalOpen(true)} 
                className="text-white hover:underline underline-offset-2 font-medium cursor-pointer truncate"
              >
                {userProfile.targetExam || 'Set Target Exam'}
              </button>
              <span className="text-white/40 mx-1 hidden md:inline">•</span>
              <span className="text-white/80 hidden md:inline truncate">
                5,000 generated STS practice items with transparent provenance
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Highlight Ticker Link */}
              <button
                onClick={openTeachingLicense}
                className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/25 via-rose-500/25 to-purple-500/25 border border-amber-400/40 text-amber-200 hover:text-white hover:border-amber-300 transition text-[11px] font-extrabold cursor-pointer"
                title="Launch STS Teaching License Test Simulator"
              >
                <Flame className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
                <span>Highlights: STS Teaching License Test (STEDA)</span>
                <span className="px-1 py-0.2 rounded bg-rose-500 text-[9px] text-white font-black">HOT</span>
              </button>

              {/* Technical Details PDF Button */}
              <a
                href="/technical-details-muqabil.pdf"
                download="MUQABIL_Technical_Specification_Document.pdf"
                className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-400/40 text-emerald-200 hover:text-white transition text-[11px] font-bold cursor-pointer"
                title="Download Official Technical Architecture & System Specification PDF"
              >
                <FileText className="w-3 h-3 text-emerald-300" />
                <span>Technical Details (PDF)</span>
              </a>

              <div className="flex items-center gap-1.5 text-amber-200">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Streak: <strong className="text-white">{userProfile.streakDays}d</strong></span>
              </div>
              <span className="text-white/30">|</span>
              <div className="text-white/90">
                Score: <strong className="text-white">{userProfile.points} pts</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Row 1: Brand Logo, Global Search & Quick Actions */}
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 w-full max-w-full">
          <div className="flex items-center justify-between h-15 sm:h-16 gap-1.5 sm:gap-4 w-full">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
              <button
                id="brand-logo-btn"
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer focus:outline-hidden"
              >
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${palette.logoBg} flex items-center justify-center text-white ${palette.logoRing} group-hover:scale-105 transition-transform shrink-0`}>
                  <BookOpenCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 dark:text-white font-display block whitespace-nowrap">
                    MUQABIL <span className={palette.brandTextGradient}>مقابل</span>
                  </span>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 tracking-wider font-semibold hidden md:block whitespace-nowrap">
                    muqabil.pk • Har Test Mein Sab Se Agay
                  </p>
                </div>
              </button>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-sm xl:max-w-md mx-3">
              <button
                id="desktop-search-trigger"
                onClick={() => setSearchOpen(true)}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-500 dark:text-slate-400 bg-white/90 dark:bg-slate-800/80 ${palette.searchBorderHover} border border-slate-200 dark:border-slate-700 rounded-xl transition cursor-pointer shadow-2xs`}
              >
                <span className="flex items-center gap-2 truncate">
                  <Search className={`w-4 h-4 ${palette.searchIcon} shrink-0`} />
                  <span className="truncate">Search MCQs, exams, topics...</span>
                </span>
                <kbd className={`hidden sm:inline-block px-1.5 py-0.5 text-[11px] font-semibold ${palette.searchKbd} rounded-sm shadow-2xs shrink-0`}>
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Right Action Icons (Optimized for zero overflow on mobile screens) */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              
              {/* Highlights Menu Popover Button on the Right Side */}
              <div className="relative">
                <button
                  id="nav-highlights-btn"
                  onClick={() => setHighlightsOpen((prev) => !prev)}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-amber-300 dark:border-amber-600/80 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 dark:from-amber-950/80 dark:via-orange-950/50 dark:to-amber-950/80 px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-black text-amber-900 dark:text-amber-200 hover:scale-105 transition-all shadow-xs cursor-pointer"
                  title="Hot Highlights & Exam Alerts"
                  aria-expanded={highlightsOpen}
                >
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                  <span className="hidden md:inline">Highlights</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-[9px] text-white font-extrabold tracking-wide uppercase">Hot</span>
                </button>

                {/* Highlights Dropdown Popover */}
                {highlightsOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setHighlightsOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-400 dark:border-amber-500/50 shadow-2xl shadow-slate-950/50 z-50 p-4 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 text-left">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
                            <Flame className="w-4 h-4 fill-amber-500" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white font-display">Hot Highlights & Updates</h4>
                            <p className="text-[10px] text-slate-500">STS, STEDA, FPSC & SPSC 2026</p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-[10px] font-extrabold uppercase">
                          Live Alerts
                        </span>
                      </div>

                      <div className="mt-3 space-y-2.5 max-h-[70vh] overflow-y-auto pr-1">
                        {/* 1. Teaching License Test */}
                        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-amber-300 dark:border-amber-600/40">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="px-1.5 py-0.5 rounded-md bg-rose-500 text-white text-[9px] font-black uppercase">
                              🔥 Spotlight
                            </span>
                            <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold">BPS-16/17</span>
                          </div>
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                            STS IBA Teaching License Test (STEDA)
                          </h5>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                            Official 50–50 STEDA Pattern: 50 Content (DCAR) + 50 Pedagogy (B.Ed).
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            <button
                              onClick={() => {
                                setHighlightsOpen(false);
                                openTeachingLicense();
                              }}
                              className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold transition shadow-xs cursor-pointer"
                            >
                              ⚡ Start 100-Mark Mock
                            </button>
                            <button
                              onClick={() => {
                                setHighlightsOpen(false);
                                setSelectedPastPaperId('sts-teaching-license-paper-1');
                                setTab('past-papers');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold hover:bg-slate-50 transition cursor-pointer"
                            >
                              Solved Paper 1
                            </button>
                            <button
                              onClick={() => {
                                setHighlightsOpen(false);
                                setSelectedPastPaperId('sts-teaching-license-paper-2');
                                setTab('past-papers');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold hover:bg-slate-50 transition cursor-pointer"
                            >
                              Solved Paper 2
                            </button>
                          </div>
                        </div>

                        {/* 2. STS BPS 5 to 15 */}
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">STS BPS 5–15 Screening</span>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">40-20-40 Blueprint</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                            Graduation, Intermediate & Matric categories with answer keys & typing mock.
                          </p>
                          <button
                            onClick={() => {
                              setHighlightsOpen(false);
                              openExamHub('sts');
                            }}
                            className="mt-2 w-full py-1 text-center rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold transition cursor-pointer"
                          >
                            Open STS IBA Room
                          </button>
                        </div>

                        {/* 3. FPSC General Recruitment */}
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">FPSC One-Paper 2026</span>
                            <span className="text-[10px] text-violet-600 dark:text-violet-400 font-bold">FIA · Customs · SST</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                            20 English + 80 Professional ability tests with negative marking.
                          </p>
                          <button
                            onClick={() => {
                              setHighlightsOpen(false);
                              openExamHub('fpsc');
                            }}
                            className="mt-2 w-full py-1 text-center rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-bold transition cursor-pointer"
                          >
                            Open FPSC Room
                          </button>
                        </div>

                        {/* 4. Current Affairs 2026 */}
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Current Affairs 2026</span>
                            <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold">Updated Daily</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                            Constitutional amendments, Pakistan economy, SCO & international events.
                          </p>
                          <button
                            onClick={() => {
                              setHighlightsOpen(false);
                              setTab('current-affairs');
                            }}
                            className="mt-2 w-full py-1 text-center rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[10px] font-bold transition cursor-pointer"
                          >
                            View 2026 Digest
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button onClick={openKids} aria-label="Open Kids learning, art and games" className="shrink-0 inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-100 px-2 sm:px-3 py-2 text-xs font-extrabold text-sky-900 hover:bg-sky-200"><span aria-hidden="true">🫧</span><span className="hidden sm:inline">Kids</span></button>
              
              {/* Search Icon Trigger on mobile/tablet */}
              <button
                id="mobile-search-btn"
                onClick={() => setSearchOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Search MCQs"
                aria-label="Search"
              >
                <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-700 dark:text-slate-200" />
              </button>

              {/* Saved Bookmarks Shortcut */}
              <button
                id="nav-bookmarks-btn"
                onClick={() => setTab('bookmarks')}
                className={`p-2 rounded-lg transition relative cursor-pointer ${
                  tab === 'bookmarks'
                    ? palette.bookmarkActive
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Saved Bookmarks"
                aria-label="Bookmarks"
              >
                <Bookmark className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                {userProfile.bookmarks.length > 0 && (
                  <span className={`absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full ${palette.bookmarkBadge} text-[10px] font-bold text-white shadow-xs`}>
                    {userProfile.bookmarks.length}
                  </span>
                )}
              </button>

              {/* Layout Switcher Trigger (Standard, Executive Sidebar, Split, Zen) */}
              <LayoutButton variant="navbar" />

              {/* Theme Palette Switcher */}
              <ThemeSwitcherWidget />

              {/* Dark / Light Toggle */}
              <button
                id="theme-toggle-btn"
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Theme"
              >
                {darkMode ? (
                  <Sun className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-amber-400" />
                ) : (
                  <Moon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-700" />
                )}
              </button>

              {/* User Account / Profile */}
              <button
                id="auth-profile-btn"
                onClick={() => setAuthModalOpen(true)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:pl-2.5 sm:pr-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition cursor-pointer shadow-2xs ${
                  user ? palette.authLoggedIn : palette.authGuest
                }`}
                title={user ? `Signed in as ${user.email || user.displayName}` : 'Guest Mode - Click to Sign In'}
              >
                {user ? (
                  user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-4.5 h-4.5 rounded-full object-cover border border-white/50" />
                  ) : (
                    <span className="w-4.5 h-4.5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] font-bold">
                      {userProfile.name.charAt(0).toUpperCase() || 'A'}
                    </span>
                  )
                ) : (
                  <User className={`w-4 h-4 ${palette.searchIcon} shrink-0`} />
                )}

                <span className="hidden sm:inline-block max-w-[85px] truncate font-bold">
                  {user ? userProfile.name : 'Sign In'}
                </span>

                {user && (
                  <span className="hidden sm:flex h-2 w-2 relative">
                    {isSyncing && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    )}
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                  </span>
                )}
              </button>

              {/* Mobile Menu Drawer Toggle Button */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className={`p-2 rounded-lg ${palette.mobileMenuBtn} transition cursor-pointer ml-0.5`}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-rose-500" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Row 2: Official Navigation Header Buttons Bar (Desktop & Mobile Swipe Strip) */}
        <nav 
          id="official-headers-navigation" 
          aria-label="Official Portal Navigation"
          className={`w-full border-t ${palette.navBorder} bg-white/90 dark:bg-slate-900/90 backdrop-blur-md py-2 px-2.5 sm:px-6 lg:px-8 shadow-xs overflow-hidden`}
        >
          <div className="max-w-7xl mx-auto w-full">
            {/* Scrollable container with no scrollbars; smooth horizontal touch pan without spilling to body */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5 w-full max-w-full touch-pan-x justify-start">
              {/* Main exam rooms stay first and visible; each tab opens its complete linked hub. */}
              {[
                { id: 'sts' as const, label: 'STS IBA', tone: 'from-emerald-600 to-teal-600', dot: 'bg-emerald-500', isHot: false },
                { id: 'teaching-license' as const, label: 'Teaching License', tone: 'from-amber-600 via-rose-600 to-purple-600', dot: 'bg-amber-400', isHot: true, badgeText: 'HOT' },
                { id: 'spsc-cce' as const, label: 'SPSC', tone: 'from-sky-600 to-cyan-600', dot: 'bg-sky-500', isHot: false },
                { id: 'fpsc' as const, label: 'FPSC', tone: 'from-violet-600 to-indigo-600', dot: 'bg-violet-500', isHot: false },
              ].map((exam) => {
                const isSelected = exam.id === 'teaching-license'
                  ? (tab === 'quiz' && pendingSimulatorLaunch?.category === 'STS IBA Teaching License Test')
                  : (tab === 'exams' && selectedExamId === exam.id);
                return (
                  <button
                    key={exam.id}
                    id={`main-exam-tab-${exam.id}`}
                    onClick={() => {
                      if (exam.id === 'teaching-license') {
                        openTeachingLicense();
                      } else {
                        openExamHub(exam.id as 'sts' | 'spsc-cce' | 'fpsc');
                      }
                    }}
                    aria-label={`Open ${exam.label} complete preparation room`}
                    aria-current={isSelected ? 'page' : undefined}
                    className={`group relative inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm font-extrabold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                      isSelected
                        ? `border-transparent bg-gradient-to-r ${exam.tone} text-white ring-2 ring-white/70`
                        : exam.isHot
                        ? 'border-amber-300 dark:border-amber-600/60 bg-gradient-to-r from-amber-50 via-rose-50 to-purple-50 dark:from-amber-950/40 dark:via-rose-950/30 dark:to-purple-950/30 text-amber-950 dark:text-amber-200 hover:border-amber-400'
                        : 'border-slate-200 bg-white text-slate-900 hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${isSelected ? 'bg-white' : exam.dot} ${exam.isHot ? 'animate-pulse' : ''}`} />
                    {exam.label}
                    {exam.badgeText ? (
                      <span className="rounded-full px-1.5 py-0.2 text-[9px] font-black tracking-wider bg-rose-500 text-white">
                        {exam.badgeText}
                      </span>
                    ) : (
                      <span className={`hidden xl:inline rounded-full px-1.5 py-0.5 text-[9px] font-black tracking-wider ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'}`}>
                        MAIN
                      </span>
                    )}
                    <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </button>
                );
              })}

              <span className="mx-0.5 h-7 w-px shrink-0 bg-slate-200 dark:bg-slate-700" aria-hidden="true" />

              {navItems.map((item) => {
                const isActive = tab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`official-header-btn-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`group relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 lg:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 shrink-0 cursor-pointer select-none whitespace-nowrap ${
                      isActive
                        ? palette.activeBtn
                        : `bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 ${palette.inactiveBtnHover} border border-slate-200/90 dark:border-slate-700 shadow-2xs hover:shadow-xs`
                    }`}
                  >
                    {/* Official Icon */}
                    <span className={`transition-colors ${
                      isActive 
                        ? palette.activeIcon 
                        : `${palette.inactiveIcon} group-hover:scale-110`
                    }`}>
                      {item.icon}
                    </span>

                    {/* Bold Official Label */}
                    <span className={`font-bold font-display tracking-tight sm:tracking-normal ${
                      isActive ? 'text-white font-extrabold' : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {item.label}
                    </span>

                    {/* Official Live / Year / Alert Badges */}
                    {item.badge && (
                      <span className={`text-[10px] font-black uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1 transition-all ${
                        item.badgeType === 'live'
                          ? isActive ? palette.badgeLiveActive : palette.badgeLiveInactive
                          : item.badgeType === 'year'
                          ? isActive ? palette.badgeYearActive : palette.badgeYearInactive
                          : isActive ? palette.badgeAlertActive : palette.badgeAlertInactive
                      }`}>
                        {item.badgeType === 'live' && (
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-rose-500 animate-ping'} inline-block`} />
                        )}
                        {item.badge}
                      </span>
                    )}

                    {/* Active Bottom Glow Accent */}
                    {isActive && (
                      <span className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-white/70 rounded-full" />
                    )}
                  </button>
                );
              })}

            </div>
          </div>
        </nav>

        {/* Mobile View Navigation Drawer / Modal (Opens when Hamburger is clicked) */}
        {mobileMenuOpen && (
          <div 
            id="mobile-navigation-drawer"
            className="fixed inset-x-0 top-full max-h-[85vh] overflow-y-auto bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-in fade-in slide-in-from-top-3 duration-200 w-full max-w-full"
          >
            <div className="max-w-xl mx-auto p-4 space-y-4">
              
              {/* Drawer Header with Title and Close Button */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                    <BookOpenCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white font-display">
                      Official Portal Navigation
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      All sections with instant one-tap access
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Quick Search Input */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSearchOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-left"
                >
                  <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">Search practice items, exams and paper records...</span>
                </button>

                {/* Mobile Layout Switcher Bar */}
                <LayoutButton variant="sidebar" />
              </div>

              {/* Mobile main exam rooms */}
              <div className="grid grid-cols-3 gap-2" aria-label="Main exam preparation rooms">
                {[
                  { id: 'sts' as const, label: 'STS IBA', tone: 'from-emerald-600 to-teal-600' },
                  { id: 'spsc-cce' as const, label: 'SPSC', tone: 'from-sky-600 to-cyan-600' },
                  { id: 'fpsc' as const, label: 'FPSC', tone: 'from-violet-600 to-indigo-600' },
                ].map((exam) => {
                  const isSelected = tab === 'exams' && selectedExamId === exam.id;
                  return (
                    <button
                      key={exam.id}
                      onClick={() => openExamHub(exam.id)}
                      aria-current={isSelected ? 'page' : undefined}
                      className={`rounded-xl border px-2 py-3 text-xs font-extrabold shadow-sm transition ${
                        isSelected
                          ? `border-transparent bg-gradient-to-r ${exam.tone} text-white`
                          : 'border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {exam.label}
                    </button>
                  );
                })}
              </div>

              {/* Official Mobile Headers as Bold Buttons with Space & Official Theme */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                  Examination Headers & Sections
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {navItems.map((item) => {
                    const isActive = tab === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`mobile-drawer-btn-${item.id}`}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold border-emerald-500 shadow-md shadow-emerald-900/20 ring-1 ring-emerald-400/50'
                            : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`p-2 rounded-lg shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                          }`}>
                            {item.icon}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-sm tracking-tight truncate font-display">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-full ${
                                  isActive
                                    ? 'bg-white text-emerald-800'
                                    : item.badgeType === 'live'
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/80 dark:text-emerald-300'
                                    : item.badgeType === 'year'
                                    ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/80 dark:text-teal-300'
                                    : 'bg-rose-100 text-rose-700 dark:bg-rose-900/80 dark:text-rose-300'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className={`text-[11px] truncate mt-0.5 ${
                              isActive ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'
                            }`}>
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        {isActive ? (
                          <Check className="w-4 h-4 text-white shrink-0 ml-2" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Quick Extras: Mistakes, Bookmarks, Theme */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 px-1">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Goal: <strong className="text-slate-800 dark:text-slate-200">{userProfile.targetExam || 'General'}</strong></span>
                  </div>
                  <button
                    onClick={() => {
                      setTab('mistakes');
                      setMobileMenuOpen(false);
                    }}
                    className="text-rose-600 dark:text-rose-400 font-bold hover:underline cursor-pointer"
                  >
                    Mistake Bank ({userProfile.mistakeIds.length})
                  </button>
                </div>

                {/* Theme Switcher Options in Mobile Menu */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Palette className={`w-3.5 h-3.5 ${palette.searchIcon}`} />
                      Visual Theme:
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold capitalize">
                      {themeStyle} Mode
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {THEME_OPTIONS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setThemeStyle(item.id)}
                        className={`flex items-center gap-2 p-2 rounded-lg text-xs font-semibold border text-left transition cursor-pointer ${
                          themeStyle === item.id
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold shadow-2xs'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span 
                          className="w-3 h-3 rounded-full shrink-0" 
                          style={{ background: item.primaryColor }}
                        />
                        <span className="truncate">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </header>

      {/* Mobile Sticky Bottom Navigation Bar (Ultra-Convenient One-Thumb Navigation) */}
      <div 
        id="mobile-bottom-navigation-bar" 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl py-1.5 px-3 flex items-center justify-around w-full max-w-full overflow-hidden"
      >
        <button
          id="mobile-bottom-home"
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg text-xs font-bold transition cursor-pointer ${
            tab === 'home'
              ? palette.mobileBottomActive
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button
          id="mobile-bottom-mcqs"
          onClick={() => handleNavClick('mcqs')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg text-xs font-bold transition cursor-pointer ${
            tab === 'mcqs'
              ? palette.mobileBottomActive
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-bold">MCQs</span>
        </button>

        <button
          id="mobile-bottom-quiz"
          onClick={() => handleNavClick('quiz')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg text-xs font-bold transition cursor-pointer relative ${
            tab === 'quiz'
              ? palette.mobileBottomActive
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="absolute -top-1 -right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <span className="text-[10px] font-bold">Quiz</span>
        </button>

        <button
          id="mobile-bottom-papers"
          onClick={() => handleNavClick('past-papers')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg text-xs font-bold transition cursor-pointer ${
            tab === 'past-papers'
              ? palette.mobileBottomActive
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px] font-bold">Papers</span>
        </button>

        <button
          id="mobile-bottom-menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg text-xs font-bold transition cursor-pointer ${
            mobileMenuOpen
              ? palette.mobileBottomActive
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-bold">All Menu</span>
        </button>
      </div>
    </>
  );
};
