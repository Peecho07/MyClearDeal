// Profile picture: the site's logo mark, centered for Instagram's circle crop. Output: ../profile/profile-picture.png (1080x1080)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const { MARK } = require('./parts');
(async () => {
  const out = path.join(__dirname, '..', 'profile'); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1080 } });
  await p.setContent(`<body style="margin:0;width:1080px;height:1080px;display:grid;place-items:center;background:radial-gradient(700px 600px at 85% 0%,#A9EECC,transparent 65%),linear-gradient(180deg,#E6F8EF,#F5FCF8)"><div style="width:600px;height:600px;transform:translate(-18px,-14px)">${MARK(false).replace('<svg', '<svg style="width:600px;height:600px"')}</div></body>`);
  await p.screenshot({ path: path.join(out, 'profile-picture.png') });
  // circle preview at the size Instagram shows it
  await p.setContent(`<body style="margin:0;background:#fff;display:flex;gap:24px;padding:20px;align-items:center"><img src="data:image/png;base64,${fs.readFileSync(path.join(out, 'profile-picture.png')).toString('base64')}" style="width:160px;height:160px;border-radius:50%;border:1px solid #ddd"><img src="data:image/png;base64,${fs.readFileSync(path.join(out, 'profile-picture.png')).toString('base64')}" style="width:56px;height:56px;border-radius:50%;border:1px solid #ddd"></body>`);
  await p.setViewportSize({ width: 300, height: 200 }); await p.screenshot({ path: '/tmp/claude-0/-home-user/edc5a819-8c08-555e-9c68-21df2d1ecd7d/scratchpad/rev/pfp.png' });
  await b.close();
})();
