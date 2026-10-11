import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Bot,
  CalendarCheck2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Flame,
  GraduationCap,
  ListChecks,
  PencilLine,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ChatMarkdownRenderer } from '../ChatMarkdownRenderer';
import {
  addDaysToDateString,
  createMentorPrompt,
  daysBetweenDates,
  getMotivationMessage,
  getOrganization,
  getPlannerProgress,
  getPlannerSubjects,
  getPositionName,
  getSyllabusRecord,
  PREPARATION_MODES,
  TARGET_SCORE_OPTIONS,
  toLocalDateString,
  type StudyDay,
  type StudyPlannerTask,
  type StoredStudyPlan,
  type MockAttempt,
} from '../../lib/studyPlanner';

interface PlannerDashboardProps {
  plan: StoredStudyPlan;
  schedule: StudyDay[];
  onEdit: () => void;
  onNewPlan: () => void;
  onToggleTask: (taskId: string) => void;
  onToggleSubtopic: (subtopicId: string) => void;
  onRecordMock: (attempt: MockAttempt) => void;
}

type PlannerSection = 'overview' | 'roadmap' | 'syllabus' | 'progress';

const DASHBOARD_PANEL = 'rounded-3xl border border-slate-200 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/95';
const SMALL_BUTTON = 'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-extrabold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30';

const SECTION_TABS: Array<{ id: PlannerSection; label: string; icon: React.ReactNode }> = [
  { id: 'overview', label: 'Today', icon: <CalendarCheck2 className="h-4 w-4" /> },
  { id: 'roadmap', label: 'Roadmap', icon: <CalendarDays className="h-4 w-4" /> },
  { id: 'syllabus', label: 'Syllabus', icon: <BookOpenCheck className="h-4 w-4" /> },
  { id: 'progress', label: 'Progress & badges', icon: <TrendingUp className="h-4 w-4" /> },
];

const TASK_ACTIONS: Record<StudyPlannerTask['kind'], { label: string; tab: 'mcqs' | 'study-notes' | 'quiz' }> = {
  learn: { label: 'Open study notes', tab: 'study-notes' },
  mcq: { label: 'Practise MCQs', tab: 'mcqs' },
  notes: { label: 'Open study notes', tab: 'study-notes' },
  revision: { label: 'Open study notes', tab: 'study-notes' },
  mock: { label: 'Open mock tests', tab: 'quiz' },
  analysis: { label: 'Review mock tests', tab: 'quiz' },
  'light-review': { label: 'Open study notes', tab: 'study-notes' },
};

const formatLongDate = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
const formatShortDate = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

const getPhaseLabel = (phase: StudyDay['phase']) => ({
  foundation: 'Foundation',
  practice: 'Practice & speed',
  'final-revision': 'Final revision',
  'exam-day': 'Exam day',
}[phase]);

const getTaskIcon = (kind: StudyPlannerTask['kind']) => {
  if (kind === 'mcq') return <ListChecks className="h-4 w-4" />;
  if (kind === 'mock') return <Trophy className="h-4 w-4" />;
  if (kind === 'revision' || kind === 'analysis') return <RotateCcw className="h-4 w-4" />;
  if (kind === 'light-review') return <ShieldCheck className="h-4 w-4" />;
  return <BookOpenCheck className="h-4 w-4" />;
};

