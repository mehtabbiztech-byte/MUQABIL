import React from 'react';
import { Bot, CheckCircle2, Lightbulb, MessageSquareText, Quote, ShieldCheck, Target } from 'lucide-react';
import type { AnswerAnalysis, CriterionResult, InterviewAnswerFeedback } from '../../lib/interviewPrep';

/** Tone for both practice bands and personality bands. */
export const genericBandTone = (band: string): string => {
  if (/panel strong|strong/i.test(band)) return 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900';
  if (/interview ready|balanced/i.test(band)) return 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900';
  if (/developing/i.test(band)) return 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900';
  return 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900';
};

export const criterionTone = (score: number): { bar: string; text: string; chip: string } => {
  if (score >= 8) return { bar: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300', chip: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' };
  if (score >= 6) return { bar: 'bg-teal-500', text: 'text-teal-700 dark:text-teal-300', chip: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300' };
  if (score >= 4) return { bar: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-300', chip: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' };
  return { bar: 'bg-rose-500', text: 'text-rose-700 dark:text-rose-300', chip: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' };
};

export const ScoreRing: React.FC<{
  score: number;
  band: string;
  caption?: string;
  size?: number;
}> = ({ score, band, caption, size = 132 }) => {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, score));
  const stroke = progress >= 85 ? '#10b981' : progress >= 70 ? '#14b8a6' : progress >= 50 ? '#f59e0b' : '#f43f5e';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={9} className="stroke-slate-200 dark:stroke-slate-800" fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={9}
            stroke={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * progress) / 100}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-slate-900 dark:text-white">{progress}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">/ 100 practice</span>
        </div>
      </div>
      <span className={`rounded-full border px-3 py-1 text-xs font-extrabold ${genericBandTone(band)}`}>{band}</span>
      {caption && <p className="max-w-[220px] text-center text-[11px] leading-5 text-slate-500 dark:text-slate-400">{caption}</p>}
    </div>
  );
};

export const CriterionBarList: React.FC<{
  criteria: CriterionResult[];
  compact?: boolean;
  showActions?: boolean;
}> = ({ criteria, compact = false, showActions = true }) => (
  <div className="space-y-3">
    {criteria.map((criterion) => {
      const tone = criterionTone(criterion.score);
      return (
        <div key={criterion.id} className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="truncate text-xs font-extrabold text-slate-800 dark:text-slate-100">{criterion.label}</span>
              <span className="hidden shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400 sm:inline">
                weight {Math.round(criterion.weight * 100)}%
              </span>
            </div>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-black ${tone.chip}`}>{criterion.score}/10</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${criterion.score * 10}%` }} />
          </div>
          {!compact && (
            <ul className="mt-2 space-y-1">
              {criterion.observations.map((observation) => (
                <li key={observation} className="text-[11px] leading-5 text-slate-600 dark:text-slate-400">• {observation}</li>
              ))}
              {showActions && criterion.score < 8 && criterion.actions.map((action) => (
                <li key={action} className="text-[11px] leading-5 text-amber-700 dark:text-amber-300">→ {action}</li>
              ))}
            </ul>
          )}
        </div>
      );
    })}
  </div>
);

export const AnalysisHonestyNotice: React.FC<{ aiAssisted: boolean }> = ({ aiAssisted }) => (
  <p className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-[11px] leading-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
    <strong>Practice guidance only.</strong>{' '}
    {aiAssisted
      ? 'Scores come from the practice rubric applied by MUQABIL’s AI coach and local structural analyser.'
      : 'Scores come from MUQABIL’s local structural analyser and rubric.'}{' '}
    They are not official marking, not the commission’s own assessment, and not a prediction of your interview marks. Automated analysis cannot judge the accuracy of your facts — verify every factual claim yourself.
  </p>
);

