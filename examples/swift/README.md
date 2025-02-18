# Swift Example

This example demonstrates how to use @grasshop/ui tokens in a Swift/iOS application.

## Setup

First, export your theme tokens to a Swift-compatible format:

```typescript
// In your JavaScript/TypeScript project
import { theme } from '@grasshop/ui';
import fs from 'fs';

const swiftTheme = `
// Generated from @grasshop/ui
import SwiftUI

enum ThemeTokens {
    enum Colors {
        static let primary = Color(hex: "${theme.styles.colors.primary}")
        static let secondary = Color(hex: "${theme.styles.colors.secondary}")
        static let accent = Color(hex: "${theme.styles.colors.accent}")
        static let background = Color(hex: "${theme.styles.colors.background}")
        static let foreground = Color(hex: "${theme.styles.colors.foreground}")
        
        enum Status {
            static let success = Color(hex: "${theme.styles.colors.status.success}")
            static let warning = Color(hex: "${theme.styles.colors.status.warning}")
            static let error = Color(hex: "${theme.styles.colors.status.error}")
            static let info = Color(hex: "${theme.styles.colors.status.info}")
        }
    }
    
    enum Typography {
        static let primaryFont = "${theme.styles.typography.fonts.primary}"
        static let secondaryFont = "${theme.styles.typography.fonts.secondary}"
        
        enum FontSizes {
            static let xs = CGFloat(${parseInt(theme.styles.typography.sizes.xs)})
            static let sm = CGFloat(${parseInt(theme.styles.typography.sizes.sm)})
            static let base = CGFloat(${parseInt(theme.styles.typography.sizes.base)})
            static let lg = CGFloat(${parseInt(theme.styles.typography.sizes.lg)})
            static let xl = CGFloat(${parseInt(theme.styles.typography.sizes.xl)})
        }
        
        enum FontWeights {
            static let normal = Font.Weight.regular
            static let medium = Font.Weight.medium
            static let semibold = Font.Weight.semibold
            static let bold = Font.Weight.bold
        }
    }
    
    enum Spacing {
        static let unit = CGFloat(${theme.styles.spacing.unit})
        static let scale: [CGFloat] = [${theme.styles.spacing.scale.join(", ")}]
    }
    
    enum Radii {
        static let none = CGFloat(0)
        static let sm = CGFloat(${parseInt(theme.styles.radii.sm)})
        static let md = CGFloat(${parseInt(theme.styles.radii.md)})
        static let lg = CGFloat(${parseInt(theme.styles.radii.lg)})
    }
}
`;

fs.writeFileSync('ThemeTokens.swift', swiftTheme);
```

## Usage in SwiftUI

```swift
// Color+Hex.swift
import SwiftUI

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// ContentView.swift
import SwiftUI

struct ContentView: View {
    @State private var isDarkMode = false
    
    var body: some View {
        VStack(spacing: ThemeTokens.Spacing.unit) {
            Text("Welcome to SwiftUI with @grasshop/ui!")
                .font(.system(size: ThemeTokens.Typography.FontSizes.xl))
                .fontWeight(ThemeTokens.Typography.FontWeights.bold)
                .foregroundColor(isDarkMode ? .white : ThemeTokens.Colors.foreground)
            
            Button(action: {
                isDarkMode.toggle()
            }) {
                Text("Toggle Dark Mode")
                    .font(.system(size: ThemeTokens.Typography.FontSizes.base))
                    .fontWeight(ThemeTokens.Typography.FontWeights.medium)
                    .foregroundColor(.white)
                    .padding(.horizontal, ThemeTokens.Spacing.unit * 4)
                    .padding(.vertical, ThemeTokens.Spacing.unit * 2)
                    .background(ThemeTokens.Colors.primary)
                    .cornerRadius(ThemeTokens.Radii.md)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(isDarkMode ? Color.black : ThemeTokens.Colors.background)
    }
}

// Custom Components
struct ThemedButton: View {
    let title: String
    let action: () -> Void
    let variant: ButtonVariant
    
    enum ButtonVariant {
        case primary
        case secondary
        
        var backgroundColor: Color {
            switch self {
            case .primary:
                return ThemeTokens.Colors.primary
            case .secondary:
                return ThemeTokens.Colors.secondary
            }
        }
    }
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: ThemeTokens.Typography.FontSizes.base))
                .fontWeight(ThemeTokens.Typography.FontWeights.medium)
                .foregroundColor(.white)
                .padding(.horizontal, ThemeTokens.Spacing.unit * 4)
                .padding(.vertical, ThemeTokens.Spacing.unit * 2)
                .background(variant.backgroundColor)
                .cornerRadius(ThemeTokens.Radii.md)
        }
    }
}

// Usage with UIKit
class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.backgroundColor = UIColor(ThemeTokens.Colors.background)
        
        let label = UILabel()
        label.text = "Hello UIKit!"
        label.font = .systemFont(
            ofSize: ThemeTokens.Typography.FontSizes.xl,
            weight: .bold
        )
        label.textColor = UIColor(ThemeTokens.Colors.foreground)
        
        // ... layout setup
    }
}
