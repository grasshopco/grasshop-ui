# Svelte Example

This example demonstrates how to use @grasshop/ui in a Svelte application.

## Setup

```bash
# Create new Svelte project
npm create vite@latest my-app -- --template svelte-ts
cd my-app

# Install dependencies
npm install @grasshop/ui
```

## Usage

```svelte
<!-- src/lib/theme.ts -->
<script lang="ts">
import { writable } from 'svelte/store';
import type { ThemeConfig } from '@grasshop/ui';

export const theme = writable<ThemeConfig>({
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
});

export function updateTheme(updates: Partial<ThemeConfig['styles']>) {
  theme.update(t => ({
    ...t,
    styles: {
      ...t.styles,
      ...updates
    }
  }));
}
</script>

<!-- src/App.svelte -->
<script lang="ts">
  import { theme, updateTheme } from '$lib/theme';

  function toggleDarkMode() {
    updateTheme({
      colors: {
        background: $theme.styles.colors.background === '#FFFFFF' ? '#000000' : '#FFFFFF',
        foreground: $theme.styles.colors.foreground === '#000000' ? '#FFFFFF' : '#000000',
      }
    });
  }
</script>

<div 
  style:background-color={$theme.styles.colors.background}
  style:color={$theme.styles.colors.foreground}
  style:padding="{$theme.styles.spacing.unit * 4}px"
  style:font-family={$theme.styles.typography.fonts.primary}
>
  <h1 
    style:font-size={$theme.styles.typography.sizes['2xl']}
    style:font-weight={$theme.styles.typography.weights.bold}
  >
    Welcome to Svelte with @grasshop/ui!
  </h1>
  
  <button 
    on:click={toggleDarkMode}
    style:background-color={$theme.styles.colors.primary}
    style:color="#FFFFFF"
    style:padding="{$theme.styles.spacing.unit * 2}px"
    style:border="none"
    style:border-radius={$theme.styles.radii.md}
  >
    Toggle Dark Mode
  </button>
</div>

<!-- Using with CSS Variables -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '$lib/theme';
  
  onMount(() => {
    const root = document.documentElement;
    $: {
      root.style.setProperty('--color-primary', $theme.styles.colors.primary);
      root.style.setProperty('--color-background', $theme.styles.colors.background);
      // ... set other CSS variables
    }
  });
</script>

<style>
  :global(:root) {
    --color-primary: '';
    --color-background: '';
  }

  .themed-button {
    background-color: var(--color-primary);
    padding: var(--spacing-base);
  }
</style>

<!-- Using with Svelte Actions -->
<script lang="ts">
  import { theme } from '$lib/theme';

  function themedBackground(node: HTMLElement) {
    const update = () => {
      node.style.backgroundColor = $theme.styles.colors.background;
      node.style.color = $theme.styles.colors.foreground;
    };

    const unsubscribe = theme.subscribe(update);
    update();

    return {
      destroy() {
        unsubscribe();
      }
    };
  }
</script>

<div use:themedBackground>
  Themed content
</div>

<!-- Creating Themed Components -->
<!-- src/lib/components/Button.svelte -->
<script lang="ts">
  import { theme } from '$lib/theme';
  export let variant: 'primary' | 'secondary' = 'primary';
</script>

<button
  class="button"
  style:background-color={variant === 'primary' 
    ? $theme.styles.colors.primary 
    : $theme.styles.colors.secondary}
  style:padding="{$theme.styles.spacing.unit * 2}px"
  style:border-radius={$theme.styles.radii.md}
  {...$$restProps}
>
  <slot />
</button>

<style>
  .button {
    border: none;
    color: white;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .button:hover {
    opacity: 0.9;
  }
</style>

<!-- Usage -->
<Button variant="primary">
  Click me!
</Button>
```

## Using with TailwindCSS

```typescript
// tailwind.config.js
import { theme } from './src/lib/theme';

export default {
  theme: {
    extend: {
      colors: {
        primary: theme.styles.colors.primary,
        secondary: theme.styles.colors.secondary,
        // ... other colors
      },
      spacing: {
        ...Object.fromEntries(
          theme.styles.spacing.scale.map((size, index) => [index, `${size}px`])
        ),
      },
      fontFamily: {
        primary: [theme.styles.typography.fonts.primary],
        secondary: [theme.styles.typography.fonts.secondary],
      },
      borderRadius: {
        sm: theme.styles.radii.sm,
        md: theme.styles.radii.md,
        lg: theme.styles.radii.lg,
      },
    },
  },
};
```
