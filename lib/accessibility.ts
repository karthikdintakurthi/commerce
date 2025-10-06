/**
 * Accessibility utilities for color contrast and WCAG compliance
 */

// Color contrast calculation utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result && result[1] && result[2] && result[3]
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function getLuminance(r: number, g: number, b: number): number {
  const rs = r / 255;
  const gs = g / 255;
  const bs = b / 255;
  
  const rsLinear = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  const gsLinear = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  const bsLinear = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
  
  return 0.2126 * rsLinear + 0.7152 * gsLinear + 0.0722 * bsLinear;
}

export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

// WCAG contrast requirements
export const CONTRAST_RATIOS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3.0,
  AAA_NORMAL: 7.0,
  AAA_LARGE: 4.5,
} as const;

export function meetsContrastRatio(
  foreground: string,
  background: string,
  level: keyof typeof CONTRAST_RATIOS = 'AA_NORMAL'
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return ratio >= CONTRAST_RATIOS[level];
}

// Jewelry color definitions
export const JEWELRY_COLORS = {
  emerald: '#0F6C5B',
  ruby: '#A0203C',
  gold: '#C59B2A',
  sage: '#7A8D79',
  sand: '#D7C7A0',
} as const;

// Text colors for different themes
export const TEXT_COLORS = {
  light: '#F9F6F1', // Light theme foreground
  dark: '#111114',  // Dark theme foreground
  white: '#FFFFFF',
  black: '#000000',
} as const;

// High contrast combinations for jewelry colors
export function getHighContrastTextColor(
  backgroundColor: keyof typeof JEWELRY_COLORS,
  theme: 'light' | 'dark' = 'light'
): string {
  const bgColor = JEWELRY_COLORS[backgroundColor];
  
  // Test different text colors and return the one with highest contrast
  const textOptions = theme === 'light' 
    ? [TEXT_COLORS.black, TEXT_COLORS.dark]
    : [TEXT_COLORS.white, TEXT_COLORS.light];
  
  let bestColor = textOptions[0] || TEXT_COLORS.black;
  let bestRatio = 0;
  
  for (const textColor of textOptions) {
    const ratio = getContrastRatio(textColor, bgColor);
    if (ratio > bestRatio && meetsContrastRatio(textColor, bgColor, 'AA_NORMAL')) {
      bestRatio = ratio;
      bestColor = textColor;
    }
  }
  
  // If no color meets AA standard, return the one with highest contrast anyway
  if (bestRatio < CONTRAST_RATIOS.AA_NORMAL) {
    for (const textColor of textOptions) {
      const ratio = getContrastRatio(textColor, bgColor);
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestColor = textColor;
      }
    }
  }
  
  return bestColor;
}

// CSS class generator for high contrast combinations
export function getHighContrastClasses(
  backgroundColor: keyof typeof JEWELRY_COLORS,
  theme: 'light' | 'dark' = 'light'
): string {
  const textColor = getHighContrastTextColor(backgroundColor, theme);
  
  // Map to Tailwind classes
  const textClass = textColor === TEXT_COLORS.white || textColor === TEXT_COLORS.light 
    ? 'text-white' 
    : 'text-foreground';
    
  return `${textClass} font-semibold`;
}

// Check if a color combination meets WCAG standards
export function validateColorContrast(
  foreground: string,
  background: string,
  level: keyof typeof CONTRAST_RATIOS = 'AA_NORMAL'
): {
  ratio: number;
  meetsStandard: boolean;
  level: string;
} {
  const ratio = getContrastRatio(foreground, background);
  const meetsStandard = meetsContrastRatio(foreground, background, level);
  
  return {
    ratio: Math.round(ratio * 100) / 100,
    meetsStandard,
    level: `${level} (${CONTRAST_RATIOS[level]}:1)`,
  };
}

// Generate CSS custom properties for high contrast mode
export function generateHighContrastCSS(): string {
  const cssVars: string[] = [];
  
  Object.entries(JEWELRY_COLORS).forEach(([colorName, colorValue]) => {
    const lightText = getHighContrastTextColor(colorName as keyof typeof JEWELRY_COLORS, 'light');
    const darkText = getHighContrastTextColor(colorName as keyof typeof JEWELRY_COLORS, 'dark');
    
    cssVars.push(`  --${colorName}-text-light: ${lightText};`);
    cssVars.push(`  --${colorName}-text-dark: ${darkText};`);
  });
  
  return cssVars.join('\n');
}

// Validate all jewelry color combinations
export function validateAllJewelryContrasts(): {
  [key: string]: {
    light: { ratio: number; meetsStandard: boolean; textColor: string };
    dark: { ratio: number; meetsStandard: boolean; textColor: string };
  };
} {
  const results: any = {};
  
  Object.entries(JEWELRY_COLORS).forEach(([colorName, colorValue]) => {
    const lightTextColor = getHighContrastTextColor(colorName as keyof typeof JEWELRY_COLORS, 'light');
    const darkTextColor = getHighContrastTextColor(colorName as keyof typeof JEWELRY_COLORS, 'dark');
    
    results[colorName] = {
      light: {
        ...validateColorContrast(lightTextColor, colorValue),
        textColor: lightTextColor,
      },
      dark: {
        ...validateColorContrast(darkTextColor, colorValue),
        textColor: darkTextColor,
      },
    };
  });
  
  return results;
}

// Get recommended text color for any jewelry background
export function getRecommendedTextColor(
  backgroundColor: keyof typeof JEWELRY_COLORS,
  theme: 'light' | 'dark' = 'light'
): {
  color: string;
  className: string;
  ratio: number;
  meetsStandard: boolean;
} {
  const bgColor = JEWELRY_COLORS[backgroundColor];
  const textColor = getHighContrastTextColor(backgroundColor, theme);
  const contrast = validateColorContrast(textColor, bgColor);
  
  // Map to Tailwind classes
  const className = textColor === TEXT_COLORS.white || textColor === TEXT_COLORS.light 
    ? 'text-white' 
    : 'text-foreground';
  
  return {
    color: textColor,
    className,
    ratio: contrast.ratio,
    meetsStandard: contrast.meetsStandard,
  };
}