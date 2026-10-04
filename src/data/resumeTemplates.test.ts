import assert from 'node:assert/strict';
import test from 'node:test';
import {
  RESUME_TEMPLATES,
  RESUME_TEMPLATE_CATEGORIES,
  RESUME_ACCENT_HEX,
  resolveResumeTemplate,
} from './resumeTemplates';

test('resume gallery contains more than forty new presets plus existing formats', () => {
  const original = new Set(['sts-govt', 'modern-ats', 'executive', 'minimal', 'fortune-500', 'tech-compact']);
  const additions = RESUME_TEMPLATES.filter((template) => !original.has(template.id));
  assert.ok(additions.length > 40, `expected more than 40 new templates, got ${additions.length}`);
  assert.equal(RESUME_TEMPLATES.length, additions.length + original.size);
});

test('template identifiers, names, categories, layouts, colors and fallbacks are valid', () => {
  const ids = RESUME_TEMPLATES.map((template) => template.id);
  const names = RESUME_TEMPLATES.map((template) => template.name);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(new Set(names).size, names.length);
  for (const template of RESUME_TEMPLATES) {
    assert.ok(RESUME_TEMPLATE_CATEGORIES.includes(template.category as (typeof RESUME_TEMPLATE_CATEGORIES)[number]));
    assert.ok(['sts-govt', 'fortune-500', 'modern-ats', 'tech-compact', 'executive', 'minimal'].includes(template.previewLayout));
    assert.ok(RESUME_ACCENT_HEX[template.accentColor]);
    assert.ok(template.description.length > 20);
  }
  assert.equal(resolveResumeTemplate('missing-template').id, 'minimal');
});
