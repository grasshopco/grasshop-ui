import { ThemeConfig } from '../theme/types';

export function processThemeValues(theme: ThemeConfig) {
  // This is a simplified version of the old processThemeValues
  // We'll expand it as needed when implementing components
  return {
    ...theme,
    // Add computed values here as needed
  };
}

export function getContrastingTextColor(backgroundColor: string): string {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

export function adjustColor(color: string, options: {
  alpha?: number;
  lighten?: number;
  darken?: number;
} = {}): string {
  // We'll implement this as needed when working with components
  // For now return the original color
  return color;
}
