import { ProductGrid } from 'components/product-grid'
import { getProducts } from 'lib/shopify'

interface ShopifyFallbackProps {
  type: 'products' | 'collections' | 'hero'
}

export async function ShopifyFallback({ type }: ShopifyFallbackProps) {
  try {
    switch (type) {
      case 'products':
        // Try to get some products for fallback
        const products = await getProducts({ sortKey: 'CREATED_AT', reverse: true })
        if (products && products.length > 0) {
          return (
            <section className="py-16 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Featured Products
                  </h2>
                  <p className="text-lg text-gray-600">
                    Discover our latest collection
                  </p>
                </div>
                <ProductGrid title="" limit={6} />
              </div>
            </section>
          )
        }
        break

      case 'collections':
        // For collections, we'll show a simple grid of categories
        return (
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Shop by Category
                </h2>
                <p className="text-lg text-gray-600">
                  Explore our curated collections
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: 'Earrings', description: 'Beautiful earrings for every occasion', url: '/search?q=earrings' },
                  { name: 'Necklaces', description: 'Elegant necklaces and chains', url: '/search?q=necklaces' },
                  { name: 'Bangles', description: 'Traditional and modern bangles', url: '/search?q=bangles' },
                  { name: 'Mangalsutras', description: 'Sacred and stylish mangalsutras', url: '/search?q=mangalsutra' },
                  { name: 'Rings', description: 'Stunning rings for every finger', url: '/search?q=rings' },
                  { name: 'Sets', description: 'Complete jewelry sets', url: '/search?q=sets' },
                ].map((category, index) => (
                  <a
                    key={index}
                    href={category.url}
                    className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                      Shop Now →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )

      case 'hero':
        // Simple hero fallback
        return (
          <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Vanitha Fashion Jewelry
              </h1>
              <p className="text-2xl md:text-3xl text-white/90 mb-8 font-light">
                Premium Indian Jewelry & Accessories
              </p>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
                Discover our exquisite collection of traditional and contemporary jewelry pieces. 
                From elegant bangles and stunning earrings to beautiful necklaces and mangalsutras.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/search"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:bg-gray-100"
                >
                  Browse Collection
                </a>
                <a
                  href="/search?q=featured"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:bg-white hover:text-blue-900"
                >
                  View Featured
                </a>
              </div>
            </div>
          </section>
        )

      default:
        return null
    }
  } catch (error) {
    console.warn('Shopify fallback failed:', error)
  }

  return null
}
