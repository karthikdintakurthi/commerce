'use client';

import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { Button } from 'components/ui/button';
import { motion } from 'framer-motion';
import { Menu } from 'lib/shopify/types';
import { Moon, Search, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import SearchComponent, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

interface NavbarClientProps {
  menu: Menu[];
}

export function NavbarClient({ menu }: NavbarClientProps) {

  return (
    <motion.nav 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>

          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 transition-opacity hover:opacity-80"
            >
              <LogoSquare />
              <span className="hidden text-lg font-semibold sm:inline-block">
                {SITE_NAME}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {menu.length > 0 && (
              <div className="flex items-center space-x-6">
                {menu.map((item: Menu) => (
                  <Link
                    key={item.title}
                    href={item.path}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="hidden md:flex md:flex-1 md:justify-center md:max-w-sm">
            <Suspense fallback={<SearchSkeleton />}>
              <SearchComponent />
            </Suspense>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Search Button (Mobile) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <CartModal />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}