# Sanity CMS Integration Setup

This project now includes Sanity CMS integration with dynamic block rendering and Shopify fallback functionality.

## 🚀 Quick Setup

### 1. Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project:
   - Project name: `vanitha-jewelry-cms`
   - Dataset: `production`
   - Template: `Clean project with no predefined schemas`

### 2. Get Your Project Credentials

After creating your project, you'll need:
- **Project ID**: Found in your project settings
- **Dataset**: Usually `production`
- **API Token**: Create one in API settings with read access

### 3. Update Environment Variables

Add these to your `.env.local` file:

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

### 4. Install Sanity Studio (Optional)

To manage content visually:

```bash
pnpm dlx sanity@latest init --env
```

Follow the prompts and select your project.

## 📋 Available Content Blocks

### Hero Block
- **Purpose**: Large banner section with background image
- **Fields**: Title, subtitle, description, buttons, alignment, overlay
- **Use case**: Landing page hero sections

### Promo Banner
- **Purpose**: Announcement bar or promotional banner
- **Fields**: Title, description, button, colors, visibility, expiry
- **Use case**: Sales announcements, special offers

### Collection Grid
- **Purpose**: Display product collections/categories
- **Fields**: Title, description, collection items, grid layout
- **Use case**: Category browsing, featured collections

### Featured Products
- **Purpose**: Showcase specific products
- **Fields**: Title, description, products, pricing, sale badges
- **Use case**: Featured products, best sellers, new arrivals

## 🔄 How It Works

### Dynamic Block Rendering
The homepage (`app/page.tsx`) automatically:
1. Checks if Sanity is configured
2. Fetches content from Sanity CMS
3. Renders blocks dynamically using the `BlockRenderer` component
4. Falls back to Shopify content if CMS is empty

### Fallback System
- **Primary**: Sanity CMS content
- **Secondary**: Shopify product data
- **Tertiary**: Default static content

### Content Priority
1. **Sanity CMS blocks** (if configured and content exists)
2. **Shopify fallback** (if Shopify is configured)
3. **Default content** (static fallback)

## 🛠️ Customization

### Adding New Block Types
1. Create a new schema in `lib/sanity/schemas/`
2. Add the schema to the exports in `lib/sanity/schemas/index.ts`
3. Create a component in `components/blocks/`
4. Add the block type to the `BlockRenderer` switch statement

### Styling Blocks
Each block component uses Tailwind CSS and can be customized:
- `components/blocks/hero-block.tsx`
- `components/blocks/promo-banner-block.tsx`
- `components/blocks/collection-grid-block.tsx`
- `components/blocks/featured-products-block.tsx`

## 📱 Content Management

### Via Sanity Studio
1. Run `pnpm dlx sanity@latest dev` to start the studio
2. Create a new page with slug "home"
3. Add blocks in the order you want them to appear
4. Publish your changes

### Via API
Use the Sanity client to programmatically create content:

```typescript
import { sanityClient } from 'lib/sanity/client'

await sanityClient.create({
  _type: 'page',
  title: 'Home',
  slug: { current: 'home' },
  blocks: [
    {
      _type: 'hero',
      title: 'Welcome to Vanitha Fashion Jewelry',
      // ... other fields
    }
  ]
})
```

## 🔧 Troubleshooting

### Common Issues

1. **Blocks not rendering**: Check that Sanity is configured and content exists
2. **Images not loading**: Verify image URLs and Sanity image service
3. **Styling issues**: Check Tailwind classes and component structure

### Debug Mode
Add this to see what content is being fetched:

```typescript
console.log('Sanity page:', sanityPage)
console.log('Sanity configured:', isSanityConfigured)
```

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [Sanity Studio](https://www.sanity.io/studio)

## 🎯 Next Steps

1. Set up your Sanity project
2. Configure environment variables
3. Create your first page with blocks
4. Customize the styling to match your brand
5. Add more block types as needed
