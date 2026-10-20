import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Script } from 'node:vm';
import { CLASSROOM_MANAGEMENT_TOPICS, TEACHING_LICENSE_PARTS } from './teachingLicenseNotesData';
import { STUDY_CURRICULUM } from './studyNotesData';

const module_ = TEACHING_LICENSE_PARTS.find((part) => part.id === 'steda-part-2-classroom-management')!;

test('Classroom Management hub module exposes ten interactive notes', () => {
  assert.ok(module_);
  assert.equal(module_.subjectName, 'Classroom Management');
  assert.equal(module_.marks, 10);
  assert.equal(module_.topics, CLASSROOM_MANAGEMENT_TOPICS);
  assert.equal(CLASSROOM_MANAGEMENT_TOPICS.length, 10);

  const ids = CLASSROOM_MANAGEMENT_TOPICS.map((topic) => topic.id);
  const numbers = CLASSROOM_MANAGEMENT_TOPICS.map((topic) => topic.topicNumber);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(numbers, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
});

test('every Classroom Management topic carries complete hub metadata', () => {
  for (const topic of CLASSROOM_MANAGEMENT_TOPICS) {
    assert.ok(topic.title.length > 0, topic.id);
    assert.ok(topic.summary.length > 0, topic.id);
    assert.ok(topic.highYieldAlert.length > 0, topic.id);
    assert.ok(topic.concepts.length >= 5, topic.id);
    assert.ok(topic.comparisonTable?.rows.length, topic.id);
    assert.ok(topic.classroomApplication, topic.id);
    assert.ok(topic.mnemonicAid, topic.id);
    assert.equal(topic.frequentExamQuestions.length, 3, topic.id);
    assert.equal(topic.quickQuiz.length, 3, topic.id);
    assert.ok(topic.examDistractorTraps?.length, topic.id);
    assert.ok(topic.quickQuiz.every((quiz) => quiz.options.length === 4), topic.id);
    assert.ok(
      topic.quickQuiz.every((quiz) => quiz.correctIndex >= 0 && quiz.correctIndex < quiz.options.length),
      topic.id,
    );
  }
});

test('every Classroom Management topic opens its supplied standalone HTML note', () => {
  for (const topic of CLASSROOM_MANAGEMENT_TOPICS) {
    assert.ok(topic.htmlNotesPath, topic.id);
    assert.equal(topic.htmlNotesPath, `notes/classroom-management/${topic.id}.html`);

    const html = readFileSync(path.join(process.cwd(), 'public', topic.htmlNotesPath!), 'utf8');
    assert.match(html, /^<!DOCTYPE html>/i);
    assert.match(html, /linear-gradient\(145deg, #f3f6fd 0%, #e9eff9 100%\)/);
    assert.match(html, /@media \(max-width: 600px\)/);
    for (const id of [
      'searchInput',
      'countDisplay',
      'conceptGrid',
      'compareGrid',
      'applyGrid',
      'misGrid',
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

test('Classroom Management notes are not duplicated into other hub modules', () => {
  const otherIds = TEACHING_LICENSE_PARTS
    .filter((part) => part.id !== 'steda-part-2-classroom-management')
    .flatMap((part) => part.topics.map((topic) => topic.id));
  for (const topic of CLASSROOM_MANAGEMENT_TOPICS) {
    assert.ok(!otherIds.includes(topic.id), topic.id);
  }

  // Study Notes keeps its own curriculum, so the hub module stays the single source.
  const studyLessonIds = STUDY_CURRICULUM.flatMap((subject) =>
    subject.chapters.flatMap((chapter) =>
      chapter.topics.flatMap((topic) => topic.lessons.map((lesson) => lesson.id)),
    ),
  );
  assert.equal(new Set(studyLessonIds).size, studyLessonIds.length);
});

test('redesigned notes expose a clear hierarchy and a key-vocabulary glossary', () => {
  for (const topic of CLASSROOM_MANAGEMENT_TOPICS) {
    const html = readFileSync(path.join(process.cwd(), 'public', topic.htmlNotesPath!), 'utf8');

    // One page title, then numbered sections with their own heading levels.
    assert.equal((html.match(/<h1>/g) || []).length, 1, topic.id);
    const sectionNumbers = [...html.matchAll(/<span class="section-num" aria-hidden="true">(\d{2})<\/span>/g)]
      .map((match) => match[1]);
    assert.deepEqual(sectionNumbers, ['01', '02', '03', '04', '05', '06'], topic.id);
    assert.ok(html.includes('class="section-head"'), topic.id);
    assert.ok(html.includes('class="eyebrow"'), topic.id);
    assert.ok(html.includes('class="section-lead"'), topic.id);

    // Table of contents links resolve to real sections in the document.
    const tocTargets = [...html.matchAll(/<a href="#([a-z-]+)"><span class="toc-num">/g)]
      .map((match) => match[1]);
    assert.ok(tocTargets.length >= 7, topic.id);
    for (const target of tocTargets) {
      assert.ok(html.includes(`id="${target}"`), `${topic.id}: ${target}`);
    }

    // Key vocabulary is defined, and terminology is highlighted in the body.
    const terms = [...html.matchAll(/<dt class="vocab-term">([^<]+)<\/dt>/g)].map((match) => match[1]);
    assert.ok(terms.length >= 10, `${topic.id}: ${terms.length} terms`);
    assert.equal(new Set(terms).size, terms.length, topic.id);
    for (const term of terms) {
      assert.ok(term.trim().length > 0, topic.id);
    }
    const highlighted = [...html.matchAll(/<strong>([^<]+)<\/strong>/g)].map((match) => match[1]);
    assert.ok(highlighted.length >= 10, `${topic.id}: ${highlighted.length} highlights`);

    // Structure helpers that make the note study-ready.
    assert.ok(html.includes('class="objectives"'), topic.id);
    assert.ok(html.includes('class="practice-box"'), topic.id);
    assert.ok(html.includes('class="myth-tag"'), topic.id);
    assert.ok(html.includes('class="exam-tip"'), topic.id);
    assert.ok(html.includes('class="takeaways"'), topic.id);
    assert.ok(html.includes('id="progressFill"'), topic.id);
    assert.ok(html.includes('role="tab"'), topic.id);
  }
});
