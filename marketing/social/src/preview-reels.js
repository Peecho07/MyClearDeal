// Quick check: one still per scene (taken late in each scene) per reel, tiled into a strip. Usage: node preview-reels.js <outdir> [filter]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const { R, reelPage } = require('./reels');
(async () => {
  const outDir = process.argv[2], only = process.argv[3];
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [name, r] of Object.entries(R)) {
    if (only && !name.includes(only)) continue;
    const html = path.join(__dirname, '_preview.html'); fs.writeFileSync(html, reelPage(r));
    await p.goto('file://' + html); await p.evaluate(() => document.fonts.ready);
    const times = [...r.html.matchAll(/data-t="([\d.]+) ([\d.]+)"/g)].map((m) => Math.min(+m[2], r.dur) - 0.45);
    const shots = [];
    for (const t of times) { await p.evaluate((x) => window.seek(x), t); shots.push((await p.screenshot({ type: 'jpeg', quality: 80 })).toString('base64')); }
    // safe-zone guides drawn on the strip: red = keep clear (top/bottom 250px), orange = IG overlay zone
    const strip = await b.newPage({ viewport: { width: 360 * shots.length + 10 * (shots.length - 1), height: 640 } });
    await strip.setContent(`<body style="margin:0;display:flex;gap:10px;background:#fff">${shots.map((s) => `<div style="position:relative;width:360px;height:640px"><img src="data:image/jpeg;base64,${s}" style="width:360px;height:640px;display:block"><i style="position:absolute;left:0;right:0;top:0;height:83px;border-bottom:2px dashed red"></i><i style="position:absolute;left:0;right:0;bottom:0;height:83px;border-top:2px dashed red"></i></div>`).join('')}</body>`);
    await strip.screenshot({ path: path.join(outDir, 'reel_' + name + '.png') }); await strip.close();
    fs.unlinkSync(html); console.log(name, times.map((t) => t.toFixed(1)).join(' '));
  }
  await b.close();
})();
