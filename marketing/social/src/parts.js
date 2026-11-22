// Shared building blocks for MyClearDeal posts and reels. Logo mark is the same SVG the site header uses.
const MARK = (dark) => `<svg viewBox="70 61 220 220" aria-hidden="true"><circle cx="158" cy="149" r="75" fill="none" stroke="${dark ? '#FFFFFF' : '#0F2D24'}" stroke-width="25"/><path d="M211 202L271 262" stroke="${dark ? '#FFFFFF' : '#0F2D24'}" stroke-width="32"/><circle cx="271" cy="262" r="16" fill="${dark ? '#FFFFFF' : '#0F2D24'}"/><path d="M124 153L150 179L196 126" fill="none" stroke="#1DB87A" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const BRAND = (dark, lang = 'en') => `<div class="brand">${MARK(dark)}<div class="bn"><b>My<i>Clear</i>Deal</b><small>${lang === 'es' ? 'Comprar auto, claro y sencillo' : 'Car Buying Made Clear'}</small></div></div>`;
const ARROW = `<svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>`;

// Simple line icons (drawn for this set, 24x24 grid).
const I = {
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  handshake: '<path d="M2 11l4-4 4 2 3-2 4 1 5 4"/><path d="M6 13l4 4a1.5 1.5 0 0 0 2-2"/><path d="M9 16l2 2a1.5 1.5 0 0 0 2-2l-1-1"/><path d="M13 15l1 1a1.5 1.5 0 0 0 2-2l-3-3"/><path d="M2 11l3 3"/><path d="M22 12l-3 3"/>',
  chart: '<path d="M4 20V4"/><path d="M4 20h16"/><path d="M7 15l4-4 3 3 5-6"/><path d="M15 8h4v4"/>',
  doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M10 13h6"/><path d="M10 17h6"/>',
  pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/><path d="M4 20h16"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
  receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h3"/>',
  swap: '<path d="M4 8h13"/><path d="M14 5l3 3-3 3"/><path d="M20 16H7"/><path d="M10 13l-3 3 3 3"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8"/><path d="M8 13h5"/>',
  car: '<path d="M3 16v-4l2-5h14l2 5v4"/><path d="M3 16h18v3H3z"/><circle cx="7" cy="16" r="1.5"/><circle cx="17" cy="16" r="1.5"/><path d="M6 12h12"/>',
  flame: '<path d="M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4 2-7 2 1 3 3 3 5 1-2 1-5 1-9z"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M12 8l1.2 2.5 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4z"/>',
  medical: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
  book: '<path d="M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1z"/><path d="M12 6v14"/>',
  star: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
  id: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c1-2 5-2 6 0"/><path d="M14 10h4"/><path d="M14 13h4"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><path d="M12 15v2"/>',
  heart: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 6-8 11-8 11z"/>',
  send: '<path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
};
const ico = (k, cls = '') => `<div class="ico ${cls}"><svg viewBox="0 0 24 24">${I[k]}</svg></div>`;

// One carousel slide: logo + count on top, content, footer (swipe on slide 1, dots in between, web address on the last)
function post({ bg = 'mint', i, n, lang = 'en', body, foot }) {
  const dark = bg === 'deep';
  const dots = `<div class="dots">${Array.from({ length: n }, (_, k) => `<i class="${k === i - 1 ? 'on' : ''}"></i>`).join('')}</div>`;
  const swipe = `<span class="swipe">${lang === 'es' ? 'Desliza' : 'Swipe'} ${ARROW}</span>`;
  const f = foot != null ? foot : i === 1 ? `<span>mycleardeal.com</span>${swipe}` : i === n ? `<span>mycleardeal.com</span>${dots}` : `<span>mycleardeal.com</span>${dots}`;
  return `<div class="frame post bg-${bg}"><div class="top">${BRAND(dark, lang)}<span class="count">${i}/${n}</span></div><div class="body">${body}</div><div class="foot">${f}</div></div>`;
}
const page = (inner, extraCss = '') => `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="base.css"><style>${extraCss}</style></head><body>${inner}</body></html>`;

module.exports = { MARK, BRAND, ARROW, I, ico, post, page };
