/**
 * @file Theme type definitions
 * @description 
 * Defines the TypeScript types for the theme system.
 * Based on the Tribes theme schema with improvements.
 */

export interface ThemeConfig {
  id: string;
  name: string;
  description?: string;
  version?: string;
  styles: ThemeStyles;
  overrides?: Partial<ThemeStyles>;
}

export interface ThemeStyles {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    zones?: Record<string, {
      name: string;
      color: string;
      icon?: string;
      description?: string;
      order?: number;
    }>;
    status: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
  typography: {
    fonts: {
      primary: string;
      secondary: string;
    };
    sizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    weights: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  spacing: {
    unit: number;
    scale: number[];
  };
  radii: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    none: string;
    sm: string;
    md: string;
    lg: string;
  };
}
