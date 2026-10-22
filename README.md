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

Requires Node.js 24 recommended (Astro requires Node.js 22.23.4 or later).

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

## English / Vietnamese

**Vietnamese is the default language** and uses clean, unprefixed URLs: `/`, `/projects/`, `/journey/`, `/projects/<id>/`. English uses `/en/`, `/en/projects/`, `/en/journey/` and `/en/projects/<id>/`. The language switch shows the Vietnamese SVG flag **first** (left) and the UK SVG flag second (right), preserving the current page. No client-side translation library, browser-language redirect or tracking cookie is needed.

- English UI and Vietnamese UI: `src/i18n/translations.ts`
- Original English project articles: `src/content/projects/*.md`
- Vietnamese project summaries, highlights and article sections: `src/i18n/translations.ts`
- Changes to project claims should be reflected in both locales.

## Promotional artwork

The `screenshots` content field optionally supports `kind: concept` and translated labels (`altVi`, `captionVi`). Any Upwork promotional mockup **must** have `kind: concept`, never be represented as an actual in-app screenshot. Place files under `public/images/`, serve locally and prefer compressed WebP over the original large PNGs.

## Career Journey (/journey)

Two static pages: `/journey/` (Vietnamese default) and `/en/journey/` (English), with links in header, footer, and homepage Experience. Inspired by Lucian UX/UI Prompt #370: the progression line lights up while scrolling, with progressive enhancement and `prefers-reduced-motion` support.

Career entries are edited at `src/data/journey.ts`, paired EN/VI:
- MGI Global (Jun 2019–Dec 2021), 45CM VINA (Jan 2022–Feb 2023), 1988s Media and Technology (Mar 2023–Aug 2024), Galaxy Technology Services (**Feb 2025–Present, currently employed**), reflecting the confirmed career status.
- DI HDBank (Feb–Jun 2025), VietJet Air (Jun–Nov 2025), and HDBank (Nov 2025–Jul 2026) are **client assignments nested under Galaxy**, never misrepresented as direct employers.
- Open-source work in 2026 is a separate milestone running **alongside ongoing employment at Galaxy**, not a career transition; it links to project pages.

Verify any future employment or client-date changes against the CV before updating public entries.

## Toolchain

GitHub Actions and `.node-version` use Node.js 24; Astro 7.4+ requires at least 22.23.4. Run `npm install` and `npm run build` with a supported Node version.

## Hero and Journey UI patterns

- Lucian #216 inspired hero entrance uses **CSS-only staggered presentation**, not hidden content contingent on JavaScript. It is disabled for `prefers-reduced-motion: reduce`.
- Hero headline communicates both production mobile engineering and open-source developer tools. Actions lead to selected projects and Career Journey.
- Lucian #275 inspired Journey scrollspy uses plain, accessible milestone links that work without JavaScript; scroll position adds `aria-current="location"` when supported. On mobile the milestones become a horizontally scrollable rail.
- Public site default is Vietnamese; English is under `/en/`. When assigning a real site origin in `astro.config.mjs`, the layout emits localized canonical/alternate URLs and `x-default` points to Vietnamese.
