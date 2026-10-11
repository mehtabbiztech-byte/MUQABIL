import assert from 'node:assert/strict';
import test from 'node:test';
import { BUILT_IN_DICTIONARY, getBuiltInMeaning, normalizeDictionaryWord } from './builtInDictionary';

test('built-in dictionary provides complete multilingual meanings', () => {
  assert.ok(Object.keys(BUILT_IN_DICTIONARY).length >= 45);
  for (const [word, meaning] of Object.entries(BUILT_IN_DICTIONARY)) {
    assert.ok(word.length > 1);
    assert.ok(meaning.simpleEnglish);
    assert.ok(meaning.urdu);
    assert.ok(meaning.sindhi);
    assert.ok(meaning.partOfSpeech);
  }
});

test('dictionary lookup normalizes capitalization and punctuation', () => {
  assert.equal(normalizeDictionaryWord('Knowledge!'), 'knowledge');
  assert.equal(getBuiltInMeaning('KNOWLEDGE')?.urdu, 'علم، معلومات');
});

test('dictionary morphological stemming resolves plurals, past tense and gerunds', () => {
  assert.equal(getBuiltInMeaning('questions')?.simpleEnglish.includes('asked'), true);
  assert.equal(getBuiltInMeaning('strategies')?.simpleEnglish.includes('plan'), true);
  assert.equal(getBuiltInMeaning('evaluating')?.simpleEnglish.includes('judge'), true);
  assert.equal(getBuiltInMeaning('observed')?.simpleEnglish.includes('watch'), true);
  assert.equal(getBuiltInMeaning('accurately')?.simpleEnglish.includes('Correct'), true);
  assert.equal(getBuiltInMeaning('pedagogy')?.urdu, 'تدریسیات، علم تدریس');
  assert.equal(getBuiltInMeaning('rubric')?.sindhi, 'معيار نامو، روبرڪ');
});
