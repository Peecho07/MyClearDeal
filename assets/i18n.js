/* MyClearDeal | English / Spanish toggle.
   English is the page source. Spanish swaps visible text using assets/i18n-es.js (keys = English text).
   The choice is remembered in this browser; ?lang=es or ?lang=en in the URL also works. */
(function () {
  var KEY = "mcd-lang", root = document.documentElement, lang = "en";
  try {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "es" || q === "en") { lang = q; localStorage.setItem(KEY, q); }
    else lang = localStorage.getItem(KEY) === "es" ? "es" : "en";
  } catch (e) {}

  // Hide the page for a moment in Spanish mode so English doesn't flash first.
  if (lang === "es") {
    root.lang = "es";
    root.classList.add("i18n-wait");
    setTimeout(function () { root.classList.remove("i18n-wait"); }, 1500);
  }

  var D = null;
  var PATTERNS = [
    [/^(\d+) of (\d+) steps done$/, "$1 de $2 pasos listos"],
    [/^Step (\d+) of (\d+)$/, "Paso $1 de $2"],
    [/^1 red flag found$/, "1 señal de alerta"],
    [/^(\d+) red flags found$/, "$1 señales de alerta"],
    [/^Usually within (.+)$/, "Normalmente en $1"],
    [/^Email us at (.+)$/, "Escríbenos a $1"],
    [/^(\d+) months at (.+)% APR$/, "$1 meses con una tasa anual (APR) de $2%"],
    [/^You can look at cars up to about (.+) \(out-the-door about (.+)\)\.$/, "Puedes buscar autos de hasta unos $1 (precio final de unos $2)."]
  ];
  var ATTRS = ["placeholder", "aria-label", "title", "alt", "data-success"];
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1 };

  function tr(s) {
    var k = s.replace(/\s+/g, " ").trim();
    if (!k || !/[A-Za-z]/.test(k)) return null;
    var v = D[k];
    if (v == null) {
      for (var i = 0; i < PATTERNS.length; i++) if (PATTERNS[i][0].test(k)) { v = k.replace(PATTERNS[i][0], PATTERNS[i][1]); break; }
    }
    if (v == null || v === k) return null;
    return (s.match(/^\s*/)[0]) + v + (s.match(/\s*$/)[0]);
  }
  function skip(el) {
    for (; el && el !== document.body; el = el.parentElement) {
      if (SKIP[el.tagName] || el.hasAttribute("data-no-i18n")) return true;
    }
    return false;
  }
  function doText(n) {
    if (skip(n.parentElement)) return;
    var v = tr(n.nodeValue);
    if (v != null) n.nodeValue = v;
  }
  function doEl(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i], val = el.getAttribute && el.getAttribute(a);
      if (val) { var v = tr(val); if (v != null) el.setAttribute(a, v.trim()); }
    }
  }
  function walk(node) {
    if (node.nodeType === 3) { doText(node); return; }
    if (node.nodeType !== 1 || skip(node)) return;
    doEl(node);
    node.querySelectorAll("*").forEach(doEl);
    var w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT), n, list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(doText);
  }
  var busy = false;
  function apply() {
    busy = true;
    var t = tr(document.title); if (t) document.title = t.trim();
    var md = document.querySelector('meta[name="description"]');
    if (md) { var d = tr(md.content); if (d) md.content = d.trim(); }
    walk(document.body);
    busy = false;
    // Keep text that scripts change later (form status, counters) in Spanish.
    new MutationObserver(function (muts) {
      if (busy) return;
      busy = true;
      muts.forEach(function (m) {
        if (m.type === "characterData") doText(m.target);
        else if (m.type === "attributes") doEl(m.target);
        else m.addedNodes.forEach(walk);
      });
      busy = false;
    }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    root.classList.remove("i18n-wait");
    // Let width-measuring widgets (the rotating word) re-measure the Spanish text.
    window.dispatchEvent(new Event("resize"));
  }

  function load(cb) {
    if (window.MCD_ES) { D = window.MCD_ES; cb(); return; }
    var s = document.createElement("script");
    s.src = "assets/i18n-es.js";
    s.onload = function () { D = window.MCD_ES || {}; cb(); };
    s.onerror = function () { root.classList.remove("i18n-wait"); };
    document.head.appendChild(s);
  }

  function setButtons() {
    document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
      b.setAttribute("data-no-i18n", "");
      b.textContent = lang === "es" ? "EN" : "ES";
      b.setAttribute("lang", lang === "es" ? "en" : "es");
      b.setAttribute("aria-label", lang === "es" ? "View this page in English" : "Ver esta página en español");
      b.title = b.getAttribute("aria-label");
    });
  }

  function ready() {
    setButtons();
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-lang-toggle]");
      if (!b) return;
      var next = lang === "es" ? "en" : "es";
      try { localStorage.setItem(KEY, next); } catch (err) {}
      if (next === "en") {
        // Drop ?lang=es so the page doesn't switch back on reload.
        var u = new URL(location.href); u.searchParams.delete("lang");
        location.replace(u.toString());
        return;
      }
      lang = "es"; root.lang = "es";
      load(function () { apply(); setButtons(); });
    });
    if (lang === "es") load(apply);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();
})();
