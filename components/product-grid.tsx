import { ProductCard } from '@/components/ui';
import { getProducts } from 'lib/shopify';

interface ProductGridProps {
  title?: string;
  limit?: number;
}

export async function ProductGrid({ title = "Featured Products", limit = 6 }: ProductGridProps) {
  const shopifyProducts = await getProducts({ first: limit });
  const products = shopifyProducts.map(product => ({
    ...product,
    images: product.images?.map(img => ({
      url: img.url,
      altText: img.altText || product.title,
      width: img.width,
      height: img.height,
      isVideo: img.isVideo || false,
      videoUrl: img.videoUrl,
      videoDuration: img.videoDuration
    })) || [],
    href: `/product/${product.handle}`,
    rating: 4.5,
    reviewCount: 127,
    isNew: false,
    isBestseller: false,
    isOnSale: product.priceRange?.minVariantPrice?.amount !== product.priceRange?.maxVariantPrice?.amount,
    isOutOfStock: false
  }));

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.priceRange?.maxVariantPrice}
              compareAtPrice={product.priceRange?.minVariantPrice?.amount !== product.priceRange?.maxVariantPrice?.amount ? product.priceRange?.minVariantPrice : undefined}
              image={{
                url: product.featuredImage?.url || '/api/placeholder/400/400',
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
      </div>
    </section>
  );
}