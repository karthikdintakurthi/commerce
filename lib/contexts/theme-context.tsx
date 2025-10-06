'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vanitha-theme',
  attribute = 'class',
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Get system theme preference
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Resolve theme based on current setting
  const resolveTheme = useCallback((currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system' && enableSystem) {
      return getSystemTheme();
    }
    return currentTheme === 'light' ? 'light' : 'dark';
  }, [enableSystem, getSystemTheme]);

  // Apply theme to document
  const applyTheme = useCallback((newTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    
    if (disableTransitionOnChange) {
      const css = document.createElement('style');
      css.appendChild(
        document.createTextNode(
          `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
        )
      );
      document.head.appendChild(css);

      // Force reflow
      (() => window.getComputedStyle(document.body))();

      // Clean up
      setTimeout(() => {
        document.head.removeChild(css);
      }, 1);
    }

    if (attribute === 'class') {
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
    } else {
      root.setAttribute(attribute, newTheme);
    }
  }, [attribute, disableTransitionOnChange]);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(storageKey) as Theme;
    const initialTheme = stored || defaultTheme;
    
    setTheme(initialTheme);
    const resolved = resolveTheme(initialTheme);
    setResolvedTheme(resolved);
    applyTheme(resolved);
    
    setMounted(true);
  }, [defaultTheme, storageKey, enableSystem, resolveTheme, applyTheme]);

  // Handle theme changes
  const handleSetTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    const resolved = resolveTheme(newTheme);
    setResolvedTheme(resolved);
    applyTheme(resolved);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
  }, [resolveTheme, applyTheme, storageKey]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const resolved = resolveTheme(theme);
      setResolvedTheme(resolved);
      applyTheme(resolved);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, enableSystem, resolveTheme, applyTheme]);

  // Prevent hydration mismatch by providing default values during SSR
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{
          theme: defaultTheme,
          setTheme: () => {}, // No-op during SSR
          resolvedTheme: defaultTheme === 'system' ? 'light' : defaultTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        resolvedTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
