/**
 * Aditya Security Labs — Core Interaction & Audio Engine
 * High-Assurance AI Infrastructure Security
 */

(function () {
  'use strict';

  // ── 1. WEB AUDIO API SOUND ENGINE (Zero External Dependencies) ──
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem('asl_sfx_enabled') !== 'false';
      this.initOnFirstInteraction();
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    initOnFirstInteraction() {
      const unlock = () => {
        this.init();
        window.removeEventListener('click', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock, { once: true, passive: true });
      window.addEventListener('keydown', unlock, { once: true, passive: true });
      window.addEventListener('touchstart', unlock, { once: true, passive: true });
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem('asl_sfx_enabled', this.enabled ? 'true' : 'false');
      if (this.enabled) {
        this.init();
        this.playUiClick(1200, 0.15);
      }
      return this.enabled;
    }

    // 📸 Professional Studio Camera Shutter Sound (Dual-phase mechanical shutter)
    playCameraShutter() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Phase 1: Mirror-up / aperture click
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1600, now);
      osc1.frequency.exponentialRampToValueAtTime(140, now + 0.035);
      gain1.gain.setValueAtTime(0.28, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.04);

      // Mechanical shutter noise burst
      try {
        const sampleRate = this.ctx.sampleRate;
        const bufferSize = Math.floor(sampleRate * 0.045);
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sampleRate * 0.015));
        }
        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 3400;
        filter.Q.value = 2.5;

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.35, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);
        whiteNoise.start(now);
        whiteNoise.stop(now + 0.05);
      } catch (err) {
        // Fallback gracefully
      }

      // Phase 2: Shutter curtain snap (60ms later)
      const t2 = now + 0.065;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1100, t2);
      osc2.frequency.exponentialRampToValueAtTime(90, t2 + 0.045);
      gain2.gain.setValueAtTime(0.32, t2);
      gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.045);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t2);
      osc2.stop(t2 + 0.05);
    }

    // 🖱️ High-End Tactile UI Click
    playUiClick(freq = 880, vol = 0.12) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.35, now + 0.022);

      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    }

    // 🔍 Hover Subtle Tick
    playHoverTick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1750, now);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.015);
    }

    // 🌟 Modal Open Harmonic
    playModalOpen() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [523.25, 659.25].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = now + idx * 0.035;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.2);
      });
    }

    // ✖️ Modal Close
    playModalClose() {
      if (!this.enabled) return;
      this.playUiClick(440, 0.1);
    }
  }

  const sfx = new SoundEngine();

  // ── 2. SFX TOGGLE BUTTON IN NAVBAR ──
  const sfxToggleBtn = document.getElementById('sfx-toggle');
  const sfxStatusText = document.getElementById('sfx-status');

  function updateSfxButtonUI(enabled) {
    if (!sfxToggleBtn || !sfxStatusText) return;
    if (enabled) {
      sfxToggleBtn.classList.remove('muted');
      sfxStatusText.textContent = 'SFX ON';
    } else {
      sfxToggleBtn.classList.add('muted');
      sfxStatusText.textContent = 'SFX OFF';
    }
  }

  if (sfxToggleBtn) {
    updateSfxButtonUI(sfx.enabled);
    sfxToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const newState = sfx.toggle();
      updateSfxButtonUI(newState);
    });
  }

  // ── 3. FOUNDERS DATA & SPOTLIGHT MODAL ──
  const FOUNDERS_DATA = {
    siva: {
      name: 'Siva Aditya Panuganti',
      meta: 'Founder & Principal Architect',
      img: 'siva_aditya.png',
      objectPosition: 'center 15%',
      desc: 'Lead Researcher and Principal Architect at Aditya Security Labs. Specializing in advanced vulnerability research, zero-day discovery, and the security architecture of autonomous AI agents.',
      highlights: [
        '<strong>Critical Zero-Days:</strong> <span class="badge-pill badge-critical">CVSS 9.8</span> FlowiseAI · <span class="badge-pill badge-high">CVSS 8.1</span> AutoGPT (CVE-2026-22038)',
        '<strong>Verified Research:</strong> <span class="badge-pill badge-verified">4 CVEs</span> <span class="badge-pill badge-verified">1 GHSA</span> vulnerability advisory',
        '<strong>Bounty Awards:</strong> Paid bug bounty rewards from NIIS, Qdrant',
        '<strong>National Infrastructure:</strong> Security research acknowledgments from BSI Germany (CERT-Bund)'
      ],
      link: 'https://www.linkedin.com/in/sivaaditya-panuganti-b67484316/'
    },
    swamy: {
      name: 'Ainavilli Swamy Ganesh',
      meta: 'Co-Founder & Head of Security Engineering',
      img: 'swamy_ganesh.jpg',
      objectPosition: 'center 20%',
      desc: 'Co-Founder and Head of Security Engineering at Aditya Security Labs. Specializing in secure systems architecture, automated code review pipelines, and scaling threat modeling for modern enterprise infrastructure and autonomous AI deployments.',
      highlights: [
        '<strong>Systems Architecture & DevSecOps:</strong> <span class="badge-pill badge-verified">AppSec</span> <span class="badge-pill badge-verified">Threat Modeling</span> Automated security gates & zero-trust IAM',
        '<strong>Cloud & Runtime Defense:</strong> Container sandboxing, Kubernetes cluster hardening & microservice boundary testing',
        '<strong>Institutional Standards:</strong> Technical control implementation for <span class="badge-pill badge-verified">EU AI Act Art. 15</span> & NIS2 directive compliance',
        '<strong>Assessment Delivery:</strong> High-assurance source code audits, rapid-response architecture reviews & remediation verification'
      ],
      link: 'https://www.linkedin.com/in/ainavilli-swamy-ganesh-7870112a8/'
    }
  };

  const modal = document.getElementById('spotlightModal');
  const modalClose = document.getElementById('spotlightClose');
  const modalImg = document.getElementById('spotlightImg');
  const modalMeta = document.getElementById('spotlightMeta');
  const modalName = document.getElementById('spotlightName');
  const modalDesc = document.getElementById('spotlightDesc');
  const modalHighlights = document.getElementById('spotlightHighlights');
  const modalLink = document.getElementById('spotlightLink');

  function openSpotlight(key) {
    const data = FOUNDERS_DATA[key];
    if (!data || !modal) return;

    modalImg.src = data.img;
    modalImg.alt = data.name;
    modalImg.style.objectPosition = data.objectPosition || 'center center';
    modalMeta.textContent = data.meta;
    modalName.textContent = data.name;
    modalDesc.textContent = data.desc;
    modalLink.href = data.link;

    modalHighlights.innerHTML = data.highlights
      .map(h => `<div>${h}</div>`)
      .join('');

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    sfx.playModalOpen();
  }

  function closeSpotlight() {
    if (!modal || !modal.classList.contains('active')) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    sfx.playModalClose();
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeSpotlight);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeSpotlight();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSpotlight();
    }
  });

  // ── 4. VIEWFINDER PHOTO CLICK & HOVER SOUNDS ──
  const viewfinders = document.querySelectorAll('.photo-viewfinder');
  viewfinders.forEach(vf => {
    // Hover tick
    vf.addEventListener('mouseenter', () => {
      sfx.playHoverTick();
    });

    // Click: Trigger realistic camera shutter sound + camera flash + open modal
    vf.addEventListener('click', function () {
      const founderKey = this.getAttribute('data-founder');
      const flash = this.querySelector('.shutter-flash');

      // 1. Play Camera Shutter Sound
      sfx.playCameraShutter();

      // 2. Trigger Visual Camera Shutter Flash
      if (flash) {
        flash.classList.remove('flashing');
        // Force reflow
        void flash.offsetWidth;
        flash.classList.add('flashing');
      }

      // 3. Open Spotlight Modal after crisp 120ms shutter exposure
      setTimeout(() => {
        openSpotlight(founderKey);
      }, 120);
    });
  });

  // ── 5. GLOBAL INTERACTIVE UI CLICKS ──
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button, .skill-pill, .serve-item');
    if (target && !target.closest('.photo-viewfinder') && target.id !== 'sfx-toggle') {
      sfx.playUiClick(750, 0.1);
    }
  });

  // ── 6. ELEGANT FADE REVEALS (Intersection Observer) ──
  const revealElements = document.querySelectorAll('.fade-up, .fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

  revealElements.forEach(el => observer.observe(el));

  // ── 7. CONTACT FORM → MAILTO REDIRECT ──
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      sfx.playUiClick(950, 0.2);

      const btn = document.getElementById('submitBtn');
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const company = document.getElementById('company').value.trim();
      const role = document.getElementById('role') ? document.getElementById('role').value.trim() : '';
      const stack = document.getElementById('tech-stack') ? document.getElementById('tech-stack').value.trim() : '';
      const size = document.getElementById('codebase-size') ? document.getElementById('codebase-size').value : '';
      const details = document.getElementById('details').value.trim();

      if (!name || !email || !company || !details) {
        btn.textContent = 'Required fields missing.';
        setTimeout(() => (btn.textContent = 'Submit Audit Request'), 2500);
        return;
      }

      btn.textContent = 'Preparing Draft...';

      const subject = encodeURIComponent(`Audit Request: ${company}`);
      const body = encodeURIComponent(
        `Name: ${name}\nCompany: ${company}\nRole: ${role}\nEmail: ${email}\n\nTech Stack: ${stack}\nCodebase Size: ${size}\n\nDetails:\n${details}`
      );

      window.location.href = `mailto:adityasecuritylabs@gmail.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        btn.textContent = 'Submit Audit Request';
        form.reset();
      }, 3000);
    });
  }

  console.log('Aditya Security Labs — Audio Engine & UI Smoothness Initialized');
})();
