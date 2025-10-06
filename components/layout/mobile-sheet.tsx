'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { NavbarThemeToggle } from '@/components/layout/navbar/navbar-theme-toggle';
import { 
  Menu, 
  Search, 
  ShoppingCart, 
  ChevronDown, 
  ChevronRight,
  Heart,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const categories = [
  {
    name: 'Necklaces',
    href: '/search?q=necklaces',
    subcategories: [
      { name: 'Gold Necklaces', href: '/search?q=gold-necklaces' },
      { name: 'Pearl Necklaces', href: '/search?q=pearl-necklaces' },
      { name: 'Designer Necklaces', href: '/search?q=designer-necklaces' }
    ]
  },
  {
    name: 'Earrings',
    href: '/search?q=earrings',
    subcategories: [
      { name: 'Stud Earrings', href: '/search?q=stud-earrings' },
      { name: 'Drop Earrings', href: '/search?q=drop-earrings' },
      { name: 'Jhumka Earrings', href: '/search?q=jhumka-earrings' }
    ]
  },
  {
    name: 'Bangles',
    href: '/search?q=bangles',
    subcategories: [
      { name: 'Gold Bangles', href: '/search?q=gold-bangles' },
      { name: 'Glass Bangles', href: '/search?q=glass-bangles' },
      { name: 'Designer Bangles', href: '/search?q=designer-bangles' }
    ]
  },
  {
    name: 'Mangalsutra',
    href: '/search?q=mangalsutra',
    subcategories: [
      { name: 'Traditional', href: '/search?q=traditional-mangalsutra' },
      { name: 'Modern', href: '/search?q=modern-mangalsutra' },
      { name: 'Designer', href: '/search?q=designer-mangalsutra' }
    ]
  },
  {
    name: 'Hair',
    href: '/search?q=hair-accessories',
    subcategories: [
      { name: 'Hair Clips', href: '/search?q=hair-clips' },
      { name: 'Hair Pins', href: '/search?q=hair-pins' },
      { name: 'Hair Bands', href: '/search?q=hair-bands' }
    ]
  }
];

const quickLinks = [
  { name: 'New Arrivals', href: '/search?q=new' },
  { name: 'Best Sellers', href: '/search?q=bestsellers' },
  { name: 'Sale', href: '/search?q=sale' },
  { name: 'Gift Cards', href: '/gift-cards' }
];

const supportLinks = [
  { name: 'Contact Us', href: '/contact', icon: Phone },
  { name: 'Email Support', href: 'mailto:support@vanitha.com', icon: Mail },
  { name: 'My Account', href: '/account', icon: User },
  { name: 'Wishlist', href: '/wishlist', icon: Heart }
];

interface MobileSheetProps {
  className?: string;
}

export function MobileSheet({ className }: MobileSheetProps) {
  const [open, setOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-9 w-9", className)}
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 sm:w-96">
        <SheetHeader className="space-y-4">
          <SheetTitle className="text-left">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-chip-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="font-display text-xl">Vanitha</span>
            </Link>
          </SheetTitle>
          
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search jewelry..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-chip-gold focus:border-transparent"
            />
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <Collapsible
                  key={category.name}
                  open={openCategories[category.name]}
                  onOpenChange={() => toggleCategory(category.name)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-2 h-auto"
                    >
                      <span className="font-medium">{category.name}</span>
                      {openCategories[category.name] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 ml-4">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.name}
                        href={subcategory.href}
                        className="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Quick Links
            </h3>
            <div className="space-y-1">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-2 px-3 text-sm hover:bg-muted/50 rounded-md transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Support
            </h3>
            <div className="space-y-1">
              {supportLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-3 py-2 px-3 text-sm hover:bg-muted/50 rounded-md transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <NavbarThemeToggle variant="mobile" />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
