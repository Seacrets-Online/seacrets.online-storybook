export type TypographyTokenName =
  | 'headline-large'
  | 'body-large'
  | 'body-medium'
  | 'body-small'
  | 'label-large'
  | 'title-medium'
  | 'display-large'
  | 'display-medium'
  | 'display-small'
  | 'headline-medium'
  | 'headline-small'
  | 'title-large'
  | 'body-large'
  | 'label-medium'
  | 'label-small'
  | 'overline';

export interface TypographyStyle {
  fontFamily: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
}

const fontWeightsMap: Record<string, number> = {
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
};

const typographyTokens: Record<string, TypographyStyle> = {
  'headline-large': {
    fontFamily: 'Roboto',
    fontWeight: fontWeightsMap['Regular'] ?? 400,
    fontSize: '28px',
    lineHeight: '36px',
    letterSpacing: '0px',
  },
  'body-large': {
    fontFamily: 'Roboto',
    fontWeight: fontWeightsMap['Regular'] ?? 400,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
  },
  'body-medium': {
    fontFamily: 'Roboto',
    fontWeight: fontWeightsMap['Regular'] ?? 400,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
  },
  'body-small': {
    fontFamily: 'Roboto',
    fontWeight: fontWeightsMap['Regular'] ?? 400,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.4px',
  },
  'label-large': {
    fontFamily: 'Roboto',
    fontWeight: fontWeightsMap['Medium'] ?? 500,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.1px',
  },
  'title-medium': {
    fontFamily: 'Roboto',
    fontWeight: fontWeightsMap['Medium'] ?? 500,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.15px',
  },
};

export const getTypographyStyles = (tokenName: string): Partial<TypographyStyle> =>
  typographyTokens[tokenName] ?? {};

export default typographyTokens;
