import React, { useState, useCallback } from 'react';
import { ThemeConfig } from './types';
import { ThemeContext } from './context';
import { processThemeValues } from '../utils/theme';

export const DEFAULT_THEME: ThemeConfig = {
  id: 'default',
  name: 'Default Theme',
  version: '1.0.0',
  styles: {
    colors: {
      primary: '#000000',
      secondary: '#666666',
      accent: '#6366F1',
      background: '#FFFFFF',
      foreground: '#000000',
      muted: '#F3F4F6',
      mutedForeground: '#6B7280',
      border: '#E5E7EB',
      input: '#FFFFFF',
      status: {
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      }
    },
    typography: {
      fonts: {
        primary: 'Inter',
        secondary: 'Merriweather',
      },
      sizes: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
      },
      weights: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      }
    },
    spacing: {
      unit: 4,
      scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]
    },
    radii: {
      none: '0',
      sm: '4px',
      md: '6px',
      lg: '8px',
      full: '9999px'
    },
    shadows: {
      none: 'none',
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    }
  }
};

interface ThemeProviderProps {
  theme?: ThemeConfig;
  children: React.ReactNode;
}

export function ThemeProvider({ theme = DEFAULT_THEME, children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(theme);

  const updateTheme = useCallback((updates: Partial<ThemeConfig['styles']>) => {
    setCurrentTheme(prev => ({
      ...prev,
      styles: {
        ...prev.styles,
        ...updates
      }
    }));
  }, []);

  const setTheme = useCallback((newTheme: ThemeConfig) => {
    setCurrentTheme(newTheme);
  }, []);

  // Process theme values for use in components
  const processedTheme = processThemeValues(currentTheme);

  return (
    <ThemeContext.Provider 
      value={{
        theme: processedTheme,
        updateTheme,
        setTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
