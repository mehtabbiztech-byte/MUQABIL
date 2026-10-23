import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { STBB_CLASS_5_CHAPTERS, ALL_STBB_MCQS } from './stbbChaptersRegistry';
import { STBB_CHAPTER_2_CONFIG } from './stbbChapterTwoMicroorganismsData';
import { AppProvider } from '../context/AppContext';
import { StbbClassFiveScienceHub } from '../components/StbbClassFiveScienceHub';

function decodeA1Z26(encoded: string): string {
  return encoded
    .split('/')
    .map((segment) =>
      segment
        .trim()
        .split(/[-\s]+/)
        .filter(Boolean)
        .map((n) => String.fromCharCode(64 + Number(n)))
        .join('')
    )
    .join(' / ');
}

test('STBB Class 5 chapters registry contains Chapters 1 and 2 with 8 topics and 40 unique MCQs each', () => {
  assert.equal(STBB_CLASS_5_CHAPTERS.length, 2);

  for (const chapter of STBB_CLASS_5_CHAPTERS) {
    assert.equal(chapter.topics.length, 8, `${chapter.id} should have 8 topics`);
    assert.equal(chapter.mcqs.length, 40, `${chapter.id} should have 40 MCQs`);
    assert.equal(new Set(chapter.topics.map((t) => t.id)).size, 8);
    assert.equal(new Set(chapter.topics.map((t) => t.slug)).size, 8);

    for (const mcq of chapter.mcqs) {
      assert.ok(mcq.options.length >= 2 && mcq.options.length <= 4, mcq.id);
      assert.ok(mcq.correctIndex >= 0 && mcq.correctIndex < mcq.options.length, mcq.id);
      assert.ok(mcq.explanation.length > 20, mcq.id);
    }
  }

  assert.equal(ALL_STBB_MCQS.length, 80);
  assert.equal(new Set(ALL_STBB_MCQS.map((q) => q.id)).size, 80);
});

test('Chapter 2 Microorganisms topics validate all unscrambles, A1Z26 secret codes, mnemonics, riddles, and decision tree paths', () => {
  assert.equal(STBB_CHAPTER_2_CONFIG.heroTitle, 'Microorganisms — The Invisible World');

  for (const topic of STBB_CHAPTER_2_CONFIG.topics) {
    assert.ok(topic.mnemonic, `${topic.slug} missing mnemonic`);
    assert.ok(topic.riddle, `${topic.slug} missing riddle`);
    assert.ok(topic.flowchartAscii, `${topic.slug} missing mental model flowchart`);
    assert.ok(topic.vennDiagram, `${topic.slug} missing Venn diagram`);
    assert.ok(topic.deepDiveSections && topic.deepDiveSections.length >= 2, `${topic.slug} missing deep-dive cards`);
    assert.ok(topic.realWorldExamples.length >= 3, `${topic.slug} missing real-world examples`);

    for (const unscramble of topic.unscrambles || []) {
      const sortedScrambled = unscramble.scrambled.toUpperCase().split('').sort().join('');
      const sortedSolution = unscramble.solution.toUpperCase().split('').sort().join('');
      assert.equal(
        sortedScrambled,
        sortedSolution,
        `Unscramble letter mismatch in ${topic.slug}: ${unscramble.scrambled} vs ${unscramble.solution}`
      );
    }

    for (const item of topic.secretCodeActivity?.items || []) {
      assert.equal(
        decodeA1Z26(item.encoded),
        item.answer,
        `Cipher mismatch in ${topic.slug}: ${item.encoded} -> ${decodeA1Z26(item.encoded)} != ${item.answer}`
      );
    }
  }

  // Verify decision tree covers VIRUS, FUNGI, BACTERIA and re-check branch
  const nodesById = new Map(STBB_CHAPTER_2_CONFIG.decisionTool.nodes.map((n) => [n.id, n]));
  assert.equal(nodesById.size, 3);
  const q1 = nodesById.get(1)!;
  assert.equal(q1.onYes.type, 'result');
  if (q1.onYes.type === 'result') assert.equal(q1.onYes.result.group, 'VIRUS');
  const q2 = nodesById.get(2)!;
  assert.equal(q2.onNo.type, 'recheck');
  const q3 = nodesById.get(3)!;
  if (q3.onYes.type === 'result') assert.equal(q3.onYes.result.group, 'FUNGI');
  if (q3.onNo.type === 'result') assert.equal(q3.onNo.result.group, 'BACTERIA');
});

test('StbbClassFiveScienceHub renders all 4 tabs cleanly for both Chapter 2 and Chapter 1', () => {
  const prevLocalStorage = (globalThis as Record<string, unknown>).localStorage;
  const prevWindow = (globalThis as Record<string, unknown>).window;
  const store = new Map<string, string>();
  const mockStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => {
      store.set(k, String(v));
    },
    removeItem: (k: string) => {
      store.delete(k);
    },
    clear: () => store.clear()
  };

  Object.assign(globalThis, {
    localStorage: mockStorage,
    window: {
      location: { pathname: '/' },
      localStorage: mockStorage,
      matchMedia: () => ({ matches: false })
    }
  });

  try {
    for (const tab of ['topics', 'key-tool', 'mcqs', 'summary'] as const) {
      const htmlCh2 = renderToStaticMarkup(
        <AppProvider>
          <StbbClassFiveScienceHub initialChapterId="ch2-microorganisms" initialTab={tab} />
        </AppProvider>
      );
      assert.match(htmlCh2, /Microorganisms — The Invisible World/);

      const htmlCh1 = renderToStaticMarkup(
        <AppProvider>
          <StbbClassFiveScienceHub initialChapterId="ch1-classification" initialTab={tab} />
        </AppProvider>
      );
      assert.match(htmlCh1, /Chapter 1: Classification of Living Things/);
    }
  } finally {
    if (prevLocalStorage === undefined) {
      delete (globalThis as Record<string, unknown>).localStorage;
    } else {
      Object.assign(globalThis, { localStorage: prevLocalStorage });
    }
    if (prevWindow === undefined) {
      delete (globalThis as Record<string, unknown>).window;
    } else {
      Object.assign(globalThis, { window: prevWindow });
    }
  }
});
