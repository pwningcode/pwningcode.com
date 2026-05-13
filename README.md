# pwningcode.com

Personal site / blog. Astro + static export, deployed to GitHub Pages on push to `main`.

## Local

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # serves the built site
```

## Writing notes

Drop a `.md` or `.mdx` file in `src/content/notes/`:

```yaml
---
title: 'note title'
description: 'one-line summary used for og / rss'
pubDate: 2026-05-11
draft: false
tags: ['claude', 'monitoring']
---
```

Set `draft: true` to keep it out of the index, sitemap, and RSS feed.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds on every push to `main` and publishes to GitHub Pages. Custom domain `pwningcode.com` is set via `public/CNAME`.

One-time setup in the repo settings:

1. **Settings → Pages → Source:** GitHub Actions.
2. **Settings → Pages → Custom domain:** `pwningcode.com` (and tick *Enforce HTTPS* once the cert provisions).
3. At the DNS provider, point `pwningcode.com` at GitHub Pages (`A` records to `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`, or a `CNAME` from `www` to `pwningcode.github.io`).
