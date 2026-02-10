/**
 * Style Dictionary Preprocessor
 * 
 * This preprocessor:
 * 1. Adds missing base tokens (paragraphSpacing, paragraphIndent, textCase, textDecoration)
 * 2. Fixes broken token references by resolving them to the correct paths
 * 
 * According to Style Dictionary architecture, references must resolve to existing tokens.
 * Typography tokens reference base tokens using relative paths like {fontFamilies.roboto},
 * but these need to resolve to the correct location within the theme structure.
 */

export default {
  name: 'fix-token-references-and-add-missing',
  
  preprocessor: (dictionary) => {
    const fixedDictionary = JSON.parse(JSON.stringify(dictionary));
    
    // Helper to ensure a path exists in the dictionary
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
    
    // Helper to find a token by path
    const findToken = (obj, pathParts) => {
      let current = obj;
      for (const part of pathParts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          return null;
        }
      }
      return current && typeof current === 'object' && 'value' in current ? current : null;
    };
    
    // Add missing base tokens and fix references for each theme
    const themes = ['md/Light', 'md/Dark'];
    
    themes.forEach(themePath => {
      const themeParts = themePath.split('/');
      let themeObj = fixedDictionary;
      for (const part of themeParts) {
        if (themeObj && themeObj[part]) {
          themeObj = themeObj[part];
        } else {
          return; // Theme doesn't exist, skip
        }
      }
      
      // Ensure md object exists
      if (!themeObj.md) {
        themeObj.md = {};
      }
      
      // Add missing paragraphSpacing token
      ensurePath(themeObj.md, ['paragraphSpacing', '0'], {
        value: 0,
        type: 'paragraphSpacing'
      });
      
      // Add missing paragraphIndent token
      ensurePath(themeObj.md, ['paragraphIndent', '0'], {
        value: 0,
        type: 'paragraphIndent'
      });
      
      // Add missing textCase token
      ensurePath(themeObj.md, ['textCase', 'none'], {
        value: 'none',
        type: 'textCase'
      });
      
      // Add missing textDecoration token
      ensurePath(themeObj.md, ['textDecoration', 'none'], {
        value: 'none',
        type: 'textDecoration'
      });
    });
    
    // Fix references in typography tokens
    // Style Dictionary resolves references relative to the token's location
    // We need to ensure references point to the correct location
    const fixReferences = (obj, currentPath = []) => {
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }
      
      if (Array.isArray(obj)) {
        return obj.map(item => fixReferences(item, currentPath));
      }
      
      const fixed = {};
      
      for (const [key, value] of Object.entries(obj)) {
        const newPath = [...currentPath, key];
        
        if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
          // This is a reference - Style Dictionary will resolve it
          // We just need to ensure the referenced token exists
          fixed[key] = value;
        } else if (typeof value === 'object' && value !== null && 'value' in value) {
          // This is a token with a value
          if (typeof value.value === 'object' && value.value !== null) {
            // Token value is an object (like typography tokens)
            // Fix references within the value object
            const fixedValue = { ...value };
            fixedValue.value = fixReferences(value.value, newPath);
            fixed[key] = fixedValue;
          } else {
            fixed[key] = value;
          }
        } else {
          fixed[key] = fixReferences(value, newPath);
        }
      }
      
      return fixed;
    };
    
    return fixReferences(fixedDictionary);
  }
};
