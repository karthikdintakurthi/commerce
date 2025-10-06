'use client';

import { fadeInUp, useReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import * as React from 'react';

export interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'span' | 'div' | 'p' | 'label';
  variant?: 'default' | 'accent' | 'muted' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  children: React.ReactNode;
}

const Eyebrow = React.forwardRef<HTMLElement, EyebrowProps>(
  ({
    as: Component = 'span',
    variant = 'accent',
    size = 'md',
    animate = true,
    className,
    children,
    ...props
  }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    const variantClasses = {
      default: 'text-foreground',
      accent: 'text-[#C59B2A] font-medium tracking-wide uppercase', // Gold Accent
      muted: 'text-muted-foreground',
      destructive: 'text-destructive',
    };

    const motionProps = animate ? {
      variants: fadeInUp,
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true, margin: '-50px' },
      transition: { 
        duration: prefersReducedMotion ? 0.1 : 0.5
      }
    } : {};

    if (animate) {
      return React.createElement(
        motion.span,
        {
          ref: ref as any,
          className: cn(
            'block font-medium tracking-wide uppercase',
            sizeClasses[size],
            variantClasses[variant],
            className
          ),
          ...motionProps,
          ...(props as any)
        },
        children
      );
    }

    return React.createElement(
      Component,
      {
        ref: ref as any,
        className: cn(
          'block font-medium tracking-wide uppercase',
          sizeClasses[size],
          variantClasses[variant],
          className
        ),
        ...props
      },
      children
    );
  }
);

Eyebrow.displayName = 'Eyebrow';

export { Eyebrow };
