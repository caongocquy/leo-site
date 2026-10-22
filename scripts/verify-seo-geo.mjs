import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import sharp from 'sharp';

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
    meta(html, 'og:image', host + '/og-image.jpg');
    meta(html, 'og:image:width', '1200');
    meta(html, 'og:image:height', '630');
    meta(html, 'twitter:card', 'summary_large_image');
    meta(html, 'twitter:image', host + '/og-image.jpg');
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

const social = 'dist/og-image.jpg';
const image = await sharp(social).metadata();
assert.equal(image.format, 'jpeg');
assert.equal(image.width, 1200);
assert.equal(image.height, 630);
assert.ok(statSync(social).size < 500_000, 'Share image should be lightweight');
console.log(`SEO/GEO: ${paths.length * 2} canonical routes, bilingual sitemap, JSON-LD, robots, llms.txt and 1200x630 social preview verified.`);
