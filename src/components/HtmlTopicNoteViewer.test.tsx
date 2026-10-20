import React from 'react';
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { HtmlTopicNoteViewer } from './HtmlTopicNoteViewer';
import {
  CHILD_DEVELOPMENT_TOPICS,
  CLASSROOM_MANAGEMENT_TOPICS,
  EDUCATIONAL_PSYCHOLOGY_TOPICS,
  FOUNDATIONS_OF_EDUCATION_TOPICS,
  METHODS_OF_TEACHING_TOPICS,
} from '../data/teachingLicenseNotesData';

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
  {
    topicId: 'foundations-philosophical',
    path: 'notes/foundations-of-education/philosophical-foundations-of-education.html',
    crqs: 4,
  },
  {
    topicId: 'foundations-sociological',
    path: 'notes/foundations-of-education/sociological-foundations-of-education.html',
    crqs: 4,
  },
  {
    topicId: 'foundations-psychological',
    path: 'notes/foundations-of-education/psychological-foundations-of-education.html',
    crqs: 4,
  },
  {
    topicId: 'foundations-historical',
    path: 'notes/foundations-of-education/historical-foundations-of-education.html',
    crqs: 4,
  },
  {
    topicId: 'child-dev-conceptions-implications',
    path: 'notes/child-development/conceptions-of-child-development-and-their-implications-for-teaching-and-learning.html',
    crqs: 4,
  },
  {
    topicId: 'child-dev-major-theories',
    path: 'notes/child-development/major-theories-and-domains-of-child-development.html',
    crqs: 4,
  },
  {
    topicId: 'child-dev-developmental-stages',
    path: 'notes/child-development/characteristics-of-various-developmental-stages-according-to-various-theorists.html',
    crqs: 4,
  },
  {
    topicId: 'child-dev-factors-influencing-learning',
    path: 'notes/child-development/factors-influencing-the-learning-process-of-a-child.html',
    crqs: 4,
  },
  {
    topicId: 'child-dev-individual-differences-special-needs',
    path: 'notes/child-development/individual-differences-between-students-and-children-with-special-needs.html',
    crqs: 4,
  },
  {
    topicId: 'child-dev-age-appropriate-strategies',
    path: 'notes/child-development/age-appropriate-teaching-strategies-based-on-developmental-theory.html',
    crqs: 4,
  },
  {
    topicId: 'edu-psych-basics-learning-theories',
    path: 'notes/educational-psychology/basics-of-educational-psychology-major-learning-theories.html',
    crqs: 4,
  },
  {
    topicId: 'edu-psych-vs-educational-psychology',
    path: 'notes/educational-psychology/differences-between-psychology-and-educational-psychology.html',
    crqs: 4,
  },
  {
    topicId: 'edu-psych-learning-theories',
    path: 'notes/educational-psychology/learning-theories-behaviorism-cognitivism-constructivism-humanism.html',
    crqs: 4,
  },
  {
    topicId: 'edu-psych-individual-differences',
    path: 'notes/educational-psychology/individual-differences-in-educational-psychology.html',
    crqs: 4,
  },
  {
    topicId: 'edu-psych-basic-needs-motivation',
    path: 'notes/educational-psychology/basic-needs-and-motivation.html',
    crqs: 4,
  },
  {
    topicId: 'edu-psych-home-school-community',
    path: 'notes/educational-psychology/learning-and-motivation-in-home-school-and-community.html',
    crqs: 4,
  },
  {
    topicId: 'learning-theories-and-classroom-management',
    path: 'notes/classroom-management/learning-theories-and-classroom-management.html',
    crqs: 4,
  },
  {
    topicId: 'designing-an-effective-classroom-environment',
    path: 'notes/classroom-management/designing-an-effective-classroom-environment.html',
    crqs: 4,
  },
  {
    topicId: 'classroom-observation-and-data-collection',
    path: 'notes/classroom-management/classroom-observation-and-data-collection.html',
    crqs: 4,
  },
  {
    topicId: 'classroom-management-physical-and-social-environment',
    path: 'notes/classroom-management/classroom-management-physical-and-social-environment.html',
    crqs: 4,
  },
  {
    topicId: 'curriculum-and-classroom-management',
    path: 'notes/classroom-management/curriculum-and-classroom-management.html',
    crqs: 4,
  },
  {
    topicId: 'routines-schedules-and-time-management',
    path: 'notes/classroom-management/routines-schedules-and-time-management.html',
    crqs: 4,
  },
  {
    topicId: 'shared-values-and-classroom-community',
    path: 'notes/classroom-management/shared-values-and-classroom-community.html',
    crqs: 4,
  },
  {
    topicId: 'physical-setup-of-the-classroom',
    path: 'notes/classroom-management/physical-setup-of-the-classroom.html',
    crqs: 4,
  },
  {
    topicId: 'strategies-for-classroom-management',
    path: 'notes/classroom-management/strategies-for-classroom-management.html',
    crqs: 4,
  },
  {
    topicId: 'differentiated-learning',
    path: 'notes/classroom-management/differentiated-learning.html',
    crqs: 4,
  },
];

const allHubTopics = [
  ...METHODS_OF_TEACHING_TOPICS,
  ...FOUNDATIONS_OF_EDUCATION_TOPICS,
  ...CHILD_DEVELOPMENT_TOPICS,
  ...EDUCATIONAL_PSYCHOLOGY_TOPICS,
  ...CLASSROOM_MANAGEMENT_TOPICS,
];

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
  // Every Methods of Teaching, Foundations of Education, Child Development, Educational Psychology and Classroom Management topic carries a supplied standalone note.
  assert.equal(METHODS_OF_TEACHING_TOPICS.length, 6);
  assert.equal(METHODS_OF_TEACHING_TOPICS.filter((topic) => topic.htmlNotesPath).length, 6);
  assert.equal(FOUNDATIONS_OF_EDUCATION_TOPICS.length, 5);
  assert.equal(FOUNDATIONS_OF_EDUCATION_TOPICS.filter((topic) => topic.htmlNotesPath).length, 5);
  assert.equal(CHILD_DEVELOPMENT_TOPICS.length, 6);
  assert.equal(CHILD_DEVELOPMENT_TOPICS.filter((topic) => topic.htmlNotesPath).length, 6);
  assert.equal(EDUCATIONAL_PSYCHOLOGY_TOPICS.length, 6);
  assert.equal(EDUCATIONAL_PSYCHOLOGY_TOPICS.filter((topic) => topic.htmlNotesPath).length, 6);
  assert.ok(EDUCATIONAL_PSYCHOLOGY_TOPICS.every((topic) => topic.htmlNotesPath!.startsWith('notes/educational-psychology/')));
  assert.equal(CLASSROOM_MANAGEMENT_TOPICS.length, 10);
  assert.equal(CLASSROOM_MANAGEMENT_TOPICS.filter((topic) => topic.htmlNotesPath).length, 10);
  assert.ok(CLASSROOM_MANAGEMENT_TOPICS.every((topic) => topic.htmlNotesPath!.startsWith('notes/classroom-management/')));
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
