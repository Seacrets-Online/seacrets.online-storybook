/**
 * Preprocessor that expands relative token references to full paths.
 * Tokens Studio exports use short refs like {fontWeights.roboto-0} but Style Dictionary
 * needs full paths like {seacrets.online/Light.fontWeights.roboto-0} when tokens are
 * nested under theme sets.
 */
import type { PreprocessedTokens } from 'style-dictionary/types';
const expandRefsInValue = (value: unknown, setPrefix: string): unknown => {
  if (typeof value === 'string') {
    return value.replace(/\{([a-zA-Z0-9.-]+)\}/g, (_, ref) => {
      if (ref.startsWith('seacrets.') || ref.startsWith('$')) return `{${ref}}`;
      return `{${setPrefix}${ref}}`;
    });
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, expandRefsInValue(v, setPrefix)])
    );
  }
  return value;
};

function recurse(obj: Record<string, unknown>, parentPath: string[]): void {
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;

    const path = [...parentPath, key];

    if (val && typeof val === 'object' && !Array.isArray(val)) {
      const valObj = val as Record<string, unknown>;

      if ('$value' in valObj && '$type' in valObj) {
        const tokenType = (valObj.$type ?? valObj.type) as string;
        if (tokenType === 'typography' && valObj.$value) {
          const setKey = path[1];
          const setPrefix = setKey ? `seacrets.${setKey}.` : 'seacrets.online/Light.';
          valObj.$value = expandRefsInValue(valObj.$value, setPrefix);
        }
      } else {
        recurse(valObj, path);
      }
    }
  }
}

export const expandTokenReferences = (
  dictionary: PreprocessedTokens,
  _options?: unknown
): PreprocessedTokens => {
  const seacrets = (dictionary as Record<string, unknown>)?.seacrets;
  if (!seacrets || typeof seacrets !== 'object') return dictionary;

  recurse(seacrets as Record<string, unknown>, ['seacrets']);
  return dictionary;
};
