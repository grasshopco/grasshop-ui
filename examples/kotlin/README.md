# Kotlin (Android) Example

This example shows how to use @grasshop/ui tokens in a Kotlin Android application.

## Setup

First, export your theme tokens to a format that can be used in Kotlin:

```typescript
// In your JavaScript/TypeScript project
import { theme } from '@grasshop/ui';
import fs from 'fs';

const kotlinTheme = `
package com.yourapp.theme

object ThemeTokens {
    object Colors {
        const val primary = "${theme.styles.colors.primary}"
        const val secondary = "${theme.styles.colors.secondary}"
        const val background = "${theme.styles.colors.background}"
        const val foreground = "${theme.styles.colors.foreground}"
        
        object Status {
            const val success = "${theme.styles.colors.status.success}"
            const val error = "${theme.styles.colors.status.error}"
            const val warning = "${theme.styles.colors.status.warning}"
            const val info = "${theme.styles.colors.status.info}"
        }
    }
    
    object Typography {
        const val primaryFont = "${theme.styles.typography.fonts.primary}"
        const val secondaryFont = "${theme.styles.typography.fonts.secondary}"
        
        object FontSizes {
            const val xs = ${parseInt(theme.styles.typography.sizes.xs)}
            const val sm = ${parseInt(theme.styles.typography.sizes.sm)}
            const val base = ${parseInt(theme.styles.typography.sizes.base)}
            const val lg = ${parseInt(theme.styles.typography.sizes.lg)}
            const val xl = ${parseInt(theme.styles.typography.sizes.xl)}
        }
    }
    
    object Spacing {
        const val unit = ${theme.styles.spacing.unit}
        val scale = listOf(${theme.styles.spacing.scale.join(", ")})
    }
}
`;

fs.writeFileSync('ThemeTokens.kt', kotlinTheme);
```

## Usage in Kotlin

```kotlin
// Theme.kt
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import com.yourapp.theme.ThemeTokens

@Composable
fun AppTheme(
    content: @Composable () -> Unit
) {
    val colors = lightColors(
        primary = Color(android.graphics.Color.parseColor(ThemeTokens.Colors.primary)),
        secondary = Color(android.graphics.Color.parseColor(ThemeTokens.Colors.secondary)),
        background = Color(android.graphics.Color.parseColor(ThemeTokens.Colors.background)),
        // ... other colors
    )

    MaterialTheme(
        colors = colors,
        typography = Typography(
            defaultFontFamily = FontFamily(Font(ThemeTokens.Typography.primaryFont)),
            // ... other typography settings
        ),
        content = content
    )
}

// MainActivity.kt
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    Greeting("Android")
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String) {
    Text(
        text = "Hello $name!",
        color = MaterialTheme.colors.primary,
        fontSize = with(ThemeTokens.Typography.FontSizes) {
            base.sp
        },
        modifier = Modifier.padding(
            ThemeTokens.Spacing.unit.dp
        )
    )
}
```

## Using with Jetpack Compose

```kotlin
// ComposeTheme.kt
object ComposeTheme {
    val colors = object {
        val primary = Color(android.graphics.Color.parseColor(ThemeTokens.Colors.primary))
        val secondary = Color(android.graphics.Color.parseColor(ThemeTokens.Colors.secondary))
        // ... other colors
    }

    val typography = Typography(
        bodyLarge = TextStyle(
            fontFamily = FontFamily(Font(ThemeTokens.Typography.primaryFont)),
            fontSize = ThemeTokens.Typography.FontSizes.base.sp
        )
        // ... other text styles
    )

    val spacing = object {
        val unit = ThemeTokens.Spacing.unit.dp
        val scale = ThemeTokens.Spacing.scale.map { it.dp }
    }
}
```
