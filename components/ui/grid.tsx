'use client';

import { staggerContainer, useReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import * as React from 'react';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article' | 'aside' | 'main' | 'nav';
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 'auto-fit' | 'auto-fill';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  minItemWidth?: string;
  animate?: boolean;
  staggerDelay?: number;
  children: React.ReactNode;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({
    as: Component = 'div',
    columns = 'auto-fit',
    gap = 'md',
    minItemWidth = '280px',
    animate = true,
    staggerDelay = 0.1,
    className,
    children,
    ...props
  }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    
    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };

    const getGridTemplateColumns = () => {
      if (typeof columns === 'number') {
        return `repeat(${columns}, 1fr)`;
      }
      if (columns === 'auto-fit') {
        return `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`;
      }
      if (columns === 'auto-fill') {
        return `repeat(auto-fill, minmax(${minItemWidth}, 1fr))`;
      }
      return `repeat(${columns}, 1fr)`;
    };

    const motionProps = animate ? {
      variants: staggerContainer,
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true, margin: '-50px' },
      transition: { 
        duration: prefersReducedMotion ? 0.1 : 0.6,
        staggerChildren: prefersReducedMotion ? 0.05 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0.05 : 0.1
      }
    } : {};

    if (animate) {
      return React.createElement(
        motion.div,
        {
          ref,
          className: cn(
            'grid w-full',
            gapClasses[gap],
            className
          ),
          style: {
            gridTemplateColumns: getGridTemplateColumns(),
            ...props.style
          },
          ...motionProps,
          ...(props as any)
        },
        children
      );
    }

    return React.createElement(
      Component,
      {
        ref,
        className: cn(
          'grid w-full',
          gapClasses[gap],
          className
        ),
        style: {
          gridTemplateColumns: getGridTemplateColumns(),
          ...props.style
        },
        ...props
      },
      children
    );
  }
);

Grid.displayName = 'Grid';

// Grid Item component for individual grid items
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article' | 'section' | 'aside';
  span?: number;
  start?: number;
  end?: number;
  animate?: boolean;
  children: React.ReactNode;
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({
    as: Component = 'div',
    span,
    start,
    end,
    animate = true,
    className,
    children,
    ...props
  }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    
    const motionProps = animate ? {
      variants: {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: prefersReducedMotion ? 0.1 : 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      },
      initial: 'hidden',
      animate: 'visible'
    } : {};

    const gridStyle = {
      gridColumn: span ? `span ${span}` : undefined,
      gridColumnStart: start,
      gridColumnEnd: end,
    };

    if (animate) {
      return React.createElement(
        motion.div,
        {
          ref,
          className: cn('w-full', className),
          style: gridStyle,
          ...motionProps,
          ...(props as any)
        },
        children
      );
    }

    return React.createElement(
      Component,
      {
        ref,
        className: cn('w-full', className),
        style: gridStyle,
        ...props
      },
      children
    );
  }
);

GridItem.displayName = 'GridItem';

export { Grid, GridItem };
