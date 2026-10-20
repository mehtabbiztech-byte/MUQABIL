import { 
  db, 
  doc, 
  getDoc, 
  setDoc,
  deleteDoc,
  updateDoc, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit 
} from './firebase';
import { UserProfile, QuizAttempt } from '../types';
import { validateQuizAttempt } from './validation';
import { sanitizeStoredStudyPlan, type StudyPlannerCollection, type StoredStudyPlan } from './studyPlanner';

const SAFE_STUDY_PLAN_ID = /^[A-Za-z0-9_-]{1,150}$/;

/** Loads the signed-in user's private planner documents. Firestore rules enforce ownership. */
export async function getStudyPlannerPlansFromDb(userId: string): Promise<StudyPlannerCollection> {
  if (!userId) return { activePlanId: null, plans: [] };
  try {
    const plansCol = collection(db, 'users', userId, 'study_plans');
    const snapshot = await getDocs(plansCol);
    const plans = snapshot.docs.flatMap((document) => {
      const data = document.data();
      if (data.userId !== userId || !SAFE_STUDY_PLAN_ID.test(document.id)) return [];
      const plan = sanitizeStoredStudyPlan(data.plan);
      return plan && plan.id === document.id ? [plan] : [];
    });
    return { activePlanId: null, plans };
  } catch (error) {
    console.error('Error loading private study plans:', error);
    throw error;
  }
}

