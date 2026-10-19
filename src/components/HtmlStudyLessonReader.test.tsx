import React from 'react';
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Script } from 'node:vm';
import { renderToStaticMarkup } from 'react-dom/server';
import { HtmlStudyLessonReader } from './HtmlStudyLessonReader';
import { METHODS_OF_TEACHING_LESSONS, METHODS_OF_TEACHING_SUBJECT } from '../data/methodsOfTeachingNotes';
import { STUDY_CURRICULUM } from '../data/studyNotesData';

const documents = [
  {
    lessonId: 'methods-instructional-approaches',
    file: 'instructional-approaches-and-strategies.html',
    heading: 'Instructional approaches & strategies',
    grids: ['methodsGrid'],
    crqs: 5,
  },
  {
    lessonId: 'methods-effective-questioning',
    file: 'effective-questioning-strategies.html',
    heading: 'Effective Questioning Strategies in Teaching',
    grids: ['typesGrid', 'strategiesGrid'],
    crqs: 4,
  },
  {
    lessonId: 'methods-teacher-student-centred',
    file: 'teacher-centred-and-student-centred-approaches.html',
    heading: 'Teacher-centred &amp; Student-centred Approaches',
    grids: ['approachGrid', 'theoryGrid'],
    crqs: 4,
  },
  {
    lessonId: 'methods-blooms-taxonomy',
    file: 'blooms-taxonomy-of-educational-objectives.html',
    heading: "Bloom's Taxonomy of Educational Objectives",
    grids: ['factsGrid', 'domainGrid', 'levelGrid', 'lotshotGrid', 'knowledgeGrid', 'affectiveGrid', 'useGrid', 'prosconsGrid'],
    crqs: 4,
  },
];

test('supplied HTML documents are attached to matching topics without duplicating lessons', () => {
  assert.equal(METHODS_OF_TEACHING_LESSONS.length, 6);
  const subject = STUDY_CURRICULUM.find(item => item.id === METHODS_OF_TEACHING_SUBJECT.id)!;
  const lessons = subject.chapters.flatMap(chapter => chapter.topics.flatMap(topic => topic.lessons));
  for (const document of documents) {
    const matching = lessons.filter(item => item.id === document.lessonId);
    assert.equal(matching.length, 1);
    assert.equal(matching[0].htmlNotesPath, `notes/methods-of-teaching/${document.file}`);
  }
  // Topics without a supplied document stay on the structured reader.
  assert.ok(METHODS_OF_TEACHING_LESSONS
    .filter(item => !documents.some(document => document.lessonId === item.id))
    .every(item => !item.htmlNotesPath));
});

for (const document of documents) {
  const lesson = METHODS_OF_TEACHING_LESSONS.find(item => item.id === document.lessonId)!;

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

  test(`${document.lessonId}: standalone HTML preserves responsive design and all quiz panels`, () => {
    const html = readFileSync(path.join(process.cwd(), 'public', lesson.htmlNotesPath!), 'utf8');
    assert.match(html, /^<!DOCTYPE html>/i);
    assert.ok(html.includes(document.heading));
    assert.match(html, /linear-gradient\(145deg, #f3f6fd 0%, #e9eff9 100%\)/);
    assert.match(html, /@media \(max-width: 600px\)/);
    for (const id of ['searchInput', 'countDisplay', 'mcqPanel', 'crqPanel', 'erqPanel', ...document.grids]) {
      assert.ok(html.includes(`id="${id}"`), id);
    }
    assert.match(html, /10 MCQs/);
    assert.ok(html.includes(`${document.crqs} CRQs`));
    assert.match(html, /1 ERQ/);
    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
    assert.equal(scripts.length, 1);
    assert.doesNotThrow(() => new Script(scripts[0][1]));
    // These supplied pages work offline and do not depend on external assets.
    assert.doesNotMatch(html, /<(?:script|link|img)[^>]+(?:src|href)=/i);
  });
}

test('questioning notes preserve all original teaching cards, best practices and situation-based prompt', () => {
  const html = readFileSync(path.join(process.cwd(), 'public/notes/methods-of-teaching/effective-questioning-strategies.html'), 'utf8');
  assert.equal((html.match(/class="info-card"/g) || []).length, 3);
  assert.equal((html.match(/class="strategy-card"/g) || []).length, 4);
  for (const text of ['Lower-Order (Convergent)', 'Higher-Order (Divergent)', 'Probing Questions',
    'Wait Time (3–5 Seconds)', 'Cold Calling &amp; Equity', 'Think-Pair-Share', 'Bounce / Pass-the-Mic',
    'Best Practices for Teachers', 'Key Takeaway', 'Mr. Ahmed is teaching a Grade 8 science lesson about climate change.']) {
    assert.ok(html.includes(text), text);
  }
});

test('teacher/student-centred notes preserve the spectrum, approach cards, comparison table and situation-based prompt', () => {
  const html = readFileSync(path.join(process.cwd(), 'public/notes/methods-of-teaching/teacher-centred-and-student-centred-approaches.html'), 'utf8');
  assert.equal((html.match(/class="approach-card /g) || []).length, 2);
  assert.equal((html.match(/class="theory-card /g) || []).length, 2);
  for (const text of ['Teacher-centred &amp; Student-centred Approaches', 'Two ends of a spectrum',
    'Key Differences at a Glance', 'Theoretical Roots', 'A Balanced View',
    'Expert &amp; transmitter', 'Facilitator &amp; guide', 'zone of proximal development',
    'Think-Pair-Share', 'Mr. Khan teaches Grade 9 mathematics']) {
    assert.ok(html.includes(text), text);
  }
});

test("Bloom's notes preserve the ladder, domains, knowledge dimension and situation-based prompt", () => {
  const html = readFileSync(path.join(process.cwd(), 'public/notes/methods-of-teaching/blooms-taxonomy-of-educational-objectives.html'), 'utf8');
  assert.equal((html.match(/class="info-card"/g) || []).length, 3);
  assert.equal((html.match(/class="domain-card /g) || []).length, 3);
  assert.equal((html.match(/class="level-card"/g) || []).length, 6);
  for (const text of ["Bloom's Taxonomy of Educational Objectives", 'Original 1956 (lowest → highest)',
    'Revised 2001 (lowest → highest)', 'Create ⬅ top', 'The Affective Domain (Krathwohl, 1964)',
    'Really Useful Aids Always Enhance Creativity', 'Perception', 'Origination',
    'Ms. Sana is a Grade 6 science teacher']) {
    assert.ok(html.includes(text), text);
  }
});
