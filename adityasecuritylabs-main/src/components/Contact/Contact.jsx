import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    stack: '',
    description: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_fallback/exec';
      const payload = new FormData();
      Object.keys(formData).forEach(key => payload.append(key, formData[key]));
      fetch(SCRIPT_URL, { method: 'POST', body: payload }).catch(() => {});

      const subject = encodeURIComponent(`Audit Request: ${formData.company || formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nTech Stack: ${formData.stack}\n\nDescription:\n${formData.description}`
      );
      
      setTimeout(() => {
        window.location.href = `mailto:adityasecuritylabs@gmail.com?subject=${subject}&body=${body}`;
        setStatus('success');
      }, 400);
    } catch (err) {
      setStatus('success');
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingClip}>
          <motion.h2
            className={styles.heading}
            initial={prefersReducedMotion ? { y: '0%' } : { y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            Start a conversation.
          </motion.h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <p className={styles.intro}>
              All engagements begin with a confidential consultation. NDA provided before any code access. Engagements are scoped after an initial discussion.
            </p>

            <div className={styles.availability}>
              <span className={styles.redDot} />
              <span>Q3 2026: 2 advisory slots remaining.</span>
            </div>

            <a href="mailto:adityasecuritylabs@gmail.com" className={styles.email}>
              adityasecuritylabs@gmail.com
            </a>
          </div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {status === 'success' ? (
              <div className={styles.successMessage}>
                Thank you for your inquiry. An NDA draft and schedule availability will be sent to your email within 24 hours.
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="company" className={styles.label}>
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Work email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="stack" className={styles.label}>
                    Technology stack
                  </label>
                  <input
                    type="text"
                    id="stack"
                    name="stack"
                    placeholder="e.g. Python, Rust, Flowise, Qdrant"
                    value={formData.stack}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="description" className={styles.label}>
                    Description of concern
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className={styles.textarea}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={styles.submitBtn}
                >
                  {status === 'submitting' ? 'Preparing...' : 'Send request'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
