import rawTokens from '../tokens/tokens.json';

export type TypographyTokenName =
  | 'display-large'
  | 'display-medium'
  | 'display-small'
  | 'headline-large'
  | 'headline-medium'
  | 'headline-small'
  | 'title-large'
  | 'title-medium'
  | 'title-small'
  | 'body-large'
  | 'body-medium'
  | 'body-small'
  | 'label-large'
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

const tokensBase = (rawTokens as Record<string, any>).seacrets['online/Light'];
const mdTokens = tokensBase.md;

const resolveReference = (ref: string | number): string | number => {
  if (typeof ref !== 'string' || !(ref.startsWith('{') && ref.endsWith('}'))) {
    return ref;
  }
  
  const cleanRef = ref.slice(1, -1);
  const [category, key] = cleanRef.split('.');
  
  if (!category || !key) {
    return ref;
  }
  
  const categoryGroup = (tokensBase as Record<string, any>)[category];
  
  if (categoryGroup && categoryGroup[key]) {
    return categoryGroup[key].$value ?? categoryGroup[key].value;
  }
  
  return ref;
};

const mapFontWeight = (weightStr: string | number): number => {
  const w = String(weightStr).toLowerCase();
  if (w.includes('medium')) return 500;
  if (w.includes('semibold')) return 600;
  if (w.includes('bold')) return 700;
  return 400;
};

const buildTypographyTokens = (): Record<string, TypographyStyle> => {
  const generatedTokens: Record<string, TypographyStyle> = {};
  const scales = ['display', 'headline', 'title', 'body', 'label'];

  scales.forEach((scale) => {
    if (!mdTokens[scale]) return;

    Object.keys(mdTokens[scale]).forEach((size) => {
      if (size.includes('emphasized')) return;

      const tokenData = mdTokens[scale][size].$value;
      if (!tokenData) return;

      const fontFamily = resolveReference(tokenData.fontFamily);
      const fontWeightRaw = resolveReference(tokenData.fontWeight);
      const fontSize = resolveReference(tokenData.fontSize);
      const lineHeight = resolveReference(tokenData.lineHeight);
      const letterSpacing = resolveReference(tokenData.letterSpacing);

      generatedTokens[`${scale}-${size}`] = {
        fontFamily: `"${fontFamily}", "Helvetica", "Arial", sans-serif`,
        fontWeight: mapFontWeight(fontWeightRaw),
        fontSize: `${fontSize}px`,
        lineHeight: `${lineHeight}px`,
        letterSpacing: `${letterSpacing}px`,
      };
    });
  });

  if (generatedTokens['label-small']) {
    generatedTokens['overline'] = generatedTokens['label-small'];
  }

  return generatedTokens;
};

const typographyTokens = buildTypographyTokens();

export const getTypographyStyles = (tokenName: TypographyTokenName | string): Partial<TypographyStyle> =>
  typographyTokens[tokenName] ?? {};

export default typographyTokens;