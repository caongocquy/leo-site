import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';

// Production and branch previews must keep independent Wrangler environments.
const wrangler = JSON.parse(readFileSync('wrangler.jsonc', 'utf8'));
assert.equal(wrangler.name, 'leo-site');
assert.equal(wrangler.assets.directory, './dist');
assert.deepEqual(wrangler.previews, {}, 'Workers Builds runs "wrangler preview" for PRs; previews block is required');

const host = 'https://leo-site.quy-caongoc.workers.dev';
const read = (p) => readFileSync(p, 'utf8');
const slugs = readdirSync('src/content/projects').filter((p) => p.endsWith('.md')).map((p) => p.slice(0, -3));
const paths = ['/', '/projects/', '/journey/', ...slugs.map((slug) => `/projects/${slug}/`)];
const fileFor = (path) => path === '/' ? 'dist/index.html' : `dist${path}index.html`;
const originalPreview = readFileSync('public/social-preview.png');
const uploadedWidth = originalPreview.readUInt32BE(16);
const uploadedHeight = originalPreview.readUInt32BE(20);

function meta(html, key, value) {
  assert.ok(
    html.includes(`property="${key}" content="${value}"`) ||
    html.includes(`name="${key}" content="${value}"`),
    `Missing ${key}=${value}`
  );
}

for (const path of paths) {
  for (const lang of ['vi', 'en']) {
    const localized = lang === 'en' ? `/en${path}` : path;
    const canonical = host + localized;
    const html = read(fileFor(localized));
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`), `${localized}: canonical mismatch`);
    assert.ok(html.includes(`hreflang="vi" href="${host + path}"`), `${localized}: vi hreflang missing`);
    assert.ok(html.includes(`hreflang="en" href="${host + '/en' + path}"`), `${localized}: en hreflang missing`);
    assert.ok(html.includes(`hreflang="x-default" href="${host + path}"`), `${localized}: wrong x-default`);
    meta(html, 'og:url', canonical);
    meta(html, 'og:image', host + '/social-preview.png');
    meta(html, 'og:image:type', 'image/png');
    meta(html, 'og:image:width', String(uploadedWidth));
    meta(html, 'og:image:height', String(uploadedHeight));
    meta(html, 'twitter:card', 'summary_large_image');
    meta(html, 'twitter:image', host + '/social-preview.png');
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(match, `${localized}: JSON-LD missing`);
    const doc = JSON.parse(match[1]);
    assert.equal(doc['@context'], 'https://schema.org');
    const person = doc['@graph'].find((node) => node['@type'] === 'Person');
    const page = doc['@graph'].find((node) => node['@type'] === 'WebPage');
    assert.equal(person.name, 'Cao Ngoc Quy');
    assert.equal(person.worksFor.name, 'Galaxy Technology Services');
    assert.equal(page.url, canonical);
    assert.equal(page.inLanguage, lang === 'vi' ? 'vi-VN' : 'en-US');
    if (path.startsWith('/projects/') && slugs.some((slug) => path === `/projects/${slug}/`)) {
      const software = doc['@graph'].find((node) => node['@type'] === 'SoftwareSourceCode');
      assert.ok(software?.codeRepository.startsWith('https://github.com/'), `${localized}: missing project repository`);
    }
  }
}

// Homepage social snippets are authored in Leo's voice, not a third-person bio.
for (const [prefix, description] of [
  ['', 'Mình là Leo, một Mobile Engineer. Mình xây dựng ứng dụng mobile và các công cụ mã nguồn mở giúp developer hiểu và cải thiện code.'],
  ['en/', "I'm Leo, a Mobile Engineer. I build mobile apps and open-source tools that help developers understand and improve code."],
]) {
  const html = read(`dist/${prefix}index.html`);
  meta(html, 'og:description', description);
  meta(html, 'twitter:description', description);
  meta(html, 'description', description);
  assert.ok(html.includes('Leo — Mobile Engineer'), 'Portfolio share title must use the compact Leo identity');
  assert.ok(!html.includes('Leo là kỹ sư mobile'), 'Old third-person Vietnamese share copy must be removed');
  assert.ok(!html.includes('Leo is a mobile engineer building'), 'Old third-person English share copy must be removed');
}

// New logo vectors are owner-supplied. The previously approved OG image remains untouched.
for (const file of ['dist/favicon.svg', 'dist/brand/leo-icon.svg', 'dist/brand/leo-horizontal-on-dark.svg', 'dist/brand/leo-horizontal-on-light.svg']) {
  assert.ok(existsSync(file), `Missing Leo logo asset: ${file}`);
  assert.ok(read(file).includes('<svg'), `Malformed Leo logo SVG: ${file}`);
}
const sitemap = read('dist/sitemap.xml');
assert.ok(sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
assert.equal((sitemap.match(/<loc>/g) ?? []).length, paths.length * 2, 'Sitemap must include all bilingual public routes');
for (const path of paths) {
  for (const lang of ['vi', 'en']) {
    const absolute = host + (lang === 'en' ? `/en${path}` : path);
    assert.ok(sitemap.includes(`<loc>${absolute}</loc>`), `Sitemap missing ${absolute}`);
  }
}
assert.ok(sitemap.includes('hreflang="x-default"'), 'Sitemap needs default-language alternate');
assert.ok(!sitemap.includes('<loc>' + host + '/404'), 'Sitemap must not index 404 pages');

const robots = read('dist/robots.txt');
assert.ok(robots.includes(`Sitemap: ${host}/sitemap.xml`), 'Robots must advertise sitemap');
assert.ok(read('dist/llms.txt').includes('Galaxy Technology Services'), 'AI-readable index must identify current employer');

for (const missing of ['dist/404.html', 'dist/en/404/index.html', 'dist/en/404.html']) {
  try {
    const html = read(missing);
    assert.ok(html.includes('name="robots" content="noindex, follow"'), `${missing}: 404 must not be indexable`);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

const social = 'dist/social-preview.png';
assert.ok(existsSync('public/social-preview.png'), 'User-owned share preview must be present in public/');
const image = readFileSync(social);
assert.ok(image.equals(originalPreview), 'Build must copy the uploaded image unchanged, not replace it');
assert.ok(image.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), 'Share preview must be PNG');
assert.equal(image.toString('ascii', 12, 16), 'IHDR', 'PNG header must include IHDR');
assert.ok(uploadedWidth >= 600 && uploadedHeight >= 315, 'Share preview should be high resolution');
const aspectRatio = uploadedWidth / uploadedHeight;
assert.ok(aspectRatio >= 1.65 && aspectRatio <= 2.10, `Share preview aspect ratio out of range: ${aspectRatio.toFixed(3)}`);
console.log(`User-uploaded PNG: ${uploadedWidth}x${uploadedHeight}, aspect ${aspectRatio.toFixed(3)}`);
assert.ok(statSync(social).size < 3_000_000, 'Share preview should be under 3 MB');
assert.ok(!existsSync('scripts/generate-social-image.mjs'), 'Old generated artwork script must be removed');
console.log(`SEO/GEO: ${paths.length * 2} canonical routes, bilingual sitemap, JSON-LD, robots, llms.txt and user-uploaded PNG social preview verified.`);
