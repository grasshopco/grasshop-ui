/**
 * @file Semantic token definitions
 * @description 
 * Maps base tokens to semantic usage contexts.
 * This is where we define how base tokens are used in the application.
 * Based on the improved Tribes theme system structure.
 */

import { baseColors } from '../base/colors';
import { baseTypography } from '../base/typography';
import { baseSpacing } from '../base/spacing';

export const semanticTokens = {
  colors: {
    // Theme colors
    background: {
      default: baseColors.white,
      muted: baseColors.gray[50],
      subtle: baseColors.gray[100],
      inverse: baseColors.black,
    },

    // Text colors
    text: {
      primary: baseColors.gray[900],
      secondary: baseColors.gray[600],
      muted: baseColors.gray[500],
      inverse: baseColors.white,
    },

    // Border colors
    border: {
      default: baseColors.gray[200],
      muted: baseColors.gray[100],
      focus: baseColors.brand.accent,
    },

    // Action colors
    action: {
      primary: baseColors.brand.primary,
      secondary: baseColors.brand.secondary,
      accent: baseColors.brand.accent,
    },

    // Status colors
    status: baseColors.status,

    // Zone colors
    zones: baseColors.zones,
  },

  typography: {
    // Heading styles
    headings: {
      h1: {
        font: baseTypography.fonts.primary,
        size: baseTypography.sizes.scale['3xl'],
        weight: baseTypography.weights.bold,
        lineHeight: baseTypography.lineHeights.heading,
      },
      h2: {
        font: baseTypography.fonts.primary,
        size: baseTypography.sizes.scale['2xl'],
        weight: baseTypography.weights.bold,
        lineHeight: baseTypography.lineHeights.heading,
      },
      h3: {
        font: baseTypography.fonts.primary,
        size: baseTypography.sizes.scale.xl,
        weight: baseTypography.weights.semibold,
        lineHeight: baseTypography.lineHeights.heading,
      },
      h4: {
        font: baseTypography.fonts.primary,
        size: baseTypography.sizes.scale.lg,
        weight: baseTypography.weights.semibold,
        lineHeight: baseTypography.lineHeights.heading,
      },
    },

    // Body text styles
    body: {
      default: {
        font: baseTypography.fonts.primary,
        size: baseTypography.sizes.scale.base,
        weight: baseTypography.weights.normal,
        lineHeight: baseTypography.lineHeights.body,
      },
      large: {
        font: baseTypography.fonts.primary,
        size: baseTypography.sizes.scale.lg,
        weight: baseTypography.weights.normal,
        lineHeight: baseTypography.lineHeights.body,
      },
      small: {
        font: baseTypography.fonts.primary,
        size: baseTypography.sizes.scale.sm,
        weight: baseTypography.weights.normal,
        lineHeight: baseTypography.lineHeights.body,
      },
    },

    // Code text styles
    code: {
      default: {
        font: baseTypography.fonts.mono,
        size: baseTypography.sizes.scale.sm,
        weight: baseTypography.weights.normal,
        lineHeight: baseTypography.lineHeights.code,
      },
    },

    // Fluid typography options
    fluid: baseTypography.sizes.fluid,
  },

  spacing: {
    layout: baseSpacing.layout,
    component: baseSpacing.component,
    scale: baseSpacing.scale,
  },
} as const;

export type SemanticTokens = typeof semanticTokens;
