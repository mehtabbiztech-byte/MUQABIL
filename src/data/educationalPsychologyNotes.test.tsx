import React from 'react';
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Script } from 'node:vm';
import { renderToStaticMarkup } from 'react-dom/server';
import { HtmlStudyLessonReader } from '../components/HtmlStudyLessonReader';
import {
  EDUCATIONAL_PSYCHOLOGY_LESSONS,
  EDUCATIONAL_PSYCHOLOGY_SUBJECT,
} from './educationalPsychologyNotes';
import { STUDY_CURRICULUM } from './studyNotesData';
import { EDUCATIONAL_PSYCHOLOGY_TOPICS, TEACHING_LICENSE_PARTS } from './teachingLicenseNotesData';

const educationalPsychologyDocuments = [
  {
    lessonId: 'edu-psych-basics-learning-theories',
    path: 'notes/educational-psychology/basics-of-educational-psychology-major-learning-theories.html',
    heading: 'Basics of Educational Psychology: Major Learning Theories',
    grids: [],
  },
  {
    lessonId: 'edu-psych-vs-educational-psychology',
    path: 'notes/educational-psychology/differences-between-psychology-and-educational-psychology.html',
    heading: 'Psychology vs. Educational Psychology',
    grids: ['focusGrid', 'simGrid'],
  },
  {
    lessonId: 'edu-psych-learning-theories',
    path: 'notes/educational-psychology/learning-theories-behaviorism-cognitivism-constructivism-humanism.html',
    heading: 'Learning Theories: Behaviorism, Cognitivism, Constructivism &amp; Humanism',
    grids: ['overviewGrid', 'relationGrid'],
  },
  {
    lessonId: 'edu-psych-individual-differences',
    path: 'notes/educational-psychology/individual-differences-in-educational-psychology.html',
    heading: 'Individual Differences in Educational Psychology',
    grids: ['dimGrid', 'implGrid'],
  },
  {
    lessonId: 'edu-psych-basic-needs-motivation',
    path: 'notes/educational-psychology/basic-needs-and-motivation.html',
    heading: 'Basic Needs &amp; Motivation',
    grids: ['needGrid', 'sdtGrid'],
  },
  {
    lessonId: 'edu-psych-home-school-community',
    path: 'notes/educational-psychology/learning-and-motivation-in-home-school-and-community.html',
    heading: 'Learning &amp; Motivation in the Context of Home, School, and Community',
    grids: ['ecoGrid', 'contextGrid'],
  },
];

test('Educational Psychology notes expose six complete, uniquely identified lessons', () => {
  assert.equal(EDUCATIONAL_PSYCHOLOGY_LESSONS.length, 6);
  assert.equal(
    new Set(EDUCATIONAL_PSYCHOLOGY_LESSONS.map((item) => item.id)).size,
    EDUCATIONAL_PSYCHOLOGY_LESSONS.length,
  );
  for (const lesson of EDUCATIONAL_PSYCHOLOGY_LESSONS) {
    assert.equal(lesson.audience, 'advanced', lesson.id);
    assert.ok(lesson.title.length > 0, lesson.id);
    assert.ok(lesson.explanation.length > 0, lesson.id);
    assert.ok(lesson.importantPoints.length >= 5, lesson.id);
    assert.ok(lesson.examples.length > 0, lesson.id);
    assert.ok(lesson.practice.length >= 4, lesson.id);
    assert.ok(lesson.htmlNotesPath?.startsWith('notes/educational-psychology/'), lesson.id);
  }
});

