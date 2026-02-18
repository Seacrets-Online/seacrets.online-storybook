/**
 * MUI theme factory - maps MD3 tokens to MUI theme.
 * Palette uses CSS variables from theme.css (:root / [data-theme="dark"]).
 * Theme switching is done via data-theme attribute; vars resolve automatically.
 */
import { createTheme as muiCreateTheme, responsiveFontSizes, type Theme } from '@mui/material';
import typographyTokens from '../../utils/typography';
import { shapeTokens } from '../../utils/shapes';

const schemesVar = (name: string) => `var(--seacrets-online-schemes-${name})`;

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

const getPalette = (mode: 'light' | 'dark') => ({
  primary: {
    main: '#ff0061',
    contrastText: '#ffffff',
  },
  secondary: {
    main: schemesVar('secondary'),
    contrastText: schemesVar('on-secondary'),
  },
  error: {
    main: schemesVar('error'),
    contrastText: schemesVar('on-error'),
  },
  success: {
    main: schemesVar('tertiary'),
    contrastText: schemesVar('on-tertiary'),
  },
  info: {
    main: '#ff0061',
    contrastText: '#ffffff',
  },
  background: {
    default: mode === 'dark' ? '#151515' : schemesVar('background'),
    paper: mode === 'dark' ? '#0e1415' : schemesVar('surface'),
  },
  text: {
    primary: schemesVar('on-background'),
    secondary: schemesVar('on-surface-variant'),
  },
  divider: schemesVar('outline-variant'),
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
        backgroundColor: 'var(--seacrets-online-schemes-error-container)',
        color: 'var(--seacrets-online-schemes-on-error-container)',
        '& .MuiAlert-icon': {
          color: 'var(--seacrets-online-schemes-on-error-container)',
        },
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        height: 8,
        borderRadius: 4,
        backgroundColor: 'var(--seacrets-online-schemes-surface-container-highest)',
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
