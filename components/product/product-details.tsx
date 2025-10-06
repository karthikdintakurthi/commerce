'use client';

import { AddToCart } from '@/components/cart/add-to-cart';
import { ProductVariantPicker } from '@/components/product/product-variant-picker';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { Product } from 'lib/shopify/types';
import { Award, Heart, Share2, Shield, Star, Truck } from 'lucide-react';
import { useState } from 'react';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleVariantChange = (variant: any) => {
    setSelectedVariant(variant);
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const isNew = false;
  const isBestseller = false; // This could be based on actual product data

  return (
    <div className="space-y-6">
      {/* Title and Badges */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            {product.title}
          </h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleWishlist}
              className="text-gray-400 hover:text-red-500"
            >
              <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="text-gray-400 hover:text-gray-600"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Key Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Shield className="h-3 w-3 mr-1" />
            Skin-friendly
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Award className="h-3 w-3 mr-1" />
            Lightweight
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <Truck className="h-3 w-3 mr-1" />
            Ready to ship
          </Badge>
          {isNew && (
            <Badge variant="luxury" className="text-xs">
              New
            </Badge>
          )}
          {isBestseller && (
            <Badge variant="secondary" className="text-xs bg-chip-gold text-white">
              Bestseller
            </Badge>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">4.5 (127 reviews)</span>
      </div>

      {/* Short Description */}
      <div className="text-gray-600">
        <p className="text-lg leading-relaxed">
          {product.description || 'Discover the timeless elegance of our premium Indian jewelry collection. Each piece is meticulously crafted with authentic materials and traditional techniques, perfect for special occasions or everyday wear.'}
        </p>
      </div>

      <Separator />

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(parseFloat(product.priceRange.maxVariantPrice.amount), {
              currency: product.priceRange.maxVariantPrice.currencyCode
            })}
          </span>
          {product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount && (
            <span className="text-xl text-gray-500 line-through">
              {formatPrice(parseFloat(product.priceRange.minVariantPrice.amount), {
                currency: product.priceRange.minVariantPrice.currencyCode
              })}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">Including all taxes and fees</p>
      </div>

      {/* Variant Picker */}
      {product.options && product.options.length > 0 && (
        <div className="space-y-4">
          <ProductVariantPicker
            options={product.options}
            variants={product.variants}
            onVariantChange={handleVariantChange}
          />
        </div>
      )}

      {/* Add to Cart */}
      <div className="space-y-4">
        <AddToCart product={product} />
        
        {/* Quick Info */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Truck className="h-4 w-4" />
            <span>Free shipping over $75</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>7-day returns</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Award className="h-4 w-4" />
            <span>Authentic guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}
