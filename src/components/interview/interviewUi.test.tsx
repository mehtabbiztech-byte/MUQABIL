import React from 'react';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { InterviewReadinessBoard } from './InterviewReadinessBoard';
import { InterviewQuestionBank } from './InterviewQuestionBank';
import { AnalysisSummaryPanel, ScoreRing } from './InterviewScorecard';
import { analyseInterviewAnswer } from '../../lib/interviewPrep';
import { INTERVIEW_QUESTIONS, getInterviewQuestion } from '../../data/interviewQuestionBank';
import { INTERVIEW_TRACKS, LIKERT_ITEMS } from '../../data/interviewPrepData';
import { AppProvider } from '../../context/AppContext';
import { MockInterviewRoom } from './MockInterviewRoom';
import { PersonalityAssessment } from './PersonalityAssessment';
import { AnswerFeedbackLab } from './AnswerFeedbackLab';
import { InterviewPrepView } from '../../views/InterviewPrepView';

/**
 * The context-dependent screens read browser storage and `matchMedia` during
 * their first render, so install the smallest DOM surface they need. Each test
 * file runs in its own process, so these stubs cannot leak into other suites.
 */
const installBrowserStubs = () => {
  const store = new Map<string, string>();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, String(value)),
      removeItem: (key: string) => void store.delete(key),
      clear: () => store.clear(),
      key: (index: number) => [...store.keys()][index] ?? null,
      get length() {
        return store.size;
      },
    },
  });
  Object.defineProperty(globalThis, 'window', { configurable: true, value: globalThis });
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: { onLine: false, clipboard: { writeText: async () => undefined } },
  });
  (globalThis as any).matchMedia = () => ({
    matches: false,
    media: '',
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
  });
  (globalThis as any).scrollTo = () => undefined;
  (globalThis as any).speechSynthesis = { cancel: () => undefined, speak: () => undefined };
  (globalThis as any).document = {
    documentElement: { classList: { add: () => undefined, remove: () => undefined }, setAttribute: () => undefined },
    getElementById: () => null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    querySelectorAll: () => [],
  };
  (globalThis as any).addEventListener = () => undefined;
  (globalThis as any).removeEventListener = () => undefined;
};

const renderInApp = (element: React.ReactElement) => {
  const originalError = console.error;
  const originalWarn = console.warn;
  console.error = () => undefined;
  console.warn = () => undefined;
  try {
    return renderToStaticMarkup(<AppProvider>{element}</AppProvider>);
  } finally {
    console.error = originalError;
    console.warn = originalWarn;
  }
};

test('the readiness board renders the module, its statistics and every exam dossier', () => {
  const html = renderToStaticMarkup(<InterviewReadinessBoard onOpenModule={() => undefined} />);
  assert.ok(html.includes('Interview Preparation Module'));
  assert.ok(html.includes(String(INTERVIEW_QUESTIONS.length)));
  for (const track of INTERVIEW_TRACKS) {
    assert.ok(html.includes(track.shortName), track.shortName);
  }
  assert.ok(html.includes('Interview-day preparation tracker'));
  assert.ok(html.includes(INTERVIEW_TRACKS[0].officialUrl), 'the active dossier must link its official portal');
  assert.ok(/a source of official questions/i.test(html));
  assert.ok(/Not<\/strong> affiliated with FPSC/i.test(html));
});

test('the question bank renders its filters and a real curated prompt', () => {
  const html = renderToStaticMarkup(<InterviewQuestionBank />);
  assert.ok(html.includes('Curated interview question bank'));
  assert.ok(html.includes('Search a question'));
  assert.ok(html.includes(INTERVIEW_QUESTIONS[0].prompt.slice(0, 40)));
  assert.ok(html.includes('Warm-up'));
});

test('the scorecard renders practice bands, criterion scores and honesty notice', () => {
  const analysis = analyseInterviewAnswer({
    answer:
      'First, the reason is simple: I want the counter job. For example, as a volunteer I registered 240 households in my ward, and checks were completed in three weeks.',
    question: getInterviewQuestion('iv-intro-2')!,
    targetSeconds: 60,
  });
  const html = renderToStaticMarkup(<AnalysisSummaryPanel analysis={analysis} />);
  assert.ok(html.includes(String(analysis.overallScore)));
  for (const criterion of analysis.criteria) {
    assert.ok(html.includes(criterion.label.replace(/&/g, '&amp;')), criterion.label);
  }
  const ring = renderToStaticMarkup(<ScoreRing score={72} band="Interview ready" />);
  assert.ok(ring.includes('Interview ready'));
  assert.ok(ring.includes('72'));
});

test('the interview room, feedback lab and view render inside the app shell', () => {
  installBrowserStubs();

  const room = renderInApp(<MockInterviewRoom />);
  assert.ok(room.includes('Set up your mock interview'));
  assert.ok(room.includes('CSS / FPSC'));
  assert.ok(room.includes('Start mock interview'));
  assert.ok(room.includes('Full panel rotation'));
  assert.ok(room.includes('Cross-questioning after each answer'));

  const personality = renderInApp(<PersonalityAssessment />);
  assert.ok(personality.includes('Practise the behavioural half of the interview'));
  assert.ok(personality.includes(String(LIKERT_ITEMS.length)));
  assert.ok(/not a clinical|not a diagnostic|self-reflection/i.test(personality));

  const lab = renderInApp(<AnswerFeedbackLab />);
  assert.ok(lab.includes('Answer feedback lab'));
  assert.ok(/Analyse|analysis/i.test(lab));

  const view = renderInApp(<InterviewPrepView />);
  for (const tab of ['Readiness board', 'Mock interview', 'Question bank', 'Personality assessment', 'Answer feedback']) {
    assert.ok(view.includes(tab), tab);
  }
  assert.ok(view.includes('Interview Preparation Module'), 'the default tab is the readiness board');
});
