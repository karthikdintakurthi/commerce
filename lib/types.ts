// Standalone types to avoid importing the entire shopify module
export interface Money {
  amount: string;
  currencyCode: string;
}

export interface SEO {
  title?: string;
  description?: string;
}

export interface Image {
  url: string;
  altText: string;
  width: number;
  height: number;
  isVideo?: boolean;
  videoUrl?: string;
  videoDuration?: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  price: Money;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  featuredImage?: Image;
  images: Image[];
  variants: ProductVariant[];
  availableForSale: boolean;
  tags: string[];
  updatedAt: string;
  productType?: string;
  totalInventory?: number;
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  seo?: SEO;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description?: string;
  seo?: SEO;
  updatedAt: string;
}
