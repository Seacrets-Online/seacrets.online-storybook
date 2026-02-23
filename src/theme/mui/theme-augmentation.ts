/**
 * Theme augmentation: ensures layout and custom typography variants are typed.
 * Imported from createTheme so it is in scope wherever the theme is used.
 */
import type {} from '@mui/material/styles';
import type {} from '@mui/material/Typography';
import type {} from '@mui/x-date-pickers/themeAugmentation';

declare module '@mui/material/styles' {
  interface Theme {
    primaryChannel?: string;
    secondaryChannel?: string;
    errorChannel?: string;
    infoChannel?: string;
    successChannel?: string;
    warningChannel?: string;
    dividerChannel?: string;
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
    primaryChannel?: string;
    secondaryChannel?: string;
    errorChannel?: string;
    infoChannel?: string;
    successChannel?: string;
    warningChannel?: string;
    dividerChannel?: string;
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
    'display-large': React.CSSProperties;
    'display-medium': React.CSSProperties;
    'display-small': React.CSSProperties;
    'headline-large': React.CSSProperties;
    'headline-medium': React.CSSProperties;
    'headline-small': React.CSSProperties;
    'title-large': React.CSSProperties;
    'title-medium': React.CSSProperties;
    'title-small': React.CSSProperties;
    'body-large': React.CSSProperties;
    'body-medium': React.CSSProperties;
    'body-small': React.CSSProperties;
    'label-large': React.CSSProperties;
    'label-medium': React.CSSProperties;
    'label-small': React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    pageTitle?: React.CSSProperties;
    pageSubtitle?: React.CSSProperties;
    'display-large'?: React.CSSProperties;
    'display-medium'?: React.CSSProperties;
    'display-small'?: React.CSSProperties;
    'headline-large'?: React.CSSProperties;
    'headline-medium'?: React.CSSProperties;
    'headline-small'?: React.CSSProperties;
    'title-large'?: React.CSSProperties;
    'title-medium'?: React.CSSProperties;
    'title-small'?: React.CSSProperties;
    'body-large'?: React.CSSProperties;
    'body-medium'?: React.CSSProperties;
    'body-small'?: React.CSSProperties;
    'label-large'?: React.CSSProperties;
    'label-medium'?: React.CSSProperties;
    'label-small'?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    pageTitle: true;
    pageSubtitle: true;
    'display-large': true;
    'display-medium': true;
    'display-small': true;
    'headline-large': true;
    'headline-medium': true;
    'headline-small': true;
    'title-large': true;
    'title-medium': true;
    'title-small': true;
    'body-large': true;
    'body-medium': true;
    'body-small': true;
    'label-large': true;
    'label-medium': true;
    'label-small': true;
  }
}
