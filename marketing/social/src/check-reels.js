// QA for the reels: specs via ffprobe, then one frame every 0.5s compared with an empty background
// in the top 250px and bottom 250px bands. Any text or shape there shows up as a pixel difference.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const { R, reelPage } = require('./reels');
const DIR = path.join(__dirname, '..', 'reels');
const py = `
import sys, json
from PIL import Image, ImageChops
ref = Image.open(sys.argv[1]).convert('L'); out = []
for f in sys.argv[2:]:
    im = Image.open(f).convert('L'); worst = 0
    for box in [(0, 0, 1080, 250), (0, 1670, 1080, 1920)]:
        d = ImageChops.difference(im.crop(box), ref.crop(box))
        h = d.histogram(); n = sum(h); big = sum(h[24:])  # pixels off by more than 24 levels
        worst = max(worst, big / n)
    out.append(worst)
print(json.dumps(out))`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  let fail = 0;
  for (const [name, r] of Object.entries(R)) {
    const mp4 = path.join(DIR, name + '.mp4');
    const info = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_name,width,height,r_frame_rate,pix_fmt:format=duration', '-of', 'json', mp4]));
    const v = info.streams.find((s) => s.width), a = info.streams.find((s) => !s.width), dur = +info.format.duration;
    const spec = `${v.codec_name} ${v.width}x${v.height} ${v.r_frame_rate}fps ${v.pix_fmt} ${dur.toFixed(1)}s audio:${a ? a.codec_name : 'none'}`;
    const specOk = v.codec_name === 'h264' && v.width === 1080 && v.height === 1920 && v.r_frame_rate === '30/1' && dur >= 15 && dur <= 30;
    // empty background reference
    const tmp = path.join(__dirname, '_bg.html'); fs.writeFileSync(tmp, reelPage({ ...r, html: '', caps: [] }));
    await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready); await p.evaluate(() => window.seek(0));
    const ref = path.join(os.tmpdir(), name + '-bg.png'); await p.screenshot({ path: ref }); fs.unlinkSync(tmp);
    const fdir = fs.mkdtempSync(path.join(os.tmpdir(), 'chk-'));
    execFileSync('ffmpeg', ['-v', 'error', '-i', mp4, '-vf', 'fps=2', path.join(fdir, '%04d.png')]);
    const frames = fs.readdirSync(fdir).sort().map((f) => path.join(fdir, f));
    const scores = JSON.parse(execFileSync('python3', ['-c', py, ref, ...frames]).toString());
    const worst = Math.max(...scores), at = scores.indexOf(worst) / 2;
    const bandOk = worst < 0.001;
    if (!specOk || !bandOk) fail++;
    console.log(`${specOk && bandOk ? 'ok  ' : 'FAIL'} ${name}: ${spec} | ${frames.length} frames checked, top/bottom 250px changed pixels max ${(worst * 100).toFixed(3)}% (t=${at}s)`);
    fs.rmSync(fdir, { recursive: true, force: true }); fs.unlinkSync(ref);
  }
  console.log(fail ? fail + ' FAILED' : 'ALL REELS PASS');
  await b.close();
})();
