// Reel scripts. Each scene: [start, end] in seconds; children animate with data-in="type delay duration".
// Safe zones: content sits between y=300 and y=1360, captions between y=1400 and y=1600. Top and bottom 300px are background only.
const { MARK, ARROW, ico } = require('./parts');

const brandRow = (dark, lang = 'en') => `<div class="brand" data-in="fadeup 0 .5">${MARK(dark)}<div class="bn"><b>My<i>Clear</i>Deal</b><small>${lang === 'es' ? 'Comprar auto, claro y sencillo' : 'Car Buying Made Clear'}</small></div></div>`;
const sc = (a, b, html) => `<section class="scene" data-t="${a} ${b}">${html}</section>`;
const ctaScene = (a, b, o) => sc(a, b, `${brandRow(o.dark, o.lang)}
  <h2 class="h md" data-in="fadeup .2 .6">${o.h}</h2>
  ${o.sub ? `<p class="sub" data-in="fadeup .5 .6">${o.sub}</p>` : ''}
  <span class="btn" data-in="pop .9 .5">${o.btn} ${ARROW}</span>
  <div class="stack" style="gap:12px" data-in="fadeup 1.2 .6"><span class="url">${o.url}</span><div class="contact"><span>(561) 410-2709</span><span>hello@mycleardeal.com</span></div></div>`);

const R = {};

// 1. Hero Program announcement (EN + ES)
const heroReel = (lang) => {
  const es = lang === 'es';
  const T = es ? {
    k: 'Bomberos, agentes del orden, área médica, maestros, militares', h: 'Tu negociador de autos, <em>gratis.</em>', sub: 'Nuestro servicio completo de negociación. Gratis para quienes sirven.',
    wk: 'Quién califica', chips: ['Bomberos', 'Agentes del orden', 'Área médica', 'Maestros', 'Militares'], wn: 'Activos o jubilados. Los veteranos califican.',
    gk: 'Lo que recibes', g: ['La misma negociación: precio, cargos e intercambio', 'El mismo resumen por escrito del precio final', 'El mismo apoyo hasta que te lleves tu auto'],
    ch: 'Obtén tu <em>oferta Héroes.</em>', cs: 'Muestra una prueba de servicio en tu llamada gratis.', btn: 'Obtener mi oferta Héroes',
    caps: [[0, 3.2, 'Héroes: tu negociador de autos es gratis'], [3.2, 6.2, 'Nuestro servicio de negociación cuesta $995'], [6.2, 9.2, 'Para los héroes, cuesta $0'], [9.2, 14.6, 'Bomberos, agentes del orden, área médica, maestros y militares'], [14.6, 18.6, 'La misma negociación, el mismo resumen, el mismo apoyo'], [18.6, 23, 'Obtén el tuyo en mycleardeal.com']],
  } : {
    k: 'Firefighters, officers, medical, teachers, military', h: 'Your car negotiator is <em>on us.</em>', sub: 'Our full negotiation service. Free for those who serve.',
    wk: 'Who qualifies', chips: ['Firefighters', 'Law enforcement', 'Medical field', 'Teachers', 'Military'], wn: 'Active or retired. Veterans qualify.',
    gk: 'What you get', g: ['Same negotiation: price, fees and trade-in', 'Same written out-the-door recap', 'Same support until you drive away'],
    ch: 'Claim your <em>Hero deal.</em>', cs: 'Show one proof of service on your free call.', btn: 'Claim my Hero deal',
    caps: [[0, 3.2, 'Heroes: your car negotiator is on us'], [3.2, 6.2, 'Our car negotiation service is $995'], [6.2, 9.2, 'For heroes, it is $0'], [9.2, 14.6, 'Firefighters, law enforcement, medical, teachers and military'], [14.6, 18.6, 'Same negotiation. Same written recap. Same support.'], [18.6, 23, 'Claim yours at mycleardeal.com']],
  };
  return { bg: 'deep', dur: 23, cover: 7.4, caps: T.caps, html: [
    sc(0, 3.2, `${brandRow(true, lang)}<div class="kicker" data-in="fadeup .3 .5">${T.k}</div><h1 class="h" data-in="fadeup .5 .7">${T.h}</h1>`),
    sc(3.2, 9.2, `<div class="price" style="flex-direction:column;align-items:flex-start;gap:30px"><span class="was" data-in="fadeup .1 .5" data-strike="1.3 .6">$995</span><span class="now" data-in="fadeup 2.0 .4"><sup>$</sup><span data-count="995 0 2.3 1.3">995</span></span></div>
      <p class="sub" data-in="fadeup 3.4 .6">${T.sub}</p>`),
    sc(9.2, 14.6, `<div class="kicker" data-in="fadeup 0 .5">${T.wk}</div>
      <div class="stack" style="gap:18px">${T.chips.map((c, k) => `<div class="row2" data-in="left ${0.4 + k * 0.55} .5">${ico(['flame', 'shield', 'medical', 'book', 'star'][k])}<b style="font:800 64px var(--display);color:#fff;letter-spacing:-.03em">${c}</b></div>`).join('')}</div>
      <p class="sub" data-in="fadeup 3.4 .5"><b>${T.wn}</b></p>`),
    sc(14.6, 18.6, `<div class="kicker" data-in="fadeup 0 .5">${T.gk}</div><ul class="checks" style="gap:34px">${T.g.map((x, k) => `<li data-in="left ${0.3 + k * 0.6} .5" style="font-size:52px">${x}</li>`).join('')}</ul>`),
    ctaScene(18.6, 24, { dark: true, lang, h: T.ch, sub: T.cs, btn: T.btn, url: 'mycleardeal.com/start?plan=hero' }),
  ].join('') };
};
R['01-hero-program-announcement'] = heroReel('en');
R['01-hero-program-announcement-es'] = heroReel('es');

