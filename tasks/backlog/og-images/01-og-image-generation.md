# OG image generation: site default + per-note automation

## Goal

The site currently serves `/apple-touch-icon.png` (180×180) as its Open Graph image. Social platforms expect 1200×630 — the current image renders as a tiny crop or stretched mess on Bluesky, Mastodon, LinkedIn, and Slack unfurls.

Two deliverables:

1. **A static site-default OG image** at `/public/og-image.png` (1200×630). Used as the fallback when a page doesn't specify its own cover.
2. **Per-note OG image generation** at build time. Every published note gets a custom 1200×630 PNG with its title, optional stats/pull-quote, and the pwningcode brand mark.

Everything must run at build time — no runtime image generation, no external SaaS, no Cloudflare, no Google services. The site is a static Astro build deployed to GitHub Pages (see `.github/workflows/deploy.yml`).

## Process

**Present the full plan before making any file edits.** Wait for explicit approval before executing. This includes the dependency list, file structure, design decisions (typography, layout, color), and the migration path. The author prefers to review and adjust the plan before any code lands.

After the plan is approved, work in a single commit-able unit. No drive-by refactors of unrelated files. If something adjacent looks wrong, surface it in a "noticed but didn't touch" note at the end.

## Stack and conventions

- Astro 5 (`^5.0.0`), MDX, Tailwind v4
- Content collection at `src/content/notes/` with schema in `src/content/config.ts`
- `BaseLayout.astro` is in `src/layouts/` and already accepts an `ogImage: string` prop, which it threads into `og:image` and `twitter:image` meta tags
- Site brand mark: `public/PwningCodeWhite.svg` (the "circle face", viewBox `0 0 512 512`, single white fill)
- Theme color: `#0c0e0d` (dark-first, matches `theme-color` meta)
- Dark mode is the default; the OG image should always be dark, regardless of viewer's color scheme
- Sister site for style reference: `https://fvcsolutions.com/og-image.png` — same author, similar dark aesthetic, large wordmark with italic accents. The pwningcode OG should rhyme with that aesthetic but not copy it.

## Approach: Satori + resvg-js