export const AiFeedbackPanel: React.FC<{ feedback: InterviewAnswerFeedback }> = ({ feedback }) => (
  <div className="space-y-4 rounded-3xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-900 dark:bg-indigo-950/20 sm:p-5">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h4 className="inline-flex items-center gap-2 text-sm font-black text-indigo-900 dark:text-indigo-200">
        <Bot className="h-4 w-4" /> AI interviewer feedback
      </h4>
      <span className="rounded-full border border-indigo-300 bg-white px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:border-indigo-800 dark:bg-slate-900 dark:text-indigo-300">
        Practice rubric · not official marking
      </span>
    </div>

    <div className="space-y-3">
      {feedback.criteria.map((criterion) => (
        <div key={criterion.id} className="rounded-2xl border border-indigo-100 bg-white p-3 dark:border-indigo-900/60 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">{criterion.id.replace(/-/g, ' ')}</span>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${criterionTone(criterion.score).chip}`}>{criterion.score}/10</span>
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-700 dark:text-slate-300">{criterion.comment}</p>
          {criterion.evidence && (
            <p className="mt-2 flex gap-1.5 rounded-xl bg-slate-50 p-2 text-[11px] italic leading-5 text-slate-600 dark:bg-slate-950 dark:text-slate-400">
              <Quote className="mt-0.5 h-3 w-3 shrink-0" /> “{criterion.evidence}”
            </p>
          )}
          <p className="mt-2 text-[11px] leading-5 text-indigo-800 dark:text-indigo-300">→ {criterion.fix}</p>
        </div>
      ))}
    </div>

    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-emerald-200 bg-white p-3 dark:border-emerald-900 dark:bg-slate-900">
        <h5 className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5" /> What worked
        </h5>
        <ul className="mt-2 space-y-1">
          {feedback.strengths.map((item) => <li key={item} className="text-[11px] leading-5 text-slate-700 dark:text-slate-300">• {item}</li>)}
          {!feedback.strengths.length && <li className="text-[11px] text-slate-500">Nothing flagged yet — rerun after applying the fixes.</li>}
        </ul>
      </div>
      <div className="rounded-2xl border border-rose-200 bg-white p-3 dark:border-rose-900 dark:bg-slate-900">
        <h5 className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-800 dark:text-rose-300">
          <Target className="h-3.5 w-3.5" /> Missing from your answer
        </h5>
        <ul className="mt-2 space-y-1">
          {feedback.missingPoints.map((item) => <li key={item} className="text-[11px] leading-5 text-slate-700 dark:text-slate-300">• {item}</li>)}
          {!feedback.missingPoints.length && <li className="text-[11px] text-slate-500">No major gaps listed.</li>}
        </ul>
      </div>
    </div>

    <div className="rounded-2xl border border-indigo-200 bg-white p-3 dark:border-indigo-900 dark:bg-slate-900">
      <h5 className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-900 dark:text-indigo-200">
        <Lightbulb className="h-3.5 w-3.5" /> A stronger opening
      </h5>
      <p className="mt-2 text-xs leading-6 text-slate-700 dark:text-slate-300">{feedback.modelOpening}</p>
    </div>

    <div className="rounded-2xl border border-purple-200 bg-white p-3 dark:border-purple-900 dark:bg-slate-900">
      <h5 className="inline-flex items-center gap-1.5 text-xs font-extrabold text-purple-900 dark:text-purple-200">
        <MessageSquareText className="h-3.5 w-3.5" /> The panel’s next cross-question
      </h5>
      <p className="mt-2 text-xs leading-6 text-slate-700 dark:text-slate-300">“{feedback.followUp}”</p>
    </div>

    <p className="inline-flex items-start gap-2 text-[11px] leading-5 text-indigo-900/80 dark:text-indigo-300">
      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {feedback.panelNote}
    </p>
  </div>
);

export const FlagsList: React.FC<{ flags: string[] }> = ({ flags }) => {
  if (!flags.length) return null;
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-3 dark:border-rose-900 dark:bg-rose-950/20">
      <h5 className="text-xs font-extrabold text-rose-800 dark:text-rose-300">Instant signals in your answer</h5>
      <ul className="mt-2 space-y-1">
        {flags.map((flag) => <li key={flag} className="text-[11px] leading-5 text-rose-900 dark:text-rose-200">• {flag}</li>)}
      </ul>
    </div>
  );
};

export const AnalysisSummaryPanel: React.FC<{ analysis: AnswerAnalysis }> = ({ analysis }) => (
  <div className="grid gap-4 lg:grid-cols-[200px_1fr]">
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <ScoreRing
        score={analysis.overallScore}
        band={analysis.band}
        caption={`${analysis.wordCount} words · about ${analysis.estimatedSeconds}s of speech (target ${analysis.targetSeconds}s)`}
        size={116}
      />
    </div>
    <div className="space-y-3">
      <CriterionBarList criteria={analysis.criteria} />
      <FlagsList flags={analysis.flags} />
    </div>
  </div>
);
