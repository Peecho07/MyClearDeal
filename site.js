/* myClearDeal | site script. One file for every page; each feature exits early if its element is missing. */

/* ---- Config: fill these in. Nothing else in the markup needs editing. ---- */
var LEAD_EMAIL = "organizer@mycleardeal.com";           // Where form leads are emailed (via FormSubmit). After activating, you can use the alias FormSubmit sends you instead of the address.
var FORM_ENDPOINT = LEAD_EMAIL ? "https://formsubmit.co/ajax/" + LEAD_EMAIL : "";
var CONTACT_EMAIL = "hello@mycleardeal.com";
var QUOTE_TURNAROUND = "";     // e.g. "1 business day" (shown wherever data-turnaround appears)

var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Pages always open at the top; clicking the current nav tab scrolls to top. */
(function () {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  // Every tab opens at the top of its page. Re-check once everything (fonts, images) has loaded,
  // unless the visitor has already started scrolling on their own.
  var moved = false, mark = function () { moved = true; };
  ["wheel", "touchstart", "keydown"].forEach(function (ev) { window.addEventListener(ev, mark, { once: true, passive: true }); });
  var toTop = function () { if (!location.hash && !moved) window.scrollTo(0, 0); };
  toTop();
  window.addEventListener("load", toTop);
  window.addEventListener("pageshow", function (e) { if (e.persisted) return; toTop(); });
  document.querySelectorAll('.nav a[aria-current="page"], .brand').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var here = a.getAttribute("href").split("#")[0];
      var file = location.pathname.split("/").pop() || "index.html";
      if (here === file || (here === "index.html" && file === "")) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
      }
    });
  });
})();

/* Config fills: data-email, data-turnaround, data-year */
(function () {
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll("[data-email-item]").forEach(function (li) { li.hidden = !CONTACT_EMAIL; });
  document.querySelectorAll("[data-email]").forEach(function (el) {
    if (!CONTACT_EMAIL) { el.hidden = true; return; }
    if (el.tagName === "A") el.href = "mailto:" + CONTACT_EMAIL;
    if (!el.hasAttribute("data-keep-text")) el.textContent = CONTACT_EMAIL;
  });
  document.querySelectorAll("[data-turnaround]").forEach(function (el) {
    if (!QUOTE_TURNAROUND) { el.hidden = true; return; }
    var slot = el.querySelector("[data-turnaround-text]") || el;
    slot.textContent = QUOTE_TURNAROUND;
  });
})();

