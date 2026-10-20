/**
 * Shared constants and pure helpers for Prepare for the Future (Smart Study Planner).
 * Extracted so section components can stay focused.
 *
 * Feature status (2026-10):
 * - Memory Vault (SM-2) UI + logic: complete
 * - Merit projection UI + logic: complete
 * - Core schedule/feasibility/progress unit tests: present in studyPlanner.test.ts
 */
import React from 'react';
import {
  BookOpenCheck,
  BrainCircuit,
  CalendarCheck2,
  CalendarDays,
  ListChecks,
  RotateCcw,
  ShieldCheck,
  Timer,
  Trophy,
  TrendingUp,
} from 'lucide-react';
import type { StudyDay, StudyPlannerTask } from '../../lib/studyPlanner';

export const DASHBOARD_PANEL =
  'rounded-3xl border border-slate-200 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/95';

export const SMALL_BUTTON =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-extrabold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30';

export type PlannerSection = 'overview' | 'roadmap' | 'syllabus' | 'vault' | 'timer' | 'progress';

export const SECTION_TABS: Array<{ id: PlannerSection; label: string; icon: React.ReactNode }> = [
  { id: 'overview', label: "Today's Focus", icon: <CalendarCheck2 className="h-4 w-4" /> },
  { id: 'roadmap', label: 'Roadmap', icon: <CalendarDays className="h-4 w-4" /> },
  { id: 'syllabus', label: 'Syllabus', icon: <BookOpenCheck className="h-4 w-4" /> },
  { id: 'vault', label: 'Memory Vault', icon: <BrainCircuit className="h-4 w-4" /> },
  { id: 'timer', label: 'Focus Timer', icon: <Timer className="h-4 w-4" /> },
  { id: 'progress', label: 'Merit & Progress', icon: <TrendingUp className="h-4 w-4" /> },
];

export const TASK_ACTIONS: Record<StudyPlannerTask['kind'], { label: string; tab: 'mcqs' | 'study-notes' | 'quiz' }> = {
  learn: { label: 'Open study notes', tab: 'study-notes' },
  mcq: { label: 'Practise MCQs', tab: 'mcqs' },
  notes: { label: 'Open study notes', tab: 'study-notes' },
  revision: { label: 'Open study notes', tab: 'study-notes' },
  mock: { label: 'Start timed mock', tab: 'quiz' },
  analysis: { label: 'Review mock tests', tab: 'quiz' },
  'light-review': { label: 'Open study notes', tab: 'study-notes' },
};

export const formatLongDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

export const formatShortDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

export const getPhaseLabel = (phase: StudyDay['phase']) =>
  ({
    foundation: 'Foundation',
    practice: 'Practice & speed',
    'final-revision': 'Final revision',
    'exam-day': 'Exam day',
  }[phase]);

export const getTaskIcon = (kind: StudyPlannerTask['kind']) => {
  if (kind === 'mcq') return <ListChecks className="h-4 w-4" />;
  if (kind === 'mock') return <Trophy className="h-4 w-4" />;
  if (kind === 'revision' || kind === 'analysis') return <RotateCcw className="h-4 w-4" />;
  if (kind === 'light-review') return <ShieldCheck className="h-4 w-4" />;
  return <BookOpenCheck className="h-4 w-4" />;
};

export const playTimerChime = () => {
  try {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch {
    // Audio context may not be allowed or supported
  }
};
