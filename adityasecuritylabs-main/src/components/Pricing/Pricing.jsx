import React from 'react';
import { motion } from 'framer-motion';
import styles from './Pricing.module.css';

export default function Pricing() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const services = [
    {
      title: 'Web Security Service',
      price: '$300 / engagement',
      description: 'Full-scope web application security assessment covering OWASP Top 10, authentication flaws, injection vulnerabilities, XSS, CSRF, and API security. Includes a detailed report with remediation steps. 1-2 business days.'
    },
    {
      title: 'AI Sandbox & Agent Security Audit',
      price: '$2,500 / engagement',
      description: 'Comprehensive source code review and dynamic penetration test targeting sandbox escapes, prompt injection vectors, and tool execution boundaries. 3-5 business days.'
    },
    {
      title: 'Vector DB & Infrastructure Review',
      price: '$1,800 / engagement',
      description: 'Deep-dive audit into vector database index isolation, multi-tenant boundaries, distance metric edge cases, and API permission structures. 3 business days.'
    },
    {
      title: 'Continuous Research Advisory',
      price: '$999 / month',
      description: 'Monthly retainer providing priority zero-day advisory, continuous PR security reviews, direct Slack/Teams access, and architecture guidance. Minimum 3 months.'
    }
  ];

  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingClip}>
          <motion.h2
            className={styles.heading}
            initial={prefersReducedMotion ? { y: '0%' } : { y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            Services & Scope
          </motion.h2>
        </div>

        <motion.div
          className={styles.table}
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
          {services.map((item, index) => (
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
              <div className={styles.headerRow}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.price}>{item.price}</span>
              </div>
              <p className={styles.description}>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