/* Copy email button */
(function () {
  var btns = document.querySelectorAll("[data-copy-email]");
  if (!btns.length) return;
  btns.forEach(function (b) {
    if (!CONTACT_EMAIL) { b.hidden = true; return; }
    b.addEventListener("click", function () {
      var done = function () { var t = b.textContent; b.textContent = "Copied"; setTimeout(function () { b.textContent = t; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(CONTACT_EMAIL).then(done, function () {});
    });
  });
})();

/* Mobile menu */
(function () {
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  if (!btn || !nav) return;
  var set = function (open) {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.textContent = open ? "Close" : "Menu";
  };
  btn.addEventListener("click", function () { set(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
  document.addEventListener("click", function (e) { if (nav.classList.contains("open") && !nav.contains(e.target) && !btn.contains(e.target)) set(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 900) set(false); });
})();

/* Helper: run a callback only while an element is on screen */
function onScreen(el, cb) {
  if (!("IntersectionObserver" in window)) { cb(true); return; }
  new IntersectionObserver(function (es) { es.forEach(function (e) { cb(e.isIntersecting); }); }, { threshold: 0.05 }).observe(el);
}

/* Rotating word */
(function () {
  var r = document.querySelector("[data-rotator]");
  if (!r || REDUCED) return;
  var words = Array.prototype.slice.call(r.children);
  if (words.length < 2) return;
  var i = 0, visible = true, timer;
  var widthOf = function (w) { return w.getBoundingClientRect().width; };
  r.classList.add("on");
  words[0].classList.add("is-in");
  r.style.width = widthOf(words[0]) + "px";
  var step = function () {
    if (!visible) { timer = setTimeout(step, 1900); return; }
    var old = words[i];
    i = (i + 1) % words.length;
    var nw = words[i];
    old.classList.remove("is-in"); old.classList.add("is-out");
    nw.classList.remove("is-out"); void nw.offsetWidth; nw.classList.add("is-in");
    r.style.width = widthOf(nw) + "px";
    setTimeout(function () { old.classList.remove("is-out"); }, 650);
    timer = setTimeout(step, i === 0 ? 4200 : 1900);
  };
  timer = setTimeout(step, 3200);
  onScreen(r, function (v) { visible = v; });
  window.addEventListener("resize", function () { r.style.width = widthOf(words[i]) + "px"; });
})();

/* Hero motion graphic: three scenes, 7s each, tabs jump */
(function () {
  var mg = document.querySelector("[data-mg]");
  if (!mg) return;
  var scenes = mg.querySelectorAll(".scene");
  var tabs = mg.querySelectorAll(".mg-tab");
  var cur = 0, timer;
  var counters = function (scene) {
    scene.querySelectorAll("[data-mg-count]").forEach(function (el) {
      var to = parseFloat(el.getAttribute("data-mg-count"));
      var pre = el.getAttribute("data-pre") || "";
      var delay = parseFloat(el.getAttribute("data-delay") || "0") * 1000;
      var fmt = function (n) { return pre + Math.round(n).toLocaleString("en-US"); };
      if (REDUCED) { el.textContent = fmt(to); return; }
      el.textContent = fmt(parseFloat(el.getAttribute("data-from") || "0"));
      var from = parseFloat(el.getAttribute("data-from") || "0");
      setTimeout(function () {
        var t0 = performance.now();
        var tick = function (t) {
          var p = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(from + (to - from) * e);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, delay);
    });
  };
  var show = function (n) {
    cur = n;
    scenes.forEach(function (s, k) { s.classList.toggle("is-on", k === n); s.setAttribute("aria-hidden", k === n ? "false" : "true"); });
    tabs.forEach(function (t, k) {
      t.setAttribute("aria-selected", k === n ? "true" : "false");
      t.tabIndex = k === n ? 0 : -1;
    });
    // restart CSS animations in the active scene and the tab bar
    mg.classList.remove("run"); void mg.offsetWidth; mg.classList.add("run");
    counters(scenes[n]);
    clearTimeout(timer);
    if (!REDUCED) timer = setTimeout(function () { show((cur + 1) % scenes.length); }, 7000);
  };
  tabs.forEach(function (t, k) {
    t.addEventListener("click", function () { show(k); });
    t.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var n = (cur + d + tabs.length) % tabs.length;
      show(n); tabs[n].focus();
    });
  });
  var started = false;
  onScreen(mg, function (v) {
    if (v && !started) { started = true; show(0); return; }
    if (!started) return;
    mg.classList.toggle("paused", !v);
    if (!v) clearTimeout(timer);
    else if (!REDUCED) { clearTimeout(timer); timer = setTimeout(function () { show((cur + 1) % scenes.length); }, 7000); }
  });
})();

/* Marquee: rAF loop at .05px/ms, center item pops, pauses only off-screen */
(function () {
  document.querySelectorAll("[data-marquee]").forEach(function (box) {
    var track = box.querySelector(".marquee-track");
    if (!track) return;
    var items = Array.prototype.slice.call(track.children);
    items.forEach(function (it) { var c = it.cloneNode(true); c.setAttribute("aria-hidden", "true"); track.appendChild(c); });
    var all = Array.prototype.slice.call(track.children);
    var x = 0, last = 0, lastPop = 0, hover = false, visible = true;
    onScreen(box, function (v) { visible = v; });
    var pop = function () {
      var b = box.getBoundingClientRect(), mid = b.left + b.width / 2, best = null, bd = 1e9;
      all.forEach(function (it) {
        var r = it.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bd) { bd = d; best = it; }
      });
      all.forEach(function (it) { it.classList.toggle("pop", it === best); });
    };
    var loop = function (t) {
      var dt = last ? Math.min(t - last, 64) : 0; last = t;
      if (!hover && visible && !REDUCED) {
        x -= 0.05 * dt;
        var half = track.scrollWidth / 2;
        if (-x >= half) x += half;
        track.style.transform = "translate3d(" + x + "px,0,0)";
      }
      if (visible && t - lastPop > 120) { lastPop = t; pop(); }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
})();

/* Tabs (feature tabs): ARIA tabs with arrow keys */
(function () {
  document.querySelectorAll("[data-tabs]").forEach(function (box) {
    var tabs = Array.prototype.slice.call(box.querySelectorAll('[role="tab"]'));
    var select = function (k, focus) {
      tabs.forEach(function (t, j) {
        var on = j === k, p = document.getElementById(t.getAttribute("aria-controls"));
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        if (p) { p.hidden = !on; p.classList.remove("is-in"); if (on) { void p.offsetWidth; p.classList.add("is-in"); } }
      });
      if (focus) tabs[k].focus();
    };
    tabs.forEach(function (t, k) {
      t.addEventListener("click", function () { select(k); });
      t.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (k + 1) % tabs.length;
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (k - 1 + tabs.length) % tabs.length;
        if (e.key === "Home") n = 0;
        if (e.key === "End") n = tabs.length - 1;
        if (n === null) return;
        e.preventDefault(); select(n, true);
      });
    });
  });
})();

/* Journey (How it works): the car drives the four steps, then replays every 9s while on screen */
(function () {
  var j = document.querySelector("[data-journey]");
  if (!j || REDUCED) return;
  var visible = false, timer = 0;
  function play() {
    j.classList.remove("run"); void j.offsetWidth; j.classList.add("run");
    clearTimeout(timer);
    timer = setTimeout(function () { timer = 0; if (visible) play(); }, 9000);
  }
  if (!("IntersectionObserver" in window)) { j.classList.add("run"); return; }
  new IntersectionObserver(function (es) {
    visible = es[0].isIntersecting;
    if (visible && !timer) play();
  }, { threshold: 0.35 }).observe(j);
})();

/* Scroll reveal for every main > section except the first */
(function () {
  if (REDUCED || !("IntersectionObserver" in window)) return;
  var GRIDS = ".grid3, .grid4, .grid2, .plans, .steps, .faq, .checks:not(.inline), .demo, .split, .ftabs, .deck-wrap, .cmp-wrap + .grid2";
  var sections = Array.prototype.slice.call(document.querySelectorAll("main > section")).slice(1);
  sections.forEach(function (sec) {
    var wrap = sec.querySelector(".wrap") || sec;
    Array.prototype.forEach.call(wrap.children, function (child) {
      var grid = child.matches(GRIDS) ? child : null;
      if (grid) {
        Array.prototype.forEach.call(grid.children, function (c, i) { c.classList.add("sr"); c.style.setProperty("--sr-d", (Math.min(i, 8) * 0.09) + "s"); });
      } else {
        child.classList.add("sr");
      }
    });
  });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var sec = e.target;
      sec.classList.add("sr-in");
      io.unobserve(sec);
      setTimeout(function () {
        sec.querySelectorAll(".sr").forEach(function (el) { el.classList.remove("sr"); el.style.removeProperty("--sr-d"); });
      }, 2400);
    });
  }, { rootMargin: "0px 0px -10% 0px" });
  sections.forEach(function (s) { io.observe(s); });
})();

/* Count-up numbers: data-count="50" data-suffix="+" data-prefix="$" */
(function () {
  var els = document.querySelectorAll("[data-count]");
  if (!els.length) return;
  var run = function (el) {
    var to = parseFloat(el.getAttribute("data-count")), pre = el.getAttribute("data-prefix") || "", suf = el.getAttribute("data-suffix") || "";
    var fmt = function (n) { return pre + Math.round(n).toLocaleString("en-US") + suf; };
    if (REDUCED) { el.textContent = fmt(to); return; }
    var t0 = performance.now();
    var tick = function (t) { var p = Math.min(1, (t - t0) / 1400); el.textContent = fmt(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };
  if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }); }, { threshold: 0.6 });
  els.forEach(function (el) { io.observe(el); });
})();

