// Renders every carousel slide to ../carousels/<name>/slide-NN.png (1080x1350).
// Run from this folder: node render-carousels.js [name-filter]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const { page } = require('./parts');
const C = require('./carousels');
const OUT = path.join(__dirname, '..', 'carousels');
(async () => {
  const only = process.argv[2];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const tmp = path.join(__dirname, '_slide.html');
  for (const [name, slides] of Object.entries(C)) {
    if (only && !name.includes(only)) continue;
    const dir = path.join(OUT, name); fs.mkdirSync(dir, { recursive: true });
    for (const f of fs.readdirSync(dir)) if (/^slide-\d+\.png$/.test(f)) fs.unlinkSync(path.join(dir, f));
    for (let k = 0; k < slides.length; k++) {
      fs.writeFileSync(tmp, page(slides[k]));
      await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready);
      // Overflow guard: nothing may spill outside its slide or its body area
      const bad = await p.evaluate(() => { const b = document.querySelector('.body'); return b.scrollHeight > b.clientHeight + 2 ? 'body overflows by ' + (b.scrollHeight - b.clientHeight) + 'px' : ''; });
      if (bad) console.log('  WARN', name, 'slide', k + 1, bad);
      await p.screenshot({ path: path.join(dir, `slide-${String(k + 1).padStart(2, '0')}.png`) });
    }
    console.log(name, slides.length, 'slides');
  }
  fs.unlinkSync(tmp); await b.close();
})();
