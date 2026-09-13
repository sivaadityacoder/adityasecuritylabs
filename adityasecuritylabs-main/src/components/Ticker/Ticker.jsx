import React from 'react';
import styles from './Ticker.module.css';

export default function Ticker() {
  const items = [
    'NIIS (Nordic Institute for Interoperability Solutions)',
    'Qdrant Vector Database',
    'BSI Germany (CERT-Bund)',
    'X-Road Infrastructure',
    'FlowiseAI Ecosystem',
    'EU Government Technology Contractors',
    'Series B AI Startups'
  ];

  return (
    <div className={styles.tickerSection} aria-label="Trusted client and partner engagements">
      <div className={styles.tickerTrack}>
        {/* Double the list for seamless CSS scrolling loop */}
        {[...items, ...items].map((item, index) => (
          <div key={index} className={styles.tickerContent}>
            <span className={styles.item}>{item}</span>
            <span className={styles.separator}>·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
