/**
 * MUI theme factory - maps MD3 tokens to MUI theme.
 * Palette reads from CSS variables in theme.css (:root / [data-theme="dark"]).
 * Single source of truth for typography, shape, and component overrides.
 */
import { createTheme as muiCreateTheme, responsiveFontSizes, type Theme } from '@mui/material/styles';
import typographyTokens from '../../utils/typography';
import { shapeTokens } from '../../utils/shapes';

const mapTypographyToMui = () => {
  const t = typographyTokens;
  
  const toUnitless = (tokenName: string) => {
    const style = t[tokenName] ?? {};
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
    main: mode === 'light' ? '#8d495a' : '#ffb1c1',
    contrastText: mode === 'light' ? '#ffffff' : '#551d2c',
  },
  error: {
    main: mode === 'light' ? '#904b40' : '#ffb4a8',
    contrastText: mode === 'light' ? '#ffffff' : '#561e16',
  },
  success: {
    main: '#146c2e',
    contrastText: '#ffffff',
  },
  info: {
    main: mode === 'light' ? '#b80044' : '#ffb2bb',
    contrastText: mode === 'light' ? '#ffffff' : '#670022',
  },
  background: {
    default: mode === 'light' ? '#fff8f7' : '#151515',
    paper: mode === 'light' ? '#f5fafb' : '#0e1415',
  },
  text: {
    primary: mode === 'light' ? '#291619' : '#efdee0',
    secondary: mode === 'light' ? '#5d3e42' : '#d6c2c4',
  },
  divider: mode === 'light' ? '#d6c2c4' : '#514346',
});

const buildComponentOverrides = () => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: shapeTokens['corner-medium'] ?? '12px',
        // display: 'inline-flex', // Default is inline-flex
        // alignItems: 'center', // Default
        // justifyContent: 'center', // Default
        // verticalAlign: 'middle', // Default
        // whiteSpace: 'nowrap', // Commented out to allow text wrapping if needed, though usually not desired for buttons
        // flexShrink: 0, // Removed to allow fullWidth to work properly in constrained containers
        overflow: 'hidden', // Ensure ripple/background respects border radius
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
        flexWrap: 'wrap', // Ensure actions wrap on small screens
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
