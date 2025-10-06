'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

interface CollectionFacetsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const FACET_OPTIONS = {
  type: [
    { value: 'necklaces', label: 'Necklaces' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'bangles', label: 'Bangles' },
    { value: 'mangalsutra', label: 'Mangalsutra' },
    { value: 'rings', label: 'Rings' },
    { value: 'hair-accessories', label: 'Hair Accessories' }
  ],
  finish: [
    { value: 'matte', label: 'Matte' },
    { value: 'polished', label: 'Polished' },
    { value: 'antique', label: 'Antique' },
    { value: 'brushed', label: 'Brushed' },
    { value: 'hammered', label: 'Hammered' }
  ],
  color: [
    { value: 'emerald', label: 'Emerald', color: '#10B981' },
    { value: 'ruby', label: 'Ruby', color: '#DC2626' },
    { value: 'gold', label: 'Gold', color: '#D97706' },
    { value: 'ivory', label: 'Ivory', color: '#F3F4F6' },
    { value: 'black', label: 'Black', color: '#111827' }
  ],
  price: [
    { value: '0-25', label: 'Under $25' },
    { value: '25-50', label: '$25 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: 'Over $200' }
  ],
  availability: [
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'pre-order', label: 'Pre-order' }
  ]
};

export function CollectionFacets({ searchParams }: CollectionFacetsProps) {
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const [openFacets, setOpenFacets] = useState<Set<string>>(new Set(['type', 'color']));

  const getActiveFilters = useCallback((facet: string) => {
    const value = searchParams[facet];
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [searchParams]);

  const toggleFacet = useCallback((facet: string) => {
    setOpenFacets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(facet)) {
        newSet.delete(facet);
      } else {
        newSet.add(facet);
      }
      return newSet;
    });
  }, []);

  const updateFilter = useCallback((facet: string, value: string) => {
    const params = new URLSearchParams(currentSearchParams);
    const currentValues = getActiveFilters(facet);
    
    if (currentValues.includes(value)) {
      // Remove the filter
      const newValues = currentValues.filter(v => v !== value);
      if (newValues.length === 0) {
        params.delete(facet);
      } else {
        params.set(facet, newValues.join(','));
      }
    } else {
      // Add the filter
      const newValues = [...currentValues, value];
      params.set(facet, newValues.join(','));
    }
    
    // Reset to first page when filters change
    params.delete('page');
    
    // Check if we're on a search page or collections page
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/search/')) {
      router.push(`${currentPath}?${params.toString()}`);
    } else {
      router.push(`?${params.toString()}`);
    }
  }, [currentSearchParams, getActiveFilters, router]);

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams(currentSearchParams);
    Object.keys(FACET_OPTIONS).forEach(facet => {
      params.delete(facet);
    });
    params.delete('page');
    // Check if we're on a search page or collections page
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/search/')) {
      router.push(`${currentPath}?${params.toString()}`);
    } else {
      router.push(`?${params.toString()}`);
    }
  }, [currentSearchParams, router]);

  const hasActiveFilters = Object.keys(FACET_OPTIONS).some(facet => 
    getActiveFilters(facet).length > 0
  );

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Active Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(FACET_OPTIONS).map(([facet, options]) => 
              getActiveFilters(facet).map(value => {
                const option = options.find(opt => opt.value === value);
                return option ? (
                  <Badge
                    key={`${facet}-${value}`}
                    variant="secondary"
                    className="flex items-center gap-1 pr-1"
                  >
                    {option.label}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-gray-300"
                      onClick={() => updateFilter(facet, value)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ) : null;
              })
            )}
          </div>
        </div>
      )}

      {/* Facet Groups */}
      {Object.entries(FACET_OPTIONS).map(([facet, options]) => {
        const isOpen = openFacets.has(facet);
        const activeValues = getActiveFilters(facet);
        
        return (
          <div key={facet} className="border-b border-gray-200 pb-4">
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto font-medium text-gray-900"
              onClick={() => toggleFacet(facet)}
            >
              <span className="capitalize">{facet}</span>
              <ChevronDown 
                className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
              />
            </Button>
            
            {isOpen && (
              <div className="mt-3 space-y-2">
                {options.map(option => {
                  const isActive = activeValues.includes(option.value);
                  
                  return (
                    <label
                      key={option.value}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => updateFilter(facet, option.value)}
                        className="h-4 w-4 text-chip-gold focus:ring-chip-gold border-gray-300 rounded"
                      />
                      <div className="flex items-center space-x-2 flex-1">
                        {facet === 'color' && 'color' in option && (
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: option.color }}
                          />
                        )}
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          {option.label}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
