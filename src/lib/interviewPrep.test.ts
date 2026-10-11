import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  analyseInterviewAnswer,
  bandForScore,
  buildImprovementPlan,
  clearInterviewSessions,
  estimateSpeakingSeconds,
  localFollowUp,
  readInterviewSessions,
  readPersonalityResult,
  saveInterviewSession,
  savePersonalityResult,
  scorePersonalityAssessment,
  summariseInterviewHistory,
  validateInterviewAnswerFeedback,
  validateInterviewQuestionSuggestion,
  type MockInterviewSessionRecord,
} from './interviewPrep';
import {
  ANSWER_CRITERIA,
  LIKERT_ITEMS,
  SITUATIONAL_ITEMS,
} from '../data/interviewPrepData';
import { getInterviewQuestion } from '../data/interviewQuestionBank';

const QUESTION = getInterviewQuestion('iv-intro-2')!;

const STRONG_ANSWER =
  'Public service is my first choice because I want to work at the counter where policy meets citizens. First, as a volunteer in my union council I organised a vaccination register for 320 households and we raised coverage in two wards. Second, the work I want to do is the boring part of administration: records, receipts and follow-up, because that is where a citizen experiences the state. In short, I accept a field station and a slow promotion, but I want the work itself to be verifiable.';

const WEAK_ANSWER =
  'Well, that is a very good question. Basically I think maybe a government job is kind of good, you know, because there is security and stuff. I am not sure I can explain it properly, sorry, I am not an expert. Sort of, I would like to serve the country and like help people, maybe in future.';

test('estimates spoken length from word count at a realistic speaking rate', () => {
  assert.equal(estimateSpeakingSeconds(''), 0);
  assert.equal(estimateSpeakingSeconds(new Array(135).fill('word').join(' ')), 60);
});

test('a structured, evidenced answer scores clearly above a hedged, rambling one', () => {
  const strong = analyseInterviewAnswer({ answer: STRONG_ANSWER, question: QUESTION, targetSeconds: 90 });
  const weak = analyseInterviewAnswer({ answer: WEAK_ANSWER, question: QUESTION, targetSeconds: 90 });
  assert.equal(strong.criteria.length, ANSWER_CRITERIA.length);
  assert.ok(strong.overallScore > weak.overallScore + 25, `${strong.overallScore} vs ${weak.overallScore}`);
  assert.ok(strong.overallScore >= 60);
  assert.ok(weak.overallScore < 55);
  assert.ok(strong.flags.length < weak.flags.length);
  assert.ok(weak.flags.some((flag) => /filler|hedging/i.test(flag)));
});

test('the analyser scores the criteria independently and reports honest observations', () => {
  const analysis = analyseInterviewAnswer({ answer: STRONG_ANSWER, question: QUESTION, targetSeconds: 90 });
  const directness = analysis.criteria.find((criterion) => criterion.id === 'directness')!;
  const substance = analysis.criteria.find((criterion) => criterion.id === 'substance')!;
  const relevance = analysis.criteria.find((criterion) => criterion.id === 'relevance')!;
  assert.ok(directness.score >= 5, `directness ${directness.score}`);
  assert.ok(substance.score >= 6, `substance ${substance.score}`);
  assert.ok(relevance.score >= 5, `relevance ${relevance.score}`);
  for (const criterion of analysis.criteria) {
    assert.ok(criterion.observations.length >= 1, criterion.id);
    assert.ok(criterion.score >= 0 && criterion.score <= 10, criterion.id);
  }
  assert.ok(Math.abs(ANSWER_CRITERIA.reduce((sum, criterion) => sum + criterion.weight, 0) - 1) < 0.0001);
});

test('concision reacts to the measured speaking time, and time overruns are flagged', () => {
  const onTarget = analyseInterviewAnswer({ answer: STRONG_ANSWER, question: QUESTION, targetSeconds: 90 });
  const overrun = analyseInterviewAnswer({
    answer: STRONG_ANSWER,
    question: QUESTION,
    targetSeconds: 30,
    timeTakenSeconds: 150,
  });
  const onTargetConcision = onTarget.criteria.find((criterion) => criterion.id === 'concision')!;
  const overrunConcision = overrun.criteria.find((criterion) => criterion.id === 'concision')!;
  assert.ok(onTargetConcision.score > overrunConcision.score);
  assert.ok(overrun.flags.some((flag) => /target/i.test(flag)));
});

test('an answer that avoids the question is caught when a question is supplied', () => {
  const offTopic = analyseInterviewAnswer({
    answer: 'My favourite subject in school was mathematics and I also enjoyed cricket with my cousins every evening after classes.',
    question: getInterviewQuestion('iv-pk-1')!,
    targetSeconds: 120,
  });
  const relevance = offTopic.criteria.find((criterion) => criterion.id === 'relevance')!;
  assert.ok(relevance.score <= 5, `relevance scored ${relevance.score}`);
  assert.ok(offTopic.flags.some((flag) => /outside the words|thinner/i.test(flag)));
});

