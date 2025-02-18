# Angular Example

This example demonstrates how to use @grasshop/ui in an Angular application.

## Setup

```bash
# Create new Angular project
ng new my-app
cd my-app

# Install dependencies
npm install @grasshop/ui
```

## Usage

```typescript
// src/app/theme.service.ts
import { Injectable } from '@angular/core';
import { ThemeConfig } from '@grasshop/ui';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeConfig: ThemeConfig = {
    id: 'default',
    name: 'Default Theme',
    styles: {
      // Your theme configuration
    }
  };

  private themeSubject = new BehaviorSubject<ThemeConfig>(this.themeConfig);
  theme$ = this.themeSubject.asObservable();

  updateTheme(updates: Partial<ThemeConfig['styles']>) {
    this.themeConfig = {
      ...this.themeConfig,
      styles: {
        ...this.themeConfig.styles,
        ...updates
      }
    };
    this.themeSubject.next(this.themeConfig);
  }
}

// src/app/app.component.ts
import { Component } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  template: `
    <div [ngStyle]="getStyles()">
      <h1>Welcome to Angular with @grasshop/ui!</h1>
      <button (click)="toggleTheme()">Toggle Theme</button>
    </div>
  `
})
export class AppComponent {
  constructor(private themeService: ThemeService) {}

  getStyles() {
    return {
      backgroundColor: this.themeService.theme$.value.styles.colors.background,
      color: this.themeService.theme$.value.styles.colors.foreground,
      fontFamily: this.themeService.theme$.value.styles.typography.fonts.primary,
      padding: `${this.themeService.theme$.value.styles.spacing.unit * 4}px`
    };
  }

  toggleTheme() {
    this.themeService.updateTheme({
      colors: {
        background: '#000000',
        foreground: '#FFFFFF'
      }
    });
  }
}
```

## Using with Angular Material

```typescript
// src/app/material-theme.ts
import { ThemeConfig } from '@grasshop/ui';

export function convertToMaterialTheme(theme: ThemeConfig) {
  return {
    primary: theme.styles.colors.primary,
    accent: theme.styles.colors.accent,
    warn: theme.styles.colors.status.error,
    background: theme.styles.colors.background,
    foreground: theme.styles.colors.foreground
  };
}

// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { MatThemeModule } from '@angular/material/core';
import { ThemeService } from './theme.service';
import { convertToMaterialTheme } from './material-theme';

@NgModule({
  imports: [
    MatThemeModule,
    // ... other imports
  ],
  providers: [ThemeService]
})
export class AppModule {
  constructor(themeService: ThemeService) {
    themeService.theme$.subscribe(theme => {
      const materialTheme = convertToMaterialTheme(theme);
      // Apply Material theme
    });
  }
}
```
