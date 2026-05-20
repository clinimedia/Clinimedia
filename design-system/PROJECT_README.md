# CliniMedia Design System

A design system for **CliniMedia** — a fast-growing digital marketing agency that helps dental and medical clinics in the GTA (Greater Toronto Area) attract more patients and build standout brands.

## About the company

CliniMedia is a full-service, clinic-focused agency. Their pitch is simple: clinics are great at clinical work, not marketing — so CliniMedia handles the marketing end-to-end.

**Services they offer**
- **Content & Media Days** — a crew shows up at the clinic monthly to shoot photos and short-form video (team shots, office b-roll, seasonal themes) for social, ads, and the website.
- **Meta & Google Ads management** — campaign setup, creative, budget, performance tracking.
- **Website design & management** — modern, mobile, SEO-ready; they also handle ongoing maintenance and blog publishing.
- **Google Reviews & Business Profile** — drives 5-star reviews, AI-assisted responses, photo uploads, hours/info upkeep.
- **Email & SMS automations** — appointment reminders, confirmations, FAQ replies.
- **Centralized inbox + chatbot** — one dashboard for email, SMS, social DMs, web chat.

**Packages**: Silver (starter ad management) → Gold (adds social + media days) → Diamond (full-service growth).

**Office**: 980 Fraser Dr, Burlington, ON L7L 5P5 · +1 (289) 946-6865

## Sources used to build this system

- **Live website**: <https://clinimedia.ca/> — fetched homepage, `/services`, `/our-work`, and the public `/template/styleguide` page.
- **Webflow Styleguide page**: `https://clinimedia.ca/template/styleguide` — gave us the actual class/token system the marketing site uses (margin scale, button variants, text sizes, weight names, icon sizes, container sizes, color names).
- **Logo file**: provided by the user; archived at `assets/clinimedia-logo.png`. Icon-only and wordmark-only crops are derived: `assets/clinimedia-icon.png`, `assets/clinimedia-wordmark.png`.
- **No codebase or Figma file was provided.** All visuals here are inferred from the live site + logo. Please attach the original Figma or Webflow designer access if pixel-perfect parity is needed.

## Index

```
README.md                  ← you are here
SKILL.md                   ← agent skill manifest (Claude Code compatible)
colors_and_type.css        ← single source of truth for color + type tokens
assets/                    ← logos, icon crops, sample imagery
fonts/                     ← (none — Inter loads from Google Fonts; see CONTENT FUNDAMENTALS)
preview/                   ← design-system preview cards (one HTML file per token group)
ui_kits/
  marketing-site/          ← React/JSX recreation of the clinimedia.ca marketing site
    index.html             ← interactive multi-page click-thru
    Nav.jsx, Hero.jsx, ServiceCard.jsx, PricingCard.jsx, Footer.jsx, …
slides/                    ← (none — no slide template was provided)
```

---

## CONTENT FUNDAMENTALS

How CliniMedia talks. Drawn from real copy on clinimedia.ca.

### Voice
**Energetic, modern, challenger-agency** — confident but not corporate; warm but not cute. They lead with results ("attract more patients", "build a standout brand", "get the most out of every campaign") and keep sentences short.

### Tone
- **We-and-you, not "the user"**. The agency is "we"; the reader is "you" / "your clinic". Example: *"We help you streamline communication with both new and returning patients — without adding to your workload."*
- **Practical over poetic.** Sentences are concrete and action-oriented. Avoid abstract marketing jargon ("synergy", "leverage", "ecosystem").
- **Service-led.** Each offering opens with what they do, then who it's for.
- **Confident, not boastful.** They name the outcome (more bookings, better reputation, less workload) without superlatives.

### Casing
- **Headings**: sentence case for full sentences (`"What We Offer"` is the rare title-case exception). H1 / hero uses title case or sentence case interchangeably. Page titles are short: `Services`, `Our Work`, `Portfolio`, `Contact`.
- **Eyebrows / labels**: ALL CAPS, tracked, on package tiers (`SILVER`, `GOLD`, `DIAMOND`) and CTAs (`PORTAL LOGIN`).
- **CTAs**: usually sentence case (`Start today`, `Get Started Today`, `Contact`). Allow either; do not mix within a single section.

### Punctuation & rhythm
- **Em dashes for emphasis** — used liberally, often in place of a colon or parenthetical. (`"What We Offer – Our monthly in-person media days…"`)
- **Ampersands are fine** in service titles when they group two related things: *Email & SMS Automations*, *META and google Advertisement Management* (note: capitalization is inconsistent on the live site — standardize to `Meta & Google Ads Management`).
- **Sentence-ending periods**: yes, even in short callouts.

