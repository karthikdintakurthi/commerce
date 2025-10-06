import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'

export function urlFor(source: any) {
  if (!sanityClient || !source) {
    return {
      url: () => '/api/placeholder/400/400',
      width: () => ({
        url: () => '/api/placeholder/400/400',
        width: () => ({
          url: () => '/api/placeholder/400/400',
          height: () => ({ url: () => '/api/placeholder/400/400' }),
        }),
        height: () => ({ url: () => '/api/placeholder/400/400' }),
      }),
      height: () => ({
        url: () => '/api/placeholder/400/400',
        width: () => ({ url: () => '/api/placeholder/400/400' }),
        height: () => ({ url: () => '/api/placeholder/400/400' }),
      }),
    }
  }
  
  const builder = imageUrlBuilder(sanityClient)
  return builder.image(source)
}
