import { PageBlock } from 'lib/sanity/client'
import { CollectionGridBlock } from './collection-grid-block'
import { FeaturedProductsBlock } from './featured-products-block'
import { HeroBlock } from './hero-block'
import { PromoBannerBlock } from './promo-banner-block'

interface BlockRendererProps {
  block: PageBlock
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block._type) {
    case 'hero':
      return <HeroBlock block={block} />
    case 'promoBanner':
      return <PromoBannerBlock block={block} />
    case 'collectionGrid':
      return <CollectionGridBlock block={block} />
    case 'featuredProducts':
      return <FeaturedProductsBlock block={block} />
    default:
      console.warn(`Unknown block type: ${(block as any)._type}`)
      return null
  }
}
