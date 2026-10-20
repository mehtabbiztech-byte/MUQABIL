import React from 'react';
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Script } from 'node:vm';
import { renderToStaticMarkup } from 'react-dom/server';
import { HtmlStudyLessonReader } from './HtmlStudyLessonReader';
import { FOUNDATIONS_OF_EDUCATION_LESSONS, FOUNDATIONS_OF_EDUCATION_SUBJECT } from '../data/foundationsOfEducationNotes';
import { METHODS_OF_TEACHING_LESSONS, METHODS_OF_TEACHING_SUBJECT } from '../data/methodsOfTeachingNotes';
import { CHILD_DEVELOPMENT_LESSONS, CHILD_DEVELOPMENT_SUBJECT } from '../data/childDevelopmentNotes';
import { STUDY_CURRICULUM } from '../data/studyNotesData';

const documents = [
  {
    lessonId: 'methods-instructional-approaches',
    path: 'notes/methods-of-teaching/instructional-approaches-and-strategies.html',
    heading: 'Instructional approaches & strategies',
    grids: ['methodsGrid'],
    crqs: 5,
  },
  {
    lessonId: 'methods-effective-questioning',
    path: 'notes/methods-of-teaching/effective-questioning-strategies.html',
    heading: 'Effective Questioning Strategies in Teaching',
    grids: ['typesGrid', 'strategiesGrid'],
    crqs: 4,
  },
  {
    lessonId: 'methods-teacher-student-centred',
    path: 'notes/methods-of-teaching/teacher-centred-and-student-centred-approaches.html',
    heading: 'Teacher-centred &amp; Student-centred Approaches',
    grids: ['approachGrid', 'theoryGrid'],
    crqs: 4,
  },
  {
    lessonId: 'methods-blooms-taxonomy',
    path: 'notes/methods-of-teaching/blooms-taxonomy-of-educational-objectives.html',
    heading: "Bloom's Taxonomy of Educational Objectives",
    grids: ['factsGrid', 'domainGrid', 'levelGrid', 'lotshotGrid', 'knowledgeGrid', 'affectiveGrid', 'useGrid', 'prosconsGrid'],
    crqs: 4,
  },
  {
    lessonId: 'methods-cooperative-learning',
    path: 'notes/methods-of-teaching/cooperative-learning-strategies.html',
    heading: 'Cooperative Learning',
    grids: ['featuresGrid', 'strategiesGrid', 'benefitsGrid'],
    crqs: 4,
  },
  {
    lessonId: 'methods-npstp-pakistan',
    path: 'notes/methods-of-teaching/national-professional-standards-for-teachers-in-pakistan.html',
    heading: 'National Professional Standards for Teachers in Pakistan',
    grids: ['factsGrid', 'structureGrid', 'standardsGrid', 'bcsGrid'],
    crqs: 4,
  },
  {
    lessonId: 'foundations-ideological',
    path: 'notes/foundations-of-education/ideological-foundations-of-education.html',
    heading: 'Ideological Foundations of Education',
    grids: ['componentsGrid', 'functionsGrid', 'philosophyGrid'],
    crqs: 4,
  },
  {
    lessonId: 'foundations-philosophical',
    path: 'notes/foundations-of-education/philosophical-foundations-of-education.html',
    heading: 'Philosophical Foundations of Education',
    grids: ['branchesGrid', 'schoolsGrid', 'impactGrid'],
    crqs: 4,
  },
  {
    lessonId: 'foundations-sociological',
    path: 'notes/foundations-of-education/sociological-foundations-of-education.html',
    heading: 'Sociological Foundations of Education',
    grids: ['functionsGrid', 'perspectivesGrid', 'conceptsGrid', 'eqGrid'],
    crqs: 4,
  },
  {
    lessonId: 'foundations-psychological',
    path: 'notes/foundations-of-education/psychological-foundations-of-education.html',
    heading: 'Psychological Foundations of Education',
    grids: ['domainsGrid', 'theoriesGrid', 'stagesGrid', 'factorsGrid'],
    crqs: 4,
  },
  {
    lessonId: 'foundations-historical',
    path: 'notes/foundations-of-education/historical-foundations-of-education.html',
    heading: 'Historical Foundations of Education',
    grids: ['erasGrid', 'lessonsGrid'],
    crqs: 4,
  },
  {
    lessonId: 'child-dev-conceptions-implications',
    path: 'notes/child-development/conceptions-of-child-development-and-their-implications-for-teaching-and-learning.html',
    heading: 'Conceptions of Child Development &amp; Their Implications for Teaching and Learning',
    grids: ['conceptionsGrid', 'examGrid'],
    crqs: 4,
  },
  {
    lessonId: 'child-dev-major-theories',
    path: 'notes/child-development/major-theories-and-domains-of-child-development.html',
    heading: 'Major Theories &amp; Domains of Child Development',
    grids: ['domainsGrid', 'theoriesGrid'],
    crqs: 4,
  },
  {
    lessonId: 'child-dev-developmental-stages',
    path: 'notes/child-development/characteristics-of-various-developmental-stages-according-to-various-theorists.html',
    heading: 'Characteristics of Various Developmental Stages According to Various Theorists',
    grids: ['domainsGrid', 'theoristsGrid', 'otherGrid', 'ageGrid', 'examGrid'],
    crqs: 4,
  },
  {
    lessonId: 'child-dev-factors-influencing-learning',
    path: 'notes/child-development/factors-influencing-the-learning-process-of-a-child.html',
    heading: 'Factors Influencing the Learning Process of a Child',
    grids: ['factorsGrid', 'termsGrid'],
    crqs: 4,
  },
  {
    lessonId: 'child-dev-individual-differences-special-needs',
    path: 'notes/child-development/individual-differences-between-students-and-children-with-special-needs.html',
    heading: 'Individual Differences Between Students &amp; Children with Special Needs',
    grids: ['typesGrid', 'needsGrid', 'examGrid'],
    crqs: 4,
  },
  {
    lessonId: 'child-dev-age-appropriate-strategies',
    path: 'notes/child-development/age-appropriate-teaching-strategies-based-on-developmental-theory.html',
    heading: 'Age-Appropriate Teaching Strategies Based on Developmental Theory',
    grids: ['ageGrid', 'principlesGrid', 'examGrid'],
    crqs: 4,
  },
];

