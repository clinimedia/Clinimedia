# CLAUDE.md — Project context for Claude Code

You are working on **CliniMedia**, a digital marketing agency website for dental and medical clinics across the Greater Toronto Area.

## What this folder contains

This is a **design handoff package** containing a high-fidelity HTML/React prototype of the marketing site, plus brand tokens and assets. Your job is to recreate the prototype in a real codebase.

## Recommended stack (if none specified)
- **Next.js 14** (App Router)
- **Tailwind CSS** for styling (translate brand tokens from `colors_and_type.css` into `tailwind.config.ts`)
- **Framer Motion** for animations (replace the hand-rolled scroll observers + transforms)
- **next/image** for asset optimization
- **next/font** for Google Fonts (Bricolage Grotesque, Inter, JetBrains Mono)

## Brand tokens
The single source of truth is `colors_and_type.css`. The actually-used palette in the prototype is:
- **Primary**: Slate-900 (`#0E1418`)
- **Accent**: Sky-300 (`#B5D2E0`) — light blue derived from the logo
- **Background**: Cream (`#FBFAF6`)
- A `--lime` token exists but should be removed.

## Code style
- Match the existing prototype's component composition (Nav, Hero, KpiBand, Pillars, ImageShowcase, HScroll, Team, RealTime, Partners, Testimonials, FAQ, CtaStrip, Footer).
- Use semantic HTML (`<section>`, `<article>`, `<figure>`, `<nav>`, `<footer>`).
- Respect `prefers-reduced-motion: reduce` on every animation.
- Keep accessibility in mind — alt text on every image, aria-labels on icon-only buttons.

## Content rules
- No fabricated client names or clinic names. Testimonials and case studies use anonymised attributions like "Dental Clinic Owner · Toronto".
- The agency is based at **980 Fraser Dr, Burlington, ON L7L 5P5** · **+1 (289) 946-6865** · **info@clinimedia.ca**.
- Portal login link: `https://www.clinimediaportal.ca/login`.
- Pages: Home, Services, Our Work, Portfolio, Contact.

## SEO requirements
- All JSON-LD from the prototype's `index.html` must be preserved (Organization, ProfessionalService, FAQPage).
- Add per-route `<title>` and `<meta description>`.
- Generate OG images per route.
- Add `sitemap.xml` and `robots.txt`.

## Important: the prototype itself
The deployable site is at the repo root. Open `index.html` directly in a browser, or run `python -m http.server 8000` from the repo root, to preview locally. Use it as your reference for layout, animation timing, and behavior. Reference docs (brand voice, color tokens, preview cards) live in `design-system/`.
