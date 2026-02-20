/**
 * MUI theme factory - maps MD3 tokens to MUI theme.
 * Palette uses CSS variables from theme.css (:root / [data-theme="dark"]).
 * Theme switching is done via data-theme attribute; vars resolve automatically.
 */
import './theme-augmentation';
import { createTheme as muiCreateTheme, responsiveFontSizes, type Theme } from '@mui/material';
import typographyTokens from '../../utils/typography';
import { shapeTokens } from '../../utils/shapes';

const schemesVar = (name: string) => `var(--md-sys-color-${name})`;

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

  const h4Style = toUnitless('headline-large');
  const body2Style = toUnitless('body-medium');
  return {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: toUnitless('display-large'),
    h2: toUnitless('display-medium'),
    h3: toUnitless('display-small'),
    h4: h4Style,
    h5: toUnitless('headline-medium'),
    h6: toUnitless('headline-small'),
    subtitle1: toUnitless('title-large'),
    subtitle2: toUnitless('title-medium'),
    body1: toUnitless('body-large'),
    body2: body2Style,
    button: toUnitless('label-large'),
    caption: toUnitless('label-medium'),
    overline: toUnitless('label-small'),
    /** Page/screen title (headline-large) with standard bottom spacing. Use for auth titles, etc. */
    pageTitle: { ...h4Style, marginBottom: 8 },
    /** Page/screen subtitle (body-medium) with standard bottom spacing. Use below pageTitle. */
    pageSubtitle: { ...body2Style, marginBottom: 24 },
  };
};

const getPalette = () => ({
  primary: {
    main: schemesVar('primary'),
    contrastText: schemesVar('on-primary'),
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
    main: schemesVar('primary'),
    contrastText: schemesVar('on-primary'),
  },
  background: {
    default: schemesVar('background'),
    paper: schemesVar('surface'),
  },
  text: {
    primary: schemesVar('on-background'),
    secondary: schemesVar('on-surface-variant'),
  },
  divider: schemesVar('outline-variant'),
});

const LAYOUT = {
  space8: 1,
  iconButtonPadding: 1,
  iconTextGap: 1,
  iconSizeMedium: 24,
  iconSizeSmall: 20,
  iconSizeLarge: 28,
} as const;

