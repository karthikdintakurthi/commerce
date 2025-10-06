import { createClient } from '@sanity/client'

// Only create client if Sanity is properly configured
export const sanityClient = (() => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  
  // Check if projectId is valid (only a-z, 0-9, and dashes)
  if (!projectId || !/^[a-z0-9-]+$/.test(projectId)) {
    return null;
  }
  
  return createClient({
    projectId,
    dataset,
    apiVersion: '2023-05-03',
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_API_TOKEN,
  });
})();

// Types for our schemas
export type Hero = {
  _type: 'hero'
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  primaryButton?: {
    text: string
    url: string
    style: 'primary' | 'secondary' | 'outline'
  }
  secondaryButton?: {
    text: string
    url: string
    style: 'primary' | 'secondary' | 'outline'
  }
  alignment: 'left' | 'center' | 'right'
  overlayOpacity?: number
}

export type PromoBanner = {
  _type: 'promoBanner'
  title: string
  description?: string
  buttonText: string
  buttonUrl: string
  backgroundColor: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray'
  textColor: 'white' | 'black'
  isVisible: boolean
  expiryDate?: string
}

export type CollectionItem = {
  title: string
  description?: string
  image?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  url: string
  shopifyCollectionHandle?: string
  productCount?: number
}

export type CollectionGrid = {
  _type: 'collectionGrid'
  title: string
  description?: string
  collections: CollectionItem[]
  gridLayout: '2' | '3' | '4'
  showProductCount: boolean
  buttonText: string
  buttonUrl: string
}

export type ProductItem = {
  title: string
  description?: string
  price: number
  currency: 'USD' | 'INR' | 'EUR' | 'GBP'
  compareAtPrice?: number
  images: Array<{
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }>
  shopifyProductHandle?: string
  url: string
  isOnSale: boolean
  tags?: string[]
}

export type FeaturedProducts = {
  _type: 'featuredProducts'
  title: string
  description?: string
  products: ProductItem[]
  gridLayout: '2' | '3' | '4'
  showPrices: boolean
  showSalePrices: boolean
  buttonText: string
  buttonUrl: string
  sourceType: 'manual' | 'shopify'
  shopifyCollectionHandle?: string
}

export type PageBlock = Hero | PromoBanner | CollectionGrid | FeaturedProducts

export type Page = {
  _id: string
  title: string
  slug: {
    current: string
  }
  blocks: PageBlock[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: {
      _type: 'image'
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
  }
}

// Query functions
export async function getPage(slug: string): Promise<Page | null> {
  if (!sanityClient) {
    return null
  }
  
  try {
    const query = `*[_type == "page" && slug.current == $slug][0]`
    const page = await sanityClient.fetch(query, { slug })
    return page || null
  } catch (error) {
    console.error('Error fetching page from Sanity:', error)
    return null
  }
}

export async function getHomePage(): Promise<Page | null> {
  if (!sanityClient) {
    return null
  }
  
  try {
    const query = `*[_type == "page" && slug.current == "home"][0]`
    const page = await sanityClient.fetch(query)
    return page || null
  } catch (error) {
    console.error('Error fetching home page from Sanity:', error)
    return null
  }
}

export async function getAllPages(): Promise<Page[]> {
  if (!sanityClient) {
    return []
  }
  
  try {
    const query = `*[_type == "page"]`
    const pages = await sanityClient.fetch(query)
    return pages || []
  } catch (error) {
    console.error('Error fetching pages from Sanity:', error)
    return []
  }
}
