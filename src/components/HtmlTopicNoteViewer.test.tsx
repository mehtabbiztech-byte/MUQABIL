import React from 'react';
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { HtmlTopicNoteViewer } from './HtmlTopicNoteViewer';
import { METHODS_OF_TEACHING_TOPICS } from '../data/teachingLicenseNotesData';

const hubDocuments = [
  {
    topicId: 'methods-instructional-approaches',
    file: 'instructional-approaches-and-strategies.html',
    crqs: 5,
  },
  {
    topicId: 'methods-effective-questioning',
    file: 'effective-questioning-strategies.html',
    crqs: 4,
  },
  {
    topicId: 'methods-teacher-student-centred',
    file: 'teacher-centred-and-student-centred-approaches.html',
    crqs: 4,
  },
  {
    topicId: 'methods-blooms-taxonomy',
    file: 'blooms-taxonomy-of-educational-objectives.html',
    crqs: 4,
  },
  {
    topicId: 'methods-cooperative-learning',
    file: 'cooperative-learning-strategies.html',
    crqs: 4,
  },
];

test('Master Notes Hub attaches supplied HTML to exactly the five matching Methods of Teaching topics', () => {
  const htmlTopics = METHODS_OF_TEACHING_TOPICS.filter((topic) => topic.htmlNotesPath);
  assert.deepEqual(
    htmlTopics.map((topic) => topic.id).sort(),
    hubDocuments.map((document) => document.topicId).sort(),
  );
  for (const document of hubDocuments) {
    const topic = METHODS_OF_TEACHING_TOPICS.find((item) => item.id === document.topicId)!;
    assert.equal(topic.htmlNotesPath, `notes/methods-of-teaching/${document.file}`);
  }
  // The remaining pedagogy notes stay on the generated structured reader.
  assert.equal(METHODS_OF_TEACHING_TOPICS.length, 6);
  assert.equal(htmlTopics.length, 5);
});

for (const document of hubDocuments) {
  const topic = METHODS_OF_TEACHING_TOPICS.find((item) => item.id === document.topicId)!;

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
