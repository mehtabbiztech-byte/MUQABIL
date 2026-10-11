import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../../api/interview-coach';
import { ANSWER_CRITERIA } from '../data/interviewPrepData';
import { requestInterviewFeedback, requestInterviewerQuestion, isAiConfiguredHint } from './interviewCoach';

process.env.NODE_ENV = 'test';

interface CapturedResponse {
  status: number;
  headers: Record<string, string>;
  body: any;
}

function fakeResponse(): { response: any; captured: CapturedResponse } {
  const captured: CapturedResponse = { status: 0, headers: {}, body: undefined };
  const response: any = {
    setHeader: (name: string, value: string) => {
      captured.headers[name] = value;
    },
    status(code: number) {
      captured.status = code;
      return response;
    },
    json(body: unknown) {
      captured.body = body;
      return response;
    },
  };
  return { response, captured };
}

const call = async (
  body: Record<string, unknown>,
  options: { method?: string; ip?: string; raw?: string } = {}
): Promise<CapturedResponse> => {
  const { response, captured } = fakeResponse();
  await handler(
    {
      method: options.method || 'POST',
      body: options.raw ?? body,
      headers: { 'x-forwarded-for': options.ip || 'test-client' },
    } as any,
    response
  );
  return captured;
};

const withKey = (t: { after: (fn: () => void) => void }) => {
  process.env.GEMINI_API_KEY = 'test-key-never-sent-to-a-real-provider';
  t.after(() => {
    delete process.env.GEMINI_API_KEY;
  });
};

const VALID_QUESTION = {
  prompt: 'You have served three years in a union council. What did that work teach you about public service?',
  category: 'intro-motivation',
  whyThisQuestion: 'Tests whether the candidate can connect lived experience to the demands of the post.',
  listenFor: ['A concrete example', 'Own role, not the team alone', 'A lesson carried forward'],
  targetSeconds: 90,
  followUp: 'What would you do differently if you ran that programme again?',
};

const validFeedback = () => ({
  criteria: ANSWER_CRITERIA.map((criterion, index) => ({
    id: criterion.id,
    score: 5 + (index % 4),
    comment: `Practice comment for ${criterion.label}.`,
    evidence: index === 0 ? 'I registered 240 households' : '',
    fix: `Tighten ${criterion.label.toLowerCase()} in the next attempt.`,
  })),
  strengths: ['Clear ownership of the work described.'],
  missingPoints: ['No timeline was given for the second phase.'],
  modelOpening: 'In the union council I ran a vaccination register covering 240 households.',
  followUp: 'How did you verify the households you could not reach?',
  panelNote: 'A grounded answer that would land better with dates and a closing sentence.',
});

const providerReply = (payload: unknown, status = 200) =>
  new Response(
    status === 200
      ? JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify(payload) }] } }] })
      : JSON.stringify({ error: { message: 'provider failure' } }),
    { status, headers: { 'Content-Type': 'application/json' } }
  );

const originalFetch = globalThis.fetch;

test('GET documents the interview coach contract without revealing any key', async () => {
  const captured = await call({}, { method: 'GET' });
  assert.equal(captured.status, 200);
  assert.equal(captured.headers['Cache-Control'], 'no-store');
  assert.equal(captured.body.status, 'ok');
  assert.equal(captured.body.endpoint, '/api/interview-coach');
  assert.deepEqual(captured.body.modes, ['question', 'feedback']);
  for (const track of ['css', 'pms', 'ppsc', 'sts', 'nts']) {
    assert.ok(captured.body.tracks.includes(track), track);
  }
  assert.deepEqual(
    captured.body.criteria,
    ANSWER_CRITERIA.map((criterion) => criterion.id)
  );
  assert.match(captured.body.notice, /never produces official marks/i);
  assert.equal(JSON.stringify(captured.body).includes('GEMINI_API_KEY'), false);
});

