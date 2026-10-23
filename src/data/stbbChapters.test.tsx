import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { STBB_CLASS_5_CHAPTERS, ALL_STBB_MCQS } from './stbbChaptersRegistry';
import { STBB_CHAPTER_2_CONFIG } from './stbbChapterTwoMicroorganismsData';
import { STBB_CHAPTER_3_CONFIG } from './stbbChapterThreeSeedsData';
import { STBB_CHAPTER_5_CONFIG } from './stbbChapterFiveMatterData';
import { STBB_CHAPTER_6_CONFIG } from './stbbChapterSixForceData';
import { STBB_CHAPTER_4_CONFIG } from './stbbChapterFourPollutionData';
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

test('STBB Class 5 chapters registry contains Chapters 1–6 with 8 topics and 40 unique MCQs each (240 total)', () => {
  assert.equal(STBB_CLASS_5_CHAPTERS.length, 6);

  for (const chapter of STBB_CLASS_5_CHAPTERS) {
    assert.equal(chapter.topics.length, 8, `${chapter.id} should have 8 topics`);
    assert.equal(chapter.mcqs.length, 40, `${chapter.id} should have 40 MCQs`);
    assert.equal(new Set(chapter.topics.map((t) => t.id)).size, 8);
    assert.equal(new Set(chapter.topics.map((t) => t.slug)).size, 8);

    for (const mcq of chapter.mcqs) {
      assert.ok(mcq.options.length >= 2 && mcq.options.length <= 4, mcq.id);
      assert.ok(mcq.correctIndex >= 0 && mcq.correctIndex < questionOptionBound(mcq.options), mcq.id);
      assert.ok(mcq.explanation.length > 20, mcq.id);
    }
  }

  assert.equal(ALL_STBB_MCQS.length, 240);
  assert.equal(new Set(ALL_STBB_MCQS.map((q) => q.id)).size, 240);
});

function questionOptionBound(options: string[]): number {
  return options.length;
}

test('Chapters 2–6 validate every unscramble anagram, A1Z26 cipher, mnemonic, riddle, Venn diagram, and flowchart', () => {
  for (const chapter of [
    STBB_CHAPTER_2_CONFIG,
    STBB_CHAPTER_3_CONFIG,
    STBB_CHAPTER_4_CONFIG,
    STBB_CHAPTER_5_CONFIG,
    STBB_CHAPTER_6_CONFIG
  ]) {
    for (const topic of chapter.topics) {
      assert.ok(topic.mnemonic, `${chapter.id}/${topic.slug} missing mnemonic`);
      assert.ok(topic.riddle, `${chapter.id}/${topic.slug} missing riddle`);
      assert.ok(topic.flowchartAscii, `${chapter.id}/${topic.slug} missing mental model flowchart`);
      assert.ok(topic.vennDiagram, `${chapter.id}/${topic.slug} missing Venn diagram`);
      assert.ok(
        topic.deepDiveSections && topic.deepDiveSections.length >= 2,
        `${chapter.id}/${topic.slug} missing deep-dive cards`
      );
      assert.ok(
        topic.realWorldExamples.length >= 3,
        `${chapter.id}/${topic.slug} missing real-world examples`
      );

      for (const unscramble of topic.unscrambles || []) {
        const sortedScrambled = unscramble.scrambled.toUpperCase().split('').sort().join('');
        const sortedSolution = unscramble.solution.toUpperCase().split('').sort().join('');
        assert.equal(
          sortedScrambled,
          sortedSolution,
          `Unscramble letter mismatch in ${chapter.id}/${topic.slug}: ${unscramble.scrambled} vs ${unscramble.solution}`
        );
      }

      for (const item of topic.secretCodeActivity?.items || []) {
        assert.equal(
          decodeA1Z26(item.encoded),
          item.answer,
          `Cipher mismatch in ${chapter.id}/${topic.slug}: ${item.encoded} -> ${decodeA1Z26(item.encoded)} != ${item.answer}`
        );
      }
    }
  }
});

test('StbbClassFiveScienceHub renders all 6 tabs cleanly across Chapters 1–6', () => {
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
    for (const chapter of STBB_CLASS_5_CHAPTERS) {
      for (const tab of ['topics', 'key-tool', 'mcqs', 'summary', 'activities', 'qa'] as const) {
        const html = renderToStaticMarkup(
          <AppProvider>
            <StbbClassFiveScienceHub initialChapterId={chapter.id} initialTab={tab} />
          </AppProvider>
        );
        if (tab === 'activities') {
          assert.ok(html.includes('Activities &amp; Investigation Journal'));
          for (const activity of chapter.activitiesAndQA!.activities) assert.ok(html.includes(activity.title.replaceAll('&', '&amp;')));
        }
        if (tab === 'qa') {
          assert.ok(html.includes('Questions &amp; Answers — All Types'));
          assert.ok(html.includes('Give Reasons'));
        }
        assert.ok(
          html.includes(chapter.heroTitle),
          `Expected ${chapter.heroTitle} in rendered markup for tab=${tab}`
        );
      }
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


test('Every chapter has complete activity and all-type Q&A data with unique IDs', () => {
  for (const chapter of STBB_CLASS_5_CHAPTERS) {
    const extras = chapter.activitiesAndQA;
    assert.ok(extras);
    const items = [...extras.activities, ...extras.fillInBlanks, ...extras.trueFalse, ...extras.descriptiveQA];
    assert.equal(new Set(items.map(item => item.id)).size, items.length);
    assert.ok(extras.fillInBlanks.length >= 4);
    assert.ok(extras.trueFalse.length >= 4);
    for (const type of ['definition-short', 'give-reason', 'structured-long', 'problem-solving']) {
      assert.ok(extras.descriptiveQA.some(q => q.category === type), `${chapter.id}/${type}`);
    }
    for (const activity of extras.activities) {
      assert.ok(activity.materials.length > 0);
      assert.ok(activity.procedure.length >= 2);
      assert.ok(activity.questions.length > 0);
      assert.ok(activity.conclusion.length > 20);
      if (activity.observationTable) {
        for (const row of activity.observationTable.rows) assert.equal(row.length, activity.observationTable.headers.length);
      }
    }
    for (const q of extras.fillInBlanks) {
      assert.ok(q.promptWithBlank.includes('___'));
      assert.ok(q.answer.trim().length > 0);
    }
    for (const mcq of chapter.mcqs) assert.ok(chapter.topics.some(t => t.id === mcq.topicRefId));
  }
  assert.equal(STBB_CHAPTER_5_CONFIG.activitiesAndQA!.activities.length, 7);
  assert.equal(STBB_CHAPTER_6_CONFIG.activitiesAndQA!.activities.length, 6); // 5 experiments + inquiry project
});

test('New chapter diagnostic sample paths reach their advertised outcomes', () => {
  for (const chapter of [STBB_CHAPTER_5_CONFIG, STBB_CHAPTER_6_CONFIG]) {
    for (const sample of chapter.decisionTool.specimens) {
      let node = chapter.decisionTool.nodes[0];
      const choices = sample.expectedPath.split(' → ');
      for (const choice of choices) {
        const branch = choice === 'Yes' ? node.onYes : node.onNo;
        if (branch.type === 'result') assert.equal(branch.result.group, sample.targetGroup);
        else {
          assert.equal(branch.type, 'next');
          if (branch.type === 'next') {
            const next = chapter.decisionTool.nodes.find(n => n.id === branch.nextNodeId);
            assert.ok(next);
            node = next;
          }
        }
      }
    }
  }
});
