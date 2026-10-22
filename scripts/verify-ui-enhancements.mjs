import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const slugs = [
  'code-atlas',
  'showdar-router',
  'showdar-skills',
  'react-native-otp-input-kit',
  'react-native-splash-view',
];
const expectedGallery = {
  'code-atlas': ['cli-init.svg', 'cli-inspect-change.svg'],
  'showdar-router': ['showdar-router-dashboard.png', 'showdar-router-terminal.png'],
  'react-native-otp-input-kit': ['otp-input-kit-upwork.webp'],
  'react-native-splash-view': ['splash-view-upwork.webp'],
};

for (const slug of slugs) {
  const html = readFileSync(`dist/en/projects/${slug}/index.html`, 'utf8');
  for (const manager of ['npm', 'pnpm', 'yarn', 'bun']) {
    assert.ok(html.includes(`data-install-manager="${manager}"`), `${slug}: missing ${manager} install option`);
  }
  assert.ok(html.includes('data-demo-copy'), `${slug}: missing copy action`);
  assert.ok(html.includes('demo-copy-done'), `${slug}: missing copied check feedback`);
  const hasGallery = /<div\b[^>]*\bdata-project-gallery\b/.test(html);
  const hasLightbox = /<dialog\b[^>]*\bdata-project-lightbox\b/.test(html);
  if (slug in expectedGallery) {
    assert.ok(hasGallery, `${slug}: missing screenshot gallery`);
    assert.ok(hasLightbox, `${slug}: missing native dialog lightbox`);
    for (const file of expectedGallery[slug]) {
      assert.ok(html.includes(file), `${slug}: missing gallery image ${file}`);
    }
    if (slug.startsWith('react-native-')) {
      assert.ok(html.includes('data-gallery-kind="concept"'), `${slug}: promotional mockup must be labeled concept`);
      assert.ok(html.includes('Promotional concept'), `${slug}: promotional disclosure missing`);
    }
  } else {
    assert.ok(!hasGallery, `${slug}: should not show gallery without public screenshots`);
  }
}

const home = readFileSync('dist/index.html', 'utf8');
for (const kind of ['scene-mobile', 'scene-layers', 'scene-terminal']) {
  assert.ok(home.includes(kind), `Homepage missing bento illustration ${kind}`);
}

console.log('UI patterns: manager tabs, copy feedback, bento scenes, gallery images and lightbox verified.');

// Regression checks for the latest portfolio visual corrections.
const stylesheet = readFileSync('src/styles/global.css', 'utf8');
const bento = stylesheet.slice(stylesheet.lastIndexOf('/* Balanced bento:'));
assert.ok(bento.includes('grid-column: span 12'), 'Tooling card should occupy a full bento row');
assert.ok(!bento.includes('grid-row: span 2'), 'Bento should not vertically stretch the mobile card');
const galleryComponent = readFileSync('src/components/ProjectGallery.astro', 'utf8');
assert.ok(galleryComponent.includes('transform: translate(-50%, -50%)'), 'Lightbox must be centered in viewport');
assert.ok(galleryComponent.includes('data-gallery-caption'), 'Lightbox should not copy decorative arrow into caption');

const heroSource = readFileSync('src/styles/global.css', 'utf8');
assert.ok(heroSource.includes('/* Lucian #216-inspired'), 'Hero stagger must be present');
assert.ok(heroSource.includes('@keyframes hero-arrive'), 'Hero entrance keyframes missing');
assert.ok(heroSource.includes('prefers-reduced-motion: reduce'), 'Motion preference must be supported');