test('the improvement plan points at the weakest criteria and the bands are ordered', () => {
  const weak = analyseInterviewAnswer({ answer: WEAK_ANSWER, question: QUESTION, targetSeconds: 90 });
  const plan = buildImprovementPlan(weak, 3);
  assert.equal(plan.length, 6);
  for (const drill of plan) assert.ok(drill.length > 20, drill);
  assert.equal(bandForScore(20), 'Needs structure');
  assert.equal(bandForScore(55), 'Developing');
  assert.equal(bandForScore(75), 'Interview ready');
  assert.equal(bandForScore(90), 'Panel strong');
});

test('personality scoring is deterministic, direction-aware and refuses incomplete input', () => {
  // Ideal profile: agree with every positive statement, disagree with every reverse one.
  const ideal: Record<string, number> = {};
  const worst: Record<string, number> = {};
  for (const item of LIKERT_ITEMS) {
    ideal[item.id] = item.direction === 'reverse' ? 1 : 5;
    worst[item.id] = item.direction === 'reverse' ? 5 : 1;
  }
  const high = scorePersonalityAssessment({ likert: ideal, situational: {} });
  assert.equal(high.overallIndex, 100);
  assert.equal(high.band, 'Strong');
  assert.equal(high.dimensions.length, 6);
  assert.equal(high.situationalAlignment, null);

  const low = scorePersonalityAssessment({ likert: worst, situational: {} });
  assert.equal(low.overallIndex, 0);
  assert.equal(low.band, 'Developing');
  assert.ok(low.practicePlan.length >= 3);

  // Agreeing with a reverse-scored statement must lower that dimension, not raise it.
  const straightLine = { ...ideal };
  const reverseItem = LIKERT_ITEMS.find((item) => item.direction === 'reverse')!;
  straightLine[reverseItem.id] = 5;
  const adjusted = scorePersonalityAssessment({ likert: straightLine, situational: {} });
  const before = high.dimensions.find((dimension) => dimension.id === reverseItem.dimension)!;
  const after = adjusted.dimensions.find((dimension) => dimension.id === reverseItem.dimension)!;
  assert.ok(after.index < before.index, `${after.index} should be below ${before.index}`);

  assert.throws(() => scorePersonalityAssessment({ likert: { [LIKERT_ITEMS[0].id]: 3 }, situational: {} }), /Answer all/);
  assert.throws(
    () => scorePersonalityAssessment({ likert: { ...ideal, [LIKERT_ITEMS[0].id]: 9 }, situational: {} }),
    /Answer all/
  );
});

test('situational choices are reviewed against the recommended practice option', () => {
  const likert: Record<string, number> = {};
  for (const item of LIKERT_ITEMS) likert[item.id] = 4;
  const best: Record<string, string> = {};
  const worst: Record<string, string> = {};
  for (const item of SITUATIONAL_ITEMS) {
    best[item.id] = [...item.options].sort((a, b) => b.score - a.score)[0].id;
    worst[item.id] = [...item.options].sort((a, b) => a.score - b.score)[0].id;
  }
  const strongSituational = scorePersonalityAssessment({ likert, situational: best });
  const weakSituational = scorePersonalityAssessment({ likert, situational: worst });
  assert.equal(strongSituational.situationalAlignment, 100);
  assert.equal(weakSituational.situationalAlignment, 25);
  assert.ok(strongSituational.overallIndex > weakSituational.overallIndex);
  assert.equal(strongSituational.situationalReview.length, SITUATIONAL_ITEMS.length);
  assert.ok(strongSituational.situationalReview[0].rationale.length > 20);
  assert.ok(strongSituational.practicePlan.length >= 3);
  assert.ok(weakSituational.practicePlan.some((line) => /situational/i.test(line)), 'a weak scenario score must add a situational drill');
  assert.ok(!strongSituational.practicePlan.some((line) => /situational decisions scored/i.test(line)));
});

