import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { NavigationTab, UserProfile, QuizAttempt, ThemeStyle, UserPersona, QuizCertificate } from '../types';
import { SimulatorLaunch } from '../data/examSimulatorData';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile as updateFirebaseProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User 
} from '../lib/firebase';
import { 
  getUserProfileFromDb, 
  saveUserProfileToDb, 
  recordQuizAttemptInDb, 
  mergeGuestProfileIntoDb 
} from '../lib/firestoreService';
import { validateQuizAttempt } from '../lib/validation';
import { generateCertificateFromAttempt } from '../lib/certificateService';

interface AppContextType {
  tab: NavigationTab;
  setTab: (tab: NavigationTab) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
  toggleDarkMode: () => void;
  themeStyle: ThemeStyle;
  setThemeStyle: (style: ThemeStyle) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  domainModalOpen: boolean;
  setDomainModalOpen: (open: boolean) => void;
  contactModalOpen: boolean;
  setContactModalOpen: (open: boolean) => void;
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (slug: string | null) => void;
  selectedExamId: string | null;
  setSelectedExamId: (examId: string | null) => void;
  selectedPastPaperId: string | null;
  setSelectedPastPaperId: (id: string | null) => void;
  selectedStsTier: 'all' | 'matric' | 'intermediate' | 'graduation';
  setSelectedStsTier: (tier: 'all' | 'matric' | 'intermediate' | 'graduation') => void;
  ageCalculatorOpen: boolean;
  setAgeCalculatorOpen: (open: boolean) => void;
  printablePaper: any | null;
  setPrintablePaper: (paper: any | null) => void;
  openPrintablePaper: (paper: any) => void;
  
  // Real Firebase Auth state & methods
  user: User | null;
  authLoading: boolean;
  isSyncing: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signupWithEmail: (
    email: string, 
    pass: string, 
    name: string, 
    targetExam: string, 
    province: string,
    persona?: UserPersona,
    gradeOrClass?: string
  ) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;

  // Database-backed user profile & operations
  userProfile: UserProfile;
  toggleBookmark: (mcqId: string) => void;
  isBookmarked: (mcqId: string) => boolean;
  addMistake: (mcqId: string) => void;
  removeMistake: (mcqId: string) => void;
  clearAllMistakes: () => void;
  recordQuizAttempt: (attempt: QuizAttempt) => Promise<{ success: boolean; error?: string; certificate?: QuizCertificate }>;
  updateTargetExam: (exam: string) => void;
  updateUserName: (name: string) => void;
  updateProvince: (province: string) => void;
  updatePersona: (persona: UserPersona, gradeOrClass?: string) => void;
  addLearningPoints: (points: number) => void;

  // Certificate Modal State & Actions
  activeCertificate: QuizCertificate | null;
  isCertificateModalOpen: boolean;
  openCertificateModal: (cert: QuizCertificate) => void;
  closeCertificateModal: () => void;
  updateCertificateCandidateName: (newName: string) => void;

  // Simulator Launch State & Actions
  pendingSimulatorLaunch: SimulatorLaunch | null;
  setPendingSimulatorLaunch: (launch: SimulatorLaunch | null) => void;
  launchSimulator: (launch: SimulatorLaunch) => void;
}

