'use client';

import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/product-card';
import { Product } from 'lib/types';
import { Filter, Grid3X3, List } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { CollectionSkeleton } from './collection-skeleton';
import { MobileFilterDrawer } from './mobile-filter-drawer';

interface CollectionProductsProps {
  collectionHandle: string;
  searchParams: { [key: string]: string | string[] | undefined };
  initialProducts?: Product[];
}

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'created_at', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'title_asc', label: 'Name: A to Z' },
  { value: 'title_desc', label: 'Name: Z to A' }
];

export function CollectionProducts({ collectionHandle, searchParams, initialProducts = [] }: CollectionProductsProps) {
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const currentSort = (searchParams.sort as string) || 'relevance';
  const currentPage = parseInt((searchParams.page as string) || '1');
  
  // Use initial products from server-side rendering
  const products = initialProducts;
  const loading = false;

  const updateSort = (sort: string) => {
    const params = new URLSearchParams(currentSearchParams);
    params.set('sort', sort);
    params.delete('page'); // Reset to first page when sorting changes
    // Check if we're on a search page or collections page
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/search/')) {
      router.push(`${currentPath}?${params.toString()}`);
    } else {
      router.push(`?${params.toString()}`);
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  if (loading) {
    return <CollectionSkeleton />;
  }

  return (
    <>
      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer 
        isOpen={showMobileFilters} 
        onClose={() => setShowMobileFilters(false)}
        searchParams={searchParams}
      />

      <div className="space-y-6">
        {/* Sticky Filter Bar */}
        <div className="sticky top-20 z-40 bg-background border-b border-border py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            {/* Results Count */}
            <p className="text-sm text-gray-600">
              {products.length} products found
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={currentSort}
                onChange={(e) => updateSort(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-chip-gold focus:border-chip-gold"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none border-r border-gray-300"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
        {products.map((product) => (
          <div key={product.id} className={viewMode === 'list' ? 'flex items-center space-x-4 p-4 border border-gray-200 rounded-lg' : ''}>
            <ProductCard
              id={product.id}
              image={{
                url: product.featuredImage?.url || '/api/placeholder/400/500',
                altText: product.featuredImage?.altText || product.title,
                isVideo: false
              }}
              images={product.images?.map(img => ({
                url: img.url,
                altText: img.altText || product.title,
                isVideo: img.isVideo || false,
                videoUrl: img.videoUrl,
                videoDuration: img.videoDuration
              })) || []}
              title={product.title}
              href={`/product/${product.handle}`}
              price={{
                amount: product.priceRange.minVariantPrice.amount,
                currencyCode: product.priceRange.minVariantPrice.currencyCode
              }}
              className={viewMode === 'list' ? 'w-32 h-32' : ''}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 pt-8">
        <Button variant="outline" size="sm" disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {Math.ceil(products.length / 12)}
        </span>
        <Button variant="outline" size="sm" disabled={currentPage >= Math.ceil(products.length / 12)}>
          Next
        </Button>
      </div>
      </div>
    </>
  );
}