/* Card deck (example deals): data-reviews holds data-rv cards */
(function () {
  var box = document.querySelector("[data-reviews]");
  if (!box) return;
  var deck = box.querySelector(".deck");
  var cards = Array.prototype.slice.call(box.querySelectorAll("[data-rv]"));
  var dots = box.querySelector(".dots");
  var order = cards.map(function (_, i) { return i; });
  var timer, hover = false, visible = true, busy = false;
  cards.forEach(function (c, i) {
    var d = document.createElement("button");
    d.type = "button"; d.setAttribute("aria-label", "Show example " + (i + 1));
    d.addEventListener("click", function () { goTo(i); });
    dots.appendChild(d);
  });
  var paint = function () {
    order.forEach(function (ci, pos) { cards[ci].setAttribute("data-pos", pos); cards[ci].setAttribute("aria-hidden", pos ? "true" : "false"); });
    Array.prototype.forEach.call(dots.children, function (d, i) { d.setAttribute("aria-current", i === order[0] ? "true" : "false"); });
  };
  var next = function () {
    if (busy) return; busy = true;
    var front = cards[order[0]];
    front.classList.add("fling");
    setTimeout(function () {
      order.push(order.shift());
      front.classList.remove("fling");
      paint();
      var nf = cards[order[0]];
      nf.classList.remove("fresh"); void nf.offsetWidth; nf.classList.add("fresh");
      busy = false;
    }, REDUCED ? 0 : 420);
  };
  var prev = function () {
    order.unshift(order.pop()); paint();
    var nf = cards[order[0]]; nf.classList.remove("fresh"); void nf.offsetWidth; nf.classList.add("fresh");
  };
  var goTo = function (i) { while (order[0] !== i) order.push(order.shift()); paint(); restart(); };
  var restart = function () {
    clearInterval(timer);
    if (REDUCED) return;
    timer = setInterval(function () { if (!hover && visible) next(); }, 5500);
  };
  box.querySelector("[data-next]").addEventListener("click", function () { next(); restart(); });
  box.querySelector("[data-prev]").addEventListener("click", function () { prev(); restart(); });
  deck.addEventListener("click", function () { next(); restart(); });
  deck.addEventListener("mouseenter", function () { hover = true; });
  deck.addEventListener("mouseleave", function () { hover = false; });
  onScreen(box, function (v) { visible = v; });
  paint(); restart();
})();

