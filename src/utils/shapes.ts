export const shapeTokens: Record<string, string> = {
  'corner-extra-small': '4px',
  'corner-small': '8px',
  'corner-medium': '12px',
  'corner-large': '16px',
  'corner-extra-large': '28px',
  'corner-full': '9999px',
};

export const getShapeToken = (tokenName: string): string =>
  shapeTokens[tokenName] ?? '0px';

export default shapeTokens;
