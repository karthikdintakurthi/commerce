import clsx from 'clsx'
import Link from 'next/link'
import { FeaturedProducts } from 'lib/sanity/client'
import { urlFor } from 'lib/sanity/image-url'
import { ProductCard } from '@/components/ui'

interface FeaturedProductsBlockProps {
  block: FeaturedProducts
}

export function FeaturedProductsBlock({ block }: FeaturedProductsBlockProps) {
  const gridClasses = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  const formatPrice = (price: number, currency: string) => {
    const symbols = {
      USD: '$',
      INR: '₹',
      EUR: '€',
      GBP: '£',
    }
    
    return `${symbols[currency as keyof typeof symbols] || '$'}${price.toFixed(2)}`
  }

  return (
    <section className="py-16 px-4">
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

        {/* Products Grid */}
        <div className={clsx(
          'grid gap-6 mb-12',
          gridClasses[block.gridLayout]
        )}>
          {block.products.map((product, index) => (
            <ProductCard
              key={index}
              id={product.shopifyProductHandle || index.toString()}
              title={product.title}
              description={product.description}
              price={{
                amount: product.price.toString(),
                currencyCode: product.currency
              }}
              compareAtPrice={block.showSalePrices && product.compareAtPrice ? {
                amount: product.compareAtPrice.toString(),
                currencyCode: product.currency
              } : undefined}
              image={{
                url: product.images && product.images.length > 0 
                  ? urlFor(product.images[0]).width(400).height(500).url()
                  : '/api/placeholder/400/500',
                altText: product.images?.[0]?.alt || product.title
              }}
              images={product.images?.slice(1, 4).map(img => ({
                url: urlFor(img).width(400).height(500).url(),
                altText: img.alt || product.title,
                isVideo: false,
                videoUrl: undefined,
                videoDuration: undefined
              })) || []}
              href={product.url}
              rating={4.5} // Default rating
              reviewCount={Math.floor(Math.random() * 200) + 10}
              isNew={product.tags?.includes('new') || false}
              isBestseller={product.tags?.includes('bestseller') || false}
              isOnSale={block.showSalePrices && product.isOnSale}
              isOutOfStock={false}
            />
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
