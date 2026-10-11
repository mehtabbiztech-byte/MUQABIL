import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { NavigationTab } from '../types';
import {
  NON_INDEXABLE_TABS,
  SITE_ORIGIN,
  SITE_SECTIONS,
  TAB_PATHS,
  absoluteUrlForPath,
  pathForTab,
  tabFromPathname,
} from './siteRoutes';
import { buildRobotsTxt, buildSitemapXml } from '../../scripts/generate-sitemap';

const ALL_TABS: NavigationTab[] = [
  'home', 'mcqs', 'quiz', 'past-papers', 'past-papers-pdf', 'current-affairs', 'exams', 'jobs',
  'resume', 'study-notes', 'rankings', 'learning-lab', 'ai-chat', 'interview', 'study-planner', 'about',
  'bookmarks', 'mistakes', 'age-calculator',
];

test('every navigation tab has a unique path', () => {
  assert.deepEqual(Object.keys(TAB_PATHS).sort(), [...ALL_TABS].sort());
  const paths = Object.values(TAB_PATHS);
  assert.equal(new Set(paths).size, paths.length);
});

test('each tab round-trips through its URL path', () => {
  for (const tab of ALL_TABS) {
    assert.equal(tabFromPathname(pathForTab(tab)), tab, tab);
  }
});

test('path matching ignores trailing slashes and letter case, and unknown paths fall back to home', () => {
  assert.equal(tabFromPathname('/mcqs/'), 'mcqs');
  assert.equal(tabFromPathname('/MCQS'), 'mcqs');
  assert.equal(tabFromPathname('/'), 'home');
  assert.equal(tabFromPathname(''), 'home');
  assert.equal(tabFromPathname('/no-such-page'), 'home');
});

test('sitemap sections are unique, use canonical absolute URLs and exclude private tabs', () => {
  const paths = SITE_SECTIONS.map((section) => section.path);
  assert.equal(new Set(paths).size, paths.length);
  for (const section of SITE_SECTIONS) {
    assert.ok(!NON_INDEXABLE_TABS.includes(section.tab), section.tab);
    assert.equal(section.path, pathForTab(section.tab));
    assert.ok(absoluteUrlForPath(section.path).startsWith(`${SITE_ORIGIN}/`));
    assert.ok(section.title.length > 0 && section.title.length <= 70, section.title);
    assert.ok(section.description.length > 0 && section.description.length <= 200, section.tab);
  }
  assert.equal(SITE_ORIGIN, 'https://muqabil.org');
});

test('public/sitemap.xml is in sync with the route map', () => {
  const file = fs.readFileSync(path.resolve(process.cwd(), 'public/sitemap.xml'), 'utf-8');
  const expected = buildSitemapXml('2026-10-11');
  const locs = [...file.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual(locs, SITE_SECTIONS.map((section) => absoluteUrlForPath(section.path)));
  assert.equal(file.replace(/<lastmod>[^<]+<\/lastmod>/g, '').replace(/\s+/g, ''), expected.replace(/<lastmod>[^<]+<\/lastmod>/g, '').replace(/\s+/g, ''));
});

test('public/robots.txt points crawlers at the sitemap and blocks admin and API paths', () => {
  const file = fs.readFileSync(path.resolve(process.cwd(), 'public/robots.txt'), 'utf-8');
  assert.equal(file, buildRobotsTxt());
  assert.match(file, /^Sitemap: https:\/\/muqabil\.org\/sitemap\.xml$/m);
  assert.match(file, /^Disallow: \/admin$/m);
  assert.match(file, /^Disallow: \/api\/$/m);
});

test('index.html canonical and og:url use the muqabil.org domain', () => {
  const html = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
  assert.match(html, /<link rel="canonical" href="https:\/\/muqabil\.org" \/>/);
  assert.match(html, /<meta property="og:url" content="https:\/\/muqabil\.org" \/>/);
});
