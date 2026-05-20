# Deploying CliniMedia to Vercel

The deployable site lives in `ui_kits/marketing-site/`. The rest of this repo (root `assets/`, `colors_and_type.css`, `preview/`, `PROJECT_README.md`, `SEO_AEO.md`) is the **design system handoff package** — reference material, not part of the live site.

## GitHub repo

This codebase pushes to: **https://github.com/AhmadHamadi/Clinimedia**

## One-time Vercel setup

1. In the Vercel dashboard, **Add New → Project** and select the `AhmadHamadi/Clinimedia` GitHub repo (authorize GitHub if prompted).
2. In **Configure Project** → **Root Directory**, click **Edit** and set it to:
   ```
   ui_kits/marketing-site
   ```
3. **Framework Preset:** `Other` (plain static HTML — no framework build step).
4. **Build Command:** leave empty. Vercel will detect `package.json` and run `npm install` for the serverless function automatically; no build is needed for the static pages.
5. **Output Directory:** leave empty (the Root Directory IS the output for static files).
6. **Install Command:** leave empty (default is `npm install`).
7. **Node.js version:** `20.x` (set in `package.json` engines).

## Environment variables (REQUIRED for the contact form)

Set these in **Vercel → Project → Settings → Environment Variables** (mark them **Sensitive** and apply to **Production + Preview**, NOT Development):

| Name | Required | Example | Notes |
|---|---|---|---|
| `SMTP_HOST` | ✅ | `smtp.zoho.com` / `smtp.gmail.com` / `smtp.office365.com` | The SMTP server |
| `SMTP_PORT` | ✅ | `587` or `465` | 587 = STARTTLS (recommended); 465 = SSL |
| `SMTP_USER` | ✅ | `info@clinimedia.ca` | The mailbox login |
| `SMTP_PASS` | ✅ | `***` | SMTP password or app password (NOT your account password if 2FA is on) |
| `CONTACT_TO` | optional | `info@clinimedia.ca` | Destination address. Defaults to `info@clinimedia.ca`. |
| `CONTACT_FROM` | optional | `noreply@clinimedia.ca` | From-address. Defaults to `SMTP_USER`. |
| `CONTACT_REPLY_TO` | optional | — | Defaults to the submitter's email (so you can hit "Reply" and respond directly). |

After adding env vars, **redeploy** the latest commit so the function picks them up (Vercel doesn't hot-reload env vars).

## Verify after deploy

1. **Pages load:** open `/`, `/services`, `/our-work`, `/portfolio`, `/contact`, `/blog`, and one blog post. All 200, clean URLs work.
2. **Hero video plays:** the homepage `/` shows the looping background video.
3. **Reels + ads play:** `/our-work` autoplays the 3 reels and 3 ads.
4. **Canva embed loads:** `/portfolio` shows the embedded Canva deck.
5. **Sitemap loads:** `/sitemap.xml`.
6. **Robots loads:** `/robots.txt`.
7. **LLMs descriptor loads:** `/llms.txt`.
8. **Contact form sends:** fill the form on `/contact` and submit. You should see "Got it." and receive an email at `info@clinimedia.ca` within 30 seconds.
9. **Test the structured data** at https://search.google.com/test/rich-results — paste each deployed URL.
10. **Submit the sitemap to Google Search Console** at https://search.google.com/search-console.

## Best-practice notes (already baked in)

- **`cleanUrls: true`** in `vercel.json` — `/services.html` automatically redirects to `/services`.
- **Security headers:** HSTS, X-Content-Type-Options, X-Frame-Options, Permissions-Policy, Referrer-Policy, and a Content-Security-Policy that allows the Canva embed.
- **Long-cache for assets:** images and videos in `/assets/` get `Cache-Control: public, max-age=31536000, immutable`.
- **CSS/JS cache:** `max-age=3600, must-revalidate` — short, so updates show up fast.
- **Honeypot + origin allow-list** on `/api/contact` blocks form-spam without a CAPTCHA.
- **Sensitive env vars** are marked Sensitive in Vercel (cannot be retrieved after creation, only re-set).
- **`api/contact.js` is the only serverless function** — all other pages are pure static HTML and serve at the CDN edge for near-zero latency.

## Local development

```powershell
cd ui_kits/marketing-site

# Static-only preview (no contact form):
python -m http.server 8000

# Full local with API route (needs Vercel CLI):
npm install -g vercel
vercel dev
```

For `vercel dev`, copy `.env.example` to `.env` and fill in real SMTP credentials. Vercel CLI will load them.

## Adding a new blog post

1. Copy any existing file in `ui_kits/marketing-site/blog/` as your starting point.
2. Update the `<title>`, `<meta description>`, canonical URL, og tags, and JSON-LD `Article` block.
3. Write the post inside `<article class="cm-post">`.
4. Add an entry to `blog.html`'s post list.
5. Add a `<url>` block to `sitemap.xml`.
6. Commit and push — Vercel auto-deploys.

## Custom domain (clinimedia.ca)

In your Vercel project → **Settings → Domains** → add `clinimedia.ca` (and `www.clinimedia.ca` for the apex redirect). Vercel will give you DNS records to point at — update them at whoever currently hosts your DNS (Webflow, Cloudflare, your registrar).

While the domain is still serving the live Webflow site, you can preview the Vercel build on its auto-generated `*.vercel.app` URL.
