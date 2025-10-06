import tokens from './tokens.json';

export interface DesignTokens {
  color: {
    light: Record<string, string>;
    dark: Record<string, string>;
    semantic: Record<string, string>;
  };
  typography: {
    fontFamily: Record<string, string[]>;
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
    letterSpacing: Record<string, string>;
  };
  spacing: Record<string, string>;
  radius: Record<string, string>;
  shadow: Record<string, string>;
  zIndex: Record<string, string>;
  motion: {
    duration: Record<string, string>;
    easing: Record<string, string>;
    spring: Record<string, string>;
  };
}

export const designTokens = tokens as DesignTokens;

/**
 * Get CSS variable name for a token
 */
export function getCSSVar(category: string, key: string, variant?: string): string {
  if (variant) {
    return `--${category}-${variant}-${key}`;
  }
  return `--${category}-${key}`;
}

/**
 * Generate CSS custom properties from tokens
 */
export function generateCSSVars(theme: 'light' | 'dark' = 'light'): string {
  const cssVars: string[] = [];
  
  // Color variables
  Object.entries(designTokens.color[theme]).forEach(([key, value]) => {
    cssVars.push(`  --${key}: ${value};`);
  });
  
  // Semantic color variables
  Object.entries(designTokens.color.semantic).forEach(([key, value]) => {
    cssVars.push(`  --${key}: ${value};`);
  });
  
  // Typography variables
  Object.entries(designTokens.typography.fontSize).forEach(([key, value]) => {
    cssVars.push(`  --font-size-${key}: ${value};`);
  });
  
  Object.entries(designTokens.typography.fontWeight).forEach(([key, value]) => {
    cssVars.push(`  --font-weight-${key}: ${value};`);
  });
  
  Object.entries(designTokens.typography.lineHeight).forEach(([key, value]) => {
    cssVars.push(`  --line-height-${key}: ${value};`);
  });
  
  Object.entries(designTokens.typography.letterSpacing).forEach(([key, value]) => {
    cssVars.push(`  --letter-spacing-${key}: ${value};`);
  });
  
  // Spacing variables
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    cssVars.push(`  --spacing-${key}: ${value};`);
  });
  
  // Radius variables
  Object.entries(designTokens.radius).forEach(([key, value]) => {
    cssVars.push(`  --radius-${key}: ${value};`);
  });
  
  // Shadow variables
  Object.entries(designTokens.shadow).forEach(([key, value]) => {
    cssVars.push(`  --shadow-${key}: ${value};`);
  });
  
  // Z-index variables
  Object.entries(designTokens.zIndex).forEach(([key, value]) => {
    cssVars.push(`  --z-${key}: ${value};`);
  });
  
  // Motion variables
  Object.entries(designTokens.motion.duration).forEach(([key, value]) => {
    cssVars.push(`  --duration-${key}: ${value};`);
  });
  
  Object.entries(designTokens.motion.easing).forEach(([key, value]) => {
    cssVars.push(`  --ease-${key}: ${value};`);
  });
  
  Object.entries(designTokens.motion.spring).forEach(([key, value]) => {
    cssVars.push(`  --spring-${key}: ${value};`);
  });
  
  return cssVars.join('\n');
}

/**
 * Get a specific token value
 */
export function getToken(category: keyof DesignTokens, key: string, variant?: string): string | undefined {
  const categoryTokens = designTokens[category] as any;
  
  if (variant && 'light' in categoryTokens && 'dark' in categoryTokens) {
    return categoryTokens[variant]?.[key];
  }
  
  return categoryTokens?.[key];
}

/**
 * Get color token with theme support
 */
export function getColorToken(color: string, theme: 'light' | 'dark' = 'light'): string {
  return designTokens.color[theme][color] || designTokens.color.semantic[color] || color;
}

/**
 * Get semantic color tokens for jewelry
 */
export function getJewelryColors() {
  return {
    emerald: designTokens.color.semantic['chip-emerald'],
    ruby: designTokens.color.semantic['chip-ruby'],
    gold: designTokens.color.semantic['chip-gold'],
    sage: designTokens.color.semantic['chip-sage'],
    sand: designTokens.color.semantic['chip-sand'],
  };
}

export default designTokens;
