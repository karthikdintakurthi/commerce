'use client';

import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import { ProductMedia } from './product-media';

interface ProductTileMediaProps {
  product: Product;
  alt: string;
  label: {
    title: string;
    amount: string;
    currencyCode: string;
  };
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export function ProductTileMedia({ 
  product, 
  alt, 
  label, 
  fill = true, 
  sizes,
  className,
  priority = false 
}: ProductTileMediaProps) {
  // Check if we have media (videos/images) available
  const hasMedia = product.media && product.media.length > 0;
  
  // Get the first video if available, otherwise get the first image
  const firstVideo = hasMedia ? product.media.find(item => 
    item.mediaContentType === 'VIDEO' || item.mediaContentType === 'EXTERNAL_VIDEO'
  ) : null;
  
  const firstImage = hasMedia ? product.media.find(item => 
    item.mediaContentType === 'IMAGE'
  ) : null;
  
  // Prioritize video over image, fallback to featuredImage
  const mediaToShow = firstVideo || firstImage;
  
  if (mediaToShow && mediaToShow.mediaContentType === 'VIDEO') {
    // For videos, use ProductMedia component
    return (
      <div className="relative w-full h-full">
        <ProductMedia
          media={mediaToShow}
          alt={alt}
          fill={fill}
          sizes={sizes}
          className={className}
          priority={priority}
        />
        {/* Overlay label for media */}
        <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
          <div className="flex items-center rounded-full border bg-background/70 p-1 text-xs font-semibold text-foreground backdrop-blur-md">
            <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">
              {label.title}
            </h3>
            <p className="flex-none rounded-full bg-primary p-2 text-primary-foreground">
              {label.amount}
              <span className="ml-1 inline hidden @[275px]/label:inline">
                {label.currencyCode}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  } else if (mediaToShow && mediaToShow.mediaContentType === 'IMAGE') {
    // For images from media array, use Next.js Image directly
    const mediaImage = mediaToShow as any;
    return (
      <div className="relative w-full h-full">
        <Image
          src={mediaImage.image.url}
          alt={alt}
          className={`${className} object-cover`}
          {...(fill ? {} : { 
            width: mediaImage.image.width, 
            height: mediaImage.image.height 
          })}
          fill={fill}
          sizes={sizes}
        />
        {/* Overlay label for media */}
        <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
          <div className="flex items-center rounded-full border bg-background/70 p-1 text-xs font-semibold text-foreground backdrop-blur-md">
            <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">
              {label.title}
            </h3>
            <p className="flex-none rounded-full bg-primary p-2 text-primary-foreground">
              {label.amount}
              <span className="ml-1 inline hidden @[275px]/label:inline">
                {label.currencyCode}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // Fallback to GridTileImage with featuredImage
  return (
    <GridTileImage
      alt={alt}
      label={label}
      src={product.featuredImage?.url || '/api/placeholder/400/400'}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
