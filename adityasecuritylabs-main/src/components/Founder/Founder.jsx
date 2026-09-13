import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useCountUp from '../../hooks/useCountUp';
import styles from './Founder.module.css';

export default function Founder() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rightColRef = useRef(null);
  const isInView = useInView(rightColRef, { once: true, margin: '-80px' });
  const animatedScore = useCountUp(9.8, 1400, isInView);

  const credentials = [
    { label: 'Specialization', value: 'AI Infrastructure, LLM Sandboxes & Agentic RAG Execution' },
    { label: 'Formal Recognitions', value: 'BSI Germany (CERT-Bund), NIIS (X-Road), Qdrant DB' },
    { label: 'Primary Disclosures', value: '5 Published CVEs (CVSS 9.8 Max Severity)' },
    { label: 'Jurisdiction & Engagement', value: 'Remote-first, EU / US time zone availability under NDA' }
  ];

  return (
    <section id="founder" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingClip}>
          <motion.h2
            className={styles.heading}
            initial={prefersReducedMotion ? { y: '0%' } : { y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            The researcher
          </motion.h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <div className={styles.headerRow}>
              <img src="/logo.png" alt="Aditya Security Labs Logo" className={styles.brandLogoAvatar} />
              <h3 className={styles.name}>Siva Aditya Panuganti</h3>
            </div>

            <motion.p
              className={styles.bio}
              initial={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Independent vulnerability researcher and security consultant conducting deep manual source code audits for mission-critical software. Trusted by government infrastructure providers, vector database creators, and high-growth AI engineering teams.
            </motion.p>

            <div className={styles.credentialsList}>
              {credentials.map((item, index) => (
                <div key={index} className={styles.credRow}>
                  <span className={styles.credLabel}>{item.label}</span>
                  <span className={styles.credValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            ref={rightColRef}
            className={styles.rightCol}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.highlightNumber}>
              CVSS {prefersReducedMotion ? '9.8' : animatedScore}
            </div>
            <div className={styles.divider} />
            <div className={styles.highlightLabel}>
              FlowiseAI sandbox escape & unauthenticated remote code execution vulnerability research.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
