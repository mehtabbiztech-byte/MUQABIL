import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);

test('react and react-dom resolve to the same version', () => {
  const react = require('react/package.json') as { version: string };
  const reactDom = require('react-dom/package.json') as { version: string };
  assert.equal(react.version, reactDom.version, 'react and react-dom must be identical; a mismatch crashes react-dom/server and CI');
});

test('package.json pins react and react-dom together', () => {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8')) as {
    dependencies: Record<string, string>;
  };
  assert.equal(pkg.dependencies.react, pkg.dependencies['react-dom']);
});

test('GitHub Pages CNAME is not a Vercel alias', () => {
  const cnamePath = path.resolve(process.cwd(), 'CNAME');
  if (!fs.existsSync(cnamePath)) {
    return;
  }
  const cname = fs.readFileSync(cnamePath, 'utf8').trim().toLowerCase();
  assert.ok(
    !cname.endsWith('.vercel.app'),
    `CNAME '${cname}' would make github.io redirect at a Vercel hostname GitHub cannot serve`,
  );
});
