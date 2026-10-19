import React from 'react';
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { HtmlTopicNoteViewer } from './HtmlTopicNoteViewer';
import { FOUNDATIONS_OF_EDUCATION_TOPICS, METHODS_OF_TEACHING_TOPICS } from '../data/teachingLicenseNotesData';

const hubDocuments = [
  {
    topicId: 'methods-instructional-approaches',
    path: 'notes/methods-of-teaching/instructional-approaches-and-strategies.html',
    crqs: 5,
  },
  {
    topicId: 'methods-effective-questioning',
    path: 'notes/methods-of-teaching/effective-questioning-strategies.html',
    crqs: 4,
  },
  {
    topicId: 'methods-teacher-student-centred',
    path: 'notes/methods-of-teaching/teacher-centred-and-student-centred-approaches.html',
    crqs: 4,
  },
  {
    topicId: 'methods-blooms-taxonomy',
    path: 'notes/methods-of-teaching/blooms-taxonomy-of-educational-objectives.html',
    crqs: 4,
  },
  {
    topicId: 'methods-cooperative-learning',
    path: 'notes/methods-of-teaching/cooperative-learning-strategies.html',
    crqs: 4,
  },
  {
    topicId: 'methods-npstp-pakistan',
    path: 'notes/methods-of-teaching/national-professional-standards-for-teachers-in-pakistan.html',
    crqs: 4,
  },
  {
    topicId: 'foundations-ideological',
    path: 'notes/foundations-of-education/ideological-foundations-of-education.html',
    crqs: 4,
  },
];

const allHubTopics = [...METHODS_OF_TEACHING_TOPICS, ...FOUNDATIONS_OF_EDUCATION_TOPICS];

test('Master Notes Hub attaches supplied HTML to matching topics across modules', () => {
  const htmlTopics = allHubTopics.filter((topic) => topic.htmlNotesPath);
  assert.deepEqual(
    htmlTopics.map((topic) => topic.id).sort(),
    hubDocuments.map((document) => document.topicId).sort(),
  );
  for (const document of hubDocuments) {
    const topic = allHubTopics.find((item) => item.id === document.topicId)!;
    assert.equal(topic.htmlNotesPath, document.path);
  }
  // Every Methods of Teaching topic carries its supplied standalone note.
  assert.equal(METHODS_OF_TEACHING_TOPICS.length, 6);
  assert.equal(METHODS_OF_TEACHING_TOPICS.filter((topic) => topic.htmlNotesPath).length, 6);
  assert.ok(FOUNDATIONS_OF_EDUCATION_TOPICS.length >= 1);
  assert.equal(htmlTopics.length, hubDocuments.length);
  // Topics without a supplied document stay on the generated note body.
  assert.ok(allHubTopics
    .filter((topic) => !hubDocuments.some((document) => document.topicId === topic.id))
    .every((topic) => !topic.htmlNotesPath));
});

for (const document of hubDocuments) {
  const topic = allHubTopics.find((item) => item.id === document.topicId)!;

  for (const baseUrl of ['/', '/MUQABIL/']) {
    test(`${document.topicId}: hub viewer resolves the supplied document on ${baseUrl}`, () => {
      const markup = renderToStaticMarkup(
        <HtmlTopicNoteViewer
          title={topic.title}
          htmlNotesPath={topic.htmlNotesPath!}
          baseUrl={baseUrl}
        />,
      );
      assert.ok(markup.includes(`src="${baseUrl}${topic.htmlNotesPath}"`));
      assert.ok(markup.includes('sandbox="allow-scripts"'));
      assert.ok(!markup.includes('allow-same-origin'));
      assert.ok(markup.includes('original interactive HTML notes'));
      assert.ok(markup.includes('Full screen'));
      assert.ok(markup.includes('Original interactive note'));
    });
  }

  test(`${document.topicId}: supplied document keeps its design, search and quiz tabs`, () => {
    const html = readFileSync(
      path.join(process.cwd(), 'public', topic.htmlNotesPath!),
      'utf8',
    );
    assert.match(html, /^<!DOCTYPE html>/i);
    assert.match(html, /linear-gradient\(145deg, #f3f6fd 0%, #e9eff9 100%\)/);
    assert.match(html, /@media \(max-width: 600px\)/);
    for (const id of ['searchInput', 'countDisplay', 'mcqPanel', 'crqPanel', 'erqPanel']) {
      assert.ok(html.includes(`id="${id}"`), id);
    }
    assert.match(html, /10 MCQs/);
    assert.ok(html.includes(`${document.crqs} CRQs`));
    assert.match(html, /1 ERQ/);
  });
}
