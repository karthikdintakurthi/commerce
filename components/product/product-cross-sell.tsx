import { Container } from '@/components/ui/container';
import { ProductCard } from '@/components/ui/product-card';
import { Section } from '@/components/ui/section';
import { getProducts } from 'lib/shopify';
import { Product } from 'lib/shopify/types';

interface ProductCrossSellProps {
  product: Product;
}

export async function ProductCrossSell({ product }: ProductCrossSellProps) {
  // Get related products based on tags or collection
  let relatedProducts: Product[] = [];
  
  try {
    // This could be enhanced to get products from the same collection or with similar tags
    const allProducts = await getProducts({ sortKey: 'CREATED_AT', reverse: true });
    relatedProducts = allProducts
      .filter(p => p.id !== product.id)
      .slice(0, 4);
  } catch (error) {
    console.warn('Failed to fetch related products:', error);
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <Section>
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Complete the Look
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pair this beautiful piece with other items from the same collection for a complete, coordinated look.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              id={relatedProduct.id}
              title={relatedProduct.title}
              description={relatedProduct.description}
              price={{
                amount: relatedProduct.priceRange.maxVariantPrice.amount,
                currencyCode: relatedProduct.priceRange.maxVariantPrice.currencyCode
              }}
              compareAtPrice={relatedProduct.priceRange.minVariantPrice.amount !== relatedProduct.priceRange.maxVariantPrice.amount ? {
                amount: relatedProduct.priceRange.minVariantPrice.amount,
                currencyCode: relatedProduct.priceRange.minVariantPrice.currencyCode
              } : undefined}
              image={{
                url: relatedProduct.featuredImage?.url || relatedProduct.images?.[0]?.url || '/api/placeholder/400/500',
                altText: relatedProduct.featuredImage?.altText || relatedProduct.images?.[0]?.altText || relatedProduct.title,
                isVideo: relatedProduct.featuredImage?.isVideo || relatedProduct.images?.[0]?.isVideo || false,
                videoUrl: relatedProduct.featuredImage?.videoUrl || relatedProduct.images?.[0]?.videoUrl,
              }}
              images={relatedProduct.images?.slice(0, 3).map(img => ({
                url: img.url,
                altText: img.altText || relatedProduct.title,
                isVideo: img.isVideo || false,
                videoUrl: img.videoUrl,
              })) || []}
              href={`/products/${relatedProduct.handle}`}
              rating={4.5}
              reviewCount={127}
              isNew={false}
              isBestseller={false}
              isOnSale={relatedProduct.priceRange.minVariantPrice.amount !== relatedProduct.priceRange.maxVariantPrice.amount}
              isOutOfStock={!relatedProduct.availableForSale}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/search"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary-700 transition-colors"
          >
            View All Products
          </a>
        </div>
      </Container>
    </Section>
  );
}
