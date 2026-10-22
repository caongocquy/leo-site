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


## Scroll-aware sticky header

Inspired by [Lucian #212](https://lucianlabs.dev/uxui-prompt/#212). The header stays visible at the page top, hides after 24px of intentional downward scrolling, and returns after 12px of upward scrolling. It keeps a stable layout via `position: sticky` and a GPU-friendly transform; scroll events are passive and gated by `requestAnimationFrame`. Focus into any header control reveals the menu, while `prefers-reduced-motion` keeps it always visible without transition. JavaScript-disabled browsers get a standard sticky header.

## Scroll reveal for content blocks

Home, Projects, Project Detail and Journey use one progressive-enhancement component (`src/components/ScrollReveal.astro`) inspired by the existing Lucian #216 hero entrance.

- Static HTML stays **fully readable without JavaScript**. Only elements that start below the visible viewport receive an ephemeral, JavaScript-managed opacity class.
- The native `IntersectionObserver` reveals each marked block once when it nears the viewport. Subtle 20px upward movement and 620ms fade, with bounded 75ms staggering within card grids.
- Animates `translate` rather than `transform` so existing card hover transforms, timeline scrollspy, modal transforms, and sticky navigation are not overridden.
- Keyboard focus reveals pending interactive blocks. Motion preference and print always show all content. No ongoing scroll handler, heavy animation library, or recurring animation.
- Extend coverage by adding `data-scroll-reveal` to a content block; do not add it to the fixed header, modal dialog or nested containers that would duplicate animations.
- Run `node scripts/verify-scroll-reveal.mjs` after `npm run build`.

## Production SEO, GEO and social previews

The canonical deployment origin is `https://leo-site.quy-caongoc.workers.dev` in `astro.config.mjs`. Change it everywhere (site config, `public/robots.txt`, `public/llms.txt`, social preview metadata, and tests) when using a custom domain; do not point canonicals at two different hosts.

- `src/pages/sitemap.xml.ts` builds `/sitemap.xml` from published project content, with Vietnamese, English and x-default hreflang alternates. Public routes only; 404s are not listed.
- `public/robots.txt` allows crawl and references the sitemap. The Vietnamese home is the default locale at `/`; English is under `/en/`.
- `BaseLayout.astro` emits per-route canonical, Open Graph title/description/URL, absolute PNG share image and dimensions, Twitter summary large image card, and JSON-LD for `WebSite`, `Person`, `WebPage`, `BreadcrumbList`. Project pages add `SoftwareSourceCode` referencing the public source repository. Employment at Galaxy is marked current; client assignments remain separate.
- The share card uses the **user-uploaded** `public/social-preview.png`, copied unchanged by Astro into `dist/social-preview.png`. The source image is **1731×909 PNG** and OG metadata reads its actual dimensions. No build-time image generation, placeholder artwork or extra Sharp dependency.
- `public/llms.txt` is an optional human/agent-readable navigation summary. Google Search says it does **not** use llms.txt for ranking or AI search inclusion: see https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Both 404 pages use `noindex, follow`. No unsupported ratings, metrics, testimonials or employer claims are included in structured data.
- Verify with `npm run build && node scripts/verify-seo-geo.mjs`; GitHub Actions runs this check for every PR.
- After merging, verify `/sitemap.xml`, `/robots.txt`, `/llms.txt`, and `/social-preview.png` on Cloudflare, then use Google Search Console and the LinkedIn Post Inspector to request a fresh crawl. Indexing and link previews are controlled by external crawlers and may be cached.

## Home information hierarchy and persistent navigation

The Hero at `/#about` is the only About/introduction content; there is no repeated About section below projects. The existing stack tags stay in a compact toolbox beneath Expertise. The original `#about` link continues to work.

The sticky header remains visible while scrolling and only highlights the current **page** (Home, Journey, Projects). The four Home sections are separately tracked in the floating table of contents. Section headings are slightly larger at desktop and mobile sizes.

## Home floating table of contents

The sticky header now has **three page-level destinations**: Home, Journey, and Projects. Only the URL controls its `aria-current="page"` indicator. Home-only section links are instead presented through `HomeSectionNavigator.astro` (About/Hero, Expertise, Experience, Selected Work).

At desktop widths (1440px+), the compact **right-side vertical outline** is top-aligned just below the sticky header, fitting into the right-side gutter without sitting across the Hero artwork. It always shows the active section name above its progress rail. It expands into a PDF-style outline on hover or keyboard focus; anchors support native hash navigation. The tracker uses passive scroll listeners, `requestAnimationFrame`, and a header-aware selection probe. At narrower widths, the rail becomes a native `<details>` disclosure button near the bottom right; click-outside, link selection, and Escape dismiss the panel. Native `<details>` and anchors work without JavaScript. Reduced-motion preferences disable rail animation and smooth scroll.

Run `npm run build && node scripts/verify-ui-enhancements.mjs && node scripts/verify-home-toc.mjs` for bilingual markup and behavior-helper checks. The TOC is intentionally absent from Journey, Projects and project detail pages.

## iPhone layout and mobile navigation refinement

The Journey timeline uses `minmax(0,1fr)` for its single-column mobile grid, explicit min-size boundaries on nested cards, word wrapping for long content and an independently horizontally scrollable career-year chip strip. This avoids the page-level horizontal overflow seen in iPhone Safari.

At <=830px, the sticky header becomes a balanced utility row (brand, locale/theme/GitHub) plus a three-column segmented page navigation (Home/Journey/Projects). The active page is a filled surface instead of a thin underline. At <=420px the brand tagline is hidden so controls keep their touch targets without forcing sideways scrolling. Desktop navigation is unchanged. Verify the page at 320, 375, 390, 430 and 768 CSS px in both languages; test iOS Safari separately from Chromium.
