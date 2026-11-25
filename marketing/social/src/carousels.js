// Carousel copy and layouts, planned with ig-carousel-planner (.claude/skills): slide 1 = promise + open loop,
// numbered value slides, last slide = one-slide recap (the saveable artifact) + exactly one ask.
// Facts match .claude/references/mycleardeal-brand.md (live site, Nov 25, 2026).
const { ARROW, I, ico, post } = require('./parts');

const svg = (k) => `<svg viewBox="0 0 24 24">${I[k]}</svg>`;
// Payoff slide. ask: { save | send | btn } -> one ask only. url is shown as information, not a second ask.
const payoff = (o) => post({ bg: 'deep', ...o, body: `
  <div class="kicker">${o.kicker}</div>
  <h2 class="h ${o.hs || 'sm'}">${o.h}</h2>
  <ul class="checks compact${o.numbered ? ' num' : ''}">${o.recap.map((x) => `<li>${x}</li>`).join('')}</ul>
  ${o.save ? `<span class="ask">${svg('bookmark')} ${o.save}</span>` : o.send ? `<span class="ask">${svg('send')} ${o.send}</span>` : `<span class="btn">${o.btn} ${ARROW}</span>`}
  <span class="url-sm">${o.url}</span>` });
// Numbered item header for list slides: "1 of 6" style badge + label
const num = (k, total, label, lang = 'en') => `<div class="step"><span class="n">${k}</span><span class="l">${label}<br><span style="font-size:24px;opacity:.75">${lang === 'es' ? `${k} de ${total}` : `${k} of ${total}`}</span></span></div>`;

const C = {};

// 1. How it works  (IG8 framework, goal: saves)
C['01-how-it-works'] = (() => { const n = 7; return [
  post({ i: 1, n, body: `<div class="kicker">5 steps, couch to driveway</div>
    <h1 class="h xl">We negotiate.<br><em class="hl">You just sign.</em></h1>
    <p class="sub">How we buy your next car with you. Step 4 is where you see every number in writing, before you agree to anything.</p>` }),
  post({ i: 2, n, body: `${num(1, 5, 'Free consultation call')}
    <h2 class="h md">We start with <em>your plan.</em></h2>
    <p class="sub">A short call about the car, your budget, your trade-in and your timeline. No cost, no obligation.</p>${ico('phone')}` }),
  post({ i: 3, n, bg: 'alt', body: `${num(2, 5, 'We negotiate for you')}
    <h2 class="h md">Price, fees <em>and trade-in.</em></h2>
    <p class="sub">We work the whole deal with dealers by phone and email while you go about your day.</p>
    <div class="chips"><span>Vehicle price</span><span>Dealer fees</span><span>Trade-in</span></div>` }),
  post({ i: 4, n, body: `${num(3, 5, 'We check the numbers')}
    <h2 class="h md">Every price, checked against <em>market data.</em></h2>
    <p class="sub">You see where the number sits before you say yes.</p>${ico('chart')}` }),
  post({ i: 5, n, bg: 'alt', body: `${num(4, 5, 'You approve the recap')}
    <h2 class="h sm">A written out-the-door recap <em>before you agree.</em></h2>
    <div class="doc"><div class="doc-h"><b>Your deal recap</b><span>Example deal</span></div>
      <div class="row"><span>Vehicle price</span><b>$38,450</b></div>
      <div class="row"><span>Fees itemized</span><b>$899</b></div>
      <div class="row"><span>Trade-in</span><b>$16,100</b></div>
      <span class="stamp">Approve recap</span></div><p class="small">Nothing moves without your OK.</p>` }),
  post({ i: 6, n, body: `${num(5, 5, 'You sign')}
    <h2 class="h md">One trip to the dealer. <em>Just to sign.</em></h2>
    <p class="sub">Phone support until you drive away, plus text and email.</p>${ico('pen')}` }),
  payoff({ i: 7, n, kicker: 'The whole process on one slide', h: 'We negotiate. <em>You just sign.</em>', numbered: true,
    recap: ['A free call to build your plan', 'We negotiate price, fees and trade-in', 'Every number checked against market data', 'You approve a written out-the-door recap', 'One trip to the dealer, to sign'],
    save: 'Save this for your next car', url: 'mycleardeal.com/start <span>· $995 flat, $0 for heroes</span>' }),
]; })();

