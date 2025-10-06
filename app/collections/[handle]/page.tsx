import { CollectionBreadcrumbs } from '@/components/collections/collection-breadcrumbs';
import { CollectionFacets } from '@/components/collections/collection-facets';
import { CollectionHeader } from '@/components/collections/collection-header';
import { CollectionProducts } from '@/components/collections/collection-products';
import { CollectionSkeleton } from '@/components/collections/collection-skeleton';
import { getCollection } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  
  try {
    const collection = await getCollection(handle);
    
    if (!collection) {
      return {
        title: 'Collection Not Found',
        description: 'The requested collection could not be found.'
      };
    }

    return {
      title: collection.title,
      description: collection.description || `Shop our ${collection.title} collection - Premium Indian jewelry and accessories.`,
      keywords: ['Indian jewelry', 'premium accessories', 'handcrafted', 'authentic', collection.title.toLowerCase()],
      openGraph: {
        title: collection.title,
        description: collection.description || `Shop our ${collection.title} collection`,
        images: collection.image ? [{
          url: collection.image.url,
          alt: collection.image.altText || collection.title,
          width: collection.image.width,
          height: collection.image.height
        }] : [],
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: collection.title,
        description: collection.description || `Shop our ${collection.title} collection`,
        images: collection.image?.url
      }
    };
  } catch (error) {
    console.warn('Failed to generate metadata for collection:', handle);
    return {
      title: 'Collection Not Found',
      description: 'The requested collection could not be found.'
    };
  }
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { handle } = await params;
  const search = await searchParams;
  
  let collection;
  try {
    collection = await getCollection(handle);
  } catch (error) {
    console.warn('Failed to fetch collection:', handle);
  }

  if (!collection) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <Suspense fallback={<div className="h-12 bg-gray-50 animate-pulse" />}>
        <CollectionBreadcrumbs collection={collection} />
      </Suspense>

      {/* Collection Header */}
      <Suspense fallback={<div className="h-64 bg-gray-50 animate-pulse" />}>
        <CollectionHeader collection={collection} />
      </Suspense>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Facets */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Suspense fallback={<div className="space-y-6"><div className="h-8 bg-gray-200 rounded animate-pulse" /><div className="h-32 bg-gray-200 rounded animate-pulse" /><div className="h-24 bg-gray-200 rounded animate-pulse" /></div>}>
                <CollectionFacets searchParams={search} />
              </Suspense>
            </div>
          </aside>

          {/* Main Content - Products */}
          <main className="flex-1">
            <Suspense fallback={<CollectionSkeleton />}>
              <CollectionProducts 
                collectionHandle={handle} 
                searchParams={search} 
              />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour
