// Builds ../contact-sheet.html: every carousel slide and every reel cover in one grid (open it from the social folder).
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const car = fs.readdirSync(path.join(ROOT, 'carousels')).sort((a, b) => a.replace(/-es$/, '~') < b.replace(/-es$/, '~') ? -1 : 1);
const reels = fs.readdirSync(path.join(ROOT, 'reels')).filter((f) => f.endsWith('.mp4')).map((f) => f.replace('.mp4', '')).sort((a, b) => a.replace(/-es$/, '~') < b.replace(/-es$/, '~') ? -1 : 1);
const title = (s) => s.replace(/^\d+-/, '').replace(/-es$/, ' (Spanish)').replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase()).replace('Hero program', 'Hero Program').replace('mycleardeal', 'MyClearDeal').replace('995', '$995');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>MyClearDeal launch set</title>
<link rel="stylesheet" href="src/fonts/fonts.css">
<style>
:root { --ink:#0F2D24; --ink-2:#2E4A40; --muted:#587066; --line:#D5EBDF; --green:#1DB87A; --green-text:#0B6E48; --mint:#F5FCF8; --mint-2:#E3F6EC; }
* { box-sizing: border-box; } body { margin: 0; font: 400 15px/1.5 "DM Sans", sans-serif; color: var(--ink-2); background: var(--mint); }
header { padding: 28px 24px 8px; max-width: 1400px; margin: 0 auto; } h1 { font: 800 30px "DM Sans"; color: var(--ink); letter-spacing: -.03em; margin: 0 0 6px; }
h1 em { font-family: Saira, sans-serif; font-style: italic; color: #13955F; } p { margin: 0; color: var(--muted); }
section { max-width: 1400px; margin: 0 auto; padding: 18px 24px; } h2 { font: 800 20px "DM Sans"; color: var(--ink); margin: 18px 0 10px; letter-spacing: -.02em; }
h2 small { font: 600 13px "DM Sans"; color: var(--green-text); margin-left: 8px; letter-spacing: 0; }
.row { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
.reels { grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); }
figure { margin: 0; background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 6px; }
figure img, figure video { width: 100%; display: block; border-radius: 8px; background: var(--mint-2); }
figcaption { font: 600 12px "DM Sans"; color: var(--muted); padding: 6px 2px 2px; }
figcaption a { color: var(--green-text); }
</style></head><body>
<header><h1>MyClearDeal <em>launch set</em></h1><p>${car.length} carousels (${car.reduce((n, c) => n + fs.readdirSync(path.join(ROOT, 'carousels', c)).length, 0)} slides) and ${reels.length} reels. Captions, hashtags and the posting order are in captions.md. Click a reel cover to play it.</p></header>
<section><h2>Reels <small>1080x1920, 30fps, cover frames</small></h2><div class="row reels">
${reels.map((r) => `<figure><video src="reels/${r}.mp4" poster="reels/${r}-cover.png" controls preload="none" playsinline></video><figcaption>${title(r)} · <a href="reels/${r}.mp4">mp4</a> · <a href="reels/${r}-cover.png">cover</a></figcaption></figure>`).join('\n')}
</div></section>
${car.map((c) => { const s = fs.readdirSync(path.join(ROOT, 'carousels', c)).filter((f) => f.endsWith('.png')).sort();
  return `<section><h2>${title(c)} <small>${s.length} slides, 1080x1350</small></h2><div class="row">${s.map((f) => `<figure><a href="carousels/${c}/${f}"><img src="carousels/${c}/${f}" loading="lazy" alt="${title(c)} ${f}"></a><figcaption>${f.replace('.png', '')}</figcaption></figure>`).join('')}</div></section>`; }).join('\n')}
</body></html>`;
fs.writeFileSync(path.join(ROOT, 'contact-sheet.html'), html);
console.log('contact-sheet.html written');