/* Red flag self-check */
(function () {
  var box = document.querySelector("[data-checker]");
  if (!box) return;
  var boxes = box.querySelectorAll('input[type="checkbox"]');
  var bar = box.querySelector(".meter i"), title = box.querySelector("[data-result-title]"), text = box.querySelector("[data-result-text]");
  var update = function () {
    var n = 0; boxes.forEach(function (b) { if (b.checked) n++; });
    bar.style.width = (n ? Math.round(n / boxes.length * 100) : 4) + "%";
    bar.classList.toggle("mid", n > 0 && n <= 2);
    bar.classList.toggle("hi", n > 2);
    if (!n) { title.textContent = "Check what applies to your quote"; text.textContent = "Tap every line that sounds like your deal."; }
    else if (n <= 2) { title.textContent = n + " red flag" + (n > 1 ? "s" : "") + " found"; text.textContent = "Worth a second look before you sign."; }
    else { title.textContent = n + " red flags found"; text.textContent = "Send us that quote. We will walk you through it free."; }
  };
  boxes.forEach(function (b) { b.addEventListener("change", update); });
  update();
})();

/* Consultation form: show car fields that match "Have you found a car yet?" */
(function () {
  document.querySelectorAll("[data-car-choice]").forEach(function (choice) {
    var form = choice.closest("form");
    var groups = form.querySelectorAll("[data-car-group]");
    var sync = function () {
      var picked = choice.querySelector("input:checked");
      var show = picked ? picked.getAttribute("data-car-show") : "";
      groups.forEach(function (g) {
        var on = g.getAttribute("data-car-group") === show;
        g.classList.toggle("is-shown", on);
        g.querySelectorAll("input, textarea").forEach(function (f) {
          f.disabled = !on;
          if (f.hasAttribute("data-car-required")) f.required = on;
        });
      });
    };
    choice.addEventListener("change", sync);
    sync();
  });
})();

