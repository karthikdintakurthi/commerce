'use client';

import { cn } from '@/lib/utils';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function SkipLink({ href, children, className }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'absolute left-4 top-4 z-50 -translate-y-full rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-lg transition-transform focus:translate-y-0',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
        className
      )}
    >
      {children}
    </a>
  );
}

export function SkipToMain() {
  return (
    <SkipLink href="#main-content">
      Skip to main content
    </SkipLink>
  );
}

export function SkipToSearch() {
  return (
    <SkipLink href="#search">
      Skip to search
    </SkipLink>
  );
}
