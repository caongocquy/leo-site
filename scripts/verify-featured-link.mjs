import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

for (const [locale, prefix, label] of [
  ['vi', '', 'Khám phá Code Atlas: Code Atlas'],
  ['en', 'en/', 'Explore Code Atlas: Code Atlas'],
]) {
  const html = readFileSync(`dist/${prefix}index.html`, 'utf8');
  const anchor = html.match(/<a\b[^>]*\bclass="featured-project"[^>]*>/);
  assert.ok(anchor, `${locale}: missing semantic featured link`);
  assert.ok(anchor[0].includes(`href="/${prefix}projects/code-atlas/"`), `${locale}: wrong featured route`);
  assert.ok(anchor[0].includes(`aria-label="${label}"`), `${locale}: missing accessible featured label`);
  const cardBody = html.slice(html.indexOf(anchor[0]) + anchor[0].length).split('</a>')[0];
  assert.ok(cardBody.includes('Code Atlas'), `${locale}: missing card content`);
  assert.doesNotMatch(cardBody, /<a\b/, 'Nested anchor in featured card');
}
console.log('Featured Code Atlas card: accessible link verified for both locales.');
