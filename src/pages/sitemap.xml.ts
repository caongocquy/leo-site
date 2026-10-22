import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const escapeXml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Astro site must be configured to build the production sitemap.');
  const projects = await getCollection('projects');
  const paths = [
    '/',
    '/projects/',
    '/journey/',
    ...projects.map((project) => `/projects/${project.id}/`),
  ];

  const absolute = (path: string, lang: 'vi' | 'en') =>
    new URL(lang === 'en' ? `/en${path}` : path, site).toString();

  const entries = paths.flatMap((path) => (['vi', 'en'] as const).map((lang) => {
    const url = absolute(path, lang);
    const alternates = [
      ['vi', absolute(path, 'vi')],
      ['en', absolute(path, 'en')],
      ['x-default', absolute(path, 'vi')],
    ].map(([langCode, href]) =>
      `    <xhtml:link rel="alternate" hreflang="${langCode}" href="${escapeXml(href)}" />`
    ).join('\n');
    return `  <url>\n    <loc>${escapeXml(url)}</loc>\n${alternates}\n  </url>`;
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
