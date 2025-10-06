'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NavbarThemeToggle } from '@/components/layout/navbar/navbar-theme-toggle';
import { MobileSheet } from '@/components/layout/mobile-sheet';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { 
  Search, 
  ShoppingCart, 
  Heart,
  User,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const categories = [
  { name: 'Necklaces', href: '/search?q=necklaces' },
  { name: 'Earrings', href: '/search?q=earrings' },
  { name: 'Bangles', href: '/search?q=bangles' },
  { name: 'Mangalsutra', href: '/search?q=mangalsutra' },
  { name: 'Hair', href: '/search?q=hair-accessories' }
];

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState(3); // Mock cart count
  const [wishlistItems, setWishlistItems] = useState(7); // Mock wishlist count

  return (
    <header className={cn("sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border", className)}>
      <AnnouncementBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu */}
          <div className="flex items-center space-x-2 lg:hidden">
            <MobileSheet />
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-chip-gold focus:ring-offset-2 rounded-md"
              aria-label="Vanitha Home"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-chip-gold to-chip-sage rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="font-display text-xl font-semibold hidden sm:block">
                Vanitha
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {categories.map((category) => (
              <div key={category.name} className="relative group">
                <Link
                  href={category.href}
                  className="flex items-center space-x-1 py-2 text-sm font-medium text-foreground hover:text-chip-gold transition-colors focus:outline-none focus:ring-2 focus:ring-chip-gold focus:ring-offset-2 rounded-sm"
                >
                  <span>{category.name}</span>
                  <ChevronDown className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="hidden sm:block">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 relative"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" />
              {wishlistItems > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {wishlistItems}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItems > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* Account */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 hidden sm:flex"
              aria-label="Account"
            >
              <User className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <NavbarThemeToggle variant="desktop" />
          </div>
        </div>

        {/* Search Bar (when open) */}
        {isSearchOpen && (
          <div className="py-4 border-t border-border">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search for jewelry, collections, or designers..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-chip-gold focus:border-transparent"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