const allHtmlLessons = [
  ...METHODS_OF_TEACHING_LESSONS,
  ...FOUNDATIONS_OF_EDUCATION_LESSONS,
  ...CHILD_DEVELOPMENT_LESSONS,
];

test('supplied HTML documents are attached to matching topics without duplicating lessons', () => {
  assert.equal(METHODS_OF_TEACHING_LESSONS.length, 6);
  assert.equal(FOUNDATIONS_OF_EDUCATION_LESSONS.length, 5);
  assert.equal(CHILD_DEVELOPMENT_LESSONS.length, 6);
  const curriculumLessons = [
    METHODS_OF_TEACHING_SUBJECT,
    FOUNDATIONS_OF_EDUCATION_SUBJECT,
    CHILD_DEVELOPMENT_SUBJECT,
  ].flatMap((item) => {
    const subject = STUDY_CURRICULUM.find((entry) => entry.id === item.id)!;
    return subject.chapters.flatMap(chapter => chapter.topics.flatMap(topic => topic.lessons));
  });
  for (const document of documents) {
    const matching = curriculumLessons.filter(item => item.id === document.lessonId);
    assert.equal(matching.length, 1);
    assert.equal(matching[0].htmlNotesPath, document.path);
  }
  // Topics without a supplied document stay on the structured reader.
  assert.ok(allHtmlLessons
    .filter(item => !documents.some(document => document.lessonId === item.id))
    .every(item => !item.htmlNotesPath));
});

