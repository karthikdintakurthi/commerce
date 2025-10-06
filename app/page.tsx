import { BlockRenderer } from 'components/blocks';
import { ShopifyFallback } from 'components/fallbacks/shopify-fallback';
import { getHomePage } from 'lib/sanity/client';

export const metadata = {
  description:
    'Vanitha Fashion Jewelry - Premium Indian jewelry and accessories.',
  openGraph: {
    type: 'website'
  }
};

function DefaultWelcomePage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Vanitha Fashion Jewelry
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Premium Indian Jewelry & Accessories
        </p>
        <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
          Discover our exquisite collection of traditional and contemporary jewelry pieces. 
          From elegant bangles and stunning earrings to beautiful necklaces and mangalsutras, 
          we offer handcrafted pieces that celebrate Indian heritage and modern style.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/search" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Browse Collection
          </a>
          <a 
            href="/search" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View Products
          </a>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
        <div className="text-center">
          <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💎</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
          <p className="text-gray-600">Handcrafted with attention to detail and using the finest materials</p>
        </div>
        
        <div className="text-center">
          <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎨</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Traditional Design</h3>
          <p className="text-gray-600">Authentic Indian jewelry designs that celebrate cultural heritage</p>
        </div>
        
        <div className="text-center">
          <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfect for Every Occasion</h3>
          <p className="text-gray-600">From weddings and festivals to everyday elegance</p>
        </div>
      </div>
    </div>
  );
}

export default async function HomePage() {
  // Try to get content from Sanity CMS
  const sanityPage = await getHomePage();
  
  // Check if Sanity is configured
  const isSanityConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  
  // If Sanity is configured and we have content, render it
  if (isSanityConfigured && sanityPage && sanityPage.blocks && sanityPage.blocks.length > 0) {
    return (
      <>
        {/* Render CMS blocks */}
        {sanityPage.blocks.map((block, index) => (
          <BlockRenderer key={index} block={block} />
        ))}
        
        {/* Add Shopify fallback for any missing content types */}
        <ShopifyFallback type="products" />
      </>
    );
  }
  
  // Fallback to default content with Shopify integration
  return (
    <>
      <DefaultWelcomePage />
      <ShopifyFallback type="collections" />
    </>
  );
}
