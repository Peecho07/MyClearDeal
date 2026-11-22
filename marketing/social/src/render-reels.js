// Renders each reel as a 30fps frame sequence with Playwright, then joins it with ffmpeg (H.264, veryfast).
// Output: ../reels/<name>.mp4 and ../reels/<name>-cover.png. Run: node render-reels.js [name-filter]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const { R, reelPage } = require('./reels');
const OUT = path.join(__dirname, '..', 'reels'), FPS = 30;
(async () => {
  const only = process.argv[2];
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  const jobs = Object.entries(R).filter(([n]) => !only || n.includes(only));
  await Promise.all(jobs.map(async ([name, r]) => {
    const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
    const html = path.join(__dirname, `_reel-${name}.html`); fs.writeFileSync(html, reelPage(r));
    const frames = fs.mkdtempSync(path.join(require('os').tmpdir(), 'mcd-' + name + '-'));
    await p.goto('file://' + html); await p.evaluate(() => document.fonts.ready);
    const n = Math.round(r.dur * FPS);
    for (let i = 0; i < n; i++) {
      await p.evaluate((t) => window.seek(t), i / FPS);
      await p.screenshot({ path: path.join(frames, String(i).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 92 });
    }
    if (r.coverHtml) { fs.writeFileSync(html, reelPage({ ...r, html: r.coverHtml, caps: [] })); await p.goto('file://' + html); await p.evaluate(() => document.fonts.ready); await p.evaluate(() => window.seek(50)); }
    else await p.evaluate((t) => window.seek(t), r.cover);
    await p.screenshot({ path: path.join(OUT, name + '-cover.png') });
    await p.close(); fs.unlinkSync(html);
    // Silent AAC track so every app accepts the upload; add music in Instagram or Facebook.
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(frames, '%05d.jpg'),
      '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000',
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS),
      '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', path.join(OUT, name + '.mp4')]);
    fs.rmSync(frames, { recursive: true, force: true });
    console.log(name, n, 'frames');
  }));
  await b.close();
})();
