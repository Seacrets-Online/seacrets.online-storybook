/**
 * MUI theme factory - maps MD3 tokens to MUI theme.
 * Palette reads from CSS variables in theme.css (:root / [data-theme="dark"]).
 * Single source of truth for typography, shape, and component overrides.
 */
import { createTheme as muiCreateTheme, responsiveFontSizes, type Theme } from '@mui/material';
import typographyTokens from '../../utils/typography';
import { shapeTokens } from '../../utils/shapes';

const mapTypographyToMui = () => {
  const t = typographyTokens;
  
  const toUnitless = (tokenName: string) => {
    const style = (t[tokenName] ?? {}) as Partial<{ fontSize: string; lineHeight: string }>;
    // Convert px line-height to unitless for MUI responsiveFontSizes compatibility
    if (style.fontSize && style.lineHeight && typeof style.lineHeight === 'string' && style.lineHeight.endsWith('px')) {
       const fs = parseFloat(style.fontSize);
       const lh = parseFloat(style.lineHeight);
       if (!isNaN(fs) && !isNaN(lh) && fs > 0) {
         return { ...style, lineHeight: Number((lh / fs).toFixed(4)) };
       }
    }
    return style;
  };

  return {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: toUnitless('display-large'),
    h2: toUnitless('display-medium'),
    h3: toUnitless('display-small'),
    h4: toUnitless('headline-large'),
    h5: toUnitless('headline-medium'),
    h6: toUnitless('headline-small'),
    subtitle1: toUnitless('title-large'),
    subtitle2: toUnitless('title-medium'),
    body1: toUnitless('body-large'),
    body2: toUnitless('body-medium'),
    button: toUnitless('label-large'),
    caption: toUnitless('label-medium'),
    overline: toUnitless('label-small'),
  };
};

const getPalette = (_mode: 'light' | 'dark') => ({
  primary: {
    main: '#ff0061',
    contrastText: '#ffffff',
  },
  secondary: {
    main: 'var(--md-sys-color-secondary)',
    light: 'var(--md-sys-color-secondary)',
    dark: 'var(--md-sys-color-secondary)',
    contrastText: 'var(--md-sys-color-on-secondary)',
  },
  error: {
    main: 'var(--md-sys-color-error)',
    light: 'var(--md-sys-color-error)',
    dark: 'var(--md-sys-color-error)',
    contrastText: 'var(--md-sys-color-on-error)',
  },
  success: {
    main: 'var(--md-sys-color-success)',
    light: 'var(--md-sys-color-success)',
    dark: 'var(--md-sys-color-success)',
    contrastText: 'var(--md-sys-color-on-success)',
  },
  info: {
    main: '#ff0061',
    light: 'var(--md-extended-colors-custom-color-1-container)',
    dark: 'var(--md-extended-colors-custom-color-1)',
    contrastText: '#ffffff',
  },
  background: {
    default: '#151515',
    paper: 'var(--md-sys-color-surface)',
  },
  text: {
    primary: 'var(--md-sys-color-on-background)',
    secondary: 'var(--md-sys-color-on-surface-variant)',
  },
  divider: 'var(--md-sys-color-outline-variant)',
});

const buildComponentOverrides = () => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: shapeTokens['corner-medium'] ?? '12px',
        overflow: 'hidden',
        '&.MuiButton-text': {
          '--mui-spacing': '2px',
        },
      },
      startIcon: {
        display: 'inherit',
        marginTop: -2, // Fine-tune vertical alignment if needed
      },
      endIcon: {
        display: 'inherit',
        marginTop: -2, // Fine-tune vertical alignment if needed
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined' as const,
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: shapeTokens['corner-large'] ?? '16px',
        overflow: 'hidden', // Prevent children from overflowing rounded corners
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: shapeTokens['corner-small'] ?? '8px',
      },
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        flexWrap: 'wrap' as const, // Ensure actions wrap on small screens
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      standardError: {
        backgroundColor: 'var(--md-palettes-error-30)',
        color: 'var(--md-ref-error-error-90)',
        '& .MuiAlert-icon': {
          color: 'var(--md-ref-error-error-90)',
        },
      },
    },
  },
  // Linear progress: 8dp height, 4dp radius (pill). Track + bar rounded per reference.
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        height: 8,
        borderRadius: 4,
        backgroundColor: 'var(--md-schemes-surface-container-highest)',
        overflow: 'hidden',
      },
      bar: {
        borderRadius: 4,
        boxShadow: 'inset -1px 0 0 rgba(0,0,0,0.12)',
      },
    },
  },
});

export function createTheme(mode: 'light' | 'dark' = 'light'): Theme {
  const theme = muiCreateTheme({
    cssVariables: { nativeColor: true },
    palette: {
      mode,
      ...getPalette(mode),
    },
    typography: mapTypographyToMui(),
    shape: {
      borderRadius: parseInt(shapeTokens['corner-medium'] ?? '12', 10) || 12,
    },
    components: buildComponentOverrides(),
  });

  return responsiveFontSizes(theme);
}

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');
