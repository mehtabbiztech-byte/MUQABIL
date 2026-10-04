import test from 'node:test';
import assert from 'node:assert/strict';
import { MCQS_DATA } from './mcqsData';
import { MINIMUM_SUBJECT_MCQ_BANKS } from './generatedSubjectMcqs';
import { countSubjectMcqs } from '../utils/subjectMcqCounts';

test('every listed discipline has at least 500 bundled MCQs', () => {
  for (const bank of MINIMUM_SUBJECT_MCQ_BANKS) {
    const questions = MCQS_DATA.filter(item => item.category.trim() === bank.slug);
    assert.ok(questions.length >= bank.minimum, `${bank.name} has only ${questions.length} MCQs`);
    assert.equal(new Set(questions.map(item => item.id)).size, questions.length, `${bank.name} has duplicate MCQ IDs`);
    const generated = questions.filter(item => item.id.startsWith('generated-'));
    assert.ok(generated.every(item => item.options.length === 4 && item.correctIndex >= 0 && item.correctIndex < 4), `${bank.name} has an invalid generated answer key`);
  }
});

test('generated subject items are labelled for editorial review', () => {
  const generated = MCQS_DATA.filter(item => item.id.startsWith('generated-'));
  assert.ok(generated.length > 0);
  assert.ok(generated.every(item =>
    item.verificationStatus === 'generated-practice' &&
    item.verificationMethod?.includes('editorial review')
  ));
  assert.equal(new Set(generated.map(item => item.question)).size, generated.length);
});

test('subject card counts match the categories available in the practice filter', () => {
  const sample = [
    { category: 'computer' },
    { category: 'computer-science' },
    { category: 'marketing' },
    { category: 'accounting' },
  ];
  assert.equal(countSubjectMcqs(sample, 'computer-science'), 2);
  assert.equal(countSubjectMcqs(sample, 'management-sciences'), 2);
  assert.equal(countSubjectMcqs(sample, 'marketing'), 1);
  assert.equal(countSubjectMcqs(sample, 'biology'), 0);
});
