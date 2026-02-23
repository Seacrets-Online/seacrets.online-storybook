/**
 * Typography tokens adapter - re-exports Style Dictionary generated tokens.
 * Source: src/utils/typography.generated.ts (built by npm run build-dictionary)
 */
import typographyTokens, {
  type TypographyStyle,
  type TypographyTokenName,
} from './typography.generated';

export type { TypographyStyle, TypographyTokenName };

export const getTypographyStyles = (tokenName: TypographyTokenName | string): Partial<TypographyStyle> =>
  typographyTokens[tokenName as TypographyTokenName] ?? {};

export default typographyTokens;
