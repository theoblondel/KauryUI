import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const buildKeyframes = (from: any, steps: any[]) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: any = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'characters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const segments = useMemo(() => {
    return animateBy === 'words' ? text.split(' ') : text.split('');
  }, [text, animateBy]);

  const getInitialPosition = () => {
    switch (direction) {
      case 'top':
        return { y: -20 };
      case 'bottom':
        return { y: 20 };
      case 'left':
        return { x: -20 };
      case 'right':
        return { x: 20 };
      default:
        return { y: -20 };
    }
  };

  const variants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <div ref={ref} className={className}>
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{
            duration: 0.6,
            delay: isInView ? index * (delay / 1000) : 0,
            ease: 'easeOut',
          }}
          onAnimationComplete={() => {
            if (index === segments.length - 1 && onAnimationComplete) {
              onAnimationComplete();
            }
          }}
          style={{ display: 'inline-block' }}
        >
          {segment}
          {animateBy === 'words' && index < segments.length - 1 && (
            <span style={{ display: 'inline-block' }}>&nbsp;</span>
          )}
        </motion.span>
      ))}
    </div>
  );
};

export default BlurText;