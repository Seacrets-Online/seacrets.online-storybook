/**
 * MUI theme factory - maps MD3 tokens to MUI theme.
 * Palette uses CSS variables from theme.css (:root / [data-theme="dark"]).
 * Theme switching is done via data-theme attribute; vars resolve automatically.
 */
import './theme-augmentation';
import { createTheme as muiCreateTheme, responsiveFontSizes, type Theme } from '@mui/material';
import typographyTokens, { type TypographyStyle } from '../../utils/typography';
import { shapeTokens } from '../../utils/shapes';
import { spacingToMuiUnit } from '../../utils/spacing';
import { spacingTokens } from '../../utils/spacing';

const schemesVar = (name: string, suffix = '') => `var(--md-sys-color-${name}${suffix})`;

const getPaletteToken = (name: string) => {
  return schemesVar(name);
};

const mapTypographyToMui = () => {
  const t = typographyTokens;

  const normalizeTypographyStyle = (style: Partial<TypographyStyle>) => {
    const lineHeight = style.lineHeight ?? '';
    const normalizedLineHeight = (() => {
      if (!lineHeight || typeof lineHeight !== 'string' || !lineHeight.endsWith('px')) {
        return lineHeight;
      }
      if (!style.fontSize || typeof style.fontSize !== 'string') {
        return lineHeight;
      }
      const rawLineHeight = parseFloat(lineHeight);
      const rawFontSize = parseFloat(style.fontSize);
      if (!Number.isNaN(rawLineHeight) && !Number.isNaN(rawFontSize) && rawFontSize > 0) {
        return Number((rawLineHeight / rawFontSize).toFixed(4));
      }
      return lineHeight;
    })();

    return {
      ...style,
      ...(normalizedLineHeight !== undefined ? { lineHeight: normalizedLineHeight } : {}),
      ...(style.paragraphSpacing ? { marginBottom: style.paragraphSpacing } : {}),
      ...(style.paragraphIndent ? { textIndent: style.paragraphIndent } : {}),
      ...(style.textTransform ? { textTransform: style.textTransform } : {}),
    };
  };

  const toUnitless = (tokenName: string) => {
    const style = ((t as Record<string, TypographyStyle>)[tokenName] ?? {}) as Partial<TypographyStyle>;
    return normalizeTypographyStyle(style);
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
    overline: toUnitless('overline'),
    'display-large': toUnitless('display-large'),
    'display-medium': toUnitless('display-medium'),
    'display-small': toUnitless('display-small'),
    'headline-large': toUnitless('headline-large'),
    'headline-medium': toUnitless('headline-medium'),
    'headline-small': toUnitless('headline-small'),
    'title-large': toUnitless('title-large'),
    'title-medium': toUnitless('title-medium'),
    'title-small': toUnitless('title-small'),
    'body-large': toUnitless('body-large'),
    'body-medium': toUnitless('body-medium'),
    'body-small': toUnitless('body-small'),
    'label-large': toUnitless('label-large'),
    'label-medium': toUnitless('label-medium'),
    'label-small': toUnitless('label-small'),
    /** Page/screen title (headline-large) with standard bottom spacing. Use for auth titles, etc. */
    pageTitle: { ...toUnitless('headline-large'), marginBottom: `${spacingTokens['8']}px` },
    /** Page/screen subtitle (body-medium) with standard bottom spacing. Use below pageTitle. */
    pageSubtitle: { ...toUnitless('body-medium'), marginBottom: `${spacingTokens['24']}px` },
  };
};