/* Forms: progress bar + FormSubmit (emails each lead) with inline status */
(function () {
  var forms = document.querySelectorAll("form[data-lead-form]");
  if (!forms.length) return;
  forms.forEach(function (form) {
    var segs = form.querySelectorAll(".progress i");
    var label = form.querySelector(".progress-label");
    if (segs.length) {
      var groups = (form.getAttribute("data-progress") || "").split("|").map(function (g) { return g.split(","); });
      var filled = function (name) {
        var els = form.querySelectorAll('[name="' + name + '"]');
        for (var i = 0; i < els.length; i++) {
          var el = els[i];
          if (el.disabled) continue;
          if (el.type === "checkbox" || el.type === "radio") { if (el.checked) return true; }
          else if (el.value.trim()) return true;
        }
        return false;
      };
      var paint = function () {
        var n = 0;
        groups.forEach(function (g, k) {
          var ok = g.every(function (name) { return name.indexOf("/") > -1 ? name.split("/").some(filled) : filled(name); });
          if (segs[k]) segs[k].classList.toggle("on", ok);
          if (ok) n++;
        });
        if (label) label.textContent = n + " of " + groups.length + " steps done";
      };
      form.addEventListener("input", paint);
      form.addEventListener("change", paint);
      paint();
    }
    // ?type=lease (or buy) preselects Buying or Leasing
    var want = (new URLSearchParams(location.search).get("type") || "").toLowerCase();
    if (want) form.querySelectorAll('input[name="type"]').forEach(function (r) { if (r.value.toLowerCase().indexOf(want.slice(0, 4)) === 0) { r.checked = true; form.dispatchEvent(new Event("change")); } });
    var status = form.querySelector(".status");
    var fail = function (msg) {
      status.className = "status err";
      status.textContent = msg || ("Sorry, that did not go through." + (CONTACT_EMAIL ? " Please email us at " + CONTACT_EMAIL + "." : " Please try again in a moment."));
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      if (form.querySelector('[name="_honey"]').value) return;
      var b = form.querySelector('button[type="submit"]'), txt = b.textContent;
      if (!FORM_ENDPOINT) { fail(); return; }
      b.disabled = true; b.textContent = "Sending...";
      fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) })
        .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          if (!res.ok || String(res.d && res.d.success) !== "true") throw new Error("not sent");
          status.className = "status ok";
          status.textContent = form.getAttribute("data-success") || "Got it. We will be in touch.";
          form.reset();
          form.dispatchEvent(new Event("change"));
          b.textContent = "Sent";
        })
        .catch(function () { fail(); b.disabled = false; b.textContent = txt; });
    });
  });
})();

/* Process stepper: the car drives one step at a time. Click a step or the arrows to move back and forth.
   Auto-advances every 6.5s while on screen; a click resets that timer. Hovering does not pause it. */
