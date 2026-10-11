/**
 * Client for /api/interview-coach.
 *
 * The caller always has an offline path: if this module throws, the UI keeps
 * working with the curated question bank and the local structural analyser
 * from `interviewPrep.ts`.
 */

import type { InterviewCategoryId, InterviewTrackId, PanelPersonaId } from '../data/interviewPrepData';
import {
  validateInterviewAnswerFeedback,
  validateInterviewQuestionSuggestion,
  type InterviewAnswerFeedback,
  type InterviewQuestionSuggestion,
} from './interviewPrep';

export interface InterviewTranscriptEntry {
  role: 'interviewer' | 'candidate';
  text: string;
}

export interface InterviewCoachCandidateContext {
  exam?: string;
  province?: string;
  post?: string;
  background?: string;
}

export interface InterviewCoachRequest {
  trackId: InterviewTrackId;
  personaId: PanelPersonaId;
  category: InterviewCategoryId;
  transcript?: InterviewTranscriptEntry[];
  candidateContext?: InterviewCoachCandidateContext;
}

export interface InterviewQuestionRequest extends InterviewCoachRequest {
  askedPrompts?: string[];
}

export interface InterviewFeedbackRequest extends InterviewCoachRequest {
  question: string;
  answer: string;
  targetSeconds?: number;
}

export const isAiConfiguredHint = (message: string): boolean =>
  /not configured|unavailable/i.test(message);

async function postInterviewCoach(
  body: Record<string, unknown>,
  signalTimeoutMs = 35000
): Promise<unknown> {
  const response = await fetch('/api/interview-coach', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(signalTimeoutMs),
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      (payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string'
        ? payload.error
        : null) || `Interview coach request failed (${response.status}).`;
    throw new Error(message);
  }
  return payload;
}

export async function requestInterviewerQuestion(
  request: InterviewQuestionRequest
): Promise<InterviewQuestionSuggestion & { source: 'ai' }> {
  const payload = await postInterviewCoach({
    mode: 'question',
    trackId: request.trackId,
    personaId: request.personaId,
    category: request.category,
    transcript: (request.transcript || []).slice(-24),
    candidateContext: request.candidateContext,
    askedPrompts: (request.askedPrompts || []).slice(-12),
  });
  return { ...validateInterviewQuestionSuggestion(payload), source: 'ai' };
}

export async function requestInterviewFeedback(
  request: InterviewFeedbackRequest
): Promise<InterviewAnswerFeedback & { source: 'ai' }> {
  const payload = await postInterviewCoach({
    mode: 'feedback',
    trackId: request.trackId,
    personaId: request.personaId,
    category: request.category,
    transcript: (request.transcript || []).slice(-24),
    question: request.question,
    answer: request.answer,
    targetSeconds: request.targetSeconds,
  });
  return { ...validateInterviewAnswerFeedback(payload), source: 'ai' };
}