// 2. What $995 gets you  (IG5 listicle, goal: saves)
C['02-what-995-gets-you'] = (() => { const n = 8; return [
  post({ i: 1, n, body: `<div class="kicker">Done For You</div>
    <h1 class="h xl">One car.<br><em class="hl">One flat $995.</em></h1>
    <p class="sub">6 things that one fee covers, one per slide. Number 3 costs you nothing extra.</p>` }),
  post({ i: 2, n, body: `${num(1, 6, 'Your plan')}<h2 class="h md">A free consultation call <em>to build your plan.</em></h2><p class="sub">The car, the budget, the trade and the timeline, set before any work starts.</p>${ico('phone')}` }),
  post({ i: 3, n, bg: 'alt', body: `${num(2, 6, 'The negotiation')}<h2 class="h md">We negotiate <em>the whole deal.</em></h2>
    <ul class="checks"><li>Vehicle price</li><li>Dealer fees and add-ons</li><li>Your trade-in</li></ul>` }),
  post({ i: 4, n, body: `${num(3, 6, 'Your trade-in')}<h2 class="h md">Trade-in included. <em>No extra charge.</em></h2><p class="sub">We keep it separate from the new car, so a low trade offer can't hide behind a big discount.</p>${ico('swap')}` }),
  post({ i: 5, n, bg: 'alt', body: `${num(4, 6, 'The market check')}<h2 class="h md">Price checked against <em>market data.</em></h2><p class="sub">You know where the number sits before you agree to it.</p>${ico('chart')}` }),
  post({ i: 6, n, body: `${num(5, 6, 'The written recap')}<h2 class="h md">A written out-the-door recap <em>before you agree.</em></h2><p class="sub">Every number on one page. Nothing moves without your OK.</p>${ico('doc')}` }),
  post({ i: 7, n, bg: 'alt', body: `${num(6, 6, 'The support')}<h2 class="h md">Support until <em>you drive away.</em></h2>
    <ul class="checks"><li>Phone, plus text and email</li><li>New or used</li><li>Buy or lease</li></ul>` }),
  payoff({ i: 8, n, kicker: 'What $995 covers, on one slide', h: 'Same fee for everyone. <em>No % of savings.</em>', numbered: true,
    recap: ['A free consultation call', 'Price, fees and trade-in negotiated', 'Trade-in at no extra charge', 'Price checked against market data', 'A written out-the-door recap', 'Support until you drive away'],
    save: 'Save this before you shop', url: 'mycleardeal.com/start <span>· heroes pay $0</span>' }),
]; })();

// 3. Dealer vs. MyClearDeal  (IG7 myth-buster, goal: sends)
const vs = (o) => post({ ...o, body: `${num(o.k, 5, o.label)}<h2 class="h sm">${o.h}</h2>
  <div class="vs"><div class="them"><span class="who">At the dealer</span><p>${o.them}</p></div><div class="us"><span class="who">With MyClearDeal</span><p>${o.us}</p></div></div>` });
C['03-dealer-vs-mycleardeal'] = (() => { const n = 7; return [
  post({ i: 1, n, bg: 'deep', body: `<div class="kicker">5 places buyers overpay</div>
    <h1 class="h xl">What the dealer hopes <em>you miss.</em></h1>
    <p class="sub">And what we do about each one. Number 3 hides inside a good-looking discount.</p>` }),
  vs({ i: 2, n, k: 1, label: 'Fees and add-ons', h: 'Extras you <em>never asked for.</em>', them: 'Pre-printed packages and padded fees on the quote.', us: 'We itemize every line and challenge what does not belong.' }),
  vs({ i: 3, n, bg: 'alt', k: 2, label: 'Market price', h: 'A price with <em>nothing to compare.</em>', them: 'You see one number and no way to check it.', us: 'We check it against market data before you agree.' }),
  vs({ i: 4, n, k: 3, label: 'Trade-in', h: 'A discount <em>paid for by your trade.</em>', them: 'A big discount on the new car, funded by a low trade-in offer.', us: 'We keep the trade separate and backed by market value.' }),
  vs({ i: 5, n, bg: 'alt', k: 4, label: 'The total', h: 'The real number <em>shows up late.</em>', them: 'The out-the-door total appears when you sit down to sign.', us: 'You get a written out-the-door recap before you agree.' }),
  vs({ i: 6, n, k: 5, label: 'Who gets paid', h: 'Who is <em>on your side?</em>', them: 'The salesperson is paid by the dealer.', us: 'You pay us a flat fee. The dealer never pays us.' }),
  payoff({ i: 7, n, kicker: 'The 5 fixes, on one slide', h: 'Read every line <em>before you sign.</em>', numbered: true,
    recap: ['Itemize every fee and add-on', 'Check the price against market data', 'Keep the trade-in separate', 'Get the out-the-door total in writing first', 'Work with someone the dealer does not pay'],
    send: 'Send this to a friend about to sign', url: 'mycleardeal.com <span>· free dealer quote review</span>' }),
]; })();

