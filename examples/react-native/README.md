# React Native Example

This example shows how to use @grasshop/ui in a React Native application.

## Setup

```bash
# Create new React Native project
npx react-native init MyApp --template react-native-template-typescript
cd MyApp

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

// App.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from '@grasshop/ui';
import { customTheme } from './src/theme';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <MainScreen />
    </ThemeProvider>
  );
}

function MainScreen() {
  const { theme, updateTheme } = useTheme();

  const toggleDarkMode = () => {
    updateTheme({
      colors: {
        background: theme.styles.colors.background === '#FFFFFF' ? '#000000' : '#FFFFFF',
        foreground: theme.styles.colors.foreground === '#000000' ? '#FFFFFF' : '#000000',
      }
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.styles.colors.background,
      padding: theme.styles.spacing.unit * 4,
    },
    title: {
      color: theme.styles.colors.foreground,
      fontSize: parseInt(theme.styles.typography.sizes['2xl']),
      fontWeight: theme.styles.typography.weights.bold,
      marginBottom: theme.styles.spacing.unit * 2,
    },
    button: {
      backgroundColor: theme.styles.colors.primary,
      padding: theme.styles.spacing.unit * 2,
      borderRadius: parseInt(theme.styles.radii.md),
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: parseInt(theme.styles.typography.sizes.base),
      fontWeight: theme.styles.typography.weights.medium,
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to React Native with @grasshop/ui!
      </Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={toggleDarkMode}
      >
        <Text style={styles.buttonText}>Toggle Dark Mode</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;
```

## Using with React Native Paper

```tsx
// src/theme/paper.ts
import { MD3LightTheme, configureFonts } from 'react-native-paper';
import { ThemeConfig } from '@grasshop/ui';

export function createPaperTheme(theme: ThemeConfig) {
  return {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: theme.styles.colors.primary,
      secondary: theme.styles.colors.secondary,
      error: theme.styles.colors.status.error,
      background: theme.styles.colors.background,
    },
    fonts: configureFonts({
      config: {
        fontFamily: theme.styles.typography.fonts.primary,
      },
    }),
  };
}

// App.tsx
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider, useTheme } from '@grasshop/ui';
import { createPaperTheme } from './src/theme/paper';

function App() {
  const { theme } = useTheme();
  const paperTheme = createPaperTheme(theme);

  return (
    <ThemeProvider theme={customTheme}>
      <PaperProvider theme={paperTheme}>
        <MainScreen />
      </PaperProvider>
    </ThemeProvider>
  );
}
```

## Using with Styled Components

```tsx
// src/components/StyledButton.ts
import styled from 'styled-components/native';

export const StyledButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.styles.colors.primary};
  padding: ${props => props.theme.styles.spacing.unit * 2}px;
  border-radius: ${props => parseInt(props.theme.styles.radii.md)}px;
  align-items: center;
`;

export const StyledButtonText = styled.Text`
  color: white;
  font-size: ${props => parseInt(props.theme.styles.typography.sizes.base)}px;
  font-weight: ${props => props.theme.styles.typography.weights.medium};
`;

// Usage
function StyledScreen() {
  const { theme } = useTheme();
  
  return (
    <StyledButton>
      <StyledButtonText>Styled Button</StyledButtonText>
    </StyledButton>
  );
}
```

## Platform-Specific Theming

```tsx
// src/theme/platform.ts
import { Platform } from 'react-native';
import { ThemeConfig } from '@grasshop/ui';

export function getPlatformTheme(baseTheme: ThemeConfig): ThemeConfig {
  return {
    ...baseTheme,
    styles: {
      ...baseTheme.styles,
      typography: {
        ...baseTheme.styles.typography,
        fonts: {
          primary: Platform.select({
            ios: 'SF Pro Text',
            android: 'Roboto',
            default: baseTheme.styles.typography.fonts.primary,
          }),
          secondary: Platform.select({
            ios: 'SF Pro Display',
            android: 'Roboto Slab',
            default: baseTheme.styles.typography.fonts.secondary,
          }),
        },
      },
    },
  };
}
```
