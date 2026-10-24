# myClearDeal website

Static marketing site for myClearDeal. Plain HTML, CSS and JS. No build step.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home landing page: hero, proof strip, red flag self-check, before/after comparison, $999 pricing, Why myClearDeal comparison, explore tabs, About the founders (with the three company messages), mission statement, CTA (client reviews and videos are commented out until real ones exist) |
| `how-it-works.html` | 4-step timeline, what you do vs. what we do, our promise |
| `what-we-cover.html` | The 6 numbers we work on, deal recap, quote check CTA |
| `pricing.html` | $999 flat fee: what's included, why it's worth it, pricing FAQ |
| `faq.html` | Grouped FAQ |
| `start.html` | Step 1 shows the $999 fee, step 2 is the consultation form (fee acknowledgement required; "Have you found a car yet?" shows link fields or a "what are you looking for" box depending on the answer). Free Check My Deal intake at `start.html#check`, reviewed manually by the team |
| `privacy.html` | Privacy policy placeholder |
| `404.html` | Not found page |

Shared files: `assets/css/styles.css`, `assets/js/main.js`, `assets/img/`.

## Before going live

Search the project for `[` to find every placeholder:

- `[PHONE NUMBER]`, `[EMAIL ADDRESS]`, `[RESPONSE TIME]`
- `[TYPICAL TIMELINE ...]`, `[YOUR SERVICE AREA]`
- `[CLIENT REVIEW 1-3]`, `[CLIENT FIRST NAME]`, `[VEHICLE]` (reviews section is commented out in `index.html`; uncomment once filled)
- `[INSTAGRAM LINK]`, `[@HANDLE]`, video titles (videos section is commented out in `index.html`; uncomment once filled)
- `[YOUR DOMAIN]` (canonical tags in each page head)
- `[LEGAL ENTITY NAME]`, `[FLORIDA LICENSE INFO]`, privacy policy text

No founder or personal photos are used anywhere on the site, by design.

## Forms

The two forms (`start-deal`, `quote-check`) use **Netlify Forms**.
Deploy the repo on Netlify and submissions show up under Site > Forms, with
email notifications available. No backend needed.

On GitHub Pages, forms will not submit; visitors see an error message with your phone number instead of a false confirmation. Either deploy on Netlify, or swap each
form's `action` to a service like Formspree.

## Deploy

**Netlify (recommended):** push this folder to GitHub, then Netlify > Add new site > Import from Git. Publish directory: `/` (root). No build command.

**GitHub Pages:** repo Settings > Pages > Deploy from branch > `main` / root.
