'use client';

import { Container, Grid, GridItem, ProductCard, ProductGallery, Section } from '@/components/ui';
import { useState } from 'react';

export default function ProductComponentsDemoPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Sample product data
  const sampleProducts = [
    {
      id: '1',
      title: 'Emerald Gold Necklace',
      description: 'Handcrafted emerald and gold necklace with traditional Indian design',
      price: { amount: '299.99', currencyCode: 'USD' },
      compareAtPrice: { amount: '399.99', currencyCode: 'USD' },
      image: {
        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop',
        altText: 'Emerald Gold Necklace'
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop',
          altText: 'Emerald Gold Necklace - Front view'
        },
        {
          url: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=500&fit=crop',
          altText: 'Emerald Gold Necklace - Side view'
        },
        {
          url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop',
          altText: 'Emerald Gold Necklace - Detail view'
        }
      ],
      href: '/products/emerald-gold-necklace',
      rating: 4.8,
      reviewCount: 124,
      isNew: true,
      isBestseller: false,
      isOnSale: true,
      isOutOfStock: false
    },
    {
      id: '2',
      title: 'Ruby Diamond Earrings',
      description: 'Elegant ruby and diamond earrings perfect for special occasions',
      price: { amount: '199.99', currencyCode: 'USD' },
      image: {
        url: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=500&fit=crop',
        altText: 'Ruby Diamond Earrings',
        isVideo: true,
        videoUrl: 'https://example.com/video.mp4',
        videoDuration: 15
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=500&fit=crop',
          altText: 'Ruby Diamond Earrings - Main view',
          isVideo: true,
          videoUrl: 'https://example.com/video.mp4',
          videoDuration: 15
        },
        {
          url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop',
          altText: 'Ruby Diamond Earrings - Detail view'
        }
      ],
      href: '/products/ruby-diamond-earrings',
      rating: 4.9,
      reviewCount: 89,
      isNew: false,
      isBestseller: true,
      isOnSale: false,
      isOutOfStock: false
    },
    {
      id: '3',
      title: 'Gold Bangles Set',
      description: 'Traditional gold bangles set with intricate designs',
      price: { amount: '149.99', currencyCode: 'USD' },
      image: {
        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop',
        altText: 'Gold Bangles Set'
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop',
          altText: 'Gold Bangles Set - Main view'
        },
        {
          url: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=500&fit=crop',
          altText: 'Gold Bangles Set - Side view'
        }
      ],
      href: '/products/gold-bangles-set',
      rating: 4.7,
      reviewCount: 67,
      isNew: false,
      isBestseller: false,
      isOnSale: false,
      isOutOfStock: true
    }
  ];

  // Sample gallery images for PDP demo
  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
      altText: 'Product main view',
      isVideo: false
    },
    {
      url: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
      altText: 'Product side view',
      isVideo: false
    },
    {
      url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
      altText: 'Product detail view',
      isVideo: false
    },
    {
      url: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
      altText: 'Product video',
      isVideo: true,
      videoUrl: 'https://example.com/product-video.mp4',
      videoDuration: 8
    }
  ];

  const handleAddToCart = (productId: string) => {
    console.log(`Adding product ${productId} to cart`);
    // Implement cart logic here
  };

  const handleToggleWishlist = (productId: string) => {
    console.log(`Toggling wishlist for product ${productId}`);
    // Implement wishlist logic here
  };

  const handleQuickView = (productId: string) => {
    console.log(`Opening quick view for product ${productId}`);
    // Implement quick view logic here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Section variant="hero" background="gradient" size="lg" className="text-center">
        <Container size="lg">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Product Components Demo
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Showcasing ProductCard and ProductGallery components with motion safety and design tokens.
          </p>
        </Container>
      </Section>

      {/* ProductCard Examples */}
      <Section title="ProductCard Examples" description="Various product card configurations" divider="bottom">
        <Container>
          <Grid columns="auto-fit" minItemWidth="280px" gap="lg">
            {sampleProducts.map((product) => (
              <GridItem key={product.id}>
                <ProductCard
                  {...product}
                  onAddToCart={() => handleAddToCart(product.id)}
                  onToggleWishlist={() => handleToggleWishlist(product.id)}
                  onQuickView={() => handleQuickView(product.id)}
                />
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ProductGallery Example */}
      <Section title="ProductGallery Example" description="PDP gallery with thumbnails, zoom, and video support" divider="bottom">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gallery */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Product Gallery</h3>
              <ProductGallery
                images={galleryImages}
                selectedIndex={selectedImageIndex}
                onImageChange={setSelectedImageIndex}
                showThumbnails={true}
                showZoom={true}
                showVideoControls={true}
                autoPlay={false}
                loop={false}
                className="max-w-md mx-auto lg:mx-0"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Emerald Gold Necklace</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Handcrafted emerald and gold necklace with traditional Indian design. 
                  Perfect for special occasions and celebrations.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.8 (124 reviews)</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold">$299.99</span>
                  <span className="text-xl text-muted-foreground line-through">$399.99</span>
                  <span className="bg-chip-gold text-white px-2 py-1 rounded text-sm font-semibold">
                    -25% OFF
                  </span>
                </div>

                <div className="space-y-2">
                  <button className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    Add to Cart
                  </button>
                  <button className="w-full border border-primary text-primary py-3 px-6 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                    Add to Wishlist
                  </button>
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Free shipping on orders over $100</p>
                  <p>• 30-day return policy</p>
                  <p>• Authenticity guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features */}
      <Section title="Component Features" description="Key features and capabilities" divider="bottom">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Motion Safety</h3>
              <p className="text-muted-foreground">
                All animations respect <code>prefers-reduced-motion</code> for accessibility compliance.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Design Tokens</h3>
              <p className="text-muted-foreground">
                Built with our design system tokens for consistent spacing, colors, and typography.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Video Support</h3>
              <p className="text-muted-foreground">
                Native support for product videos with duration badges and play controls.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Touch Gestures</h3>
              <p className="text-muted-foreground">
                Swipe navigation on mobile devices with smooth touch interactions.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Zoom Functionality</h3>
              <p className="text-muted-foreground">
                Click to zoom with full-screen overlay for detailed product inspection.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Quick View</h3>
              <p className="text-muted-foreground">
                Modal dialog with image thumbnails and quick purchase options.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Usage Examples */}
      <Section title="Usage Examples" description="Code examples for implementation">
        <Container>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">ProductCard Usage</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`<ProductCard
  id="product-1"
  title="Emerald Gold Necklace"
  description="Handcrafted emerald and gold necklace"
  price={{ amount: "299.99", currencyCode: "USD" }}
  compareAtPrice={{ amount: "399.99", currencyCode: "USD" }}
  image={{
    url: "/images/necklace.jpg",
    altText: "Emerald Gold Necklace"
  }}
  images={[
    { url: "/images/necklace-1.jpg", altText: "Front view" },
    { url: "/images/necklace-2.jpg", altText: "Side view" }
  ]}
  href="/products/emerald-necklace"
  rating={4.8}
  reviewCount={124}
  isNew={true}
  isBestseller={false}
  isOnSale={true}
  onAddToCart={() => handleAddToCart()}
  onToggleWishlist={() => handleToggleWishlist()}
  onQuickView={() => handleQuickView()}
/>`}
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">ProductGallery Usage</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`<ProductGallery
  images={[
    {
      url: "/images/product-1.jpg",
      altText: "Main product view",
      isVideo: false
    },
    {
      url: "/images/product-video.mp4",
      altText: "Product video",
      isVideo: true,
      videoUrl: "/videos/product.mp4",
      videoDuration: 15
    }
  ]}
  selectedIndex={0}
  onImageChange={(index) => setSelectedIndex(index)}
  showThumbnails={true}
  showZoom={true}
  showVideoControls={true}
  autoPlay={false}
  loop={false}
/>`}
              </pre>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
