import React from 'react';
import { motion } from 'framer-motion';
import styles from './Research.module.css';

export default function Research() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const researchItems = [
    {
      date: 'Aug 2026',
      project: 'ASL V6 Engine',
      status: 'Open-sourced on GitHub',
      link: 'https://github.com/adityasecuritylabs'
    },
    {
      date: 'Jul 2026',
      project: 'Qdrant',
      status: 'Paid security research engagement. Vulnerability disclosed and remediated.',
      link: '#'
    },
    {
      date: 'Jan 2026',
      project: 'NIIS / X-Road',
      status: 'Paid security research engagement. CVE disclosed and patched in v7.7.1.',
      link: '#'
    }
  ];

  return (
    <section id="research" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingClip}>
          <motion.h2
            className={styles.heading}
            initial={prefersReducedMotion ? { y: '0%' } : { y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            Activity & Recent Research
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
          {researchItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
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
              <span className={styles.date}>{item.date}</span>
              <span className={styles.project}>{item.project}</span>
              <span className={styles.status}>{item.status}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
