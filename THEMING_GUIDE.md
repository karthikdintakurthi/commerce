# Vanitha Design System & Theming Guide

A comprehensive theming system for the Vanitha Next.js e-commerce application, featuring Indian luxury aesthetics, accessibility compliance, and performance optimization.

## 🎨 Design Philosophy

- **Indian Luxury Aesthetic**: Rich saffron, emerald, and royal purple color palette
- **Premium Minimalism**: Clean, sophisticated design with cultural inspiration
- **Accessibility First**: WCAG AA compliant with comprehensive screen reader support
- **Performance Optimized**: CLS-free pages with optimized animations and lazy loading

## 🏗️ Architecture

### Design Tokens (`lib/design-tokens.ts`)
Centralized design system with:
- Color palettes (primary, secondary, accent, neutral, semantic)
- Typography scale with Indian-inspired fonts
- Spacing, border radius, shadows, and animation tokens
- Light/dark theme variants

### Tailwind Configuration (`tailwind.config.ts`)
- Extended with design tokens
- Custom animations and keyframes
- Container queries support
- Responsive breakpoints

### Global Styles (`app/globals.css`)
- CSS custom properties for theme switching
- Accessibility enhancements
- Print styles
- Reduced motion support
- High contrast mode support

## 🧩 Component Library

### Core Components
- **Button**: Multiple variants (default, luxury, minimal, ghost, outline)
- **Badge**: Status indicators with luxury styling
- **Input**: Form inputs with error states and accessibility
- **Card**: Content containers with hover effects
- **Tabs**: Navigation with smooth transitions
- **Toast**: Notification system with animations

### E-commerce Components
- **ProductCard**: Feature-rich product display with wishlist, quick add
- **ProductGallery**: Image gallery with zoom, fullscreen, auto-play
- **Price**: Price display with sale indicators and formatting
- **Rating**: Interactive star ratings with accessibility

### Layout Primitives
- **Section**: Themed sections with variants (hero, feature, testimonial)
- **Container**: Responsive containers with padding options
- **Grid**: Flexible grid system with auto-fit/auto-fill

## 🎭 Motion & Animations

### Motion Utilities (`lib/motion.ts`)
- Pre-built animation variants (fade, slide, scale, hover)
- Stagger animations for lists
- Page transitions
- Loading animations
- Reduced motion support

### Animation Presets
```typescript
import { fadeInUp, hoverScale, staggerContainer } from '@/lib/motion';

// Usage
<motion.div variants={fadeInUp} initial="initial" animate="animate">
  Content
</motion.div>
```

## ♿ Accessibility Features

### WCAG AA Compliance (`lib/accessibility.ts`)
- Focus management and keyboard navigation
- Screen reader utilities
- Color contrast validation
- ARIA helpers
- High contrast mode detection
- Reduced motion detection

### Implementation
```typescript
import { trapFocus, announceToScreenReader } from '@/lib/accessibility';

// Focus trap for modals
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => trapFocus(container, e);
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);
```

## 🔍 SEO Optimization

### SEO Utilities (`lib/seo.ts`)
- Dynamic metadata generation
- Structured data for products
- Sitemap generation
- Robots.txt configuration
- Open Graph and Twitter Card support

### Usage
```typescript
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Product Name',
  description: 'Product description',
  type: 'product',
  price: { amount: 99.99, currency: 'USD' },
  image: { url: '/product-image.jpg' }
});
```

## 🎨 Theme System

### Color Palette
- **Primary**: Saffron (#f2851a) - Indian luxury gold
- **Secondary**: Emerald (#22c55e) - Rich forest green
- **Accent**: Royal Purple (#8b5cf6) - Deep indigo
- **Neutral**: Sophisticated grays with warm undertones

### Typography
- **Sans**: Inter (primary)
- **Serif**: Playfair Display (headings)
- **Mono**: JetBrains Mono (code)

### Dark Mode
Automatic theme switching with system preference detection:
```typescript
<ThemeProvider
  attribute="class"
  defaultTheme="light"
  enableSystem
  disableTransitionOnChange
>
```

## 📱 Responsive Design

### Breakpoints
- `xs`: 475px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Container Queries
```css
@container (min-width: 400px) {
  .product-card {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## 🚀 Performance Features

### Bundle Optimization
- Tree-shaking friendly exports
- Lazy loading for images and components
- Optimized animations with `will-change`
- Reduced motion preferences

### CLS Prevention
- Aspect ratio containers for images
- Skeleton loading states
- Predefined dimensions for dynamic content

## 🛠️ Development

### Adding New Components
1. Create component in `components/ui/`
2. Export from `components/ui/index.ts`
3. Add to design tokens if needed
4. Include accessibility features
5. Add motion variants

### Customizing Themes
1. Update `lib/design-tokens.ts`
2. Modify CSS variables in `app/globals.css`
3. Update Tailwind config
4. Test with both light/dark modes

### Testing Accessibility
```typescript
import { validateAriaLabels, validateColorContrast } from '@/lib/accessibility';

// Validate components
const issues = validateAriaLabels([button, input, link]);
const contrast = validateColorContrast('#000000', '#ffffff');
```

## 📦 Dependencies

### Core
- `next-themes`: Theme switching
- `framer-motion`: Animations
- `class-variance-authority`: Component variants
- `tailwind-merge`: Class merging

### Radix UI
- `@radix-ui/react-*`: Accessible primitives
- `lucide-react`: Icons

### Utilities
- `clsx`: Conditional classes
- `sonner`: Toast notifications

## 🎯 Best Practices

### Component Design
1. Use semantic HTML elements
2. Include ARIA labels and descriptions
3. Support keyboard navigation
4. Provide loading and error states
5. Include motion variants

### Performance
1. Use `motion.div` sparingly
2. Implement `will-change` for animations
3. Lazy load heavy components
4. Optimize images with Next.js Image
5. Use CSS containment where appropriate

### Accessibility
1. Test with screen readers
2. Validate color contrast ratios
3. Ensure keyboard navigation
4. Provide alternative text
5. Support reduced motion

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_SITE_URL=https://vanitha.com
GOOGLE_SITE_VERIFICATION=your-verification-code
```

### Next.js Config
```typescript
// next.config.ts
export default {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  }
};
```

## 📈 Monitoring

### Performance Metrics
- Core Web Vitals tracking
- Bundle size monitoring
- Animation performance
- Accessibility score

### Analytics Integration
- Google Analytics 4
- Search Console
- Accessibility testing tools
- Performance monitoring

This theming system provides a solid foundation for building accessible, performant, and beautiful e-commerce experiences with Indian luxury aesthetics.
