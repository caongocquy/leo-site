import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
for (const [locale, prefix, title, marker] of [
  ['vi', '', 'Từng chặng đường', 'HÀNH TRÌNH SỰ NGHIỆP'],
  ['en', 'en/', 'A career built', 'CAREER JOURNEY'],
]) {
  const page = read(`dist/${prefix}journey/index.html`);
  const home = read(`dist/${prefix}index.html`);
  assert.match(page, new RegExp(`<html[^>]*lang="${locale}"`), `${locale} missing lang`);
  assert.ok(page.includes(title) && page.includes(marker), `${locale}: journey not translated`);
  assert.ok(page.includes('data-journey-track') && page.includes('data-journey-item'), `${locale}: timeline markup missing`);
  assert.ok(page.includes('data-journey-toc'), `${locale}: missing milestone scrollspy navigation`);
  for (const id of ['mgi', '45cm', '1988s', 'galaxy', 'open-source']) {
    assert.ok(page.includes(`href="#${id}"`), `${locale}: missing milestone anchor #${id}`);
  }
  assert.ok(page.includes('MGI Global') && page.includes('45CM VINA'), `${locale}: earlier history missing`);
  assert.ok(page.includes('1988s Media and Technology') && page.includes('Galaxy Technology Services'), `${locale}: later employment missing`);
  assert.ok(page.includes('VietJet Air') && page.includes('HDBank'), `${locale}: client assignments missing`);
  assert.ok(page.includes('Code Atlas') && page.includes('Showdar Skills'), `${locale}: open-source milestone missing`);
  assert.ok(home.includes(`href="/${prefix}journey/"`), `${locale}: no homepage journey link`);
  assert.ok(page.includes(`href="/${prefix}projects/code-atlas/"`), `${locale}: project link not localized`);
  const galaxyIndex = page.indexOf('Galaxy Technology Services');
  const clientIndex = page.indexOf('VietJet Air');
  assert.ok(galaxyIndex >= 0 && clientIndex > galaxyIndex, `${locale}: client must be listed under Galaxy`);
}
const journeySource = read('src/components/JourneyPage.astro');
assert.ok(journeySource.includes('prefers-reduced-motion'), 'Journey must support reduced motion');
assert.ok(journeySource.includes("setAttribute('aria-current', 'location')"), 'Scrollspy must identify active milestone accessibly');
console.log('Career Journey: bilingual routes, chronology, accessible scrollspy and client distinction verified.');
