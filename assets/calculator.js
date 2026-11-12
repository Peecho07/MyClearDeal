/* MyClearDeal | Deal calculator (/calculator). Plain JS, no libraries, no network calls.
   Estimates only. MyClearDeal is not a lender and does not arrange financing. */
(function () {
  "use strict";

  /* Florida rule: the county discretionary surtax applies only to the first $5,000 of a single sale. */
  var SURTAX_CAP = 5000;

  /* County surtax defaults (%). Confirm current rates with the Florida Department of Revenue
     (floridarevenue.com, "Discretionary Sales Surtax") before launch; rates change on January 1. */
  var COUNTIES = {
    "Orange": 0.5, "Seminole": 1, "Osceola": 1.5, "Lake": 1, "Polk": 1, "Brevard": 1,
    "Volusia": 0.5, "Palm Beach": 1, "Broward": 1, "Miami-Dade": 1, "Hillsborough": 1.5, "Other / not sure": 1
  };

  /* ---------- Math (pure functions, no DOM) ---------- */

  // Taxes and out-the-door price for a given vehicle price.
  function priceBreakdown(v) {
    // Trade-in allowance lowers the taxable price; the doc fee is taxable in Florida.
    // Rebates are NOT subtracted here (treated as taxable; owner to confirm).
    var taxable = Math.max(0, v.price + v.addOns + v.docFee - v.tradeValue);
    var stateTax = taxable * v.statePct / 100;
    var surtax = Math.min(taxable, SURTAX_CAP) * v.countyPct / 100;
    var tax = stateTax + surtax;
    // Out-the-door is before the trade, the down payment and rebates are applied.
    var otd = v.price + v.addOns + v.docFee + tax + v.tagTitle;
    return { taxable: taxable, stateTax: stateTax, surtax: surtax, tax: tax, otd: otd };
  }

  // Monthly payment on an amortized loan: P * r / (1 - (1 + r)^-n), r = APR/100/12. APR 0 means P / n.
  function payment(P, apr, n) {
    if (!(P > 0) || !(n > 0)) return 0;
    var r = apr / 100 / 12;
    return r > 0 ? P * r / (1 - Math.pow(1 + r, -n)) : P / n;
  }

  // Loan amount a monthly budget supports: budget * (1 - (1 + r)^-n) / r, or budget * n at 0%.
  function maxLoan(budget, apr, n) {
    if (!(budget > 0) || !(n > 0)) return 0;
    var r = apr / 100 / 12;
    return r > 0 ? budget * (1 - Math.pow(1 + r, -n)) / r : budget * n;
  }

  // Full "What will it cost?" result.
  function calc(v) {
    var b = priceBreakdown(v);
    b.equity = v.tradeValue - v.tradePayoff;                  // negative = rolled into the loan
    b.due = b.otd - b.equity - v.rebates;                     // what is left to pay
    b.financed = Math.max(0, b.due - v.down);
    b.monthly = payment(b.financed, v.apr, v.term);
    b.payments = b.monthly * v.term;                          // total of payments
    b.interest = Math.max(0, b.payments - b.financed);        // total interest
    b.totalCost = v.down + b.payments;                        // plus the trade, if it has equity
    return b;
  }

  // "What can I afford?": find the vehicle price whose out-the-door number fits the budget.
  // Binary search (40 steps) instead of algebra so the $5,000 surtax cap is handled exactly.
  function solvePrice(v) {
    var equity = v.tradeValue - v.tradePayoff;
    var target = maxLoan(v.budget, v.apr, v.term) + v.down + equity + v.rebates;   // max out-the-door
    if (!(target > priceBreakdown(Object.assign({}, v, { price: 0 })).otd)) return { price: 0, target: Math.max(0, target) };
    var lo = 0, hi = target;
    for (var i = 0; i < 40; i++) {
      var mid = (lo + hi) / 2;
      if (priceBreakdown(Object.assign({}, v, { price: mid })).otd > target) hi = mid; else lo = mid;
    }
    return { price: lo, target: target };
  }

  // Exposed for the Node math check; harmless in the browser.
  window.MCD_CALC = { calc: calc, solvePrice: solvePrice, payment: payment, maxLoan: maxLoan, SURTAX_CAP: SURTAX_CAP };

  /* ---------- Page wiring ---------- */
  var root = document.querySelector("[data-calc]");
  if (!root) return;

  var KEY = "mcd-calc";
  var $ = function (s) { return root.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(root.querySelectorAll(s)); };
  var out = function (name) { return document.querySelectorAll('[data-out="' + name + '"]'); };
  var show = function (name, on) { document.querySelectorAll('[data-show="' + name + '"]').forEach(function (el) { el.hidden = !on; }); };

  // "$38,450", "38450" or "38,450.50" all become 38450(.5). Letters, blanks and negatives become 0.
  function num(s) {
    var n = parseFloat(String(s == null ? "" : s).replace(/[^0-9.]/g, ""));
    return isFinite(n) && n > 0 ? n : 0;
  }
  function money(n) { return "$" + Math.round(isFinite(n) && n > 0 ? n : 0).toLocaleString("en-US"); }
  function pct(n, max) { return Math.min(num(n), max); }
  function field(name) { return root.querySelector('[name="' + name + '"]'); }
  function radio(name) { var r = root.querySelector('[name="' + name + '"]:checked'); return r ? r.value : ""; }
  function set(name, text) { out(name).forEach(function (el) { el.textContent = text; }); }

  function read() {
    return {
      mode: radio("mode") || "cost",
      price: num(field("price").value), budget: num(field("budget").value),
      addOns: num(field("addons").value), docFee: num(field("doc").value),
      tradeValue: num(field("trade").value), tradePayoff: num(field("payoff").value),
      down: num(field("down").value), rebates: num(field("rebates").value),
      statePct: pct(field("state").value, 15), countyPct: pct(field("county").value, 5),
      tagTitle: num(field("tag").value), quote: num(field("quote").value),
      cash: radio("pay") === "cash", apr: pct(field("apr").value, 40), term: num(radio("term")) || 60
    };
  }

  function render() {
    var v = read(), afford = v.mode === "afford";
    root.setAttribute("data-mode", v.mode);
    if (afford) v.cash = false;
    var solved = afford ? solvePrice(v) : null;
    if (afford) v.price = Math.floor(solved.price / 10) * 10;   // "up to about": round down to $10
    var r = calc(v), ready = afford ? v.budget > 0 : v.price > 0;

    show("empty-cost", !afford && !ready);
    show("empty-afford", afford && !ready);
    show("results", ready);
    show("afford-line", afford && ready && v.price > 0);
    show("afford-short", afford && ready && v.price <= 0);
    show("finance", !v.cash);
    show("cash", v.cash);
    show("negative", r.equity < 0);
    show("positive", r.equity >= 0);

    set("price", money(v.price)); set("addons", money(v.addOns)); set("doc", money(v.docFee));
    set("taxable", money(r.taxable)); set("state-tax", money(r.stateTax)); set("surtax", money(r.surtax));
    set("tag", money(r.otd > 0 ? v.tagTitle : 0)); set("otd", money(r.otd));
    // Subtracted lines read "-$X" (or "$0"); negative equity is added: "+$X".
    var signed = function (n, s) { return n >= 0.5 ? s + money(n) : "$0"; };
    set("equity-minus", signed(Math.max(0, r.equity), "-")); set("equity-plus", signed(Math.max(0, -r.equity), "+"));
    set("rebates", signed(v.rebates, "-")); set("down", signed(v.down, "-"));
    set("financed", money(r.financed)); set("due", money(r.due));
    set("monthly", money(r.monthly)); set("interest", money(r.interest)); set("payments", money(r.payments));
    set("total", money(r.totalCost));
    set("terms-used", v.term + " months at " + v.apr.toFixed(1) + "% APR");
    set("afford-line", "You can look at cars up to about " + money(v.price) + " (out-the-door about " + money(r.otd) + ").");
    set("summary-otd", ready ? money(r.otd) : "$0");
    set("summary-monthly", ready && !v.cash ? money(r.monthly) : "$0");
    show("covered", ready && r.due <= 0);
    show("plus-trade", r.equity > 0 && !v.cash);

    // Term comparison: same amount financed at 48, 60 and 72 months.
    [48, 60, 72].forEach(function (n) {
      var m = payment(r.financed, v.apr, n);
      set("cmp-" + n + "-m", money(m));
      set("cmp-" + n + "-i", money(Math.max(0, m * n - r.financed)));
    });

    // Live trade equity under the trade fields.
    show("equity-line", v.tradeValue > 0 || v.tradePayoff > 0);
    set("equity-live", money(Math.abs(v.tradeValue - v.tradePayoff)));

    // Dealer quote check: compare the dealer's out-the-door number with ours ($150 either way counts as a match).
    var check = !afford && ready && v.quote > 0, gap = v.quote - r.otd;
    show("check", check);
    show("check-high", check && gap > 150); show("check-match", check && Math.abs(gap) <= 150); show("check-low", check && gap < -150);
    set("quote", money(v.quote)); set("gap-abs", money(Math.abs(gap)));
    set("gap", Math.abs(gap) < 0.5 ? "$0" : (gap > 0 ? "+" : "-") + money(Math.abs(gap)));

    // Smart tips: only when true, at most 3.
    var tips = [["doc", v.docFee > 999], ["addons", v.addOns > 0], ["negative", r.equity < 0], ["term", !v.cash && v.term >= 72]];
    var count = 0;
    tips.forEach(function (t) { var on = ready && t[1] && count < 3; if (on) count++; show("tip-" + t[0], on); });
    show("tips", count > 0);
    last = { v: v, r: r, ready: ready, afford: afford, check: check, gap: gap };
    announce();
    save();
  }

  /* Screen readers: one short announcement after typing pauses, instead of the whole card on every key. */
  var last = null, sayTimer = 0, sayEl = document.querySelector("[data-announce]");
  function announce() {
    if (!sayEl) return;
    clearTimeout(sayTimer);
    sayTimer = setTimeout(function () {
      if (!last || !last.ready) { sayEl.textContent = ""; return; }
      var label = function (sel) { var el = document.querySelector(sel); return el ? el.textContent.trim() : ""; };
      var parts = [];
      if (last.afford) parts.push(label("[data-show='afford-line']"));
      parts.push(label(".calc-results > [data-show='results'] > .calc-big span") + " " + money(last.r.otd) + ".");
      if (!last.v.cash) parts.push(label(".calc-pay .calc-big span") + " " + money(last.r.monthly) + ".");
      sayEl.textContent = parts.join(" ");
    }, 900);
  }

  /* English summary for our team, attached to the start or review form when the visitor taps through. */
  function teamSummary() {
    if (!last || !last.ready) return "";
    var v = last.v, r = last.r, L = [];
    L.push(last.afford ? "Mode: What can I afford? (monthly budget " + money(v.budget) + ")" : "Mode: What will it cost?");
    L.push("Vehicle price: " + money(v.price), "Add-ons: " + money(v.addOns), "Doc fee: " + money(v.docFee));
    L.push("Trade-in value: " + money(v.tradeValue) + ", payoff: " + money(v.tradePayoff));
    L.push("Down payment: " + money(v.down) + ", rebates: " + money(v.rebates));
    L.push("County: " + field("county-name").value + " (" + v.countyPct + "% surtax), state " + v.statePct + "%, tag and title " + money(v.tagTitle));
    L.push("Estimated out-the-door: " + money(r.otd));
    if (v.cash) L.push("Paying cash: " + money(r.due));
    else L.push("Amount financed: " + money(r.financed), "Estimated payment: " + money(r.monthly) + " a month, " + v.term + " months at " + v.apr + "% APR");
    if (last.check) L.push("Dealer quote: " + money(v.quote) + " (" + (last.gap >= 0 ? "+" : "-") + money(Math.abs(last.gap)) + " vs. the math)");
    return L.join("\n");
  }
  document.querySelectorAll("[data-calc-send]").forEach(function (a) {
    a.addEventListener("click", function () {
      var text = teamSummary();
      try { if (text) localStorage.setItem("mcd-calc-send", JSON.stringify({ t: Date.now(), text: text })); } catch (e) {}
    });
  });

  /* ---------- Saving, formatting, copy, reset ---------- */
  var DEFAULTS = {};
  $$("input, select").forEach(function (el) {
    if (el.type === "radio") { if (el.checked) DEFAULTS[el.name] = el.value; }
    else DEFAULTS[el.name] = el.value;
  });

  function save() {
    var data = {};
    $$("input, select").forEach(function (el) {
      if (el.type === "radio") { if (el.checked) data[el.name] = el.value; } else data[el.name] = el.value;
    });
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  }
  function load(data) {
    Object.keys(data).forEach(function (k) {
      root.querySelectorAll('[name="' + k + '"]').forEach(function (el) {
        if (el.type === "radio") el.checked = el.value === data[k]; else el.value = data[k];
      });
    });
  }
  try { var saved = JSON.parse(localStorage.getItem(KEY) || "null"); if (saved) load(saved); } catch (e) {}

  // Money fields: commas on blur ("38450" becomes "38,450").
  $$("[data-money]").forEach(function (el) {
    el.addEventListener("blur", function () {
      var n = num(el.value);
      el.value = n ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : (el.hasAttribute("data-keep-zero") ? "0" : "");
      render();
    });
  });

  // County select fills the county surtax %.
  field("county-name").addEventListener("change", function () {
    var p = COUNTIES[field("county-name").value];
    if (p != null) field("county").value = String(p);
    render();
  });

  // Afford mode always estimates a payment, so open that panel.
  root.addEventListener("change", function (e) {
    if (e.target.name === "mode" && e.target.value === "afford") { var d = $("[data-finance-panel]"); if (d) d.open = true; }
    render();
  });
  root.addEventListener("input", render);

  var reset = $("[data-reset]");
  if (reset) reset.addEventListener("click", function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    load(DEFAULTS); render();
  });

  // Copy a plain-text summary, built from the visible labels so it matches the page language.
  var copy = $("[data-copy]");
  if (copy) copy.addEventListener("click", function () {
    var lines = [document.querySelector("h1").textContent.replace(/\s+/g, " ").trim()];
    var big = $("[data-show='afford-line']");
    if (big && !big.hidden) lines.push(big.textContent.trim());
    $$(".calc-results [data-row]").forEach(function (row) {
      if (row.offsetParent === null) return;
      lines.push(row.children[0].textContent.trim() + ": " + row.children[1].textContent.trim());
    });
    var note = $(".calc-results .fine");
    if (note) lines.push("", note.textContent.trim(), location.origin + "/calculator");
    var text = lines.join("\n");
    var done = function () { var t = copy.textContent; copy.textContent = "Copied"; setTimeout(function () { copy.textContent = t; }, 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
  });

  // Phones: hide the summary bar while the results card itself is on screen.
  var bar = document.querySelector("[data-calc-bar]"), res = document.getElementById("results");
  if (bar && res && "IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { bar.classList.toggle("is-away", es[0].isIntersecting); }, { threshold: 0.15 }).observe(res);
  }

  render();
})();
