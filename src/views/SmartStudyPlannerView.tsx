import React, { useEffect, useMemo, useState } from 'react';
import { PlannerDashboard } from '../components/study-planner/PlannerDashboard';
import { PlannerSetup } from '../components/study-planner/PlannerSetup';
import { useOptionalApp } from '../context/AppContext';
import {
  createAiPlanPrompt,
  createDefaultStudyPlannerForm,
  createStudyPlanRecord,
  generateStudySchedule,
  getStudyPlanTopics,
  getPositionName,
  loadStoredStudyPlans,
  mergeStudyPlannerCollections,
  MAX_STORED_STUDY_PLANS,
  normalizeWeakArea,
  parseStudyPlannerBackup,
  rebalancePlanSchedule,
  saveStoredStudyPlans,
  STUDY_PLANNER_SYNC_KEY,
  toLocalDateString,
  type MockAttempt,
  type StoredStudyPlan,
  type StudyPlannerCollection,
  type StudyPlannerForm,
} from '../lib/studyPlanner';
import { deleteStudyPlannerPlanFromDb, getStudyPlannerPlansFromDb, saveStudyPlannerPlanToDb } from '../lib/firestoreService';

type CloudSyncStatus = 'off' | 'syncing' | 'synced' | 'error';

const readSavedCollection = (): StudyPlannerCollection => {
  if (typeof window === 'undefined') return { activePlanId: null, plans: [] };
  try {
    return loadStoredStudyPlans(window.localStorage);
  } catch {
    return { activePlanId: null, plans: [] };
  }
};

const readSyncPreference = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(STUDY_PLANNER_SYNC_KEY) === 'true';
  } catch {
    return false;
  }
};

const requestAiPlanAdvice = async (form: StudyPlannerForm): Promise<string | null> => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: createAiPlanPrompt(form) }],
      taskType: 'general',
      roleId: 'general-mentor',
      systemInstruction: 'You are MUQABIL’s study planner. Produce a concise, practical coaching overlay for the supplied plan. Use only the supplied syllabus topics, preserve their published section weights, do not invent official weightings, dates, or claim the plan predicts exam results. Include a daily time split, a weekly checkpoint, first-week sequence, weak-area approach, and final-revision tip.',
    }),
  });
  if (!response.ok) throw new Error(`AI request failed (${response.status})`);
  const data = await response.json() as { fallback?: boolean; reply?: unknown };
  if (data.fallback || typeof data.reply !== 'string') return null;
  const advice = data.reply.replace(/<<<[\s\S]*?>>>/g, '').trim().slice(0, 3500);
  return advice || null;
};

