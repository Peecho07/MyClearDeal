# myClearDeal website

Static marketing site for myClearDeal. Plain HTML, CSS and JS. No build step.

## Pages

Built on the "Step" design system (layout, type, components and motion), with myClearDeal's colors and copy.

| File | Purpose |
|---|---|
| `index.html` | Hero with animated example deal (negotiate, verify, trade-in), make marquee, "what we negotiate" tabs (price, fees, trade-in, market check), Check My Deal band with a short form, the problem, self-check, comparison table, how it works, what we do and don't, founders and stats, mission, pricing, example deals deck, CTA |
| `how-it-works.html` | 4 steps, what you do vs. what we do, scope, our promise |
| `what-we-cover.html` | The 3 numbers we negotiate, how we define a fair price, scope, deal recap |
| `pricing.html` | $995 plan, what goes to the dealer, why it's worth it, comparison, pricing FAQ |
| `faq.html` | Grouped FAQ and pre-approval tip |
| `start.html` | Step 1 shows the $995 fee, step 2 is the consultation form with a 5-step progress bar. `start.html?type=lease` preselects Leasing. Full Check My Deal form at `start.html#check` |
| `privacy.html` | Privacy policy placeholder |
| `404.html` | Not found page |

Shared files: `site.css` (all styles; brand colors are the tokens at the top) and `site.js` (all behavior; each feature exits early when its element is missing).

The "example deals" deck and the hero animation use illustrative numbers and are labeled as examples. Replace them with real (anonymized) results once you have them.

Logo files in `assets/img/` (vector rebuild of the magnifying-glass logo; the wordmark is Inter ExtraBold):

- `logo.svg` for light backgrounds (header), `logo-white.svg` for dark backgrounds (footer)
- `logo.png`, `logo-white.png`: 1200px PNG copies for email or social
- `favicon.svg` plus `favicon.png` (64px) fallback, `apple-touch-icon.png` (180px)
- `og-image.png`: 1200x630 social share image

`sitemap.xml` and `robots.txt` use the github.io address. Swap in the real domain once it is connected, and uncomment the canonical tags in each page head.

## Before going live

Placeholders are commented out (`<!-- ... -->`) so nothing unfinished shows on the live site. Search the project for `[` to find each one, fill it in, then remove the comment wrapper:

- `[TYPICAL TIMELINE ...]`, `[YOUR SERVICE AREA]`
- `[YOUR DOMAIN]` (canonical tags in each page head)
- `[LEGAL ENTITY NAME]`, `[FLORIDA LICENSE INFO]`, privacy policy text

No founder or personal photos are used anywhere on the site, by design.

## Forms and contact details

All three forms (home Check My Deal, consultation, full Check My Deal) post to **Formspree** with fetch, which works on GitHub Pages. Set these at the top of `site.js`:

- `FORM_ENDPOINT`: your Formspree form URL (formspree.io > New form). Each submission includes a `form` field saying which form it came from.
- `CONTACT_EMAIL`: shown in the footer and on the start page, and in the error message. Hidden while empty.
- `QUOTE_TURNAROUND`: e.g. "1 business day". Shown in the Check My Deal steps. Hidden while empty.

Until `FORM_ENDPOINT` is set, forms show an error instead of a false confirmation.

## Deploy

**GitHub Pages:** live now, deploying from the repo's default branch, root folder. No build step.
