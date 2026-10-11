import React, { useEffect, useMemo, useState } from 'react';
import {
  Bot,
  Eraser,
  FlaskConical,
  Loader2,
  Mic,
  MicOff,
  PenLine,
  Search,
  Sparkles,
  Target,
  Wand2,
} from 'lucide-react';
import {
  INTERVIEW_TRACKS,
  getInterviewTrack,
  type InterviewTrackId,
} from '../../data/interviewPrepData';
import { INTERVIEW_QUESTIONS, getInterviewQuestion } from '../../data/interviewQuestionBank';
import {
  analyseInterviewAnswer,
  buildImprovementPlan,
  type AnswerAnalysis,
  type InterviewAnswerFeedback,
} from '../../lib/interviewPrep';
import { requestInterviewFeedback } from '../../lib/interviewCoach';
import { useApp } from '../../context/AppContext';
import { AiFeedbackPanel, AnalysisHonestyNotice, AnalysisSummaryPanel } from './InterviewScorecard';
import { useSpeechTools } from './useSpeechTools';

interface AnswerFeedbackLabProps {
  initialQuestionId?: string | null;
}

export const AnswerFeedbackLab: React.FC<AnswerFeedbackLabProps> = ({ initialQuestionId }) => {
  const { addLearningPoints } = useApp();
  const speech = useSpeechTools();
  const [trackId, setTrackId] = useState<InterviewTrackId>('css');
  const [questionId, setQuestionId] = useState<string>(initialQuestionId || INTERVIEW_QUESTIONS[0].id);
  const [customQuestion, setCustomQuestion] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [answer, setAnswer] = useState('');
  const [targetSeconds, setTargetSeconds] = useState(120);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [analysis, setAnalysis] = useState<AnswerAnalysis | null>(null);
  const [feedback, setFeedback] = useState<InterviewAnswerFeedback | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const track = getInterviewTrack(trackId);
  const selectedQuestion = useMemo(() => getInterviewQuestion(questionId), [questionId]);
  const questionText = useCustom ? customQuestion.trim() : selectedQuestion?.prompt || '';

  useEffect(() => {
    if (initialQuestionId) {
      setQuestionId(initialQuestionId);
      setUseCustom(false);
    }
  }, [initialQuestionId]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const base = INTERVIEW_QUESTIONS.filter(
      (question) => question.tracks === 'all' || question.tracks.includes(trackId)
    );
    const matches = needle
      ? base.filter((question) => question.prompt.toLowerCase().includes(needle))
      : base;
    const listed = matches.slice(0, 40);
    // The currently selected question must always stay selectable, even when the
    // search text or the chosen exam format would otherwise hide it.
    if (selectedQuestion && !listed.some((question) => question.id === selectedQuestion.id)) {
      return [selectedQuestion, ...listed];
    }
    return listed;
  }, [query, trackId, selectedQuestion]);

  const words = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const estimatedSeconds = Math.round((words / 135) * 60);

  const runAnalysis = async () => {
    if (answer.trim().length < 20) {
      setError('Write or dictate at least 20 characters so there is something to assess.');
      return;
    }
    if (!questionText) {
      setError('Choose a bank question or type the question you are answering.');
      return;
    }
    setError(null);
    const local = analyseInterviewAnswer({
      answer,
      question: useCustom ? null : selectedQuestion,
      targetSeconds,
    });
    setAnalysis(local);
    setFeedback(null);
    addLearningPoints(4);

    if (!aiEnabled) return;
    setLoadingAi(true);
    try {
      const result = await requestInterviewFeedback({
        trackId,
        personaId: 'chairperson',
        category: useCustom ? 'intro-motivation' : selectedQuestion?.category || 'intro-motivation',
        question: questionText,
        answer,
        targetSeconds,
      });
      setFeedback(result);
    } catch (aiError) {
      setError(`${(aiError as Error).message} The structural analysis above is complete and saved on this device.`);
    } finally {
      setLoadingAi(false);
    }
  };

  const clearAll = () => {
    setAnswer('');
    setAnalysis(null);
    setFeedback(null);
    setError(null);
  };

  const improvementPlan = analysis ? buildImprovementPlan(analysis, 3) : [];

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
          <FlaskConical className="h-5 w-5 text-teal-600 dark:text-teal-400" /> Answer feedback lab
        </h2>
        <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-500 dark:text-slate-400">
          Paste any interview answer — one you wrote, or one you dictated — and get the same treatment the mock panel gives:
          structural analysis against the seven practice criteria, optional AI panel comments, real quoted evidence and a fixed
          list of what was missing.
        </p>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">The question</h3>
              <button
                onClick={() => {
                  setUseCustom((value) => !value);
                  setAnalysis(null);
                  setFeedback(null);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
              >
                <PenLine className="h-3.5 w-3.5" /> {useCustom ? 'Pick from bank' : 'Type my own'}
              </button>
            </div>

            {useCustom ? (
              <textarea
                value={customQuestion}
                onChange={(event) => setCustomQuestion(event.target.value)}
                rows={3}
                placeholder="Type the exact question you were asked, e.g. “Why do you want to join the police service?”"
                className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-xs leading-6 text-slate-800 outline-none focus:border-teal-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
            ) : (
              <>
                <label className="relative block">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search the question bank…"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs text-slate-900 outline-none focus:border-teal-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>
                <select
                  value={questionId}
                  onChange={(event) => {
                    setQuestionId(event.target.value);
                    setAnalysis(null);
                    setFeedback(null);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-teal-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  {filtered.map((question) => (
                    <option key={question.id} value={question.id}>
                      [{question.difficulty}] {question.prompt.slice(0, 110)}
                      {question.prompt.length > 110 ? '…' : ''}
                    </option>
                  ))}
                </select>
                {selectedQuestion && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3 dark:border-emerald-900 dark:bg-emerald-950/20">
                    <h4 className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                      <Target className="h-3.5 w-3.5" /> What the panel listens for
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {selectedQuestion.expectedPoints.map((point) => (
                        <li key={point} className="text-[11px] leading-5 text-emerald-900 dark:text-emerald-200">• {point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            <div className="grid gap-2 sm:grid-cols-2">
              <label className="block">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Answer target</span>
                <select
                  value={targetSeconds}
                  onChange={(event) => setTargetSeconds(Number(event.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  {[45, 60, 90, 120, 180].map((seconds) => (
                    <option key={seconds} value={seconds}>{seconds} seconds</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Exam format</span>
                <select
                  value={trackId}
                  onChange={(event) => setTrackId(event.target.value as InterviewTrackId)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  {INTERVIEW_TRACKS.map((item) => (
                    <option key={item.id} value={item.id}>{item.shortName}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Your answer</h3>
              <div className="flex items-center gap-2">
                {speech.dictationSupported && (
                  <button
                    onClick={() => speech.toggleDictation((text) => setAnswer((previous) => (previous ? `${previous} ${text}` : text)))}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-extrabold transition cursor-pointer ${
                      speech.isListening ? 'bg-rose-600 text-white' : 'border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {speech.isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                    {speech.isListening ? 'Stop' : 'Dictate'}
                  </button>
                )}
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3 py-1.5 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Eraser className="h-3.5 w-3.5" /> Clear
                </button>
              </div>
            </div>
            <textarea
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              rows={12}
              placeholder="Paste or dictate your answer. Write it the way you would speak it: position first, then reasons, one concrete example and a closing line."
              className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm leading-7 text-slate-800 outline-none focus:border-teal-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-slate-500">
              <span>{words} words · about {estimatedSeconds}s of speech · target {targetSeconds}s</span>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={aiEnabled} onChange={(event) => setAiEnabled(event.target.checked)} className="h-4 w-4" />
                AI panel comments
              </label>
            </div>

            <button
              onClick={runAnalysis}
              disabled={loadingAi}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-teal-500 disabled:opacity-60 cursor-pointer"
            >
              {loadingAi ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              Analyse my answer
            </button>
            {error && (
              <p className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-[11px] leading-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>

      {analysis && (
        <>
          <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Structural analysis</h3>
              {loadingAi && (
                <span className="inline-flex items-center gap-2 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Asking the AI panel for criterion comments…
                </span>
              )}
            </div>
            <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
              Comparing against: <strong>{questionText.slice(0, 160)}{questionText.length > 160 ? '…' : ''}</strong>{' '}
              ({track.shortName} format)
            </p>
            <div className="mt-4">
              <AnalysisSummaryPanel analysis={analysis} />
            </div>
          </div>

          {feedback && <AiFeedbackPanel feedback={feedback} />}

          <div className="rounded-3xl border border-teal-200 bg-teal-50/60 p-5 dark:border-teal-900 dark:bg-teal-950/20">
            <h3 className="inline-flex items-center gap-2 text-sm font-black text-teal-900 dark:text-teal-200">
              <Sparkles className="h-4 w-4" /> Your drilling plan for this answer
            </h3>
            <ul className="mt-3 space-y-2">
              {improvementPlan.map((drill) => (
                <li key={drill} className="text-xs leading-5 text-teal-900 dark:text-teal-200">• {drill}</li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-5 text-teal-900/80 dark:text-teal-300">
              Practise the thirty-second version of this answer, then the ninety-second version, and submit the ninety-second one
              again here. Most interview answers improve by cutting, not by adding.
            </p>
          </div>

          <AnalysisHonestyNotice aiAssisted={Boolean(feedback)} />

          {!feedback && aiEnabled && !loadingAi && (
            <p className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-[11px] font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-900">
              <Bot className="h-3.5 w-3.5" /> Set a <code className="mx-1 rounded bg-slate-100 px-1 dark:bg-slate-800">GEMINI_API_KEY</code> on the server to unlock AI panel comments here. The structural analysis needs no key.
            </p>
          )}
        </>
      )}
    </section>
  );
};
