export const shapeTokens = {
  'corner-extra-small': '4px',
  'corner-small': '8px',
  'corner-medium': '12px',
  'corner-large': '16px',
  'corner-extra-large': '28px',
};

export const getShapeToken = (tokenName) => {
  return shapeTokens[tokenName] || '0px';
};

export default shapeTokens;
