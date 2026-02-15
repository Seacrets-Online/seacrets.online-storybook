/**
 * Style Dictionary Preprocessor
 *
 * 1. Adds missing base tokens (paragraphSpacing, paragraphIndent, textCase, textDecoration)
 * 2. Resolves typography references explicitly so Style Dictionary does not report broken refs
 *
 * Typography tokens use references like {fontFamilies.roboto} which Style Dictionary
 * cannot resolve due to path structure. This preprocessor replaces them with
 * actual values before the build.
 */

const THEMES = ['md/Light', 'md/Dark'];
const TYPO_CATEGORIES = ['display', 'headline', 'body', 'label', 'title'];
const REF_PATTERN = /^\{([^}]+)\}$/;

const ensurePath = (obj, path, value) => {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  const lastKey = path[path.length - 1];
  if (!current[lastKey]) {
    current[lastKey] = value;
  }
};

const setPathTokenValue = (obj, path, value, type = 'color') => {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  const lastKey = path[path.length - 1];
  const existing = current[lastKey];
  if (existing && typeof existing === 'object') {
    current[lastKey] = {
      ...existing,
      value,
      type: existing.type ?? type,
    };
    return;
  }

  current[lastKey] = { value, type };
};

const getBaseTokens = (themeObj) => {
  if (!themeObj) return null;
  return {
    fontFamilies: themeObj.fontFamilies,
    fontWeights: themeObj.fontWeights,
    lineHeights: themeObj.lineHeights,
    fontSize: themeObj.fontSize,
    letterSpacing: themeObj.letterSpacing,
    paragraphSpacing: themeObj.paragraphSpacing,
    paragraphIndent: themeObj.paragraphIndent,
    textCase: themeObj.textCase,
    textDecoration: themeObj.textDecoration,
  };
};

const resolveRef = (ref, bases) => {
  const [category, key] = ref.split('.');
  const cat = bases[category];
  if (!cat || !cat[key]) return null;
  const token = cat[key];
  return token?.value ?? null;
};

const resolveTypographyValue = (val, bases) => {
  if (typeof val !== 'string') return val;
  const m = val.match(REF_PATTERN);
  if (!m) return val;
  const resolved = resolveRef(m[1], bases);
  return resolved !== null ? resolved : val;
};

const resolveTypographyToken = (tokenValue, bases) => {
  if (!tokenValue || typeof tokenValue !== 'object') return tokenValue;
  const resolved = {};
  for (const [k, v] of Object.entries(tokenValue)) {
    resolved[k] = resolveTypographyValue(v, bases);
  }
  return resolved;
};

const processThemeTypo = (themeObj, bases) => {
  const md = themeObj?.md;
  if (!md || !bases) return;

  for (const cat of TYPO_CATEGORIES) {
    const scale = md[cat];
    if (!scale || typeof scale !== 'object') continue;

    for (const [variant, token] of Object.entries(scale)) {
      if (token?.value && typeof token.value === 'object') {
        token.value = resolveTypographyToken(token.value, bases);
      }
    }
  }
};

export default {
  name: 'fix-token-references-and-add-missing',

  preprocessor: (dictionary) => {
    const fixed = JSON.parse(JSON.stringify(dictionary));

    for (const themeKey of THEMES) {
      const themeObj = fixed[themeKey];
      if (!themeObj) continue;

      if (!themeObj.md) themeObj.md = {};

      ensurePath(themeObj, ['paragraphSpacing', '0'], {
        value: 0,
        type: 'paragraphSpacing',
      });
      ensurePath(themeObj, ['paragraphIndent', '0'], {
        value: '0px',
        type: 'dimension',
      });
      ensurePath(themeObj, ['textCase', 'none'], {
        value: 'none',
        type: 'textCase',
      });
      ensurePath(themeObj, ['textDecoration', 'none'], {
        value: 'none',
        type: 'textDecoration',
      });

      if (themeKey === 'md/Dark') {
        // Keep Storybook dark canvas aligned with product dark background
        // without editing Figma-exported source tokens directly.
        setPathTokenValue(themeObj, ['md', 'sys', 'color', 'background'], '#151515');
      }

      const lightBases = getBaseTokens(fixed['md/Light']);
      const themeBases = getBaseTokens(themeObj) ?? lightBases;
      processThemeTypo(themeObj, themeBases);
    }

    return fixed;
  },
};
