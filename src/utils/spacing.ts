import rawTokens from '../tokens/tokens.json'; // Adjust path if necessary

/**
 * Extracts and formats spacing tokens from the raw JSON dictionary.
 * Maps token names (e.g., '16') to their absolute values (e.g., '16px').
 */
const spacingNode = (rawTokens as any).seacrets['online/global'].spacing || {};

export const spacingTokens = Object.entries(spacingNode).reduce(
  (acc, [key, data]: [string, any]) => {
    // Extract the '$value' property from the token definition
    const val = data.$value;
    // Append 'px' so MUI can inject a valid CSS value
    acc[key] = typeof val === 'number' ? `${val}px` : val;
    return acc;
  },
  {} as Record<string, string>
);