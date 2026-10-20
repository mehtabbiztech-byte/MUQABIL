import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Script } from 'node:vm';
import { TEACHING_LICENSE_PARTS, TEST_DEVELOPMENT_TOPICS } from './teachingLicenseNotesData';

const module_ = TEACHING_LICENSE_PARTS.find((part) => part.id === 'steda-part-2-test-development')!;

test('Test Development hub module exposes five interactive notes', () => {
  assert.ok(module_);
  assert.equal(module_.subjectName, 'Test Development & Evaluation');
  assert.equal(module_.marks, 10);
  assert.equal(module_.topics, TEST_DEVELOPMENT_TOPICS);
  assert.equal(TEST_DEVELOPMENT_TOPICS.length, 5);

  const ids = TEST_DEVELOPMENT_TOPICS.map((topic) => topic.id);
  const numbers = TEST_DEVELOPMENT_TOPICS.map((topic) => topic.topicNumber);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(numbers, ['1', '2', '3', '4', '5']);
});

test('every Test Development topic carries complete hub metadata', () => {
  for (const topic of TEST_DEVELOPMENT_TOPICS) {
    assert.ok(topic.title.length > 0, topic.id);
    assert.ok(topic.summary.length > 0, topic.id);
    assert.ok(topic.highYieldAlert.length > 0, topic.id);
    assert.ok(topic.concepts.length >= 4, topic.id);
    assert.ok(topic.comparisonTable?.rows.length, topic.id);
    assert.ok(topic.classroomApplication, topic.id);
    assert.ok(topic.mnemonicAid, topic.id);
    assert.equal(topic.frequentExamQuestions.length, 2, topic.id);
    assert.equal(topic.quickQuiz.length, 3, topic.id);
    assert.ok(topic.examDistractorTraps?.length, topic.id);
    assert.ok(topic.quickQuiz.every((quiz) => quiz.options.length === 4), topic.id);
    assert.ok(
      topic.quickQuiz.every((quiz) => quiz.correctIndex >= 0 && quiz.correctIndex < quiz.options.length),
      topic.id,
    );
  }
});

test('every Test Development topic opens its supplied standalone HTML note', () => {
  for (const topic of TEST_DEVELOPMENT_TOPICS) {
    assert.ok(topic.htmlNotesPath, topic.id);
    assert.equal(topic.htmlNotesPath, `notes/test-development-and-evaluation/${topic.id}.html`);

    const html = readFileSync(path.join(process.cwd(), 'public', topic.htmlNotesPath!), 'utf8');
    assert.match(html, /^<!DOCTYPE html>/i);
    assert.match(html, /linear-gradient\(145deg, #f3f6fd 0%, #e9eff9 100%\)/);
    assert.match(html, /@media \(max-width: 600px\)/);
    for (const id of [
      'searchInput',
      'countDisplay',
      'conceptGrid',
      'vocabGrid',
      'compareGrid',
      'applyGrid',
      'misGrid',
      'exam',
      'checklist',
      'mcqPanel',
      'crqPanel',
      'erqPanel',
    ]) {
      assert.ok(html.includes(`id="${id}"`), `${topic.id}: ${id}`);
    }
    assert.match(html, /10 MCQs/);
    assert.match(html, /4 CRQs/);
    assert.match(html, /1 ERQ/);

    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
    assert.equal(scripts.length, 1, topic.id);
    assert.doesNotThrow(() => new Script(scripts[0][1]), topic.id);

    // Supplied notes work offline: no external scripts, stylesheets or images.
    assert.doesNotMatch(html, /<(?:script|link|img)[^>]+(?:src|href)=/i, topic.id);
  }
});

test('Test Development notes expose the v2 structure and learning apparatus', () => {
  for (const topic of TEST_DEVELOPMENT_TOPICS) {
    const html = readFileSync(path.join(process.cwd(), 'public', topic.htmlNotesPath!), 'utf8');

    // One page title and eight numbered sections plus the quiz.
    assert.equal((html.match(/<h1>/g) || []).length, 1, topic.id);
    const sectionNumbers = [...html.matchAll(/<span class="section-num" aria-hidden="true">(\d{2})<\/span>/g)]
      .map((match) => match[1]);
    assert.deepEqual(sectionNumbers, ['01', '02', '03', '04', '05', '06', '07', '08'], topic.id);
    assert.ok(html.includes('class="section-lead"'), topic.id);
    assert.ok(html.includes('class="eyebrow"'), topic.id);

    // Side navigation is generated and every anchor resolves.
    const railTargets = [...html.matchAll(/<a href="#([a-z-]+)"><span class="n">/g)].map((match) => match[1]);
    assert.equal(railTargets.length, 9, topic.id);
    for (const target of railTargets) {
      assert.ok(html.includes(`id="${target}"`), `${topic.id}: ${target}`);
    }

    // Vocabulary glossary and terminology highlighting.
    const terms = [...html.matchAll(/<dt>([^<]+)<span class="tag">/g)].map((match) => match[1]);
    assert.equal(terms.length, 12, topic.id);
    assert.equal(new Set(terms).size, terms.length, topic.id);
    const highlighted = [...html.matchAll(/<strong>([^<]+)<\/strong>/g)].map((match) => match[1]);
    assert.ok(highlighted.length >= 20, `${topic.id}: ${highlighted.length} highlights`);

    // v2 learning blocks: worked examples, exam-style questions and checklist.
    assert.equal((html.match(/class="example"/g) || []).length, 3, topic.id);
    assert.equal((html.match(/class="exam-q"/g) || []).length, 2, topic.id);
    assert.equal((html.match(/<details class="model">/g) || []).length, 2, topic.id);
    assert.equal((html.match(/<input type="checkbox"/g) || []).length, 6, topic.id);
    assert.ok(html.includes('class="steps"'), topic.id);
    assert.ok(html.includes('class="result"'), topic.id);
    assert.ok(html.includes('id="railFill"'), topic.id);
    assert.ok(html.includes('class="chip command"'), topic.id);
    assert.ok(html.includes('class="exam-wording"'), topic.id);
    assert.ok(html.includes('Skip to the first section'), topic.id);
    assert.ok(html.includes('role="tab"'), topic.id);
  }
});

test('Test Development notes are not duplicated into other hub modules', () => {
  const otherIds = TEACHING_LICENSE_PARTS
    .filter((part) => part.id !== 'steda-part-2-test-development')
    .flatMap((part) => part.topics.map((topic) => topic.id));
  for (const topic of TEST_DEVELOPMENT_TOPICS) {
    assert.ok(!otherIds.includes(topic.id), topic.id);
  }
});
