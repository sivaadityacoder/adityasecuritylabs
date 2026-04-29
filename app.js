(function () {
  'use strict';

  /* ── NAV SCROLL ── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    navbar.style.borderBottomColor =
      window.scrollY > 40 ? 'rgba(0,212,255,0.25)' : 'rgba(0,212,255,0.18)';
  }, { passive: true });

  /* ── HAMBURGER ── */
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  /* ── FADE IN OBSERVER ── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade').forEach(el => observer.observe(el));

  /* ── CONTACT FORM → DISCORD WEBHOOK ── */
  // ⚠️  Paste your NEW Discord Webhook URL here after regenerating it
  const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1498874412685070438/dOnDqjRPC3GQMHgD3sWUjK-d_nn7P8IJ7_w6bVVaD3qMw4wdlxXtIa_ifll47Suuw8VQ';

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const company = document.getElementById('company').value.trim();
      const service = document.getElementById('service')
        ? document.getElementById('service').value.trim()
        : 'Not specified';
      const details = document.getElementById('details')
        ? document.getElementById('details').value.trim()
        : '';

      // ── Validation ──────────────────────────────────────
      if (!name || !email || !company) {
        btn.textContent = 'Fill required fields ✗';
        btn.style.background = '#ef4444';
        btn.style.color = '#fff';
        setTimeout(() => {
          btn.textContent = 'Send Message →';
          btn.style.background = '';
          btn.style.color = '';
        }, 2500);
        return;
      }

      // ── Sending state ────────────────────────────────────
      btn.textContent = 'Transmitting…';
      btn.disabled = true;
      btn.style.opacity = '0.75';

      // ── Rich Discord embed payload ───────────────────────
      const payload = {
        username: 'ASL Lead Bot',
        avatar_url: 'https://adityasecuritylabs.tech/hero_bg.png',
        embeds: [{
          title: '🛡️ New Engagement Request',
          color: 0x00d4ff,           // cyan — matches site brand
          fields: [
            { name: '👤 Name', value: name, inline: true },
            { name: '🏢 Company', value: company, inline: true },
            { name: '📧 Email', value: email, inline: false },
            { name: '🔧 Service Needed', value: service || 'Not specified', inline: true },
            { name: '📝 Message', value: details || '*Not provided*', inline: false },
          ],
          footer: { text: 'Aditya Security Labs · adityasecuritylabs.tech' },
          timestamp: new Date().toISOString(),
        }]
      };

      try {
        await fetch(DISCORD_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        btn.textContent = '✓ Request Received';
        btn.style.background = '#22c55e';
        btn.style.color = '#000';
        btn.style.opacity = '1';

        setTimeout(() => {
          form.reset();
          btn.textContent = 'Send Message →';
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 3500);

      } catch (err) {
        btn.textContent = '✗ Network Error — Retry';
        btn.style.background = '#ef4444';
        btn.style.color = '#fff';
        btn.style.opacity = '1';
        btn.disabled = false;
        console.error('[ASL] Discord webhook failed:', err);

        setTimeout(() => {
          btn.textContent = 'Send Message →';
          btn.style.background = '';
          btn.style.color = '';
        }, 3000);
      }
    });
  }

  /* ── TYPING EFFECT on terminal (optional) ── */
  const termLines = document.querySelectorAll('.tl');
  termLines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transition = 'opacity 0.2s';
    setTimeout(() => { line.style.opacity = '1'; }, 300 + i * 120);
  });

  console.log('%cAditya Security Labs — System Online', 'color:#00d4ff;font-family:monospace;font-size:14px;');
  console.log('%c4 NIST CVEs · BSI/CERT-Bund · Google Fuchsia · EU Gov. Bounty', 'color:#f5a623;font-family:monospace;font-size:11px;');

})();
