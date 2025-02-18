# Theming Guide

@grasshop/ui provides a flexible theming system that works across any platform or framework.

## Core Concepts

### Theme Structure
A theme consists of:
- Base tokens: Raw values (colors, spacing, typography)
- Semantic tokens: Meaningful abstractions of base tokens
- Component tokens: Component-specific styling
- Theme overrides: Custom extensions

### Theme Configuration
```typescript
interface ThemeConfig {
  id: string;
  name: string;
  description?: string;
  version?: string;
  styles: ThemeStyles;
  overrides?: Partial<ThemeStyles>;
}
```

## Usage Examples

### React/React Native
```typescript
import { ThemeProvider, useTheme } from '@grasshop/ui';

// Set up theme
const App = () => (
  <ThemeProvider>
    <MyApp />
  </ThemeProvider>
);

// Use theme
const MyComponent = () => {
  const { theme, updateTheme } = useTheme();
  
  // Access theme values
  const backgroundColor = theme.styles.colors.background;
  
  // Update theme
  const toggleDarkMode = () => {
    updateTheme({
      colors: {
        background: '#000000',
        foreground: '#FFFFFF'
      }
    });
  };
};
```

### Svelte
```typescript
<script lang="ts">
  import { theme } from '@grasshop/ui';
  
  $: backgroundColor = theme.styles.colors.background;
</script>

<div style="background-color: {backgroundColor}">
  Hello Svelte!
</div>
```

### Vue
```typescript
<template>
  <div :style="{ backgroundColor: theme.styles.colors.background }">
    Hello Vue!
  </div>
</template>

<script setup>
import { theme } from '@grasshop/ui';
</script>
```

### Plain JavaScript
```javascript
import { theme } from '@grasshop/ui';

// Apply theme to DOM
document.body.style.setProperty('--primary-color', theme.styles.colors.primary);

// Create CSS variables
const cssVars = Object.entries(theme.styles.colors)
  .map(([key, value]) => `--color-${key}: ${value};`)
  .join('\n');

document.documentElement.style.cssText = cssVars;
```

### Swift
```swift
import GrasshopUI

struct ThemeManager {
    let theme: ThemeConfig
    
    var primaryColor: UIColor {
        UIColor(hex: theme.styles.colors.primary)
    }
    
    var fontFamily: String {
        theme.styles.typography.fonts.primary
    }
}
```

### Kotlin
```kotlin
import com.grasshop.ui.theme

class ThemeManager(private val theme: ThemeConfig) {
    val primaryColor: Color
        get() = Color.parseColor(theme.styles.colors.primary)
        
    val fontFamily: String
        get() = theme.styles.typography.fonts.primary
}
```

## Theme Customization

### Creating a Custom Theme
```typescript
import { ThemeConfig } from '@grasshop/ui';

const customTheme: ThemeConfig = {
  id: 'brand-theme',
  name: 'Brand Theme',
  styles: {
    colors: {
      primary: '#FF0000',
      secondary: '#00FF00',
      // ... other colors
    },
    typography: {
      fonts: {
        primary: 'CustomFont',
        secondary: 'AnotherFont'
      },
      // ... other typography settings
    },
    // ... other style properties
  }
};
```

### Runtime Theme Updates
```typescript
// React example
const { updateTheme } = useTheme();

// Update specific values
updateTheme({
  colors: {
    primary: '#FF0000'
  }
});

// Switch to dark mode
updateTheme({
  colors: {
    background: '#000000',
    foreground: '#FFFFFF',
    // ... other dark mode colors
  }
});
```

### Theme Presets
```typescript
const lightTheme: ThemeConfig = {
  id: 'light',
  name: 'Light Theme',
  styles: {
    // ... light theme values
  }
};

const darkTheme: ThemeConfig = {
  id: 'dark',
  name: 'Dark Theme',
  styles: {
    // ... dark theme values
  }
};

const brandTheme: ThemeConfig = {
  id: 'brand',
  name: 'Brand Theme',
  styles: {
    // ... brand-specific values
  }
};
```

## Best Practices

1. **Use Semantic Tokens**: Instead of using base tokens directly, prefer semantic tokens for better maintainability.
   ```typescript
   // Good
   const backgroundColor = theme.styles.colors.background;
   
   // Avoid
   const backgroundColor = '#FFFFFF';
   ```

2. **Type Safety**: Always use TypeScript types for type safety and better IDE support.
   ```typescript
   import { ThemeConfig } from '@grasshop/ui';
   
   // TypeScript will catch invalid theme properties
   const theme: ThemeConfig = {
     // ... type-safe theme configuration
   };
   ```

3. **Theme Versioning**: Use theme versioning for better maintenance.
   ```typescript
   const theme: ThemeConfig = {
     id: 'brand-theme',
     version: '1.0.0',
     // ... theme configuration
   };
   ```

4. **Document Custom Extensions**: When adding custom properties, document them in the overrides.
   ```typescript
   const theme: ThemeConfig = {
     // ... base theme configuration
     overrides: {
       customProperty: 'value', // Document purpose
       brandSpecific: {
         special: 'value' // Document usage
       }
     }
   };
   ```