// 2. Five jobs that get a free car negotiator
const JOBS = [['flame', 'Firefighters', 'Career and volunteer, active or retired.'], ['shield', 'Law enforcement', 'Police, deputies, state troopers and corrections officers.'],
  ['medical', 'Medical field', 'Nurses, doctors, EMTs, paramedics and licensed healthcare workers.'], ['book', 'Teachers', 'Pre-K through college, public and private schools.'],
  ['star', 'Military', 'Active duty, Reserve, National Guard and veterans.']];
R['02-five-jobs'] = { bg: 'mint', dur: 24, cover: 1.6, caps: [
  [0, 3.5, '5 jobs that get a free car negotiator'], ...JOBS.map(([, h], k) => [3.5 + k * 3, 6.5 + k * 3, `Number ${k + 1}: ${h.toLowerCase()}`]),
  [18.5, 21, 'Our full $995 service is $0 for you'], [21, 24, 'Claim it at mycleardeal.com']], html: [
  sc(0, 3.5, `${brandRow(false)}<div class="kicker" data-in="fadeup .2 .5">Hero Program</div><h1 class="h" data-in="fadeup .4 .7"><span class="big-n" style="font-size:1em;color:var(--accent)">5</span> jobs that get a <em class="hl">free car negotiator.</em></h1>`),
  ...JOBS.map(([ic, h, d], k) => sc(3.5 + k * 3, 6.5 + k * 3, `<div class="row2" style="gap:36px"><span class="big-n" data-in="pop 0 .5">${k + 1}</span>${ico(ic, '')}</div>
    <h2 class="h" data-in="fadeup .25 .5">${h}</h2><p class="sub" data-in="fadeup .55 .5">${d}</p>`)),
  sc(18.5, 21, `<div class="kicker" data-in="fadeup 0 .4">Active or retired. Veterans qualify.</div><div class="price" style="align-items:center"><span class="was" data-in="fadeup .1 .4" data-strike=".6 .5">$995</span><span class="now" data-in="pop 1.0 .5"><sup>$</sup>0</span></div><h2 class="h md" data-in="fadeup 1.3 .5">Our full service. <em>Free for you.</em></h2>`),
  ctaScene(21, 25, { dark: false, h: 'Claim your <em>Hero deal.</em>', btn: 'Claim my Hero deal', url: 'mycleardeal.com/start?plan=hero' }),
].join('') };