Use [Satori](https://github.com/vercel/satori) to render JSX-like layouts to SVG, and [@resvg/resvg-js](https://github.com/yisibl/resvg-js) to rasterize SVG to PNG. Both are MIT-licensed, run in Node at build time, and have no SaaS or telemetry dependencies. This is the standard Astro pattern for static OG generation in 2025.

For fonts, use [Fontsource](https://fontsource.org/) (self-hosted npm packages). Do **not** fetch fonts from Google Fonts or any external CDN at build time — the author actively avoids Google. Suggested choices, but justify your pick in the plan:

- A clean sans for titles (Inter, Geist, or Manrope from Fontsource)
- A monospace or near-monospace for stat lines and the wordmark (JetBrains Mono, IBM Plex Mono, or Geist Mono from Fontsource)

Bundle the font files into the repo or load them from `node_modules` at build time. Either works; pick the one that's simpler to maintain.

## Astro integration pattern

Use Astro's static endpoint pattern for image generation. Two endpoints:

- `src/pages/og-image.png.ts` — emits the site-default 1200×630 PNG. No params.
- `src/pages/og/[...slug].png.ts` — emits one PNG per published note via `getStaticPaths()` iterating the `notes` collection (skip drafts).

Both endpoints `return new Response(pngBuffer, { headers: { 'Content-Type': 'image/png' } })`. At build time Astro writes them to `dist/og-image.png` and `dist/og/<slug>.png` respectively.

A shared helper (e.g. `src/lib/og.ts`) should hold the Satori rendering logic, font loading, and JSX templates so the two endpoints stay thin. Templates should be plain functions returning Satori-compatible JSX trees — no React runtime needed.

## Content schema extension

Add optional cover fields to the `notes` collection in `src/content/config.ts`:

```ts
cover: z
  .object({
    // Up to 4 short strings rendered as a stat block on the cover.
    // Use for posts where the proof is numeric.
    stats: z.array(z.string()).max(4).optional(),
    // A short pull-quote (under ~80 chars). Renders below the title.
    // Mutually exclusive with stats.
    pull: z.string().max(120).optional(),
    // Explicit override URL. If set, skip generation and use this path.
    image: z.string().optional(),
  })
  .optional(),
```

Resolution order in BaseLayout for note pages:

1. If `cover.image` is set, use it as-is.
2. Otherwise, use `/og/<slug>.png` (which the build will have generated).
3. Fall back to `/og-image.png` (site default).

Non-note pages (homepage, notes index, 404) use `/og-image.png`.

## Design spec — site default (`/og-image.png`)

- 1200×630 canvas, background `#0c0e0d`
- Subtle texture or grid optional (Tailwind/zinc style); keep it understated. If unsure, no texture.
- Left side: the circle face mark from `PwningCodeWhite.svg`, rendered at ~240×240, vertically centered, with ~80px left padding
- Right side: stacked text block
  - "**pwningcode**" wordmark — ~96px, white, bold sans
  - Tagline beneath — ~32px, off-white (zinc-300 equivalent, `#d4d4d8`), regular weight: "Notes from Jason Barnes."
  - One more line, ~24px, zinc-400 (`#a1a1aa`), light or italic: "Solo developer in Ohio, building DownBad and Foreman."
- Bottom-right corner: small `pwningcode.com` in monospace, ~20px, zinc-500 (`#71717a`)

Take inspiration from fvcsolutions.com's OG card — italic accent words, generous whitespace, dark monolithic background. Don't mimic it directly; pwningcode is the personal voice, fvcsolutions is the firm.

## Design spec — per-note (`/og/<slug>.png`)

- 1200×630 canvas, background `#0c0e0d`
- Top-left: small "**pwningcode** · notes" mark, ~24px monospace, zinc-400
- Center: post title, ~72px, white, bold sans, max 2 lines, ellipsis if longer
- Below title (if `cover.stats` is set): each stat on its own line in monospace, ~32px, zinc-200 (`#e4e4e7`). Render as a tight stack, not a row.
- Below title (if `cover.pull` is set instead): the pull text, ~36px, italic, zinc-300, with a small leading accent bar (4px wide, green `#10b981` to match `safari-pinned-tab.svg` color, ~60px tall)
- If neither `stats` nor `pull` is set: render the post's tags as small uppercase chips, ~20px monospace, zinc-500
- Bottom-right: the circle face mark at ~96×96, with `pwningcode.com` in monospace ~20px to the left of it

Typography rule of thumb: titles should *breathe*. Don't crowd the 1200×630. If the title is short (< 30 chars), let it sit larger. If long, drop one size and allow wrapping.

## BaseLayout updates

Currently `BaseLayout.astro` resolves `ogImageUrl` as:

```ts
const ogImageUrl = ogImage
  ? new URL(ogImage, site).href
  : new URL('/apple-touch-icon.png', site).href;
```

Update this to:

1. Change the fallback from `/apple-touch-icon.png` to `/og-image.png`.
2. Add `og:image:width` (1200) and `og:image:height` (630) meta tags — currently missing, but present on fvcsolutions.com and improves render reliability on LinkedIn/Slack.
3. Same width/height tags for `twitter:image:width` and `twitter:image:height` (Twitter respects these).

In `src/pages/notes/[...slug].astro` (the note detail page), pass `ogImage={cover?.image ?? \`/og/\${slug}.png\`}` to `BaseLayout` so per-note covers wire through automatically.

## First post to validate

The post `src/content/notes/vertical-slices-not-better-prompts.md` is the canary. Add this to its frontmatter once the schema and generator are in place:

```yaml
cover:
  stats:
    - "27 iterations"
    - "90 endpoints fixed"
    - "243 tests · 19 scenarios"
    - "~1hr on Opus 4.7, AFK"
```

Build the site and confirm `/og/vertical-slices-not-better-prompts.png` renders with those four stats stacked under the title, face in the bottom-right corner.

## Acceptance criteria

- [ ] `npm run build` succeeds with no new warnings
- [ ] `dist/og-image.png` exists, is 1200×630, valid PNG, under ~150KB
- [ ] `dist/og/vertical-slices-not-better-prompts.png` exists, is 1200×630, shows the title + 4 stats + face mark
- [ ] `BaseLayout.astro` references `/og-image.png` as fallback, not `/apple-touch-icon.png`
- [ ] `og:image:width`, `og:image:height`, `twitter:image:width`, `twitter:image:height` meta tags emit `1200` and `630`
- [ ] Note detail page passes the per-slug image to `BaseLayout`
- [ ] `src/content/config.ts` schema extended with the optional `cover` field as specified
- [ ] No Cloudflare, Google, Vercel-hosted, or other external SaaS dependencies added
- [ ] No new runtime dependencies in `package.json` — only `devDependencies` (Satori, resvg-js, Fontsource font(s))
- [ ] Test the site OG with a real unfurl: paste `https://pwningcode.com/` and `https://pwningcode.com/notes/vertical-slices-not-better-prompts/` into [opengraph.xyz](https://www.opengraph.xyz/) after deploy. Screenshot both and include in the PR description.

## Out of scope

- Don't generate OG images for the home page, 404, or notes index — they all use the site default
- Don't change the favicon, apple-touch-icon, or any existing images in `/public`
- Don't touch the RSS feed or sitemap config
- Don't add a CMS, admin UI, or any preview tool — frontmatter is the interface
- Don't add light-mode variants of the OG image. Social cards render on platform-controlled backgrounds; a single dark image is correct.
- Don't refactor unrelated layout or component files

## Notes for the author (Claude Code, surface these in your final report)

- If Satori's text wrapping is finicky, the workaround is to pre-compute line breaks in the helper. Don't fight the layout engine.
- If a note's title is too long to fit at 72px even after wrapping to 2 lines, drop to 56px rather than ellipsing — losing a word is worse than smaller type for a personal blog.
- The face SVG is a single white path. To render it on the dark OG canvas, inline the SVG (don't reference the file by URL — Satori needs the source).
- If you find any meta tags in `BaseLayout.astro` that look wrong or outdated while you're in there (the author noted the apple-touch-icon fallback was the most visible bug, but there may be others), list them at the end of your report. Don't fix them in this task — surface them for a follow-up.
