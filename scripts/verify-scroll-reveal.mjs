import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('src/components/ScrollReveal.astro', 'utf8');
const layout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');

assert.ok(layout.includes("import ScrollReveal from '../components/ScrollReveal.astro'"), 'Scroll reveal must be wired into layout');
assert.ok(layout.includes('<ScrollReveal />'), 'Scroll reveal must be on every page');
assert.ok(source.includes('IntersectionObserver'), 'Use native intersection observation rather than global scroll loops');
assert.ok(source.includes('observer.unobserve(element)'), 'Animation must run once per block');
assert.ok(source.includes('prefers-reduced-motion: reduce'), 'Reduced motion CSS fallback required');
assert.ok(source.includes('motionPreference.matches'), 'Reduced motion JS opt-out required');
assert.ok(source.includes('animationend'), 'Restore existing card hover transitions after entrance');
assert.ok(source.includes("addEventListener('focusin'"), 'Keyboard focus must reveal offscreen content');
assert.ok(source.includes('rect.top <= window.innerHeight * .9'), 'Above-fold content must not flash');
assert.ok(source.includes('rootMargin:'), 'Trigger near viewport edge');
assert.ok(!source.includes('window.addEventListener(\'scroll\''), 'Use observer instead of another scroll listener');
assert.ok(!source.includes('setInterval('), 'No polling');
assert.ok(source.includes('/* Nodes only become hidden after JavaScript opts them in. */'), 'No-JS progressive enhancement missing');

const pages = [
  ['dist/index.html', 12],
  ['dist/en/index.html', 12],
  ['dist/projects/index.html', 5],
  ['dist/en/projects/index.html', 5],
  ['dist/projects/code-atlas/index.html', 4],
  ['dist/en/projects/code-atlas/index.html', 4],
  ['dist/projects/react-native-otp-input-kit/index.html', 5],
  ['dist/en/projects/react-native-otp-input-kit/index.html', 5],
  ['dist/journey/index.html', 6],
  ['dist/en/journey/index.html', 6],
];
for (const [path, expectedMinimum] of pages) {
  const html = readFileSync(path, 'utf8');
  const count = (html.match(/data-scroll-reveal(?:\\s|>)/g) ?? []).length;
  assert.ok(count >= expectedMinimum, `${path}: expected >=${expectedMinimum} marked blocks, got ${count}`);
  assert.ok(!html.includes('scroll-reveal-pending'), `${path}: server must never ship hidden content by default`);
}
console.log('Scroll reveal: bilingual pages, per-block markers, JS-disabled fallback and accessibility contracts verified.');