// 4. Hero Program launch (EN + ES)  (IG5 listicle, goal: saves, ends on the claim)
const HERO = {
  en: { k: 'New: the Hero Program', h1: 'Free car buying help <em>for those who serve.</em>', note: 'Our full $995 service, yours for $0. Swipe to see if you qualify, and the one thing we ask in return.',
    s2k: 'What you get', s2h: 'The full Done For You service. <em>At no cost.</em>', s2l: ['Same negotiation: price, fees and trade-in', 'Same written out-the-door recap', 'Same support until you drive away'],
    s3k: 'Who qualifies', s3h: 'Five fields. <em>Active or retired.</em>', chips: ['Firefighters', 'Law enforcement', 'Medical field', 'Teachers', 'Military'], s3n: 'Veterans qualify.',
    s4k: 'How to claim it', s4h: 'Three steps to <em>your Hero deal.</em>', steps: [['Book through the Hero Program option', 'Before any work starts'], ['Show one proof of service', 'On your free consultation call'], ['We negotiate, you approve', 'A written recap before you agree']],
    s5k: 'Your proof stays private', s5h: 'Used to confirm you qualify. <em>Never shared with a dealer.</em>', s5l: ['Work ID or badge', 'Current license', 'Recent pay stub', 'Military ID, VA card or DD-214'],
    s6k: 'What we ask in return', s6h: 'If we did right by you, <em>pass it on.</em>', s6l: ['Tell a friend who is shopping for a car', 'Leave an honest review'], s6n: 'Nothing is required. That is how this program keeps going.',
    pk: 'The Hero Program on one slide', ph: '$995 service. <em>$0 for you.</em>',
    recap: ['Firefighters, law enforcement, medical, teachers, military', 'Active or retired. Veterans qualify.', 'One proof of service on your free call', 'One car for your household, one deal per person'],
    btn: 'Claim my Hero deal', url: 'mycleardeal.com/start?plan=hero' },
  es: { k: 'Nuevo: Programa Héroes', h1: 'Ayuda gratis para comprar auto <em>para quienes sirven.</em>', note: 'Nuestro servicio completo de $995, para ti a $0. Desliza para ver si calificas, y lo único que pedimos a cambio.',
    s2k: 'Lo que recibes', s2h: 'El servicio completo Done For You. <em>Sin costo.</em>', s2l: ['La misma negociación: precio, cargos e intercambio', 'El mismo resumen por escrito del precio final', 'El mismo apoyo hasta que te lleves tu auto'],
    s3k: 'Quién califica', s3h: 'Cinco áreas. <em>Activos o jubilados.</em>', chips: ['Bomberos', 'Agentes del orden', 'Área médica', 'Maestros', 'Militares'], s3n: 'Los veteranos califican.',
    s4k: 'Cómo obtenerlo', s4h: 'Tres pasos para <em>tu oferta Héroes.</em>', steps: [['Reserva con la opción Programa Héroes', 'Antes de empezar cualquier trabajo'], ['Muestra una prueba de servicio', 'En tu llamada de consulta gratis'], ['Nosotros negociamos, tú apruebas', 'Un resumen por escrito antes de aceptar']],
    s5k: 'Tu prueba es privada', s5h: 'Solo para confirmar que calificas. <em>Nunca se comparte con un concesionario.</em>', s5l: ['Identificación o placa de trabajo', 'Licencia vigente', 'Talón de pago reciente', 'Identificación militar, tarjeta de la VA o DD-214'],
    s6k: 'Lo que pedimos a cambio', s6h: 'Si te ayudamos bien, <em>pásalo.</em>', s6l: ['Cuéntale a un amigo que esté buscando auto', 'Deja una reseña honesta'], s6n: 'No se requiere nada. Así este programa sigue adelante.',
    pk: 'El Programa Héroes en una diapositiva', ph: 'Servicio de $995. <em>Para ti, $0.</em>',
    recap: ['Bomberos, agentes del orden, área médica, maestros, militares', 'Activos o jubilados. Los veteranos califican.', 'Una prueba de servicio en tu llamada gratis', 'Un auto para tu hogar, una oferta por persona'],
    btn: 'Obtener mi oferta Héroes', url: 'mycleardeal.com/start?plan=hero' },
};
const heroCarousel = (lang) => { const t = HERO[lang], n = 7; return [
  post({ i: 1, n, lang, bg: 'deep', body: `<div class="kicker">${t.k}</div>
    <div class="price"><span class="was">$995</span><span class="now"><sup>$</sup>0</span></div>
    <h1 class="h md">${t.h1}</h1><p class="sub">${t.note}</p>` }),
  post({ i: 2, n, lang, body: `<div class="kicker">${t.s2k}</div><h2 class="h md">${t.s2h}</h2><ul class="checks">${t.s2l.map((x) => `<li>${x}</li>`).join('')}</ul>` }),
  post({ i: 3, n, lang, bg: 'alt', body: `<div class="kicker">${t.s3k}</div><h2 class="h md">${t.s3h}</h2>
    <div class="grid2">${t.chips.map((c, k) => `<div class="tile">${ico(['flame', 'shield', 'medical', 'book', 'star'][k])}<b>${c}</b></div>`).join('')}<div class="tile" style="background:var(--ink);border-color:var(--ink);align-content:center"><b style="color:var(--mint-pop);font-size:44px">${t.s3n}</b></div></div>` }),
  post({ i: 4, n, lang, body: `<div class="kicker">${t.s4k}</div><h2 class="h md">${t.s4h}</h2>
    <div class="stack">${t.steps.map((s, k) => `<div class="step"><span class="n">${k + 1}</span><div><div style="font:800 40px/1.15 var(--display);color:var(--ink)">${s[0]}</div><div class="small">${s[1]}</div></div></div>`).join('')}</div>` }),
  post({ i: 5, n, lang, bg: 'alt', body: `${ico('lock')}<div class="kicker">${t.s5k}</div><h2 class="h sm">${t.s5h}</h2><ul class="checks">${t.s5l.map((x) => `<li>${x}</li>`).join('')}</ul>` }),
  post({ i: 6, n, lang, body: `${ico('heart')}<div class="kicker">${t.s6k}</div><h2 class="h md">${t.s6h}</h2><ul class="checks">${t.s6l.map((x) => `<li>${x}</li>`).join('')}</ul><p class="small">${t.s6n}</p>` }),
  payoff({ i: 7, n, lang, kicker: t.pk, h: t.ph, recap: t.recap, btn: t.btn, url: t.url }),
]; };
C['04-hero-program-launch'] = heroCarousel('en');
C['04-hero-program-launch-es'] = heroCarousel('es');

