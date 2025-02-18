# React Example

This example demonstrates how to use @grasshop/ui in a React application.

## Setup

```bash
# Create new React project
npx create-react-app my-app --template typescript
cd my-app

# Install dependencies
npm install @grasshop/ui
```

## Usage

```tsx
// src/theme.ts
import { ThemeConfig } from '@grasshop/ui';

export const customTheme: ThemeConfig = {
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

// src/App.tsx
import { ThemeProvider, useTheme } from '@grasshop/ui';
import { customTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Content />
    </ThemeProvider>
  );
}

function Content() {
  const { theme, updateTheme } = useTheme();

  const toggleDarkMode = () => {
    updateTheme({
      colors: {
        background: theme.styles.colors.background === '#FFFFFF' ? '#000000' : '#FFFFFF',
        foreground: theme.styles.colors.foreground === '#000000' ? '#FFFFFF' : '#000000',
      }
    });
  };

  return (
    <div style={{
      backgroundColor: theme.styles.colors.background,
      color: theme.styles.colors.foreground,
      padding: `${theme.styles.spacing.unit * 4}px`,
      fontFamily: theme.styles.typography.fonts.primary,
    }}>
      <h1 style={{
        fontSize: theme.styles.typography.sizes['2xl'],
        fontWeight: theme.styles.typography.weights.bold,
      }}>
        Welcome to React with @grasshop/ui!
      </h1>
      <button 
        onClick={toggleDarkMode}
        style={{
          backgroundColor: theme.styles.colors.primary,
          color: '#FFFFFF',
          padding: `${theme.styles.spacing.unit * 2}px`,
          border: 'none',
          borderRadius: theme.styles.radii.md,
        }}
      >
        Toggle Dark Mode
      </button>
    </div>
  );
}

export default App;
```

## Using with Styled Components

```tsx
// src/styled.ts
import styled from 'styled-components';
import { useTheme } from '@grasshop/ui';

export const StyledButton = styled.button`
  background-color: ${props => props.theme.styles.colors.primary};
  color: white;
  padding: ${props => props.theme.styles.spacing.unit * 2}px;
  border: none;
  border-radius: ${props => props.theme.styles.radii.md};
  font-family: ${props => props.theme.styles.typography.fonts.primary};
  
  &:hover {
    background-color: ${props => props.theme.styles.colors.accent};
  }
`;

// Usage with styled-components
function StyledApp() {
  const { theme } = useTheme();
  
  return (
    <ThemeProvider theme={theme}>
      <StyledButton>Styled Button</StyledButton>
    </ThemeProvider>
  );
}
```

## Using with CSS Modules

```tsx
// src/styles.module.css
.button {
  /* Styles will be applied through inline style or CSS variables */
}

// src/Button.tsx
import styles from './styles.module.css';
import { useTheme } from '@grasshop/ui';

function Button({ children }) {
  const { theme } = useTheme();
  
  return (
    <button 
      className={styles.button}
      style={{
        backgroundColor: theme.styles.colors.primary,
        padding: `${theme.styles.spacing.unit * 2}px`,
      }}
    >
      {children}
    </button>
  );
}
```
