import clsx from 'clsx'
import { CollectionGrid } from 'lib/sanity/client'
import { urlFor } from 'lib/sanity/image-url'
import Image from 'next/image'
import Link from 'next/link'

interface CollectionGridBlockProps {
  block: CollectionGrid
}

export function CollectionGridBlock({ block }: CollectionGridBlockProps) {
  const gridClasses = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {block.title}
          </h2>
          {block.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {block.description}
            </p>
          )}
        </div>

        {/* Collections Grid */}
        <div className={clsx(
          'grid gap-8 mb-12',
          gridClasses[block.gridLayout]
        )}>
          {block.collections.map((collection, index) => (
            <Link
              key={index}
              href={collection.url}
              className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                {collection.image ? (
                  <Image
                    src={urlFor(collection.image).width(400).height(400).url()}
                    alt={collection.image.alt || collection.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">No Image</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {collection.title}
                </h3>
                
                {collection.description && (
                  <p className="text-gray-600 mb-3 text-sm">
                    {collection.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  {block.showProductCount && collection.productCount && (
                    <span className="text-sm text-gray-500">
                      {collection.productCount} products
                    </span>
                  )}
                  
                  <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                    Shop Now →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href={block.buttonUrl}
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            {block.buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}
