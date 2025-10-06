'use client';

import { fadeInUp, useReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import * as React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav';
  variant?: 'default' | 'hero' | 'feature' | 'testimonial' | 'cta' | 'footer';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  background?: 'default' | 'muted' | 'primary' | 'secondary' | 'accent' | 'gradient';
  animate?: boolean;
  delay?: number;
  showDivider?: boolean;
  dividerPosition?: 'top' | 'bottom' | 'both';
  children: React.ReactNode;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({
    as: Component = 'section',
    variant = 'default',
    size = 'md',
    background = 'default',
    animate = true,
    delay = 0,
    showDivider = false,
    dividerPosition = 'bottom',
    className,
    children,
    ...props
  }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    
    const sizeClasses = {
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-20',
      full: 'py-24',
    };

    const variantClasses = {
      default: '',
      hero: 'min-h-[60vh] flex items-center',
      feature: 'py-16',
      testimonial: 'py-16 bg-muted/30',
      cta: 'py-16 bg-primary text-primary-foreground',
      footer: 'py-8 border-t',
    };

    const backgroundClasses = {
      default: '',
      muted: 'bg-muted',
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      accent: 'bg-accent text-accent-foreground',
      gradient: 'bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10',
    };

    const dividerClasses = {
      top: 'border-t border-border',
      bottom: 'border-b border-border',
      both: 'border-t border-b border-border',
    };

    const motionProps = animate ? {
      variants: fadeInUp,
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true, margin: '-50px' },
      transition: { 
        duration: prefersReducedMotion ? 0.1 : 0.6, 
        delay: prefersReducedMotion ? 0 : delay 
      }
    } : {};

    const ComponentElement = animate ? motion.section : Component;

    return React.createElement(
      ComponentElement,
      {
        ref: ref as any,
        className: cn(
          'w-full',
          sizeClasses[size],
          variantClasses[variant],
          backgroundClasses[background],
          showDivider && dividerClasses[dividerPosition],
          className
        ),
        ...(animate ? motionProps : {}),
        ...props
      },
      children
    );
  }
);

Section.displayName = 'Section';

export { Section };
