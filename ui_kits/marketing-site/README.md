# CliniMedia · Marketing Site

This folder is the **deployable** CliniMedia marketing site. Static HTML, CSS, and vanilla JS — no framework, no build step.

## Files

| Path | Purpose |
|---|---|
| `index.html` | Home — hero video, real-media gallery, KPIs, pillars, h-scroll, team, dashboard, areas served, partners, testimonials, FAQs, CTA |
| `services.html` | Six service offerings + Silver/Gold/Diamond package tiers |
| `our-work.html` | Real social posts, Instagram reels, and ad creative |
| `portfolio.html` | Anonymised clinic case studies with metrics |
| `contact.html` | Contact form, office address, phone, email, hours |
| `blog.html` | Blog index (text-only) |
| `blog/*.html` | Individual blog posts (text-only, long-form) |
| `styles.css` | All site styles |
| `scripts.js` | Vanilla JS — reveal-on-scroll, count-up KPIs, FAQ accordion, h-scroll, custom cursor, mobile nav, hero parallax, footer wave |
| `sitemap.xml` | XML sitemap covering every route |
| `robots.txt` | Allow-list for major search engines + all AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, etc.) |
| `llms.txt` | Plain-text site summary for AI search engines |
| `vercel.json` | Vercel config — clean URLs, security headers, cache control |
| `assets/` | Logos, photos, videos (including real media scraped from clinimedia.ca) |

## Local preview

```powershell
python -m http.server 8000
# open http://localhost:8000
```

Or:

```powershell
npx serve .
```

## Deploy

See `../../DEPLOY.md` at the repo root.

## SEO / AEO notes

- Every page has a unique `<title>`, `<meta description>`, `<link rel="canonical">`, OG + Twitter tags, and per-route JSON-LD.
- Every page has a single `<h1>` (visible) plus an `sr-only` summary block aimed at AI search engines.
- Pages target distinct primary keywords to prevent SERP cannibalization:
  - `/` → "dental marketing agency GTA / Burlington"
  - `/services` → "dental marketing services / Google Ads / SEO / media days"
  - `/our-work` → "dental marketing content examples / Instagram reels"
  - `/portfolio` → "dental marketing case studies / results"
  - `/contact` → "contact / discovery call / Burlington office"
  - `/blog` and posts → long-tail informational queries
- `llms.txt` provides AI engines a curated overview, modeled on the emerging proposal.
- All major LLM crawlers are explicitly allowed in `robots.txt`.
