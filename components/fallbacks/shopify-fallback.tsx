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
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Featured Products
                  </h2>
                  <p className="text-lg text-muted-foreground">
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
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Shop by Category
                </h2>
                <p className="text-lg text-muted-foreground">
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
                    className="group bg-card border border-border rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <span className="text-accent font-semibold text-sm group-hover:text-accent/80">
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
          <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-chip-emerald to-chip-ruby">
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-on-emerald mb-6 leading-tight">
                Vanitha Fashion Jewelry
              </h1>
              <p className="text-2xl md:text-3xl text-on-emerald/90 mb-8 font-light">
                Premium Indian Jewelry & Accessories
              </p>
              <p className="text-lg md:text-xl text-on-emerald/80 mb-8 leading-relaxed max-w-3xl mx-auto">
                Discover our exquisite collection of traditional and contemporary jewelry pieces. 
                From elegant bangles and stunning earrings to beautiful necklaces and mangalsutras.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/search"
                  className="inline-flex items-center justify-center px-8 py-4 bg-card text-card-foreground rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:bg-card/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  Browse Collection
                </a>
                <a
                  href="/search?q=featured"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-card text-card rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:bg-card hover:text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
