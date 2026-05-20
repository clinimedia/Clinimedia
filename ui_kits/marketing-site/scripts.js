/* CliniMedia · vanilla JS that powers the static site
   No framework. Everything is progressive enhancement.
   Site renders without JS — JS only adds animation + interactivity. */
(function () {
  'use strict';

  var prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Scroll reveal: .cm-reveal + .cm-stagger ─────────────────── */
  function initReveal() {
    var els = document.querySelectorAll('.cm-reveal, .cm-stagger');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ─── KPI count-up: <span data-count="142" data-suffix="K" data-decimals="0"> ─ */
  function initCountUp() {
    var nodes = document.querySelectorAll('[data-count]');
    if (!nodes.length || !('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.textContent = formatNum(parseFloat(n.dataset.count), parseInt(n.dataset.decimals || 0, 10)); });
      return;
    }
    function formatNum(v, d) { return d > 0 ? v.toFixed(d) : Math.round(v).toString(); }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.dataset.count);
        var decimals = parseInt(el.dataset.decimals || 0, 10);
        if (prefersReducedMotion) { el.textContent = formatNum(target, decimals); io.unobserve(el); return; }
        var start = performance.now();
        var dur = 1600;
        function tick(now) {
          var t = Math.min(1, (now - start) / dur);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = formatNum(target * eased, decimals);
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ─── FAQ accordion ─────────────────────────────────────────── */
  function initFaq() {
    var items = document.querySelectorAll('.cm-faq__item');
    items.forEach(function (item, idx) {
      var btn = item.querySelector('.cm-faq__q');
      if (!btn) return;
      if (idx === 0) item.classList.add('is-open');
      btn.setAttribute('aria-expanded', item.classList.contains('is-open') ? 'true' : 'false');
      btn.addEventListener('click', function () {
        var open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  /* ─── Horizontal pinned scroller ─────────────────────────────── */
  function initHScroll() {
    var wrap = document.querySelector('.cm-hscroll');
    var rail = document.querySelector('.cm-hscroll__rail');
    var prog = document.querySelector('.cm-hscroll__progress');
    if (!wrap || !rail) return;
    function onScroll() {
      var rect = wrap.getBoundingClientRect();
      var total = wrap.offsetHeight - window.innerHeight;
      var scrolled = Math.max(0, -rect.top);
      var p = Math.max(0, Math.min(1, scrolled / total));
      var max = rail.scrollWidth - window.innerWidth + 32;
      rail.style.transform = 'translateX(' + (-p * max) + 'px)';
      if (prog) prog.textContent = String(Math.round(p * 100)).padStart(2, '0') + ' / 100';
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  /* ─── Custom cursor ─────────────────────────────────────────── */
  function initCursor() {
    if (prefersReducedMotion) return;
    if (window.matchMedia('(hover: none)').matches) return;
    var cursor = document.querySelector('.cm-cursor');
    if (!cursor) return;
    var x = 0, y = 0, tx = 0, ty = 0;
    function move(e) { tx = e.clientX; ty = e.clientY; }
    function tick() {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      cursor.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
      requestAnimationFrame(tick);
    }
    function over(e) {
      var t = e.target.closest('a,button,.cm-pillar,.cm-hcard,.cm-tcard,.cm-faq__q,.cm-partner,.cm-gallery__cell');
      cursor.classList.toggle('is-hover', !!t);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    requestAnimationFrame(tick);
  }

  /* ─── Hero letter parallax ────────────────────────────────── */
  function initHeroParallax() {
    if (prefersReducedMotion) return;
    var brand = document.querySelector('.cm-hero-bg__brand');
    if (!brand) return;
    var letters = brand.querySelectorAll('.letter');
    window.addEventListener('mousemove', function (e) {
      var px = e.clientX / window.innerWidth - 0.5;
      var py = e.clientY / window.innerHeight - 0.5;
      letters.forEach(function (el, i) {
        var off = (i - letters.length / 2) * 0.4;
        el.style.transform = 'translate(' + (px * (6 + off)) + 'px,' + (py * (4 + off)) + 'px)';
      });
    });
  }

  /* ─── Dashboard live bars ─────────────────────────────────── */
  function initLiveBars() {
    var bars = document.querySelectorAll('.cm-bars > div');
    if (!bars.length || prefersReducedMotion) return;
    setInterval(function () {
      bars.forEach(function (b) {
        var current = parseInt(b.dataset.h || b.style.height || '50', 10);
        var next = Math.max(30, Math.min(100, current + (Math.random() * 30 - 15)));
        b.dataset.h = String(next);
        b.style.height = next + '%';
      });
    }, 1500);
  }

  /* ─── Footer letter wave ──────────────────────────────────── */
  function initFooterWave() {
    var el = document.querySelector('[data-letter-wave]');
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) el.classList.add('is-in'); });
    }, { threshold: 0.2 });
    io.observe(el);
  }

  /* ─── Contact form — POSTs to /api/contact (Vercel serverless) ─── */
  function initContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;
    var success = document.querySelector('[data-contact-success]');
    var errEl = form.querySelector('[data-contact-error]');
    var btn = form.querySelector('button[type="submit"]');
    var label = form.querySelector('[data-submit-label]');
    var labelDefault = label ? label.textContent : 'Send inquiry';

    function showError(msg) {
      if (!errEl) return;
      errEl.textContent = msg;
      errEl.style.display = 'block';
    }
    function clearError() {
      if (!errEl) return;
      errEl.textContent = '';
      errEl.style.display = 'none';
    }
    function setBusy(busy) {
      if (btn) btn.disabled = busy;
      if (label) label.textContent = busy ? 'Sending…' : labelDefault;
      if (btn) btn.style.opacity = busy ? '0.7' : '';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearError();

      var fd = new FormData(form);
      var payload = {
        clinic: (fd.get('clinic') || '').toString().trim(),
        name: (fd.get('name') || '').toString().trim(),
        email: (fd.get('email') || '').toString().trim(),
        phone: (fd.get('phone') || '').toString().trim(),
        plan: (fd.get('plan') || '').toString().trim(),
        notes: (fd.get('notes') || '').toString().trim(),
        website: (fd.get('website') || '').toString(), // honeypot
      };

      if (!payload.clinic || !payload.name || !payload.email) {
        showError('Please fill in clinic name, your name, and email.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
        showError('That email address does not look right — could you double-check it?');
        return;
      }

      setBusy(true);
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'same-origin',
      })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
        .then(function (res) {
          setBusy(false);
          if (res.ok && res.body && res.body.ok) {
            if (success) {
              form.style.display = 'none';
              success.style.display = 'flex';
            }
          } else {
            var msg = (res.body && res.body.error) || 'Something went wrong. Please email info@clinimedia.ca or call +1 (289) 946-6865.';
            showError(msg);
          }
        })
        .catch(function () {
          setBusy(false);
          showError('Network problem. Please email info@clinimedia.ca or call +1 (289) 946-6865.');
        });
    });
  }

  /* ─── Mobile nav ──────────────────────────────────────── */
  function initMobileNav() {
    var btn = document.querySelector('[data-mobile-nav-toggle]');
    var panel = document.querySelector('[data-mobile-nav-panel]');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      var open = panel.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        panel.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── Year stamp ────────────────────────────────────────── */
  function initYear() {
    var els = document.querySelectorAll('[data-year]');
    var y = String(new Date().getFullYear());
    els.forEach(function (el) { el.textContent = y; });
  }

  /* ─── Boot ───────────────────────────────────────────── */
  function boot() {
    initReveal();
    initCountUp();
    initFaq();
    initHScroll();
    initCursor();
    initHeroParallax();
    initLiveBars();
    initFooterWave();
    initContactForm();
    initMobileNav();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
