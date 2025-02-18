/** @jest-environment jsdom */
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, useTheme, DEFAULT_THEME } from '../index';

describe('Theme', () => {
  it('provides default theme when no theme is specified', () => {
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme-test">{theme.styles.colors.primary}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-test')).toHaveTextContent(
      DEFAULT_THEME.styles.colors.primary
    );
  });

  it('allows theme updates', async () => {
    const TestComponent = () => {
      const { theme, updateTheme } = useTheme();
      return (
        <div>
          <div data-testid="theme-color">{theme.styles.colors.primary}</div>
          <button
            onClick={() =>
              updateTheme({
                colors: {
                  ...theme.styles.colors,
                  primary: '#FF0000',
                }
              })
            }
          >
            Update Theme
          </button>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-color')).toHaveTextContent(
      DEFAULT_THEME.styles.colors.primary
    );

    await act(async () => {
      screen.getByRole('button').click();
    });

    // Add a small delay to ensure state updates are complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('theme-color')).toHaveTextContent('#FF0000');
  });

  it('accepts custom theme', () => {
    const customTheme = {
      ...DEFAULT_THEME,
      styles: {
        ...DEFAULT_THEME.styles,
        colors: {
          ...DEFAULT_THEME.styles.colors,
          primary: '#00FF00',
        },
      },
    };

    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme-test">{theme.styles.colors.primary}</div>;
    };

    render(
      <ThemeProvider theme={customTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-test')).toHaveTextContent('#00FF00');
  });
}); 