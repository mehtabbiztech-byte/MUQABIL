import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Brain,
  ClipboardList,
  CheckCircle2,
  ChevronRight,
  Download,
  Info,
  RotateCcw,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import {
  LIKERT_ITEMS,
  LIKERT_LABELS,
  PERSONALITY_DIMENSIONS,
  SITUATIONAL_ITEMS,
} from '../../data/interviewPrepData';
import {
  personalityBandFor,
  readPersonalityResult,
  savePersonalityResult,
  scorePersonalityAssessment,
  type PersonalityResult,
} from '../../lib/interviewPrep';
import { exportPersonalityProfileToPdf } from '../../lib/exportUtils';
import { useApp } from '../../context/AppContext';
import { ScoreRing } from './InterviewScorecard';

type Stage = 'intro' | 'likert' | 'situational' | 'result';

const bandChip = (band: string): string => {
  if (band === 'Strong') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
  if (band === 'Balanced') return 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300';
  return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
};

export const PersonalityAssessment: React.FC = () => {
  const { userProfile, addLearningPoints } = useApp();
  const [stage, setStage] = useState<Stage>('intro');
  const [likert, setLikert] = useState<Record<string, number>>({});
  const [situational, setSituational] = useState<Record<string, string>>({});
  const [result, setResult] = useState<PersonalityResult | null>(() => readPersonalityResult());
  const [error, setError] = useState<string | null>(null);

  const answeredCount = Object.keys(likert).length;
  const progress = Math.round((answeredCount / LIKERT_ITEMS.length) * 100);

  const dimensionPreview = useMemo(
    () => PERSONALITY_DIMENSIONS.map((dimension) => ({
      ...dimension,
      items: LIKERT_ITEMS.filter((item) => item.dimension === dimension.id).length,
    })),
    []
  );

  const generate = () => {
    try {
      const next = scorePersonalityAssessment({ likert, situational });
      savePersonalityResult(next);
      setResult(next);
      setError(null);
      setStage('result');
      addLearningPoints(20);
    } catch (assessmentError) {
      setError((assessmentError as Error).message);
      setStage('likert');
    }
  };

  const restart = () => {
    setLikert({});
    setSituational({});
    setError(null);
    setStage('likert');
  };

  if (stage === 'intro') {
    return (
      <section className="space-y-5">
        <div className="overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider">
                <Brain className="h-3.5 w-3.5 text-amber-300" /> Personality & suitability self-assessment
              </span>
              <h2 className="mt-4 font-display text-2xl font-black sm:text-3xl">
                Practise the behavioural half of the interview
              </h2>
              <p className="mt-3 text-sm leading-6 text-purple-100">
                {LIKERT_ITEMS.length} statements and {SITUATIONAL_ITEMS.length} situational scenarios across six dimensions that
                psychological and behavioural panels actually probe: composure, integrity, leadership, teamwork, communication and
                service motivation. You get a practice profile, the panel questions to rehearse, and a two-week plan.
              </p>
            </div>
            {result && <ScoreRing score={result.overallIndex} band={personalityBandFor(result.overallIndex)} caption={`Previous profile · ${new Date(result.completedAt).toLocaleDateString('en-GB')}`} />}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-[11px] leading-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
          <strong className="inline-flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5" /> Read this before you start</strong>
          <p className="mt-1">
            This is a self-reflection instrument written for interview practice. It is <strong>not</strong> a standardised
            psychometric test, it does not reproduce any commission’s psychological assessment, and no result is shared with any
            authority. Results are stored in this browser only, and a low index is a prompt for practice — not a diagnosis, a label
            or a prediction.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dimensionPreview.map((dimension) => (
            <div key={dimension.id} className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">{dimension.name}</h3>
              <p className="mt-1.5 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{dimension.description}</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                {dimension.items} statements · 1 scenario
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setStage('likert')}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-purple-500 cursor-pointer"
          >
            Start the self-assessment <ChevronRight className="h-4 w-4" />
          </button>
          {result && (
            <button
              onClick={() => setStage('result')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
            >
              View my saved profile
            </button>
          )}
        </div>
      </section>
    );
  }

  if (stage === 'likert') {
    return (
      <section className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Part 1 of 2 — how you actually behave</h2>
            <span className="text-xs font-black text-purple-700 dark:text-purple-300">{answeredCount}/{LIKERT_ITEMS.length} answered</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full rounded-full bg-purple-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
            Answer as the person who walked into the interview room last time, not as the person you intend to become. Some
            statements are worded in the opposite direction on purpose — read each one carefully.
          </p>
        </div>

        <div className="space-y-3">
          {LIKERT_ITEMS.map((item, index) => {
            const dimension = PERSONALITY_DIMENSIONS.find((entry) => entry.id === item.dimension);
            return (
              <div key={item.id} className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="max-w-3xl text-sm font-bold leading-6 text-slate-900 dark:text-white">
                    <span className="mr-2 text-[11px] font-black text-purple-600 dark:text-purple-400">{index + 1}.</span>
                    {item.text}
                  </p>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {dimension?.short}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-5 gap-1.5">
                  {LIKERT_LABELS.map((label, labelIndex) => {
                    const value = labelIndex + 1;
                    const selected = likert[item.id] === value;
                    return (
                      <button
                        key={label}
                        onClick={() => setLikert((previous) => ({ ...previous, [item.id]: value }))}
                        className={`rounded-xl border px-1.5 py-2 text-[10px] font-bold leading-4 transition cursor-pointer ${
                          selected
                            ? 'border-purple-500 bg-purple-600 text-white'
                            : 'border-slate-200 text-slate-600 hover:border-purple-300 dark:border-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {error && (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-800 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-200">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setStage('situational')}
            disabled={answeredCount < LIKERT_ITEMS.length}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-purple-500 disabled:opacity-50 cursor-pointer"
          >
            Continue to the scenarios <ChevronRight className="h-4 w-4" />
          </button>
          <span className="self-center text-[11px] font-bold text-slate-500">
            {answeredCount < LIKERT_ITEMS.length
              ? `${LIKERT_ITEMS.length - answeredCount} statement(s) still unanswered`
              : 'All statements answered'}
          </span>
        </div>
      </section>
    );
  }

  if (stage === 'situational') {
    const answeredScenarios = Object.keys(situational).length;
    return (
      <section className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Part 2 of 2 — situational judgment</h2>
            <span className="text-xs font-black text-purple-700 dark:text-purple-300">{answeredScenarios}/{SITUATIONAL_ITEMS.length} answered</span>
          </div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
            Choose what you would <strong>actually</strong> do under the rules of public service, not the most impressive-sounding
            option. Each choice is reviewed against a recommended practice option with the reasoning shown at the end. Optional, but
            the profile is far more useful with it.
          </p>
        </div>

        <div className="space-y-4">
          {SITUATIONAL_ITEMS.map((item, index) => (
            <div key={item.id} className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-bold leading-6 text-slate-900 dark:text-white">
                <span className="mr-2 text-[11px] font-black text-purple-600 dark:text-purple-400">Scenario {index + 1}.</span>
                {item.scenario}
              </p>
              <div className="mt-3 space-y-2">
                {item.options.map((option) => {
                  const selected = situational[item.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSituational((previous) => ({ ...previous, [item.id]: option.id }))}
                      className={`w-full rounded-2xl border p-3 text-left text-xs leading-5 transition cursor-pointer ${
                        selected
                          ? 'border-purple-500 bg-purple-50 font-bold text-purple-900 dark:bg-purple-950/30 dark:text-purple-100'
                          : 'border-slate-200 text-slate-700 hover:border-purple-300 dark:border-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={generate}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-purple-500 cursor-pointer"
          >
            <Brain className="h-4 w-4" /> Generate my practice profile
          </button>
          <button
            onClick={() => setStage('likert')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
          >
            Back to the statements
          </button>
        </div>
      </section>
    );
  }

  if (!result) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">No profile yet.</p>
        <button onClick={restart} className="mt-3 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-extrabold text-white cursor-pointer">
          Take the assessment
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div className="overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider">
              <Brain className="h-3.5 w-3.5 text-amber-300" /> Practice profile
            </span>
            <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl">Your interview suitability profile</h2>
            <p className="mt-2 text-sm leading-6 text-purple-100">
              Completed {new Date(result.completedAt).toLocaleString('en-GB')}. Treat this as a coaching snapshot: the dimension
              indices move when your habits move, so re-run it after two weeks of deliberate practice.
            </p>
          </div>
          <ScoreRing score={result.overallIndex} band={result.band} caption="Self-assessment index (80% statements + 20% situational)" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {result.dimensions.map((dimension) => (
          <div key={dimension.id} className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">{dimension.name}</h3>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black ${bandChip(dimension.band)}`}>{dimension.band}</span>
            </div>
            <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              {dimension.index}
              <span className="text-xs font-bold text-slate-400">/100</span>
            </p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className={`h-full rounded-full ${dimension.index >= 68 ? 'bg-emerald-500' : dimension.index >= 48 ? 'bg-teal-500' : 'bg-amber-500'}`}
                style={{ width: `${dimension.index}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] leading-5 text-slate-600 dark:text-slate-400">{dimension.summary}</p>
            <p className="mt-2 rounded-xl bg-amber-50 p-2 text-[11px] leading-5 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
              <Target className="mr-1 inline h-3 w-3" /> {dimension.action}
            </p>
            <p className="mt-2 rounded-xl bg-purple-50 p-2 text-[11px] leading-5 text-purple-900 dark:bg-purple-950/30 dark:text-purple-200">
              <strong>Panel question:</strong> {dimension.panelQuestion}
            </p>
            <ul className="mt-2 space-y-1">
              {dimension.followUps.map((followUp) => (
                <li key={followUp} className="text-[11px] leading-5 text-slate-500 dark:text-slate-400">→ {followUp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">
          <h3 className="inline-flex items-center gap-2 text-sm font-black text-emerald-900 dark:text-emerald-200">
            <CheckCircle2 className="h-4 w-4" /> Strength anchors to mention in the interview
          </h3>
          <ul className="mt-3 space-y-2">
            {result.strengths.map((item) => (
              <li key={item} className="text-xs leading-5 text-emerald-900 dark:text-emerald-200">• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900 dark:bg-amber-950/20">
          <h3 className="inline-flex items-center gap-2 text-sm font-black text-amber-900 dark:text-amber-200">
            <Target className="h-4 w-4" /> Growth areas
          </h3>
          <ul className="mt-3 space-y-2">
            {result.growthAreas.map((item) => (
              <li key={item} className="text-xs leading-5 text-amber-900 dark:text-amber-200">• {item}</li>
            ))}
          </ul>
          <h3 className="mt-4 inline-flex items-center gap-2 text-sm font-black text-amber-900 dark:text-amber-200">
            <ClipboardList className="h-4 w-4" /> Two-week practice plan
          </h3>
          <ol className="mt-3 space-y-2">
            {result.practicePlan.map((item, index) => (
              <li key={item} className="text-xs leading-5 text-amber-900 dark:text-amber-200">
                <strong>{index + 1}.</strong> {item}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {result.situationalReview.length > 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="inline-flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
              <Users className="h-4 w-4" /> Situational judgment review
            </h3>
            {result.situationalAlignment !== null && (
              <span className="rounded-full bg-teal-100 px-3 py-1 text-[11px] font-black text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                {result.situationalAlignment}% alignment with recommended practice options
              </span>
            )}
          </div>
          <div className="mt-4 space-y-3">
            {result.situationalReview.map((item) => (
              <details key={item.itemId} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                <summary className="cursor-pointer text-xs font-extrabold text-slate-800 dark:text-slate-100">{item.scenario}</summary>
                <div className="mt-2 space-y-2 text-[11px] leading-5">
                  <p className="text-slate-600 dark:text-slate-300"><strong>Your choice:</strong> {item.chosenOption}</p>
                  <p className="text-emerald-700 dark:text-emerald-300"><strong>Recommended practice choice:</strong> {item.bestOption}</p>
                  <p className="text-slate-500 dark:text-slate-400"><strong>Why:</strong> {item.rationale}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-[11px] leading-5 text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
        <Info className="mr-1 inline h-3.5 w-3.5" />
        MUQABIL’s self-assessment is a coaching aid. Commissions that conduct psychological assessment use their own standardised
        instruments administered by their own psychologists; nothing here predicts or substitutes for that process.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => exportPersonalityProfileToPdf(result, userProfile.name)}
          className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-purple-500 cursor-pointer"
        >
          <Download className="h-4 w-4" /> Download profile (PDF)
        </button>
        <button
          onClick={restart}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" /> Retake the assessment
        </button>
        <span className="inline-flex items-center gap-2 self-center text-[11px] font-bold text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5" /> Stored on this device only
        </span>
      </div>
    </section>
  );
};
