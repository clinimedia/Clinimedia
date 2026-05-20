# Deploying CliniMedia to Vercel

The deployable site lives at the **repo root**. Vercel needs zero configuration to deploy it — `index.html`, `api/`, `vercel.json`, and `package.json` are all at the root where Vercel expects them.

The `design-system/` subfolder holds design tokens, preview cards, and audit documentation — reference material, NOT part of the live site.

## GitHub repo

This codebase pushes to: **https://github.com/AhmadHamadi/Clinimedia**

## One-time Vercel setup (zero-config)

1. In the Vercel dashboard, **Add New → Project** and select the `AhmadHamadi/Clinimedia` GitHub repo.
2. Vercel will auto-detect the project. **Leave every setting at its default:**
   - Framework Preset: `Other` (auto-detected)
   - Root Directory: `./` (the default — DO NOT change it)
   - Build Command: empty
   - Output Directory: empty
   - Install Command: empty (default `npm install` runs because `package.json` is present)
3. Add the env vars (next section).
4. Click **Deploy**.

## Environment variables (REQUIRED for the contact form)

Set these in **Vercel → Project → Settings → Environment Variables** (mark them **Sensitive**, apply to **Production + Preview**, NOT Development):

| Name | Required | Example | Notes |
|---|---|---|---|
| `SMTP_HOST` | ✅ | `smtp.zoho.com` / `smtp.gmail.com` / `smtp.office365.com` | The SMTP server |
| `SMTP_PORT` | ✅ | `587` or `465` | 587 = STARTTLS (recommended); 465 = SSL |
| `SMTP_USER` | ✅ | `info@clinimedia.ca` | The mailbox login |
| `SMTP_PASS` | ✅ | `***` | SMTP password or app password (NOT your account password if 2FA is on) |
| `CONTACT_TO` | optional | `info@clinimedia.ca` | Destination address. Defaults to `info@clinimedia.ca`. |
| `CONTACT_FROM` | optional | `noreply@clinimedia.ca` | From-address. Defaults to `SMTP_USER`. |
| `CONTACT_REPLY_TO` | optional | — | Defaults to the submitter's email (so "Reply" works). |

After adding env vars, **redeploy** the latest commit so the function picks them up (Vercel does not hot-reload env vars).

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
- **Sensitive env vars** are marked Sensitive in Vercel (cannot be retrieved after creation).
- **`api/contact.js` is the only serverless function** — every other page is pure static HTML served at the CDN edge for near-zero latency.

## Local development

```powershell
# Static-only preview (no contact form):
python -m http.server 8000
# then open http://localhost:8000

# Full local with API route (Vercel CLI):
npm install -g vercel
vercel dev
# then open http://localhost:3000
```

For `vercel dev`, copy `.env.example` to `.env` and fill in real SMTP credentials. Vercel CLI auto-loads them.

## Project structure

```
Clinimedia/                       ← repo root = Vercel deploy root
├── index.html                    ← Home
├── services.html
├── our-work.html
├── portfolio.html
├── contact.html
├── blog.html
├── blog/                         ← Individual posts
│   └── *.html  (6 long-form posts)
├── assets/                       ← Logos, photos, videos
├── api/
│   └── contact.js                ← Vercel serverless function (SMTP)
├── styles.css
├── scripts.js
├── sitemap.xml
├── robots.txt
├── llms.txt                      ← AI engine summary
├── package.json                  ← Declares nodemailer + Node 20+
├── vercel.json                   ← Clean URLs, security headers, cache control
├── .env.example                  ← Template for SMTP env vars
├── .gitignore
├── README.md, DEPLOY.md, CLAUDE.md
└── design-system/                ← Reference only (NOT deployed)
    ├── colors_and_type.css
    ├── PROJECT_README.md
    ├── SEO_AEO.md
    ├── SEO_AUDIT.md
    ├── preview/                  ← Token preview cards
    ├── brand-assets/             ← Source logos
    └── strays/                   ← Misc images
```

## Adding a new blog post

1. Copy any existing file in `blog/` as your starting point.
2. Update the `<title>`, `<meta description>`, canonical URL, OG tags, and JSON-LD `Article` block.
3. Write the post inside `<article class="cm-post">`.
4. Add an entry to `blog.html`'s post list.
5. Add a `<url>` block to `sitemap.xml`.
6. Commit + push — Vercel auto-deploys.

## Custom domain (clinimedia.ca)

In your Vercel project → **Settings → Domains** → add `clinimedia.ca` and `www.clinimedia.ca`. Vercel will give you DNS records to point at — update them at whoever currently hosts your DNS.

While the domain is still serving the live Webflow site, you can preview the Vercel build on its auto-generated `*.vercel.app` URL.

## Troubleshooting

**404 NOT_FOUND on the deployed site:** The Root Directory was overridden in Vercel project settings. Go to **Settings → General → Root Directory** and reset it to `./` (or blank). Redeploy.

**Contact form returns "Email service is not configured.":** Env vars aren't set or weren't applied to Production. Re-check **Settings → Environment Variables** and trigger a redeploy.

**Contact form returns 502:** SMTP credentials are wrong, port is blocked, or the SMTP provider requires an app password (typical for Gmail with 2FA). Check Vercel function logs in the project dashboard.

**Canva iframe shows a CSP error in DevTools:** Should not happen with the current `vercel.json` — its CSP explicitly allows `https://www.canva.com` and `https://*.canva.com` in `frame-src`. If you see this, confirm the latest commit has been deployed.