export const SmartStudyPlannerView: React.FC = () => {
  const [collection, setCollection] = useState<StudyPlannerCollection>(readSavedCollection);
  const plan = collection.plans.find((item) => item.id === collection.activePlanId) ?? collection.plans[0] ?? null;
  const [isEditing, setIsEditing] = useState(() => !collection.activePlanId);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(() => collection.activePlanId);
  const [draftForm, setDraftForm] = useState<StudyPlannerForm>(() => plan?.form ?? createDefaultStudyPlannerForm());
  const [syncEnabled, setSyncEnabled] = useState(readSyncPreference);
  const [cloudSyncStatus, setCloudSyncStatus] = useState<CloudSyncStatus>(() => readSyncPreference() ? 'syncing' : 'off');
  const [cloudReady, setCloudReady] = useState(false);
  const [localSaveError, setLocalSaveError] = useState(false);
  const [isDeletingPlan, setIsDeletingPlan] = useState(false);
  const appContext = useOptionalApp();
  const user = appContext?.user ?? null;
  const authLoading = appContext?.authLoading ?? false;
  const setAuthModalOpen = appContext?.setAuthModalOpen ?? (() => undefined);
  const userId = user?.uid ?? null;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = saveStoredStudyPlans(window.localStorage, collection);
    setLocalSaveError(!saved);
  }, [collection]);

  useEffect(() => {
    if (authLoading) return;
    if (!userId || !syncEnabled) {
      setCloudReady(false);
      setCloudSyncStatus('off');
      return;
    }

    let cancelled = false;
    setCloudReady(false);
    setCloudSyncStatus('syncing');
    void getStudyPlannerPlansFromDb(userId)
      .then((remote) => {
        if (cancelled) return;
        setCollection((local) => mergeStudyPlannerCollections(local, remote));
        setCloudSyncStatus('synced');
        setCloudReady(true);
      })
      .catch(() => {
        if (cancelled) return;
        setCloudSyncStatus('error');
        // Continue using the local plan if the account database is temporarily unavailable.
        setCloudReady(true);
      });
    return () => { cancelled = true; };
  }, [authLoading, userId, syncEnabled]);

  useEffect(() => {
    if (!userId || !syncEnabled || !cloudReady) return;
    setCloudSyncStatus('syncing');
    const timeout = window.setTimeout(() => {
      if (!collection.plans.length) {
        setCloudSyncStatus('synced');
        return;
      }
      void Promise.all(collection.plans.map((savedPlan) => saveStudyPlannerPlanToDb(userId, savedPlan)))
        .then((results) => setCloudSyncStatus(results.every(Boolean) ? 'synced' : 'error'))
        .catch(() => setCloudSyncStatus('error'));
    }, 700);
    return () => window.clearTimeout(timeout);
  }, [collection, userId, syncEnabled, cloudReady]);

  const schedule = useMemo(() => plan ? generateStudySchedule(plan.form, plan.startDate, {
    topicIds: plan.plannedTopicIds,
    mockAttempts: plan.mockAttempts,
  }) : [], [plan]);

  const beginEdit = () => {
    if (!plan) return;
    setDraftForm({ ...plan.form, subjectSlugs: [...plan.form.subjectSlugs], weakAreas: [...plan.form.weakAreas] });
    setEditingPlanId(plan.id);
    setIsEditing(true);
  };

  const beginNewPlan = () => {
    if (collection.plans.length >= MAX_STORED_STUDY_PLANS) {
      window.alert(`You can keep up to ${MAX_STORED_STUDY_PLANS} plans. Export a backup, then delete an older plan before creating another.`);
      return;
    }
    setDraftForm(createDefaultStudyPlannerForm(toLocalDateString(new Date())));
    setEditingPlanId(null);
    setIsEditing(true);
  };

  const generatePlan = (form: StudyPlannerForm, requestAiPersonalization: boolean) => {
    const now = new Date();
    const normalizedForm: StudyPlannerForm = {
      ...form,
      subjectSlugs: [...new Set(form.subjectSlugs)],
      weakAreas: [...new Set(form.weakAreas.map(normalizeWeakArea).filter((slug): slug is string => Boolean(slug)))],
    };
    const editedPlan = editingPlanId ? collection.plans.find((savedPlan) => savedPlan.id === editingPlanId) : null;
    let nextPlan: StoredStudyPlan;

    if (editedPlan) {
      const validTopicIds = new Set(getStudyPlanTopics(normalizedForm).map((topic) => topic.id));
      nextPlan = {
        ...editedPlan,
        updatedAt: now.toISOString(),
        form: normalizedForm,
        // Keep completion and mock history for topics that still belong to this plan.
        completedTopicIds: (editedPlan.completedTopicIds ?? []).filter((id) => validTopicIds.has(id)),
        completedSubtopicIds: editedPlan.completedSubtopicIds.filter((id) => validTopicIds.has(id)),
        plannedTopicIds: undefined,
        aiPersonalizationRequested: requestAiPersonalization,
        aiPlanStatus: requestAiPersonalization ? 'pending' : undefined,
        aiPlanAdvice: undefined,
      };
    } else {
      if (collection.plans.length >= MAX_STORED_STUDY_PLANS) {
        window.alert(`You can keep up to ${MAX_STORED_STUDY_PLANS} plans. Export a backup before creating another.`);
        return;
      }
      nextPlan = createStudyPlanRecord(normalizedForm, now);
      if (requestAiPersonalization) {
        nextPlan = { ...nextPlan, aiPersonalizationRequested: true, aiPlanStatus: 'pending' };
      }
    }

    setCollection((current) => {
      const existingIndex = current.plans.findIndex((savedPlan) => savedPlan.id === nextPlan.id);
      const plans = existingIndex < 0
        ? [...current.plans, nextPlan]
        : current.plans.map((savedPlan) => savedPlan.id === nextPlan.id ? nextPlan : savedPlan);
      return { activePlanId: nextPlan.id, plans };
    });
    setDraftForm(nextPlan.form);
    setEditingPlanId(nextPlan.id);
    setIsEditing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (requestAiPersonalization) {
      const saveAdvice = (status: 'ready' | 'offline', advice?: string) => {
        setCollection((current) => ({
          ...current,
          plans: current.plans.map((savedPlan) => savedPlan.id === nextPlan.id
            ? { ...savedPlan, updatedAt: new Date().toISOString(), aiPlanStatus: status, ...(advice ? { aiPlanAdvice: advice } : {}) }
            : savedPlan),
        }));
      };
      void requestAiPlanAdvice(normalizedForm)
        .then((advice) => saveAdvice(advice ? 'ready' : 'offline', advice ?? undefined))
        .catch(() => saveAdvice('offline'));
    }
  };

  const selectPlan = (planId: string) => {
    if (!collection.plans.some((savedPlan) => savedPlan.id === planId)) return;
    setCollection((current) => ({ ...current, activePlanId: planId }));
    setIsEditing(false);
  };

  const deletePlan = async (planId: string) => {
    const planToDelete = collection.plans.find((savedPlan) => savedPlan.id === planId);
    if (!planToDelete || (syncEnabled && userId && cloudSyncStatus === 'syncing')) return;
    const accountCopyNote = userId && !syncEnabled
      ? '\nAccount sync is off, so any previously backed-up account copy will remain.'
      : !userId && syncEnabled
        ? '\nYou are signed out, so any account copy will remain.'
        : '';
    if (!window.confirm(`Delete the ${getPositionName(planToDelete.form)} roadmap for ${planToDelete.form.examDate}? This removes its schedule and progress from this device and cannot be undone.${accountCopyNote}`)) return;

    if (syncEnabled && userId) {
      setIsDeletingPlan(true);
      setCloudSyncStatus('syncing');
      const deletedRemotely = await deleteStudyPlannerPlanFromDb(userId, planId);
      if (!deletedRemotely) {
        setIsDeletingPlan(false);
        setCloudSyncStatus('error');
        window.alert('The account copy could not be deleted, so the local roadmap was kept. Check your connection and try again.');
        return;
      }
    }

    setCollection((current) => {
      const remainingPlans = current.plans.filter((savedPlan) => savedPlan.id !== planId);
      const activePlanId = current.activePlanId === planId
        ? remainingPlans[0]?.id ?? null
        : current.activePlanId;
      return { activePlanId, plans: remainingPlans };
    });
    setDraftForm(createDefaultStudyPlannerForm(toLocalDateString(new Date())));
    setEditingPlanId(null);
    setIsEditing(false);
    setIsDeletingPlan(false);
  };

  const toggleCloudSync = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setSyncEnabled((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(STUDY_PLANNER_SYNC_KEY, next ? 'true' : 'false');
      } catch {
        // Cloud sync can still be enabled for this visit if preferences cannot be stored.
      }
      setCloudSyncStatus(next ? 'syncing' : 'off');
      setCloudReady(!next);
      return next;
    });
  };

  const toggleTask = (taskId: string) => {
    const task = schedule.flatMap((day) => day.tasks).find((item) => item.id === taskId);
    const topicTaskKinds = new Set(['learn', 'mcq', 'notes']);
    const today = toLocalDateString(new Date());
    setCollection((current) => ({
      ...current,
      plans: current.plans.map((savedPlan) => {
        if (savedPlan.id !== plan?.id) return savedPlan;
        const completed = new Set(savedPlan.completedTaskIds);
        const wasComplete = completed.has(taskId);
        if (wasComplete) completed.delete(taskId);
        else completed.add(taskId);
        const completedTaskDates = { ...(savedPlan.completedTaskDates ?? {}) };
        if (wasComplete) delete completedTaskDates[taskId];
        else completedTaskDates[taskId] = today;

        const completedTopicIds = new Set(savedPlan.completedTopicIds ?? []);
        if (task?.topicId && topicTaskKinds.has(task.kind)) {
          const stillCovered = schedule.flatMap((day) => day.tasks).some((candidate) =>
            candidate.topicId === task.topicId && topicTaskKinds.has(candidate.kind)
            && (candidate.id === taskId ? !wasComplete : completed.has(candidate.id)));
          if (stillCovered) completedTopicIds.add(task.topicId);
          else completedTopicIds.delete(task.topicId);
        }
        return {
          ...savedPlan,
          updatedAt: new Date().toISOString(),
          completedTaskIds: [...completed],
          completedTaskDates,
          completedTopicIds: [...completedTopicIds],
        };
      }),
    }));
  };

  const toggleSubtopic = (subtopicId: string) => {
    setCollection((current) => ({
      ...current,
      plans: current.plans.map((savedPlan) => {
        if (savedPlan.id !== plan?.id) return savedPlan;
        const completedSubtopicIds = new Set(savedPlan.completedSubtopicIds);
        const completedTopicIds = new Set(savedPlan.completedTopicIds ?? []);
        if (completedSubtopicIds.has(subtopicId)) {
          completedSubtopicIds.delete(subtopicId);
          const hasFinishedTask = schedule.flatMap((day) => day.tasks).some((task) =>
            task.topicId === subtopicId && savedPlan.completedTaskIds.includes(task.id));
          if (!hasFinishedTask) completedTopicIds.delete(subtopicId);
        } else {
          completedSubtopicIds.add(subtopicId);
          completedTopicIds.add(subtopicId);
        }
        return {
          ...savedPlan,
          updatedAt: new Date().toISOString(),
          completedSubtopicIds: [...completedSubtopicIds],
          completedTopicIds: [...completedTopicIds],
        };
      }),
    }));
  };

  const toggleAllSubtopicsInSubject = (subjectSlug: string, markReviewed: boolean) => {
    const topicIds = getStudyPlanTopics(plan?.form ?? draftForm)
      .filter((topic) => topic.subjectSlug === subjectSlug)
      .map((topic) => topic.id);
    setCollection((current) => ({
      ...current,
      plans: current.plans.map((savedPlan) => {
        if (savedPlan.id !== plan?.id) return savedPlan;
        const completedSubtopicIds = new Set(savedPlan.completedSubtopicIds);
        const completedTopicIds = new Set(savedPlan.completedTopicIds ?? []);
        topicIds.forEach((id) => {
          if (markReviewed) {
            completedSubtopicIds.add(id);
            completedTopicIds.add(id);
          } else {
            completedSubtopicIds.delete(id);
            const hasFinishedTask = schedule.flatMap((day) => day.tasks).some((task) =>
              task.topicId === id && savedPlan.completedTaskIds.includes(task.id));
            if (!hasFinishedTask) completedTopicIds.delete(id);
          }
        });
        return {
          ...savedPlan,
          updatedAt: new Date().toISOString(),
          completedSubtopicIds: [...completedSubtopicIds],
          completedTopicIds: [...completedTopicIds],
        };
      }),
    }));
  };

  const rebalancePlan = () => {
    if (!plan) return;
    const today = toLocalDateString(new Date());
    const rebalanced = rebalancePlanSchedule(plan, today);
    setCollection((current) => ({
      ...current,
      plans: current.plans.map((savedPlan) => savedPlan.id === rebalanced.id ? rebalanced : savedPlan),
    }));
  };

  const recordMock = (attempt: MockAttempt) => {
    setCollection((current) => ({
      ...current,
      plans: current.plans.map((savedPlan) => {
        if (savedPlan.id !== plan?.id) return savedPlan;
        const scheduledMockIds = attempt.completedTaskId
          ? [attempt.completedTaskId]
          : schedule.find((day) => day.date === attempt.date)?.tasks.filter((task) => task.kind === 'mock').map((task) => task.id) ?? [];
        const completedTaskIds = new Set(savedPlan.completedTaskIds);
        const completedTaskDates = { ...(savedPlan.completedTaskDates ?? {}) };
        scheduledMockIds.forEach((id) => {
          completedTaskIds.add(id);
          completedTaskDates[id] = attempt.date;
        });
        const mockAttempts = savedPlan.mockAttempts.filter((savedAttempt) => savedAttempt.id !== attempt.id);
        mockAttempts.push({ ...attempt, source: attempt.source ?? 'manual' });
        return {
          ...savedPlan,
          updatedAt: attempt.recordedAt,
          completedTaskIds: [...completedTaskIds],
          completedTaskDates,
          mockAttempts: mockAttempts.slice(-500),
        };
      }),
    }));
  };

  const importBackup = (serialized: string): boolean => {
    const backup = parseStudyPlannerBackup(serialized);
    if (!backup) return false;
    const planIds = new Set([...collection.plans, ...backup.plans].map((savedPlan) => savedPlan.id));
    if (planIds.size > MAX_STORED_STUDY_PLANS) {
      window.alert(`This backup would exceed the ${MAX_STORED_STUDY_PLANS}-plan limit. Export a backup and delete an older plan before restoring it.`);
      return false;
    }
    if (!window.confirm(`Restore ${backup.plans.length} roadmap(s)? Matching plans will be updated and separate plans will be kept.`)) return false;
    const merged = mergeStudyPlannerCollections(collection, backup);
    const activePlanId = backup.activePlanId && merged.plans.some((savedPlan) => savedPlan.id === backup.activePlanId)
      ? backup.activePlanId
      : merged.activePlanId;
    setCollection({ ...merged, activePlanId });
    setIsEditing(false);
    return true;
  };

  if (isEditing || !plan) {
    return (
      <PlannerSetup
        key={editingPlanId ?? 'new-plan'}
        initialForm={draftForm}
        isEditing={Boolean(editingPlanId)}
        onCancel={collection.plans.length ? () => setIsEditing(false) : undefined}
        onGenerate={generatePlan}
      />
    );
  }

  return (
    <PlannerDashboard
      plan={plan}
      plans={collection.plans}
      schedule={schedule}
      cloudSyncEnabled={syncEnabled}
      cloudSyncStatus={cloudSyncStatus}
      isSignedIn={Boolean(user)}
      localSaveError={localSaveError}
      onEdit={beginEdit}
      onNewPlan={beginNewPlan}
      onSelectPlan={selectPlan}
      onDeletePlan={deletePlan}
      isDeletingPlan={isDeletingPlan}
      onImportBackup={importBackup}
      onToggleCloudSync={toggleCloudSync}
      onToggleTask={toggleTask}
      onToggleSubtopic={toggleSubtopic}
      onToggleAllSubtopicsInSubject={toggleAllSubtopicsInSubject}
      onRecordMock={recordMock}
      onRebalance={rebalancePlan}
    />
  );
};
