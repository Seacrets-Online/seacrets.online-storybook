import { getSpacing } from './tokenEngine';

// We generate the tokens dynamically from the JSON 
export const spacingTokens = getSpacing();

// We add a default token for '0' to ensure it always exists
spacingTokens['0'] = '0px';

export const getSpacingToken = (tokenName) => {
  return spacingTokens[tokenName] || '0px';
};

export default spacingTokens;