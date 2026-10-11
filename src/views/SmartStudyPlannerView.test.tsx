import React from 'react';
import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { SmartStudyPlannerView } from './SmartStudyPlannerView';

test('smart study planner opens on an accessible, prefilled exam setup wizard', () => {
  const html = renderToStaticMarkup(<SmartStudyPlannerView />);
  assert.match(html, /Prepare for the Future/);
  assert.match(html, /Select organization/);
  assert.match(html, /Position \/ test/);
  assert.match(html, /Graduation category/);
  assert.match(html, /FPSC/);
  assert.match(html, /Custom Test/);
  assert.match(html, /Continue/);
  assert.match(html, /Which exam are you preparing for/);
});