test('the endpoint rejects unsupported methods and malformed modes before doing any work', async () => {
  const wrongMethod = await call({}, { method: 'DELETE' });
  assert.equal(wrongMethod.status, 405);
  assert.equal(wrongMethod.body.error, 'Method Not Allowed');

  const badMode = await call({ mode: 'essay-grading' });
  assert.equal(badMode.status, 400);
  assert.match(badMode.body.error, /mode must be/i);

  const stringified = await call({}, { raw: '{not json at all' });
  assert.equal(stringified.status, 400);
});

test('feedback requires both a question and a real answer', async () => {
  const tooShort = await call({ mode: 'feedback', question: 'Why this post?', answer: 'Because I like it.' });
  assert.equal(tooShort.status, 400);
  assert.match(tooShort.body.error, /20 characters/i);

  const longEnough = 'I want this post because the union council work I did showed me how service decisions reach households.';
  const missingQuestion = await call({ mode: 'feedback', answer: longEnough });
  assert.equal(missingQuestion.status, 400);
  assert.match(missingQuestion.body.error, /question being answered/i);
});

test('without a configured key the endpoint degrades to an offline fallback message', async (t) => {
  delete process.env.GEMINI_API_KEY;
  t.after(() => {
    globalThis.fetch = originalFetch;
  });
  let providerCalls = 0;
  globalThis.fetch = (async () => {
    providerCalls += 1;
    return providerReply(VALID_QUESTION);
  }) as typeof fetch;

  const question = await call(
    { mode: 'question', trackId: 'css', personaId: 'chairperson' },
    { ip: 'fallback-ip' }
  );
  assert.equal(question.status, 503);
  assert.equal(question.body.fallback, true);
  assert.match(question.body.error, /not configured/i);
  assert.ok(isAiConfiguredHint(question.body.error));

  const feedback = await call(
    {
      mode: 'feedback',
      question: 'Why this post?',
      answer: 'I led a vaccination register covering 240 households in my union council over three weeks.',
    },
    { ip: 'fallback-ip' }
  );
  assert.equal(feedback.status, 503);
  assert.equal(providerCalls, 0, 'no provider call may be attempted without a key');
});

test('the AI interviewer returns a validated question and never leaks the model chain', async (t) => {
  withKey(t);
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const attempts: { url: string; body: any }[] = [];
  globalThis.fetch = (async (url: any, init: any) => {
    attempts.push({ url: String(url), body: JSON.parse(String(init.body)) });
    if (attempts.length === 1) return providerReply({ error: 'unknown model' }, 404);
    return providerReply(VALID_QUESTION);
  }) as typeof fetch;

  const captured = await call(
    {
      mode: 'question',
      trackId: 'pms',
      personaId: 'current-affairs',
      category: 'current-affairs',
      askedPrompts: ['Introduce yourself.'],
    },
    { ip: 'question-ip' }
  );

  assert.equal(captured.status, 200);
  assert.equal(captured.body.source, 'ai');
  assert.equal(captured.body.prompt, VALID_QUESTION.prompt);
  assert.equal(captured.body.category, 'current-affairs');
  assert.equal(captured.body.targetSeconds, 90);
  assert.equal(attempts.length, 2, 'a 404 model id must fall through to the next model');
  assert.ok(!attempts.some((attempt) => /key=test-key/.test(String(captured.body))));

  const providerPayload = attempts[1].body;
  assert.equal(providerPayload.generationConfig.responseMimeType, 'application/json');
  assert.match(providerPayload.systemInstruction.parts[0].text, /exactly ONE question/i);
  const sent = JSON.parse(providerPayload.contents[0].parts[0].text);
  assert.equal(sent.examTrack.id, 'pms');
  assert.deepEqual(sent.alreadyAsked, ['Introduce yourself.']);
  assert.equal(sent.panelSeat.role.length > 0, true);
});

