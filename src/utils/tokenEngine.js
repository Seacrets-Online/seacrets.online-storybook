import rawTokens from '../../src/tokens/tokens.json';

/**
 * Token Engine for Material Design 3
 * Resolves internal Figma Token references dynamically.
 */

// CORRECTION: Base scales live within 'md/Light' in the JSON, not at the root level.
const BASE = rawTokens['md/Light'];

const REF_MAP = {
  fontFamilies: BASE.fontFamilies,
  fontWeights: BASE.fontWeights,
  lineHeights: BASE.lineHeights,
  fontSize: BASE.fontSize,
  letterSpacing: BASE.letterSpacing,
};

/**
 * Clean the value and look for the actual reference in the JSON. 
 */
const resolveValue = (val) => {
  if (typeof val !== 'string') return val;
  
  if (val.startsWith('{') && val.endsWith('}')) {
    const cleanRef = val.slice(1, -1);
    const [category, key] = cleanRef.split('.'); // Separate "fontFamilies" from "roboto"
    
    if (REF_MAP[category] && REF_MAP[category][key]) {
        let found = REF_MAP[category][key].value;
        
        // CSS requires the font weight to be a number (400, 500),
        // but the JSON saves it as "Regular" or "Medium". We translate:
        if (category === 'fontWeights') {
            if (found === 'Regular') return 400;
            if (found === 'Medium') return 500;
            if (found === 'SemiBold') return 600;
            if (found === 'Bold') return 700;
        }
        
        // Recursive call in case the value points to another reference 
        return resolveValue(found); 
    }
  }
  return val;
};

/**
 * Extract a full scale of typography
 */
export const getScale = (category) => {
  const scaleRaw = BASE.md[category];
  const processed = {};

  Object.keys(scaleRaw).forEach(variant => {
    const tokenObj = scaleRaw[variant].value;
    processed[`${category}-${variant}`] = {
      fontFamily: resolveValue(tokenObj.fontFamily),
      fontWeight: resolveValue(tokenObj.fontWeight),
      fontSize: `${resolveValue(tokenObj.fontSize)}px`,
      lineHeight: `${resolveValue(tokenObj.lineHeight)}px`,
      letterSpacing: `${resolveValue(tokenObj.letterSpacing)}px`,
    };
  });

  return processed;
};

/**
 * Extract the spacing scale
 */
export const getSpacing = () => {
  const spacingRaw = rawTokens['Primitives/Mode 1'].md.sys.spacing;
  const processed = {};
  
  Object.keys(spacingRaw).forEach(key => {
    processed[key] = `${spacingRaw[key].value}px`;
  });
  
  return processed;
};