# Leo Site

Personal developer portfolio for [Leo](https://github.com/caongocquy): mobile engineering, open-source projects, and reusable libraries.

## Stack

- Astro + TypeScript (fully static output)
- Tailwind CSS v4 via Vite
- Lucide Astro icons (tree-shaken SVG; no client-side icon runtime)
- Markdown content collections for projects
- CSS-first responsive design, accessible Light / Dark theme (system default)
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
- Theme: pre-paint initialization in `BaseLayout.astro` and accessible animated day/night switch in `ThemeSwitch.astro` (system default until a manual preference is saved)

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
- Theme respects `prefers-color-scheme`, persists manual choice where storage is available, and tracks OS theme changes only while no manual preference is stored.

## Project terminal walkthroughs

Each project detail page includes a visual command walkthrough inspired by [Lucian #229](https://lucianlabs.dev/uxui-prompt/#229), adapted to the actual package commands. Edit `demoCommands` in each Markdown frontmatter to maintain the walkthrough. Commands are **not executed** by the portfolio. The terminal is progressive-enhanced: commands are visible with JavaScript disabled, and motion preferences are respected.

The interactive pattern is independently implemented with credit to the original [Lucian UX/UI Prompt project](https://github.com/Seokwoooo/lucian-uxui-prompt), licensed MIT © 2026 Seokwoooo.

## UX refinements

- Expertise uses a compact bento layout inspired by Lucian #214; graphic scenes are presentational, with a static layout and reduced-motion support.
- Project CLI demos combine Lucian #008 copy feedback and #272 package-manager tabs with the previous #229 walkthrough. Package manager choice is remembered locally. Global Yarn commands explicitly refer to **Yarn Classic (v1)**, not modern Yarn.
- Project galleries use native `<dialog>` lightboxes inspired by Lucian #061, only when public repository screenshots are present in optional `screenshots` frontmatter. Images are loaded from the original public repository; mobile component previews are not fabricated.
