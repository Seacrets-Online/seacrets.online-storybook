import { getScale } from './tokenEngine';

// Here we build the object with all typography tokens
export const typographyTokens = {
  ...getScale('display'),
  ...getScale('headline'),
  ...getScale('title'),
  ...getScale('body'),
  ...getScale('label'),
};

export const getTypographyStyles = (tokenName) => {
  return typographyTokens[tokenName] || typographyTokens['body-medium'];
};

export default typographyTokens;