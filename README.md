# Leo Site

Personal developer portfolio for [Leo](https://github.com/caongocquy): mobile engineering, open-source projects, and reusable libraries.

## Stack

- Astro + TypeScript (fully static output)
- Tailwind CSS v4 via Vite
- Markdown content collections for projects
- CSS-first responsive design, accessible Light / Dark / System theme
- Cloudflare Workers Static Assets (no backend, no SSR adapter)

## Local development

Requires Node.js 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Astro.

```bash
npm run build
npm run preview
```

## Content

Edit `src/content/projects/*.md` to update project information or add a new project. The frontmatter is validated in `src/content.config.ts`. Project pages are generated statically at `/projects/<file-name>/`.

- Site copy and links: `src/data/site.ts`
- Colors and responsive layout: `src/styles/global.css`
- Shared page layout: `src/layouts/BaseLayout.astro`
- Theme: pre-paint initialization in `BaseLayout.astro`, accessible dropdown behavior in `Header.astro`

All published links correspond to public project pages or published package pages. Do not add private client details, unsupported experience claims, or fabricated metrics.

## Cloudflare Workers setup

The static site requires **no Cloudflare adapter** and no server code.

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/), then **Workers & Pages → Create application → Import a repository**.
2. Connect GitHub `caongocquy/leo-site`, choose `main` as production branch.
3. Build command: `npm run build`.
4. Deploy command: `npx wrangler deploy` (or `npm run deploy` if build is not run separately).
5. Configure Node.js **22** if the build environment uses an older runtime.
6. Deploy. The resulting URL is a `*.workers.dev` address unless you set a custom domain.

The repository includes `wrangler.jsonc` for Workers Static Assets. `npm run deploy` can deploy directly from a locally authenticated Wrangler CLI.

### After choosing a domain

Add your final site URL to the `site` property in `astro.config.mjs` so canonical links can be generated. Consider adding a sitemap and Open Graph raster preview when you have a stable public URL.

## Notes

- This is a portfolio, not an application backend. No authentication, database, tracking, or API keys are required.
- Prefer optimized screenshots with meaningful alt text when adding project visuals.
- Theme respects `prefers-color-scheme`, persists manual choice where storage is available, and updates when OS theme changes in System mode.
