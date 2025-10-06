'use client';

import { DesktopThemeToggle, MobileThemeToggle } from '@/components/ui/theme-toggle';

interface NavbarThemeToggleProps {
  variant: 'desktop' | 'mobile';
  className?: string;
}

export function NavbarThemeToggle({ variant, className }: NavbarThemeToggleProps) {
  if (variant === 'desktop') {
    return <DesktopThemeToggle className={className} />;
  }
  
  return <MobileThemeToggle className={className} />;
}