test('session history is stored, capped, summarised and cleared safely', () => {
  const store = new Map<string, string>();
  (globalThis as any).localStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
    removeItem: (key: string) => void store.delete(key),
  };
  try {
    assert.deepEqual(readInterviewSessions(), []);
    const record: MockInterviewSessionRecord = {
      id: 'iv-session-test',
      completedAt: new Date().toISOString(),
      trackId: 'css',
      personaId: 'chairperson',
      mode: 'panel',
      questionCount: 5,
      overallScore: 72,
      band: 'Interview ready',
      criteria: ANSWER_CRITERIA.map((criterion) => ({ id: criterion.id, score: 7 })),
      weakest: ['concision'],
      promptSamples: ['Introduce yourself'],
    };
    const saved = saveInterviewSession(record);
    assert.equal(saved.length, 1);
    assert.equal(readInterviewSessions()[0].id, 'iv-session-test');

    for (let index = 0; index < 30; index += 1) {
      saveInterviewSession({ ...record, id: `iv-session-${index}`, overallScore: 50 + index });
    }
    assert.equal(readInterviewSessions().length, 20, 'history must be capped on the device');

    const loudest = summariseInterviewHistory(readInterviewSessions());
    assert.equal(loudest.sessions, 20);
    assert.ok(loudest.averageScore > 0);
    assert.equal(loudest.weakestCriteria.length, 3);
    assert.equal(loudest.strongestCriteria.length, 3);

    clearInterviewSessions();
    for (const score of [40, 50, 52, 60, 70, 80]) {
      saveInterviewSession({ ...record, id: `iv-session-score-${score}`, overallScore: score });
    }
    const summary = summariseInterviewHistory(readInterviewSessions());
    assert.equal(summary.sessions, 6);
    assert.equal(summary.latestScore, 80);
    assert.equal(summary.bestScore, 80);
    assert.equal(summary.trend, 'improving');
    assert.ok(summary.weakestCriteria.every((criterion) => criterion.average > 0));

    store.set('muqabil_interview_sessions_v1', '{ not json');
    assert.deepEqual(readInterviewSessions(), []);
    store.set('muqabil_interview_sessions_v1', JSON.stringify([{ id: 'broken' }]));
    assert.deepEqual(readInterviewSessions(), []);
    assert.deepEqual(clearInterviewSessions(), []);

    const result = scorePersonalityAssessment(
      { likert: Object.fromEntries(LIKERT_ITEMS.map((item) => [item.id, 4])), situational: {} },
      new Date('2026-10-09T10:00:00.000Z')
    );
    savePersonalityResult(result);
    assert.equal(readPersonalityResult()?.id, result.id);
    store.set('muqabil_interview_personality_v1', JSON.stringify({ dimensions: [] }));
    assert.equal(readPersonalityResult(), null);
  } finally {
    delete (globalThis as any).localStorage;
  }
});

test('persistence degrades gracefully when no storage exists', () => {
  assert.deepEqual(readInterviewSessions(), []);
  assert.equal(readPersonalityResult(), null);
  assert.deepEqual(clearInterviewSessions(), []);
});

test('the AI payload validators reject malformed interviewer output', () => {
  const goodFeedback = {
    criteria: ANSWER_CRITERIA.map((criterion) => ({
      id: criterion.id,
      score: 7,
      comment: 'Clear enough for a panel but the example arrives late.',
      evidence: 'as a volunteer in my union council',
      fix: 'Lead with the action you personally took.',
    })),
    strengths: ['Specific example'],
    missingPoints: ['One measurable outcome'],
    modelOpening: 'Public service is my first choice because the counter is where policy meets citizens.',
    followUp: 'What did the register change in those two wards?',
    panelNote: 'A candidate who can be probed and remembers the details.',
  };
  const validated = validateInterviewAnswerFeedback(goodFeedback);
  assert.equal(validated.criteria.length, ANSWER_CRITERIA.length);
  assert.equal(validated.criteria[0].score, 7);

  assert.throws(() => validateInterviewAnswerFeedback({ ...goodFeedback, criteria: [] }), /Incomplete/);
  assert.throws(
    () => validateInterviewAnswerFeedback({ ...goodFeedback, criteria: goodFeedback.criteria.slice(1) }),
    /Incomplete/
  );
  assert.throws(
    () =>
      validateInterviewAnswerFeedback({
        ...goodFeedback,
        criteria: goodFeedback.criteria.map((criterion, index) => (index ? criterion : { ...criterion, score: 11 })),
      }),
    /Incomplete/
  );
  assert.throws(() => validateInterviewAnswerFeedback({ ...goodFeedback, followUp: 'x'.repeat(700) }), /Incomplete/);

  const goodQuestion = {
    prompt: 'You wrote that you led a team. Tell me exactly what you did.',
    category: 'intro-motivation',
    whyThisQuestion: 'Tests whether the candidate can separate their own contribution from the team’s.',
    listenFor: ['Own action', 'Dates', 'Outcome'],
    targetSeconds: 90,
    followUp: 'Who disagreed with you, and how did you handle it?',
  };
  assert.equal(validateInterviewQuestionSuggestion(goodQuestion).prompt, goodQuestion.prompt);
  assert.throws(() => validateInterviewQuestionSuggestion({ ...goodQuestion, category: 'invented' }), /unusable/);
  assert.throws(() => validateInterviewQuestionSuggestion({ ...goodQuestion, targetSeconds: 5 }), /unusable/);
});

test('the local fallback follow-up always produces a usable cross-question', () => {
  assert.equal(localFollowUp(QUESTION), QUESTION.followUps[0]);
  assert.match(localFollowUp(null, 'CSS'), /specific example/);
});
