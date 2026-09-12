import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGithub } from 'react-icons/fi';
import styles from './Nav.module.css';

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.92]);

  const navLinks = [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Research', href: '#research' },
    { label: 'Verified impact', href: '#cves' },
    { label: 'Researcher', href: '#founder' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Services & scope', href: '#pricing' },
    { label: 'Advisory', href: '#contact' }
  ];

  return (
    <>
      <motion.nav
        className={styles.nav}
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(8, 8, 8, ${v})`),
          borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(34, 34, 32, ${v})`)
        }}
      >
        <div className={styles.container}>
          <a href="#" className={styles.brand}>
            <img src="/logo.png" alt="Aditya Security Labs Logo" className={styles.logoIcon} />
            <span className={styles.brandText}>ADITYA SECURITY LABS</span>
          </a>

          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="https://github.com/sivaadityacoder"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            aria-label="GitHub Profile"
          >
            <FiGithub />
          </a>

          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.drawerHeader}>
                <a href="#" className={styles.brand} onClick={() => setMobileOpen(false)}>
                  <img src="/logo.png" alt="Aditya Security Labs Logo" className={styles.logoIcon} />
                  <span className={styles.brandText}>ADITYA SECURITY LABS</span>
                </a>
                <button
                  className={styles.closeButton}
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <FiX />
                </button>
              </div>

              <motion.ul
                className={styles.mobileLinks}
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.15 }
                  }
                }}
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.label}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      show: { opacity: 1, y: 0 }
                    }}
                  >
                    <a
                      href={link.href}
                      className={styles.mobileLink}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
