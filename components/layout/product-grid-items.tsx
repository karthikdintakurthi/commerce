import { ProductCard } from '@/components/ui';
import Grid from 'components/grid';
import { Product } from 'lib/types';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => {
        // Get the first available media (image or video) for the featured image
        const firstMedia = product.images?.[0];
        const featuredImage = product.featuredImage || firstMedia;
        
        return (
          <Grid.Item key={product.handle} className="animate-fadeIn">
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description}
              price={{
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              compareAtPrice={product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount ? {
                amount: product.priceRange.minVariantPrice.amount,
                currencyCode: product.priceRange.minVariantPrice.currencyCode
              } : undefined}
              image={{
                url: featuredImage?.url || '/api/placeholder/400/500',
                altText: featuredImage?.altText || product.title,
                isVideo: featuredImage?.isVideo || false,
                videoUrl: featuredImage?.videoUrl
              }}
              images={product.images?.slice(0, 3).map(img => ({
                url: img.url,
                altText: img.altText || product.title,
                isVideo: img.isVideo || false,
                videoUrl: img.videoUrl
              })) || []}
              href={`/product/${product.handle}`}
              rating={4.5} // Default rating
              reviewCount={Math.floor(Math.random() * 200) + 10}
              isNew={false}
              isBestseller={Math.random() > 0.7}
              isOnSale={product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount}
              isOutOfStock={!product.availableForSale}
            />
          </Grid.Item>
        );
      })}
    </>
  );
}
