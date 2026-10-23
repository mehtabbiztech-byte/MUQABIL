import test from 'node:test';
import assert from 'node:assert/strict';
import React, { act } from 'react';
import { JSDOM } from 'jsdom';
import { StbbActivitiesAndQA, normalizeStudyAnswer } from './StbbActivitiesAndQA';
import { STBB_CHAPTER_5_CONFIG } from '../data/stbbChapterFiveMatterData';

test('study answer normalization handles case, whitespace and textbook range dashes', () => {
  assert.equal(normalizeStudyAnswer('  MaTTeR  '), 'matter');
  assert.equal(normalizeStudyAnswer('16–24'), '16-24');
});

test('Activities and Q&A controls validate, filter, record observations and reset', async () => {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://study.test' });
  const globals = globalThis as unknown as Record<string, unknown>;
  const keys = ['window', 'document', 'navigator', 'HTMLElement', 'IS_REACT_ACT_ENVIRONMENT'];
  const saved = keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)] as const);
  for (const [key, value] of Object.entries({ window: dom.window, document: dom.window.document, navigator: dom.window.navigator, HTMLElement: dom.window.HTMLElement, IS_REACT_ACT_ENVIRONMENT: true })) {
    Object.defineProperty(globals, key, { value, writable: true, configurable: true });
  }
  const { createRoot } = await import('react-dom/client');
  const host = dom.window.document.getElementById('root')!;
  const root = createRoot(host);
  const click = async (el: Element) => act(async () => { el.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true })); });
  const findButton = (text: string) => {
    const result = [...host.querySelectorAll('button')].find(b => b.textContent === text);
    assert.ok(result, `Missing button: ${text}`);
    return result;
  };
  const type = async (el: HTMLInputElement | HTMLTextAreaElement, value: string) => {
    const proto = el.tagName === 'TEXTAREA' ? dom.window.HTMLTextAreaElement.prototype : dom.window.HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value')!.set!.call(el, value);
    await act(async () => { el.dispatchEvent(new dom.window.Event('input', { bubbles: true })); });
  };
  try {
    await act(async () => { root.render(<StbbActivitiesAndQA chapter={STBB_CHAPTER_5_CONFIG} mode="qa" />); });
    await click(findButton('Fill in the Blanks'));
    assert.equal(host.querySelectorAll('textarea').length, 0);
    const blank = host.querySelector('input')!;
    await type(blank, '  MATTER  ');
    await click(findButton('Check'));
    assert.ok(host.textContent!.includes('Correct!'));
    assert.ok(host.textContent!.includes('Blanks: 1/8 correct'));
    await type(blank, 'not matter');
    assert.ok(!host.querySelector('[role="status"]'));
    await click(findButton('Check'));
    assert.ok(host.textContent!.includes('Not yet'));
    await click(findButton('True / False'));
    await click(findButton('False'));
    assert.ok(host.textContent!.includes('True/False: 1/5 correct'));
    await click(findButton('Reset practice & journal'));
    assert.ok(host.textContent!.includes('True/False: 0/5 correct'));
    await click(findButton('Give Reasons'));
    assert.equal(host.querySelectorAll('textarea').length, 3);
    assert.ok(host.textContent!.includes('Why does ice change into water'));
    await click(findButton('Multiple Choice'));
    assert.equal(host.querySelectorAll('details').length, 40);

    await act(async () => { root.render(<StbbActivitiesAndQA key="activities" chapter={STBB_CHAPTER_5_CONFIG} mode="activities" />); });
    assert.equal(host.querySelectorAll('input[type="checkbox"]').length, 7);
    await click(host.querySelector('input[type="checkbox"]')!);
    assert.ok(host.textContent!.includes('1 / 7 activities marked complete'));
    const notes = host.querySelector('textarea')!;
    await type(notes, 'I predict the water will spread.');
    assert.equal(notes.value, 'I predict the water will spread.');
    const cell = host.querySelector<HTMLInputElement>('input:not([type="checkbox"])')!;
    await type(cell, 'Half remains');
    assert.equal(cell.value, 'Half remains');
    await click(findButton('Reset practice & journal'));
    assert.equal(notes.value, '');
    assert.equal(cell.value, '');
    assert.ok(host.textContent!.includes('0 / 7 activities marked complete'));
  } finally {
    await act(async () => { root.unmount(); });
    for (const [key, descriptor] of saved) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globals[key];
    }
    dom.window.close();
  }
});
