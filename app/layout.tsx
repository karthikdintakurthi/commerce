import { CartProvider } from 'components/cart/cart-context';
import Footer from 'components/layout/footer/footer-wrapper';
import { Header } from 'components/layout/header';
import { ThemeProvider } from 'components/theme-provider';
import { AriaLiveRegion } from 'components/ui/aria-live-region';
import { SkipToMain } from 'components/ui/skip-link';
import { WelcomeToast } from 'components/welcome-toast';
import { generateMetadata as generateSEOMetadata } from 'lib/seo';
import { getCart } from 'lib/shopify';
// import { getCart } from 'lib/server-cart';
import { baseUrl } from 'lib/utils';
import { Cinzel, Cormorant_Garamond, Inter, Sarabun } from 'next/font/google';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

// Font configurations
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sarabun = Sarabun({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sarabun',
  display: 'swap',
});

const { SITE_NAME } = process.env;

export const metadata = generateSEOMetadata({
  title: SITE_NAME || 'Vanitha - Premium Indian Luxury',
  description: 'Discover premium Indian luxury products with authentic craftsmanship and timeless elegance. Shop our curated collection of handcrafted items.',
  keywords: ['Indian luxury', 'premium products', 'handcrafted', 'authentic', 'elegant'],
  author: 'Vanitha',
  siteName: SITE_NAME || 'Vanitha',
  url: baseUrl(),
  type: 'website',
  locale: 'en_US',
});

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  // Initialize cart from Shopify
  const cart = getCart();

  return (
    <html 
      lang="en" 
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} ${sarabun.variable}`} 
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider cartPromise={cart}>
            <SkipToMain />
            <Header />
            <main className="flex-1" id="main-content">
              {children}
            </main>
            <Footer />
            <Toaster 
              closeButton 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
            <WelcomeToast />
            <AriaLiveRegion />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
