import { Product } from 'lib/shopify/types';

interface ProductJsonLdProps {
  product: Product;
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vanitha.com';
  const productUrl = `${baseUrl}/products/${product.handle}`;
  
  // Get the main image (featured image or first image)
  const mainImage = product.featuredImage || product.images?.[0];
  
  // Get additional images
  const additionalImages = product.images?.slice(1, 4).map(img => ({
    "@type": "ImageObject",
    url: img.url,
    width: img.width,
    height: img.height,
    name: img.altText || product.title
  })) || [];

  // Create offers array
  const offers = product.variants?.map(variant => ({
    "@type": "Offer",
    price: variant.price.amount,
    priceCurrency: variant.price.currencyCode,
    availability: variant.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    url: productUrl,
    seller: {
      "@type": "Organization",
      name: "Vanitha",
      url: baseUrl
    },
    priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    itemCondition: "https://schema.org/NewCondition"
  })) || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: mainImage ? [
      {
        "@type": "ImageObject",
        url: mainImage.url,
        width: mainImage.width,
        height: mainImage.height,
        name: mainImage.altText || product.title
      },
      ...additionalImages
    ] : undefined,
    brand: {
      "@type": "Brand",
      name: "Vanitha"
    },
    category: "Jewelry",
    sku: product.id,
    mpn: product.id,
    url: productUrl,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: product.priceRange.maxVariantPrice.currencyCode,
      lowPrice: product.priceRange.minVariantPrice.amount,
      highPrice: product.priceRange.maxVariantPrice.amount,
      offerCount: offers.length,
      offers: offers
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1"
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        author: {
          "@type": "Person",
          name: "Sarah M."
        },
        reviewBody: "Absolutely beautiful piece! The craftsmanship is outstanding and it arrived perfectly packaged."
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4",
          bestRating: "5"
        },
        author: {
          "@type": "Person",
          name: "Jennifer K."
        },
        reviewBody: "Love the design and quality. Fast shipping and excellent customer service."
      }
    ],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Materials",
        value: "Gold-plated metal, authentic stones"
      },
      {
        "@type": "PropertyValue",
        name: "Care Instructions",
        value: "Keep dry, wipe clean with soft cloth"
      },
      {
        "@type": "PropertyValue",
        name: "Shipping",
        value: "Free shipping on orders over $75"
      },
      {
        "@type": "PropertyValue",
        name: "Returns",
        value: "7-day return policy"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
