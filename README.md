# myClearDeal website

Static marketing site for myClearDeal. Plain HTML, CSS and JS. No build step.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home landing page: hero, proof strip, red flag checker, before/after comparison, explore tabs, founder, reviews, reels, CTA |
| `how-it-works.html` | 4-step timeline, what you do vs. what we do, our promise |
| `what-we-cover.html` | The 6 numbers we work on, deal recap, quote check CTA |
| `dealers.html` | Dealer value props and dealer signup form |
| `faq.html` | Grouped FAQ |
| `start.html` | Start my deal form + free quote check upload (`start.html#check`) |
| `privacy.html` | Privacy policy placeholder |
| `404.html` | Not found page |

Shared files: `assets/css/styles.css`, `assets/js/main.js`, `assets/img/`.

## Before going live

Search the project for `[` to find every placeholder:

- `[FOUNDER NAME]`, `[FOUNDER PHOTO]`, founder quote
- `[PHONE NUMBER]`, `[EMAIL ADDRESS]`, `[RESPONSE TIME]`
- `[FEE DETAILS]`, `[TYPICAL TIMELINE ...]`, `[YOUR SERVICE AREA]`
- `[CLIENT REVIEW 1-3]`, `[CLIENT FIRST NAME]`, `[VEHICLE]`
- `[INSTAGRAM LINK]`, `[@HANDLE]`, video titles
- `[YOUR DOMAIN]` (canonical tags in each page head)
- `[LEGAL ENTITY NAME]`, `[FLORIDA LICENSE INFO]`, privacy policy text

Founder photo: replace the `.photo-ph` div in `index.html` with
`<img src="assets/img/founder.jpg" alt="[FOUNDER NAME]" style="border-radius:28px;aspect-ratio:4/5;object-fit:cover">`.

## Forms

The three forms (`start-deal`, `quote-check`, `dealer`) use **Netlify Forms**.
Deploy the repo on Netlify and submissions show up under Site > Forms, with
email notifications available. No backend needed.

On GitHub Pages, forms will not submit. Either deploy on Netlify, or swap each
form's `action` to a service like Formspree.

## Deploy

**Netlify (recommended):** push this folder to GitHub, then Netlify > Add new site > Import from Git. Publish directory: `/` (root). No build command.

**GitHub Pages:** repo Settings > Pages > Deploy from branch > `main` / root.