test('Teaching License hub exposes Educational Psychology as its own reference module', () => {
  const modules = TEACHING_LICENSE_PARTS.filter(
    (part) => part.id === 'steda-part-2-educational-psychology',
  );
  assert.equal(modules.length, 1);

  const [module] = modules;
  assert.equal(module.subjectName, 'Educational Psychology');
  assert.equal(module.partCategory, 'Part II: Pedagogical Content Knowledge (50%)');
  assert.equal(module.topics, EDUCATIONAL_PSYCHOLOGY_TOPICS);
  assert.equal(module.topics.length, 6);

  // Every topic in the module opens its supplied interactive HTML note.
  for (const topic of module.topics) {
    assert.ok(topic.htmlNotesPath, topic.id);
    assert.ok(
      topic.htmlNotesPath!.startsWith('notes/educational-psychology/'),
      topic.htmlNotesPath,
    );
    readFileSync(path.join(process.cwd(), 'public', topic.htmlNotesPath!), 'utf8');
    assert.ok(topic.summary.length > 0, topic.id);
    assert.ok(topic.concepts.length > 0, topic.id);
    assert.ok(topic.frequentExamQuestions.length > 0, topic.id);
    assert.ok(topic.quickQuiz.length > 0, topic.id);
  }

  // The module is listed once and every part keeps a stable, unique number.
  const partNumbers = TEACHING_LICENSE_PARTS.map((part) => part.partNumber);
  assert.equal(new Set(partNumbers).size, partNumbers.length);
  assert.equal(
    new Set(TEACHING_LICENSE_PARTS.map((part) => part.id)).size,
    TEACHING_LICENSE_PARTS.length,
  );
});

test('Educational Psychology subject is registered once in the study curriculum with all lessons', () => {
  const registered = STUDY_CURRICULUM.filter((subject) => subject.id === EDUCATIONAL_PSYCHOLOGY_SUBJECT.id);
  assert.equal(registered.length, 1);
  assert.equal(registered[0].title, 'Educational Psychology');

  const curriculumLessons = registered[0].chapters.flatMap((chapter) =>
    chapter.topics.flatMap((topic) => topic.lessons),
  );
  assert.deepEqual(
    curriculumLessons.map((item) => item.id),
    EDUCATIONAL_PSYCHOLOGY_LESSONS.map((item) => item.id),
  );
  for (const document of educationalPsychologyDocuments) {
    const matches = curriculumLessons.filter((item) => item.id === document.lessonId);
    assert.equal(matches.length, 1, document.lessonId);
    assert.equal(matches[0].htmlNotesPath, document.path);
  }
});

for (const document of educationalPsychologyDocuments) {
  const lesson = EDUCATIONAL_PSYCHOLOGY_LESSONS.find((item) => item.id === document.lessonId)!;

  for (const baseUrl of ['/', '/MUQABIL/']) {
    test(`${document.lessonId}: HTML reader resolves its sandboxed document on ${baseUrl}`, () => {
      assert.ok(lesson.htmlNotesPath);
      const markup = renderToStaticMarkup(
        <HtmlStudyLessonReader
          lesson={{ ...lesson, htmlNotesPath: lesson.htmlNotesPath! }}
          baseUrl={baseUrl}
          onBack={() => {}}
        />,
      );
      assert.ok(markup.includes(`src="${baseUrl}${lesson.htmlNotesPath}"`));
      assert.ok(markup.includes('sandbox="allow-scripts"'));
      assert.ok(!markup.includes('allow-same-origin'));
      assert.ok(markup.includes('original interactive HTML notes'));
      assert.ok(markup.includes('All lessons'));
      assert.ok(markup.includes('Full screen'));
    });
  }

  test(`${document.lessonId}: supplied document keeps its design, search and quiz panels`, () => {
    const html = readFileSync(path.join(process.cwd(), 'public', document.path), 'utf8');
    assert.match(html, /^<!DOCTYPE html>/i);
    assert.ok(html.includes(document.heading), document.heading);
    assert.match(html, /linear-gradient\(145deg, #f3f6fd 0%, #e9eff9 100%\)/);
    assert.match(html, /@media \(max-width: 600px\)/);
    for (const id of ['searchInput', 'countDisplay', 'mcqPanel', 'crqPanel', 'erqPanel', ...document.grids]) {
      assert.ok(html.includes(`id="${id}"`), id);
    }
    assert.match(html, /10 MCQs/);
    assert.match(html, /4 CRQs/);
    assert.match(html, /1 ERQ/);
    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
    assert.equal(scripts.length, 1);
    assert.doesNotThrow(() => new Script(scripts[0][1]));
    // These supplied pages work offline and do not depend on external assets.
    assert.doesNotMatch(html, /<(?:script|link|img)[^>]+(?:src|href)=/i);
  });
}
