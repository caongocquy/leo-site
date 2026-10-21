import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');
const anchor = html.match(/<a\b[^>]*\bclass="featured-project"[^>]*>/);

assert.ok(anchor, 'Featured Code Atlas card must be a semantic anchor');
assert.match(anchor[0], /\bhref="\/projects\/code-atlas\/"/, 'Card must link to Code Atlas details');
assert.match(anchor[0], /\baria-label="Explore Code Atlas project"/, 'Card needs an accessible label');

const inner = html.slice(html.indexOf(anchor[0]) + anchor[0].length);
const cardBody = inner.slice(0, inner.indexOf('</a>'));
assert.ok(cardBody.includes('Explore Code Atlas'), 'Featured card content is missing');
assert.doesNotMatch(cardBody, /<a\b/, 'A linked card must not contain nested links');

console.log('Featured Code Atlas card: navigation and semantic markup verified.');
