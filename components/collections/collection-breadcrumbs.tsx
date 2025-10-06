import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CollectionBreadcrumbsProps {
  collection: {
    title: string;
    handle: string;
  };
}

export function CollectionBreadcrumbs({ collection }: CollectionBreadcrumbsProps) {
  return (
    <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 py-3">
          <Link 
            href="/" 
            className="text-sm font-medium text-gray-500 hover:text-chip-gold transition-colors"
          >
            Home
          </Link>
          
          <ChevronRight className="h-4 w-4 text-chip-gold" />
          
          <Link 
            href="/collections" 
            className="text-sm font-medium text-gray-500 hover:text-chip-gold transition-colors"
          >
            Collections
          </Link>
          
          <ChevronRight className="h-4 w-4 text-chip-gold" />
          
          <span className="text-sm font-medium text-gray-900">
            {collection.title}
          </span>
        </div>
      </div>
    </nav>
  );
}
