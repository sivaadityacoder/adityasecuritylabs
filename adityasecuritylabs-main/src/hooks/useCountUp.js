import { useState, useEffect } from 'react';

export default function useCountUp(targetValue, duration = 1400, startAnimation = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTime = null;
    let animationFrameId = null;

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      
      const currentValue = easedProgress * targetValue;
      setValue(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setValue(targetValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [targetValue, duration, startAnimation]);

  return value.toFixed(1);
}
