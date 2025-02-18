# Vue Example

This example demonstrates how to use @grasshop/ui in a Vue application.

## Setup

```bash
# Create new Vue project
npm create vue@latest my-app
cd my-app

# Install dependencies
npm install @grasshop/ui
```

## Usage

```typescript
// src/theme.ts
import { ref, computed } from 'vue';
import type { ThemeConfig } from '@grasshop/ui';

export const theme = ref<ThemeConfig>({
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
  theme.value = {
    ...theme.value,
    styles: {
      ...theme.value.styles,
      ...updates
    }
  };
}

// Create composable for theme
export function useTheme() {
  return {
    theme: computed(() => theme.value),
    updateTheme
  };
}

// App.vue
<script setup lang="ts">
import { useTheme } from './theme';

const { theme, updateTheme } = useTheme();

const toggleDarkMode = () => {
  updateTheme({
    colors: {
      background: theme.value.styles.colors.background === '#FFFFFF' ? '#000000' : '#FFFFFF',
      foreground: theme.value.styles.colors.foreground === '#000000' ? '#FFFFFF' : '#000000',
    }
  });
};
</script>

<template>
  <div
    :style="{
      backgroundColor: theme.styles.colors.background,
      color: theme.styles.colors.foreground,
      padding: `${theme.styles.spacing.unit * 4}px`,
      fontFamily: theme.styles.typography.fonts.primary,
    }"
  >
    <h1
      :style="{
        fontSize: theme.styles.typography.sizes['2xl'],
        fontWeight: theme.styles.typography.weights.bold,
      }"
    >
      Welcome to Vue with @grasshop/ui!
    </h1>
    
    <button
      @click="toggleDarkMode"
      :style="{
        backgroundColor: theme.styles.colors.primary,
        color: '#FFFFFF',
        padding: `${theme.styles.spacing.unit * 2}px`,
        border: 'none',
        borderRadius: theme.styles.radii.md,
      }"
    >
      Toggle Dark Mode
    </button>
  </div>
</template>

<!-- Creating Themed Components -->
<!-- src/components/ThemedButton.vue -->
<script setup lang="ts">
import { useTheme } from '../theme';

const { theme } = useTheme();

defineProps<{
  variant?: 'primary' | 'secondary'
}>();
</script>

<template>
  <button
    class="themed-button"
    :style="{
      backgroundColor: variant === 'primary' 
        ? theme.styles.colors.primary 
        : theme.styles.colors.secondary,
      padding: `${theme.styles.spacing.unit * 2}px`,
      borderRadius: theme.styles.radii.md,
    }"
  >
    <slot />
  </button>
</template>

<style scoped>
.themed-button {
  border: none;
  color: white;
  cursor: pointer;
  transition: opacity 0.2s;
}

.themed-button:hover {
  opacity: 0.9;
}
</style>

<!-- Using with CSS Variables -->
<!-- src/App.vue -->
<script setup lang="ts">
import { watch } from 'vue';
import { useTheme } from './theme';

const { theme } = useTheme();

// Update CSS variables when theme changes
watch(() => theme.value, (newTheme) => {
  const root = document.documentElement;
  
  Object.entries(newTheme.styles.colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      root.style.setProperty(`--color-${key}`, value);
    }
  });
  
  // ... update other CSS variables
}, { immediate: true });
</script>

<style>
:root {
  --color-primary: '';
  --color-background: '';
  /* ... other variables */
}

.themed-element {
  background-color: var(--color-primary);
  padding: var(--spacing-base);
}
</style>

<!-- Using with Tailwind -->
<!-- tailwind.config.js -->
import { theme } from './src/theme';

export default {
  theme: {
    extend: {
      colors: {
        primary: theme.value.styles.colors.primary,
        secondary: theme.value.styles.colors.secondary,
        // ... other colors
      },
      spacing: {
        ...Object.fromEntries(
          theme.value.styles.spacing.scale.map((size, index) => [index, `${size}px`])
        ),
      },
      fontFamily: {
        primary: [theme.value.styles.typography.fonts.primary],
        secondary: [theme.value.styles.typography.fonts.secondary],
      },
    },
  },
};

<!-- Using with Vue Router -->
<!-- src/router.ts -->
import { useTheme } from './theme';

const router = createRouter({
  // ... router configuration
});

router.beforeEach((to, from, next) => {
  const { theme } = useTheme();
  
  // Example: Change theme based on route
  if (to.meta.theme) {
    updateTheme(to.meta.theme);
  }
  
  next();
});
