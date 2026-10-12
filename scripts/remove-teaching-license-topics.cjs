const fs = require('node:fs');
const path = require('node:path');

const filePath = path.resolve(__dirname, '../src/data/teachingLicenseNotesData.ts');
const topicIds = [
  'methods-instructional-approaches-strategies',
  'methods-lesson-planning-models',
];

function matchingBrace(source, openIndex) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let i = openIndex; i < source.length; i += 1) {
    const char = source[i];
    const next = source[i + 1];

    if (lineComment) {
      if (char === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === '*' && next === '/') {
        blockComment = false;
        i += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }
    if (char === '/' && next === '/') {
      lineComment = true;
      i += 1;
      continue;
    }
    if (char === '/' && next === '*') {
      blockComment = true;
      i += 1;
      continue;
    }
    if (char === "'" || char === '"' || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}' && --depth === 0) return i;
  }

  return -1;
}

function removeTopic(source, topicId) {
  const idIndex = source.indexOf(`id: '${topicId}'`);
  if (idIndex < 0) throw new Error(`Topic not found: ${topicId}`);

  const objectStart = source.lastIndexOf('{', idIndex);
  const objectEnd = matchingBrace(source, objectStart);
  if (objectStart < 0 || objectEnd < 0) throw new Error(`Invalid topic object: ${topicId}`);

  let removeStart = objectStart;
  let removeEnd = objectEnd + 1;
  let cursor = removeEnd;
  while (/\s/.test(source[cursor] || '')) cursor += 1;

  if (source[cursor] === ',') {
    removeEnd = cursor + 1;
  } else {
    let previous = objectStart - 1;
    while (/\s/.test(source[previous] || '')) previous -= 1;
    if (source[previous] === ',') removeStart = previous;
  }

  return source.slice(0, removeStart) + source.slice(removeEnd);
}

let source = fs.readFileSync(filePath, 'utf8');
for (const topicId of topicIds) source = removeTopic(source, topicId);
fs.writeFileSync(filePath, source);
console.log(`Removed ${topicIds.length} teaching-license topics for this build.`);
