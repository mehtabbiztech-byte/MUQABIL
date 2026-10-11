import assert from 'node:assert/strict';
import test from 'node:test';
import { getBuiltInMeaning } from './builtInDictionary';

test('marks longer vocabulary as difficult and ignores common words', () => {
  assert.equal(getBuiltInMeaning('maximum')?.simpleEnglish.includes('greatest'), true);
  assert.equal(getBuiltInMeaning('minimum')?.simpleEnglish.includes('least'), true);
  assert.equal(getBuiltInMeaning('example')?.word, 'example');
  assert.equal(getBuiltInMeaning('because'), null);
});