// 3. The three things we negotiate
const docRows = (rows) => rows.map(([l, v, extra = '', d = 0, cls = '']) => `<div class="row ${cls}" data-in="left ${d} .45"><span>${l}</span><span style="display:flex;align-items:center"><b>${v}</b>${extra}</span></div>`).join('');
R['03-three-things-we-negotiate'] = { bg: 'mint', dur: 23, cover: 10.6, caps: [
  [0, 3, 'We negotiate three things for you'], [3, 8, 'One: the vehicle price, checked against market data'], [8, 13, 'Two: dealer fees. Add-ons you never asked for come off.'],
  [13, 18, 'Three: your trade-in, valued on its own'], [18, 23, 'One flat fee. We negotiate. You just sign.']], html: [
  sc(0, 3, `${brandRow(false)}<div class="kicker" data-in="fadeup 0 .5">The sticker price is only one number</div><h1 class="h xl" data-in="fadeup .3 .6">We negotiate <em class="hl">3 things.</em></h1>`),
  sc(3, 8, `<div class="step" data-in="fadeup 0 .5"><span class="n">1</span><span class="l">The vehicle price</span></div><h2 class="h md" data-in="fadeup .3 .5">Checked against <em>market data.</em></h2>
    <div class="doc" data-in="fadeup .7 .6"><div class="doc-h"><b>Market check</b><span>Example deal</span></div>${docRows([['Local listings compared', '24', '', 1.2], ['Agreed price', '$38,450', '<span class="ok">IN RANGE</span>', 1.8]])}</div>`),
  sc(8, 13, `<div class="step" data-in="fadeup 0 .5"><span class="n">2</span><span class="l">Dealer fees</span></div><h2 class="h md" data-in="fadeup .3 .5">Extras you never asked for <em>come off.</em></h2>
    <div class="doc" data-in="fadeup .7 .6"><div class="doc-h"><b>Fees and add-ons</b><span>Example deal</span></div>${docRows([['Appearance package', '$1,995', '<span class="flag">REMOVED</span>', 1.1, 'cut'], ['Nitrogen fill', '$299', '<span class="flag">REMOVED</span>', 1.5, 'cut'], ['Doc fee', '$899', '<span class="ok">ITEMIZED</span>', 1.9]])}</div>`),
  sc(13, 18, `<div class="step" data-in="fadeup 0 .5"><span class="n">3</span><span class="l">Your trade-in</span></div><h2 class="h md" data-in="fadeup .3 .5">Valued <em>on its own.</em></h2>
    <div class="doc" data-in="fadeup .7 .6"><div class="doc-h"><b>Trade-in</b><span>Example deal</span></div>${docRows([['First offer', '$14,200', '', 1.1], ['Market value check', '$16,300', '', 1.6], ['Agreed trade-in', '$16,100', '<span class="ok">KEPT SEPARATE</span>', 2.1, 'total']])}</div>`),
  ctaScene(18, 24, { dark: false, h: 'We negotiate. <em>You just sign.</em>', sub: 'One flat fee of $995. $0 for heroes.', btn: 'Start my deal', url: 'mycleardeal.com/start' }),
].join('') };

