/**
 * @file Base color token definitions
 * @description 
 * Defines the foundational color palette for the design system.
 * These are raw color values that will be mapped to semantic tokens.
 */

export const baseColors = {
  // Primary palette
  black: '#000000',
  white: '#FFFFFF',
  
  // Gray scale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Brand colors
  brand: {
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#6366F1',
  },

  // Semantic colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // Opacity values for colors
  opacity: {
    light: 0.1,
    medium: 0.4,
    heavy: 0.7,
  },

  // Add zone-based colors
  zones: {
    problem: {
      primary: '#FF6B6B',
      secondary: '#845EC2',
    },
    project: {
      primary: '#4D8076',
      secondary: '#2C73D2',
    },
    launch: {
      primary: '#008F7A',
      secondary: '#0081CF',
    }
  }
} as const;

export type BaseColors = typeof baseColors;
