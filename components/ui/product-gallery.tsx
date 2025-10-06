'use client';

import { fadeInUp, useReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { Badge } from './badge';
import { Button } from './button';

export interface ProductGalleryImage {
  url: string;
  altText?: string;
  isVideo?: boolean;
  videoUrl?: string;
  videoDuration?: number; // in seconds
}

export interface ProductGalleryProps {
  images: ProductGalleryImage[];
  selectedIndex?: number;
  onImageChange?: (index: number) => void;
  className?: string;
  showThumbnails?: boolean;
  showZoom?: boolean;
  showVideoControls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
}

const ProductGallery = React.forwardRef<HTMLDivElement, ProductGalleryProps>(
  ({
    images,
    selectedIndex = 0,
    onImageChange,
    className,
    showThumbnails = true,
    showZoom = true,
    showVideoControls = true,
    autoPlay = false,
    loop = false,
    ...props
  }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(selectedIndex);
    const [isZoomed, setIsZoomed] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [touchStart, setTouchStart] = React.useState<number | null>(null);
    const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const currentImage = images[currentIndex];
    const isVideo = currentImage?.isVideo;

    // Handle image change
    const handleImageChange = React.useCallback((index: number) => {
      setCurrentIndex(index);
      onImageChange?.(index);
    }, [onImageChange]);

    // Navigation functions
    const goToPrevious = React.useCallback(() => {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
      handleImageChange(newIndex);
    }, [currentIndex, images.length, handleImageChange]);

    const goToNext = React.useCallback(() => {
      const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      handleImageChange(newIndex);
    }, [currentIndex, images.length, handleImageChange]);

    // Touch/swipe handling
    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe) {
        goToNext();
      } else if (isRightSwipe) {
        goToPrevious();
      }
    };

    // Keyboard navigation
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          goToPrevious();
        } else if (e.key === 'ArrowRight') {
          goToNext();
        } else if (e.key === 'Escape') {
          setIsZoomed(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToPrevious, goToNext]);

    // Auto-play for videos
    React.useEffect(() => {
      if (isVideo && autoPlay && !prefersReducedMotion) {
        const timer = setTimeout(() => {
          setIsPlaying(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }, [isVideo, autoPlay, prefersReducedMotion]);

    // Update current index when selectedIndex prop changes
    React.useEffect(() => {
      setCurrentIndex(selectedIndex);
    }, [selectedIndex]);

    if (!images.length) {
      return (
        <div className={cn('flex items-center justify-center h-96 bg-muted rounded-lg', className)}>
          <p className="text-muted-foreground">No images available</p>
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn('relative', className)}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        {...props}
      >
        {/* Main Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          {/* Main Image/Video */}
          <div
            className="relative w-full h-full cursor-zoom-in"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => showZoom && !isVideo && setIsZoomed(!isZoomed)}
          >
            {isVideo ? (
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <video
                  src={currentImage.videoUrl || currentImage.url}
                  className="w-full h-full object-cover"
                  muted={!isPlaying}
                  loop
                  playsInline
                  preload="metadata"
                  autoPlay={isPlaying}
                />
              </div>
            ) : (
              <Image
                src={currentImage.url}
                alt={currentImage.altText || `Product image ${currentIndex + 1}`}
                fill
                className={cn(
                  'object-cover transition-transform duration-300',
                  isZoomed ? 'scale-150' : 'scale-100',
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                )}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}

            {/* Video Overlay */}
            {isVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-16 w-16 rounded-full bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  <Play className={cn('h-8 w-8 fill-current', isPlaying && 'hidden')} />
                </Button>
              </div>
            )}

            {/* Video Duration Badge */}
            {isVideo && currentImage.videoDuration && (
              <Badge variant="secondary" className="absolute top-2 right-2 bg-black/70 text-white">
                {Math.floor(currentImage.videoDuration / 60)}:{(currentImage.videoDuration % 60).toString().padStart(2, '0')}
              </Badge>
            )}

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Zoom Controls */}
            {showZoom && (
              <div className="absolute bottom-2 right-2 flex gap-1">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
                >
                  {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                </Button>
              </div>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-2">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  {currentIndex + 1} / {images.length}
                </Badge>
              </div>
            )}
          </div>

          {/* Zoom Overlay */}
          {isZoomed && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
            >
              <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
                <Image
                  src={currentImage.url}
                  alt={currentImage.altText || `Product image ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                  onClick={() => setIsZoomed(false)}
                  aria-label="Close zoom"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <motion.div
            className="mt-4 grid grid-cols-4 gap-2"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            {images.map((image, index) => (
              <motion.button
                key={index}
                className={cn(
                  'relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200',
                  currentIndex === index
                    ? 'border-chip-gold ring-2 ring-chip-gold/20'
                    : 'border-transparent hover:border-gray-300'
                )}
                onClick={() => handleImageChange(index)}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                {image.isVideo ? (
                  <video
                    src={image.videoUrl || image.url}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={image.url}
                    alt={image.altText || `Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                )}
                {image.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play className="h-3 w-3 text-white" />
                  </div>
                )}
                {image.videoDuration && (
                  <Badge variant="secondary" className="absolute bottom-1 right-1 text-xs bg-black/70 text-white">
                    {Math.floor(image.videoDuration / 60)}:{(image.videoDuration % 60).toString().padStart(2, '0')}
                  </Badge>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Mobile Swipe Indicator */}
        {images.length > 1 && (
          <div className="mt-2 flex justify-center gap-1 md:hidden">
            {images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'h-1 w-6 rounded-full transition-colors',
                  currentIndex === index ? 'bg-chip-gold' : 'bg-gray-300'
                )}
              />
            ))}
          </div>
        )}
      </motion.div>
    );
  }
);

ProductGallery.displayName = 'ProductGallery';

export { ProductGallery };
