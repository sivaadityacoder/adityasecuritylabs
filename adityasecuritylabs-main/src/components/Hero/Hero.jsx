import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';

export default function Hero() {
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const trustRef = useRef(null);

  const headlineText = "Security research for AI infrastructure that cannot afford to be wrong.";
  const words = headlineText.split(" ");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (headlineRef.current) {
        const spans = headlineRef.current.querySelectorAll(`.${styles.wordSpan}`);
        spans.forEach(s => (s.style.transform = 'translateY(0%)'));
      }
      if (subRef.current) subRef.current.style.opacity = '1';
      if (ctaRef.current) ctaRef.current.style.opacity = '1';
      if (trustRef.current) trustRef.current.style.opacity = '1';
      return;
    }

    const ctx = gsap.context(() => {
      const wordSpans = headlineRef.current.querySelectorAll(`.${styles.wordSpan}`);

      const tl = gsap.timeline();
      
      // Step 1: Word Curtain Reveal
      tl.fromTo(
        wordSpans,
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.09,
          ease: 'power4.out',
          delay: 0.3
        }
      );

      // Step 2: Subheading sequential entry
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out'
        }
      );

      // Step 3: CTA button sequential entry (delay 0.2s after subheading)
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        },
        '+=0.2'
      );

      // Step 4: Trust line sequential entry (delay 0.15s after CTA)
      tl.fromTo(
        trustRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        },
        '+=0.15'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.headline} ref={headlineRef}>
          {words.map((word, idx) => (
            <span key={idx} className={styles.wordParent}>
              <span className={styles.wordSpan}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p className={styles.subheading} ref={subRef} style={{ opacity: 0 }}>
          Manual source code auditing and advisory for AI companies, LLM infrastructure teams, and government contractors.
        </p>

        <div className={styles.actions}>
          <a href="#contact" className={styles.ctaButton} ref={ctaRef} style={{ opacity: 0 }}>
            Request an audit
          </a>
          <span className={styles.trustLine} ref={trustRef} style={{ opacity: 0 }}>
            NDA provided before any code access.
          </span>
        </div>
      </div>
    </section>
  );
}
