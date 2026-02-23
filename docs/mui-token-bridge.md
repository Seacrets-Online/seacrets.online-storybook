# MUI Token Bridge

Guide for consuming MD3 design tokens in MUI components.

## Architecture

```
tokens.json -> style-dictionary -> src/style-dictionary-dist/theme.css
                                |
                                v
                         src/styles/index.css
                                |
                                v
                      .storybook/preview.ts
                (sets data-theme + ThemeProvider)
                                |
                                v
                   src/theme/mui/createTheme.ts
```

## Token Sources

- **theme.css**: Generated CSS variables for Material Design 3 tokens (canonical `--md-*` naming).
  - Light: `:root`
  - Dark: `[data-theme="dark"]`
- **TypeScript utilities (current)**:
  - Typography: `src/utils/typography.ts`
  - Shape: `src/utils/shapes.ts`

Note: today, Style Dictionary exports CSS variables for **color tokens** only.

## createTheme Usage

```tsx
import { ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '../src/theme/mui/createTheme';

export const App = () => (
  <ThemeProvider theme={lightTheme}>
    {/* ... */}
  </ThemeProvider>
);
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

Mapped from `src/utils/typography.ts` into MUI variants inside `src/theme/mui/createTheme.ts`:

- display-large -> h1
- display-medium -> h2
- body-large -> body1
- label-large -> button

## Shape

From `src/utils/shapes.ts` (`shapeTokens`), used for MUI `shape.borderRadius` and component overrides:

- corner-extra-small: 4px
- corner-small: 8px
- corner-medium: 12px (default MUI borderRadius)
- corner-large: 16px
- corner-extra-large: 28px

## CSS Variables

Components can use `var(--md-sys-color-*)` (and related groups like `--md-sys-state-layer-*`) for custom styling when needed.

Theme switching:

- `theme.css` switches light/dark variables based on the `data-theme` attribute.
- Storybook sets `data-theme` in `.storybook/preview.ts`.
- MUI ThemeProvider uses the mapped theme from `createTheme.ts` and runs in parallel with CSS variables.

Storybook foundation page:

- `src/stories/foundations/ThemeUsage.stories.tsx` (`Foundations/Theme usage`) demonstrates the full theme path and includes practical examples.
