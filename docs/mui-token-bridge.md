# MUI Token Bridge

Guide for consuming MD3 design tokens in MUI components.

## Architecture

```
tokens.json -> style-dictionary -> theme.css
                    |
                    v
            src/theme/mui/createTheme.js  (reads palette from CSS vars)
                    |
                    v
            ThemeProvider (Storybook preview)
```

## Token Sources

- **theme.css**: Single source for MUI palette. CSS variables `--md-sys-color-*` for light (`:root`) and dark (`[data-theme="dark"]`). createTheme uses `var(--md-sys-color-*)` directly.

## createTheme Usage

```js
import { createTheme, lightTheme, darkTheme } from '../theme/mui/createTheme';

// Use pre-built themes (palette values resolve from theme.css via var(--md-sys-color-*))
<ThemeProvider theme={lightTheme}>

// Or create with mode (palette.mode differs; colors from data-theme)
const theme = createTheme('dark');
```

## Token Mapping

| MD3 Token | MUI Theme Path |
|-----------|----------------|
| primary, on-primary | palette.primary.main, contrastText |
| secondary, on-secondary | palette.secondary |
| error, on-error | palette.error |
| success, on-success | palette.success |
| background, on-background | palette.background, text.primary |
| surface, on-surface | palette.background.paper |
| outline, outline-variant | palette.divider, component overrides |

## Typography

Mapped from `typographyTokens` (tokenEngine):

- display-large -> h1
- display-medium -> h2
- body-large -> body1
- label-large -> button

## Shape

From `shapeTokens`:

- corner-extra-small: 4px
- corner-small: 8px
- corner-medium: 12px (default MUI borderRadius)
- corner-large: 16px
- corner-extra-large: 28px

## CSS Variables

Components can still use `var(--md-sys-color-*)` for custom styling. The `data-theme` attribute on `html` switches light/dark CSS variables. MUI ThemeProvider runs in parallel for MUI components.
