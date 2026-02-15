import * as baseTokens from '../style-dictionary-dist/variables.js';

const fontWeightsMap = {
  'Regular': 400,
  'Medium': 500,
  'SemiBold': 600,
};

const typographyTokens = {
  'headline-large': {
    fontFamily: 'Roboto',
    fontWeight: fontWeightsMap['Regular'],
    fontSize: '28px',
    lineHeight: '36px',
    letterSpacing: '0px',
  },
  'body-large': {
    fontFamily: 'Roboto',
    fontWeight: fontWeightsMap['Regular'],
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
  },
  'body-medium': {
    fontFamily: 'Roboto',
    fontWeight: fontWeightsMap['Regular'],
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
  },
  'body-small': {
    fontFamily: 'Roboto',
    fontWeight: fontWeightsMap['Regular'],
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.4px',
  },
  'label-large': {
    fontFamily: 'Roboto',
    fontWeight: fontWeightsMap['Medium'],
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.1px',
  },
  'title-medium': {
    fontFamily: 'Roboto',
    fontWeight: fontWeightsMap['Medium'],
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.15px',
  },
};

export const getTypographyStyles = (tokenName) => {
  return typographyTokens[tokenName] || {};
};

export default typographyTokens;
