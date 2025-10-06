# Vanitha Headless Next.js Storefront

A high-performance, server-rendered Next.js 15 App Router ecommerce application built with Shopify as the headless CMS.

## Features

- ✅ **Next.js 15** with App Router and TypeScript
- ✅ **Tailwind CSS** for styling
- ✅ **shadcn/ui** components (Button, Badge, Card, Sheet, Dialog)
- ✅ **Framer Motion** for animations
- ✅ **Shopify Storefront API** integration with typed client
- ✅ **Absolute imports** with `@/` alias
- ✅ **Health check endpoint** at `/_health`
- ✅ **Production-ready** with caching and error handling

## Tech Stack

- **Framework**: Next.js 15.3.0 (canary)
- **Language**: TypeScript 5.8.2
- **Styling**: Tailwind CSS 4.0.14
- **UI Components**: Headless UI + Heroicons
- **Animations**: Framer Motion 12.23.22
- **Package Manager**: pnpm
- **Commerce**: Shopify Storefront API

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm package manager
- Shopify store with Storefront API access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/vanitha-headless-nextjs.git
cd vanitha-headless-nextjs
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Shopify credentials:
```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
SHOPIFY_REVALIDATION_SECRET=your_revalidation_secret
```

### Development

Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Health Check

The application includes a health check endpoint at `/_health`:
```bash
curl http://localhost:3000/_health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "vanitha-headless-nextjs"
}
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── _health/           # Health check endpoint
│   ├── api/               # API routes
│   ├── product/           # Product pages
│   └── search/            # Search/collection pages
├── components/            # React components
│   ├── cart/              # Shopping cart components
│   ├── grid/              # Product grid components
│   ├── layout/            # Layout components
│   └── product/           # Product-specific components
├── lib/                   # Utility libraries
│   ├── shopify/           # Shopify API integration
│   │   ├── fragments/     # GraphQL fragments
│   │   ├── mutations/     # GraphQL mutations
│   │   └── queries/       # GraphQL queries
│   └── utils.ts           # Utility functions
└── fonts/                 # Custom fonts
```

## Shopify Integration

The application uses the Shopify Storefront API with a fully typed client. Key features:

- **Typed GraphQL Operations**: All API calls are fully typed
- **Caching**: Built-in caching with Next.js cache API
- **Error Handling**: Comprehensive error handling and logging
- **Webhook Support**: Automatic revalidation on product/collection updates

### Key Functions

- `getProduct(handle)` - Fetch single product
- `getProducts()` - Fetch product list with filtering
- `getCollection(handle)` - Fetch collection details
- `getCollections()` - Fetch all collections
- `createCart()` - Create shopping cart
- `addToCart()` - Add items to cart
- `getCart()` - Retrieve cart contents

## Available Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack

# Production
pnpm build           # Build for production
pnpm start           # Start production server

# Code Quality
pnpm prettier        # Format code
pnpm prettier:check  # Check code formatting
pnpm test            # Run tests (currently prettier check)
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SHOPIFY_STORE_DOMAIN` | Your Shopify store domain (e.g., `your-store.myshopify.com`) | Yes |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Shopify Storefront API access token | Yes |
| `SHOPIFY_REVALIDATION_SECRET` | Secret for webhook revalidation | Yes |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Public store domain (optional) | No |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built on top of [Vercel Commerce](https://github.com/vercel/commerce)
- Uses [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- Powered by [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)