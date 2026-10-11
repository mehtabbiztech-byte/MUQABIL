import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  FlaskConical,
  Flame,
  History,
  Mic,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react';
import {
  INTERVIEW_DAY_CHECKLIST,
  INTERVIEW_DO_DONT,
  INTERVIEW_TRACKS,
} from '../../data/interviewPrepData';
import { INTERVIEW_QUESTIONS, countQuestionsByCategory } from '../../data/interviewQuestionBank';
import {
  clearInterviewSessions,
  readInterviewSessions,
  summariseInterviewHistory,
} from '../../lib/interviewPrep';
import type { InterviewModuleId } from '../../types';

const CHECKLIST_KEY = 'muqabil_interview_checklist_v1';

const readChecklist = (): string[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(CHECKLIST_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
};

export const InterviewReadinessBoard: React.FC<{ onOpenModule: (module: InterviewModuleId) => void }> = ({ onOpenModule }) => {
  const [sessions, setSessions] = useState(() => readInterviewSessions());
  const [checked, setChecked] = useState<string[]>(readChecklist);
  const [activeTrack, setActiveTrack] = useState(INTERVIEW_TRACKS[0].id);

  const summary = useMemo(() => summariseInterviewHistory(sessions), [sessions]);
  const categoryCounts = useMemo(() => countQuestionsByCategory(), []);
  const track = INTERVIEW_TRACKS.find((item) => item.id === activeTrack) || INTERVIEW_TRACKS[0];

  const toggleChecked = (key: string) => {
    setChecked((previous) => {
      const next = previous.includes(key) ? previous.filter((item) => item !== key) : [...previous, key];
      try {
        localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable; keep working in memory */
      }
      return next;
    });
  };

  const checklistTotal = INTERVIEW_DAY_CHECKLIST.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-indigo-300/40 bg-gradient-to-br from-slate-950 via-indigo-950 to-emerald-950 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider">
              <Mic className="h-3.5 w-3.5 text-amber-300" /> Beyond MCQs — the spoken stage
            </span>
            <h1 className="mt-4 font-display text-3xl font-black sm:text-4xl">Interview Preparation Module</h1>
            <p className="mt-3 text-sm leading-6 text-indigo-100">
              Most preparation apps stop at the MCQ. MUQABIL now trains the stage that decides the final merit list: mock interviews
              with a rotating panel, an AI interviewer that cross-questions your own answers, a behavioural self-assessment, and
              criterion-by-criterion feedback on every answer — built for CSS/FPSC, PMS/PPSC, SPSC CCE, STS BTS-05 to 15, NTS-tested
              recruitment and departmental panels.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
              <strong className="block text-2xl font-extrabold text-cyan-300">{INTERVIEW_QUESTIONS.length}</strong>
              <span className="text-slate-300">practice questions</span>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
              <strong className="block text-2xl font-extrabold text-amber-300">{INTERVIEW_TRACKS.length}</strong>
              <span className="text-slate-300">exam formats</span>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
              <strong className="block text-2xl font-extrabold text-emerald-300">{summary.sessions}</strong>
              <span className="text-slate-300">mocks completed</span>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
              <strong className="block text-2xl font-extrabold text-purple-300">
                {summary.sessions ? summary.averageScore : '—'}
              </strong>
              <span className="text-slate-300">average score</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            id: 'mock' as InterviewModuleId,
            title: 'Mock interview room',
            body: 'Rotating panel seats, timed answers, cross-questioning, a full practice report with PDF export.',
            icon: <Mic className="h-5 w-5" />,
            tone: 'from-indigo-600 to-indigo-800',
          },
          {
            id: 'bank' as InterviewModuleId,
            title: 'Question bank & drills',
            body: 'Curated prompts per exam with cross-questions, answer skeletons, expected points and common mistakes.',
            icon: <ClipboardList className="h-5 w-5" />,
            tone: 'from-emerald-600 to-teal-800',
          },
          {
            id: 'personality' as InterviewModuleId,
            title: 'Personality assessment',
            body: 'Six behavioural dimensions, situational judgment scenarios, panel questions to rehearse and a practice plan.',
            icon: <Brain className="h-5 w-5" />,
            tone: 'from-purple-600 to-fuchsia-800',
          },
          {
            id: 'feedback' as InterviewModuleId,
            title: 'Answer feedback lab',
            body: 'Paste any answer and get criterion scores, quoted evidence, missing points and a rewritten opening.',
            icon: <FlaskConical className="h-5 w-5" />,
            tone: 'from-teal-600 to-cyan-800',
          },
        ].map((card) => (
          <button
            key={card.id}
            onClick={() => onOpenModule(card.id)}
            className="group rounded-3xl border border-slate-200 bg-white p-5 text-left transition hover:border-indigo-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 cursor-pointer"
          >
            <span className={`inline-grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${card.tone} text-white`}>
              {card.icon}
            </span>
            <h3 className="mt-3 text-sm font-black text-slate-900 dark:text-white">{card.title}</h3>
            <p className="mt-1.5 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{card.body}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400">
              Open <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </button>
        ))}
      </section>

      {/* Track dossier */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
            <BadgeCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" /> Exam-format dossiers
          </h2>
          <span className="text-[11px] font-bold text-slate-500">Confirm every figure in the current official notice</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {INTERVIEW_TRACKS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTrack(item.id)}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition cursor-pointer ${
                activeTrack === item.id
                  ? 'border-indigo-500 bg-indigo-600 text-white'
                  : 'border-slate-200 text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {item.shortName}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">{track.name}</h3>
              <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{track.commission}</p>
            </div>
            <dl className="space-y-3">
              {[
                ['Who conducts the interview', track.conductedBy],
                ['Stage in the process', track.stageNote],
                ['Panel size', track.panelSize],
                ['Duration', track.durationNote],
                ['Interview weight', track.marksNote],
                ['Qualifying rule', track.qualifyingNote],
                ['Psychological stage', track.psychologicalStage],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">{label}</dt>
                  <dd className="mt-0.5 text-xs leading-5 text-slate-700 dark:text-slate-300">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-[11px] leading-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
              <strong>Source note ({track.lastReviewed}):</strong> {track.sourceNote}{' '}
              <a href={track.officialUrl} target="_blank" rel="noreferrer" className="font-bold underline">
                {track.officialUrl}
              </a>
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Areas this panel probes</h4>
              <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                {track.hotTopics.map((topic) => (
                  <li key={topic} className="text-[11px] leading-5 text-slate-700 dark:text-slate-300">• {topic}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3 dark:border-emerald-900 dark:bg-emerald-950/20">
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">What the panel is scoring</h4>
              <ul className="mt-2 space-y-1">
                {track.panelFocus.map((focus) => (
                  <li key={focus} className="text-[11px] leading-5 text-emerald-900 dark:text-emerald-200">• {focus}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-3 dark:border-blue-900 dark:bg-blue-950/20">
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-blue-800 dark:text-blue-300">Panels notice this etiquette</h4>
              <ul className="mt-2 space-y-1">
                {track.etiquetteTips.map((tip) => (
                  <li key={tip} className="text-[11px] leading-5 text-blue-900 dark:text-blue-200">• {tip}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Documents to carry for this format</h4>
              <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                {track.documentsChecklist.map((item) => (
                  <li key={item} className="text-[11px] leading-5 text-slate-700 dark:text-slate-300">☐ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* History + checklist */}
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
            <History className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /> Your mock-interview history
          </h2>

          {summary.sessions === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-5 text-center dark:border-slate-700">
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">No mock interview completed yet.</p>
              <button
                onClick={() => onOpenModule('mock')}
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-extrabold text-white cursor-pointer"
              >
                <Mic className="h-3.5 w-3.5" /> Run your first 5-question mock
              </button>
            </div>
          ) : (
            <>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
                {[
                  ['Sessions', String(summary.sessions)],
                  ['Average', `${summary.averageScore}/100`],
                  ['Best', `${summary.bestScore}/100`],
                  ['Trend', summary.trend === 'insufficient' ? '—' : summary.trend],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                    <strong className="block text-lg font-black capitalize text-slate-900 dark:text-white">{value}</strong>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3 dark:border-emerald-900 dark:bg-emerald-950/20">
                  <h3 className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    <TrendingUp className="h-3.5 w-3.5" /> Strongest criteria
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {summary.strongestCriteria.map((criterion) => (
                      <li key={criterion.id} className="text-[11px] leading-5 text-emerald-900 dark:text-emerald-200">
                        {criterion.label} — {criterion.average}/100
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-3 dark:border-rose-900 dark:bg-rose-950/20">
                  <h3 className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                    <Flame className="h-3.5 w-3.5" /> Weakest criteria to drill
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {summary.weakestCriteria.map((criterion) => (
                      <li key={criterion.id} className="text-[11px] leading-5 text-rose-900 dark:text-rose-200">
                        {criterion.label} — {criterion.average}/100
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {sessions.slice(0, 5).map((session) => (
                  <li key={session.id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 p-3 text-[11px] dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {INTERVIEW_TRACKS.find((item) => item.id === session.trackId)?.shortName || session.trackId} ·{' '}
                      {session.questionCount} questions
                    </span>
                    <span className="font-black text-slate-900 dark:text-white">{session.overallScore}/100 · {session.band}</span>
                    <span className="text-slate-500">{new Date(session.completedAt).toLocaleDateString('en-GB')}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSessions(clearInterviewSessions())}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Clear history on this device
              </button>
            </>
          )}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
              <CalendarCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" /> Interview-day preparation tracker
            </h2>
            <span className="text-[11px] font-black text-emerald-700 dark:text-emerald-300">
              {checked.filter((key) => key.startsWith('iv-checklist')).length}/{checklistTotal}
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {INTERVIEW_DAY_CHECKLIST.map((group) => (
              <div key={group.id} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                <h3 className="text-xs font-black text-slate-900 dark:text-white">{group.title}</h3>
                <p className="mt-1 text-[10px] leading-4 text-slate-500 dark:text-slate-400">{group.note}</p>
                <ul className="mt-2 space-y-1.5">
                  {group.items.map((item, index) => {
                    const key = `iv-checklist:${group.id}:${index}`;
                    const isChecked = checked.includes(key);
                    return (
                      <li key={key}>
                        <label className="flex cursor-pointer items-start gap-2 text-[11px] leading-5 text-slate-700 dark:text-slate-300">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleChecked(key)}
                            className="mt-0.5 h-3.5 w-3.5"
                          />
                          <span className={isChecked ? 'line-through opacity-60' : ''}>{item}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">
          <h3 className="inline-flex items-center gap-2 text-sm font-black text-emerald-900 dark:text-emerald-200">
            <CheckCircle2 className="h-4 w-4" /> Do
          </h3>
          <ul className="mt-3 space-y-2">
            {INTERVIEW_DO_DONT.do.map((item) => (
              <li key={item} className="text-[11px] leading-5 text-emerald-900 dark:text-emerald-200">• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-rose-200 bg-rose-50/60 p-5 dark:border-rose-900 dark:bg-rose-950/20">
          <h3 className="inline-flex items-center gap-2 text-sm font-black text-rose-900 dark:text-rose-200">
            <XCircle className="h-4 w-4" /> Don’t
          </h3>
          <ul className="mt-3 space-y-2">
            {INTERVIEW_DO_DONT.dont.map((item) => (
              <li key={item} className="text-[11px] leading-5 text-rose-900 dark:text-rose-200">• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="inline-flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
            <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> Question bank coverage
          </h3>
          <ul className="mt-3 space-y-1.5">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <li key={category} className="flex items-center justify-between gap-2 text-[11px] leading-5 text-slate-700 dark:text-slate-300">
                <span>{category.replace(/-/g, ' ')}</span>
                <span className="font-black text-slate-900 dark:text-white">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/40">
        <h3 className="inline-flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> What this module is — and is not
        </h3>
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <ul className="space-y-2 text-[11px] leading-5 text-slate-700 dark:text-slate-300">
            <li>• A practice environment: realistic panel seats, timed answers, cross-questioning and structured feedback.</li>
            <li>• A tracker: your mock scores, weakest criteria and preparation checklist stay on your device.</li>
            <li>• Honest about uncertainty: interview weights, panels and stages change by cycle and by post, so every figure links to the official portal rather than a blog.</li>
            <li>• Useful without AI: the curated bank, the structural analyser, the personality instrument and PDF reports all work offline.</li>
          </ul>
          <ul className="space-y-2 text-[11px] leading-5 text-slate-700 dark:text-slate-300">
            <li>• <strong>Not</strong> a source of official questions, official marks or a predicted interview score.</li>
            <li>• <strong>Not</strong> a psychometric test, and not a substitute for a commission’s own psychological assessment.</li>
            <li>• <strong>Not</strong> affiliated with FPSC, PPSC, SPSC, STS, NTS or any recruiting department.</li>
            <li>• <strong>Not</strong> a fact-checker: automated analysis cannot verify your claims — check every statistic yourself.</li>
          </ul>
        </div>
        <p className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold text-slate-500">
          <Sparkles className="h-3.5 w-3.5" /> Start with a 5-question mock on your own exam format; the report tells you exactly what to fix next.
        </p>
      </section>
    </div>
  );
};
