/**
 * Interview question bank — combined index and selection helpers.
 *
 * The bank is curated practice material. It is deliberately not an official
 * question paper and every question carries its own guidance rather than a
 * single "correct answer".
 */

import {
  INTERVIEW_CATEGORIES,
  type InterviewCategoryId,
  type InterviewQuestion,
  type InterviewTrack,
  type InterviewTrackId,
} from './interviewPrepData';
import { INTERVIEW_BANK_CORE } from './interviewBankCore';
import { INTERVIEW_BANK_PROFESSIONAL } from './interviewBankProfessional';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  ...INTERVIEW_BANK_CORE,
  ...INTERVIEW_BANK_PROFESSIONAL,
];

export const getInterviewQuestion = (id: string | null | undefined): InterviewQuestion | null =>
  INTERVIEW_QUESTIONS.find((question) => question.id === id) || null;

export const tracksForQuestion = (question: InterviewQuestion, trackId: InterviewTrackId): boolean =>
  question.tracks === 'all' || question.tracks.includes(trackId);

export function questionsForTrack(trackId: InterviewTrackId): InterviewQuestion[] {
  return INTERVIEW_QUESTIONS.filter((question) => tracksForQuestion(question, trackId));
}

export function questionsForCategory(
  categoryId: InterviewCategoryId,
  trackId?: InterviewTrackId
): InterviewQuestion[] {
  return INTERVIEW_QUESTIONS.filter(
    (question) =>
      question.category === categoryId && (!trackId || tracksForQuestion(question, trackId))
  );
}

export const countQuestionsByCategory = (
  trackId?: InterviewTrackId
): Record<InterviewCategoryId, number> =>
  INTERVIEW_CATEGORIES.reduce((accumulator, category) => {
    accumulator[category.id] = questionsForCategory(category.id, trackId).length;
    return accumulator;
  }, {} as Record<InterviewCategoryId, number>);

/** Small deterministic PRNG so a session can be reproduced from its seed. */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  const random = mulberry32(seed);
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export interface BlueprintSlot {
  category: InterviewCategoryId;
  question: InterviewQuestion;
}

/**
 * Build a mixed interview blueprint for the chosen track.
 *
 * The track's `blueprint` weights drive a largest-remainder allocation, so a
 * five-question mock still touches the areas that matter for that exam rather
 * than drifting into one category.
 */
export function buildInterviewBlueprint(
  track: InterviewTrack,
  questionCount: number,
  seed: number = Date.now()
): BlueprintSlot[] {
  const categories = INTERVIEW_CATEGORIES.map((category) => category.id).filter(
    (id) => (track.blueprint[id] || 0) > 0
  );
  if (!categories.length || questionCount <= 0) return [];

  const totalWeight = categories.reduce((sum, id) => sum + (track.blueprint[id] || 0), 0);
  const pool = new Map<InterviewCategoryId, InterviewQuestion[]>(
    categories.map((id) => [id, shuffleWithSeed(questionsForCategory(id, track.id), seed + id.length)])
  );

  const allocation = categories.map((id) => {
    const exact = (questionCount * (track.blueprint[id] || 0)) / totalWeight;
    return { id, base: Math.floor(exact), remainder: exact - Math.floor(exact) };
  });

  let assigned = allocation.reduce((sum, item) => sum + item.base, 0);
  const ordered = [...allocation].sort((a, b) => b.remainder - a.remainder);
  let cursor = 0;
  while (assigned < questionCount && ordered.length) {
    const target = ordered[cursor % ordered.length];
    const available = pool.get(target.id)?.length || 0;
    if (target.base < available) {
      target.base += 1;
      assigned += 1;
    }
    cursor += 1;
    if (cursor > questionCount * ordered.length + ordered.length) break;
  }

  // Distribute the remaining slots to whichever category still has questions.
  const slots: BlueprintSlot[] = [];
  const rounds = Math.max(...allocation.map((item) => item.base), 1);
  for (let round = 0; round < rounds && slots.length < questionCount; round += 1) {
    for (const item of allocation) {
      if (slots.length >= questionCount) break;
      if (round >= item.base) continue;
      const queue = pool.get(item.id) || [];
      const question = queue.shift();
      if (question) slots.push({ category: item.id, question });
    }
  }

  if (slots.length < questionCount) {
    const used = new Set(slots.map((slot) => slot.question.id));
    const fallback = shuffleWithSeed(questionsForTrack(track.id), seed + 7).find(
      (question) => !used.has(question.id)
    );
    if (fallback) slots.push({ category: fallback.category, question: fallback });
  }

  return slots.slice(0, questionCount);
}
