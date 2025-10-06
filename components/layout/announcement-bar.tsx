'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const announcements = [
  {
    id: 1,
    message: "Diwali picks - Limited time offers",
    href: "/search?q=diwali"
  },
  {
    id: 2,
    message: "Ships from USA - Fast delivery",
    href: "/shipping"
  },
  {
    id: 3,
    message: "New arrivals - Handcrafted jewelry",
    href: "/search?q=new"
  }
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate announcements every 4 seconds
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const nextAnnouncement = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const prevAnnouncement = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  return (
    <div className="relative bg-gradient-to-r from-chip-gold/10 via-chip-sage/5 to-chip-gold/10 border-b border-chip-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Left spacer for centering */}
          <div className="w-8" />
          
          {/* Announcement content */}
          <div className="flex-1 flex items-center justify-center">
            <div 
              className="relative overflow-hidden w-full max-w-md"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-center"
                >
                  <a
                    href={announcements[currentIndex].href}
                    className="text-sm font-medium text-foreground hover:text-chip-gold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-chip-gold focus:ring-offset-2 rounded-sm"
                  >
                    {announcements[currentIndex].message}
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center space-x-1">
            <button
              onClick={prevAnnouncement}
              className="p-1 rounded-sm hover:bg-chip-gold/10 focus:outline-none focus:ring-2 focus:ring-chip-gold focus:ring-offset-2 transition-colors"
              aria-label="Previous announcement"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground hover:text-chip-gold" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex space-x-1">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-chip-gold focus:ring-offset-1",
                    index === currentIndex 
                      ? "bg-chip-gold scale-110" 
                      : "bg-muted-foreground/30 hover:bg-chip-gold/50"
                  )}
                  aria-label={`Go to announcement ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextAnnouncement}
              className="p-1 rounded-sm hover:bg-chip-gold/10 focus:outline-none focus:ring-2 focus:ring-chip-gold focus:ring-offset-2 transition-colors"
              aria-label="Next announcement"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground hover:text-chip-gold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
