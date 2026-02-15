/**
 * Custom Style Dictionary Transforms for Material Design 3 Compliance
 * 
 * These transforms ensure tokens follow MD3 naming convention:
 * - Remove 'token-' prefix
 * - Remove theme (Light/Dark) from token names
 * - Remove duplicate 'md' from path
 * - Generate same name for both themes
 */

import StyleDictionary from 'style-dictionary';

/**
 * Helper function to filter path: removes theme and duplicate 'md'
 * Handles both array paths and string paths with '/'
 * Also handles cases where path elements contain '/' like 'md/Light'
 */
function filterMd3Path(path) {
  // Convert to array if it's a string
  let pathArray = path;
  if (typeof path === 'string') {
    pathArray = path.split('/').filter(p => p.length > 0);
  }
  if (!Array.isArray(pathArray)) {
    return [];
  }
  
  // First, expand any path elements that contain '/' (like 'md/Light')
  const expandedPath = [];
  for (const part of pathArray) {
    if (typeof part === 'string' && part.includes('/')) {
      expandedPath.push(...part.split('/').filter(p => p.length > 0));
    } else {
      expandedPath.push(part);
    }
  }
  
  const filteredPath = [];
  
  for (let i = 0; i < expandedPath.length; i++) {
    const current = expandedPath[i];
    
    // Skip 'Light' or 'Dark' themes
    if (current === 'Light' || current === 'Dark') {
      continue;
    }
    
    // Skip duplicate 'md' - if the last element added was 'md' and current is also 'md', skip it
    if (current === 'md' && filteredPath.length > 0 && filteredPath[filteredPath.length - 1] === 'md') {
      continue;
    }
    
    filteredPath.push(current);
  }
  
  return filteredPath;
}

/**
 * Transform name: removes duplicate 'md' from path; includes theme for uniqueness.
 * Avoids token name collisions when Light/Dark share the same semantic path.
 * Format (css/variables-theme) builds CSS var names from path, not from this name.
 */
StyleDictionary.registerTransform({
  name: 'name/md3/scss',
  type: 'name',
  transform: (token) => {
    let path = token.path;
    if (!Array.isArray(path)) {
      if (token.originalPath) {
        path = token.originalPath.split('/').filter(p => p.length > 0);
      } else if (typeof path === 'string') {
        path = path.split('/').filter(p => p.length > 0);
      } else {
        path = [];
      }
    }

    const pathArr = Array.isArray(path) ? path : String(path).split('/');
    const flat = pathArr.flatMap((p) =>
      typeof p === 'string' && p.includes('/') ? p.split('/').filter(Boolean) : [p]
    );
    const theme = flat.includes('Light') ? 'light' : flat.includes('Dark') ? 'dark' : null;
    const filteredPath = filterMd3Path(path);
    const baseName = filteredPath.join('-').toLowerCase();
    const result = theme ? `${baseName}-${theme}` : baseName;

    return result.replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  }
});

/**
 * Transform name: removes theme and duplicate 'md' for JavaScript
 * Converts to camelCase: mdSysColorPrimary
 */
StyleDictionary.registerTransform({
  name: 'name/md3/js',
  type: 'name',
  transform: (token) => {
    // Style Dictionary's attribute/cti transform sets token.path as an array
    let path = token.path;
    
    // If path is not an array, try to get it from other sources
    if (!Array.isArray(path)) {
      if (token.originalPath) {
        path = token.originalPath.split('/').filter(p => p.length > 0);
      } else if (typeof path === 'string') {
        path = path.split('/').filter(p => p.length > 0);
      } else {
        path = [];
      }
    }
    
    // Filter out theme and duplicate md
    const filteredPath = filterMd3Path(path);
    
    // Convert to camelCase (first letter lowercase, rest capitalize)
    const camelCase = filteredPath
      .map((part, index) => {
        // Clean part: remove special characters and convert to valid identifier
        const cleanPart = part.replace(/[^a-zA-Z0-9]/g, '');
        if (!cleanPart) return '';
        
        const lowerPart = cleanPart.toLowerCase();
        if (index === 0) {
          return lowerPart;
        }
        // Capitalize first letter
        return lowerPart.charAt(0).toUpperCase() + lowerPart.slice(1);
      })
      .filter(p => p.length > 0)
      .join('');
    
    return camelCase || 'token';
  }
});
