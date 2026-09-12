import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topGrid}>
          <div className={styles.brandCol}>
            <div className={styles.brandHeader}>
              <img src="/logo.png" alt="Aditya Security Labs Logo" className={styles.logoIcon} />
              <span className={styles.brandMark}>ADITYA SECURITY LABS</span>
            </div>
            <p className={styles.tagline}>
              Manual security research for AI infrastructure.
            </p>
            <span className={styles.slogan}>Securing a brighter tomorrow</span>
          </div>

          <div>
            <div className={styles.colHeader}>Navigation</div>
            <ul className={styles.linkList}>
              <li><a href="#capabilities" className={styles.link}>Capabilities</a></li>
              <li><a href="#research" className={styles.link}>Research</a></li>
              <li><a href="#cves" className={styles.link}>Verified impact</a></li>
              <li><a href="#founder" className={styles.link}>The researcher</a></li>
              <li><a href="#how-it-works" className={styles.link}>How it works</a></li>
              <li><a href="#pricing" className={styles.link}>Services & scope</a></li>
              <li><a href="#contact" className={styles.link}>Advisory consultation</a></li>
            </ul>
          </div>

          <div>
            <div className={styles.colHeader}>Publications & disclosures</div>
            <ul className={styles.linkList}>
              <li><a href="/blog-autogpt-cvss81.html" className={styles.link}>AutoGPT advisory</a></li>
              <li><a href="https://github.com/sivaadityacoder" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub — sivaadityacoder</a></li>
              <li><a href="https://github.com/sivaadityacoder/adityasecuritylabs" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub security advisories</a></li>
              <li><a href="mailto:adityasecuritylabs@gmail.com" className={styles.link}>PVP key / Email</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          © 2026 Aditya Security Labs · Siva Aditya Panuganti · Remote-first, EU timezone · UDYAM-AP-03-0107216
        </div>
      </div>
    </footer>
  );
}
