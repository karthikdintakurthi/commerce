import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  siteName?: string;
  url?: string;
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  type?: 'website' | 'article' | 'product' | 'profile';
  locale?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  price?: {
    amount: number;
    currency: string;
  };
  availability?: 'in stock' | 'out of stock' | 'preorder';
  brand?: string;
  category?: string;
  rating?: {
    value: number;
    count: number;
  };
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    author,
    siteName,
    url,
    image,
    type = 'website',
    locale = 'en_US',
    publishedTime,
    modifiedTime,
    section,
    tags = [],
    price,
    availability,
    brand,
    category,
    rating,
  } = config;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : undefined,
    creator: author,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: url ? new URL(url) : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: image ? [
        {
          url: image.url,
          width: image.width,
          height: image.height,
          alt: image.alt || title,
        }
      ] : undefined,
      locale,
      type,
      publishedTime,
      modifiedTime,
      section,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image.url] : undefined,
      creator: author,
      site: siteName,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
      other: {
        'msvalidate.01': process.env.BING_VERIFICATION,
      },
    },
  };

  // Add structured data for products
  if (type === 'product' && (price || availability || brand || category || rating)) {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: title,
      description,
      image: image?.url,
      brand: brand ? { '@type': 'Brand', name: brand } : undefined,
      category,
      offers: price ? {
        '@type': 'Offer',
        price: price.amount,
        priceCurrency: price.currency,
        availability: availability === 'in stock' 
          ? 'https://schema.org/InStock'
          : availability === 'out of stock'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/PreOrder',
      } : undefined,
      aggregateRating: rating ? {
        '@type': 'AggregateRating',
        ratingValue: rating.value,
        reviewCount: rating.count,
      } : undefined,
    };

    metadata.other = {
      'structured-data': JSON.stringify(structuredData),
    };
  }

  return metadata;
}

export function generateStructuredData(config: SEOConfig) {
  const {
    title,
    description,
    url,
    image,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    siteName,
  } = config;

  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : type === 'product' ? 'Product' : 'WebPage',
    name: title,
    description,
    url,
    image: image?.url,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: author ? {
      '@type': 'Person',
      name: author,
    } : undefined,
    publisher: siteName ? {
      '@type': 'Organization',
      name: siteName,
    } : undefined,
  };

  return baseStructuredData;
}

export function generateSitemap(entries: Array<{
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}>) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastModified ? `    <lastmod>${entry.lastModified}</lastmod>` : ''}
    ${entry.changeFrequency ? `    <changefreq>${entry.changeFrequency}</changefreq>` : ''}
    ${entry.priority ? `    <priority>${entry.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

export function generateRobotsTxt(disallow: string[] = []) {
  const robots = `User-agent: *
${disallow.map(path => `Disallow: ${path}`).join('\n')}

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`;

  return robots;
}

// SEO utility functions
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

export function generateKeywords(text: string, maxKeywords: number = 10): string[] {
  // Simple keyword extraction - in production, use a proper NLP library
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  const wordCount: Record<string, number> = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

export function validateSEO(config: SEOConfig): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  
  if (!config.title || config.title.length < 10) {
    issues.push('Title should be at least 10 characters long');
  }
  
  if (config.title && config.title.length > 60) {
    issues.push('Title should be less than 60 characters for optimal SEO');
  }
  
  if (!config.description || config.description.length < 120) {
    issues.push('Description should be at least 120 characters long');
  }
  
  if (config.description && config.description.length > 160) {
    issues.push('Description should be less than 160 characters for optimal SEO');
  }
  
  if (!config.url) {
    issues.push('URL is required for proper indexing');
  }
  
  if (!config.image) {
    issues.push('Open Graph image is recommended for social sharing');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
  };
}

// Default SEO configuration
export const defaultSEO: SEOConfig = {
  title: 'Vanitha - Premium Indian Luxury',
  description: 'Discover premium Indian luxury products with authentic craftsmanship and timeless elegance. Shop our curated collection of handcrafted items.',
  keywords: ['Indian luxury', 'premium products', 'handcrafted', 'authentic', 'elegant'],
  author: 'Vanitha',
  siteName: 'Vanitha',
  type: 'website',
  locale: 'en_US',
};