for (const document of documents) {
  const lesson = allHtmlLessons.find(item => item.id === document.lessonId)!;

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

test('cooperative learning notes preserve the eight strategies, benefits and situation-based prompt', () => {
  const html = readFileSync(path.join(process.cwd(), 'public/notes/methods-of-teaching/cooperative-learning-strategies.html'), 'utf8');
  assert.equal((html.match(/class="info-card"/g) || []).length, 3);
  assert.equal((html.match(/class="strategy-card"/g) || []).length, 8);
  assert.equal((html.match(/class="benefit-item"/g) || []).length, 17);
  for (const text of ['Cooperative Learning', '8 Cooperative Learning Strategies',
    'Speed Quizzes', 'Puzzle Pieces', 'One-Minute Papers', 'Sentence Completion',
    'Classmate Interviews', 'Student Expertise', 'Freeride Elimination', 'Teamwork 101',
    'Key Takeaway', 'Ms. Fatima is a Grade 7 teacher']) {
    assert.ok(html.includes(text), text);
  }
});

test('NPSTP notes preserve the ten standards, memory aids and situation-based prompt', () => {
  const html = readFileSync(path.join(process.cwd(), 'public/notes/methods-of-teaching/national-professional-standards-for-teachers-in-pakistan.html'), 'utf8');
  assert.equal((html.match(/class="info-card"/g) || []).length, 3);
  assert.equal((html.match(/class="kdp-card /g) || []).length, 3);
  assert.equal((html.match(/class="standard-card"/g) || []).length, 10);
  assert.equal((html.match(/class="list-card /g) || []).length, 3);
  for (const text of ['National Professional Standards for Teachers in Pakistan',
    'Memory Table of the Ten Standards', 'Teaching of the Holy Quran',
    'Some Good Students Invariably Achieve Lasting Career Contentment, Practising Quran',
    'Quick Revision Points', 'Mr. Imran is a newly appointed Grade 8 teacher']) {
    assert.ok(html.includes(text), text);
  }
});

test('ideological foundations notes preserve the components, functions, philosophical streams and situation-based prompt', () => {
  const html = readFileSync(path.join(process.cwd(), 'public/notes/foundations-of-education/ideological-foundations-of-education.html'), 'utf8');
  assert.equal((html.match(/class="component-card /g) || []).length, 4);
  assert.equal((html.match(/class="function-card"/g) || []).length, 4);
  assert.equal((html.match(/class="phil-card /g) || []).length, 4);
  assert.equal((html.match(/class="pakistan-card"/g) || []).length, 1);
  assert.equal((html.match(/class="takeaway-card"/g) || []).length, 1);
  for (const text of ['Ideological Foundations of Education', 'Core Belief System', 'National Identity',
    'Moral &amp; Ethical Character', 'Social Cohesion', 'Goal Setting', 'Curriculum Design',
    'Teaching Methodology', 'Policy Formulation', 'Idealism', 'Realism', 'Pragmatism / Progressivism',
    'Religious / Cultural Ideologies', 'universal Muslim Ummah', 'National Education Policy of 1979',
    'Key Takeaway', 'A newly established private school in Pakistan']) {
    assert.ok(html.includes(text), text);
  }
});

test('philosophical foundations notes preserve the branches, schools, comparison table and situation-based prompt', () => {
  const html = readFileSync(path.join(process.cwd(), 'public/notes/foundations-of-education/philosophical-foundations-of-education.html'), 'utf8');
  assert.equal((html.match(/class="branch-card /g) || []).length, 3);
  assert.equal((html.match(/class="school-card /g) || []).length, 4);
  assert.equal((html.match(/class="impact-card"/g) || []).length, 3);
  assert.equal((html.match(/class="table-wrapper"/g) || []).length, 1);
  assert.equal((html.match(/class="takeaway-card"/g) || []).length, 1);
  for (const text of ['Philosophical Foundations of Education', 'Metaphysics', 'Epistemology', 'Axiology',
    'What is real?', 'How do we know what is true?', 'What is good, right, or beautiful?',
    'Idealism', 'Realism', 'Pragmatism / Experimentalism', 'Existentialism',
    'Plato', 'Aristotle', 'John Dewey', 'Jean-Paul Sartre', 'Schools at a Glance',
    'Provocative mentor', 'Key Takeaway', 'A secondary school in Pakistan']) {
    assert.ok(html.includes(text), text);
  }
});

test('conceptions of child development notes preserve the seven conceptions, theorist and implication tables, and situation-based prompt', () => {
  const html = readFileSync(
    path.join(
      process.cwd(),
      'public/notes/child-development/conceptions-of-child-development-and-their-implications-for-teaching-and-learning.html',
    ),
    'utf8',
  );
  assert.equal((html.match(/class="conception-card /g) || []).length, 7);
  assert.equal((html.match(/class="matrix-wrapper"/g) || []).length, 2);
  assert.equal((html.match(/class="exam-fact"/g) || []).length, 7);
  assert.equal((html.match(/class="takeaway-card"/g) || []).length, 1);
  for (const text of [
    'Conceptions of Child Development &amp; Their Implications for Teaching and Learning',
    'Continuous Process',
    'Sequential Process',
    'Individual Differences',
    'Holistic Process',
    'Nature and Nurture',
    'Active Learning',
    'Developmental Readiness',
    'Attachment Theory',
    'Zone of Proximal Development (ZPD)',
    'Key Takeaway',
    'Mr. Hassan teaches Grade 2 (children aged 7–8 years).',
  ]) {
    assert.ok(html.includes(text), text);
  }
});

test('age-appropriate teaching strategies notes preserve the four age bands, theorist/stage matrices, six principles, and situation-based prompt', () => {
  const html = readFileSync(
    path.join(
      process.cwd(),
      'public/notes/child-development/age-appropriate-teaching-strategies-based-on-developmental-theory.html',
    ),
    'utf8',
  );
  assert.equal((html.match(/class="age-card /g) || []).length, 4);
  assert.equal((html.match(/class="matrix-wrapper"/g) || []).length, 2);
  assert.equal((html.match(/class="principle-card"/g) || []).length, 6);
  assert.equal((html.match(/class="exam-fact"/g) || []).length, 7);
  assert.equal((html.match(/class="takeaway-card"/g) || []).length, 1);
  for (const text of [
    'Age-Appropriate Teaching Strategies Based on Developmental Theory',
    'Infancy',
    'Early Childhood',
    'Middle Childhood',
    'Adolescence',
    'Jerome Bruner',
    'Discovery Learning',
    'Readiness',
    'Learning by Doing',
    'Positive Reinforcement',
    'Inclusive Teaching',
    'Key Takeaway',
    'Ms. Zara teaches a combined class',
  ]) {
    assert.ok(html.includes(text), text);
  }
});