/** Saves one validated planner record under the authenticated user's private subcollection. */
export async function saveStudyPlannerPlanToDb(userId: string, value: StoredStudyPlan): Promise<boolean> {
  if (!userId || !SAFE_STUDY_PLAN_ID.test(value.id)) return false;
  const plan = sanitizeStoredStudyPlan(value);
  if (!plan || plan.id !== value.id) return false;
  try {
    const serialized = JSON.stringify(plan);
    if (serialized.length > 900_000) return false;
    await setDoc(doc(db, 'users', userId, 'study_plans', plan.id), {
      userId,
      plan,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('Error saving private study plan:', error);
    return false;
  }
}

/** Deletes one plan from the signed-in user's private subcollection. */
export async function deleteStudyPlannerPlanFromDb(userId: string, planId: string): Promise<boolean> {
  if (!userId || !SAFE_STUDY_PLAN_ID.test(planId)) return false;
  try {
    await deleteDoc(doc(db, 'users', userId, 'study_plans', planId));
    return true;
  } catch (error) {
    console.error('Error deleting private study plan:', error);
    return false;
  }
}

/** Loads planner preference document (active plan selection) for multi-device continuity. */
export async function getStudyPlannerActivePlanIdFromDb(userId: string): Promise<string | null> {
  if (!userId) return null;
  try {
    const snap = await getDoc(doc(db, 'users', userId, 'study_planner_meta', 'prefs'));
    if (!snap.exists()) return null;
    const data = snap.data();
    const id = typeof data.activePlanId === 'string' ? data.activePlanId : null;
    return id && SAFE_STUDY_PLAN_ID.test(id) ? id : null;
  } catch (error) {
    console.error('Error loading study planner active plan preference:', error);
    return null;
  }
}

/** Persists which plan is active so other devices restore the same selection. */
export async function saveStudyPlannerActivePlanIdToDb(userId: string, activePlanId: string | null): Promise<boolean> {
  if (!userId) return false;
  if (activePlanId !== null && !SAFE_STUDY_PLAN_ID.test(activePlanId)) return false;
  try {
    await setDoc(doc(db, 'users', userId, 'study_planner_meta', 'prefs'), {
      userId,
      activePlanId,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('Error saving study planner active plan preference:', error);
    return false;
  }
}

/**
 * Fetches user profile from Firestore.
 */
export async function getUserProfileFromDb(userId: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      return null;
    }
    const data = snap.data();
    
    // Also fetch quiz history subcollection
    const history = await getUserQuizHistoryFromDb(userId);

    return {
      name: data.name || 'Aspirant',
      email: data.email || '',
      targetExam: data.targetExam || 'STS (Sukkur IBA BPS 5-15)',
      province: data.province || 'Sindh',
      points: Number(data.points) || 0,
      streakDays: Number(data.streakDays) || 1,
      bookmarks: Array.isArray(data.bookmarks) ? data.bookmarks : [],
      mistakeIds: Array.isArray(data.mistakes) ? data.mistakes : (Array.isArray(data.mistakeIds) ? data.mistakeIds : []),
      quizHistory: history,
    };
  } catch (err) {
    console.error('Error fetching user profile from Firestore:', err);
    return null;
  }
}

/**
 * Saves or updates user profile in Firestore.
 */
export async function saveUserProfileToDb(userId: string, profile: Partial<UserProfile>): Promise<boolean> {
  try {
    const userRef = doc(db, 'users', userId);
    const payload: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    if (profile.name !== undefined) payload.name = profile.name.slice(0, 120);
    if (profile.email !== undefined) payload.email = profile.email;
    if (profile.targetExam !== undefined) payload.targetExam = profile.targetExam;
    if (profile.province !== undefined) payload.province = profile.province;
    if (profile.bookmarks !== undefined) payload.bookmarks = profile.bookmarks;
    if (profile.mistakeIds !== undefined) payload.mistakes = profile.mistakeIds;

    await setDoc(userRef, payload, { merge: true });
    return true;
  } catch (err) {
    console.error('Error saving user profile to Firestore:', err);
    return false;
  }
}

/**
 * Saves a validated quiz attempt into the user's quiz_history subcollection.
 * Strict validation ensures impossible scores are rejected both in code and by Firestore security rules.
 */
export async function recordQuizAttemptInDb(
  userId: string, 
  attempt: QuizAttempt
): Promise<{ success: boolean; error?: string }> {
  // 1. Backend-style score validation
  const validation = validateQuizAttempt(attempt, attempt.totalQuestions);
  if (!validation.isValid) {
    const msg = validation.error || 'Impossible score detected. Submission rejected.';
    console.error('Validation failed for quiz attempt:', msg);
    return { success: false, error: msg };
  }

  try {
    const quizDocId = attempt.id || `quiz-${Date.now()}`;
    const quizRef = doc(db, 'users', userId, 'quiz_history', quizDocId);

    const safePercentage = Math.min(
      100, 
      Math.max(0, Math.round((validation.sanitizedScore / attempt.totalQuestions) * 100))
    );

    const quizPayload = {
      id: quizDocId,
      userId,
      quizTitle: attempt.title || 'Exam Quiz Mock',
      category: 'General',
      score: validation.sanitizedScore,
      totalQuestions: attempt.totalQuestions,
      percentage: safePercentage,
      timeSpentSeconds: Math.max(0, attempt.timeSpentSeconds || 0),
      passed: safePercentage >= 50,
      date: attempt.date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      incorrectCount: attempt.incorrectQuestions ? attempt.incorrectQuestions.length : 0,
      certificateId: attempt.certificateId || null,
      rankTier: attempt.rankTier || null,
    };

    // Save attempt in subcollection
    await setDoc(quizRef, quizPayload);

    // Persist only the learner's mistake list. Points and national standings are
    // intentionally not accepted as client-authored authoritative data.
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const existing = userSnap.data();
      const currentMistakes = Array.isArray(existing.mistakes) ? existing.mistakes : [];
      const newMistakes = new Set(currentMistakes);
      if (attempt.incorrectQuestions) {
        attempt.incorrectQuestions.forEach((q) => {
          if (q.mcq && q.mcq.id) newMistakes.add(q.mcq.id);
        });
      }

      await updateDoc(userRef, {
        mistakes: Array.from(newMistakes),
        updatedAt: new Date().toISOString(),
      });
    }

    return { success: true };
  } catch (err) {
    console.error('Error recording quiz attempt in Firestore:', err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Database write error' 
    };
  }
}

/**
 * Fetches recent quiz history from user's subcollection in Firestore.
 */
export async function getUserQuizHistoryFromDb(userId: string): Promise<QuizAttempt[]> {
  try {
    const historyCol = collection(db, 'users', userId, 'quiz_history');
    const q = query(historyCol, orderBy('createdAt', 'desc'), limit(50));
    const snap = await getDocs(q);

    const history: QuizAttempt[] = [];
    snap.forEach((docSnap) => {
      const d = docSnap.data();
      history.push({
        id: docSnap.id,
        date: d.date || new Date(d.createdAt || Date.now()).toLocaleDateString(),
        title: d.quizTitle || 'Quiz Attempt',
        totalQuestions: d.totalQuestions || 10,
        score: d.score || 0,
        timeSpentSeconds: d.timeSpentSeconds || 0,
        incorrectQuestions: [],
        certificateId: d.certificateId || undefined,
        rankTier: d.rankTier || undefined,
      });
    });

    return history;
  } catch (err) {
    console.error('Error fetching quiz history from Firestore:', err);
    return [];
  }
}

/**
 * Merges local guest progress into the user's Firestore database upon login.
 * This guarantees guest practice is not lost when signing in.
 */
export async function mergeGuestProfileIntoDb(
  userId: string,
  guestProfile: UserProfile,
  authUser: { displayName?: string | null; email?: string | null }
): Promise<UserProfile> {
  const existing = await getUserProfileFromDb(userId);

  if (existing) {
    // Merge bookmarks (union)
    const mergedBookmarks = Array.from(
      new Set([...existing.bookmarks, ...(guestProfile.bookmarks || [])])
    );
    // Merge mistakes (union)
    const mergedMistakes = Array.from(
      new Set([...existing.mistakeIds, ...(guestProfile.mistakeIds || [])])
    );
    // Keep targetExam if already set or use guest's
    const targetExam = existing.targetExam || guestProfile.targetExam || 'STS (Sukkur IBA BPS 5-15)';
    const province = existing.province || guestProfile.province || 'Sindh';
    const name = existing.name && existing.name !== 'Aspirant' 
      ? existing.name 
      : (authUser.displayName || guestProfile.name || 'Aspirant');
    const points = Math.max(existing.points || 0, guestProfile.points || 0);
    const streakDays = Math.max(existing.streakDays || 1, guestProfile.streakDays || 1);

    const updatedProfile: UserProfile = {
      name,
      email: authUser.email || existing.email || guestProfile.email || '',
      targetExam,
      province,
      points,
      streakDays,
      bookmarks: mergedBookmarks,
      mistakeIds: mergedMistakes,
      quizHistory: existing.quizHistory.length ? existing.quizHistory : guestProfile.quizHistory,
    };

    // Save merged doc
    await saveUserProfileToDb(userId, updatedProfile);

    // If guest had local quiz history that isn't in DB, sync them up
    if (guestProfile.quizHistory && guestProfile.quizHistory.length) {
      for (const attempt of guestProfile.quizHistory) {
        if (!existing.quizHistory.some((h) => h.id === attempt.id)) {
          await recordQuizAttemptInDb(userId, attempt);
        }
      }
    }

    return updatedProfile;
  } else {
    // First time login - initialize user doc from guest progress + auth details
    const newProfile: UserProfile = {
      name: authUser.displayName || (guestProfile.name !== 'Aspirant' ? guestProfile.name : 'Aspirant'),
      email: authUser.email || '',
      targetExam: guestProfile.targetExam || 'STS (Sukkur IBA BPS 5-15)',
      province: guestProfile.province || 'Sindh',
      points: guestProfile.points || 450,
      streakDays: guestProfile.streakDays || 1,
      bookmarks: guestProfile.bookmarks || [],
      mistakeIds: guestProfile.mistakeIds || [],
      quizHistory: guestProfile.quizHistory || [],
    };

    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      name: newProfile.name,
      email: newProfile.email,
      targetExam: newProfile.targetExam,
      province: newProfile.province,
      bookmarks: newProfile.bookmarks,
      mistakes: newProfile.mistakeIds,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Save initial guest quiz history if any
    if (newProfile.quizHistory.length) {
      for (const attempt of newProfile.quizHistory) {
        await recordQuizAttemptInDb(userId, attempt);
      }
    }

    return newProfile;
  }
}
