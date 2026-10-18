import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  GraduationCap,
  LibraryBig,
  ListChecks,
  Sparkles,
  Target,
  WandSparkles,
  Zap,
} from 'lucide-react';
import {
  addDaysToDateString,
  CURRENT_LEVELS,
  DAILY_TIME_PRESETS,
  daysBetweenDates,
  getOrganization,
  getOrganizationPositions,
  getPosition,
  getPositionName,
  getSyllabusRecord,
  getSubjectsForPosition,
  getPlanFeasibility,
  getStudyPlanTopics,
  getWeakAreaName,
  PLANNER_SUBJECTS,
  POPULAR_EXAM_PRESETS,
  PREPARATION_MODES,
  STUDY_ORGANIZATIONS,
  TARGET_SCORE_OPTIONS,
  toLocalDateString,
  WEAK_AREAS,
  type ExamPreset,
  type StudyPlannerForm,
} from '../../lib/studyPlanner';

interface PlannerSetupProps {
  initialForm: StudyPlannerForm;
  onGenerate: (form: StudyPlannerForm, requestAiPersonalization: boolean) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const PANEL = 'rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/95 sm:p-7';
const INPUT = 'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white';

const PAGE_STEPS = [
  { title: 'Exam target', range: 'Steps 1–2', icon: GraduationCap },
  { title: 'Syllabus', range: 'Step 3', icon: LibraryBig },
  { title: 'Study style', range: 'Steps 4–6', icon: BookOpenCheck },
  { title: 'Goals & time', range: 'Steps 7–9', icon: Target },
];

export const PlannerSetup: React.FC<PlannerSetupProps> = ({ initialForm, onGenerate, onCancel, isEditing = false }) => {
  const [form, setForm] = useState<StudyPlannerForm>(() => ({
    ...initialForm,
    subjectSlugs: [...initialForm.subjectSlugs],
    weakAreas: [...initialForm.weakAreas],
  }));
  const [activeStep, setActiveStep] = useState(0);
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  const [useAiPersonalization, setUseAiPersonalization] = useState(false);

  const today = toLocalDateString(new Date());
  const maxDate = addDaysToDateString(today, 730);
  const organization = getOrganization(form.organizationId);
  const availablePositions = getOrganizationPositions(form.organizationId);
  const positionSubjects = useMemo(() => getSubjectsForPosition(form.organizationId, form.positionId), [form.organizationId, form.positionId]);
  const selectedSubjects = useMemo(() => PLANNER_SUBJECTS.filter((subject) => form.subjectSlugs.includes(subject.slug)), [form.subjectSlugs]);
  const additionalSubjects = selectedSubjects.filter((subject) => !positionSubjects.some((mapped) => mapped.slug === subject.slug));
  const availableExtraSubjects = PLANNER_SUBJECTS.filter((subject) => !positionSubjects.some((mapped) => mapped.slug === subject.slug) && !form.subjectSlugs.includes(subject.slug));
  const previewTopics = useMemo(() => getStudyPlanTopics({
    ...form,
    subjectSlugs: [...new Set([...form.subjectSlugs, ...positionSubjects.map((subject) => subject.slug)])],
  }), [form, positionSubjects]);
  const syllabusRecord = getSyllabusRecord(form);
  const daysUntilExam = daysBetweenDates(today, form.examDate);
  const topicCount = getStudyPlanTopics(form).length;
  const feasibility = getPlanFeasibility(form, today, topicCount);
  const isCustomPosition = form.positionId === 'custom';
  const hasValidPosition = !isCustomPosition || Boolean(form.customPosition.trim());
  const hasValidDate = form.examDate >= today && daysUntilExam <= 730;
  const canContinue = activeStep === 0 ? hasValidPosition : activeStep === 1 ? form.subjectSlugs.length > 0 : activeStep === 2 ? hasValidDate : hasValidDate && form.dailyStudyMinutes >= 30;

  const updateForm = (patch: Partial<StudyPlannerForm>) => setForm((current) => ({ ...current, ...patch }));

  const selectOrganization = (organizationId: string) => {
    const nextOrganization = STUDY_ORGANIZATIONS.find((item) => item.id === organizationId) ?? STUDY_ORGANIZATIONS[0];
    const firstPosition = nextOrganization.positions[0];
    updateForm({
      organizationId,
      positionId: firstPosition.id,
      customPosition: '',
      subjectSlugs: getSubjectsForPosition(organizationId, firstPosition.id).map((subject) => subject.slug),
    });
    setExpandedSubjects([]);
  };

  const selectPosition = (positionId: string) => {
    updateForm({
      positionId,
      customPosition: '',
      subjectSlugs: [...getSubjectsForPosition(form.organizationId, positionId).map((subject) => subject.slug)],
    });
    setExpandedSubjects([]);
  };

  const toggleSubject = (slug: string) => {
    const next = form.subjectSlugs.includes(slug)
      ? form.subjectSlugs.filter((item) => item !== slug)
      : [...form.subjectSlugs, slug];
    updateForm({ subjectSlugs: next });
  };

  const toggleWeakArea = (area: string) => {
    const next = form.weakAreas.includes(area)
      ? form.weakAreas.filter((item) => item !== area)
      : [...form.weakAreas, area];
    updateForm({ weakAreas: next });
  };

  const goNext = () => {
    if (!canContinue) return;
    setActiveStep((step) => Math.min(PAGE_STEPS.length - 1, step + 1));
  };

  const applyPreset = (preset: ExamPreset, autoGenerate = false) => {
    const subjects = getSubjectsForPosition(preset.organizationId, preset.positionId).map((s) => s.slug);
    const updated: StudyPlannerForm = {
      ...form,
      organizationId: preset.organizationId,
      positionId: preset.positionId,
      customPosition: '',
      subjectSlugs: subjects.length ? subjects : form.subjectSlugs,
      examDate: addDaysToDateString(today, preset.days),
      dailyStudyMinutes: preset.dailyMinutes,
      preparationMode: preset.preparationMode,
      targetScore: preset.targetScore,
      weakAreas: [...preset.weakAreas],
    };
    setForm(updated);
    setExpandedSubjects([]);
    if (autoGenerate) {
      if (!getPlanFeasibility(updated, today).feasible) {
        // Let the learner review the capacity warning instead of silently quick-starting an overloaded plan.
        setActiveStep(PAGE_STEPS.length - 1);
        return;
      }
      onGenerate(updated, false);
    }
  };

  const timePreset = DAILY_TIME_PRESETS.find((item) => item.minutes === form.dailyStudyMinutes);
  const isCustomTime = !timePreset;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-900 p-6 text-white shadow-2xl sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-200">
              <Sparkles className="h-4 w-4 text-amber-300" /> Prepare for the Future
            </span>
            <h1 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-5xl">Your exam. Your roadmap.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50/80 sm:text-base">
              Turn a mapped syllabus into daily, actionable study targets, spaced revision and timed practice. Plans are saved on this device; optional account sync and AI tailoring are clearly opt-in.
            </p>
          </div>
          {onCancel && (
            <button onClick={onCancel} className="self-start rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/15 md:self-auto">
              Back to my plan
            </button>
          )}
        </div>
      </section>

      <section className={PANEL} aria-label="Study planner setup">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">{isEditing ? 'Update your roadmap' : 'Smart plan setup'}</p>
            <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">Build a plan that fits your exam</h2>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-right dark:bg-emerald-950/40">
            <div className="text-2xl font-black tabular-nums text-emerald-700 dark:text-emerald-300">
              {form.examDate ? daysUntilExam === 0 ? 'Today' : `${Math.max(0, daysUntilExam)} days` : '—'}
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">until exam day</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4" aria-label="Setup progress">
          {PAGE_STEPS.map((step, index) => {
            const Icon = step.icon;
            const active = index === activeStep;
            const complete = index < activeStep;
            return (
              <button
                key={step.title}
                type="button"
                onClick={() => index <= activeStep && setActiveStep(index)}
                aria-current={active ? 'step' : undefined}
                className={`flex min-w-0 items-center gap-2 rounded-2xl border px-3 py-3 text-left transition ${active ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50' : complete ? 'border-emerald-200 bg-white dark:border-emerald-900 dark:bg-slate-900' : 'border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/50'}`}
              >
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${active ? 'bg-emerald-600 text-white' : complete ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : 'bg-white text-slate-400 dark:bg-slate-800'}`}>
                  {complete ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <span className="min-w-0">
                  <span className={`block truncate text-xs font-black ${active ? 'text-emerald-900 dark:text-emerald-100' : 'text-slate-700 dark:text-slate-300'}`}>{step.title}</span>
                  <span className="block text-[10px] font-semibold text-slate-400">{step.range}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 min-h-[390px]">
          {activeStep === 0 && (
            <div className="space-y-5">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Step 1 · Select organization</p>
                <h3 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">Which exam are you preparing for?</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Choose an organization to load its available positions and matching syllabus map, or select a 1-click popular preset below.</p>
              </div>

              {/* 1-Click Popular Exam Presets for Simplicity */}
              <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-slate-50 p-4 dark:border-emerald-900/60 dark:from-emerald-950/20 dark:via-teal-950/10 dark:to-slate-900/40">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    <Zap className="h-3.5 w-3.5 text-amber-500" /> 1-Click Popular Exam Presets
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Click any preset to auto-configure</span>
                </div>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                  {POPULAR_EXAM_PRESETS.map((preset) => {
                    const isSelected = form.organizationId === preset.organizationId && form.positionId === preset.positionId;
                    return (
                      <div
                        key={preset.id}
                        className={`flex flex-col justify-between rounded-xl border p-3 transition ${
                          isSelected
                            ? 'border-emerald-500 bg-white ring-2 ring-emerald-500/20 dark:border-emerald-500 dark:bg-slate-900'
                            : 'border-slate-200/90 bg-white/90 hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-950/60'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              {preset.badge}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">{preset.days}d · {preset.dailyMinutes}m/d</span>
                          </div>
                          <h4 className="mt-1.5 text-xs font-black text-slate-900 dark:text-white line-clamp-1">{preset.title}</h4>
                          <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">{preset.subtitle}</p>
                        </div>
                        <div className="mt-3 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => applyPreset(preset, false)}
                            className={`flex-1 rounded-lg py-1.5 text-[10px] font-extrabold transition ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-900 dark:bg-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {isSelected ? '✓ Selected' : 'Use Preset'}
                          </button>
                          <button
                            type="button"
                            title="Generate plan immediately with this preset"
                            onClick={() => applyPreset(preset, true)}
                            className="rounded-lg bg-emerald-700 px-2.5 py-1.5 text-[10px] font-black text-white hover:bg-emerald-800"
                          >
                            ⚡ Quick Start
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                  <span>Organization / testing body</span>
                  <select className={INPUT} value={form.organizationId} onChange={(event) => selectOrganization(event.target.value)}>
                    {STUDY_ORGANIZATIONS.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select>
                </label>
                <label className="space-y-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                  <span>Position / test</span>
                  <select className={INPUT} value={form.positionId} onChange={(event) => selectPosition(event.target.value)}>
                    {availablePositions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select>
                </label>
              </div>
              {isCustomPosition && (
                <label className="block max-w-xl space-y-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                  <span>Custom position or test name <span className="text-rose-500">*</span></span>
                  <input className={INPUT} value={form.customPosition} onChange={(event) => updateForm({ customPosition: event.target.value })} placeholder="e.g. Assistant Director screening test" maxLength={100} />
                  {!hasValidPosition && <span className="text-xs font-semibold text-rose-600">Add a name to continue.</span>}
                </label>
              )}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/70 dark:bg-emerald-950/20">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-emerald-700 shadow-sm dark:bg-slate-900 dark:text-emerald-300"><GraduationCap className="h-5 w-5" /></span>
                  <div>
                    <p className="font-extrabold text-slate-900 dark:text-white">{organization.name} · {isCustomPosition && form.customPosition ? form.customPosition : getPositionName(form)}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{positionSubjects.length} MUQABIL subjects are ready to map. You can refine the selection in the next step.</p>
                    {syllabusRecord && (
                      <p className="mt-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                        Matched syllabus record: {syllabusRecord.name} · published {syllabusRecord.published}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="space-y-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Step 3 · Auto-load syllabus</p>
                  <h3 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">Choose the topics in your roadmap</h3>
                  <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">Source-backed exam topics are scheduled by section weight when available; other selected subjects use the MUQABIL topic bank.</p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {form.subjectSlugs.length} subjects · {topicCount} subtopics
                </span>
              </div>

              {syllabusRecord ? (
                <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-4 text-sm dark:border-sky-900/70 dark:bg-sky-950/25">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-extrabold text-sky-950 dark:text-sky-100">Existing syllabus matched: {syllabusRecord.name}</p>
                      <p className="mt-1 text-xs leading-5 text-sky-900/75 dark:text-sky-200/75">Published sections, section weights and listed topics drive the roadmap where they match selected subjects. Confirm this source still applies to your exact test cycle.</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {syllabusRecord.sections.map((section) => <span key={section.name} className="rounded-full border border-sky-200 bg-white/80 px-2.5 py-1 text-[10px] font-extrabold text-sky-900 dark:border-sky-800 dark:bg-slate-900 dark:text-sky-200">{section.name} · {section.percent}%</span>)}
                      </div>
                    </div>
                    <a href={syllabusRecord.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-sky-300 bg-white px-3 py-2 text-xs font-extrabold text-sky-800 hover:bg-sky-100 dark:border-sky-800 dark:bg-slate-900 dark:text-sky-200 dark:hover:bg-slate-800">
                      Open source <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
                  Syllabus topics are mapped from MUQABIL’s existing subject bank. Exact test coverage can vary by post and cycle; verify your current official notice.
                </div>
              )}

              <div className="grid gap-3 md:grid-cols-2">
                {positionSubjects.map((subject) => {
                  const checked = form.subjectSlugs.includes(subject.slug);
                  const expanded = expandedSubjects.includes(subject.slug);
                  const subjectTopics = previewTopics.filter((topic) => topic.subjectSlug === subject.slug);
                  return (
                    <article key={subject.slug} className={`rounded-2xl border p-4 transition ${checked ? 'border-emerald-300 bg-emerald-50/45 dark:border-emerald-900 dark:bg-emerald-950/15' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/30'}`}>
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleSubject(subject.slug)}
                          aria-label={`Include ${subject.name} and all ${subjectTopics.length} mapped topics`}
                          className="mt-1 h-4 w-4 shrink-0 accent-emerald-600"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-extrabold text-slate-900 dark:text-white">{subject.name}</h4>
                              <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">{subjectTopics.length} mapped topics · {subject.totalMcqs.toLocaleString()} practice items in bank</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setExpandedSubjects((current) => expanded ? current.filter((slug) => slug !== subject.slug) : [...current, subject.slug])}
                              aria-expanded={expanded}
                              aria-label={`${expanded ? 'Hide' : 'View'} ${subject.name} subtopics`}
                              className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-emerald-700 dark:hover:bg-slate-800 dark:hover:text-emerald-300"
                            >
                              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </button>
                          </div>
                          {checked && <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300"><Check className="h-3.5 w-3.5" />All {subjectTopics.length} mapped topics are included</p>}
                          {expanded && (
                            <ul className="mt-3 grid gap-1.5 border-t border-slate-200/80 pt-3 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300 sm:grid-cols-2">
                              {subjectTopics.map((topic) => <li key={topic.id} className="flex items-start gap-2"><span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${checked ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} /><span>{topic.subtopic}{topic.sectionName && <span className="ml-1 text-[10px] font-bold text-sky-700 dark:text-sky-300">{topic.sectionName} · {topic.sectionWeight}%</span>}</span></li>)}
                            </ul>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Add a subject outside this position map</h4>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Choose any other existing MUQABIL subject; every linked subtopic will be added.</p>
                  </div>
                  <label className="w-full space-y-1 text-xs font-bold text-slate-600 dark:text-slate-300 sm:max-w-xs">
                    <span>Additional subject</span>
                    <select className={INPUT} value="" onChange={(event) => {
                      const slug = event.target.value;
                      if (slug) updateForm({ subjectSlugs: [...form.subjectSlugs, slug] });
                    }}>
                      <option value="">Choose a subject…</option>
                      {availableExtraSubjects.map((subject) => <option key={subject.slug} value={subject.slug}>{subject.name}</option>)}
                    </select>
                  </label>
                </div>
                {additionalSubjects.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {additionalSubjects.map((subject) => (
                      <button key={subject.slug} type="button" onClick={() => updateForm({ subjectSlugs: form.subjectSlugs.filter((slug) => slug !== subject.slug) })} className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[11px] font-extrabold text-violet-800 hover:bg-violet-100 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-200">
                        {subject.name} · {subject.subtopics.length} linked subtopics <span aria-hidden="true">×</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {!form.subjectSlugs.length && <p className="text-sm font-semibold text-rose-600">Select at least one main topic to continue.</p>}
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Steps 4–6 · Preparation mode, current level & exam date</p>
                <h3 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">How do you want to prepare?</h3>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-200">Preparation mode</h4>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {PREPARATION_MODES.map((mode) => {
                    const active = form.preparationMode === mode.id;
                    return (
                      <button key={mode.id} type="button" aria-pressed={active} onClick={() => updateForm({ preparationMode: mode.id })} className={`rounded-2xl border p-4 text-left transition ${active ? 'border-emerald-500 bg-emerald-50 shadow-sm dark:bg-emerald-950/40' : 'border-slate-200 bg-white hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-950/40'}`}>
                        <span className="flex items-center justify-between gap-2 font-extrabold text-slate-900 dark:text-white"><span>{mode.label}</span>{active && <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />}</span>
                        <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">{mode.description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-200">Current level</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {CURRENT_LEVELS.map((level) => {
                    const active = form.currentLevel === level.id;
                    return (
                      <button key={level.id} type="button" aria-pressed={active} onClick={() => updateForm({ currentLevel: level.id })} className={`rounded-2xl border p-3 text-left transition ${active ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/35' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/40'}`}>
                        <span className={`block text-sm font-extrabold ${active ? 'text-violet-800 dark:text-violet-200' : 'text-slate-900 dark:text-white'}`}>{level.label}</span>
                        <span className="mt-1 block text-[11px] text-slate-500 dark:text-slate-400">{level.description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Quick date presets</span>
                  <span className="text-[11px] text-slate-400">Auto-calculates exam date</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[30, 45, 60, 90, 120].map((days) => {
                    const targetDate = addDaysToDateString(today, days);
                    const isCurrent = form.examDate === targetDate;
                    return (
                      <button
                        key={days}
                        type="button"
                        onClick={() => updateForm({ examDate: targetDate })}
                        className={`rounded-xl border px-3 py-1.5 text-xs font-black transition ${
                          isCurrent
                            ? 'border-emerald-500 bg-emerald-600 text-white shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
                        }`}
                      >
                        +{days} Days
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/50 sm:grid-cols-[1fr_auto] sm:items-end">
                <label className="space-y-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                  <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-emerald-600" /> Exam date</span>
                  <input className={INPUT} type="date" value={form.examDate} min={today} max={maxDate} onChange={(event) => updateForm({ examDate: event.target.value })} />
                  {!hasValidDate && <span className="block text-xs font-semibold text-rose-600">Choose an exam date within the next two years.</span>}
                </label>
                <div className="min-w-36 rounded-2xl border border-emerald-200 bg-white px-4 py-3 dark:border-emerald-900 dark:bg-slate-900">
                  <span className="block text-2xl font-black tabular-nums text-emerald-700 dark:text-emerald-300">{daysUntilExam === 0 ? 'Today' : Math.max(0, daysUntilExam)}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{daysUntilExam === 0 ? 'exam day' : 'days remaining'}</span>
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Steps 7–9 · Daily time, target score & weak areas</p>
                <h3 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">Set a steady, achievable target</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">You can change your plan later if your routine or exam date changes.</p>
              </div>

              <div className="space-y-3">
                <h4 className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-800 dark:text-slate-200"><Clock3 className="h-4 w-4 text-emerald-600" />Daily study time</h4>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-7">
                  {DAILY_TIME_PRESETS.map((option) => {
                    const active = form.dailyStudyMinutes === option.minutes;
                    return (
                      <button key={option.id} type="button" aria-pressed={active} onClick={() => updateForm({ dailyStudyMinutes: option.minutes })} className={`rounded-xl border px-3 py-3 text-sm font-extrabold transition ${active ? 'border-emerald-500 bg-emerald-600 text-white shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200'}`}>
                        {option.label}
                      </button>
                    );
                  })}
                  <button type="button" aria-pressed={isCustomTime} onClick={() => { if (!isCustomTime) updateForm({ dailyStudyMinutes: 90 }); }} className={`rounded-xl border px-3 py-3 text-sm font-extrabold transition ${isCustomTime ? 'border-emerald-500 bg-emerald-600 text-white shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200'}`}>
                    Custom
                  </button>
                </div>
                {isCustomTime && (
                  <label className="block max-w-xs space-y-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    Custom minutes per day (30–720)
                    <div className="flex items-center gap-2">
                      <input className={INPUT} type="number" min={30} max={720} step={15} value={form.dailyStudyMinutes} onChange={(event) => updateForm({ dailyStudyMinutes: Math.max(30, Math.min(720, Number(event.target.value) || 30)) })} />
                      <span className="shrink-0">min</span>
                    </div>
                  </label>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-800 dark:text-slate-200"><Target className="h-4 w-4 text-amber-500" />Target score</h4>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                  {TARGET_SCORE_OPTIONS.map((target) => {
                    const active = form.targetScore === target.id;
                    return (
                      <button key={target.id} type="button" aria-pressed={active} onClick={() => updateForm({ targetScore: target.id })} className={`rounded-2xl border p-3 text-left transition ${active ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/30' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/40'}`}>
                        <span className="block text-sm font-extrabold text-slate-900 dark:text-white">{target.label}</span>
                        <span className="mt-1 block text-[10px] leading-4 text-slate-500 dark:text-slate-400">{target.detail}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-800 dark:text-slate-200"><ListChecks className="h-4 w-4 text-rose-500" />Weak areas <span className="text-xs font-medium text-slate-400">(optional)</span></h4>
                <div className="flex flex-wrap gap-2">
                  {WEAK_AREAS.map((area) => {
                    const active = form.weakAreas.includes(area);
                    return (
                      <button key={area} type="button" aria-pressed={active} onClick={() => toggleWeakArea(area)} className={`rounded-full border px-3.5 py-2 text-xs font-extrabold transition ${active ? 'border-rose-300 bg-rose-100 text-rose-800 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-200' : 'border-slate-200 bg-white text-slate-600 hover:border-rose-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'}`}>
                        {active && <Check className="mr-1 inline h-3.5 w-3.5" />}{getWeakAreaName(area)}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Selected weak areas are prioritised, alongside source-section weights and your quiz results, when they appear in the mapped syllabus.</p>
              </div>

              {form.preparationMode !== 'mock-tests' && (
                <div role="status" className={`rounded-2xl border p-4 text-sm ${feasibility.feasible ? 'border-emerald-200 bg-emerald-50/70 dark:border-emerald-900 dark:bg-emerald-950/20' : 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30'}`}>
                  <p className={`font-extrabold ${feasibility.feasible ? 'text-emerald-950 dark:text-emerald-100' : 'text-amber-950 dark:text-amber-100'}`}>
                    {feasibility.feasible ? 'Coverage fits your current time budget' : 'This is a high-load plan — adjust before you commit'}
                  </p>
                  <p className={`mt-1 text-xs leading-5 ${feasibility.feasible ? 'text-emerald-900/80 dark:text-emerald-200/80' : 'text-amber-900/80 dark:text-amber-200/80'}`}>
                    {feasibility.totalTopics} mapped topics across {feasibility.learningDays} learning days. Your mode and time support about {feasibility.topicsPerDayCapacity} topic{feasibility.topicsPerDayCapacity === 1 ? '' : 's'} per day; this plan needs about {feasibility.requiredTopicsPerDay} and roughly {feasibility.estimatedMinutesPerDay} minutes/day.
                    {!feasibility.feasible && ' The roadmap will still schedule every topic, but some days will exceed your stated time budget.'}
                  </p>
                </div>
              )}

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-violet-200 bg-violet-50/60 p-4 dark:border-violet-900 dark:bg-violet-950/20">
                <input type="checkbox" checked={useAiPersonalization} onChange={(event) => setUseAiPersonalization(event.target.checked)} className="mt-0.5 h-4 w-4 accent-violet-600" />
                <span>
                  <span className="block text-sm font-extrabold text-violet-950 dark:text-violet-100">Add optional Gemini AI personalisation</span>
                  <span className="mt-1 block text-xs leading-5 text-violet-900/75 dark:text-violet-200/75">If checked, your selected exam, date, level, time budget, weak areas and mapped syllabus topics are sent to MUQABIL’s AI service once to add a tailored study strategy. Leave it off for a fully local plan. If AI is unavailable, your roadmap still generates.</span>
                </span>
              </label>

              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 dark:border-emerald-900 dark:from-emerald-950/40 dark:to-teal-950/30 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-emerald-800 dark:text-emerald-300">Ready to generate · Step 10</p>
                  <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{organization.name} · {form.positionId === 'custom' && form.customPosition ? form.customPosition : getPositionName(form)}</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{Math.max(0, daysUntilExam)} days · {selectedSubjects.length} subjects · {topicCount} subtopics · {form.dailyStudyMinutes >= 300 ? '5+ hours' : `${form.dailyStudyMinutes} minutes`} each day</p>
                </div>
                <WandSparkles className="mt-3 h-8 w-8 text-emerald-700 dark:text-emerald-300 sm:mt-0" />
              </div>
            </div>
          )}
        </div>

        <div className="mt-7 flex flex-col-reverse justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            {activeStep > 0 ? (
              <button type="button" onClick={() => setActiveStep((step) => Math.max(0, step - 1))} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-extrabold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"><ArrowLeft className="h-4 w-4" /> Back</button>
            ) : <span className="text-xs font-semibold text-slate-400">Your roadmap is stored locally by default; account sync is optional.</span>}
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            {activeStep < PAGE_STEPS.length - 1 ? (
              <button type="button" disabled={!canContinue} onClick={goNext} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40">Continue <ArrowRight className="h-4 w-4" /></button>
            ) : (
              <button type="button" disabled={!canContinue} onClick={() => onGenerate(form, useAiPersonalization)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-sm font-black text-white shadow-md transition hover:from-emerald-700 hover:to-teal-700 disabled:cursor-not-allowed disabled:opacity-40"><WandSparkles className="h-4 w-4" />Generate Smart Plan</button>
            )}
          </div>
        </div>
      </section>

      <p className="mx-auto max-w-3xl px-2 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
        MUQABIL syllabus mappings are study aids, not official exam notices. Confirm your exact coverage, eligibility and dates with the relevant organization.
      </p>
    </div>
  );
};
