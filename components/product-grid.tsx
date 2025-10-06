import { ProductCard } from '@/components/ui';
import { getProducts } from 'lib/shopify';

// Demo products for when Shopify is not configured
const demoProducts = [
  {
    id: '1',
    handle: 'demo-product-1',
    title: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    priceRange: {
      maxVariantPrice: {
        amount: '299.99',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop',
      altText: 'Premium Wireless Headphones'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop',
        altText: 'Premium Wireless Headphones - Main view'
      },
      {
        url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=500&fit=crop',
        altText: 'Premium Wireless Headphones - Side view'
      },
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop',
        altText: 'Premium Wireless Headphones - Video',
        isVideo: true,
        videoUrl: 'https://example.com/headphones-video.mp4',
        videoDuration: 12
      }
    ],
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    isBestseller: false,
    isOnSale: false,
    isOutOfStock: false
  },
  {
    id: '2',
    handle: 'demo-product-2',
    title: 'Smart Fitness Watch',
    description: 'Track your health and fitness with this advanced smartwatch',
    priceRange: {
      maxVariantPrice: {
        amount: '199.99',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
      altText: 'Smart Fitness Watch'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
        altText: 'Smart Fitness Watch - Main view'
      },
      {
        url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=500&fit=crop',
        altText: 'Smart Fitness Watch - Detail view'
      },
      {
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
        altText: 'Smart Fitness Watch - Video',
        isVideo: true,
        videoUrl: 'https://example.com/watch-video.mp4',
        videoDuration: 8
      }
    ],
    rating: 4.6,
    reviewCount: 89,
    isNew: false,
    isBestseller: true,
    isOnSale: false,
    isOutOfStock: false
  },
  {
    id: '3',
    handle: 'demo-product-3',
    title: 'Eco-Friendly Water Bottle',
    description: 'Sustainable stainless steel water bottle for everyday use',
    priceRange: {
      maxVariantPrice: {
        amount: '29.99',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=500&fit=crop',
      altText: 'Eco-Friendly Water Bottle'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=500&fit=crop',
        altText: 'Eco-Friendly Water Bottle - Main view'
      }
    ],
    rating: 4.4,
    reviewCount: 67,
    isNew: false,
    isBestseller: false,
    isOnSale: true,
    isOutOfStock: false
  },
  {
    id: '4',
    handle: 'demo-product-4',
    title: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt',
    priceRange: {
      maxVariantPrice: {
        amount: '39.99',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      altText: 'Organic Cotton T-Shirt'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
        altText: 'Organic Cotton T-Shirt - Main view'
      }
    ],
    rating: 4.5,
    reviewCount: 43,
    isNew: false,
    isBestseller: false,
    isOnSale: false,
    isOutOfStock: false
  },
  {
    id: '5',
    handle: 'demo-product-5',
    title: 'Bluetooth Speaker',
    description: 'Portable wireless speaker with excellent sound quality',
    priceRange: {
      maxVariantPrice: {
        amount: '89.99',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=500&fit=crop',
      altText: 'Bluetooth Speaker'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=500&fit=crop',
        altText: 'Bluetooth Speaker - Main view'
      }
    ],
    rating: 4.7,
    reviewCount: 156,
    isNew: false,
    isBestseller: false,
    isOnSale: false,
    isOutOfStock: false
  },
  {
    id: '6',
    handle: 'demo-product-6',
    title: 'Minimalist Backpack',
    description: 'Stylish and functional backpack for work and travel',
    priceRange: {
      maxVariantPrice: {
        amount: '129.99',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
      altText: 'Minimalist Backpack'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
        altText: 'Minimalist Backpack - Main view'
      }
    ],
    rating: 4.9,
    reviewCount: 203,
    isNew: false,
    isBestseller: true,
    isOnSale: false,
    isOutOfStock: false
  }
];

interface ProductGridProps {
  title?: string;
  limit?: number;
}

export async function ProductGrid({ title = "Featured Products", limit = 6 }: ProductGridProps) {
  let products = [];
  let isDemoMode = false;

  try {
    // Try to fetch real products from Shopify
    const shopifyProducts = await getProducts({ sortKey: 'CREATED_AT', reverse: true });
    // Transform Shopify products to match our ProductCard interface
    products = shopifyProducts.map((product: any) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: {
        amount: product.priceRange?.maxVariantPrice?.amount || '0',
        currencyCode: product.priceRange?.maxVariantPrice?.currencyCode || 'USD'
      },
      compareAtPrice: product.priceRange?.minVariantPrice?.amount !== product.priceRange?.maxVariantPrice?.amount ? {
        amount: product.priceRange?.minVariantPrice?.amount || '0',
        currencyCode: product.priceRange?.minVariantPrice?.currencyCode || 'USD'
      } : undefined,
      image: {
        url: product.featuredImage?.url || '/api/placeholder/400/500',
        altText: product.featuredImage?.altText || product.title
      },
      images: product.images?.slice(0, 3).map((img: any) => ({
        url: img.url,
        altText: img.altText || product.title,
        isVideo: img.isVideo || false,
        videoUrl: img.videoUrl,
        videoDuration: img.videoDuration
      })) || [],
      href: `/product/${product.handle}`,
      rating: 4.5, // Default rating for demo
      reviewCount: 127,
      isNew: false,
      isBestseller: false,
      isOnSale: product.priceRange?.minVariantPrice?.amount !== product.priceRange?.maxVariantPrice?.amount,
      isOutOfStock: false
    }));
  } catch (error) {
    console.warn('ProductGrid: Shopify not configured, showing demo products');
    isDemoMode = true;
    products = demoProducts.slice(0, limit).map(product => ({
      ...product,
      href: `/product/${product.handle}`
    }));
  }

  if (!products.length) {
    return (
      <div className="mx-auto max-w-screen-2xl px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600">No products available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {isDemoMode && (
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Demo Mode
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <ProductCard
            key={product.id || i}
            id={product.id}
            title={product.title}
            description={product.description}
            price={
              'price' in product ? product.price : {
                amount: product.priceRange?.maxVariantPrice?.amount || '0',
                currencyCode: product.priceRange?.maxVariantPrice?.currencyCode || 'USD'
              }
            }
            compareAtPrice={
              'compareAtPrice' in product ? product.compareAtPrice : undefined
            }
            image={'image' in product ? product.image : {
              url: product.featuredImage?.url || '/api/placeholder/400/500',
              altText: product.featuredImage?.altText || product.title
            }}
            images={'images' in product ? product.images : []}
            href={'href' in product ? product.href : `/product/${(product as any).handle || (product as any).id}`}
            rating={'rating' in product ? product.rating : 4.5}
            reviewCount={'reviewCount' in product ? product.reviewCount : 127}
            isNew={'isNew' in product ? product.isNew : false}
            isBestseller={'isBestseller' in product ? product.isBestseller : false}
            isOnSale={'isOnSale' in product ? product.isOnSale : false}
            isOutOfStock={'isOutOfStock' in product ? product.isOutOfStock : !(product as any).availableForSale}
          />
        ))}
      </div>

      {isDemoMode && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            These are demo products. Configure Shopify to see your real products.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
            <h4 className="font-semibold text-yellow-800 mb-2">🔧 Setup Required</h4>
            <p className="text-yellow-700 text-sm">
              Add your Shopify credentials to <code className="bg-yellow-100 px-1 rounded">.env.local</code> to display real products.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
