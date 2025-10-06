'use client';

import { fadeInUp, useReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import * as React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'nav' | 'aside';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  animate?: boolean;
  children: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    as: Component = 'div', 
    size = 'lg', 
    animate = true,
    className, 
    children, 
    ...props 
  }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    
    const sizeClasses = {
      sm: 'max-w-2xl',
      md: 'max-w-4xl', 
      lg: 'max-w-[1200px]',
      xl: 'max-w-7xl',
      full: 'max-w-none',
    };

    const motionProps = animate ? {
      variants: fadeInUp,
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true, margin: '-50px' },
      transition: { 
        duration: prefersReducedMotion ? 0.1 : 0.6
      }
    } : {};

    const ComponentElement = animate ? motion.div : Component;

    return React.createElement(
      ComponentElement,
      {
        ref,
        className: cn(
          'mx-auto w-full px-4 sm:px-6 lg:px-8',
          sizeClasses[size],
          className
        ),
        ...(animate ? motionProps : {}),
        ...props
      },
      children
    );
  }
);

Container.displayName = 'Container';

export { Container };
