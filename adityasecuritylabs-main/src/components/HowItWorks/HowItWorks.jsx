import React from 'react';
import { motion } from 'framer-motion';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const steps = [
    {
      num: '01',
      title: 'Submit a request',
      description: 'Fill out the audit form. We respond within 24 hours with an NDA.'
    },
    {
      num: '02',
      title: 'Assessment',
      description: 'ASL V6 Engine scan plus rigorous manual review of your codebase. Three to five business days.'
    },
    {
      num: '03',
      title: 'Findings delivered',
      description: 'Verified findings report with patch-ready fixes sent directly to your engineering team.'
    }
  ];

  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingClip}>
          <motion.h2
            className={styles.heading}
            initial={prefersReducedMotion ? { y: '0%' } : { y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            How it works
          </motion.h2>
        </div>

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
          {steps.map((step, index) => (
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
              <div className={styles.number}>{step.num}</div>
              <div className={styles.content}>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
