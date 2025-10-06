'use client';

import { fadeInUp, gentleScale, hoverLift, useReducedMotion } from '@/lib/motion';
import { cn, formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Eye, Heart, Play, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';

export interface ProductImage {
  url: string;
  altText?: string;
  isVideo?: boolean;
  videoUrl?: string;
}

export interface ProductCardProps {
  id: string;
  title: string;
  description?: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  };
  image: ProductImage;
  images?: ProductImage[]; // For Quick View dialog
  href: string;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isOnSale?: boolean;
  isOutOfStock?: boolean;
  className?: string;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  onQuickView?: () => void;
  isInWishlist?: boolean;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({
    id,
    title,
    description,
    price,
    compareAtPrice,
    image,
    images = [],
    href,
    badge,
    rating,
    reviewCount,
    isNew,
    isBestseller,
    isOnSale,
    isOutOfStock,
    className,
    onAddToCart,
    onToggleWishlist,
    onQuickView,
    isInWishlist = false,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(0);
    const prefersReducedMotion = useReducedMotion();

    // Combine main image with additional images for Quick View
    const allImages = [image, ...images].filter(Boolean);

    const handleAddToCart = async () => {
      setIsLoading(true);
      try {
        if (onAddToCart) {
          await onAddToCart();
        } else {
          // Default implementation
          console.log(`Adding ${title} to cart`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const handleToggleWishlist = () => {
      if (onToggleWishlist) {
        onToggleWishlist();
      } else {
        // Default implementation
        console.log(`Toggling wishlist for ${title}`);
      }
    };

    const handleQuickView = () => {
      if (onQuickView) {
        onQuickView();
      } else {
        // Default implementation
        console.log(`Quick view for ${title}`);
      }
    };

    const isDiscounted = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
    const discountPercentage = isDiscounted
      ? Math.round(((parseFloat(compareAtPrice!.amount) - parseFloat(price.amount)) / parseFloat(compareAtPrice!.amount)) * 100)
      : 0;

    return (
      <motion.div
        ref={ref}
        className={cn('group', className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        whileHover={prefersReducedMotion ? {} : hoverLift.hover as any}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        {...props}
      >
        <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
          {/* 4:5 Aspect Ratio Container */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Link href={href} className="block">
              {image.isVideo ? (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <video
                    src={image.videoUrl || image.url}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-12 w-12 rounded-full bg-white/90 hover:bg-white"
                      aria-label="Play video"
                    >
                      <Play className="h-6 w-6 fill-current" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Image
                  src={image.url}
                  alt={image.altText || title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </Link>

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {isNew && (
                <Badge variant="luxury" className="text-xs">
                  New
                </Badge>
              )}
              {isBestseller && (
                <Badge variant="gold" className="text-xs">
                  Bestseller
                </Badge>
              )}
              {isOnSale && (
                <Badge variant="destructive" className="text-xs">
                  Sale
                </Badge>
              )}
              {badge && (
                <Badge variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={handleToggleWishlist}
              aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={cn(
                  'h-4 w-4',
                  isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
                )}
              />
            </Button>

            {/* Quick View Button */}
            {allImages.length > 1 && (
              <motion.div
                className="absolute bottom-2 left-2 right-2"
                variants={gentleScale}
                initial="hidden"
                animate={isHovered ? "visible" : "hidden"}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      className="w-full bg-white/90 hover:bg-white"
                      onClick={onQuickView}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Quick View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Main Image */}
                      <div className="relative aspect-square">
                        <Image
                          src={allImages[selectedImage]?.url || image.url}
                          alt={allImages[selectedImage]?.altText || image.altText || title}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {allImages[selectedImage]?.isVideo && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                            <Button
                              variant="secondary"
                              size="icon"
                              className="h-16 w-16 rounded-full bg-white/90 hover:bg-white"
                            >
                              <Play className="h-8 w-8 fill-current" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Thumbnails */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Gallery</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {allImages.slice(0, 3).map((img, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImage(index)}
                              className={cn(
                                'relative aspect-square rounded-lg overflow-hidden border-2 transition-colors',
                                selectedImage === index
                                  ? 'border-chip-gold'
                                  : 'border-transparent hover:border-gray-300'
                              )}
                            >
                              <Image
                                src={img.url}
                                alt={img.altText || `${title} ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 33vw, 16vw"
                              />
                              {img.isVideo && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                  <Play className="h-4 w-4 text-white" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-foreground">
                              {formatPrice(parseFloat(price.amount), { currency: price.currencyCode })}
                            </span>
                            {isDiscounted && (
                              <span className="text-lg text-muted-foreground line-through">
                                {formatPrice(parseFloat(compareAtPrice!.amount), { currency: compareAtPrice!.currencyCode })}
                              </span>
                            )}
                          </div>
                          {rating && (
                            <div className="flex items-center gap-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      'h-4 w-4',
                                      i < Math.floor(rating)
                                        ? 'fill-yellow-500 text-yellow-500'
                                        : 'text-muted-foreground/30'
                                    )}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {rating} ({reviewCount})
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Buy Now Button */}
                        <Button
                          className="w-full"
                          onClick={handleAddToCart}
                          disabled={isLoading || isOutOfStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {isLoading ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Buy Now'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            )}

            {/* Quick Add Button (fallback when no Quick View) */}
            {allImages.length <= 1 && !isOutOfStock && (
              <motion.div
                className="absolute bottom-2 left-2 right-2"
                variants={gentleScale}
                initial="hidden"
                animate={isHovered ? "visible" : "hidden"}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
              >
                <Button
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={isLoading}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isLoading ? 'Adding...' : 'Quick Add'}
                </Button>
              </motion.div>
            )}

            {/* Out of Stock Overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-sm">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="p-4">
            <Link href={href} className="block">
              <h3 className="font-medium text-sm leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              {description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {description}
                </p>
              )}
            </Link>

            {/* Rating */}
            {rating && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-3 w-3',
                        i < Math.floor(rating)
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'text-muted-foreground/30'
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {rating} ({reviewCount})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">
                {formatPrice(parseFloat(price.amount), { currency: price.currencyCode })}
              </span>
              {isDiscounted && (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(parseFloat(compareAtPrice!.amount), { currency: compareAtPrice!.currencyCode })}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    -{discountPercentage}%
                  </Badge>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

ProductCard.displayName = 'ProductCard';

export { ProductCard };
