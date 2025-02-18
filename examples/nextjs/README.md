# Next.js Example

This example shows how to use @grasshop/ui in a Next.js application.

## Setup

```bash
# Create new Next.js project
npx create-next-app@latest my-app --typescript
cd my-app

# Install dependencies
npm install @grasshop/ui
```

## Usage

```tsx
// app/providers.tsx
'use client';

import { ThemeProvider } from '@grasshop/ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// app/page.tsx
'use client';

import { useTheme } from '@grasshop/ui';

export default function Home() {
  const { theme } = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: theme.styles.colors.background,
      color: theme.styles.colors.foreground,
      fontFamily: theme.styles.typography.fonts.primary,
      padding: theme.styles.spacing.unit * 4
    }}>
      <h1>Welcome to Next.js with @grasshop/ui!</h1>
    </div>
  );
}
```

## Custom Theme

```tsx
// app/theme.ts
import { ThemeConfig } from '@grasshop/ui';

export const customTheme: ThemeConfig = {
  id: 'custom',
  name: 'Custom Theme',
  styles: {
    // Your custom theme configuration
  }
};

// app/providers.tsx
import { customTheme } from './theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
}
```