// 5. Do I qualify?  (IG5 listicle, goal: saves)
const field = (o) => post({ ...o, body: `<div class="kicker">${o.k}</div>${o.items.map(([ic, h, d, p]) => `<div class="card" style="padding:34px 40px"><div class="row2">${ico(ic)}<div class="stack" style="gap:8px"><b style="font:800 46px/1.05 var(--display);color:var(--ink);letter-spacing:-.02em">${h}</b><span class="small" style="color:var(--ink-2)">${d}</span><span class="small"><b style="color:var(--green-text)">Proof:</b> ${p}</span></div></div></div>`).join('')}` });
C['05-do-i-qualify'] = (() => { const n = 7; return [
  post({ i: 1, n, body: `<div class="kicker">Hero Program</div>
    <h1 class="h xl">Do you qualify for a <em class="hl">$0 car negotiator?</em></h1>
    <p class="sub">5 fields, 4 kinds of proof, 3 simple rules. Retirees and veterans included.</p>` }),
  field({ i: 2, n, k: 'The 5 fields (1 to 3)', items: [
    ['flame', '1. Firefighters', 'Career and volunteer, active or retired.', 'department ID or a recent pay stub.'],
    ['shield', '2. Law enforcement', 'Police, sheriff\'s deputies, state troopers and corrections officers.', 'agency ID or a recent pay stub.'],
    ['medical', '3. Medical field', 'Nurses, doctors, EMTs, paramedics and other licensed healthcare workers.', 'a current license or employer ID.']] }),
  field({ i: 3, n, bg: 'alt', k: 'The 5 fields (4 and 5)', items: [
    ['book', '4. Teachers', 'Pre-K through college, public and private schools, active or retired.', 'school ID or a recent pay stub.'],
    ['star', '5. Military', 'Active duty, Reserve, National Guard and veterans. Every branch.', 'military ID, VA card or DD-214.']] }),
  post({ i: 4, n, body: `${ico('id')}<div class="kicker">4 kinds of proof</div><h2 class="h md">Bring one. <em>Show it on your free call.</em></h2>
    <ul class="checks num"><li>A work ID or badge</li><li>A current license</li><li>A recent pay stub</li><li>A military ID, VA card or DD-214</li></ul>` }),
  post({ i: 5, n, bg: 'alt', body: `<div class="kicker">3 rules</div><h2 class="h md">Simple, and <em>the same for everyone.</em></h2>
    <ul class="checks num"><li>One car<span>Bought or leased for your own household</span></li><li>One Hero deal per person</li><li>Book through the Hero Program option<span>Before any work starts</span></li></ul>` }),
  post({ i: 6, n, body: `${ico('lock')}<div class="kicker">Your privacy</div><h2 class="h md">Your proof <em>stays with us.</em></h2><p class="sub">We only use it to confirm you qualify. It is never shared with a dealer.</p>` }),
  payoff({ i: 7, n, kicker: 'Do I qualify? On one slide', h: 'Five fields. <em>One proof.</em>',
    recap: ['Firefighters, law enforcement, medical, teachers, military', 'Active or retired. Veterans qualify.', 'One proof: ID, badge, license, pay stub, VA card or DD-214', 'One car for your household, booked before work starts'],
    save: 'Save this for when you shop', url: 'mycleardeal.com/start?plan=hero' }),
]; })();

