import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ANSWER_CRITERIA,
  CRITERION_TOTAL_WEIGHT,
  INTERVIEW_CATEGORIES,
  INTERVIEW_DAY_CHECKLIST,
  INTERVIEW_DO_DONT,
  INTERVIEW_TRACKS,
  LIKERT_ITEMS,
  PANEL_PERSONAS,
  PERSONALITY_DIMENSIONS,
  SITUATIONAL_ITEMS,
} from './interviewPrepData';
import { INTERVIEW_QUESTIONS, buildInterviewBlueprint, questionsForTrack } from './interviewQuestionBank';

const CATEGORY_IDS = new Set(INTERVIEW_CATEGORIES.map((category) => category.id));
const TRACK_IDS = new Set(INTERVIEW_TRACKS.map((track) => track.id));
const PERSONA_IDS = new Set(PANEL_PERSONAS.map((persona) => persona.id));
const DIMENSION_IDS = new Set(PERSONALITY_DIMENSIONS.map((dimension) => dimension.id));

test('every interview track is honestly sourced and links to an official portal', () => {
  assert.equal(new Set(INTERVIEW_TRACKS.map((track) => track.id)).size, INTERVIEW_TRACKS.length);
  for (const track of INTERVIEW_TRACKS) {
    assert.match(track.officialUrl, /^https:\/\//, track.id);
    assert.match(track.sourceNote, /confirm|verify|check/i, track.id);
    assert.ok(track.marksNote.length > 40, track.id);
    assert.ok(track.qualifyingNote.length > 20, track.id);
    assert.ok(track.hotTopics.length >= 5, track.id);
    assert.ok(track.panelFocus.length >= 4, track.id);
    assert.ok(track.documentsChecklist.length >= 3, track.id);
    assert.ok(track.etiquetteTips.length >= 3, track.id);
    assert.match(track.lastReviewed, /^\d{4}-\d{2}$/, track.id);
    const blueprintKeys = Object.keys(track.blueprint);
    assert.ok(blueprintKeys.length >= 5, track.id);
    for (const key of blueprintKeys) {
      assert.ok(CATEGORY_IDS.has(key as never), `${track.id} blueprint references ${key}`);
      assert.ok((track.blueprint[key as keyof typeof track.blueprint] || 0) > 0, track.id);
    }
  }
});

test('the AI panel is made of named seats, each with a behaviour brief', () => {
  assert.equal(new Set(PANEL_PERSONAS.map((persona) => persona.id)).size, PANEL_PERSONAS.length);
  for (const persona of PANEL_PERSONAS) {
    assert.ok(persona.brief.length > 80, persona.id);
    assert.ok(persona.focus.length > 20, persona.id);
    assert.ok(persona.sampleProbe.length > 20, persona.id);
    assert.ok(persona.categories.length >= 1, persona.id);
    for (const category of persona.categories) assert.ok(CATEGORY_IDS.has(category), persona.id);
  }
});

test('every curated question is complete, uniquely identified and linked to a real track', () => {
  assert.ok(INTERVIEW_QUESTIONS.length >= 90, `bank is too small: ${INTERVIEW_QUESTIONS.length}`);
  assert.equal(new Set(INTERVIEW_QUESTIONS.map((question) => question.id)).size, INTERVIEW_QUESTIONS.length);

  for (const question of INTERVIEW_QUESTIONS) {
    assert.ok(CATEGORY_IDS.has(question.category), question.id);
    assert.ok(question.prompt.length >= 20, question.id);
    assert.ok(question.followUps.length >= 1, question.id);
    assert.ok(question.expectedPoints.length >= 3, question.id);
    assert.ok(question.structureHint.length >= 3, question.id);
    assert.ok(question.commonMistakes.length >= 2, question.id);
    assert.ok(question.targetSeconds >= 30 && question.targetSeconds <= 300, question.id);
    assert.ok(['Warm-up', 'Standard', 'Stress'].includes(question.difficulty), question.id);
    if (question.tracks !== 'all') {
      assert.ok(question.tracks.length >= 1, question.id);
      for (const trackId of question.tracks) assert.ok(TRACK_IDS.has(trackId), `${question.id} → ${trackId}`);
    }
    if (question.sourceRef) assert.match(question.sourceRef.url, /^https:\/\//, question.id);
  }
});

test('every question area has coverage and every exam format has a usable bank', () => {
  for (const category of INTERVIEW_CATEGORIES) {
    const count = INTERVIEW_QUESTIONS.filter((question) => question.category === category.id).length;
    assert.ok(count >= 6, `${category.id} only has ${count} questions`);
  }
  for (const track of INTERVIEW_TRACKS) {
    assert.ok(questionsForTrack(track.id).length >= 20, `${track.id} has a thin bank`);
  }
});

test('factual areas carry official reference links rather than unsourced claims', () => {
  const factual = INTERVIEW_QUESTIONS.filter((question) =>
    ['pakistan-affairs', 'islamic-ideology', 'current-affairs'].includes(question.category)
  );
  const sourced = factual.filter((question) => Boolean(question.sourceRef));
  assert.ok(sourced.length >= 15, `only ${sourced.length} factual questions carry a source`);
  for (const question of sourced) {
    assert.match(question.sourceRef!.label, /\w{4,}/, question.id);
  }
});

test('the practice rubric is weighted, documented and gives a drill for every criterion', () => {
  assert.equal(ANSWER_CRITERIA.length, 7);
  assert.ok(Math.abs(CRITERION_TOTAL_WEIGHT - 1) < 0.0001, `weights sum to ${CRITERION_TOTAL_WEIGHT}`);
  for (const criterion of ANSWER_CRITERIA) {
    assert.ok(criterion.weight > 0 && criterion.weight <= 0.25, criterion.id);
    assert.ok(criterion.description.length > 20, criterion.id);
    assert.ok(criterion.whatGoodLooksLike.length > 20, criterion.id);
    assert.ok(criterion.drills.length >= 2, criterion.id);
  }
});

test('the personality instrument is balanced, scored and transparent about being self-reflection', () => {
  assert.equal(PERSONALITY_DIMENSIONS.length, 6);
  for (const dimension of PERSONALITY_DIMENSIONS) {
    const items = LIKERT_ITEMS.filter((item) => item.dimension === dimension.id);
    assert.ok(items.length >= 3, dimension.id);
    assert.ok(items.some((item) => item.direction === 'reverse'), `${dimension.id} has no reverse-scored item`);
    assert.ok(dimension.panelQuestion.length > 20, dimension.id);
    assert.ok(dimension.developmentAction.length > 20, dimension.id);
  }
  assert.equal(LIKERT_ITEMS.length, 24);

  for (const item of SITUATIONAL_ITEMS) {
    assert.ok(DIMENSION_IDS.has(item.dimension), item.id);
    assert.ok(item.options.length >= 4, item.id);
    const scores = item.options.map((option) => option.score);
    assert.equal(Math.max(...scores), 4, `${item.id} needs one recommended practice option`);
    assert.equal(Math.min(...scores), 1, `${item.id} needs one clearly poor option to discriminate`);
    assert.ok(new Set(scores).size >= 3, `${item.id} options are too similar to discriminate`);
    assert.equal(scores.filter((score) => score === 4).length, 1, `${item.id} must have a single recommended option`);
    for (const option of item.options) assert.ok(option.rationale.length > 30, `${item.id}/${option.id}`);
  }
});

test('checklists and do/don’t guidance are present for interview day', () => {
  assert.ok(INTERVIEW_DAY_CHECKLIST.length >= 3);
  for (const group of INTERVIEW_DAY_CHECKLIST) {
    assert.ok(group.items.length >= 5, group.id);
    assert.ok(group.note.length > 10, group.id);
  }
  assert.ok(INTERVIEW_DO_DONT.do.length >= 4);
  assert.ok(INTERVIEW_DO_DONT.dont.length >= 4);
});

test('mock blueprints are deterministic, unique and shaped by the exam format', () => {
  const css = INTERVIEW_TRACKS.find((track) => track.id === 'css')!;
  const first = buildInterviewBlueprint(css, 5, 42);
  const second = buildInterviewBlueprint(css, 5, 42);
  assert.deepEqual(
    first.map((slot) => slot.question.id),
    second.map((slot) => slot.question.id)
  );
  assert.equal(first.length, 5);
  assert.equal(new Set(first.map((slot) => slot.question.id)).size, 5);
  for (const slot of first) assert.equal(slot.question.category, slot.category);

  const sts = INTERVIEW_TRACKS.find((track) => track.id === 'sts')!;
  const stsBlueprint = buildInterviewBlueprint(sts, 6, 7);
  assert.equal(stsBlueprint.length, 6);
  assert.ok(stsBlueprint.every((slot) => slot.question.tracks === 'all' || slot.question.tracks.includes('sts')));

  assert.equal(buildInterviewBlueprint(css, 0, 1).length, 0);
});
