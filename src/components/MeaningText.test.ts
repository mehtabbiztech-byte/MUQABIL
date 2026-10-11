import assert from 'node:assert/strict';
import test from 'node:test';
import { getBuiltInMeaning } from '../data/builtInDictionary';
import { isDifficultWord } from './MeaningText';

test('offline dictionary contains key exam words and ignores non-dictionary entries', () => {
  assert.equal(getBuiltInMeaning('officer')?.simpleEnglish.includes('person with authority'), true);
  assert.equal(getBuiltInMeaning('maximum')?.simpleEnglish.includes('greatest'), true);
  assert.equal(getBuiltInMeaning('minimum')?.simpleEnglish.includes('least'), true);
  assert.equal(getBuiltInMeaning('example')?.word, 'example');
  assert.equal(getBuiltInMeaning('strategy')?.partOfSpeech.includes('noun'), true);
  assert.equal(getBuiltInMeaning('because'), null);
});

test('isDifficultWord correctly detects academic vocabulary and dictionary entries', () => {
  assert.equal(isDifficultWord('assessment'), true);
  assert.equal(isDifficultWord('rubric'), true);
  assert.equal(isDifficultWord('policy'), true);
  assert.equal(isDifficultWord('because'), false);
});
