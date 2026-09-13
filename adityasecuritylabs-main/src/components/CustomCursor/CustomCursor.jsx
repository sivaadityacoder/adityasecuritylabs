import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.1 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const ringSpringConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const ringX = useSpring(-100, ringSpringConfig);
  const ringY = useSpring(-100, ringSpringConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 5);
      cursorY.set(e.clientY - 5);

      ringX.set(e.clientX - (isHovered ? 27 : 18));
      ringY.set(e.clientY - (isHovered ? 27 : 18));
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, ringX, ringY, isHovered]);

  return (
    <>
      <motion.div
        className={styles.cursorDot}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      <motion.div
        className={`${styles.cursorRing} ${isHovered ? styles.hovering : ''}`}
        style={{
          x: ringX,
          y: ringY,
        }}
      />
    </>
  );
}