// 4. Send us your quote (free quote review)
R['04-send-us-your-quote'] = { bg: 'mint', dur: 21, cover: 7.5, caps: [
  [0, 3.5, 'Got a quote from a dealer?'], [3.5, 6.8, 'Send it to us. We review it for free.'], [6.8, 10.5, 'A real person checks every line by hand'],
  [10.5, 15.5, 'We tell you what holds up and what to question'], [15.5, 21, 'Send yours at mycleardeal.com']], html: [
  sc(0, 3.5, `${brandRow(false)}<div class="kicker" data-in="fadeup .2 .5">Free quote review</div><h1 class="h xl" data-in="fadeup .4 .6">Got a dealer quote? <em class="hl">Send it to us.</em></h1>`),
  sc(3.5, 10.5, `<div class="doc" data-in="fadeup .1 .6"><div class="doc-h"><b>Dealer quote</b><span>Example</span></div>${docRows([
    ['Vehicle price', '$38,450', '', .6], ['Doc fee', '$899', '', 1.0], ['Appearance package', '$1,995', '<span class="flag">ASK</span>', 1.4], ['Nitrogen fill', '$299', '<span class="flag">ASK</span>', 1.8], ['Taxes, tag and title', 'Itemized', '', 2.2]])}</div>
    <p class="sub" data-in="fadeup 3.6 .6"><b>Reviewed by hand.</b> You hear what holds up and what to question.</p>`),
  sc(10.5, 15.5, `<div class="kicker" data-in="fadeup 0 .5">How it works</div><div class="stack" style="gap:34px">${[['Send your quote', 'Type in the key numbers'], ['We review it by hand', 'Price, fees, add-ons and trade-in'], ['We follow up', 'By phone, text or email']].map(([a, b], k) => `<div class="step" data-in="left ${0.4 + k * 0.7} .5"><span class="n">${k + 1}</span><div><div style="font:800 56px/1.1 var(--display);color:var(--ink);letter-spacing:-.02em">${a}</div><div class="small">${b}</div></div></div>`).join('')}</div>`),
  ctaScene(15.5, 22, { dark: false, h: 'Free. <em>No obligation.</em>', sub: 'Type in the key numbers from your dealer quote. We review it by hand.', btn: 'Review my quote', url: 'mycleardeal.com' }),
].join('') };

// 5. The written out-the-door recap
R['05-written-recap'] = { bg: 'mint', dur: 22, cover: 12.5, caps: [
  [0, 3.5, 'Before you sign anything'], [3.5, 8.5, 'You get a written out-the-door recap'], [8.5, 14, 'Every number on one page. You approve it.'],
  [14, 18, 'Not happy with it? We keep working.'], [18, 22, 'Start with a free call at mycleardeal.com']], html: [
  sc(0, 3.5, `${brandRow(false)}<h1 class="h xl" data-in="fadeup .3 .6">See every number <em class="hl">before you sign.</em></h1>`),
  sc(3.5, 14, `<div class="doc" data-in="fadeup .1 .6"><div class="doc-h"><b>Your deal recap</b><span>Example deal</span></div>${docRows([
    ['Vehicle price', '$38,450', '', .8], ['Doc fee', '$899', '', 1.6], ['Add-ons', '$0', '', 2.4], ['Taxes, tag and title', '$1,645', '', 3.2], ['Out-the-door', '$40,994', '', 4.2, 'total'], ['Trade-in', '$16,100', '', 5.2]])}
    <span class="stamp" data-in="pop 6.6 .5">Approve recap</span></div>`),
  sc(14, 18, `${ico('check')}<h2 class="h" data-in="fadeup .2 .6">Nothing moves <em>without your OK.</em></h2><p class="sub" data-in="fadeup .7 .6">Not happy with the recap? We keep working.</p>`),
  ctaScene(18, 23, { dark: false, h: 'We negotiate. <em>You just sign.</em>', sub: 'Book a free consultation call. $995 flat, $0 for heroes.', btn: 'Start my deal', url: 'mycleardeal.com/start' }),
].join('') };


// Dedicated cover frames (no caption bar): headline + one visual, readable in the profile grid's 3:4 crop.
const cov = (html) => `<section class="scene" data-t="0 999" style="justify-content:center">${html}</section>`;
const heroCover = (es) => cov(`${brandRow(true, es ? 'es' : 'en')}<div class="kicker">${es ? 'Nuevo: Programa Héroes' : 'New: the Hero Program'}</div>
  <div class="price" style="align-items:center"><span class="was" data-strike="0 .01">$995</span><span class="now"><sup>$</sup>0</span></div>
  <h1 class="h md">${es ? 'Ayuda gratis para comprar auto <em>para quienes sirven.</em>' : 'Free car buying help <em>for those who serve.</em>'}</h1>`);
R['01-hero-program-announcement'].coverHtml = heroCover(false);
R['01-hero-program-announcement-es'].coverHtml = heroCover(true);
R['02-five-jobs'].coverHtml = cov(`${brandRow(false)}<h1 class="h"><span style="color:var(--accent)">5</span> jobs that get a <em class="hl">free car negotiator.</em></h1>
  <div class="chips"><span>Firefighters</span><span>Law enforcement</span><span>Medical field</span><span>Teachers</span><span>Military</span></div>`);
