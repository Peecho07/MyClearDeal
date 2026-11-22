// Re-render just the cover PNGs (same code path as render-reels.js). Run: node covers-only.js
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const { R, reelPage } = require('./reels'); const OUT = path.join(__dirname, '..', 'reels');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [name, r] of Object.entries(R)) { const html = path.join(__dirname, '_cover.html');
    fs.writeFileSync(html, reelPage({ ...r, html: r.coverHtml, caps: [] })); await p.goto('file://' + html); await p.evaluate(() => document.fonts.ready);
    await p.evaluate(() => window.seek(50)); await p.screenshot({ path: path.join(OUT, name + '-cover.png') }); fs.unlinkSync(html); }
  await b.close(); })();
