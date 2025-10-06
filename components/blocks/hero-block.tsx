'use client';

import { fadeInUp, gentleScale, slideIn, staggerContainer, useReducedMotion } from '@/lib/motion';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Hero } from 'lib/sanity/client';
import { urlFor } from 'lib/sanity/image-url';
import Image from 'next/image';
import Link from 'next/link';

interface HeroBlockProps {
  block: Hero
}

export function HeroBlock({ block }: HeroBlockProps) {
  const prefersReducedMotion = useReducedMotion();
  const backgroundImageUrl = block.backgroundImage 
    ? urlFor(block.backgroundImage).width(1920).height(1080).url()
    : null

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const buttonClasses = {
    primary: 'bg-primary hover:bg-primary-700 text-primary-foreground',
    secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
  }

  return (
    <motion.section 
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Background Image */}
      {backgroundImageUrl && (
        <motion.div 
          className="absolute inset-0 z-0"
          variants={gentleScale}
          initial="hidden"
          animate="visible"
        >
          <Image
            src={backgroundImageUrl}
            alt={block.backgroundImage?.alt || block.title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: (block.overlayOpacity || 50) / 100 }}
          />
        </motion.div>
      )}

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-4 py-16"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className={clsx('max-w-4xl mx-auto', alignmentClasses[block.alignment])}>
          {/* Title */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            variants={fadeInUp}
          >
            {block.title}
          </motion.h1>

          {/* Subtitle */}
          {block.subtitle && (
            <motion.h2 
              className="text-2xl md:text-3xl text-white/90 mb-6 font-light"
              variants={fadeInUp}
            >
              {block.subtitle}
            </motion.h2>
          )}

          {/* Description */}
          {block.description && (
            <motion.p 
              className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-3xl"
              variants={fadeInUp}
            >
              {block.description}
            </motion.p>
          )}

          {/* Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start"
            variants={staggerContainer}
          >
            {block.primaryButton && (
              <motion.div variants={slideIn}>
                <Link
                  href={block.primaryButton.url}
                  className={clsx(
                    'inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform',
                    buttonClasses[block.primaryButton.style],
                    !prefersReducedMotion && 'hover:scale-105'
                  )}
                >
                  {block.primaryButton.text}
                </Link>
              </motion.div>
            )}

            {block.secondaryButton && (
              <motion.div variants={slideIn}>
                <Link
                  href={block.secondaryButton.url}
                  className={clsx(
                    'inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform',
                    buttonClasses[block.secondaryButton.style],
                    !prefersReducedMotion && 'hover:scale-105'
                  )}
                >
                  {block.secondaryButton.text}
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
}