const getPalette = () => ({
  primary: {
    main: getPaletteToken('primary'),
    contrastText: getPaletteToken('on-primary'),
  },
  primaryChannel: getPaletteToken('primary-channel'),
  secondary: {
    main: getPaletteToken('secondary'),
    contrastText: getPaletteToken('on-secondary'),
  },
  secondaryChannel: getPaletteToken('secondary-channel'),
  error: {
    main: getPaletteToken('error'),
    contrastText: getPaletteToken('on-error'),
  },
  errorChannel: getPaletteToken('error-channel'),
  success: {
    main: getPaletteToken('tertiary'),
    contrastText: getPaletteToken('on-tertiary'),
  },
  successChannel: getPaletteToken('tertiary-channel'),
  info: {
    main: getPaletteToken('primary'),
    contrastText: getPaletteToken('on-primary'),
  },
  infoChannel: getPaletteToken('primary-channel'),
  background: {
    default: getPaletteToken('background'),
    paper: getPaletteToken('surface'),
  },
  text: {
    primary: getPaletteToken('on-background'),
    secondary: getPaletteToken('on-surface'),
  },
  divider: getPaletteToken('outline-variant'),
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
      pageTitle: {
        marginBottom: (theme: { layout: { space8: number }; spacing: (n: number) => string }) =>
          theme.spacing(theme.layout.space8),
      },
      pageSubtitle: {
        marginBottom: (theme: { layout: { space24: number }; spacing: (n: number) => string }) =>
          theme.spacing(theme.layout.space24),
      },
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
        marginRight: (theme: { layout: { iconTextGap: number }; spacing: (n: number) => string }) =>
          theme.spacing(theme.layout.iconTextGap),
      },
      endIcon: {
        display: 'inherit',
        marginTop: -2,
        marginLeft: (theme: { layout: { iconTextGap: number }; spacing: (n: number) => string }) =>
          theme.spacing(theme.layout.iconTextGap),
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        padding: (theme: { layout: { iconButtonPadding: number }; spacing: (n: number) => string }) =>
          theme.spacing(theme.layout.iconButtonPadding),
      },
      sizeSmall: {
        padding: (theme: { layout: { space8: number }; spacing: (n: number) => string }) =>
          theme.spacing(theme.layout.space8 * 0.75),
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
        padding: (theme: { layout: { space12: number }; spacing: (n: number) => string }) =>
          theme.spacing(theme.layout.space12),
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
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: schemesVar('on-surface'),
        opacity: 0.7,
        '&.Mui-focused, &.MuiFormLabel-filled': {
          color: schemesVar('on-surface-variant'),
          opacity: 1,
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      input: {
        '&::placeholder': {
          color: schemesVar('on-surface'),
          opacity: 0.7,
        },
      },
    },
  },
  MuiDatePicker: {
    defaultProps: {
      slotProps: {
        textField: {
          variant: 'outlined' as const,
          fullWidth: true,
        },
        popper: {
          placement: 'bottom',
        },
        desktopPaper: {
          elevation: 0,
        },
      },
    },
  },
  MuiDateCalendar: {
    styleOverrides: {
      root: {
        padding: (theme: { layout: { space8: number }; spacing: (n: number) => string }) =>
          theme.spacing(theme.layout.space8),
        borderRadius: shapeTokens['corner-large'] ?? '16px',
        backgroundColor: schemesVar('surface-container-low'),
        '& .MuiDayCalendar-weekDayLabel': {
          color: schemesVar('on-surface-variant'),
          fontWeight: 500,
        },
      },
    },
  },
  MuiPickersCalendarHeader: {
    styleOverrides: {
      root: {
        marginTop: 0,
        marginBottom: (theme: { layout: { space4: number }; spacing: (n: number) => string }) =>
          theme.spacing(theme.layout.space4),
        paddingInline: (theme: { layout: { space4: number }; spacing: (n: number) => string }) =>
          theme.spacing(theme.layout.space4),
        '& .MuiPickersCalendarHeader-label': {
          color: schemesVar('on-surface'),
          fontWeight: 600,
        },
        '& .MuiPickersArrowSwitcher-button': {
          color: schemesVar('on-surface-variant'),
        },
      },
    },
  },
  MuiPickersDay: {
    styleOverrides: {
      root: {
        borderRadius: shapeTokens['corner-full'] ?? '9999px',
        border: '1px solid transparent',
        color: schemesVar('on-surface'),
        transition: 'background-color 120ms ease, border-color 120ms ease, color 120ms ease',
        '&:hover': {
          backgroundColor: 'var(--md-sys-state-layer-primary-opacity-08)',
        },
        '&.Mui-selected': {
          backgroundColor: schemesVar('primary'),
          color: schemesVar('on-primary'),
        },
        '&.Mui-selected:hover': {
          backgroundColor: schemesVar('primary'),
          backgroundImage:
            'linear-gradient(var(--md-sys-state-layer-on-primary-opacity-08), var(--md-sys-state-layer-on-primary-opacity-08))',
        },
        '&.MuiPickersDay-today': {
          borderColor: schemesVar('primary'),
        },
        '&.Mui-disabled': {
          color: schemesVar('on-surface-variant'),
          opacity: 0.38,
        },
      },
    },
  },
  MuiPickersPopper: {
    styleOverrides: {
      root: {
        '& .MuiPaper-root': {
          borderRadius: shapeTokens['corner-large'] ?? '16px',
          border: `1px solid ${schemesVar('outline-variant')}`,
          backgroundColor: schemesVar('surface-container-low'),
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
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
        height: (theme: { layout: { space8: number }; spacing: (n: number) => string }) =>
          theme.spacing(theme.layout.space8),
        borderRadius: (theme: { layout: { space4: number }; spacing: (n: number) => string }) =>
          theme.spacing(theme.layout.space4),
        backgroundColor: 'var(--md-sys-color-surface-container-highest)',
        overflow: 'hidden',
      },
      bar: {
        borderRadius: (theme: { layout: { space4: number }; spacing: (n: number) => string }) =>
          theme.spacing(theme.layout.space4),
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
 * space4..space64 derived from spacing.generated.ts (single source of truth).
 * Semantic layout values (contentBlockMt, iconTextGap, etc.) use MUI units.
 * MUI base = 8px → theme.spacing(layout.spaceN) gives N px.
 */
const layoutSpacing = {
  contentBlockMt: 2,
  titleToSubtitle: 1,
  subtitleToContent: 3,
  afterForm: 4,
  formFieldToButton: 3,
  space4: spacingToMuiUnit['4'] ?? 0.5,
  space8: spacingToMuiUnit['8'] ?? 1,
  space12: spacingToMuiUnit['12'] ?? 1.5,
  space16: spacingToMuiUnit['16'] ?? 2,
  space24: spacingToMuiUnit['24'] ?? 3,
  space32: spacingToMuiUnit['32'] ?? 4,
  space48: spacingToMuiUnit['48'] ?? 6,
  space64: spacingToMuiUnit['64'] ?? 8,
  iconTextGap: 1,
  iconButtonPadding: 1,
  iconSizeMedium: 24,
  iconSizeSmall: 20,
  iconSizeLarge: 28,
};

type ThemeMode = 'light' | 'dark';

export function createTheme(mode: ThemeMode = 'light'): Theme {
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
  } as unknown as Parameters<typeof muiCreateTheme>[0] & { layout: typeof layoutSpacing });

  return responsiveFontSizes(theme);
}

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');