const INITIAL_CERTIFICATE: QuizCertificate = {
  id: 'MEQSA-PRACTICE-2026-INIT01',
  quizId: 'quiz-init-1',
  candidateName: 'Aspirant',
  quizTitle: 'Pakistan Studies & Current Affairs Booster',
  category: 'Pakistan Affairs',
  score: 8,
  totalQuestions: 10,
  percentage: 80,
  grade: 'A',
  rankTier: 'Silver Merit',
  rankPosition: 0,
  percentile: 85,
  timeSpentSeconds: 340,
  issuedDate: '11 Sep 2026',
  verificationCode: 'MEQSA-PRACTICE-2026-INIT01',
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'Aspirant',
  email: '',
  targetExam: 'Jobs: STS',
  province: 'Sindh',
  persona: 'jobs',
  gradeOrClass: 'Graduate Category (BPS 5-15)',
  points: 450,
  streakDays: 4,
  bookmarks: ['ps-01', 'ca-02', 'es-01', 'eng-01'],
  mistakeIds: ['ca-05', 'math-02'],
  quizHistory: [
    {
      id: 'quiz-init-1',
      date: 'Yesterday',
      title: 'Pakistan Studies & Current Affairs Booster',
      totalQuestions: 10,
      score: 8,
      timeSpentSeconds: 340,
      incorrectQuestions: [],
      certificate: INITIAL_CERTIFICATE,
      certificateId: INITIAL_CERTIFICATE.id,
      rankTier: INITIAL_CERTIFICATE.rankTier,
      rankPosition: INITIAL_CERTIFICATE.rankPosition,
      percentile: INITIAL_CERTIFICATE.percentile,
    },
  ],
  certificates: [INITIAL_CERTIFICATE],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tab, setTab] = useState<NavigationTab>('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [domainModalOpen, setDomainModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [selectedPastPaperId, setSelectedPastPaperId] = useState<string | null>(null);

  // STS Tier Selection (persisted in localStorage)
  const [selectedStsTier, setSelectedStsTierState] = useState<'all' | 'matric' | 'intermediate' | 'graduation'>(() => {
    const saved = localStorage.getItem('muqabil_sts_tier');
    if (saved && ['all', 'matric', 'intermediate', 'graduation'].includes(saved)) {
      return saved as 'all' | 'matric' | 'intermediate' | 'graduation';
    }
    return 'all';
  });

  const setSelectedStsTier = useCallback((tier: 'all' | 'matric' | 'intermediate' | 'graduation') => {
    setSelectedStsTierState(tier);
    localStorage.setItem('muqabil_sts_tier', tier);
  }, []);

  // Age Calculator Modal State
  const [ageCalculatorOpen, setAgeCalculatorOpen] = useState(false);

  // Printable Past Paper State
  const [printablePaper, setPrintablePaper] = useState<any | null>(null);

  const openPrintablePaper = useCallback((paper: any) => {
    setPrintablePaper(paper);
  }, []);

  // Real Firebase Auth states
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Certificate Modal State
  const [activeCertificate, setActiveCertificate] = useState<QuizCertificate | null>(INITIAL_CERTIFICATE);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);

  // Exact Pattern Simulator Launch
  const [pendingSimulatorLaunch, setPendingSimulatorLaunch] = useState<SimulatorLaunch | null>(null);

  const launchSimulator = useCallback((launch: SimulatorLaunch) => {
    setPendingSimulatorLaunch(launch);
    setTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openCertificateModal = useCallback((cert: QuizCertificate) => {
    setActiveCertificate(cert);
    setIsCertificateModalOpen(true);
  }, []);

  const closeCertificateModal = useCallback(() => {
    setIsCertificateModalOpen(false);
  }, []);

  // Dark mode init with localStorage and document class
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('matb_dark_mode') ?? localStorage.getItem('meaq_dark_mode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('matb_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('matb_dark_mode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Theme Style
  const [themeStyle, setThemeStyle] = useState<ThemeStyle>(() => {
    if (localStorage.getItem('matb_theme_version') !== '5') {
      localStorage.setItem('matb_theme_version', '5');
      localStorage.setItem('matb_theme_style', 'emerald');
      return 'emerald';
    }
    const saved = (localStorage.getItem('matb_theme_style') ?? localStorage.getItem('meaq_theme_style')) as ThemeStyle;
    if (saved && ['emerald', 'sapphire', 'sunset', 'rose', 'lavender', 'cyber', 'ocean', 'pastel-network', 'pastel-ribbons'].includes(saved)) {
      return saved;
    }
    return 'emerald';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeStyle);
    localStorage.setItem('matb_theme_style', themeStyle);
  }, [themeStyle]);

  // Guest LocalStorage Profile Cache
  const getGuestProfile = (): UserProfile => {
    const saved = localStorage.getItem('matb_user_profile') ?? localStorage.getItem('meaq_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  };

  const [userProfile, setUserProfile] = useState<UserProfile>(getGuestProfile);

  // Synchronize Auth State with Firestore Database
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setAuthLoading(true);
      if (currentUser) {
        setUser(currentUser);
        setIsSyncing(true);
        try {
          // Merge current local guest profile into real Firestore database
          const localGuest = getGuestProfile();
          const syncedProfile = await mergeGuestProfileIntoDb(currentUser.uid, localGuest, {
            displayName: currentUser.displayName,
            email: currentUser.email,
          });
          setUserProfile(syncedProfile);
          localStorage.setItem('matb_user_profile', JSON.stringify(syncedProfile));
        } catch (err) {
          console.error('Failed to sync user profile with Firestore:', err);
        } finally {
          setIsSyncing(false);
        }
      } else {
        setUser(null);
        // Fallback to local guest profile
        const localGuest = getGuestProfile();
        setUserProfile(localGuest);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync state changes to backend (Firestore) if logged in, or localStorage if guest
  const syncProfileChange = useCallback((updated: UserProfile) => {
    setUserProfile(updated);
    localStorage.setItem('matb_user_profile', JSON.stringify(updated));

    if (auth.currentUser) {
      saveUserProfileToDb(auth.currentUser.uid, updated).catch((err) => {
        console.error('Failed to persist profile update to Firestore:', err);
      });
    }
  }, []);

  // Real Auth Actions
  const authErrorMessage = (err: any, fallback: string) => {
    if (err?.code === 'auth/operation-not-allowed') {
      return 'This sign-in method is not enabled yet. The project owner must enable it in Firebase Console → Authentication → Sign-in method.';
    }
    if (err?.code === 'auth/unauthorized-domain') {
      return 'This website domain is not authorized in Firebase. Add the current Vercel domain under Authentication → Settings → Authorized domains.';
    }
    if (err?.code === 'auth/configuration-not-found') {
      return 'Firebase Authentication has not been configured for this project. Open Firebase Console → Authentication and complete setup.';
    }
    if (err?.code === 'auth/network-request-failed') return 'Could not reach Firebase. Check your internet connection and try again.';
    return err?.message || fallback;
  };

  const loginWithEmail = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pass);
      return { success: true };
    } catch (err: any) {
      let message = 'Failed to sign in. Please verify your credentials.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        message = 'Invalid email or password. Please check your credentials.';
      } else if (err.code === 'auth/too-many-requests') {
        message = 'Too many attempts. Please try again in a few minutes.';
      } else message = authErrorMessage(err, message);
      return { success: false, error: message };
    }
  };

  const signupWithEmail = async (
    email: string, 
    pass: string, 
    name: string, 
    targetExam: string, 
    province: string,
    persona?: UserPersona,
    gradeOrClass?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      if (name.trim()) {
        await updateFirebaseProfile(res.user, { displayName: name.trim() });
      }

      const initialProfile: UserProfile = {
        ...userProfile,
        name: name.trim() || 'Aspirant',
        email: email.trim(),
        targetExam: targetExam || userProfile.targetExam,
        province: province || userProfile.province,
        persona: persona || userProfile.persona || 'jobs',
        gradeOrClass: gradeOrClass || userProfile.gradeOrClass || '',
      };

      await saveUserProfileToDb(res.user.uid, initialProfile);
      syncProfileChange(initialProfile);
      return { success: true };
    } catch (err: any) {
      let message = 'Registration failed. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        message = 'An account with this email address already exists. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters long.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else message = authErrorMessage(err, message);
      return { success: false, error: message };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      await signInWithPopup(auth, googleProvider);
      return { success: true };
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        return { success: false, error: 'Sign in popup closed before finishing.' };
      }
      return { success: false, error: authErrorMessage(err, 'Google sign-in could not be completed.') };
    }
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
    setUser(null);
    const guest = getGuestProfile();
    setUserProfile(guest);
  };

  const sendPasswordReset = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return { success: true };
    } catch (err: any) {
      return { success: false, error: authErrorMessage(err, 'Unable to send password reset email.') };
    }
  };

  // User Profile & Practice Actions
  const toggleBookmark = (mcqId: string) => {
    const exists = userProfile.bookmarks.includes(mcqId);
    const updatedBookmarks = exists
      ? userProfile.bookmarks.filter((id) => id !== mcqId)
      : [...userProfile.bookmarks, mcqId];
    
    const updated = { ...userProfile, bookmarks: updatedBookmarks };
    syncProfileChange(updated);
  };

  const isBookmarked = (mcqId: string) => userProfile.bookmarks.includes(mcqId);

  const addMistake = (mcqId: string) => {
    if (userProfile.mistakeIds.includes(mcqId)) return;
    const updated = { ...userProfile, mistakeIds: [...userProfile.mistakeIds, mcqId] };
    syncProfileChange(updated);
  };

  const removeMistake = (mcqId: string) => {
    const updated = {
      ...userProfile,
      mistakeIds: userProfile.mistakeIds.filter((id) => id !== mcqId),
    };
    syncProfileChange(updated);
  };

  const clearAllMistakes = () => {
    const updated = {
      ...userProfile,
      mistakeIds: [],
    };
    syncProfileChange(updated);
  };

  // Backend-Validated Quiz Attempt Recording
  const recordQuizAttempt = async (attempt: QuizAttempt): Promise<{ success: boolean; error?: string; certificate?: QuizCertificate }> => {
    // 1. Strict validation against impossible scores
    const validation = validateQuizAttempt(attempt, attempt.totalQuestions);
    if (!validation.isValid) {
      console.error('Quiz attempt rejected due to invalid score:', validation.error);
      return { success: false, error: validation.error };
    }

    const sanitizedAttempt: QuizAttempt = {
      ...attempt,
      score: validation.sanitizedScore,
    };

    // 2. Generate a transparent practice-completion record
    const cert = attempt.certificate || generateCertificateFromAttempt(
      sanitizedAttempt,
      userProfile.name || 'Aspirant',
      sanitizedAttempt.title
    );

    sanitizedAttempt.certificate = cert;
    sanitizedAttempt.certificateId = cert.id;
    sanitizedAttempt.rankTier = cert.rankTier;
    sanitizedAttempt.rankPosition = cert.rankPosition;
    sanitizedAttempt.percentile = cert.percentile;

    const newMistakes = new Set(userProfile.mistakeIds);
    if (sanitizedAttempt.incorrectQuestions) {
      sanitizedAttempt.incorrectQuestions.forEach((q) => {
        if (q.mcq && q.mcq.id) newMistakes.add(q.mcq.id);
      });
    }

    const existingCerts = userProfile.certificates || [];
    const updatedCerts = [cert, ...existingCerts.filter((c) => c.id !== cert.id)];

    const pointsEarned = Math.round(validation.sanitizedScore * 15);
    const updatedProfile: UserProfile = {
      ...userProfile,
      points: userProfile.points + pointsEarned,
      mistakeIds: Array.from(newMistakes),
      quizHistory: [sanitizedAttempt, ...userProfile.quizHistory.slice(0, 24)],
      certificates: updatedCerts,
    };

    // Update in-memory state & local storage immediately
    syncProfileChange(updatedProfile);
    setActiveCertificate(cert);

    // If authenticated, persist to real Firestore database subcollection with backend validation
    if (auth.currentUser) {
      const dbResult = await recordQuizAttemptInDb(auth.currentUser.uid, sanitizedAttempt);
      if (!dbResult.success) {
        console.warn('Firestore quiz record validation warning:', dbResult.error);
        return { ...dbResult, certificate: cert };
      }
    }

    return { success: true, certificate: cert };
  };

  const updateCertificateCandidateName = (newName: string) => {
    if (!newName.trim()) return;
    const trimmed = newName.trim();
    syncProfileChange({ ...userProfile, name: trimmed });
    if (activeCertificate) {
      setActiveCertificate({ ...activeCertificate, candidateName: trimmed });
    }
  };

  const updateTargetExam = (exam: string) => {
    syncProfileChange({ ...userProfile, targetExam: exam });
  };

  const updateUserName = (name: string) => {
    syncProfileChange({ ...userProfile, name });
    if (activeCertificate) {
      setActiveCertificate({ ...activeCertificate, candidateName: name });
    }
  };

  const updateProvince = (province: string) => {
    syncProfileChange({ ...userProfile, province });
  };

  const updatePersona = (persona: UserPersona, gradeOrClass?: string) => {
    syncProfileChange({ 
      ...userProfile, 
      persona, 
      ...(gradeOrClass ? { gradeOrClass } : {}) 
    });
  };

  const addLearningPoints = (points: number) => {
    if (points <= 0) return;
    syncProfileChange({
      ...userProfile,
      points: (userProfile.points || 0) + points
    });
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        tab,
        setTab,
        darkMode,
        setDarkMode,
        toggleDarkMode,
        themeStyle,
        setThemeStyle,
        searchOpen,
        setSearchOpen,
        globalSearchQuery,
        setGlobalSearchQuery,
        authModalOpen,
        setAuthModalOpen,
        domainModalOpen,
        setDomainModalOpen,
        contactModalOpen,
        setContactModalOpen,
        selectedCategorySlug,
        setSelectedCategorySlug,
        selectedExamId,
        setSelectedExamId,
        selectedPastPaperId,
        setSelectedPastPaperId,
        selectedStsTier,
        setSelectedStsTier,
        ageCalculatorOpen,
        setAgeCalculatorOpen,
        printablePaper,
        setPrintablePaper,
        openPrintablePaper,
        user,
        authLoading,
        isSyncing,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        logout,
        sendPasswordReset,
        userProfile,
        toggleBookmark,
        isBookmarked,
        addMistake,
        removeMistake,
        clearAllMistakes,
        recordQuizAttempt,
        updateTargetExam,
        updateUserName,
        updateProvince,
        updatePersona,
        addLearningPoints,
        activeCertificate,
        isCertificateModalOpen,
        openCertificateModal,
        closeCertificateModal,
        updateCertificateCandidateName,
        pendingSimulatorLaunch,
        setPendingSimulatorLaunch,
        launchSimulator,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