(function () {
  var s = document.querySelector("[data-stepper]");
  if (!s) return;
  var dots = Array.prototype.slice.call(s.querySelectorAll(".st-dot"));
  var panels = Array.prototype.slice.call(s.querySelectorAll(".st-panel"));
  var car = s.querySelector(".st-car"), fill = s.querySelector(".st-fill"), count = s.querySelector(".st-count");
  var n = dots.length, cur = -1, timer = 0, visible = false;
  function go(k, focus) {
    k = (k + n) % n;
    cur = k;
    var pct = (k / (n - 1)) * 100;
    car.style.left = pct + "%"; fill.style.width = pct + "%";
    dots.forEach(function (d, i) {
      d.setAttribute("aria-selected", i === k ? "true" : "false");
      d.tabIndex = i === k ? 0 : -1;
      d.classList.toggle("done", i < k);
    });
    panels.forEach(function (p, i) {
      var on = i === k;
      p.hidden = !on; p.classList.remove("is-in");
      if (on) { void p.offsetWidth; p.classList.add("is-in"); }
    });
    if (count) count.textContent = "Step " + (k + 1) + " of " + n;
    if (focus) dots[k].focus();
    schedule();
  }
  function schedule() {
    clearTimeout(timer);
    if (REDUCED || !visible) return;
    timer = setTimeout(function () { go(cur + 1); }, 6500);
  }
  dots.forEach(function (d, i) {
    d.addEventListener("click", function () { go(i); });
    d.addEventListener("keydown", function (e) {
      var m = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!m) return; e.preventDefault(); go(cur + m, true);
    });
  });
  s.querySelectorAll("[data-st-prev]").forEach(function (b) { b.addEventListener("click", function () { go(cur - 1); }); });
  s.querySelectorAll("[data-st-next]").forEach(function (b) { b.addEventListener("click", function () { go(cur + 1); }); });
  go(0);
  onScreen(s, function (v) { visible = v; if (v) schedule(); else clearTimeout(timer); });
})();


/* Intro video placeholder: until a real video is added, the play button explains what goes here. */
(function () {
  var v = document.querySelector("[data-video]");
  if (!v) return;
  var real = v.querySelector("video");
  var btn = v.querySelector(".vid-play"), note = v.querySelector("[data-vid-note]");
  if (!btn) return;
  btn.addEventListener("click", function () {
    if (real) { v.querySelector(".vid-ph").hidden = true; real.play(); return; }
    if (note) note.textContent = "Our intro video is coming soon. Book a free call to meet the team today.";
  });
})();

/* Pricing steps: four tabs drive the motion graphic. Auto-advances every 6s while on screen; clicking jumps. */
(function () {
  var box = document.querySelector("[data-pflow]");
  if (!box) return;
  var tabs = Array.prototype.slice.call(box.querySelectorAll(".pf-step"));
  var scenes = Array.prototype.slice.call(box.querySelectorAll(".pf-scene"));
  var cur = 0, timer = 0, visible = false;
  function go(k, focus) {
    cur = (k + tabs.length) % tabs.length;
    tabs.forEach(function (t, i) {
      t.setAttribute("aria-selected", i === cur ? "true" : "false");
      t.tabIndex = i === cur ? 0 : -1;
      t.classList.toggle("done", i < cur);
    });
    scenes.forEach(function (s, i) { s.hidden = i !== cur; });
    box.classList.remove("run"); void box.offsetWidth; box.classList.add("run");
    if (focus) tabs[cur].focus();
    clearTimeout(timer);
    if (!REDUCED && visible) timer = setTimeout(function () { go(cur + 1); }, 6000);
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { go(i); });
    t.addEventListener("keydown", function (e) {
      var d = (e.key === "ArrowDown" || e.key === "ArrowRight") ? 1 : (e.key === "ArrowUp" || e.key === "ArrowLeft") ? -1 : 0;
      if (!d) return; e.preventDefault(); go(cur + d, true);
    });
  });
  onScreen(box, function (v) { var was = visible; visible = v; if (v && !was) go(cur); if (!v) clearTimeout(timer); });
  go(0);
})();
