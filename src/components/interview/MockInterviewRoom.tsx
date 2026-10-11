import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Bot,
  CheckCircle2,
  Clock3,
  Download,
  Loader2,
  Mic,
  MicOff,
  Play,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Square,
  Target,
  Users,
  Volume2,
} from 'lucide-react';
import {
  ANSWER_CRITERIA,
  INTERVIEW_TRACKS,
  PANEL_PERSONAS,
  getInterviewCategory,
  getInterviewTrack,
  getPanelPersona,
  type CriterionId,
  type InterviewTrackId,
  type PanelPersonaId,
} from '../../data/interviewPrepData';
import { buildInterviewBlueprint, type BlueprintSlot } from '../../data/interviewQuestionBank';
import {
  analyseInterviewAnswer,
  localFollowUp,
  readInterviewSessions,
  saveInterviewSession,
  type AnswerAnalysis,
  type InterviewAnswerFeedback,
  type PracticeBand,
} from '../../lib/interviewPrep';
import {
  requestInterviewerQuestion,
  requestInterviewFeedback,
  type InterviewTranscriptEntry,
} from '../../lib/interviewCoach';
import { useApp } from '../../context/AppContext';
import { exportInterviewSessionToPdf } from '../../lib/exportUtils';
import { AiFeedbackPanel, AnalysisHonestyNotice, AnalysisSummaryPanel, ScoreRing } from './InterviewScorecard';
import { useSpeechTools } from './useSpeechTools';

type SessionMode = 'panel' | 'single' | 'rapid';
type Phase = 'setup' | 'interviewing' | 'feedback' | 'report';

interface SessionConfig {
  id: string;
  trackId: InterviewTrackId;
  mode: SessionMode;
  questionCount: number;
  targetSeconds: number;
  crossQuestioning: boolean;
  aiEnabled: boolean;
  personaId: PanelPersonaId;
  blueprint: BlueprintSlot[];
  startedAt: string;
}

interface AnswerRecord {
  slot: BlueprintSlot;
  categoryName: string;
  personaId: PanelPersonaId;
  personaName: string;
  question: string;
  questionOrigin: 'ai' | 'bank';
  followUp: string;
  answer: string;
  timeTakenSeconds: number;
  analysis: AnswerAnalysis;
  aiFeedback: InterviewAnswerFeedback | null;
  crossQuestionText: string;
  crossAnalysis: AnswerAnalysis | null;
}

const MODE_LABELS: Record<SessionMode, string> = {
  panel: 'Full panel rotation',
  single: 'One examiner, sustained questioning',
  rapid: 'Rapid-fire warm-ups',
};

const QUESTION_COUNTS = [3, 5, 8];
const TIME_TARGETS = [60, 90, 120, 180];

