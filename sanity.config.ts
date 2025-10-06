import { defineConfig } from 'sanity'
import { schemas } from './lib/sanity/schemas'

export default defineConfig({
  name: 'vanitha-jewelry',
  title: 'Vanitha Fashion Jewelry CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [],
  schema: {
    types: schemas,
  },
  studio: {
    components: {
      // Customize the studio interface
    },
  },
})