R['03-three-things-we-negotiate'].coverHtml = cov(`${brandRow(false)}<h1 class="h xl">We negotiate <em class="hl">3 things.</em></h1>
  <div class="stack" style="gap:20px">${[['tag', 'The vehicle price'], ['receipt', 'Dealer fees'], ['swap', 'Your trade-in']].map(([i, t], k) => `<div class="row2">${ico(i)}<b style="font:800 64px var(--display);color:var(--ink);letter-spacing:-.03em">${k + 1}. ${t}</b></div>`).join('')}</div>`);
R['04-send-us-your-quote'].coverHtml = cov(`${brandRow(false)}<div class="kicker">Free quote review</div><h1 class="h xl">Got a dealer quote? <em class="hl">Send it to us.</em></h1>
  <p class="sub"><b>Reviewed by hand, free.</b> No obligation.</p>`);
R['05-written-recap'].coverHtml = cov(`${brandRow(false)}<h1 class="h xl">See every number <em class="hl">before you sign.</em></h1>
  <div class="doc"><div class="doc-h"><b>Your deal recap</b><span>In writing</span></div>${docRows([['Vehicle price', '$38,450'], ['Out-the-door', '$40,994', '', 0, 'total']])}<span class="stamp">Approve recap</span></div>`);

// Page wrapper with the timeline engine. seek(t) puts every element exactly where it belongs at time t.
const ENGINE = `
const cl = (x) => Math.max(0, Math.min(1, x));
const out3 = (x) => 1 - Math.pow(1 - x, 3);
const back = (x) => { const c = 1.6; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
window.seek = (t) => {
  document.querySelectorAll('.scene').forEach((s) => {
    const [a, b] = s.dataset.t.split(' ').map(Number);
    const on = t >= a && t < b;
    s.style.visibility = on ? 'visible' : 'hidden';
    const fi = a === 0 ? 1 : cl((t - a) / 0.3), fo = cl((b - t) / 0.3);
    s.style.opacity = on ? Math.min(fi, fo) : 0;
    const lt = t - a;
    s.querySelectorAll('[data-in]').forEach((el) => {
      const [type, d, du] = el.dataset.in.split(' '); const x = a === 0 ? 1 : cl((lt - +d) / +du), p = out3(x);
      if (type === 'fadeup') { el.style.opacity = p; el.style.transform = 'translateY(' + (1 - p) * 46 + 'px)'; }
      else if (type === 'left') { el.style.opacity = p; el.style.transform = 'translateX(' + (1 - p) * -70 + 'px)'; }
      else if (type === 'pop') { el.style.opacity = cl(x * 2); el.style.transform = 'scale(' + (x > 0 ? 0.55 + 0.45 * back(x) : 0.55) + ')'; el.style.transformOrigin = 'left center'; }
    });
    s.querySelectorAll('[data-strike]').forEach((el) => { const [d, du] = el.dataset.strike.split(' ').map(Number); el.style.setProperty('--s', out3(cl((lt - d) / du))); });
    s.querySelectorAll('[data-count]').forEach((el) => { const [f, to, d, du] = el.dataset.count.split(' ').map(Number); const p = out3(cl((lt - d) / du)); el.textContent = Math.round(f + (to - f) * p); });
  });
  const cap = (window.CAPS || []).find((c) => t >= c[0] && t < c[1]);
  const box = document.querySelector('.cap span');
  if (cap) { const p = out3(cl((t - cap[0]) / 0.25)); box.style.visibility = 'visible'; box.textContent = cap[2]; box.style.opacity = p; box.style.transform = 'translateY(' + (1 - p) * 14 + 'px)'; }
  else box.style.visibility = 'hidden';
};`;
const reelPage = (r) => `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="base.css"><style>.was::after{transform:rotate(-8deg) scaleX(var(--s,0))}</style></head><body>
<div class="frame reel bg-${r.bg}">${r.html}<div class="cap"><span></span></div></div>
<script>window.CAPS=${JSON.stringify(r.caps)};${ENGINE}</script></body></html>`;

module.exports = { R, reelPage };
