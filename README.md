# Neuroplicity Static Archive (Nuxt Content + Netlify)

This repository scaffolds a static archive for the legacy WordPress site at `http://neuroplicity.com`, targeting deployment on Netlify and eventual domain migration to `https://neuroplicity.org`.

## What was crawled

Crawl snapshot date: **February 28, 2026**

Discovered primary information architecture:

- `/`
- `/researcher-profiles/`
- `/researcher-profiles/nicole-calakos/`
- `/researcher-profiles/cagla-eroglu/`
- `/researcher-profiles/nina-sherwood/`
- `/researcher-profiles/scott-soderling/`
- `/people-on-the-street/`
- `/understanding-neurons/`
- `/conducting-neuroscience-research/`
- `/daily-life-of-a-scientist/`
- `/about/`
- `/team/`

The source site intermittently returned WordPress database errors during crawl; `scripts/crawl-neuroplicity.sh` includes retries for that condition.

## Stack

- Nuxt 4
- Nuxt Content v3
- Nuxt UI
- Static generation (`nuxt generate`) for Netlify (`dist`)

## Run locally

```bash
pnpm install
pnpm dev
```

## Build static output

```bash
pnpm generate
```

Generated static files are written to `dist/` (Netlify publish directory).

## Refresh crawl cache

```bash
pnpm crawl:wp
```

Saved HTML snapshots are written to `.cache/wp/html`.

## Styling direction

The visual system is Flare-inspired (fonts, palette, hero treatment, high-contrast dark sections) with explicit attribution in the site footer per template license terms.
