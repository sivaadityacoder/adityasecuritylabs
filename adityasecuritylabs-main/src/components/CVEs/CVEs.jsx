import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import styles from './CVEs.module.css';

export default function CVEs() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const cves = [
    {
      cveId: 'CVE-2026-22038',
      cvss: 'CVSS 8.1',
      system: 'AutoGPT',
      name: 'Secrets Leak via Logging',
      link: '/blog-autogpt-cvss81.html',
      description: 'Critical exposure of OpenAI API keys via unsanitized logging mechanisms in autonomous agents.'
    },
    {
      cveId: 'CVE-2025-67146',
      cvss: 'HIGH',
      system: 'Enterprise Rails',
      name: 'Database SQL Injection',
      link: '/blog-rails-sqli-cve-2025-67146.html',
      description: 'Paired attack chain enabling full database read/write access via complex SQL injection.'
    },
    {
      cveId: 'CVE-2025-67147',
      cvss: 'HIGH',
      system: 'Enterprise Rails',
      name: 'Authentication Bypass',
      link: '/blog-rails-authbypass-cve-2025-67147.html',
      description: 'Flaw in session validation allowing unauthenticated attackers to reach privileged admin endpoints.'
    },
    {
      cveId: 'CVE-2025-68621',
      cvss: 'CVSS 7.4',
      system: 'Trilium Notes',
      name: 'Timing Attack Auth Bypass',
      link: '/blog-trilium-timing-cve-2025-68621.html',
      description: 'Sophisticated timing attack against the authentication protocol yielding unauthorized access.'
    },
    {
      cveId: 'GHSA-x58f-9m57',
      cvss: 'CRITICAL',
      system: 'FlowiseAI',
      name: 'Sandbox Escape',
      link: '/blog-flowise-sandbox-ghsa-x58f-9m57.html',
      description: 'Arbitrary code execution via complete sandbox escape in the LLM orchestration layer.'
    }
  ];

  return (
    <section id="cves" className={styles.section}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>VERIFIED DISCLOSURES</span>

        <div className={styles.headingClip}>
          <motion.h2
            className={styles.heading}
            initial={prefersReducedMotion ? { y: '0%' } : { y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            Verified Impact
          </motion.h2>
        </div>

        <p className={styles.subtext}>5 Official Disclosures</p>

        <motion.div
          className={styles.list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.065
              }
            }
          }}
        >
          {cves.map((item, index) => (
            <motion.div
              key={index}
              className={styles.card}
              variants={{
                hidden: prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
                }
              }}
            >
              <div className={styles.metaRow}>
                <div className={styles.scoreBadge}>
                  <span className={styles.redDot} />
                  <span>{item.cvss} / {item.system}</span>
                </div>
                <span className={styles.cveId}>{item.cveId}</span>
              </div>

              <h3 className={styles.vulnName}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.vulnLink}
                >
                  <span>{item.name}</span>
                  <FiExternalLink className={styles.externalIcon} />
                </a>
              </h3>
              <p className={styles.description}>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
