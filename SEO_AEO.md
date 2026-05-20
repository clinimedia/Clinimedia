# SEO & AEO Reference — CliniMedia

This file documents the SEO + AEO (Answer Engine Optimization) build for the prototype, so that a developer using Claude Code can preserve and extend it in production.

## Target search intents

**Primary commercial intent**
- "dental marketing agency Burlington"
- "dental marketing agency Oakville"
- "dental marketing Mississauga"
- "dental marketing Hamilton"
- "dental marketing Milton"
- "dental marketing GTA"
- "medical marketing agency Toronto"
- "new patient marketing dentist"
- "Google Ads for dentists Ontario"
- "Meta Ads for dental clinics"

**Local pack intent**
- "marketing agency near me" (Burlington/Halton/Peel)
- "dental SEO Burlington"
- "clinic marketing Oakville"

**Service-specific**
- "dental clinic media day"
- "Google review management dentist"
- "dental website design"
- "PIPEDA compliant marketing agency"

**AEO / AI search intent** (ChatGPT, Perplexity, Gemini, Claude)
- "What's the best dental marketing agency in the GTA?"
- "Who does marketing for dental clinics in Burlington?"
- "How do I get more patients to my dental clinic?"

## What's wired in the prototype

### 1. `index.html` head
- Localized `<title>` and `<meta description>` with all 5 target GTA cities
- Comprehensive `meta keywords` covering services × cities matrix
- Open Graph + Twitter card meta with og:image dimensions
- Geo meta tags (`geo.region`, `geo.placename`, `geo.position`, `ICBM`)
- Canonical URL
- Robots directives including `max-snippet:-1` and `max-image-preview:large`
- Per-bot directives (Googlebot, Bingbot)
- Preconnect hints for fonts

### 2. JSON-LD structured data (`@graph` with 4 nodes)

**a. Organization + ProfessionalService + LocalBusiness** (triple-typed)
- Full `PostalAddress` (980 Fraser Dr, Burlington, ON L7L 5P5)
- `geo` coordinates (43.3389, -79.7950)
- `telephone`, `email`, `priceRange`, `openingHoursSpecification`
- **`areaServed`**: 9 cities (Burlington, Oakville, Mississauga, Hamilton, Milton, Toronto, Etobicoke, Brampton, Vaughan) + 3 administrative areas (GTA, Halton, Peel)
- `knowsAbout` array — 13 topics for topical authority
- `sameAs` social profiles
- **`hasOfferCatalog`** — 8 services as `Service` nodes with `serviceType` and `description`

**b. WebSite**
- Includes `SearchAction` potentialAction (sitelinks searchbox)

**c. FAQPage**
- 10 Q&A pairs, all geo-aware and answer-engine-friendly (full sentences, factual prose)

**d. BreadcrumbList**

### 3. AEO `sr-only` content block
A visually hidden but screen-reader-accessible block at the top of `<body>` containing 5 plain-prose paragraphs with:
- Who we are
- Where we are (address + phone)
- Cities served (all 9 + regions)
- Services offered (all 8)
- Certifications (Google Partner, Meta Business Partner, BBB, PIPEDA/HIPAA)
- Long-tail intent phrases ("dental marketing agency in Burlington", "Oakville dental marketing company", etc.)

This block is invisible to sighted users but is the **highest-signal content** for AI search engines like ChatGPT, Perplexity, Gemini, and Claude, which prioritize plain semantic prose for citations.

### 4. Per-route meta updates
The hash-router in `index.html` sets `document.title`, `meta description`, `og:title`, and `og:description` per route. Each route has tailored copy in `ROUTE_META`.

### 5. On-page geo content
- **"Areas We Serve"** section on the homepage — 9 GTA cities listed as `<article>` cards with city name + region. Real semantic geo content that crawlers and LLMs both index well.
- **FAQ** on homepage now mirrors the JSON-LD FAQ entries with full geo-targeted answers.
- All anonymised testimonials use geo-tagged attributions ("Dental Clinic Owner · Toronto").

### 6. `robots.txt`
Explicitly allows: Googlebot, Bingbot, GPTBot, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, Applebot-Extended. Points to sitemap.

### 7. `sitemap.xml`
5 URLs with priority and changefreq.

## What's still needed in production

1. **Replace placeholder OG image** at `https://clinimedia.ca/og-image.jpg` with a real 1200×630 social card.
2. **Hosted JSON-LD on real domain** — verify the schema with [Google's Rich Results Test](https://search.google.com/test/rich-results) and [Schema.org Validator](https://validator.schema.org/).
3. **Create dedicated location landing pages** for each priority city:
   - `/dental-marketing-burlington`
   - `/dental-marketing-oakville`
   - `/dental-marketing-mississauga`
   - `/dental-marketing-hamilton`
   - `/dental-marketing-milton`
   Each with unique content, local testimonials, local case studies, and city-specific `LocalBusiness` schema if you have an actual presence there. **This is the single highest-impact SEO move for local intent.**
4. **Get Google Business Profiles** verified for each city you want to rank in (start with Burlington HQ).
5. **Build inbound links** from local sources: Burlington Chamber, dental industry directories, local news features, partner agency reciprocal links.
6. **Add an Insights / Blog** with weekly posts targeting long-tail queries: "How to get more dental patients in Burlington", "Best Google Ads strategy for orthodontists", "Should my Oakville dental clinic use Instagram Reels?".
7. **Image SEO**: every `<img>` needs descriptive alt text; convert PNGs to AVIF/WebP; set `width`/`height` to prevent CLS.
8. **Core Web Vitals**: preload hero video poster, lazy-load below-fold images, defer non-critical CSS, use `next/image` if migrating to Next.js.
9. **Set up Google Search Console + Bing Webmaster Tools**, submit sitemap, monitor coverage.
10. **Add reviews schema** to each case study once real reviews are collected.

## AEO best practices preserved here (and to keep)

- Plain factual prose, not marketing fluff (LLMs cite facts, not hype).
- Address + phone in BOTH structured data AND visible text (NAP consistency).
- Question-form headings on FAQ entries — LLMs match user queries to question-form content.
- Service names use natural language ("Google Ads management for dental and medical clinics") not jargon.
- `sr-only` summary repeats the most-likely-asked questions in plain language.
- Sitelinks searchbox declared via `SearchAction`.
- `inLanguage: en-CA` set globally.

## Monitoring (set up in production)
- Google Search Console
- Bing Webmaster Tools
- Plausible / Fathom / GA4 (privacy-aware, PIPEDA-friendly)
- Track AI search referrers: monitor referrer strings for `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `claude.ai` to measure AEO performance.