### What to avoid
- **Don't use emoji in body copy or headings.** Emoji do appear in the *footer* contact block (📍, 📞) as utilitarian icons, but never as decoration in marketing surfaces.
- **No exclamation points** in marketing copy. (None observed on the live site.)
- **Don't say "leverage", "solutions", "best-in-class", "industry-leading"** — generic SaaS language is off-brand.
- **Don't first-person-singular** ("I help clinics…"). It's always "we".

### Examples
- Hero pattern: `**Grow Your Clinic** – From media day content to targeted ad campaigns, we partner with dental and medical clinics to help them attract more patients and build a standout brand.`
- Service blurb pattern (one paragraph, opens with "We" or "Our"): `Our monthly Media Day service brings a professional team to your clinic to capture high-quality content — including team photos, office shots, and seasonal themes — tailored for use across your website, ads, and social media.`
- CTA: `Start today` · `Get Started Today` · `Reach out to learn more`

---

## VISUAL FOUNDATIONS

### Colors
Two-tone brand: **Slate** (deep blue-gray, from the logo wordmark + medical-cross icon) and **Sky** (soft cyan-blue, from the logo's accent ring and the "Media" lettering). White space is the third color and it's doing the heaviest lifting.

- **Slate-900 `#1F2A33`** — H1, hero text, footer ground
- **Slate-800 `#2A3743`** — logo wordmark color, body-strong
- **Sky-600 `#6BA3BB`** — primary accent, link color, active states
- **Sky-200 `#D9E8EF`** — soft tint for callouts and section breaks
- **White `#FFFFFF`** — dominant background

The Webflow styleguide labels the accent as **"green"** in their class names (`text-color-green`, `background-color-green`) but the rendered color is the soft sky-blue from the logo — we treat the class name as legacy and the actual hex as canonical.

### Typography
Single family: **Inter** (300, 400, 500, 600, 700, 800). Geometric, neutral, screens beautifully.
- **Display / H1**: Inter 700, tight tracking (-0.02em), tight leading (1.05). Big and confident.
- **Body**: Inter 400 / 16px / 1.65 leading.
- **Eyebrows**: Inter 600 / 12px / ALL CAPS / 0.14em tracking — used above section titles and on tier labels.
- **Mono** (rare): JetBrains Mono — only for code/data callouts in this system.

⚠️ **Font substitution flag**: I do not have access to the actual web font files CliniMedia ships. Inter is the closest match to the clean geometric sans visible on the site (and to the user's stated preference). If the live site uses a different family (e.g. Söhne, Geist, a Webflow default) please supply the font files and I'll swap them into `/fonts`.

### Spacing
Webflow's `margin-bottom-{N}` / `margin-top-{N}` system: 4 → 8 → 12 → 16 → 20 → 24 → 28 → 32 → 40 → 48 → 56 → 64 → 72 → 80 → 96 → 104 → 120 → 144 px. Sections breathe — expect 96–144px between major blocks on desktop.

### Containers
`container-small` (720), `container-medium` (960), `container-large` (1240), with `padding-global` of 24–48px depending on breakpoint.

### Backgrounds
- **Mostly white.** Sections alternate between pure white and a very light slate tint (`#F4F6F8`) for visual rhythm.
- **No gradients in the chrome.** The logo's mark contains a subtle slate→sky gradient sphere; this is the *only* place gradients appear in the system.
- **Imagery is full-bleed photo on hero / case-study sections** (clinic team shots, treatment-room interiors). Imagery skews **bright, warm-neutral, in-focus, well-lit** — clinical environments shot like premium lifestyle, not stock photography. No grain, no heavy filters.
- **No repeating patterns or hand-drawn illustrations.** This is a clean, photographic brand.

### Borders & corners
- **Border radius**: `12px` (cards, buttons), `20–28px` (large feature cards / image containers), `999px` (pills + small icon buttons).
- **Borders**: 1px hairlines in `--border-hairline (#E5E9ED)` for dividers; cards usually rely on shadow rather than borders.

### Shadows
- **Cards**: subtle, two-layer drop shadow — `0 8px 24px rgba(31,42,51,0.08), 0 2px 6px rgba(31,42,51,0.04)`.
- **Lifted CTAs**: same family, slightly larger.
- **Focus ring**: 6px sky-tinted halo (`rgba(143,188,208,0.18)`) on tab/keyboard focus — never inset, never colored stroke.
- **No inner shadows**, no neumorphic effects, no colored shadows.

### Animation
- **Style**: subtle, confident, never bouncy.
- **Timing**: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out) for most enter/exit; 240ms is the workhorse duration.
- **Word-by-word reveals on scroll** (the styleguide ships `is-word-1` … `is-word-12` utility classes for staggered word fades on hero text). Use this pattern for hero headlines.
- **Hover scale** on cards: 1.0 → 1.02, with shadow stepping up. ~240ms.
- **No springs, no bounces, no rotations.**

### Hover & press states
- **Buttons (primary, slate fill)**: hover lightens to slate-700; press shrinks to scale 0.98.
- **Buttons (secondary, sky outline)**: hover fills sky-200 background; press scale 0.98.
- **Links**: hover transitions color from sky-700 → slate-900 over 140ms.
- **Cards**: hover lifts shadow-md → shadow-lg, no color change.
- **No opacity-only hovers** as primary feedback (opacity dimming is reserved for disabled states).

### Transparency & blur
- **Sticky nav** uses `backdrop-filter: blur(16px)` over a `rgba(255,255,255,0.85)` plate when scrolled past the hero — clean, no heavy frost.
- **Modal scrim**: `rgba(31,42,51,0.45)` — dark slate, no blur.
- Otherwise solid surfaces — transparency is not a primary motif.

### Cards
Default card = white background, 12–20px radius, shadow-sm or shadow-md, 24–32px padding, no border. Pricing-tier cards add a tier label eyebrow (`SILVER` / `GOLD` / `DIAMOND`) and a checklist of features each preceded by a green tick (the legacy `greentick.png` from the live site).

### Layout rules
- **Generous whitespace** — sections target 96–120px vertical padding on desktop.
- **Max content width** 1240px for most marketing layouts.
- **Asymmetric two-column** on services (text + image), centered hero, three-up pricing grid.
- **Sticky top nav** that compresses on scroll (logo shrinks; padding tightens).

### Photography & imagery vibe
- **Warm, daylight-balanced**, mostly indoors-with-windows.
- **Real clinic teams** — not stock; faces visible, smiles natural, clinic colors visible (lots of mint/sage/white scrubs).
- **Composition**: subjects centered or rule-of-thirds; no Dutch angles, no extreme close-ups.
- **No grain, no heavy color grade, no duotones.** Slight contrast lift, that's it.

---

## ICONOGRAPHY

CliniMedia's site uses a **mixed bag** of iconography — there is no formal icon system codified on the site, so we standardize on one for this design system.

### What's on the live site
- **Custom medical-cross logomark** (the `+` inside concentric rings) — see `assets/clinimedia-icon.png`.
- **`greentick.png`** — a small green tick image used in pricing-tier feature lists. Inherited from the Webflow theme this site was built on; sourced from Webflow's CDN.
- **Emoji as utility icons** in the footer contact block (📍 location, 📞 phone). These are functional, not decorative.
- **Generic Webflow `webflow-icon.png`** placeholders shown in the styleguide at sizes 16/20/24/32/40/48/56 — these are template demo icons, not part of the real brand.
- **No SVG icon system, no icon font** is present in the marketing site.

### Our standardized recommendation
Adopt **Lucide** (`lucide.dev`) — a clean 1.5px stroke geometric set that pairs naturally with Inter and matches the clinical-but-modern feel. Use it across new surfaces (UI kit, slides, dashboards).

- Stroke width: **1.75px** (Lucide default)
- Color: inherits `currentColor` — typically `--fg-2` (slate-700)
- Sizes: 16 / 20 / 24 / 32 / 40 / 48 (matches the existing Webflow `icon-{N}` scale)
- CDN: `<script src="https://unpkg.com/lucide@latest"></script>` then `<i data-lucide="phone"></i>` after `lucide.createIcons()`.

⚠️ **Substitution flag**: Lucide is a substitution since the site has no formal icon system. If CliniMedia has a preferred icon library (Phosphor, Heroicons, custom set), please share and I'll swap.

### Logo usage
- **Primary**: full lockup (`assets/clinimedia-logo.png`) on white or cream backgrounds.
- **Compact**: icon-only (`assets/clinimedia-icon.png`) for square placements (favicon, social avatar, app icon).
- **Wordmark-only**: rare; only when the icon would be redundant (e.g. inside a header that already shows the brand mark).
- **Clear space**: minimum padding around the logo = the height of the cross-glyph in the icon. Don't crowd it.
- **Don't**: recolor the slate to anything other than slate-900; don't recolor the sky-blue ring; don't place on busy photographic backgrounds without a white plate behind it.

### Emoji policy
- **Allowed** in functional list items (footer contact) and in social/Instagram captions where emoji match platform norms.
- **Not allowed** in headings, body copy, buttons, or marketing decoration.