export const PlannerDashboard: React.FC<PlannerDashboardProps> = ({
  plan,
  schedule,
  onEdit,
  onNewPlan,
  onToggleTask,
  onToggleSubtopic,
  onRecordMock,
}) => {
  const { setTab, setSelectedCategorySlug } = useApp();
  const [activeSection, setActiveSection] = useState<PlannerSection>('overview');
  const today = toLocalDateString(new Date());
  const progress = useMemo(() => getPlannerProgress(plan, schedule, today), [plan, schedule, today]);
  const organization = getOrganization(plan.form.organizationId);
  const positionName = getPositionName(plan.form);
  const syllabusRecord = getSyllabusRecord(plan.form);
  const selectedSubjects = getPlannerSubjects(plan.form.subjectSlugs);
  const daysRemaining = daysBetweenDates(today, plan.form.examDate);
  const defaultScheduleDate = schedule.find((day) => day.date === today)?.date
    ?? schedule.find((day) => day.date >= today)?.date
    ?? (plan.form.examDate >= today ? schedule[schedule.length - 1]?.date : undefined)
    ?? today;
  const [selectedDate, setSelectedDate] = useState(defaultScheduleDate);
  const [selectedWeek, setSelectedWeek] = useState(() => schedule.find((day) => day.date === today)?.weekNumber ?? schedule[0]?.weekNumber ?? 1);
  const [showMockForm, setShowMockForm] = useState(false);
  const [mockScore, setMockScore] = useState('');
  const [mockTotal, setMockTotal] = useState('100');
  const [mockDate, setMockDate] = useState(today);
  const [mockError, setMockError] = useState('');

  useEffect(() => {
    if (!schedule.some((day) => day.date === selectedDate)) setSelectedDate(defaultScheduleDate);
  }, [defaultScheduleDate, schedule, selectedDate]);

  const activeDay = schedule.find((day) => day.date === selectedDate) ?? null;
  const weekOptions = useMemo(() => [...new Set(schedule.map((day) => day.weekNumber))], [schedule]);
  const weekDays = schedule.filter((day) => day.weekNumber === selectedWeek);
  const selectedWeekDay = weekDays.find((day) => day.date === selectedDate) ?? weekDays[0] ?? null;
  const weeklyTaskCount = weekDays.reduce((sum, day) => sum + day.tasks.length, 0);
  const weeklyDoneCount = weekDays.reduce((sum, day) => sum + day.tasks.filter((task) => plan.completedTaskIds.includes(task.id)).length, 0);
  const weeklyMcqCount = weekDays.reduce((sum, day) => sum + day.mcqTarget, 0);
  const targetLabel = TARGET_SCORE_OPTIONS.find((item) => item.id === plan.form.targetScore)?.label ?? '70%';
  const currentMode = PREPARATION_MODES.find((mode) => mode.id === plan.form.preparationMode)?.label ?? 'Complete Preparation';

  const startTab = (tab: 'mcqs' | 'study-notes' | 'quiz', subjectSlug?: string) => {
    if (tab === 'mcqs') setSelectedCategorySlug(subjectSlug ?? null);
    if (tab === 'study-notes' && subjectSlug) setSelectedCategorySlug(subjectSlug);
    setTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openMentor = () => {
    try {
      sessionStorage.setItem('muqabil_study_mentor_prompt', createMentorPrompt(plan, activeDay ?? undefined));
    } catch {
      // The chat can still be opened if session storage is unavailable.
    }
    setTab('ai-chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveMock = (event: React.FormEvent) => {
    event.preventDefault();
    const score = Number(mockScore);
    const total = Number(mockTotal);
    if (!Number.isFinite(score) || !Number.isFinite(total) || total < 1 || score < 0 || score > total) {
      setMockError('Enter a score from 0 to the total number of questions.');
      return;
    }
    onRecordMock({
      id: `mock-${mockDate}-${Date.now()}`,
      date: mockDate,
      score,
      total,
      recordedAt: new Date().toISOString(),
    });
    setMockScore('');
    setMockTotal('100');
    setMockDate(today);
    setMockError('');
    setShowMockForm(false);
  };

  const renderMockForm = () => (
    <form onSubmit={saveMock} className="mt-4 rounded-2xl border border-violet-200 bg-violet-50/70 p-4 dark:border-violet-900 dark:bg-violet-950/25">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-extrabold text-violet-950 dark:text-violet-100">Log a mock test result</h4>
          <p className="mt-0.5 text-xs text-violet-900/70 dark:text-violet-200/70">Record your own practice score; this is not an official mark.</p>
        </div>
        <button type="button" onClick={() => { setShowMockForm(false); setMockError(''); }} className="rounded-lg px-2 py-1 text-xs font-bold text-slate-500 hover:bg-white dark:hover:bg-slate-800">Close</button>
      </div>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1.4fr_auto] sm:items-end">
        <label className="space-y-1 text-xs font-bold text-slate-700 dark:text-slate-300">Correct answers<input className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white" type="number" min="0" max={mockTotal || 100} value={mockScore} onChange={(event) => setMockScore(event.target.value)} required /></label>
        <label className="space-y-1 text-xs font-bold text-slate-700 dark:text-slate-300">Total questions<input className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white" type="number" min="1" max="500" value={mockTotal} onChange={(event) => setMockTotal(event.target.value)} required /></label>
        <label className="space-y-1 text-xs font-bold text-slate-700 dark:text-slate-300">Test date<input className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white" type="date" min={plan.startDate} max={today} value={mockDate} onChange={(event) => setMockDate(event.target.value)} required /></label>
        <button type="submit" className="rounded-xl bg-violet-700 px-4 py-2.5 text-xs font-black text-white hover:bg-violet-800">Save score</button>
      </div>
      {mockError && <p role="alert" className="mt-2 text-xs font-bold text-rose-600">{mockError}</p>}
    </form>
  );

  const renderTask = (day: StudyDay, task: StudyPlannerTask) => {
    const complete = plan.completedTaskIds.includes(task.id);
    const notStartedYet = day.date > today;
    const action = TASK_ACTIONS[task.kind];
    const icon = getTaskIcon(task.kind);
    return (
      <article key={task.id} className={`rounded-2xl border p-3.5 transition sm:p-4 ${complete ? 'border-emerald-200 bg-emerald-50/55 dark:border-emerald-900/70 dark:bg-emerald-950/15' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/40'}`}>
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => onToggleTask(task.id)}
            disabled={notStartedYet}
            aria-label={`${notStartedYet ? 'Not available yet' : complete ? 'Mark incomplete' : 'Mark complete'}: ${task.title}`}
            aria-pressed={complete}
            className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border transition disabled:cursor-not-allowed disabled:opacity-40 ${complete ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 bg-white text-transparent hover:border-emerald-500 dark:border-slate-600 dark:bg-slate-900'}`}
          >
            <Check className="h-4 w-4" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`grid h-7 w-7 place-items-center rounded-lg ${task.kind === 'mock' ? 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300' : task.kind === 'mcq' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'}`}>{icon}</span>
              <h4 className={`font-extrabold ${complete ? 'text-emerald-800 line-through decoration-emerald-600/50 dark:text-emerald-300' : 'text-slate-900 dark:text-white'}`}>{task.title}</h4>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-300"><Clock3 className="h-3 w-3" />{task.durationMinutes} min</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">{task.detail}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => startTab(action.tab, task.subjectSlug)} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-extrabold text-white transition hover:bg-emerald-700 dark:bg-slate-700 dark:hover:bg-emerald-700">
                {action.label}<ArrowRight className="h-3.5 w-3.5" />
              </button>
              {task.targetCount ? <span className="text-[11px] font-bold text-slate-400">Target: {task.targetCount} questions</span> : null}
              {notStartedYet && <span className="text-[11px] font-bold text-slate-400">Available on {formatShortDate(day.date)}</span>}
              {complete && <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5" />Done</span>}
            </div>
          </div>
        </div>
      </article>
    );
  };

  const renderDayDetail = (day: StudyDay | null) => {
    if (!day) {
      return (
        <div className="rounded-2xl border border-dashed border-slate-300 p-7 text-center dark:border-slate-700">
          <CalendarDays className="mx-auto h-8 w-8 text-slate-400" />
          <h3 className="mt-3 font-extrabold text-slate-900 dark:text-white">No scheduled study days remain</h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">Your exam date has passed or today is exam day. Update the date to build a fresh roadmap.</p>
          <button type="button" onClick={onEdit} className="mt-4 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-emerald-700">Update exam date</button>
        </div>
      );
    }
    const doneForDay = day.tasks.filter((task) => plan.completedTaskIds.includes(task.id)).length;
    const dayPercent = day.tasks.length ? Math.round((doneForDay / day.tasks.length) * 100) : 0;
    return (
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">{day.dayNumber === 1 ? 'Day 1' : `Day ${day.dayNumber}`} · {getPhaseLabel(day.phase)}</p>
            <h3 className="mt-1 text-xl font-black text-slate-950 dark:text-white">{formatLongDate(day.date)}</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{day.studyMinutes} planned minutes · {day.mcqTarget ? `${day.mcqTarget} MCQs` : 'No MCQ target for this mode'}</p>
          </div>
          <div className="min-w-32 rounded-2xl bg-emerald-50 px-4 py-3 dark:bg-emerald-950/35">
            <div className="text-xl font-black text-emerald-800 dark:text-emerald-300">{dayPercent}%</div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">day complete</div>
          </div>
        </div>
        {day.topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {day.topics.map((topic) => <span key={topic.id} className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[11px] font-bold text-sky-900 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-200">{topic.subjectName} · {topic.subtopic}</span>)}
          </div>
        )}
        <div className="space-y-3">{day.tasks.map((task) => renderTask(day, task))}</div>
        {day.date <= today && day.tasks.some((task) => task.kind === 'mock') && (
          <button type="button" onClick={() => { setMockDate(day.date); setShowMockForm((open) => !open); setMockError(''); }} className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-xs font-extrabold text-violet-800 hover:bg-violet-100 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-200 dark:hover:bg-violet-950/60">
            <Trophy className="h-4 w-4" />Log this mock score
          </button>
        )}
        {showMockForm && renderMockForm()}
      </div>
    );
  };

  const topMetric = (icon: React.ReactNode, label: string, value: string, note: string, tone: string) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3">
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}>{icon}</span>
        <span className="truncate text-right text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</span>
      </div>
      <div className="mt-3 text-2xl font-black tabular-nums text-slate-950 dark:text-white">{value}</div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{note}</p>
    </div>
  );

  const todayDay = schedule.find((day) => day.date === today) ?? activeDay;
  const todayWeek = todayDay?.weekNumber ?? selectedWeek;
  const thisWeekDays = schedule.filter((day) => day.weekNumber === todayWeek);
  const thisWeekTasks = thisWeekDays.flatMap((day) => day.tasks);
  const thisWeekCompleted = thisWeekTasks.filter((task) => plan.completedTaskIds.includes(task.id)).length;
  const thisWeekPercent = thisWeekTasks.length ? Math.round((thisWeekCompleted / thisWeekTasks.length) * 100) : 0;
  const weeklyTargetCount = thisWeekDays.reduce((sum, day) => sum + day.mcqTarget, 0);
  const weeklyMockDays = thisWeekDays.filter((day) => day.tasks.some((task) => task.kind === 'mock')).length;

  const startNewPlan = () => onNewPlan();

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-900 p-6 text-white shadow-2xl sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-20 h-72 w-72 rounded-full bg-emerald-300/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
          <div className="min-w-0 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-200"><Sparkles className="h-4 w-4 text-amber-300" /> Prepare for the Future</span>
            <h1 className="mt-4 break-words font-display text-3xl font-black tracking-tight sm:text-4xl">Your {organization.name} roadmap</h1>
            <p className="mt-2 text-base font-bold text-white">{positionName}</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/80">{currentMode} · {selectedSubjects.length} mapped subjects · {plan.form.dailyStudyMinutes >= 300 ? '5+ hours' : `${plan.form.dailyStudyMinutes} minutes`} per day · target {targetLabel}</p>
            {syllabusRecord && <a className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-200 underline decoration-cyan-200/40 underline-offset-4 hover:text-white" href={syllabusRecord.sourceUrl} target="_blank" rel="noreferrer">Syllabus reference: {syllabusRecord.name}<ArrowRight className="h-3.5 w-3.5" /></a>}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end xl:flex-col xl:items-end">
            <div className="min-w-44 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
              <div className="text-4xl font-black tabular-nums text-white">{daysRemaining < 0 ? '—' : daysRemaining}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wide text-emerald-100">{daysRemaining < 0 ? 'exam date passed' : daysRemaining === 0 ? 'exam day' : 'days remaining'}</div>
              <div className="mt-2 border-t border-white/15 pt-2 text-xs font-semibold text-emerald-50/80">{formatShortDate(plan.form.examDate)}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={onEdit} className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-extrabold text-white hover:bg-white/15"><PencilLine className="h-4 w-4" />Edit plan</button>
              <button type="button" onClick={startNewPlan} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-emerald-900 hover:bg-emerald-50"><RotateCcw className="h-4 w-4" />New roadmap</button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4" aria-label="Study progress summary">
        {topMetric(<CalendarDays className="h-5 w-5" />, 'Days to exam', daysRemaining < 0 ? '—' : String(daysRemaining), daysRemaining === 0 ? 'Your exam is today' : 'Countdown to your date', 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300')}
        {topMetric(<CheckCircle2 className="h-5 w-5" />, 'Plan complete', `${progress.taskCompletionPercent}%`, `${progress.completedTasks} of ${progress.totalTasks} targets done`, 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300')}
        {topMetric(<Target className="h-5 w-5" />, 'Readiness estimate', `${progress.readinessScore}%`, 'Practice estimate, not a predicted result', 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300')}
        {topMetric(<Flame className="h-5 w-5" />, 'Study streak', `${progress.currentStreak} ${progress.currentStreak === 1 ? 'day' : 'days'}`, `${progress.activeDays} active study days total`, 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300')}
      </section>

      <nav className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-3 dark:border-slate-800" aria-label="Planner sections">
        {SECTION_TABS.map((tab) => {
          const active = activeSection === tab.id;
          return <button key={tab.id} type="button" onClick={() => setActiveSection(tab.id)} aria-current={active ? 'page' : undefined} className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition sm:text-sm ${active ? 'bg-emerald-600 text-white shadow-sm' : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'}`}>{tab.icon}{tab.label}</button>;
        })}
      </nav>

      {plan.aiPersonalizationRequested && (
        <section className="rounded-3xl border border-violet-200 bg-violet-50/70 p-5 dark:border-violet-900 dark:bg-violet-950/25 sm:p-6" aria-live="polite">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-200"><Sparkles className={`h-5 w-5 ${plan.aiPlanStatus === 'pending' ? 'animate-pulse' : ''}`} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">Optional Gemini personalisation</p>
              {plan.aiPlanStatus === 'pending' ? (
                <p className="mt-1 text-sm font-semibold text-violet-950 dark:text-violet-100">Creating your tailored strategy… Your local daily roadmap is ready to use.</p>
              ) : plan.aiPlanStatus === 'ready' && plan.aiPlanAdvice ? (
                <div className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200"><ChatMarkdownRenderer content={plan.aiPlanAdvice} /></div>
              ) : (
                <p className="mt-1 text-sm leading-6 text-violet-950/75 dark:text-violet-100/75">AI personalisation is unavailable right now. Your locally generated daily and weekly roadmap is still ready, and you can ask the MUQABIL AI Mentor later.</p>
              )}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'overview' && (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,.85fr)]">
          <section className={`${DASHBOARD_PANEL} p-5 sm:p-6`}>
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">Today’s targets</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">One focused day at a time</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{todayDay ? formatLongDate(todayDay.date) : 'Your plan needs a date update.'}</p>
              </div>
              <button type="button" onClick={() => setActiveSection('roadmap')} className={SMALL_BUTTON}>See full roadmap <ArrowRight className="h-3.5 w-3.5" /></button>
            </div>
            {renderDayDetail(todayDay ?? null)}
          </section>

          <div className="space-y-5">
            <section className="overflow-hidden rounded-3xl border border-violet-300/40 bg-gradient-to-br from-violet-950 via-indigo-950 to-slate-950 p-5 text-white shadow-lg sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-violet-200"><Bot className="h-6 w-6" /></span>
                <span className="rounded-full border border-violet-200/20 bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-violet-200">MUQABIL AI Mentor</span>
              </div>
              <h2 className="mt-4 text-xl font-black">Need a concept explained?</h2>
              <p className="mt-2 text-sm leading-6 text-violet-100/80">Open the mentor with today’s exam, time budget, weak areas and topic already prepared as a prompt.</p>
              <button type="button" onClick={openMentor} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-violet-950 hover:bg-violet-50"><Sparkles className="h-4 w-4" />Ask the AI Mentor<ArrowRight className="h-4 w-4" /></button>
              <p className="mt-3 text-[10px] leading-4 text-violet-200/70">The prompt is prefilled, not sent. Review it and press Send in chat when you’re ready.</p>
            </section>

            <section className={`${DASHBOARD_PANEL} p-5 sm:p-6`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">This week</p>
                  <h2 className="mt-1 text-lg font-black text-slate-950 dark:text-white">Week {todayWeek} targets</h2>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"><Target className="h-5 w-5" /></span>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="mb-1.5 flex justify-between text-xs font-bold"><span className="text-slate-600 dark:text-slate-300">Weekly tasks</span><span className="text-emerald-700 dark:text-emerald-300">{thisWeekCompleted}/{thisWeekTasks.length}</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${thisWeekPercent}%` }} /></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950/60"><strong className="block text-lg font-black text-slate-900 dark:text-white">{weeklyTargetCount}</strong><span className="text-[10px] font-bold text-slate-500">planned MCQs</span></div>
                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950/60"><strong className="block text-lg font-black text-slate-900 dark:text-white">{weeklyMockDays}</strong><span className="text-[10px] font-bold text-slate-500">mock test{weeklyMockDays === 1 ? '' : 's'}</span></div>
                </div>
                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">{getMotivationMessage(progress)}</p>
              </div>
            </section>

            <section className="rounded-3xl border border-sky-200 bg-sky-50/70 p-5 dark:border-sky-900 dark:bg-sky-950/25">
              <div className="flex items-center gap-2 text-sm font-extrabold text-sky-950 dark:text-sky-100"><ShieldCheck className="h-4 w-4" />Your plan stays yours</div>
              <p className="mt-2 text-xs leading-5 text-sky-900/75 dark:text-sky-200/70">Your roadmap and progress are saved in this browser. If you enabled optional Gemini personalisation, only the planning details shown in setup were sent once; your task and progress history stays local.</p>
            </section>
          </div>
        </div>
      )}

      {activeSection === 'roadmap' && (
        <section className={`${DASHBOARD_PANEL} p-5 sm:p-6`}>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">Daily + weekly targets</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">Your study roadmap</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Foundation first, then timed practice and focused final revision.</p>
            </div>
            {weekOptions.length > 0 && <label className="flex items-center gap-2 text-xs font-extrabold text-slate-600 dark:text-slate-300">Jump to week<select value={selectedWeek} onChange={(event) => { const week = Number(event.target.value); setSelectedWeek(week); const firstDate = schedule.find((day) => day.weekNumber === week)?.date; if (firstDate) setSelectedDate(firstDate); }} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white">{weekOptions.map((week) => <option key={week} value={week}>Week {week}</option>)}</select></label>}
          </div>
          {weekDays.length ? (
            <>
              <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
                {weekDays.map((day) => {
                  const done = day.tasks.filter((task) => plan.completedTaskIds.includes(task.id)).length;
                  const active = selectedDate === day.date;
                  return (
                    <button key={day.date} type="button" onClick={() => { setSelectedDate(day.date); setSelectedWeek(day.weekNumber); }} className={`rounded-2xl border p-3 text-left transition ${active ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/10 dark:bg-emerald-950/35' : 'border-slate-200 bg-white hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-950/40'}`}>
                      <span className="flex items-center justify-between gap-2 text-xs font-black text-slate-900 dark:text-white"><span>{formatShortDate(day.date)}</span>{done === day.tasks.length ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <span className="text-[10px] text-slate-400">{done}/{day.tasks.length}</span>}</span>
                      <span className="mt-2 block min-h-10 text-[11px] leading-4 text-slate-600 dark:text-slate-400">{day.topics[0]?.subtopic ?? day.tasks[0]?.title}</span>
                      <span className={`mt-2 block text-[9px] font-black uppercase tracking-wide ${day.phase === 'final-revision' ? 'text-rose-600 dark:text-rose-300' : day.phase === 'practice' ? 'text-violet-600 dark:text-violet-300' : 'text-emerald-700 dark:text-emerald-300'}`}>{getPhaseLabel(day.phase)}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">{renderDayDetail(selectedWeekDay)}</div>
            </>
          ) : renderDayDetail(null)}
        </section>
      )}

      {activeSection === 'syllabus' && (
        <section className={`${DASHBOARD_PANEL} p-5 sm:p-6`}>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">Auto-mapped MUQABIL syllabus</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">Track topic mastery</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Mark a subtopic as reviewed when you can recall it without notes.</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-4 py-3 dark:bg-emerald-950/35"><strong className="block text-xl font-black text-emerald-800 dark:text-emerald-300">{progress.syllabusCoveragePercent}%</strong><span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{progress.completedSubtopics}/{progress.totalSubtopics} topics reviewed</span></div>
          </div>
          <div className="mt-5 space-y-3">
            {selectedSubjects.map((subject) => {
              const mastered = subject.subtopics.filter((_, index) => plan.completedSubtopicIds.includes(`${subject.slug}::${index}`)).length;
              const percent = subject.subtopics.length ? Math.round(mastered / subject.subtopics.length * 100) : 0;
              return (
                <details key={subject.slug} className="group rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/30">
                  <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><BookOpenCheck className="h-5 w-5" /></span>
                    <span className="min-w-0 flex-1"><span className="block font-extrabold text-slate-900 dark:text-white">{subject.name}</span><span className="mt-1 block text-[11px] text-slate-500 dark:text-slate-400">{mastered} of {subject.subtopics.length} subtopics reviewed</span></span>
                    <span className="hidden w-28 sm:block"><span className="block h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><span className="block h-full rounded-full bg-emerald-500" style={{ width: `${percent}%` }} /></span><span className="mt-1 block text-right text-[10px] font-bold text-slate-400">{percent}%</span></span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180" />
                  </summary>
                  <div className="space-y-2 border-t border-slate-100 p-3 dark:border-slate-800 sm:p-4">
                    {subject.subtopics.map((subtopic, index) => {
                      const id = `${subject.slug}::${index}`;
                      const complete = plan.completedSubtopicIds.includes(id);
                      return <label key={id} className={`flex cursor-pointer items-start gap-3 rounded-xl p-3 transition ${complete ? 'bg-emerald-50/70 dark:bg-emerald-950/20' : 'hover:bg-slate-50 dark:hover:bg-slate-900'}`}><input type="checkbox" checked={complete} onChange={() => onToggleSubtopic(id)} className="mt-0.5 h-4 w-4 accent-emerald-600" /><span className="flex-1 text-sm font-semibold text-slate-700 dark:text-slate-200">{subtopic}</span>{complete && <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-300">Reviewed</span>}</label>;
                    })}
                  </div>
                </details>
              );
            })}
          </div>
          <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs leading-5 text-slate-500 dark:bg-slate-950/60 dark:text-slate-400">A checked topic is your personal self-review, not an official assessment. Confirm the exact syllabus with {organization.name}; topic coverage may vary by position and test cycle.</p>
        </section>
      )}

      {activeSection === 'progress' && (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,.7fr)]">
          <section className={`${DASHBOARD_PANEL} p-5 sm:p-6`}>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div><p className="text-xs font-black uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">Practice dashboard</p><h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">Progress you can act on</h2></div>
              <button type="button" onClick={() => { setShowMockForm((open) => !open); setMockDate(today); setMockError(''); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-xs font-extrabold text-white hover:bg-violet-800"><Trophy className="h-4 w-4" />Log mock score</button>
            </div>
            {showMockForm && renderMockForm()}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30"><strong className="text-2xl font-black text-emerald-800 dark:text-emerald-300">{progress.syllabusCoveragePercent}%</strong><span className="mt-1 block text-[10px] font-bold text-slate-500">syllabus reviewed</span></div>
              <div className="rounded-2xl bg-sky-50 p-4 dark:bg-sky-950/30"><strong className="text-2xl font-black text-sky-800 dark:text-sky-300">{progress.taskCompletionPercent}%</strong><span className="mt-1 block text-[10px] font-bold text-slate-500">roadmap complete</span></div>
              <div className="rounded-2xl bg-violet-50 p-4 dark:bg-violet-950/30"><strong className="text-2xl font-black text-violet-800 dark:text-violet-300">{progress.averageMockScore === null ? '—' : `${progress.averageMockScore}%`}</strong><span className="mt-1 block text-[10px] font-bold text-slate-500">average mock score</span></div>
              <div className="rounded-2xl bg-amber-50 p-4 dark:bg-amber-950/30"><strong className="text-2xl font-black text-amber-800 dark:text-amber-300">{progress.activeDays}</strong><span className="mt-1 block text-[10px] font-bold text-slate-500">active days</span></div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center justify-between gap-3">
                <div><h3 className="font-extrabold text-slate-900 dark:text-white">Last 7 days</h3><p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Completed targets compared with your plan</p></div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500 dark:bg-slate-800">Local activity</span>
              </div>
              <div className="mt-5 grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }, (_, index) => {
                  const date = addDaysToDateString(today, index - 6);
                  const day = schedule.find((item) => item.date === date);
                  const done = day?.tasks.filter((task) => plan.completedTaskIds.includes(task.id)).length ?? 0;
                  const total = day?.tasks.length ?? 0;
                  const percent = total ? Math.round(done / total * 100) : 0;
                  return <div key={date} className="min-w-0 text-center"><div className="flex h-24 items-end justify-center rounded-xl bg-slate-50 px-1 pb-1 dark:bg-slate-950/60"><div className={`w-full max-w-8 rounded-lg ${percent === 100 && total ? 'bg-emerald-500' : percent ? 'bg-sky-500' : 'bg-slate-200 dark:bg-slate-800'}`} style={{ height: `${Math.max(percent ? 15 : 8, percent)}%` }} title={`${done}/${total} tasks complete`} /></div><span className="mt-1 block truncate text-[9px] font-bold text-slate-500">{new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short' })}</span><span className="text-[9px] text-slate-400">{done}/{total || '—'}</span></div>;
                })}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900 dark:bg-emerald-950/20">
              <p className="flex items-center gap-2 text-sm font-extrabold text-emerald-950 dark:text-emerald-100"><Target className="h-4 w-4" />How the readiness estimate works</p>
              <p className="mt-2 text-xs leading-5 text-emerald-950/70 dark:text-emerald-100/70">It combines mapped syllabus review (40%), completed roadmap targets (35%) and mock-score progress toward your {targetLabel.toLowerCase()} goal (25%). It is a study-progress indicator only—not a pass prediction or official score.</p>
            </div>
          </section>

          <div className="space-y-5">
            <section className={`${DASHBOARD_PANEL} p-5 sm:p-6`}>
              <div className="flex items-center justify-between gap-2"><div><p className="text-xs font-black uppercase tracking-wide text-amber-600 dark:text-amber-300">Rewards</p><h2 className="mt-1 text-lg font-black text-slate-950 dark:text-white">Streaks & badges</h2></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"><Award className="h-5 w-5" /></span></div>
              <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">{getMotivationMessage(progress)}</p>
              {progress.badges.length ? <div className="mt-4 grid gap-2">{progress.badges.map((badge) => <div key={badge.id} className="flex items-center gap-3 rounded-2xl border border-amber-200/70 bg-amber-50/60 p-3 dark:border-amber-900/60 dark:bg-amber-950/20"><span className="text-xl">{badge.icon}</span><div><p className="text-xs font-extrabold text-slate-900 dark:text-white">{badge.title}</p><p className="mt-0.5 text-[10px] leading-4 text-slate-500 dark:text-slate-400">{badge.description}</p></div></div>)}</div> : <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">Complete a target to unlock your first badge.</div>}
            </section>

            <section className={`${DASHBOARD_PANEL} p-5 sm:p-6`}>
              <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-wide text-violet-600 dark:text-violet-300">Mock test history</p><h2 className="mt-1 text-lg font-black text-slate-950 dark:text-white">Your practice scores</h2></div><Trophy className="h-5 w-5 text-violet-600 dark:text-violet-300" /></div>
              {plan.mockAttempts.length ? <div className="mt-4 space-y-2">{[...plan.mockAttempts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map((attempt) => <div key={attempt.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-950/50"><span className="text-xs font-bold text-slate-600 dark:text-slate-300">{formatShortDate(attempt.date)}</span><span className="text-sm font-black text-slate-950 dark:text-white">{attempt.score}/{attempt.total}</span><span className="rounded-full bg-violet-100 px-2 py-1 text-[10px] font-black text-violet-800 dark:bg-violet-950 dark:text-violet-200">{Math.round(attempt.score / attempt.total * 100)}%</span></div>)}</div> : <p className="mt-4 rounded-xl bg-slate-50 p-4 text-xs text-slate-500 dark:bg-slate-950/50 dark:text-slate-400">No scores logged yet. Take a timed mock and record the result to track your trend.</p>}
            </section>
          </div>
        </div>
      )}

      <footer className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3 text-xs leading-5 text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
        Your plan and progress are stored locally in this browser. If you enabled optional Gemini personalisation, the planning details were sent once to MUQABIL’s AI service; the full progress record stays local. Syllabus mappings are study aids, not official notices; confirm details with {organization.name}. This roadmap is not a guarantee of exam results.
      </footer>
    </div>
  );
};
