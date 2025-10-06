'use client';

import { useTheme } from '@/lib/contexts/theme-context';
import { Monitor, Moon, Sun } from 'lucide-react';
import { Button } from './button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './dropdown-menu';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  showLabel?: boolean;
  className?: string;
}

export function ThemeToggle({ 
  variant = 'button', 
  size = 'default',
  showLabel = false,
  className 
}: ThemeToggleProps) {
  const themeContext = useTheme();
  
  // Handle case where theme context is not available
  if (!themeContext) {
    return (
      <Button
        variant="ghost"
        size={size}
        className={className}
        disabled
      >
        <Sun className="h-4 w-4" />
        {showLabel && <span className="ml-2">Theme</span>}
      </Button>
    );
  }
  
  const { theme, setTheme, resolvedTheme } = themeContext;

  if (variant === 'dropdown') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={size} className={className}>
            {resolvedTheme === 'dark' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            {showLabel && (
              <span className="ml-2">
                {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
              </span>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            onClick={() => setTheme('light')}
            className={theme === 'light' ? 'bg-accent' : ''}
          >
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme('dark')}
            className={theme === 'dark' ? 'bg-accent' : ''}
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme('system')}
            className={theme === 'system' ? 'bg-accent' : ''}
          >
            <Monitor className="mr-2 h-4 w-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={className}
      aria-pressed={resolvedTheme === 'dark'}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
      )}
      {showLabel && (
        <span className="ml-2">
          {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
        </span>
      )}
      <span className="sr-only">
        {resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </Button>
  );
}

// Mobile-optimized theme toggle
export function MobileThemeToggle({ className }: { className?: string }) {
  const themeContext = useTheme();
  
  if (!themeContext) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`h-9 w-9 ${className}`}
        disabled
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }
  
  const { resolvedTheme, setTheme } = themeContext;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={`h-9 w-9 ${className}`}
      aria-pressed={resolvedTheme === 'dark'}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="sr-only">
        {resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </Button>
  );
}

// Desktop theme toggle with dropdown
export function DesktopThemeToggle({ className }: { className?: string }) {
  const themeContext = useTheme();
  
  if (!themeContext) {
    return (
      <Button
        variant="ghost"
        size="default"
        className={className}
        disabled
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }
  
  return (
    <ThemeToggle 
      variant="dropdown" 
      size="default"
      className={className}
    />
  );
}