export const MockInterviewRoom: React.FC<{ onOpenQuestionBank?: () => void }> = ({ onOpenQuestionBank }) => {
  const { userProfile, addLearningPoints } = useApp();
  const speech = useSpeechTools();

  const [phase, setPhase] = useState<Phase>('setup');
  const [config, setConfig] = useState<SessionConfig | null>(null);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [draftTrackId, setDraftTrackId] = useState<InterviewTrackId>('css');
  const [draftMode, setDraftMode] = useState<SessionMode>('panel');
  const [draftCount, setDraftCount] = useState(5);
  const [draftTarget, setDraftTarget] = useState(120);
  const [draftCross, setDraftCross] = useState(true);
  const [draftAi, setDraftAi] = useState(true);
  const [draftPersona, setDraftPersona] = useState<PanelPersonaId>('chairperson');
  const [postApplied, setPostApplied] = useState('');
  const [backgroundNote, setBackgroundNote] = useState('');

  const [answerDraft, setAnswerDraft] = useState('');
  const [crossDraft, setCrossDraft] = useState('');
  const [crossSubmitted, setCrossSubmitted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiFeedbackLoading, setAiFeedbackLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);
  const [askedPrompts, setAskedPrompts] = useState<string[]>([]);
  const [liveQuestion, setLiveQuestion] = useState<{ prompt: string; origin: 'ai' | 'bank'; why: string; listenFor: string[]; followUp: string } | null>(null);

  const draftTrack = getInterviewTrack(draftTrackId);
  const questionRequestRef = useRef<string>('');

  const track = config ? getInterviewTrack(config.trackId) : draftTrack;
  const currentSlot = config ? config.blueprint[currentIndex] : null;

  const personaForIndex = useCallback(
    (index: number): PanelPersonaId => {
      if (!config) return draftPersona;
      if (config.mode === 'single') return config.personaId;
      return PANEL_PERSONAS[index % PANEL_PERSONAS.length].id;
    },
    [config, draftPersona]
  );

  /* ---------------------------- session lifecycle ---------------------------- */

  const startSession = () => {
    const blueprint = buildInterviewBlueprint(draftTrack, draftCount);
    if (!blueprint.length) return;
    const nextConfig: SessionConfig = {
      id: `iv-session-${Date.now()}`,
      trackId: draftTrackId,
      mode: draftMode,
      questionCount: blueprint.length,
      targetSeconds: draftMode === 'rapid' ? Math.min(60, draftTarget) : draftTarget,
      crossQuestioning: draftCross,
      aiEnabled: draftAi,
      personaId: draftPersona,
      blueprint,
      startedAt: new Date().toISOString(),
    };
    setConfig(nextConfig);
    setRecords([]);
    setCurrentIndex(0);
    setAskedPrompts([]);
    setLiveQuestion(null);
    setAiNotice(null);
    setAnswerDraft('');
    setCrossDraft('');
    setCrossSubmitted(false);
    setElapsedSeconds(0);
    setPhase('interviewing');
  };

  const endSession = () => {
    speech.stopDictation();
    speech.stopSpeaking();
    setPhase(config && records.length ? 'report' : 'setup');
  };

  const resetSession = () => {
    speech.stopDictation();
    speech.stopSpeaking();
    setPhase('setup');
    setConfig(null);
    setRecords([]);
    setCurrentIndex(0);
    setLiveQuestion(null);
    setAnswerDraft('');
    setCrossDraft('');
    setAiNotice(null);
  };

  /* --------------------------- question acquisition --------------------------- */

  useEffect(() => {
    if (phase !== 'interviewing' || !config || !currentSlot) return;
    const key = `${config.id}-${currentIndex}`;
    if (questionRequestRef.current === key) return;
    questionRequestRef.current = key;

    const persona = getPanelPersona(personaForIndex(currentIndex));
    const bankQuestion = currentSlot.question;
    setLiveQuestion({
      prompt: bankQuestion.prompt,
      origin: 'bank',
      why: `Built-in ${getInterviewCategory(currentSlot.category).name} prompt`,
      listenFor: bankQuestion.expectedPoints,
      followUp: bankQuestion.followUps[0] || '',
    });
    setAnswerDraft('');
    setCrossDraft('');
    setCrossSubmitted(false);
    setElapsedSeconds(0);

    if (!config.aiEnabled) return;

    let cancelled = false;
    setQuestionLoading(true);
    const spent: InterviewTranscriptEntry[] = records.flatMap((record) => [
      { role: 'interviewer' as const, text: record.question },
      { role: 'candidate' as const, text: record.answer },
    ]);

    requestInterviewerQuestion({
      trackId: config.trackId,
      personaId: persona.id,
      category: currentSlot.category,
      transcript: spent,
      askedPrompts,
      candidateContext: {
        exam: track.name,
        province: userProfile.province,
        post: postApplied || undefined,
        background: backgroundNote || undefined,
      },
    })
      .then((suggestion) => {
        if (cancelled) return;
        setLiveQuestion({
          prompt: suggestion.prompt,
          origin: 'ai',
          why: suggestion.whyThisQuestion,
          listenFor: suggestion.listenFor,
          followUp: suggestion.followUp,
        });
        setAskedPrompts((previous) => [...previous, suggestion.prompt].slice(-12));
        setAiNotice(null);
      })
      .catch((error: Error) => {
        if (cancelled) return;
        setAiNotice(error.message);
      })
      .finally(() => {
        if (!cancelled) setQuestionLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // `records` and `askedPrompts` are intentionally read at question start only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, config, currentIndex, currentSlot]);

  useEffect(() => {
    if (phase !== 'interviewing') return;
    const timer = window.setInterval(() => setElapsedSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [phase, currentIndex]);

  useEffect(() => {
    if (phase !== 'interviewing') speech.stopDictation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentIndex]);

  /* -------------------------------- answering -------------------------------- */

  const submitAnswer = async () => {
    if (!config || !currentSlot || !liveQuestion) return;
    const answer = answerDraft.trim();
    if (answer.length < 20) {
      setAiNotice('Write or dictate at least 20 characters — a panel cannot assess a blank answer.');
      return;
    }
    speech.stopDictation();
    setIsSubmitting(true);

    const persona = getPanelPersona(personaForIndex(currentIndex));
    const analysis = analyseInterviewAnswer({
      answer,
      question: currentSlot.question,
      targetSeconds: config.mode === 'rapid' ? Math.min(60, config.targetSeconds) : config.targetSeconds,
      timeTakenSeconds: elapsedSeconds,
    });

    // Store the structural analysis immediately so the candidate is never blocked
    // by a network failure.
    const record: AnswerRecord = {
      slot: currentSlot,
      categoryName: getInterviewCategory(currentSlot.category).name,
      personaId: persona.id,
      personaName: `${persona.name} · ${persona.role}`,
      question: liveQuestion.prompt,
      questionOrigin: liveQuestion.origin,
      followUp: config.crossQuestioning ? liveQuestion.followUp : '',
      answer,
      timeTakenSeconds: elapsedSeconds,
      analysis,
      aiFeedback: null,
      crossQuestionText: '',
      crossAnalysis: null,
    };
    setRecords((previous) => [...previous, record]);
    setPhase('feedback');
    setIsSubmitting(false);
    addLearningPoints(6);

    if (!config.aiEnabled) return;

    setAiFeedbackLoading(true);
    try {
      const feedback = await requestInterviewFeedback({
        trackId: config.trackId,
        personaId: persona.id,
        category: currentSlot.category,
        question: record.question,
        answer,
        targetSeconds: config.targetSeconds,
        transcript: records.flatMap((item) => [
          { role: 'interviewer' as const, text: item.question },
          { role: 'candidate' as const, text: item.answer },
        ]),
      });
      setRecords((previous) =>
        previous.map((item, index) =>
          index === previous.length - 1 ? { ...item, aiFeedback: feedback } : item
        )
      );
    } catch (error) {
      setAiNotice((error as Error).message);
    } finally {
      setAiFeedbackLoading(false);
    }
  };

  const submitCrossQuestion = () => {
    const text = crossDraft.trim();
    if (!config || !currentSlot || !liveQuestion || text.length < 10) return;
    const analysis = analyseInterviewAnswer({
      answer: text,
      question: currentSlot.question,
      targetSeconds: 60,
    });
    setRecords((previous) =>
      previous.map((item, index) =>
        index === previous.length - 1
          ? { ...item, crossQuestionText: text, crossAnalysis: analysis }
          : item
      )
    );
    setCrossSubmitted(true);
    addLearningPoints(3);
  };

  const goToNextQuestion = () => {
    if (!config) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex >= config.questionCount) {
      setPhase('report');
      return;
    }
    setCurrentIndex(nextIndex);
    setPhase('interviewing');
    setAiNotice(null);
  };

  const redoAnswer = () => {
    if (!records.length) return;
    const last = records[records.length - 1];
    setRecords((previous) => previous.slice(0, -1));
    setAnswerDraft(last.answer);
    setCrossDraft('');
    setCrossSubmitted(false);
    setElapsedSeconds(0);
    setPhase('interviewing');
    questionRequestRef.current = '';
  };

  /* --------------------------------- report --------------------------------- */

  const report = useMemo(() => {
    if (!records.length) return null;
    const criteriaAverages = ANSWER_CRITERIA.map((criterion) => {
      const scores = records.flatMap((record) =>
        record.analysis.criteria.filter((item) => item.id === criterion.id).map((item) => item.score * 10)
      );
      const average = scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;
      return { id: criterion.id, label: criterion.label, score: average, weight: Math.round(criterion.weight * 100) };
    });
    const averageScore = Math.round(records.reduce((sum, record) => sum + record.analysis.overallScore, 0) / records.length);
    const band: PracticeBand =
      averageScore >= 85 ? 'Panel strong' : averageScore >= 70 ? 'Interview ready' : averageScore >= 50 ? 'Developing' : 'Needs structure';
    const weakest = [...criteriaAverages].sort((a, b) => a.score - b.score).slice(0, 3);
    const nextActions = weakest.flatMap((criterion) => {
      const definition = ANSWER_CRITERIA.find((item) => item.id === criterion.id);
      return definition ? definition.drills.map((drill) => `${definition.label}: ${drill}`) : [];
    });
    const flags = records.flatMap((record) => record.analysis.flags).slice(0, 6);
    const aiNotes = records
      .map((record) => record.aiFeedback?.panelNote)
      .filter((note): note is string => Boolean(note));
    return { criteriaAverages, averageScore, band, weakest, nextActions, flags, aiNotes };
  }, [records]);

  const savedRef = useRef<string>('');
  useEffect(() => {
    if (phase !== 'report' || !config || !report) return;
    if (savedRef.current === config.id) return;
    savedRef.current = config.id;
    saveInterviewSession({
      id: config.id,
      completedAt: new Date().toISOString(),
      trackId: config.trackId,
      personaId: config.personaId,
      mode: config.mode,
      questionCount: records.length,
      overallScore: report.averageScore,
      band: report.band,
      criteria: report.criteriaAverages.map((criterion) => ({ id: criterion.id as CriterionId, score: Math.round(criterion.score / 10) })),
      weakest: report.weakest.map((criterion) => criterion.id as CriterionId),
      promptSamples: records.slice(0, 3).map((record) => record.question),
    });
    addLearningPoints(25);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, config, report, records]);

  const [savedSessions] = useState(() => readInterviewSessions());

  const handleExport = () => {
    if (!config || !report) return;
    exportInterviewSessionToPdf({
      candidateName: userProfile.name,
      trackName: track.name,
      commission: track.commission,
      modeLabel: MODE_LABELS[config.mode],
      completedAt: new Date().toLocaleString('en-GB'),
      averageScore: report.averageScore,
      band: report.band,
      criteriaAverages: report.criteriaAverages.map(({ label, score, weight }) => ({ label, score, weight })),
      entries: records.map((record) => ({
        question: record.question,
        categoryName: record.categoryName,
        panelSeat: record.personaName,
        answer: record.answer,
        overallScore: record.analysis.overallScore,
        band: record.analysis.band,
        followUp: record.followUp || undefined,
        followUpResponse: record.crossQuestionText || undefined,
        aiSummary: record.aiFeedback?.panelNote,
        missingPoints: record.aiFeedback?.missingPoints,
        flags: record.analysis.flags,
      })),
      nextActions: report.nextActions,
      notice:
        'This is a practice record generated by MUQABIL. Scores come from a practice rubric and a structural analyser, not from any commission, panel or examiner. Official interview weights, stages and qualifying marks must always be confirmed from the current FPSC / PPSC / SPSC / STS / NTS advertisement or notice.',
    });
  };

  /* ---------------------------------- views ---------------------------------- */

  if (phase === 'setup') {
    return (
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
            <Play className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /> Set up your mock interview
          </h2>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Choose the exam format, the panel size and the pressure level. The panel asks questions from the curated bank and,
            when the AI interviewer is configured, follows up on what you actually wrote.
          </p>

          <div className="mt-5 space-y-5">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Exam / interview format</label>
              <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {INTERVIEW_TRACKS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDraftTrackId(item.id)}
                    className={`rounded-2xl border p-3 text-left transition cursor-pointer ${
                      draftTrackId === item.id
                        ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-950/40'
                        : 'border-slate-200 hover:border-indigo-300 dark:border-slate-800 dark:hover:border-indigo-800'
                    }`}
                  >
                    <span className="block text-sm font-extrabold text-slate-900 dark:text-white">{item.shortName}</span>
                    <span className="mt-0.5 block text-[11px] leading-4 text-slate-500 dark:text-slate-400">{item.commission}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{track.shortName} — what to expect</h3>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  ['Panel', track.panelSize],
                  ['Duration', track.durationNote],
                  ['Interview weight', track.marksNote],
                  ['Psychological stage', track.psychologicalStage],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{label}</dt>
                    <dd className="mt-0.5 text-xs leading-5 text-slate-700 dark:text-slate-300">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-2.5 text-[11px] leading-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                <strong>Verify before you rely on it:</strong> {track.sourceNote}{' '}
                <a href={track.officialUrl} target="_blank" rel="noreferrer" className="font-bold underline">
                  Official portal
                </a>
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Panel format</label>
                <div className="mt-2 space-y-1.5">
                  {(['panel', 'single', 'rapid'] as SessionMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setDraftMode(mode);
                        if (mode === 'rapid') setDraftTarget(60);
                      }}
                      className={`w-full rounded-xl border px-3 py-2 text-left text-xs font-bold transition cursor-pointer ${
                        draftMode === mode
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200'
                          : 'border-slate-200 text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {MODE_LABELS[mode]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Questions</label>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {QUESTION_COUNTS.map((count) => (
                    <button
                      key={count}
                      onClick={() => setDraftCount(count)}
                      className={`rounded-xl border px-3 py-2 text-xs font-bold transition cursor-pointer ${
                        draftCount === count
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200'
                          : 'border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
                <label className="mt-4 block text-xs font-extrabold uppercase tracking-wider text-slate-500">Answer target</label>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {TIME_TARGETS.map((seconds) => (
                    <button
                      key={seconds}
                      onClick={() => setDraftTarget(seconds)}
                      className={`rounded-xl border px-3 py-2 text-xs font-bold transition cursor-pointer ${
                        draftTarget === seconds
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200'
                          : 'border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {seconds}s
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Options</label>
                <div className="mt-2 space-y-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={draftCross} onChange={(event) => setDraftCross(event.target.checked)} className="h-4 w-4" />
                    Cross-questioning after each answer
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={draftAi} onChange={(event) => setDraftAi(event.target.checked)} className="h-4 w-4" />
                    AI interviewer &amp; AI feedback (needs a key on the server)
                  </label>
                </div>
                <label className="mt-4 block text-xs font-extrabold uppercase tracking-wider text-slate-500">Lead examiner (single mode)</label>
                <select
                  value={draftPersona}
                  onChange={(event) => setDraftPersona(event.target.value as PanelPersonaId)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                >
                  {PANEL_PERSONAS.map((persona) => (
                    <option key={persona.id} value={persona.id}>{persona.name} — {persona.role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Panel context (optional)</label>
                <input
                  value={postApplied}
                  onChange={(event) => setPostApplied(event.target.value)}
                  placeholder="Post applied for, e.g. BPS-16 Assistant"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
                <textarea
                  value={backgroundNote}
                  onChange={(event) => setBackgroundNote(event.target.value)}
                  placeholder="Optional note the panel may probe, e.g. optional subjects, experience, a gap in your record"
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={startSession}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-indigo-500 cursor-pointer"
              >
                <Play className="h-4 w-4" /> Start mock interview
              </button>
              <button
                onClick={onOpenQuestionBank}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Target className="h-4 w-4" /> Browse the question bank first
              </button>
            </div>

            <p className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-[11px] leading-5 text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
              <ShieldCheck className="mr-1 inline h-3.5 w-3.5" />
              Answers and results stay in this browser (local storage). Nothing is sent anywhere unless you use the AI interviewer,
              in which case only the question, your answer and the track context are sent to the configured Gemini endpoint for
              practice feedback. {savedSessions.length > 0
                ? `${savedSessions.length} completed mock session${savedSessions.length === 1 ? '' : 's'} are already stored on this device.`
                : 'No session is saved until you complete a mock.'}
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (phase === 'report' && config && report) {
    return (
      <div className="space-y-6">
        <section className="overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider">
                <Award className="h-3.5 w-3.5 text-amber-300" /> Mock panel report
              </span>
              <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl">{track.name}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
                {MODE_LABELS[config.mode]} · {records.length} question{records.length === 1 ? '' : 's'} ·{' '}
                {new Date(config.startedAt).toLocaleString('en-GB')}
              </p>
            </div>
            <ScoreRing score={report.averageScore} band={report.band} caption="Average of your practice answers" />
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">Criterion averages across the session</h3>
            {report.criteriaAverages.map((criterion) => (
              <div key={criterion.id} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">{criterion.label}</span>
                  <span className="text-xs font-black text-slate-700 dark:text-slate-200">{criterion.score}/100</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={`h-full rounded-full ${criterion.score >= 80 ? 'bg-emerald-500' : criterion.score >= 60 ? 'bg-teal-500' : criterion.score >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                    style={{ width: `${criterion.score}%` }}
                  />
                </div>
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">
              <h3 className="inline-flex items-center gap-2 text-sm font-black text-emerald-900 dark:text-emerald-200">
                <CheckCircle2 className="h-4 w-4" /> Your next three practice moves
              </h3>
              <ul className="mt-3 space-y-2">
                {report.nextActions.slice(0, 6).map((action) => (
                  <li key={action} className="text-xs leading-5 text-emerald-900 dark:text-emerald-200">• {action}</li>
                ))}
              </ul>
            </div>

            {report.flags.length > 0 && (
              <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900 dark:bg-amber-950/20">
                <h3 className="inline-flex items-center gap-2 text-sm font-black text-amber-900 dark:text-amber-200">
                  <AlertTriangle className="h-4 w-4" /> Signals the panel would have noticed
                </h3>
                <ul className="mt-3 space-y-2">
                  {report.flags.map((flag) => (
                    <li key={flag} className="text-xs leading-5 text-amber-900 dark:text-amber-200">• {flag}</li>
                  ))}
                </ul>
              </div>
            )}

            {report.aiNotes.length > 0 && (
              <div className="rounded-3xl border border-indigo-200 bg-indigo-50/60 p-5 dark:border-indigo-900 dark:bg-indigo-950/20">
                <h3 className="inline-flex items-center gap-2 text-sm font-black text-indigo-900 dark:text-indigo-200">
                  <Bot className="h-4 w-4" /> Panel notes
                </h3>
                <ul className="mt-3 space-y-2">
                  {report.aiNotes.map((note) => (
                    <li key={note} className="text-xs leading-5 text-indigo-900 dark:text-indigo-200">• {note}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>

        <section className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Full transcript and per-answer feedback</h3>
          {records.map((record, index) => (
            <details key={`${record.question}-${index}`} open={index === 0} className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <summary className="cursor-pointer text-xs font-extrabold text-slate-800 dark:text-slate-100">
                Q{index + 1} · {record.categoryName} · {record.personaName} — {record.analysis.overallScore}/100 ({record.analysis.band})
              </summary>
              <div className="mt-3 space-y-4">
                <p className="text-sm font-bold leading-6 text-slate-900 dark:text-white">{record.question}</p>
                <p className="rounded-2xl bg-slate-50 p-3 text-xs leading-6 text-slate-700 dark:bg-slate-950 dark:text-slate-300">
                  <strong className="block text-[11px] uppercase tracking-wider text-slate-500">Your answer ({record.timeTakenSeconds}s)</strong>
                  {record.answer}
                </p>
                <AnalysisSummaryPanel analysis={record.analysis} />
                {record.followUp && (
                  <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-3 dark:border-purple-900 dark:bg-purple-950/20">
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-300">Cross-question</p>
                    <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">{record.followUp}</p>
                    {record.crossQuestionText ? (
                      <>
                        <p className="mt-2 rounded-xl bg-white p-2 text-xs leading-5 text-slate-700 dark:bg-slate-900 dark:text-slate-300">{record.crossQuestionText}</p>
                        {record.crossAnalysis && (
                          <p className="mt-2 text-[11px] font-bold text-purple-800 dark:text-purple-300">
                            Follow-up practice score: {record.crossAnalysis.overallScore}/100 ({record.crossAnalysis.band})
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="mt-2 text-[11px] text-slate-500">You ended the session without answering the cross-question.</p>
                    )}
                  </div>
                )}
                {record.aiFeedback && <AiFeedbackPanel feedback={record.aiFeedback} />}
              </div>
            </details>
          ))}
        </section>

        <AnalysisHonestyNotice aiAssisted={records.some((record) => Boolean(record.aiFeedback))} />

        <div className="flex flex-wrap gap-3">
          <button onClick={handleExport} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-indigo-500 cursor-pointer">
            <Download className="h-4 w-4" /> Download practice report (PDF)
          </button>
          <button onClick={startSession} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer">
            <RotateCcw className="h-4 w-4" /> Repeat this format
          </button>
          <button onClick={resetSession} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer">
            New setup
          </button>
        </div>
      </div>
    );
  }

  if (!config || !currentSlot || !liveQuestion) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-indigo-500" />
        <p className="mt-3 text-sm font-bold text-slate-600 dark:text-slate-300">Preparing the panel…</p>
      </div>
    );
  }

  const persona = getPanelPersona(personaForIndex(currentIndex));
  const latestRecord = records[records.length - 1];
  const timeOverrun = elapsedSeconds > config.targetSeconds;

  return (
    <div className="space-y-5">
      {/* Panel header */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-5 py-3 dark:border-slate-800 dark:bg-slate-950/40">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-slate-900 text-sm font-black text-white">
              {persona.name.split(' ').map((word) => word[0]).join('').slice(0, 2)}
            </span>
            <div>
              <p className="text-xs font-black text-slate-900 dark:text-white">{persona.name}</p>
              <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{persona.role}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
            <span className="rounded-full bg-white px-3 py-1 text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
              Question {currentIndex + 1} of {config.questionCount}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
              {track.shortName}
            </span>
            <span className={`rounded-full px-3 py-1 ${timeOverrun ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-white text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300'}`}>
              <Clock3 className="mr-1 inline h-3 w-3" /> {elapsedSeconds}s / {config.targetSeconds}s target
            </span>
          </div>
        </div>

        <div className="px-5 py-5 sm:px-6">
          {questionLoading && (
            <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> The panel is framing its question…
            </p>
          )}
          <div className="flex items-start gap-3">
            <p className="flex-1 text-base font-extrabold leading-7 text-slate-900 dark:text-white sm:text-lg">
              {liveQuestion.prompt}
            </p>
            <button
              onClick={() => speech.speak('question', liveQuestion.prompt)}
              className="shrink-0 rounded-xl border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
              title="Hear the question read aloud"
            >
              {speech.speakingId === 'question' ? <Square className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-bold">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {getInterviewCategory(currentSlot.category).name}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {currentSlot.question.difficulty}
            </span>
            <span className={`rounded-full px-2.5 py-1 ${liveQuestion.origin === 'ai' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'}`}>
              {liveQuestion.origin === 'ai' ? 'AI panel seat' : 'Curated question bank'}
            </span>
          </div>

          {phase === 'interviewing' && (
            <details className="mt-4 rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
              <summary className="cursor-pointer text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                What this question is testing (open after answering!)
              </summary>
              <p className="mt-2 text-[11px] leading-5 text-slate-600 dark:text-slate-400">{liveQuestion.why}</p>
              <ul className="mt-2 space-y-1">
                {liveQuestion.listenFor.map((point) => (
                  <li key={point} className="text-[11px] leading-5 text-slate-600 dark:text-slate-400">• {point}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </section>

      {phase === 'interviewing' ? (
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Your answer</label>
            <div className="flex items-center gap-2">
              {speech.dictationSupported && (
                <select
                  value={speech.dictationLang}
                  onChange={(event) => speech.setDictationLang(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  <option value="en-US">English dictation</option>
                  <option value="ur-PK">اردو dictation</option>
                </select>
              )}
              {speech.dictationSupported ? (
                <button
                  onClick={() => speech.toggleDictation((text) => setAnswerDraft((previous) => (previous ? `${previous} ${text}` : text)))}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-extrabold transition cursor-pointer ${
                    speech.isListening ? 'bg-rose-600 text-white' : 'border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200'
                  }`}
                >
                  {speech.isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                  {speech.isListening ? 'Stop dictation' : 'Dictate answer'}
                </button>
              ) : (
                <span className="text-[10px] font-bold text-slate-400">Dictation not supported in this browser</span>
              )}
            </div>
          </div>

          <textarea
            value={answerDraft}
            onChange={(event) => setAnswerDraft(event.target.value)}
            rows={9}
            placeholder="Answer as you would speak: state your position first, then your reasons, one example and a closing line. Aim for roughly 120 words per minute of speech."
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-indigo-950"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-bold text-slate-500">
            <span>
              {answerDraft.trim() ? answerDraft.trim().split(/\s+/).length : 0} words · about{' '}
              {Math.round(((answerDraft.trim() ? answerDraft.trim().split(/\s+/).length : 0) / 135) * 60)}s of speech
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" /> {persona.focus}
            </span>
          </div>

          {aiNotice && (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-[11px] leading-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
              {aiNotice}{' '}
              <span className="font-bold">
                You can continue offline — the question bank and the structural analyser work without the AI endpoint.
              </span>
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={submitAnswer}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-indigo-500 disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Submit answer to the panel
            </button>
            <button
              onClick={endSession}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
            >
              End session early
            </button>
          </div>
        </section>
      ) : (
        latestRecord && (
          <section className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                Panel feedback on question {records.length}
              </h3>
              {aiFeedbackLoading && (
                <span className="inline-flex items-center gap-2 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> AI panel is reviewing your answer…
                </span>
              )}
            </div>

            <AnalysisSummaryPanel analysis={latestRecord.analysis} />

            {aiNotice && (
              <p className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-[11px] leading-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                AI panel unavailable: {aiNotice} The structural analysis above is complete and saved.
              </p>
            )}

            {latestRecord.aiFeedback && <AiFeedbackPanel feedback={latestRecord.aiFeedback} />}

            {config.crossQuestioning && (
              <div className="rounded-3xl border border-purple-200 bg-white p-4 dark:border-purple-900 dark:bg-slate-900">
                <h4 className="inline-flex items-center gap-2 text-sm font-black text-purple-900 dark:text-purple-200">
                  <Sparkles className="h-4 w-4" /> The panel’s cross-question
                </h4>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-800 dark:text-slate-100">
                  {latestRecord.followUp || localFollowUp(currentSlot.question, track.shortName)}
                </p>
                {!crossSubmitted ? (
                  <div className="mt-3 space-y-2">
                    <textarea
                      value={crossDraft}
                      onChange={(event) => setCrossDraft(event.target.value)}
                      rows={3}
                      placeholder="Answer briefly, 30–60 seconds. Own the specific action you took."
                      className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-xs leading-6 text-slate-800 outline-none focus:border-purple-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                    />
                    <button
                      onClick={submitCrossQuestion}
                      disabled={crossDraft.trim().length < 10}
                      className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-purple-500 disabled:opacity-60 cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" /> Submit cross-question answer
                    </button>
                  </div>
                ) : (
                  latestRecord.crossAnalysis && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs leading-6 text-slate-700 dark:text-slate-300">{latestRecord.crossQuestionText}</p>
                      <p className="text-[11px] font-bold text-purple-800 dark:text-purple-300">
                        Follow-up practice score {latestRecord.crossAnalysis.overallScore}/100 ({latestRecord.crossAnalysis.band}) ·{' '}
                        {latestRecord.crossAnalysis.estimatedSeconds}s of speech
                      </p>
                      <FlagsInline flags={latestRecord.crossAnalysis.flags} />
                    </div>
                  )
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={goToNextQuestion}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-indigo-500 cursor-pointer"
              >
                {currentIndex + 1 >= config.questionCount ? (
                  <>
                    <Award className="h-4 w-4" /> Finish and view panel report
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-4 w-4" /> Next question
                  </>
                )}
              </button>
              <button
                onClick={redoAnswer}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" /> Redo this answer
              </button>
              <button
                onClick={endSession}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
              >
                End session
              </button>
            </div>
          </section>
        )
      )}
    </div>
  );
};

const FlagsInline: React.FC<{ flags: string[] }> = ({ flags }) =>
  flags.length ? (
    <ul className="space-y-1">
      {flags.map((flag) => (
        <li key={flag} className="text-[11px] leading-5 text-rose-700 dark:text-rose-300">• {flag}</li>
      ))}
    </ul>
  ) : null;
