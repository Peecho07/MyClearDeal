// myClearDeal | site scripts
document.documentElement.classList.add('js');
(function () {
  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var links = document.querySelector('.nav__links');
  if (btn && links) {
    btn.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Footer year
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Red flag checker
  var checker = document.querySelector('[data-checker]');
  if (checker) {
    var boxes = checker.querySelectorAll('input[type="checkbox"]');
    var bar = checker.querySelector('.meter i');
    var title = checker.querySelector('[data-result-title]');
    var text = checker.querySelector('[data-result-text]');
    var update = function () {
      var n = 0;
      boxes.forEach(function (b) { if (b.checked) n++; });
      var pct = Math.round((n / boxes.length) * 100);
      bar.style.width = (n === 0 ? 4 : pct) + '%';
      if (n === 0) {
        bar.style.background = '#1DB87A';
        title.textContent = 'Check what applies to your quote';
        text.textContent = 'Tap every line that sounds like your deal.';
      } else if (n <= 2) {
        bar.style.background = '#E3A008';
        title.textContent = n + ' red flag' + (n > 1 ? 's' : '') + ' found';
        text.textContent = 'Worth a second look before you sign.';
      } else {
        bar.style.background = '#D9480F';
        title.textContent = n + ' red flags found';
        text.textContent = 'Send us that quote. We will walk you through it free.';
      }
    };
    boxes.forEach(function (b) { b.addEventListener('change', update); });
    update();
  }

  // Consultation form: show the car fields that match "Have you found a car yet?"
  document.querySelectorAll('[data-car-choice]').forEach(function (choice) {
    var form = choice.closest('form');
    var groups = form.querySelectorAll('[data-car-group]');
    var sync = function () {
      var picked = choice.querySelector('input:checked');
      var show = picked ? picked.getAttribute('data-car-show') : '';
      groups.forEach(function (g) {
        var on = g.getAttribute('data-car-group') === show;
        g.classList.toggle('is-shown', on);
        // Hidden fields are disabled so they are neither validated nor submitted.
        g.querySelectorAll('input, textarea').forEach(function (f) {
          f.disabled = !on;
          if (f.hasAttribute('data-car-required')) f.required = on;
        });
      });
    };
    choice.addEventListener('change', sync);
    sync();
  });

  // Forms: AJAX submit for Netlify Forms. Only confirm when the server accepts it.
  document.querySelectorAll('form[data-lead-form]').forEach(function (form) {
    form.addEventListener('submit', function (ev) {
      if (!form.checkValidity()) return;
      ev.preventDefault();
      var b = form.querySelector('button[type="submit"]');
      var label = b ? b.textContent : '';
      if (b) { b.disabled = true; b.textContent = 'Sending...'; }
      form.classList.remove('is-error');
      fetch(form.getAttribute('action') || '/', { method: 'POST', body: new FormData(form) })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          form.classList.add('is-sent');
          if (b) b.textContent = 'Sent. We will be in touch.';
        })
        .catch(function () {
          form.classList.add('is-error');
          if (b) { b.disabled = false; b.textContent = label; }
        });
    });
  });
})();
