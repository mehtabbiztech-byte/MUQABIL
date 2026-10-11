/**
 * Interview preparation engine (pure logic, no network).
 *
 * Everything in this file runs on the candidate's device. It exists so the
 * Interview Module is useful even when no AI key is configured: the structural
 * analyser reads an answer and reports what a panel would notice (does it
 * answer the question, is there an example, how long did it run, how many
 * filler words), and the personality instrument scores itself locally.
 *
 * This is practice guidance. It is not official marking, not a psychometric
 * assessment and not a prediction of any interview score.
 */

import {
  ANSWER_CRITERIA,
  CRITERION_TOTAL_WEIGHT,
  INTERVIEW_CATEGORIES,
  LIKERT_ITEMS,
  PERSONALITY_DIMENSIONS,
  PSYCHOLOGICAL_FOLLOW_UPS,
  SITUATIONAL_ITEMS,
  type CriterionId,
  type InterviewCategoryId,
  type InterviewQuestion,
  type InterviewTrackId,
  type PanelPersonaId,
  type PersonalityDimensionId,
} from '../data/interviewPrepData';

export type PracticeBand = 'Needs structure' | 'Developing' | 'Interview ready' | 'Panel strong';

export const bandForScore = (score: number): PracticeBand => {
  if (score >= 85) return 'Panel strong';
  if (score >= 70) return 'Interview ready';
  if (score >= 50) return 'Developing';
  return 'Needs structure';
};

export const bandTone = (band: PracticeBand): string => {
  switch (band) {
    case 'Panel strong':
      return 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900';
    case 'Interview ready':
      return 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900';
    case 'Developing':
      return 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900';
    default:
      return 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900';
  }
};

/* ----------------------------- text statistics ----------------------------- */

const STOPWORDS = new Set([
  'about', 'above', 'after', 'again', 'against', 'along', 'also', 'among', 'another', 'any', 'are',
  'because', 'been', 'before', 'being', 'below', 'between', 'both', 'cannot', 'could', 'does',
  'doing', 'done', 'during', 'each', 'either', 'else', 'every', 'from', 'further', 'have', 'having',
  'here', 'hers', 'herself', 'himself', 'into', 'itself', 'its', 'just', 'like', 'made', 'make',
  'many', 'more', 'most', 'much', 'must', 'myself', 'never', 'only', 'other', 'others', 'over',
  'own', 'same', 'shall', 'should', 'since', 'some', 'such', 'than', 'that', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'under',
  'until', 'very', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will',
  'with', 'within', 'without', 'would', 'your', 'yours', 'yourself',
]);

export const countWords = (text: string): number =>
  text.trim() ? text.trim().split(/\s+/).length : 0;

