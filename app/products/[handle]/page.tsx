import { ProductProvider } from '@/components/product/product-context';
import { ProductCrossSell } from '@/components/product/product-cross-sell';
import { ProductDetails } from '@/components/product/product-details';
import { ProductJsonLd } from '@/components/product/product-json-ld';
import { ProductTrustArea } from '@/components/product/product-trust-area';
import { ProductGallery } from '@/components/ui/product-gallery';
import { getProduct } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  
  try {
    const product = await getProduct(handle);
    
    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.'
      };
    }

    return {
      title: product.title,
      description: product.description || `Shop ${product.title} - Premium Indian jewelry and accessories.`,
      keywords: ['Indian jewelry', 'premium accessories', 'handcrafted', 'authentic'],
      openGraph: {
        title: product.title,
        description: product.description || `Shop ${product.title}`,
        images: product.images?.map(img => ({
          url: img.url,
          alt: img.altText || product.title,
          width: img.width,
          height: img.height
        })) || [],
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: product.description || `Shop ${product.title}`,
        images: product.featuredImage?.url || product.images?.[0]?.url
      }
    };
  } catch (error) {
    console.warn('Failed to generate metadata for product:', handle);
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  
  let product;
  try {
    product = await getProduct(handle);
  } catch (error) {
    console.warn('Failed to fetch product:', handle);
  }

  if (!product) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <ProductJsonLd product={product} />
      
      <ProductProvider>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Above the fold section */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Product Gallery */}
            <div className="space-y-4">
              <ProductGallery 
                images={product.images?.map(img => ({
                  url: img.url,
                  altText: img.altText || product.title,
                  isVideo: img.isVideo || false,
                  videoUrl: img.videoUrl,
                  videoDuration: img.videoDuration
                })) || []}
                showThumbnails={true}
                showZoom={true}
                showVideoControls={true}
                autoPlay={false}
                loop={false}
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <ProductDetails product={product} />
            </div>
          </div>

          {/* Collapsible Details Section */}
          <div className="mt-16 border-t border-gray-200 pt-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Details</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Materials:</span>
                    <p className="mt-1">Gold-plated metal, authentic stones, traditional craftsmanship</p>
                  </div>
                  <div>
                    <span className="font-medium">Finish:</span>
                    <p className="mt-1">Premium polished finish with protective coating</p>
                  </div>
                  <div>
                    <span className="font-medium">Dimensions:</span>
                    <p className="mt-1">Length: 16-18 inches, Weight: 15-25g</p>
                  </div>
                </div>
              </div>

              {/* Care Instructions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Care</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600">•</span>
                    <span>Keep dry - avoid water and moisture</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600">•</span>
                    <span>Wipe clean with soft, dry cloth</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600">•</span>
                    <span>Store in jewelry box or soft pouch</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600">•</span>
                    <span>Avoid contact with perfumes and lotions</span>
                  </div>
                </div>
              </div>

              {/* Shipping & Returns */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Shipping & Returns</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">US Shipping:</span>
                    <p className="mt-1">Free shipping on orders over $75. Standard delivery 3-5 business days.</p>
                  </div>
                  <div>
                    <span className="font-medium">Returns:</span>
                    <p className="mt-1">7-day return policy. Items must be in original condition.</p>
                  </div>
                  <div>
                    <span className="font-medium">Exchanges:</span>
                    <p className="mt-1">Easy size exchanges available within 14 days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Complete the Look - Cross-sell */}
          <div className="mt-16">
            <ProductCrossSell product={product} />
          </div>

          {/* Trust Area */}
          <div className="mt-16 border-t border-gray-200 pt-16">
            <ProductTrustArea />
          </div>
        </div>
      </ProductProvider>
    </>
  );
}
