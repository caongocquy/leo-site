import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const projects = ['code-atlas', 'showdar-router', 'showdar-skills', 'react-native-otp-input-kit', 'react-native-splash-view'];
const html = (path) => readFileSync(`dist/${path}`, 'utf8');

for (const [locale, prefix, nav, intro, journey] of [
  ['vi', '', 'Dự án', 'Xây dựng ứng dụng mobile.', 'Hành trình nghề nghiệp'],
  ['en', 'en/', 'Projects', 'Building mobile products.', 'Career journey'],
]) {
  const home = html(`${prefix}index.html`);
  assert.match(home, new RegExp(`<html[^>]+lang="${locale}"`), `${locale}: incorrect html lang`);
  assert.ok(home.includes(intro), `${locale}: missing localized hero`);
  assert.match(home, new RegExp(`data-nav-page="home"[^>]*>${locale === 'vi' ? 'Giới thiệu' : 'About Me'}<`), `${locale}: intro menu should follow locale`);
  assert.ok(home.includes('flag-uk-clip') && home.includes('class="flag-icon"'), `${locale}: missing SVG flags`);
  const vnIndex = home.indexOf('title="Tiếng Việt"');
  const enIndex = home.indexOf('title="English"');
  assert.ok(vnIndex >= 0 && enIndex > vnIndex, `${locale}: Vietnamese flag must come first`);
  assert.ok(home.includes(`href="/${prefix}journey/"`) && home.includes(journey), `${locale}: hero journey CTA missing`);
  assert.ok(home.includes(nav), `${locale}: missing translated nav`);
  assert.ok(home.includes('hero-title-break'), `${locale}: missing new hero design`);

  const list = html(`${prefix}projects/index.html`);
  assert.ok(list.includes(locale === 'vi' ? 'Công cụ AI' : 'DEVELOPER TOOLS'), `${locale}: project list untranslated`);

  for (const slug of projects) {
    const page = html(`${prefix}projects/${slug}/index.html`);
    assert.match(page, new RegExp(`<html[^>]+lang="${locale}"`));
    assert.ok(page.includes(locale === 'vi' ? 'ĐIỂM NỔI BẬT' : 'KEY HIGHLIGHTS'), `${locale} ${slug}: detail untranslated`);
    assert.ok(page.includes(locale === 'vi' ? 'Sao chép lệnh' : 'Copy commands'), `${locale} ${slug}: terminal untranslated`);
    assert.ok(page.includes(locale === 'vi' ? 'Vì sao mình xây dựng?' : 'Why I built it'), `${locale} ${slug}: article untranslated`);
  }
}
assert.ok(!existsSync('dist/vi/index.html'), 'Obsolete /vi routes should not be generated');
assert.ok(html('404.html').includes('Không tìm thấy trang'), 'Default 404 must be Vietnamese');
const english404 = (() => { try { return html('en/404/index.html'); } catch { return html('en/404.html'); } })();
assert.ok(english404.includes('Wrong turn'), 'English 404 route missing');

const source = readFileSync('src/i18n/translations.ts', 'utf8');
assert.ok(source.includes("path === '/en'"), 'English-only path prefix expected');
const layout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');
assert.ok(layout.includes('hreflang="x-default"') && layout.includes('localizedPath(Astro.url.pathname, "vi")'), 'x-default should be Vietnamese');
console.log('i18n: Vietnamese canonical root, English /en, two flag links and five bilingual projects verified.');
