import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const projects = ['code-atlas', 'showdar-router', 'showdar-skills', 'react-native-otp-input-kit', 'react-native-splash-view'];
const html = (path) => readFileSync(`dist/${path}`, 'utf8');

for (const [locale, prefix, nav, intro] of [
  ['en', '', 'Projects', 'Engineering'],
  ['vi', 'vi/', 'Dự án', 'Kiến tạo'],
]) {
  const home = html(`${prefix}index.html`);
  assert.match(home, new RegExp(`<html[^>]+lang="${locale}"`), `${locale}: incorrect html lang`);
  assert.ok(home.includes(intro), `${locale}: missing localized hero`);
  assert.ok(home.includes('flag-uk-clip') && home.includes('class="flag-icon"'), `${locale}: missing inline SVG flags`);
  assert.ok(home.includes('title="Tiếng Việt"') && home.includes('title="English"'), `${locale}: missing flag switcher links`);
  assert.ok(home.includes(nav), `${locale}: missing translated navigation`);

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
const vietnamese404 = (() => { try { return html('vi/404/index.html'); } catch { return html('vi/404.html'); } })();
assert.ok(vietnamese404.includes('Không tìm thấy trang'), 'Vietnamese 404 missing');
console.log('i18n: 2 locales × homepage, project list and all 5 details verified.');
