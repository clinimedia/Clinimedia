# CliniMedia — Marketing Site + Design System

> Marketing site for CliniMedia, a digital marketing agency for dental & medical clinics across the GTA. Production-ready static site, deployable to Vercel.

## What's in this repo

```
clinimedia/
├── README.md                       ← you are here
├── DEPLOY.md                       ← step-by-step Vercel deployment
├── PROJECT_README.md               ← design system context (brand voice, colors, type)
├── SEO_AEO.md                      ← SEO + AEO strategy notes
├── CLAUDE.md                       ← project context for Claude Code
├── colors_and_type.css             ← canonical brand tokens (reference)
├── assets/                         ← top-level brand assets (logo, icon)
├── preview/                        ← design-system swatch cards (reference)
└── ui_kits/
    └── marketing-site/             ← THE DEPLOYABLE SITE (Vercel root)
        ├── index.html              ← Home (hero video + real media gallery)
        ├── services.html           ← Services + Silver/Gold/Diamond packages
        ├── our-work.html           ← Real social posts, reels, ad creative
        ├── portfolio.html          ← Anonymised clinic case studies
        ├── contact.html            ← Contact form + office details
        ├── blog.html               ← Blog index (text-only)
        ├── blog/                   ← Individual posts (text-only)
        ├── assets/                 ← Logos, photos, videos (incl. scraped from clinimedia.ca)
        ├── styles.css              ← All styles
        ├── scripts.js              ← Vanilla JS for animations + interactivity
        ├── sitemap.xml             ← XML sitemap covering all routes
        ├── robots.txt              ← Allow-list incl. GPTBot, ClaudeBot, PerplexityBot, etc.
        ├── llms.txt                ← Plain-text summary for AI search engines
        └── vercel.json             ← Clean URLs, security headers, cache control
```

## Architecture

Pure static HTML + CSS + vanilla JS. **No framework, no build step.** Picked for three reasons:

1. **SEO** — every route is its own crawlable HTML file with unique title, description, canonical, OG tags, and per-route JSON-LD. Google sees full content immediately.
2. **AEO** (AI engine optimization) — ChatGPT, Claude, Perplexity, Gemini, and other AI search engines read static HTML cleanly. JS-rendered SPAs are largely invisible to them. Every page also ships an `sr-only` summary specifically formatted for AI ingestion.
3. **Vercel zero-config** — point Vercel at `ui_kits/marketing-site/`, hit deploy, done.

See `DEPLOY.md` for step-by-step Vercel setup.

## Local preview

```powershell
cd ui_kits/marketing-site
python -m http.server 8000
# open http://localhost:8000
```

## Fidelity
**High-fidelity.** Colors, type, spacing, components, animations, and copy are intended to be reproduced as-is. The brand palette and type scale come from the live `clinimedia.ca` site and the logo file.

## Brand Tokens (canonical)

### Colors
```
Slate (text / dark surfaces)
  --slate-900: #0E1418
  --slate-800: #1B2329
  --slate-700: #2F3A45
  --slate-600: #4B5763
  --slate-500: #6B7681
  --slate-300: #C9D2D8
  --slate-100: #EEF1F3
  --slate-50:  #F6F7F8

Sky (accent — derived from logo cross)
  --sky-700:   #5A8AA0
  --sky-600:   #7AA9C0
  --sky-400:   #95C1D4
  --sky-300:   #B5D2E0   ← primary accent in current build
  --sky-100:   #E5EFF4

Neutrals
  --bg:        #FBFAF6   (page background)
  --cream:     #FBFAF6
  --white:     #FFFFFF

Semantic
  --success:   #2A8E5C
  --warning:   #D9A23F
  --danger:    #C0463D
```

A `--lime` token exists in source but is intentionally unused — production should remove it.

### Typography
- **Display**: `Bricolage Grotesque` (Google Fonts, 400/500/700/800) — italic 500 for highlighted word
- **Body / UI**: `Inter` (Google Fonts, 400/500/600)
- **Mono / labels**: `JetBrains Mono` (Google Fonts, 400/500) — uppercase with 0.18em tracking

### Type scale
```
Display XL: clamp(5rem, 18vw, 18rem)   — hero wordmark
Display L:  clamp(4rem, 12vw, 11rem)   — footer big text
H1:         clamp(3rem, 7vw, 6rem)
H2:         clamp(2.25rem, 4.5vw, 4rem)
H3:         clamp(1.5rem, 2.5vw, 2.25rem)
Body L:     17px / 1.55
Body:       15px / 1.55
Small:      13px / 1.5
Mono label: 11px · 0.18em tracking · uppercase
```

### Spacing & shape
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px
- Radii: 8 / 16 / 24 / 32 / pill (999)
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-expo)

## Pages

