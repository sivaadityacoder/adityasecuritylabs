import React from 'react';
import { motion } from 'framer-motion';
import styles from './FAQ.module.css';

export default function FAQ() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const faqs = [
    {
      question: 'How are engagements scoped and structured?',
      answer: 'Engagements are scoped following an initial consultation and codebase size analysis under mutual NDA. We provide fixed-duration audit windows focused on critical attack vectors.'
    },
    {
      question: 'Do you execute automated scanners or manual code review?',
      answer: 'All critical findings are discovered through manual source code review. Proprietary AST analysis tools are used solely for initial code indexing and dependency mapping.'
    },
    {
      question: 'What happens if a high-severity zero-day is found during an audit?',
      answer: 'Immediate out-of-band notification is dispatched to your lead engineer alongside a patch recommendation before formal report compilation.'
    },
    {
      question: 'Do you support public coordinated vulnerability disclosure?',
      answer: 'Disclosures are handled strictly according to client preference. We support full confidential remediation or coordinated advisory release with CERT-Bund.'
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingClip}>
          <motion.h2
            className={styles.heading}
            initial={prefersReducedMotion ? { y: '0%' } : { y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            Common questions
          </motion.h2>
        </div>

        <motion.div
          className={styles.grid}
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
          {faqs.map((item, index) => (
            <motion.div
              key={index}
              className={styles.item}
              variants={{
                hidden: prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
                }
              }}
            >
              <h3 className={styles.question}>{item.question}</h3>
              <p className={styles.answer}>{item.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
