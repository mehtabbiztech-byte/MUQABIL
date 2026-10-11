import React, { useMemo, useState } from 'react';
import {
  BookOpenCheck,
  Clock3,
  Filter,
  Lightbulb,
  Link2,
  MessageSquareText,
  Search,
  Sparkles,
  Target,
  Volume2,
  Wand2,
} from 'lucide-react';
import {
  INTERVIEW_CATEGORIES,
  INTERVIEW_TRACKS,
  getInterviewTrack,
  type InterviewCategoryId,
  type InterviewDifficulty,
  type InterviewTrackId,
} from '../../data/interviewPrepData';
import { INTERVIEW_QUESTIONS, questionsForTrack } from '../../data/interviewQuestionBank';
import { useSpeechTools } from './useSpeechTools';

interface InterviewQuestionBankProps {
  onPractiseQuestion?: (questionId: string) => void;
  onAnalyseQuestion?: (questionId: string) => void;
}

const DIFFICULTIES: InterviewDifficulty[] = ['Warm-up', 'Standard', 'Stress'];

export const InterviewQuestionBank: React.FC<InterviewQuestionBankProps> = ({
  onPractiseQuestion,
  onAnalyseQuestion,
}) => {
  const speech = useSpeechTools();
  const [trackId, setTrackId] = useState<InterviewTrackId>('css');
  const [category, setCategory] = useState<InterviewCategoryId | 'all'>('all');
  const [difficulty, setDifficulty] = useState<InterviewDifficulty | 'all'>('all');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const track = getInterviewTrack(trackId);
  const trackQuestions = useMemo(() => questionsForTrack(trackId), [trackId]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return trackQuestions.filter((question) => {
      if (category !== 'all' && question.category !== category) return false;
      if (difficulty !== 'all' && question.difficulty !== difficulty) return false;
      if (!needle) return true;
      return `${question.prompt} ${question.expectedPoints.join(' ')} ${question.followUps.join(' ')}`
        .toLowerCase()
        .includes(needle);
    });
  }, [trackQuestions, category, difficulty, query]);

  const counts = useMemo(() => {
    const map = new Map<InterviewCategoryId, number>();
    for (const question of trackQuestions) {
      map.set(question.category, (map.get(question.category) || 0) + 1);
    }
    return map;
  }, [trackQuestions]);

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
              <BookOpenCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /> Curated interview question bank
            </h2>
            <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-500 dark:text-slate-400">
              {INTERVIEW_QUESTIONS.length} practice prompts across {INTERVIEW_CATEGORIES.length} areas, each with the cross-questions a
              panel uses, a structure skeleton and the two mistakes that damage otherwise good answers. These are practice questions
              written for MUQABIL — not a leaked or official paper.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] font-bold">
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {trackQuestions.length} for {track.shortName}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {visible.length} shown
            </span>
          </div>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-4">
          <label className="relative block lg:col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a question, a topic or a key point…"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs text-slate-900 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
          <label className="relative block">
            <Filter className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <select
              value={trackId}
              onChange={(event) => setTrackId(event.target.value as InterviewTrackId)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            >
              {INTERVIEW_TRACKS.map((item) => (
                <option key={item.id} value={item.id}>{item.shortName} — {item.commission}</option>
              ))}
            </select>
          </label>
          <div className="flex gap-1.5">
            {(['all', ...DIFFICULTIES] as (InterviewDifficulty | 'all')[]).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`flex-1 rounded-xl border px-2 py-2 text-[11px] font-bold transition cursor-pointer ${
                  difficulty === level
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200'
                    : 'border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300'
                }`}
              >
                {level === 'all' ? 'Any' : level}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <button
            onClick={() => setCategory('all')}
            className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition cursor-pointer ${
              category === 'all'
                ? 'border-indigo-500 bg-indigo-600 text-white'
                : 'border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300'
            }`}
          >
            All areas
          </button>
          {INTERVIEW_CATEGORIES.map((item) => (
            <button
              key={item.id}
              onClick={() => setCategory(item.id)}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition cursor-pointer ${
                category === item.id
                  ? 'border-indigo-500 bg-indigo-600 text-white'
                  : 'border-slate-200 text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {item.name} <span className="opacity-70">({counts.get(item.id) || 0})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {visible.map((question) => {
          const open = openId === question.id;
          const categoryName = INTERVIEW_CATEGORIES.find((item) => item.id === question.category)?.name || question.category;
          return (
            <article key={question.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <button
                onClick={() => setOpenId(open ? null : question.id)}
                className="flex w-full items-start justify-between gap-4 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">{categoryName}</span>
                    <span className={`rounded-full px-2 py-0.5 ${
                      question.difficulty === 'Stress'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : question.difficulty === 'Standard'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>{question.difficulty}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <Clock3 className="mr-1 inline h-3 w-3" />{question.targetSeconds}s
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {question.tracks === 'all' ? 'All formats' : `${question.tracks.length} formats`}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-6 text-slate-900 dark:text-white">{question.prompt}</h3>
                </div>
                <span className="shrink-0 text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400">{open ? 'Hide' : 'Open'}</span>
              </button>

              {open && (
                <div className="space-y-4 border-t border-slate-200 p-4 dark:border-slate-800">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3 dark:border-emerald-900 dark:bg-emerald-950/20">
                      <h4 className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                        <Target className="h-3.5 w-3.5" /> What the panel listens for
                      </h4>
                      <ul className="mt-2 space-y-1">
                        {question.expectedPoints.map((point) => (
                          <li key={point} className="text-[11px] leading-5 text-emerald-900 dark:text-emerald-200">• {point}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-3 dark:border-blue-900 dark:bg-blue-950/20">
                      <h4 className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                        <Lightbulb className="h-3.5 w-3.5" /> Answer skeleton
                      </h4>
                      <ol className="mt-2 space-y-1">
                        {question.structureHint.map((step, index) => (
                          <li key={step} className="text-[11px] leading-5 text-blue-900 dark:text-blue-200">
                            {index + 1}. {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-3 dark:border-purple-900 dark:bg-purple-950/20">
                      <h4 className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-purple-800 dark:text-purple-300">
                        <MessageSquareText className="h-3.5 w-3.5" /> Expected cross-questions
                      </h4>
                      <ul className="mt-2 space-y-1">
                        {question.followUps.map((followUp) => (
                          <li key={followUp} className="text-[11px] leading-5 text-purple-900 dark:text-purple-200">→ {followUp}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-3 dark:border-rose-900 dark:bg-rose-950/20">
                      <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-rose-800 dark:text-rose-300">Common mistakes</h4>
                      <ul className="mt-2 space-y-1">
                        {question.commonMistakes.map((mistake) => (
                          <li key={mistake} className="text-[11px] leading-5 text-rose-900 dark:text-rose-200">✗ {mistake}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {question.sourceRef && (
                    <a
                      href={question.sourceRef.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-600 underline decoration-dotted dark:text-slate-300"
                    >
                      <Link2 className="h-3.5 w-3.5" /> Factual reference: {question.sourceRef.label}
                    </a>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => speech.speak(question.id, question.prompt)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2 text-[11px] font-extrabold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <Volume2 className="h-3.5 w-3.5" /> {speech.speakingId === question.id ? 'Stop' : 'Hear it'}
                    </button>
                    <button
                      onClick={() => onAnalyseQuestion?.(question.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-3 py-2 text-[11px] font-extrabold text-white transition hover:bg-teal-500 cursor-pointer"
                    >
                      <Wand2 className="h-3.5 w-3.5" /> Analyse my answer to this
                    </button>
                    <button
                      onClick={() => onPractiseQuestion?.(question.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2 text-[11px] font-extrabold text-white transition hover:bg-indigo-500 cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5" /> Practise under panel pressure
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}

        {!visible.length && (
          <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700">
            No question matches those filters. Clear the search or choose another area.
          </div>
        )}
      </div>
    </section>
  );
};
