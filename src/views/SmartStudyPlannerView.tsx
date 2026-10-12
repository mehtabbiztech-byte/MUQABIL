import React, { useEffect, useMemo, useState } from 'react';
import { PlannerDashboard } from '../components/study-planner/PlannerDashboard';
import { PlannerSetup } from '../components/study-planner/PlannerSetup';
import {
  createAiPlanPrompt,
  createDefaultStudyPlannerForm,
  createStudyPlanRecord,
  generateStudySchedule,
  getPlannerSubjects,
  loadStoredStudyPlan,
  rebalancePlanSchedule,
  STUDY_PLANNER_STORAGE_KEY,
  toLocalDateString,
  type MockAttempt,
  type StoredStudyPlan,
  type StudyPlannerForm,
} from '../lib/studyPlanner';

const readSavedPlan = (): StoredStudyPlan | null => {
  if (typeof window === 'undefined') return null;
  try {
    return loadStoredStudyPlan(window.localStorage);
  } catch {
    return null;
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
      systemInstruction: 'You are MUQABIL’s study planner. Produce a concise, practical coaching overlay for the supplied plan. Use only the supplied syllabus topics, do not invent official weightings or claim the plan predicts exam results. Include a daily time split, a weekly checkpoint, first-week sequence, weak-area approach, and final-revision tip.',
    }),
  });
  if (!response.ok) throw new Error(`AI request failed (${response.status})`);
  const data = await response.json() as { fallback?: boolean; reply?: unknown };
  if (data.fallback || typeof data.reply !== 'string') return null;
  const advice = data.reply.replace(/<<<[\s\S]*?>>>/g, '').trim().slice(0, 3500);
  return advice || null;
};

export const SmartStudyPlannerView: React.FC = () => {
  const [plan, setPlan] = useState<StoredStudyPlan | null>(readSavedPlan);
  const [isEditing, setIsEditing] = useState(!plan);
  const [draftForm, setDraftForm] = useState<StudyPlannerForm>(() => plan?.form ?? createDefaultStudyPlannerForm());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (plan) window.localStorage.setItem(STUDY_PLANNER_STORAGE_KEY, JSON.stringify(plan));
      else window.localStorage.removeItem(STUDY_PLANNER_STORAGE_KEY);
    } catch {
      // The planner continues to work for this visit if browser storage is full or blocked.
    }
  }, [plan]);

  const schedule = useMemo(() => plan ? generateStudySchedule(plan.form, plan.startDate) : [], [plan]);

  const beginEdit = () => {
    if (plan) setDraftForm({ ...plan.form, subjectSlugs: [...plan.form.subjectSlugs], weakAreas: [...plan.form.weakAreas] });
    setIsEditing(true);
  };

  const beginNewPlan = () => {
    setDraftForm(createDefaultStudyPlannerForm(toLocalDateString(new Date())));
    setIsEditing(true);
  };

  const generatePlan = (form: StudyPlannerForm, requestAiPersonalization: boolean) => {
    if (plan && !window.confirm('Generating this roadmap will replace your current roadmap, task progress, badges and mock scores. Continue?')) return;
    const generated = createStudyPlanRecord(form);
    const nextPlan: StoredStudyPlan = requestAiPersonalization
      ? { ...generated, aiPersonalizationRequested: true, aiPlanStatus: 'pending' }
      : generated;
    setDraftForm(nextPlan.form);
    setPlan(nextPlan);
    setIsEditing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (requestAiPersonalization) {
      const saveAdvice = (status: 'ready' | 'offline', advice?: string) => {
        try {
          const latest = loadStoredStudyPlan(window.localStorage);
          if (latest?.id === nextPlan.id) {
            const updated = { ...latest, aiPlanStatus: status, ...(advice ? { aiPlanAdvice: advice } : {}) };
            window.localStorage.setItem(STUDY_PLANNER_STORAGE_KEY, JSON.stringify(updated));
            setPlan((current) => current?.id === nextPlan.id ? { ...current, aiPlanStatus: status, ...(advice ? { aiPlanAdvice: advice } : {}) } : current);
            return;
          }
        } catch {
          // Fall through and update this view if browser storage is unavailable.
        }
        setPlan((current) => current?.id === nextPlan.id ? { ...current, aiPlanStatus: status, ...(advice ? { aiPlanAdvice: advice } : {}) } : current);
      };
      void requestAiPlanAdvice(form)
        .then((advice) => saveAdvice(advice ? 'ready' : 'offline', advice ?? undefined))
        .catch(() => saveAdvice('offline'));
    }
  };

  const toggleTask = (taskId: string) => {
    setPlan((current) => {
      if (!current) return current;
      const completed = new Set(current.completedTaskIds);
      if (completed.has(taskId)) completed.delete(taskId);
      else completed.add(taskId);
      return { ...current, completedTaskIds: [...completed] };
    });
  };

  const toggleSubtopic = (subtopicId: string) => {
    setPlan((current) => {
      if (!current) return current;
      const completed = new Set(current.completedSubtopicIds);
      if (completed.has(subtopicId)) completed.delete(subtopicId);
      else completed.add(subtopicId);
      return { ...current, completedSubtopicIds: [...completed] };
    });
  };

  const toggleAllSubtopicsInSubject = (subjectSlug: string, markReviewed: boolean) => {
    setPlan((current) => {
      if (!current) return current;
      const subject = getPlannerSubjects([subjectSlug])[0];
      if (!subject) return current;
      const set = new Set(current.completedSubtopicIds);
      subject.subtopics.forEach((_, idx) => {
        const id = `${subjectSlug}::${idx}`;
        if (markReviewed) set.add(id);
        else set.delete(id);
      });
      return { ...current, completedSubtopicIds: [...set] };
    });
  };

  const rebalancePlan = () => {
    setPlan((current) => {
      if (!current) return current;
      const today = toLocalDateString(new Date());
      return rebalancePlanSchedule(current, today);
    });
  };

  const recordMock = (attempt: MockAttempt) => {
    setPlan((current) => {
      if (!current) return current;
      const scheduledMockIds = schedule
        .find((day) => day.date === attempt.date)?.tasks
        .filter((task) => task.kind === 'mock')
        .map((task) => task.id) ?? [];
      const completedTaskIds = new Set(current.completedTaskIds);
      scheduledMockIds.forEach((id) => completedTaskIds.add(id));
      return {
        ...current,
        completedTaskIds: [...completedTaskIds],
        mockAttempts: [...current.mockAttempts, attempt],
      };
    });
  };

  if (isEditing || !plan) {
    return (
      <PlannerSetup
        key={plan?.id ?? 'new-plan'}
        initialForm={draftForm}
        isEditing={Boolean(plan)}
        onCancel={plan ? () => setIsEditing(false) : undefined}
        onGenerate={generatePlan}
      />
    );
  }

  return (
    <PlannerDashboard
      plan={plan}
      schedule={schedule}
      onEdit={beginEdit}
      onNewPlan={beginNewPlan}
      onToggleTask={toggleTask}
      onToggleSubtopic={toggleSubtopic}
      onToggleAllSubtopicsInSubject={toggleAllSubtopicsInSubject}
      onRecordMock={recordMock}
      onRebalance={rebalancePlan}
    />
  );
};
