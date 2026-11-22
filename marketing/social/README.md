# MyClearDeal social launch set

- `carousels/<name>/slide-NN.png`: 1080x1350 carousel slides
- `reels/<name>.mp4` + `reels/<name>-cover.png`: 1080x1920, 30fps, H.264, silent AAC track (add music in the app)
- `captions.md`: hook, caption, CTA, hashtags, on-screen words and the 2-week posting order
- `contact-sheet.html`: everything in one grid (open it from this folder)

## Re-render after a copy change

Needs Node with Playwright, Python with Pillow, and ffmpeg. From `src/`:

```bash
node render-carousels.js        # all carousels (or pass part of a name, e.g. "hero")
node render-reels.js            # all reels and covers (or a filter)
node check-reels.js             # specs + top/bottom 250px safe-zone check
node contact-sheet.js           # rebuild the review grid
```

Copy lives in `src/carousels.js` and `src/reels.js`. Colors and fonts in `src/base.css` come from the site's `site.css` (Mint Fresh). Fonts are local copies of DM Sans and Saira (SIL Open Font License).

These files are not linked from the website. If this folder is ever merged into `main`, GitHub Pages will serve it at mycleardeal.com/marketing/social/.