const buildComponentOverrides = () => ({
  MuiTypography: {
    styleOverrides: {
      root: {
        color: 'inherit',
      },
      pageTitle: { marginBottom: 8 },
      pageSubtitle: { marginBottom: 24 },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: shapeTokens['corner-medium'] ?? '12px',
        overflow: 'hidden',
        textTransform: 'none',
        backgroundImage: 'none',
        '&.MuiButton-text': {
          '--mui-spacing': '2px',
        },
        // MD3-ish state layers for button interactions.
        '&.MuiButton-containedPrimary:hover': {
          backgroundColor: schemesVar('primary'),
          backgroundImage:
            'linear-gradient(var(--md-sys-state-layer-on-primary-opacity-08), var(--md-sys-state-layer-on-primary-opacity-08))',
        },
        '&.MuiButton-containedPrimary:active': {
          backgroundColor: schemesVar('primary'),
          backgroundImage:
            'linear-gradient(var(--md-sys-state-layer-on-primary-opacity-10), var(--md-sys-state-layer-on-primary-opacity-10))',
        },
        '&.MuiButton-containedSecondary:hover': {
          backgroundColor: schemesVar('secondary'),
          backgroundImage:
            'linear-gradient(var(--md-sys-state-layer-on-secondary-opacity-08), var(--md-sys-state-layer-on-secondary-opacity-08))',
        },
        '&.MuiButton-containedSecondary:active': {
          backgroundColor: schemesVar('secondary'),
          backgroundImage:
            'linear-gradient(var(--md-sys-state-layer-on-secondary-opacity-10), var(--md-sys-state-layer-on-secondary-opacity-10))',
        },
        '&.MuiButton-containedError:hover': {
          backgroundColor: schemesVar('error'),
          backgroundImage:
            'linear-gradient(var(--md-sys-state-layer-on-error-opacity-08), var(--md-sys-state-layer-on-error-opacity-08))',
        },
        '&.MuiButton-containedError:active': {
          backgroundColor: schemesVar('error'),
          backgroundImage:
            'linear-gradient(var(--md-sys-state-layer-on-error-opacity-10), var(--md-sys-state-layer-on-error-opacity-10))',
        },
        '&.MuiButton-containedSuccess:hover': {
          backgroundColor: schemesVar('tertiary'),
          backgroundImage:
            'linear-gradient(var(--md-sys-state-layer-on-tertiary-opacity-08), var(--md-sys-state-layer-on-tertiary-opacity-08))',
        },
        '&.MuiButton-containedSuccess:active': {
          backgroundColor: schemesVar('tertiary'),
          backgroundImage:
            'linear-gradient(var(--md-sys-state-layer-on-tertiary-opacity-10), var(--md-sys-state-layer-on-tertiary-opacity-10))',
        },
        '&.MuiButton-textPrimary:hover, &.MuiButton-outlinedPrimary:hover': {
          backgroundColor: 'var(--md-sys-state-layer-primary-opacity-08)',
        },
        '&.MuiButton-textPrimary:active, &.MuiButton-outlinedPrimary:active': {
          backgroundColor: 'var(--md-sys-state-layer-primary-opacity-10)',
        },
        '&.MuiButton-textSecondary:hover, &.MuiButton-outlinedSecondary:hover': {
          backgroundColor: 'var(--md-sys-state-layer-secondary-opacity-08)',
        },
        '&.MuiButton-textSecondary:active, &.MuiButton-outlinedSecondary:active': {
          backgroundColor: 'var(--md-sys-state-layer-secondary-opacity-10)',
        },
        '&.MuiButton-textError:hover, &.MuiButton-outlinedError:hover': {
          backgroundColor: 'var(--md-sys-state-layer-error-opacity-08)',
        },
        '&.MuiButton-textError:active, &.MuiButton-outlinedError:active': {
          backgroundColor: 'var(--md-sys-state-layer-error-opacity-10)',
        },
        '&.MuiButton-textSuccess:hover, &.MuiButton-outlinedSuccess:hover': {
          backgroundColor: 'var(--md-sys-state-layer-tertiary-opacity-08)',
        },
        '&.MuiButton-textSuccess:active, &.MuiButton-outlinedSuccess:active': {
          backgroundColor: 'var(--md-sys-state-layer-tertiary-opacity-10)',
        },
      },
      startIcon: {
        display: 'inherit',
        marginTop: -2,
        marginRight: 8, // theme.layout.iconTextGap (8px)
      },
      endIcon: {
        display: 'inherit',
        marginTop: -2,
        marginLeft: 8,
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        padding: 8, // theme.layout.space8 / iconButtonPadding
      },
      sizeSmall: {
        padding: 6,
        '& .MuiSvgIcon-root': {
          fontSize: LAYOUT.iconSizeSmall,
        },
      },
      sizeMedium: {
        '& .MuiSvgIcon-root': {
          fontSize: LAYOUT.iconSizeMedium,
        },
      },
      sizeLarge: {
        padding: 10,
        '& .MuiSvgIcon-root': {
          fontSize: LAYOUT.iconSizeLarge,
        },
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        fontSize: LAYOUT.iconSizeMedium,
      },
      fontSizeSmall: {
        fontSize: LAYOUT.iconSizeSmall,
      },
      fontSizeMedium: {
        fontSize: LAYOUT.iconSizeMedium,
      },
      fontSizeLarge: {
        fontSize: LAYOUT.iconSizeLarge,
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
        backgroundColor: schemesVar('surface-container-low'),
        backgroundImage: 'none', // Disable MUI dark-mode overlay
        overflow: 'hidden', // Prevent children from overflowing rounded corners
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none', // Disable MUI dark-mode overlay
      },
    },
  },
  MuiAppBar: {
    defaultProps: {
      color: 'transparent' as const,
      elevation: 0,
    },
    styleOverrides: {
      root: {
        backgroundColor: schemesVar('surface'),
        color: schemesVar('on-surface'),
        backgroundImage: 'none',
        boxShadow: 'none',
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
        backgroundColor: 'var(--md-sys-color-error-container)',
        color: 'var(--md-sys-color-on-error-container)',
        '& .MuiAlert-icon': {
          color: 'var(--md-sys-color-on-error-container)',
        },
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        height: 8,
        borderRadius: 4,
        backgroundColor: 'var(--md-sys-color-surface-container-highest)',
        overflow: 'hidden',
      },
      bar: {
        borderRadius: 4,
        boxShadow: 'inset -1px 0 0 rgba(0,0,0,0.12)',
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: schemesVar('outline-variant'),
      },
    },
  },
});

/**
 * Layout and spacing from Figma Rules (node 4352-4174).
 * Level 1 Compact (related items): 4, 8
 * Level 2 Default (component padding, standard separation): 12, 16, 24
 * Level 3 Sectional (major breaks): 32, 48, 64
 * MUI base = 8px → theme.spacing(layout.spaceN) gives N px when using these units.
 */
const layoutSpacing = {
  contentBlockMt: 2,
  titleToSubtitle: 1,
  subtitleToContent: 3,
  afterForm: 4,
  formFieldToButton: 3,
  /** Level 1 Compact: related items. */
  space4: 0.5,
  space8: 1,
  /** Level 2 Default: component padding, standard separation. */
  space12: 1.5,
  space16: 2,
  space24: 3,
  /** Level 3 Sectional: major breaks. */
  space32: 4,
  space48: 6,
  space64: 8,
  iconTextGap: 1,
  iconButtonPadding: 1,
  iconSizeMedium: 24,
  iconSizeSmall: 20,
  iconSizeLarge: 28,
};

export function createTheme(mode: 'light' | 'dark' = 'light'): Theme {
  const theme = muiCreateTheme({
    cssVariables: { nativeColor: true },
    palette: {
      mode,
      ...getPalette(),
    },
    typography: mapTypographyToMui(),
    shape: {
      borderRadius: parseInt(shapeTokens['corner-medium'] ?? '12', 10) || 12,
    },
    components: buildComponentOverrides(),
    layout: layoutSpacing,
  } as Parameters<typeof muiCreateTheme>[0] & { layout: typeof layoutSpacing });

  return responsiveFontSizes(theme);
}

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');