// 6. Send this to a hero  (IG2 send-bait, goal: sends)
C['06-send-to-a-hero'] = (() => { const n = 6; return [
  post({ i: 1, n, bg: 'deep', body: `<div class="kicker">Send this to a hero</div>
    <h1 class="h">Know a nurse, teacher, firefighter, officer or vet <em>shopping for a car?</em></h1>
    <p class="sub">Send them this. Their car negotiator is on us.</p>` }),
  post({ i: 2, n, body: `<div class="kicker">Hero Program</div><div class="price"><span class="was">$995</span><span class="now"><sup>$</sup>0</span></div>
    <h2 class="h md">We negotiate their next car. <em>They pay us nothing.</em></h2>` }),
  post({ i: 3, n, bg: 'alt', body: `<div class="kicker">What they get</div><h2 class="h md">The same service <em>everyone else pays for.</em></h2>
    <ul class="checks"><li>Price, fees and trade-in negotiated</li><li>Checked against market data</li><li>A written out-the-door recap</li><li>Phone, text and email support</li></ul>` }),
  post({ i: 4, n, body: `<div class="kicker">Who to send it to</div><h2 class="h md">Active or retired. <em>Veterans too.</em></h2>
    <div class="chips"><span>Firefighters</span><span>Law enforcement</span><span>Nurses, EMTs and doctors</span><span>Teachers</span><span>Military</span><span>Veterans</span></div>` }),
  post({ i: 5, n, bg: 'alt', body: `${ico('heart')}<div class="kicker">How this keeps going</div><h2 class="h md">Every hero we help <em>sends the next one.</em></h2>
    <p class="sub">If we did right by them, all we ask is that they tell a friend who is shopping for a car and leave an honest review.</p>` }),
  payoff({ i: 6, n, kicker: 'One Hero deal per person', h: 'Send this to a hero <em>you know.</em>',
    recap: ['Our $995 negotiation service, $0 for them', 'Firefighters, law enforcement, medical, teachers, military', 'Active or retired, veterans too', 'They show one proof of service on a free call'],
    send: 'Send it to them now', url: 'mycleardeal.com/start?plan=hero' }),
]; })();

module.exports = C;
