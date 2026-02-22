/**
 * Theme augmentation: ensures layout and custom typography variants are typed.
 * Imported from createTheme so it is in scope wherever the theme is used.
 */
import type {} from '@mui/material/styles';
import type {} from '@mui/material/Typography';

declare module '@mui/material/styles' {
  interface Theme {
    layout: {
      contentBlockMt: number;
      titleToSubtitle: number;
      subtitleToContent: number;
      afterForm: number;
      formFieldToButton: number;
      /** Level 1 Compact (4, 8). Level 2 Default (12, 16, 24). Level 3 Sectional (32, 48, 64). MUI units. */
      space4: number;
      space8: number;
      space12: number;
      space16: number;
      space24: number;
      space32: number;
      space48: number;
      space64: number;
      iconTextGap: number;
      iconButtonPadding: number;
      iconSizeMedium: number;
      iconSizeSmall: number;
      iconSizeLarge: number;
    };
  }
  interface ThemeOptions {
    layout?: {
      contentBlockMt?: number;
      titleToSubtitle?: number;
      subtitleToContent?: number;
      afterForm?: number;
      formFieldToButton?: number;
      space4?: number;
      space8?: number;
      space12?: number;
      space16?: number;
      space24?: number;
      space32?: number;
      space48?: number;
      space64?: number;
      iconTextGap?: number;
      iconButtonPadding?: number;
      iconSizeMedium?: number;
      iconSizeSmall?: number;
      iconSizeLarge?: number;
    };
  }
  interface TypographyVariants {
    pageTitle: React.CSSProperties;
    pageSubtitle: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    pageTitle?: React.CSSProperties;
    pageSubtitle?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    pageTitle: true;
    pageSubtitle: true;
  }
}
