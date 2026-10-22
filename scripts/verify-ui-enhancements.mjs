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



const headerSource = readFileSync('src/components/Header.astro', 'utf8');
const homeSource = readFileSync('src/components/HomePage.astro', 'utf8');
const tocSource = readFileSync('src/components/HomeSectionNavigator.astro', 'utf8');
assert.ok(stylesheet.includes('/* Sticky, always-visible navigation'), 'Sticky header CSS missing');
assert.ok(stylesheet.includes('.header-nav a[aria-current]::after'), 'Active page underline missing');
assert.ok(stylesheet.includes('/* Floating PDF-outline navigation'), 'Floating TOC styles missing');
assert.ok(stylesheet.includes('.home-toc:is(:hover, :focus-within)'), 'Desktop hover and keyboard expand missing');
assert.ok(stylesheet.includes('.home-toc-mobile[open] .home-toc-panel'), 'Mobile disclosure styles missing');
assert.ok(stylesheet.includes('.home-toc-desktop { display: none; }'), 'Desktop rail must not obscure small screens');
assert.ok(stylesheet.includes('max-width: 1279px'), 'Responsive TOC breakpoint missing');
assert.ok(stylesheet.includes('clamp(35px, 4vw, 49px)'), 'Larger home section headings missing');
assert.ok(!headerSource.includes('data-nav-target'), 'Page navigation must not track home sections');
assert.ok(headerSource.includes('data-nav-page="home"'), 'Global Home page link missing');
assert.ok(headerSource.includes('data-nav-page="journey"'), 'Global Journey page link missing');
assert.ok(headerSource.includes('data-nav-page="projects"'), 'Global Projects page link missing');
assert.ok(headerSource.includes("addEventListener('scroll', schedule, { passive: true })"), 'Header scroll effect should remain passive');
assert.ok(!headerSource.includes('is-header-hidden'), 'Sticky header must stay visible');
assert.ok(homeSource.includes('<HomeSectionNavigator />'), 'Home-only TOC missing');
assert.ok(homeSource.includes('id="about" class="hero'), 'Hero introduction anchor missing');
assert.ok(!homeSource.includes('class="about-section'), 'Duplicate About section must stay removed');
assert.ok(homeSource.includes('class="expertise-toolbox"'), 'Tech stack must stay under Expertise');
assert.ok(tocSource.includes("getActiveSection(sectionTops, offset)"), 'TOC scrollspy missing');
assert.ok(tocSource.includes("getDocumentProgress(window.scrollY"), 'Vertical progress missing');
assert.ok(tocSource.includes("addEventListener('scroll', schedule, { passive: true })"), 'TOC scroll events must be passive');
assert.ok(tocSource.includes('requestAnimationFrame(update)'), 'TOC scroll events must be throttled');
assert.ok(tocSource.includes("event.key === 'Escape'"), 'Mobile disclosure must close on Escape');
assert.ok(tocSource.includes('closest(\'a[data-toc-link]\')'), 'TOC must close after selecting anchor');

for (const prefix of ['', 'en/']) {
  const home = readFileSync(`dist/${prefix}index.html`, 'utf8');
  assert.ok(home.includes('data-home-toc'), `TOC missing from ${prefix}home`);
  const nav = home.match(/<nav[^>]*class="header-nav"[^>]*>(.*?)<\/nav>/s)?.[1];
  assert.ok(nav, `Global nav missing from ${prefix}home`);
  assert.equal((nav.match(/data-nav-page=/g) ?? []).length, 3, 'Global header should show exactly 3 page links');
  assert.match(nav, /data-nav-page="home"[^>]*aria-current="page"/, 'Home page must be active on Home');
  for (const id of ['about', 'expertise', 'experience', 'projects']) {
    assert.ok(home.includes(`id="${id}"`), `Missing anchor #${id}`);
    assert.ok(home.includes(`data-toc-link="${id}"`), `Missing TOC anchor #${id}`);
  }
  assert.equal((home.match(/data-toc-link=/g) ?? []).length, 8, 'Home should render 4 TOC items in each responsive view');
  assert.ok(home.includes('class="home-toc-desktop"'), 'Desktop must use an always-rendered TOC');
  assert.ok(home.includes('data-home-toc-mobile'), 'Mobile must use a native details control');
  assert.match(home, /<details class="home-toc-mobile" data-home-toc-mobile>/, 'Mobile TOC must start collapsed');
  assert.equal((home.match(/class="home-toc-links"/g) ?? []).length, 2, 'Desktop and mobile each need one TOC nav');
  assert.ok(home.includes('class="home-toc-toggle"'), 'Native mobile menu summary missing');
  assert.match(home, /data-toc-link="about"[^>]*aria-current="location"/, 'TOC should initially mark About');
  assert.ok(!nav.includes('href="#'), 'Global nav must not link to homepage sections');
}
for (const prefix of ['', 'en/']) {
  for (const pathname of ['journey/index.html', 'projects/index.html', 'projects/code-atlas/index.html']) {
    const page = readFileSync(`dist/${prefix}${pathname}`, 'utf8');
    assert.ok(page.includes('data-site-header'), `Header missing on ${prefix}${pathname}`);
    assert.ok(!page.includes('data-home-toc'), `TOC must not appear on ${prefix}${pathname}`);
    const current = pathname.startsWith('journey/') ? 'journey' : 'projects';
    assert.match(page, new RegExp(`data-nav-page="${current}"[^>]*aria-current="page"`), `Active page is wrong on ${prefix}${pathname}`);
  }
}
