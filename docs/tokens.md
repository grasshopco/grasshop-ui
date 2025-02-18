# Design Tokens

This document describes the design tokens available in @grasshop/ui.

## Base Tokens

Base tokens are the foundational values used throughout the system.

### Colors

```typescript
import { baseColors } from '@grasshop/ui';

// Usage
const primary = baseColors.brand.primary;
const gray500 = baseColors.gray[500];
```

### Typography

```typescript
import { baseTypography } from '@grasshop/ui';

// Usage
const primaryFont = baseTypography.fonts.primary;
const fontSize = baseTypography.sizes.base;
```

### Spacing

```typescript
import { baseSpacing } from '@grasshop/ui';

// Usage
const space4 = baseSpacing[4]; // 16px
const pageWidth = baseSpacing.layout.page;
```

## Semantic Tokens

Semantic tokens provide meaningful abstractions over base tokens.

```typescript
import { semanticTokens } from '@grasshop/ui';

// Usage
const backgroundColor = semanticTokens.colors.background.default;
const headingStyle = semanticTokens.typography.headings.h1;
```

## Customization

You can customize tokens by providing your own theme configuration:
The theme tokens can be used in any language or framework since they're just JavaScript/TypeScript objects.

### React/React Native Usage
```typescript
import { ThemeProvider, ThemeConfig } from '@grasshop/ui';

const customTheme: ThemeConfig = {
  id: 'custom',
  name: 'Custom Theme',
  styles: {
    colors: {
      primary: '#FF0000',
      secondary: '#00FF00',
      accent: '#0000FF',
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
        secondary: 'Merriweather'
      },
      sizes: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px'
      },
      weights: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
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

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Framework-Agnostic Usage
```typescript
import { ThemeConfig } from '@grasshop/ui';

// Define your theme
const theme: ThemeConfig = {
  // ... same theme configuration as above
};

// Use in Svelte
const backgroundColor = theme.styles.colors.background;

// Use in Vue
const primaryColor = theme.styles.colors.primary;

// Use in Swift
let primaryColor = theme.styles.colors.primary;

// Use in Kotlin
val primaryColor = theme.styles.colors.primary;

// Use in plain JavaScript
document.body.style.backgroundColor = theme.styles.colors.background;
```

You can also export the theme to other formats like CSS variables, SCSS, or JSON:

```typescript
// Export as CSS variables
const cssVars = `
  :root {
    --color-primary: ${theme.styles.colors.primary};
    --color-secondary: ${theme.styles.colors.secondary};
    --font-primary: ${theme.styles.typography.fonts.primary};
    /* ... other variables */
  }
`;

// Export as SCSS variables
const scssVars = `
  $color-primary: ${theme.styles.colors.primary};
  $color-secondary: ${theme.styles.colors.secondary};
  $font-primary: ${theme.styles.typography.fonts.primary};
  /* ... other variables */
`;

// Export as JSON for other platforms
const themeJson = JSON.stringify(theme, null, 2);
```