### Home
1. Custom dot cursor (desktop) — expands on interactive hover
2. Floating pill nav with glass blur
3. **Hero** — full-bleed background video (loops, muted) + layered scrim (gradient + radial vignette + SVG film grain). Foreground: sky-blue ticker pill, two-line wordmark (`CLINI` + italic sky-blue `MEDIA.`) with cursor-aware letter parallax, lede paragraph, sky-blue CTA + ghost-light "See our work" button, scroll cue
4. Dual marquee (slate row + sky row, counter-scrolling)
5. **Live KPI counters** — 4 stats count up on intersect
6. **Pillars** — 4 cards, slate fill rises from bottom on hover
7. **Image Showcase** — two real photos side-by-side with parallax + glass captions ("Real shoots. Real clinics. Real growth.")
8. **Pinned horizontal scroller** — 5 service cards translate horizontally as user scrolls vertically
9. **Team Ken-Burns block** — real team photo with subtle zoom
10. **Real-time dashboard mockup** — animated bars mutate every 1.5s, live pulse pill
11. **Our Partners** — marquee of real PNG logos (Google Partner, Meta, GMB, Instagram, BBB, HIPAA), greyscale → color on hover, tooltips
12. **Testimonials** — 3 anonymised quotes (no names — generic "Dental Clinic Owner · Toronto" attribution)
13. FAQ accordion
14. Lime CTA strip (will become sky in next pass)
15. Footer with letter-wave reveal + outlined "CLINIMEDIA" wordmark

### Services
6 services in a list layout with hover-fill rows, then 3-tier pricing (Silver / Gold / Diamond).

### Our Work
Social-post grid (4-up) + reels grid (3-up) + ad-video grid (3-up). **Reel videos are placeholder gradients** — real clinic videos need to be sourced (see "Outstanding work").

### Portfolio
Case-study grid (anonymised — "Family Dental Practice · Toronto" etc.).

### Contact
Two-column. Contact info + dark contact form (success state).

## Animations & interactions
- Hero cursor parallax on letters (~6–10px max)
- Letter wave reveal (each letter translates up + fades in, 50ms stagger)
- IntersectionObserver-driven `.is-in` class for reveal/stagger
- KPI counters use `requestAnimationFrame`
- Pinned horizontal scroll = `position: sticky` + `transform: translateX()` driven by scroll progress
- Marquees = pure CSS keyframes
- Dashboard bars use `setInterval(1500ms)` + CSS height transition
- **All animations respect `prefers-reduced-motion: reduce`**

## SEO + AEO
`index.html` includes:
- `<title>`, `<meta description>`, canonical, robots
- Open Graph + Twitter card meta
- **JSON-LD** (`@graph`): `Organization`, `ProfessionalService`, `FAQPage`
- Per-route `document.title` updates on hash change

**Still needed in production**:
- `og:image` (1200×630) — design + commit
- `sitemap.xml` and `robots.txt`
- Per-page meta (currently shared)
- HTTPS canonicals (when on real domain)
- `BreadcrumbList` + `WebSite` schema
- Real address phone in JSON-LD verified

## Assets (all scraped locally — no CDN dependencies)
Located in `ui_kits/marketing-site/assets/`:
- `hero-bg-video.mp4` (5 MB) — hero looping video
- `hero-poster.avif` — video poster
- `team-photo.png` — team / behind-the-scenes shot
- `dashboard-screenshot.png` — analytics dashboard screenshot
- `partner-google.png` · `partner-meta.png` · `partner-gmb.png` · `partner-instagram.png` · `partner-bbb.webp` · `partner-hipaa.png` — partner logos
- Various SVG icons from the Webflow source

Top-level `/assets/` contains:
- `clinimedia-logo.png` — primary logo
- `clinimedia-icon.png` — cross icon, cropped
- `clinimedia-wordmark.png` — wordmark only

## Outstanding work (for Claude Code session)

### Must-do
1. **Source real Our Work reel videos** — clinimedia.ca/our-work was unreachable during scrape. Pull `.mp4` URLs from the live site source or replace with new client videos.
2. **Replace lime accents fully** — most done (32 swaps complete). Audit the prototype for any remaining `--lime` references and remove the token.
3. **Production fonts** — currently Google Fonts; consider self-hosting + `font-display: swap`.
4. **Optimize hero video** — re-encode as AV1 + WebM + MP4 fallback for bandwidth; under 3MB target.

### Should-do
5. **Per-page meta + OG images** — generate unique OG cards per route.
6. **Sitemap + robots.txt**.
7. **Cookie banner** — PIPEDA compliance for Canadian visitors.
8. **Wire contact form** to a real backend (HubSpot Forms / Resend / Formspree).
9. **Lighthouse pass** — preload hero poster, lazy-load below-fold images, defer non-critical CSS.

### Nice-to-have
10. **Real testimonials with consent** — when clinic owners are willing to be quoted, swap the anonymised attributions back to names.
11. **Add a blog/insights page** — useful for SEO compound.
12. **Replace dashboard mockup** with embedded live dashboard or animated illustration.

## Quick-start for Claude Code

When you start your Claude Code session, paste this prompt:

```
Read the README.md in this folder. Then read PROJECT_README.md and skim every file
under ui_kits/marketing-site/. The HTML is a high-fidelity prototype — your job is
to recreate it in [target stack: e.g. Next.js 14 + Tailwind + Framer Motion],
preserving all design tokens, animations, and content exactly. Set up the project
structure first, then implement one section at a time starting with the hero.
Use the scraped assets from ui_kits/marketing-site/assets/ as-is.
```
