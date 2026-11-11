# MyClearDeal website

Static marketing site for MyClearDeal. Plain HTML, CSS and JS. No build step.

## Pages

Built on the "Step" design system (layout, type, components and motion), with MyClearDeal's colors and copy.

| File | Purpose |
|---|---|
| `index.html` | Hero with promise line and intro video panel, make marquee, "Watch a deal come together" animated example deal, "Our team is working for you" tabs, free quote review form, mission with three pillars, example deals deck, CTA, refund disclaimer |
| `how-it-works.html` | "Our process": clickable car stepper, four grouped step cards (you vs. we), scope, promise |
| `guide.html` | Buyer's guide: fee decoder, red-flag self-check, before-you-go checklist |
| `calculator.html` | Free deal calculator at `/calculator`: "What will it cost?" (out-the-door price and estimated monthly payment) and "What can I afford?" modes, Florida state tax plus county surtax (first $5,000 only), saved in the browser. Math lives in `assets/calculator.js` (loaded only on this page); confirm the county surtax rates there with the Florida Department of Revenue before launch |
| `about.html` | About us: our story (founders), mission, full FAQ including pricing and refunds |
| `pricing.html` | Deal Coach ($199) and Done For You ($995) plans, four-step animated pricing walkthrough, what goes to the dealer, why it's worth it, refund policy |
| `start.html` | Consultation form ("Start my deal") and the full quote review form at `start.html#check` |
| `faq.html`, `what-we-cover.html` | Redirects to `about.html#faq` and `guide.html` so old links keep working |
| `privacy.html` | Privacy policy placeholder |
| `404.html` | Not found page |

Intro video: put the file at `assets/video/intro.mp4` (and a still at `assets/video/intro-poster.jpg`), then swap the placeholder block in `index.html` for the `<video>` tag noted in the comment there.

Shared files: `site.css` (all styles; brand colors are the tokens at the top) and `site.js` (all behavior; each feature exits early when its element is missing).

The "example deals" deck and the hero animation use illustrative numbers and are labeled as examples. Replace them with real (anonymized) results once you have them.

Logo files in `assets/img/` (vector rebuild of the magnifying-glass logo; the wordmark is Inter ExtraBold):

- `logo.svg` for light backgrounds (header), `logo-white.svg` for dark backgrounds (footer)
- `logo.png`, `logo-white.png`: 1200px PNG copies for email or social
- `favicon.svg` plus `favicon.png` (64px) fallback, `apple-touch-icon.png` (180px)
- `og-image.png`: 1200x630 social share image

`sitemap.xml`, `robots.txt`, the canonical tags and the Open Graph image all use https://mycleardeal.com. Links use clean addresses (`/pricing`, `/#review`); GitHub Pages serves both those and the old `.html` addresses.

## Before going live

Placeholders are commented out (`<!-- ... -->`) so nothing unfinished shows on the live site. Search the project for `[` to find each one, fill it in, then remove the comment wrapper:

- `[TYPICAL TIMELINE ...]`, `[YOUR SERVICE AREA]`
- `[LEGAL ENTITY NAME]`, `[FLORIDA LICENSE INFO]`, privacy policy text

No founder or personal photos are used anywhere on the site, by design.

## Forms and contact details

The two forms (`quote-check-home`, the quick "Review my quote" form on the home page at `/#review`, and `start-deal`, the consultation form on `/start`) are sent with **FormSubmit** (formsubmit.co), which emails each submission as a table to `LEAD_EMAIL` (hello@mycleardeal.com). No account or backend needed, and it works on GitHub Pages. The first submission to a new address triggers a one-time "Activate Form" email to that address; click it and every later submission is delivered. The activation email also gives a random alias that can replace the address in `site.js` so it is not visible in the page source. Old links to `/start#check` redirect to `/#review`.

Each submission includes a `form` field saying which form it came from, and a hidden `_honey` field catches spam bots.

Set these at the top of `site.js`:

- `LEAD_EMAIL`: where form leads are emailed.
- `CONTACT_EMAIL`: shown in the footer and on the start page, and in the error message. Hidden while empty.
- `QUOTE_TURNAROUND`: e.g. "1 business day". Shown in the Check My Deal steps. Hidden while empty.

If a submission fails, the form shows an error instead of a false confirmation.

## Deploy

Hosted on **GitHub Pages** at https://mycleardeal.com, the same setup as tsKaizen:

- Pages serves the `main` branch from the repo root. Every push to `main` goes live in about a minute. No build step.
- `CNAME` holds the custom domain; `.nojekyll` serves the files as-is.
- `404.html` is used for any missing address. It is `noindex` and loads its files from the site root.

One-time setup (GitHub repo > Settings > Pages): Source "Deploy from a branch", branch `main`, folder `/ (root)`, custom domain `mycleardeal.com`, then tick "Enforce HTTPS" once the certificate is issued.

DNS at the domain registrar:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | peecho07.github.io |

## Spanish (EN / ES toggle)

- The small **ES / EN** button in the header switches the whole site between English and Spanish. The choice is remembered in the visitor's browser. Links can force a language with `?lang=es` or `?lang=en` (handy for Spanish ads or posts, e.g. `https://mycleardeal.com/?lang=es`).
- English stays the page source. Spanish lives in `assets/i18n-es.js`: each key is the English text exactly as it appears on the page, each value is the Spanish. `assets/i18n.js` swaps them in.
- **When you change English copy, add or update the matching line in `assets/i18n-es.js`,** or that piece will stay in English on the Spanish version.
- The logo slogan under the wordmark stays in English (it is part of the logo); the slogan above the homepage headline is translated.
