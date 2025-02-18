# Vanilla JavaScript Example

This example shows how to use @grasshop/ui in a vanilla JavaScript application without any framework.

## Setup

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Vanilla JS with @grasshop/ui</title>
  <script type="module">
    import { theme } from '@grasshop/ui';
  </script>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="app.js"></script>
</body>
</html>
```

## Usage

```javascript
// theme.js
import { ThemeConfig } from '@grasshop/ui';

export const theme = {
  id: 'custom',
  name: 'Custom Theme',
  styles: {
    colors: {
      primary: '#3B82F6',
      secondary: '#6B7280',
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
    // ... other style properties
  }
};

// CSS Variables
export function applyThemeToRoot(theme) {
  const root = document.documentElement;
  
  // Colors
  Object.entries(theme.styles.colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      root.style.setProperty(`--color-${key}`, value);
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        root.style.setProperty(`--color-${key}-${subKey}`, subValue);
      });
    }
  });
  
  // Typography
  Object.entries(theme.styles.typography.sizes).forEach(([key, value]) => {
    root.style.setProperty(`--font-size-${key}`, value);
  });
  
  // Spacing
  theme.styles.spacing.scale.forEach((value, index) => {
    root.style.setProperty(`--spacing-${index}`, `${value}px`);
  });
  
  // Radii
  Object.entries(theme.styles.radii).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });
}

// app.js
import { theme } from './theme.js';

class ThemeManager {
  constructor(theme) {
    this.theme = theme;
    this.listeners = new Set();
  }

  updateTheme(updates) {
    this.theme = {
      ...this.theme,
      styles: {
        ...this.theme.styles,
        ...updates
      }
    };
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.theme));
  }
}

// Initialize theme manager
const themeManager = new ThemeManager(theme);

// Create themed components
class ThemedButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.unsubscribe = themeManager.subscribe(() => this.render());
  }

  disconnectedCallback() {
    this.unsubscribe?.();
  }

  render() {
    const { theme } = themeManager;
    this.shadowRoot.innerHTML = `
      <style>
        button {
          background-color: ${theme.styles.colors.primary};
          color: white;
          padding: ${theme.styles.spacing.unit * 2}px;
          border: none;
          border-radius: ${theme.styles.radii.md};
          font-family: ${theme.styles.typography.fonts.primary};
          font-size: ${theme.styles.typography.sizes.base};
          cursor: pointer;
        }
        button:hover {
          opacity: 0.9;
        }
      </style>
      <button><slot></slot></button>
    `;
  }
}

customElements.define('themed-button', ThemedButton);

// Usage
document.getElementById('app').innerHTML = `
  <div style="
    background-color: ${theme.styles.colors.background};
    color: ${theme.styles.colors.foreground};
    padding: ${theme.styles.spacing.unit * 4}px;
    font-family: ${theme.styles.typography.fonts.primary};
  ">
    <h1 style="
      font-size: ${theme.styles.typography.sizes['2xl']};
      font-weight: ${theme.styles.typography.weights.bold};
    ">
      Welcome to Vanilla JS with @grasshop/ui!
    </h1>
    
    <themed-button>Click me!</themed-button>
  </div>
`;

// Dark mode toggle
const toggleDarkMode = () => {
  const isDark = theme.styles.colors.background === '#FFFFFF';
  themeManager.updateTheme({
    colors: {
      background: isDark ? '#000000' : '#FFFFFF',
      foreground: isDark ? '#FFFFFF' : '#000000',
    }
  });
};

// Using with CSS-in-JS
const createStyledElement = (tagName, styles) => {
  const element = document.createElement(tagName);
  Object.assign(element.style, styles(theme.styles));
  return element;
};

const styledDiv = createStyledElement('div', styles => ({
  backgroundColor: styles.colors.primary,
  padding: `${styles.spacing.unit * 2}px`,
  borderRadius: styles.radii.md,
}));
```

## Using with CSS Variables

```css
/* styles.css */
:root {
  --color-primary: '';
  --color-background: '';
  --font-size-base: '';
  /* ... other variables */
}

.themed-button {
  background-color: var(--color-primary);
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  color: white;
  border: none;
  cursor: pointer;
}

.themed-button:hover {
  opacity: 0.9;
}
```

## Using with SCSS

```scss
// theme.scss
@use 'sass:map';

$theme: (
  colors: (
    primary: var(--color-primary),
    secondary: var(--color-secondary),
    // ... other colors
  ),
  spacing: (
    unit: var(--spacing-unit),
    // ... other spacing values
  ),
  // ... other theme properties
);

@function theme($path...) {
  $current: $theme;
  @each $key in $path {
    $current: map.get($current, $key);
  }
  @return $current;
}

.themed-component {
  background-color: theme('colors', 'primary');
  padding: theme('spacing', 'unit');
}
```
