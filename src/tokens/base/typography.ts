/**
 * @file Base typography token definitions
 * @description 
 * Defines the foundational typography settings including
 * font families, sizes, weights, and line heights.
 * These are raw typography values that will be mapped to semantic tokens.
 */

export const baseTypography = {
  // Font families
  fonts: {
    primary: 'Inter',
    secondary: 'Merriweather',
    mono: 'JetBrains Mono',
    system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },

  // Font sizes (in px)
  sizes: {
    scale: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
    },
    fluid: {
      sm: 'clamp(14px, 1.5vw, 16px)',
      base: 'clamp(16px, 2vw, 18px)',
      lg: 'clamp(18px, 2.5vw, 20px)',
      xl: 'clamp(20px, 3vw, 24px)',
    }
  },

  // Font weights
  weights: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Line heights
  lineHeights: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
    // Specific line heights for different contexts
    heading: '1.2',
    body: '1.5',
    code: '1.7',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Text transforms
  transforms: {
    normal: 'none',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
  }
} as const;

export type BaseTypography = typeof baseTypography;
