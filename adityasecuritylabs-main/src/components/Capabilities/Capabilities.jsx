import React from 'react';
import { motion } from 'framer-motion';
import styles from './Capabilities.module.css';

export default function Capabilities() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const whoWeServeItems = [
    'AI Startups (Seed → Series B)',
    'LLM Infrastructure Companies',
    'EU Government Contractors',
    'Fintech on Rails'
  ];

  const capabilities = [
    'AI Agent Threat Modeling',
    'AST-driven SAST',
    'Runtime Sandbox Escapes',
    'Prompt Injection Analysis',
    'Deserialization RCEs',
    'Zero-Day Vulnerability Research',
    'Source Code Audits',
    'DevSecOps Integration',
    'Docker Runtime Verification'
  ];

  return (
    <section id="capabilities" className={styles.section}>
      <div className={styles.container}>
        {/* Who We Serve Section */}
        <div className={styles.whoWeServe}>
          <div className={styles.subHeadingClip}>
            <motion.h3
              className={styles.subHeading}
              initial={prefersReducedMotion ? { y: '0%' } : { y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              Who We Serve
            </motion.h3>
          </div>

          <motion.div
            className={styles.targetGrid}
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
            {whoWeServeItems.map((item, index) => (
              <motion.div
                key={index}
                className={styles.targetCard}
                variants={{
                  hidden: prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
                  }
                }}
              >
                <div className={styles.targetTitle}>{item}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Methodology & Core Capabilities */}
        <span className={styles.eyebrow}>Methodology</span>

        <div className={styles.headingClip}>
          <motion.h2
            className={styles.heading}
            initial={prefersReducedMotion ? { y: '0%' } : { y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            Core Capabilities
          </motion.h2>
        </div>

        <motion.p
          className={styles.audience}
          initial={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We deploy advanced, research-driven methodologies that go far beyond automated scanning, focusing exclusively on complex, high-impact vulnerabilities.
        </motion.p>

        <motion.div
          className={styles.capabilitiesGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.05
              }
            }
          }}
        >
          {capabilities.map((title, index) => (
            <motion.div
              key={index}
              className={styles.row}
              variants={{
                hidden: prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
                }
              }}
            >
              <span className={styles.bulletDot} />
              <span className={styles.title}>{title}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
