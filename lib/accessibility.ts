/**
 * Accessibility utilities for WCAG AA compliance
 */

// Focus management
export const focusableElements = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ');

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll(focusableElements));
}

export function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.key === 'Tab') {
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement?.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement?.focus();
        event.preventDefault();
      }
    }
  }
}

// ARIA utilities
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

export function announceToScreenReader(message: string) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Color contrast utilities
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;
    
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function isAccessibleContrast(foreground: string, background: string): boolean {
  const ratio = getContrastRatio(foreground, background);
  return ratio >= 4.5; // WCAG AA standard
}

// Keyboard navigation
export const keyboardNavigation = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  TAB: 'Tab',
} as const;

export function handleKeyboardNavigation(
  event: KeyboardEvent,
  options: {
    onEnter?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onHome?: () => void;
    onEnd?: () => void;
    onTab?: () => void;
  }
) {
  const { key } = event;
  
  switch (key) {
    case keyboardNavigation.ENTER:
      options.onEnter?.();
      break;
    case keyboardNavigation.ESCAPE:
      options.onEscape?.();
      break;
    case keyboardNavigation.ARROW_UP:
      options.onArrowUp?.();
      break;
    case keyboardNavigation.ARROW_DOWN:
      options.onArrowDown?.();
      break;
    case keyboardNavigation.ARROW_LEFT:
      options.onArrowLeft?.();
      break;
    case keyboardNavigation.ARROW_RIGHT:
      options.onArrowRight?.();
      break;
    case keyboardNavigation.HOME:
      options.onHome?.();
      break;
    case keyboardNavigation.END:
      options.onEnd?.();
      break;
    case keyboardNavigation.TAB:
      options.onTab?.();
      break;
  }
}

// Screen reader utilities
export function createScreenReaderOnly(text: string): HTMLElement {
  const element = document.createElement('span');
  element.textContent = text;
  element.className = 'sr-only';
  return element;
}

export function createVisuallyHidden(): string {
  return `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
}

// Skip links
export function createSkipLink(target: string, text: string = 'Skip to main content'): HTMLElement {
  const skipLink = document.createElement('a');
  skipLink.href = `#${target}`;
  skipLink.textContent = text;
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
    transition: top 0.3s;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  return skipLink;
}

// Form accessibility
export function createFormField(
  id: string,
  label: string,
  type: string = 'text',
  required: boolean = false,
  errorMessage?: string
): {
  label: HTMLElement;
  input: HTMLInputElement;
  error?: HTMLElement;
} {
  const labelElement = document.createElement('label');
  labelElement.htmlFor = id;
  labelElement.textContent = label;
  labelElement.className = 'block text-sm font-medium text-gray-700 mb-1';
  
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.required = required;
  input.className = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  input.setAttribute('aria-describedby', errorMessage ? `${id}-error` : '');
  
  const result: any = { label: labelElement, input };
  
  if (errorMessage) {
    const error = document.createElement('div');
    error.id = `${id}-error`;
    error.textContent = errorMessage;
    error.className = 'text-red-600 text-sm mt-1';
    error.setAttribute('role', 'alert');
    result.error = error;
  }
  
  return result;
}

// Live regions for dynamic content
export function createLiveRegion(polite: boolean = true): HTMLElement {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', polite ? 'polite' : 'assertive');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  return liveRegion;
}

// Focus indicators
export function addFocusIndicator(element: HTMLElement): void {
  element.addEventListener('focus', () => {
    element.classList.add('focus-visible');
  });
  
  element.addEventListener('blur', () => {
    element.classList.remove('focus-visible');
  });
}

// High contrast mode detection
export function isHighContrastMode(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches;
}

// Reduced motion detection
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Color scheme detection
export function prefersDarkMode(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Accessibility testing helpers
export function validateAriaLabels(elements: HTMLElement[]): string[] {
  const issues: string[] = [];
  
  elements.forEach((element, index) => {
    const hasAriaLabel = element.hasAttribute('aria-label');
    const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
    const hasTextContent = element.textContent?.trim().length > 0;
    const hasTitle = element.hasAttribute('title');
    
    if (!hasAriaLabel && !hasAriaLabelledBy && !hasTextContent && !hasTitle) {
      issues.push(`Element at index ${index} lacks accessible name`);
    }
  });
  
  return issues;
}

export function validateColorContrast(foreground: string, background: string): {
  isAccessible: boolean;
  ratio: number;
  level: 'AA' | 'AAA' | 'Fail';
} {
  const ratio = getContrastRatio(foreground, background);
  
  let level: 'AA' | 'AAA' | 'Fail';
  if (ratio >= 7) level = 'AAA';
  else if (ratio >= 4.5) level = 'AA';
  else level = 'Fail';
  
  return {
    isAccessible: ratio >= 4.5,
    ratio,
    level,
  };
}
