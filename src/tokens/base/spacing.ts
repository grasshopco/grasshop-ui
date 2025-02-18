/**
 * @file Base spacing token definitions
 * @description 
 * Defines the foundational spacing units used throughout the system.
 * These are raw spacing values that will be mapped to semantic tokens.
 */

export const baseSpacing = {
  // Base scale
  scale: {
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
  },

  // Layout specific spacing
  layout: {
    page: '1440px',
    container: '1280px',
    content: '768px',
  },

  // Component specific spacing
  component: {
    padding: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    gap: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    radius: {
      none: '0',
      sm: '4px',
      md: '8px',
      lg: '16px',
      full: '9999px',
    }
  }
} as const;

export type BaseSpacing = typeof baseSpacing;