export const splitSentences = (text: string): string[] =>
  text
    .split(/[.!?؟۔]+|\n+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

/** Speaking rate used throughout the module: ~135 words per minute. */
export const estimateSpeakingSeconds = (text: string, wordsPerMinute = 135): number => {
  const words = countWords(text);
  if (!words) return 0;
  return Math.round((words / wordsPerMinute) * 60);
};

const keywordSet = (text: string, minimumLength = 5): string[] => {
  const seen = new Set<string>();
  for (const raw of text.toLowerCase().split(/[^a-z0-9\u0600-\u06ff]+/)) {
    const word = raw.trim();
    if (word.length < minimumLength || STOPWORDS.has(word)) continue;
    seen.add(word);
  }
  return [...seen];
};

const countMatches = (text: string, pattern: RegExp): number => {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
};

const FILLERS = /\b(um+|uh+|erm+|ah+|basically|actually|literally|you know|i mean|sort of|kind of|matlab|yaani|what i mean is|to be honest)\b/gi;
const HEDGES = /\b(maybe|perhaps|probably|possibly|i think|i guess|i suppose|hopefully|might be|not sure|somewhat|a bit|more or less|ish)\b/gi;
const APOLOGIES = /\b(sorry|apologise|apologize|i am not an expert|i don't know much|i am weak|forgive me|pardon me)\b/gi;
const OWNERSHIP =
  /\b(i (led|organised|organized|managed|decided|handled|completed|initiated|resolved|coordinated|taught|volunteered|improved|implemented|prepared|inspected|verified|wrote|designed|trained|recovered|built|ran|started|set up|took|fixed|negotiated|registered|arranged|repaired|delivered|collected|checked|stood|refused|accepted)|i (?!am\b|was\b|have\b|had\b|think\b|guess\b|believe\b|feel\b|want\b|would\b|will\b|can\b|could\b|should\b|do not\b|don't\b|need\b|like\b|hope\b|wish\b)[a-z]{3,}(ed|led|made|built|ran|wrote|took|set|kept|found|gave|got))\b/gi;
const STRUCTURE_SIGNALS = /\b(first|firstly|second|secondly|third|thirdly|finally|moreover|in addition|on the other hand|to sum up|in short|in conclusion|therefore|because|for example|for instance|such as|as a result|the reason is|my view is)\b/gi;
const CLOSING_SIGNALS = /\b(in short|to conclude|in conclusion|to sum up|overall|therefore i would|going forward|that is why)\b/gi;
const DIRECT_OPENERS = /^(yes|no|my name|i am|i'm|i have|i believe|i would|i think the|in my view|in my opinion|the main|there are|it is|according to me)/i;
const META_OPENERS = /^(that('| i)?s (a )?(very |really )?(good|interesting|nice|tough) question|as i (said|mentioned)|so,? basically|well,? |thank you (for|sir|madam)|good (morning|afternoon|evening),? )/i;
const KNOWLEDGE_GAP = /\b(i do not know|i don't know|i am not sure but|not certain)\b/i;

const clamp = (value: number, minimum = 0, maximum = 1): number =>
  Math.min(maximum, Math.max(minimum, value));

export interface CriterionResult {
  id: CriterionId;
  label: string;
  weight: number;
  /** 0–10 practice score for this criterion. */
  score: number;
  max: 10;
  observations: string[];
  actions: string[];
}

export interface AnswerAnalysis {
  wordCount: number;
  estimatedSeconds: number;
  targetSeconds: number;
  sentenceCount: number;
  criteria: CriterionResult[];
  /** Weighted practice score out of 100. */
  overallScore: number;
  band: PracticeBand;
  strengths: string[];
  improvements: string[];
  flags: string[];
}

export interface AnalyseAnswerInput {
  answer: string;
  question?: InterviewQuestion | null;
  /** Overrides the question's own time target. */
  targetSeconds?: number;
  /** Optional measured typing/speaking time, used for the concision criterion. */
  timeTakenSeconds?: number;
}

const criterionById = (id: CriterionId) => {
  const criterion = ANSWER_CRITERIA.find((item) => item.id === id);
  if (!criterion) throw new Error(`Unknown criterion: ${id}`);
  return criterion;
};

export function analyseInterviewAnswer(input: AnalyseAnswerInput): AnswerAnalysis {
  const answer = input.answer.trim();
  const words = countWords(answer);
  const sentences = splitSentences(answer);
  const estimatedSeconds = estimateSpeakingSeconds(answer);
  const targetSeconds = input.targetSeconds || input.question?.targetSeconds || 120;
  const measurements = input.timeTakenSeconds && input.timeTakenSeconds > 5
    ? Math.round(input.timeTakenSeconds)
    : estimatedSeconds;

  const questionKeywords = input.question ? keywordSet(input.question.prompt, 4) : [];
  const answerKeywords = new Set(keywordSet(answer, 4));
  const coveredKeywords = questionKeywords.filter((word) => answerKeywords.has(word));
  const coverage = questionKeywords.length ? coveredKeywords.length / questionKeywords.length : 1;

  const fillerCount = countMatches(answer, FILLERS);
  const hedgeCount = countMatches(answer, HEDGES);
  const apologyCount = countMatches(answer, APOLOGIES);
  const ownershipCount = countMatches(answer, OWNERSHIP);
  const signalCount = countMatches(answer, STRUCTURE_SIGNALS);
  const numberCount = countMatches(answer, /\b\d+([.,]\d+)?%?\b/g);
  const exampleCount = countMatches(
    answer,
    /\b(for example|for instance|such as|as a (volunteer|teacher|student|member|intern|supervisor|clerk|monitor)|in my (district|village|school|college|office|union council|ward|neighbourhood|neighborhood)|when i (was|worked|joined|volunteered|studied)|last (year|month|week|summer)|in (19|20)\d{2})\b/gi
  );
  const properNouns = countMatches(
    answer.replace(/^./, ' ').replace(/[.!?؟۔]\s+./g, ' '),
    /\b[A-Z][a-z]{3,}\b/g
  );
  const firstSentence = sentences[0] || answer;
  const firstSentenceWords = countWords(firstSentence);
  const firstSentenceCoverage = questionKeywords.length
    ? questionKeywords.filter((word) => firstSentence.toLowerCase().includes(word)).length / questionKeywords.length
    : 0;
  const averageSentenceLength = sentences.length ? Math.round(words / sentences.length) : words;

  const flags: string[] = [];
  if (fillerCount >= 2) flags.push(`Filler words detected ${fillerCount} time(s) — a short pause is stronger than "basically".`);
  if (hedgeCount >= 4) flags.push(`Hedging language used ${hedgeCount} times — the panel hears an unclear position.`);
  if (!exampleCount && !numberCount) flags.push('No example, date or figure anywhere in the answer — claims stay unverifiable.');
  if (words && words < 45) flags.push('Under 45 words — thinner than a panel expects for a substantive question.');
  if (measurements > targetSeconds * 1.5) flags.push(`Approximately ${measurements}s against a ${targetSeconds}s target — the panel will interrupt.`);
  if (input.question && coverage < 0.2) flags.push('Much of the answer sits outside the words of the question asked.');
  if (apologyCount >= 2) flags.push('Repeated apology or self-deprecation — it undercuts your own authority.');
  if (answer.includes('?') && words > 40) flags.push('You answered with a question — the panel wants your position first.');

  const scores: Record<CriterionId, number> = {
    directness: 0,
    structure: 0,
    substance: 0,
    relevance: 0,
    clarity: 0,
    composure: 0,
    concision: 0,
  };

  /* Directness */
  let directness = 0.35;
  if (DIRECT_OPENERS.test(firstSentence.trim())) directness += 0.3;
  if (firstSentenceWords > 0 && firstSentenceWords <= 30) directness += 0.2;
  if (firstSentenceCoverage > 0) directness += 0.15 * clamp(firstSentenceCoverage / 0.5);
  if (META_OPENERS.test(answer.trim())) directness -= 0.3;
  if (firstSentenceWords > 45) directness -= 0.2;
  scores.directness = directness;

  /* Structure */
  scores.structure =
    0.5 * clamp(signalCount / 3) +
    0.2 * clamp(sentences.length / 4) +
    0.15 * (answer.includes('\n') ? 1 : 0.6) +
    0.15 * (CLOSING_SIGNALS.test(answer) ? 1 : 0.35);

  /* Substance — concrete detail outweighs adjectives: examples, own actions, verifiable facts. */
  scores.substance =
    0.25 * clamp(numberCount / 2) +
    0.15 * clamp(properNouns / 3) +
    0.25 * clamp(ownershipCount / 2) +
    0.35 * clamp(exampleCount / 2);

  /* Relevance */
  scores.relevance = input.question
    ? 0.7 * clamp(coverage / 0.33) + 0.3 * clamp(words / 80)
    : 0.68;

  /* Clarity */
  let clarity = 1;
  if (averageSentenceLength > 32) clarity -= 0.3;
  else if (averageSentenceLength > 25) clarity -= 0.15;
  if (averageSentenceLength < 8 && sentences.length > 2) clarity -= 0.15;
  clarity -= clamp(fillerCount / 8);
  if (words > 0 && words < 40) clarity -= 0.1;
  scores.clarity = clarity;

  /* Composure */
  scores.composure =
    0.55 * (1 - clamp(hedgeCount / 7)) +
    0.3 * clamp(ownershipCount / 2) +
    0.15 * (KNOWLEDGE_GAP.test(answer) ? 1 : 0.7) -
    clamp(apologyCount / 4) * 0.4;

  /* Concision */
  const ratio = targetSeconds > 0 ? measurements / targetSeconds : 1;
  if (ratio < 0.6) scores.concision = 0.55 + 0.45 * clamp(ratio / 0.6);
  else if (ratio <= 1.15) scores.concision = 1;
  else scores.concision = clamp(1 - (ratio - 1.15) * 0.8, 0.3, 1);

  const observations: Record<CriterionId, string[]> = {
    directness: [],
    structure: [],
    substance: [],
    relevance: [],
    clarity: [],
    composure: [],
    concision: [],
  };

  observations.directness.push(
    META_OPENERS.test(answer.trim())
      ? 'The answer opens with a preamble instead of a position.'
      : directness >= 0.75
        ? `Position stated inside the first sentence (${firstSentenceWords} words).`
        : `The first sentence runs ${firstSentenceWords} words before reaching a position.`
  );
  observations.structure.push(
    signalCount === 0
      ? 'No signposting words at all — the panel has to assemble your structure by itself.'
      : `${signalCount} signposting signal(s) across ${sentences.length} sentence(s).`
  );
  observations.substance.push(
    `${ownershipCount} personal-accountability verb(s), ${numberCount} numeric detail(s), ${exampleCount} explicit example signal(s).`
  );
  observations.relevance.push(
    input.question
      ? `Covered ${coveredKeywords.length} of ${questionKeywords.length} key terms from the question.`
      : 'No question selected — relevance checked only for length and focus.'
  );
  observations.clarity.push(
    `Average sentence length ${averageSentenceLength} words; ${fillerCount} filler token(s).`
  );
  observations.composure.push(
    `${hedgeCount} hedging phrase(s), ${apologyCount} apology/self-deprecation phrase(s).`
  );
  observations.concision.push(
    `About ${measurements}s of speech against a ${targetSeconds}s target for this question.`
  );

  const criteria: CriterionResult[] = ANSWER_CRITERIA.map((criterion) => {
    const raw = clamp(scores[criterion.id]);
    return {
      id: criterion.id,
      label: criterion.label,
      weight: criterion.weight,
      score: Math.round(raw * 10),
      max: 10 as const,
      observations: observations[criterion.id],
      actions: criterion.drills.slice(0, 2),
    };
  });

  const weighted = criteria.reduce((sum, criterion) => sum + criterion.score * criterion.weight, 0);
  const overallScore = Math.round((weighted / (CRITERION_TOTAL_WEIGHT * 10)) * 100);

  const sorted = [...criteria].sort((a, b) => b.score - a.score);
  const strengths = sorted
    .filter((criterion) => criterion.score >= 7)
    .slice(0, 3)
    .map((criterion) => `${criterion.label}: ${criterion.observations[0]}`);
  const improvements = [...sorted]
    .reverse()
    .filter((criterion) => criterion.score < 8)
    .slice(0, 3)
    .map((criterion) => `${criterion.label}: ${criterion.actions[0]}`);

  return {
    wordCount: words,
    estimatedSeconds: measurements,
    targetSeconds,
    sentenceCount: sentences.length,
    criteria,
    overallScore,
    band: bandForScore(overallScore),
    strengths: strengths.length ? strengths : ['Answer recorded — run it again after applying the drills below.'],
    improvements: improvements.length ? improvements : ['No priority weakness detected; raise the difficulty of the question.'],
    flags,
  };
}

/** Top drills for the weakest criteria of an analysis. */
export function buildImprovementPlan(analysis: AnswerAnalysis, limit = 3): string[] {
  return [...analysis.criteria]
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .flatMap((criterion) => {
      const definition = criterionById(criterion.id);
      return definition.drills.map((drill) => `${definition.label}: ${drill}`);
    });
}

/* ------------------------- personality instrument ------------------------- */

export type PersonalityBand = 'Developing' | 'Balanced' | 'Strong';

export const personalityBandFor = (index: number): PersonalityBand => {
  if (index >= 68) return 'Strong';
  if (index >= 48) return 'Balanced';
  return 'Developing';
};

export interface DimensionResult {
  id: PersonalityDimensionId;
  name: string;
  short: string;
  index: number;
  band: PersonalityBand;
  summary: string;
  action: string;
  panelQuestion: string;
  followUps: string[];
}

export interface SituationalReview {
  itemId: string;
  scenario: string;
  chosenOption: string;
  bestOption: string;
  chosenScore: number;
  rationale: string;
}

export interface PersonalityResult {
  id: string;
  completedAt: string;
  dimensions: DimensionResult[];
  overallIndex: number;
  band: PersonalityBand;
  /** Percentage match between chosen options and the recommended practice option. */
  situationalAlignment: number | null;
  situationalReview: SituationalReview[];
  strengths: string[];
  growthAreas: string[];
  practicePlan: string[];
}

export interface PersonalityAnswers {
  /** Likert answers keyed by item id, values 1–5. */
  likert: Record<string, number>;
  /** Situational answers keyed by item id, values are option ids. */
  situational: Record<string, string>;
}

export function scorePersonalityAssessment(
  answers: PersonalityAnswers,
  now: Date = new Date()
): PersonalityResult {
  const missing = LIKERT_ITEMS.filter((item) => {
    const value = answers.likert[item.id];
    return typeof value !== 'number' || Number.isNaN(value) || value < 1 || value > 5;
  });
  if (missing.length) {
    throw new Error(
      `Answer all ${LIKERT_ITEMS.length} statements before generating the profile (${missing.length} remaining).`
    );
  }

  const dimensionIndex = (dimension: PersonalityDimensionId): number => {
    const items = LIKERT_ITEMS.filter((item) => item.dimension === dimension);
    const total = items.reduce((sum, item) => {
      const raw = answers.likert[item.id];
      return sum + (item.direction === 'reverse' ? 6 - raw : raw);
    }, 0);
    const mean = total / items.length; // 1–5
    return Math.round(((mean - 1) / 4) * 100);
  };

  const situationalReview: SituationalReview[] = SITUATIONAL_ITEMS.flatMap((item) => {
    const chosenId = answers.situational[item.id];
    if (!chosenId) return [];
    const chosen = item.options.find((option) => option.id === chosenId);
    const best = [...item.options].sort((a, b) => b.score - a.score)[0];
    if (!chosen) return [];
    return [
      {
        itemId: item.id,
        scenario: item.scenario,
        chosenOption: chosen.text,
        bestOption: best.text,
        chosenScore: chosen.score,
        rationale: chosen.rationale,
      },
    ];
  });

  const situationalAlignment = situationalReview.length
    ? Math.round(
        (situationalReview.reduce((sum, item) => sum + item.chosenScore, 0) /
          (situationalReview.length * 4)) *
          100
      )
    : null;

  const dimensions: DimensionResult[] = PERSONALITY_DIMENSIONS.map((dimension) => {
    const index = dimensionIndex(dimension.id);
    const band = personalityBandFor(index);
    return {
      id: dimension.id,
      name: dimension.name,
      short: dimension.short,
      index,
      band,
      summary:
        band === 'Strong'
          ? dimension.highNote
          : band === 'Balanced'
            ? 'Mixes strengths with habits worth tightening before the interview.'
            : dimension.lowNote,
      action: dimension.developmentAction,
      panelQuestion: dimension.panelQuestion,
      followUps: PSYCHOLOGICAL_FOLLOW_UPS[dimension.id] || [],
    };
  });

  const baseIndex = Math.round(
    dimensions.reduce((sum, dimension) => sum + dimension.index, 0) / dimensions.length
  );
  const overallIndex = situationalAlignment === null
    ? baseIndex
    : Math.round(baseIndex * 0.8 + situationalAlignment * 0.2);

  const ordered = [...dimensions].sort((a, b) => b.index - a.index);
  const strongest = ordered.slice(0, 2);
  const weakest = [...ordered].reverse().slice(0, 2);

  const practicePlan = [
    ...weakest.map((dimension) => `${dimension.name} — ${dimension.action}`),
    ...(situationalAlignment !== null && situationalAlignment < 70
      ? [
          `Situational decisions scored ${situationalAlignment}% against the recommended practice option. Review the six scenarios in the review list and rewrite two of your own answers using the rationale given.`,
        ]
      : []),
    'Re-run this assessment after two weeks of practice; compare the dimension indices rather than trusting a single sitting.',
  ];

  return {
    id: `iv-personality-${now.getTime()}`,
    completedAt: now.toISOString(),
    dimensions,
    overallIndex,
    band: personalityBandFor(overallIndex),
    situationalAlignment,
    situationalReview,
    strengths: strongest.map((dimension) => `${dimension.name} (${dimension.index}/100): ${dimension.summary}`),
    growthAreas: weakest.map((dimension) => `${dimension.name} (${dimension.index}/100): ${dimension.action}`),
    practicePlan,
  };
}

/* --------------------------- session persistence --------------------------- */

export interface MockSessionCriterionRecord {
  id: CriterionId;
  score: number;
}

export interface MockInterviewSessionRecord {
  id: string;
  completedAt: string;
  trackId: InterviewTrackId;
  personaId: PanelPersonaId;
  mode: 'panel' | 'single' | 'rapid';
  questionCount: number;
  overallScore: number;
  band: PracticeBand;
  criteria: MockSessionCriterionRecord[];
  weakest: CriterionId[];
  promptSamples: string[];
}

export const INTERVIEW_SESSION_KEY = 'muqabil_interview_sessions_v1';
export const INTERVIEW_PERSONALITY_KEY = 'muqabil_interview_personality_v1';
const MAX_SESSIONS = 20;

const storage = (): Storage | null => {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
};

const isSessionRecord = (value: unknown): value is MockInterviewSessionRecord => {
  const record = value as MockInterviewSessionRecord;
  return (
    !!record &&
    typeof record.id === 'string' &&
    typeof record.completedAt === 'string' &&
    typeof record.trackId === 'string' &&
    typeof record.personaId === 'string' &&
    (record.mode === 'panel' || record.mode === 'single' || record.mode === 'rapid') &&
    typeof record.questionCount === 'number' &&
    typeof record.overallScore === 'number' &&
    typeof record.band === 'string' &&
    Array.isArray(record.criteria) &&
    record.criteria.length > 0 &&
    record.criteria.every(
      (criterion) => typeof criterion?.id === 'string' && typeof criterion?.score === 'number'
    ) &&
    Array.isArray(record.weakest) &&
    Array.isArray(record.promptSamples)
  );
};

export function readInterviewSessions(): MockInterviewSessionRecord[] {
  const store = storage();
  if (!store) return [];
  try {
    const parsed = JSON.parse(store.getItem(INTERVIEW_SESSION_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSessionRecord).slice(0, MAX_SESSIONS);
  } catch {
    return [];
  }
}

export function saveInterviewSession(record: MockInterviewSessionRecord): MockInterviewSessionRecord[] {
  const next = [record, ...readInterviewSessions().filter((item) => item.id !== record.id)].slice(
    0,
    MAX_SESSIONS
  );
  storage()?.setItem(INTERVIEW_SESSION_KEY, JSON.stringify(next));
  return next;
}

export function clearInterviewSessions(): MockInterviewSessionRecord[] {
  storage()?.removeItem(INTERVIEW_SESSION_KEY);
  return [];
}

export function readPersonalityResult(): PersonalityResult | null {
  const store = storage();
  if (!store) return null;
  try {
    const parsed = JSON.parse(store.getItem(INTERVIEW_PERSONALITY_KEY) || 'null');
    if (
      parsed &&
      typeof parsed === 'object' &&
      Array.isArray((parsed as PersonalityResult).dimensions) &&
      (parsed as PersonalityResult).dimensions.length === PERSONALITY_DIMENSIONS.length
    ) {
      return parsed as PersonalityResult;
    }
    return null;
  } catch {
    return null;
  }
}

export function savePersonalityResult(result: PersonalityResult): void {
  storage()?.setItem(INTERVIEW_PERSONALITY_KEY, JSON.stringify(result));
}

export interface InterviewHistorySummary {
  sessions: number;
  averageScore: number;
  bestScore: number;
  latestScore: number | null;
  trend: 'improving' | 'flat' | 'declining' | 'insufficient';
  weakestCriteria: { id: CriterionId; label: string; average: number }[];
  strongestCriteria: { id: CriterionId; label: string; average: number }[];
  lastPractised: string | null;
}

export function summariseInterviewHistory(
  records: MockInterviewSessionRecord[]
): InterviewHistorySummary {
  if (!records.length) {
    return {
      sessions: 0,
      averageScore: 0,
      bestScore: 0,
      latestScore: null,
      trend: 'insufficient',
      weakestCriteria: [],
      strongestCriteria: [],
      lastPractised: null,
    };
  }

  const scores = records.map((record) => record.overallScore);
  const averageScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  const criterionMap = new Map<CriterionId, number[]>();
  for (const record of records) {
    for (const criterion of record.criteria) {
      const list = criterionMap.get(criterion.id) || [];
      list.push(criterion.score * 10);
      criterionMap.set(criterion.id, list);
    }
  }
  const criterionAverages = [...criterionMap.entries()].map(([id, values]) => ({
    id,
    label: criterionById(id).label,
    average: Math.round(values.reduce((sum, value) => sum + value, 0) / values.length),
  }));
  const ordered = criterionAverages.sort((a, b) => a.average - b.average);

  const recent = records.slice(0, 3).map((record) => record.overallScore);
  const earlier = records.slice(3, 6).map((record) => record.overallScore);
  let trend: InterviewHistorySummary['trend'] = 'insufficient';
  if (earlier.length) {
    const recentAverage = recent.reduce((sum, value) => sum + value, 0) / recent.length;
    const earlierAverage = earlier.reduce((sum, value) => sum + value, 0) / earlier.length;
    const delta = recentAverage - earlierAverage;
    trend = delta > 4 ? 'improving' : delta < -4 ? 'declining' : 'flat';
  }

  return {
    sessions: records.length,
    averageScore,
    bestScore: Math.max(...scores),
    latestScore: scores[0],
    trend,
    weakestCriteria: ordered.slice(0, 3),
    strongestCriteria: [...ordered].reverse().slice(0, 3),
    lastPractised: records[0]?.completedAt || null,
  };
}

/* ------------------------- AI payload validation ------------------------- */

export interface InterviewAnswerFeedback {
  criteria: { id: CriterionId; score: number; comment: string; evidence: string; fix: string }[];
  missingPoints: string[];
  strengths: string[];
  modelOpening: string;
  followUp: string;
  panelNote: string;
}

export interface InterviewQuestionSuggestion {
  prompt: string;
  category: InterviewCategoryId;
  whyThisQuestion: string;
  listenFor: string[];
  targetSeconds: number;
  followUp: string;
}

const isShortString = (value: unknown, max = 900): value is string =>
  typeof value === 'string' && value.length > 0 && value.length <= max;

const isStringArray = (value: unknown, maxItems = 8, maxLength = 900): value is string[] =>
  Array.isArray(value) &&
  value.length <= maxItems &&
  value.every((entry) => isShortString(entry, maxLength));

export function validateInterviewAnswerFeedback(value: unknown): InterviewAnswerFeedback {
  const payload = value as InterviewAnswerFeedback;
  const knownCriteria = new Set(ANSWER_CRITERIA.map((criterion) => criterion.id));
  if (
    !payload ||
    !Array.isArray(payload.criteria) ||
    payload.criteria.length !== ANSWER_CRITERIA.length ||
    !payload.criteria.every(
      (criterion) =>
        criterion &&
        knownCriteria.has(criterion.id) &&
        typeof criterion.score === 'number' &&
        Number.isFinite(criterion.score) &&
        criterion.score >= 0 &&
        criterion.score <= 10 &&
        isShortString(criterion.comment, 1200) &&
        isShortString(criterion.fix, 900) &&
        (criterion.evidence === undefined || typeof criterion.evidence === 'string') &&
        criterion.evidence.length <= 900
    ) ||
    !isStringArray(payload.strengths) ||
    !isStringArray(payload.missingPoints) ||
    !isShortString(payload.modelOpening, 1200) ||
    !isShortString(payload.followUp, 600) ||
    !isShortString(payload.panelNote, 900)
  ) {
    throw new Error('Incomplete interviewer feedback. Please retry.');
  }
  return {
    criteria: payload.criteria.map((criterion) => ({
      ...criterion,
      evidence: criterion.evidence || '',
    })),
    missingPoints: payload.missingPoints,
    strengths: payload.strengths,
    modelOpening: payload.modelOpening,
    followUp: payload.followUp,
    panelNote: payload.panelNote,
  };
}

export function validateInterviewQuestionSuggestion(value: unknown): InterviewQuestionSuggestion {
  const payload = value as InterviewQuestionSuggestion;
  const categories = new Set<string>(INTERVIEW_CATEGORIES.map((category) => category.id));
  if (
    !payload ||
    !isShortString(payload.prompt, 600) ||
    !categories.has(payload.category) ||
    !isShortString(payload.whyThisQuestion, 600) ||
    !isStringArray(payload.listenFor, 6, 400) ||
    typeof payload.targetSeconds !== 'number' ||
    payload.targetSeconds < 30 ||
    payload.targetSeconds > 300 ||
    !isShortString(payload.followUp, 400)
  ) {
    throw new Error('The interviewer returned an unusable question. Please retry.');
  }
  return payload;
}

/** Fallback cross-question when the AI interviewer is unavailable. */
export function localFollowUp(question: InterviewQuestion | null, trackHint?: string): string {
  if (question?.followUps?.length) return question.followUps[0];
  return `Give one specific example with a date and your own role in it${trackHint ? `, relevant to ${trackHint}` : ''}.`;
}
