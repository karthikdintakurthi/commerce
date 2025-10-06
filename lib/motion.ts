'use client';

import { motion, type Variant, type Variants } from 'framer-motion';
import * as React from 'react';

// Motion-safe variants that respect prefers-reduced-motion
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for luxury feel
    },
  },
  // Reduced motion variant
  reduced: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const gentleScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  // Reduced motion variant
  reduced: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
    },
  },
};

export const slideIn: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  // Reduced motion variant
  reduced: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  // Reduced motion variant
  reduced: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// Hover animations for interactive elements
export const hoverLift: Variants = {
  rest: {
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  // Reduced motion variant
  reduced: {
    y: 0,
    scale: 1,
    transition: {
      duration: 0.1,
    },
  },
};

// Focus animations for accessibility
export const focusRing: Variants = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  focus: {
    scale: 1.01,
    transition: {
      duration: 0.2,
    },
  },
  // Reduced motion variant
  reduced: {
    scale: 1,
    transition: {
      duration: 0.1,
    },
  },
};

// Page transition variants
export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  // Reduced motion variant
  reduced: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

// Utility function to get motion-safe variants
export function getMotionVariants(variants: Variants, prefersReducedMotion: boolean = false): Variants {
  if (prefersReducedMotion) {
    // Return reduced motion variants
    const reducedVariants: Variants = {};
    Object.keys(variants).forEach(key => {
      const variant = variants[key];
      if (variant && typeof variant === 'object' && 'reduced' in variant) {
        reducedVariants[key] = (variant as any).reduced;
      } else {
        reducedVariants[key] = {
          ...variant,
          transition: { duration: 0.1 }
        } as Variant;
      }
    });
    return reducedVariants;
  }
  return variants;
}

// Hook to detect reduced motion preference
export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Motion component wrapper with reduced motion support
export function MotionSafeDiv({ 
  children, 
  variants, 
  initial = 'hidden',
  animate = 'visible',
  className,
  ...props 
}: {
  children: React.ReactNode;
  variants: Variants;
  initial?: string;
  animate?: string;
  className?: string;
  [key: string]: any;
}) {
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = getMotionVariants(variants, prefersReducedMotion);

  return React.createElement(motion.div, {
    variants: motionVariants,
    initial,
    animate,
    className,
    ...props
  }, children);
}

// Motion component wrapper for sections
export function MotionSafeSection({ 
  children, 
  variants, 
  initial = 'hidden',
  animate = 'visible',
  className,
  ...props 
}: {
  children: React.ReactNode;
  variants: Variants;
  initial?: string;
  animate?: string;
  className?: string;
  [key: string]: any;
}) {
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = getMotionVariants(variants, prefersReducedMotion);

  return React.createElement(motion.section, {
    variants: motionVariants,
    initial,
    animate,
    className,
    ...props
  }, children);
}

// Motion component wrapper for articles
export function MotionSafeArticle({ 
  children, 
  variants, 
  initial = 'hidden',
  animate = 'visible',
  className,
  ...props 
}: {
  children: React.ReactNode;
  variants: Variants;
  initial?: string;
  animate?: string;
  className?: string;
  [key: string]: any;
}) {
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = getMotionVariants(variants, prefersReducedMotion);

  return React.createElement(motion.article, {
    variants: motionVariants,
    initial,
    animate,
    className,
    ...props
  }, children);
}

// Motion component wrapper for headers
export function MotionSafeHeader({ 
  children, 
  variants, 
  initial = 'hidden',
  animate = 'visible',
  className,
  ...props 
}: {
  children: React.ReactNode;
  variants: Variants;
  initial?: string;
  animate?: string;
  className?: string;
  [key: string]: any;
}) {
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = getMotionVariants(variants, prefersReducedMotion);

  return React.createElement(motion.header, {
    variants: motionVariants,
    initial,
    animate,
    className,
    ...props
  }, children);
}