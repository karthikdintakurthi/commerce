'use client';

import { useEffect, useState } from 'react';

interface AriaLiveRegionProps {
  message?: string;
  priority?: 'polite' | 'assertive';
  className?: string;
}

export function AriaLiveRegion({ 
  message, 
  priority = 'polite',
  className = 'sr-only'
}: AriaLiveRegionProps) {
  const [announcement, setAnnouncement] = useState<string>('');

  useEffect(() => {
    if (message) {
      setAnnouncement(message);
      // Clear the message after a short delay to allow re-announcement of the same message
      const timer = setTimeout(() => setAnnouncement(''), 100);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className={className}
      role="status"
    >
      {announcement}
    </div>
  );
}

interface CartAnnouncementProps {
  message: string;
  type?: 'add' | 'remove' | 'update' | 'error';
}

export function CartAnnouncement({ message, type = 'add' }: CartAnnouncementProps) {
  const getPriority = () => {
    switch (type) {
      case 'error':
        return 'assertive';
      case 'add':
      case 'remove':
      case 'update':
      return 'polite';
      default:
        return 'polite';
    }
  };

  return (
    <AriaLiveRegion 
      message={message} 
      priority={getPriority()}
      className="sr-only"
    />
  );
}
