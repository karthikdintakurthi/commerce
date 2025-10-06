'use client';

import { Media } from 'lib/shopify/types';
import Image from 'next/image';
import { useState } from 'react';
import { ProductMedia } from './product-media';

interface ProductGalleryProps {
  images: Array<{
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  }>;
  media?: Media[];
}

export function ProductGallery({ images, media }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Use media if available, otherwise fall back to images
  const hasMedia = media && media.length > 0;
  const displayItems = hasMedia ? media : images.map(img => ({
    id: img.url,
    image: {
      ...img,
      altText: img.altText || 'Product image',
      width: img.width || 800,
      height: img.height || 800
    },
    mediaContentType: 'IMAGE' as const
  }));
  
  if (!displayItems.length) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src="/api/placeholder/800/800"
          alt="No image available"
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main media */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        {hasMedia && displayItems[selectedIndex] ? (
          <ProductMedia
            media={displayItems[selectedIndex]!}
            alt={`Product media ${selectedIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src={images[selectedIndex]?.url || '/api/placeholder/400/400'}
            alt={images[selectedIndex]?.altText || 'Product image'}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
      
      {/* Thumbnail media */}
      {displayItems.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {displayItems.slice(0, 4).map((item, index) => (
            <div 
              key={hasMedia ? item.id : index} 
              className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer border-2 ${
                selectedIndex === index ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              {hasMedia ? (
                <ProductMedia
                  media={item}
                  alt={`Product media thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src={images[index]?.url || '/api/placeholder/100/100'}
                  alt={images[index]?.altText || `Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
