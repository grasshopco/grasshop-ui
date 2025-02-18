# @grasshop/ui

A platform-agnostic design system and theme engine that works across any JavaScript/TypeScript environment.

## Features

- 🎨 Customizable design tokens
- 🌗 Light and dark mode support (and everything in between 😉)
- 🌐 Framework agnostic
- 🔄 Runtime theme updates
- 🎯 Type-safe theme configuration
- 📱 Platform independent

## Installation

```bash
# npm
npm install @grasshop/ui

# yarn
yarn add @grasshop/ui

# pnpm
pnpm add @grasshop/ui
```

## Quick Start

```tsx
// React/React Native example
import { ThemeProvider, useTheme } from '@grasshop/ui';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

// Use in any framework
import { theme } from '@grasshop/ui';

const backgroundColor = theme.styles.colors.background;
const fontSize = theme.styles.typography.sizes.base;
```

## Documentation

- [Tokens](./docs/tokens.md)
- [Theming](./docs/theming.md)

## Framework Examples

- [Angular](./examples/angular/)
- [React](./examples/react/)
- [React Native](./examples/react-native/)
- [Svelte](./examples/svelte/)
- [Swift](./examples/swift/)
- [Kotlin](./examples/kotlin/)
- [Vue](./examples/vue/)
- [Vanilla JavaScript](./examples/vanilla-js/)

## License

MIT © Grasshop
