import React from 'react';
import { motion, useScroll } from 'framer-motion';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={styles.progressLine}
      style={{ scaleX: scrollYProgress }}
    />
  );
}