test('criterion feedback is shape-validated and a broken model response is refused', async (t) => {
  withKey(t);
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const request = {
    mode: 'feedback',
    trackId: 'ppsc',
    personaId: 'subject-specialist',
    question: 'How would you improve school attendance in a low-income union council?',
    answer:
      'I would start with the households already known to the school, map the out-of-school children ward by ward, and give the head teacher a monthly attendance target.',
    targetSeconds: 120,
  };

  globalThis.fetch = (async () => providerReply({ criteria: 'not-an-array' })) as typeof fetch;
  const malformed = await call(request, { ip: 'feedback-ip' });
  assert.equal(malformed.status, 502);
  assert.equal(malformed.body.fallback, true);
  assert.match(malformed.body.error, /structural analyser/i);

  const wrongCriteria = validFeedback();
  wrongCriteria.criteria[2] = { ...wrongCriteria.criteria[2], id: 'charisma' as never };
  globalThis.fetch = (async () => providerReply(wrongCriteria)) as typeof fetch;
  const invented = await call(request, { ip: 'feedback-ip' });
  assert.equal(invented.status, 502, 'a criterion id outside the rubric must be rejected');

  globalThis.fetch = (async () => providerReply(validFeedback())) as typeof fetch;
  const ok = await call(request, { ip: 'feedback-ip' });
  assert.equal(ok.status, 200);
  assert.equal(ok.body.source, 'ai');
  assert.deepEqual(
    ok.body.criteria.map((criterion: { id: string }) => criterion.id),
    ANSWER_CRITERIA.map((criterion) => criterion.id)
  );
  assert.equal(ok.body.criteria[1].evidence, '');
  assert.equal(ok.body.panelNote.length > 0, true);
});

test('the endpoint throttles a single client instead of spending key budget', async () => {
  const ip = `throttle-${Date.now()}`;
  for (let index = 0; index < 20; index += 1) {
    const allowed = await call({ mode: 'question', trackId: 'nts' }, { ip });
    assert.equal(allowed.status, 503, `request ${index + 1} must reach the key check, not the limiter`);
  }
  const blocked = await call({ mode: 'question', trackId: 'nts' }, { ip });
  assert.equal(blocked.status, 429);
  assert.equal(blocked.body.retryAfterSeconds, 30);

  const otherClient = await call({ mode: 'question', trackId: 'nts' }, { ip: `${ip}-other` });
  assert.equal(otherClient.status, 503, 'one noisy client must not exhaust another client');
});

test('the browser client posts the session context and validates what comes back', async (t) => {
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const requests: { url: string; body: any }[] = [];
  globalThis.fetch = (async (url: any, init: any) => {
    requests.push({ url: String(url), body: JSON.parse(String(init.body)) });
    return new Response(JSON.stringify({ ...VALID_QUESTION, source: 'ai' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }) as typeof fetch;

  const suggestion = await requestInterviewerQuestion({
    trackId: 'css',
    personaId: 'psychologist',
    category: 'situational-behavioural',
    transcript: [{ role: 'candidate', text: 'I led a vaccination register.' }],
    askedPrompts: ['Introduce yourself.'],
    candidateContext: { post: 'Assistant Commissioner', province: 'Sindh' },
  });
  assert.equal(suggestion.prompt, VALID_QUESTION.prompt);
  assert.equal(suggestion.source, 'ai');
  assert.equal(requests[0].url, '/api/interview-coach');
  assert.equal(requests[0].body.mode, 'question');
  assert.equal(requests[0].body.trackId, 'css');
  assert.equal(requests[0].body.transcript.length, 1);
  assert.equal(requests[0].body.candidateContext.post, 'Assistant Commissioner');

  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ criteria: [], strengths: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })) as typeof fetch;
  await assert.rejects(
    () => requestInterviewFeedback({ trackId: 'css', personaId: 'psychologist', category: 'current-affairs', question: 'Q', answer: 'A'.repeat(40) }),
    /unusable|Incomplete/i
  );

  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: 'The AI interviewer is unavailable right now.', fallback: true }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })) as typeof fetch;
  await assert.rejects(
    () => requestInterviewerQuestion({ trackId: 'sts', personaId: 'chairperson', category: 'intro-motivation' }),
    /unavailable/i
  );
});
