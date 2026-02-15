/**
 * MUI theme factory - maps MD3 tokens to MUI theme.
 * Palette reads from CSS variables in theme.css (:root / [data-theme="dark"]).
 * Single source of truth for typography, shape, and component overrides.
 */
import { createTheme as muiCreateTheme } from '@mui/material/styles';
import { typographyTokens } from '../../utils/typography.js';
import { shapeTokens } from '../../utils/shapes.js';

const mapTypographyToMui = () => {
  const t = typographyTokens;
  return {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: t['display-large'] || {},
    h2: t['display-medium'] || {},
    h3: t['display-small'] || {},
    h4: t['headline-large'] || {},
    h5: t['headline-medium'] || {},
    h6: t['headline-small'] || {},
    subtitle1: t['title-large'] || {},
    subtitle2: t['title-medium'] || {},
    body1: t['body-large'] || {},
    body2: t['body-medium'] || {},
    button: t['label-large'] || {},
    caption: t['label-medium'] || {},
    overline: t['label-small'] || {},
  };
};

const palette = {
  primary: {
    // Closest generated tone to the brand seed #FF0061.
    main: 'var(--md-ref-tertiary-tertiary-50)',
    contrastText: 'var(--md-ref-primary-primary-100)',
  },
  secondary: {
    main: 'var(--md-sys-color-secondary)',
    contrastText: 'var(--md-sys-color-on-secondary)',
  },
  error: {
    main: 'var(--md-sys-color-error)',
    contrastText: 'var(--md-sys-color-on-error)',
  },
  success: {
    main: 'var(--md-sys-color-success)',
    contrastText: 'var(--md-sys-color-on-success)',
  },
  background: {
    default: 'var(--md-sys-color-background)',
    paper: 'var(--md-sys-color-surface)',
  },
  text: {
    primary: 'var(--md-sys-color-on-background)',
    secondary: 'var(--md-sys-color-on-surface-variant)',
  },
  divider: 'var(--md-sys-color-outline-variant)',
};

const buildComponentOverrides = () => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: shapeTokens['corner-medium'],
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: shapeTokens['corner-large'],
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: shapeTokens['corner-small'],
      },
    },
  },
});

/**
 * Creates MUI theme from MD3 tokens.
 * Palette uses CSS variables from theme.css; light/dark resolved via data-theme.
 * @param {'light' | 'dark'} mode
 * @returns {import('@mui/material/styles').Theme}
 */
export function createTheme(mode = 'light') {
  return muiCreateTheme({
    cssVariables: { nativeColor: true },
    palette: {
      mode,
      ...palette,
    },
    typography: mapTypographyToMui(),
    shape: {
      borderRadius: parseInt(shapeTokens['corner-medium'], 10) || 12,
    },
    components: buildComponentOverrides(),
  });
}

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');
