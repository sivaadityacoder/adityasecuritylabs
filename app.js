
(function () {
  'use strict';

  // ── ELEGANT FADE REVEALS (Intersection Observer) ──
  const revealElements = document.querySelectorAll('.fade-up, .fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });
  
  revealElements.forEach(el => observer.observe(el));

  // ── CONTACT FORM → MAILTO REDIRECT ──
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
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
        setTimeout(() => btn.textContent = 'Submit Audit Request', 2500);
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

  console.log('Aditya Security Labs — 5 Verified Disclosures');

})();
