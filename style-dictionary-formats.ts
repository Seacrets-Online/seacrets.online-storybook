import StyleDictionary from 'style-dictionary';

type PathInput = string | string[] | undefined;

const normalizePathParts = (path: PathInput): string[] => {
  if (!path) return [];
  const parts = Array.isArray(path) ? path : String(path).split('/');
  const expanded: string[] = [];
  parts.forEach((part) => {
    if (typeof part === 'string' && part.includes('/')) {
      expanded.push(...part.split('/').filter(Boolean));
    } else if (part !== undefined && part !== null) {
      expanded.push(String(part));
    }
  });
  return expanded.filter(Boolean);
};

const getThemeFromPath = (pathParts: PathInput): 'light' | 'dark' | null => {
  const parts = normalizePathParts(pathParts);
  if (parts.includes('Light')) return 'light';
  if (parts.includes('Dark')) return 'dark';
  return null;
};

const filterMd3Path = (pathParts: PathInput): string[] => {
  const parts = normalizePathParts(pathParts);
  const filtered: string[] = [];
  for (const part of parts) {
    if (part === 'Light' || part === 'Dark') continue;
    if (part === 'md' && filtered[filtered.length - 1] === 'md') continue;
    filtered.push(part);
  }
  return filtered;
};

const toCssVarName = (pathParts: PathInput): string => {
  const filtered = filterMd3Path(pathParts);
  const name = filtered.join('-').toLowerCase();
  const cleaned = name
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `--${cleaned}`;
};

const hexToRgb = (hex: string): string | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
    : null;
};

StyleDictionary.registerFormat({
  name: 'css/variables-theme',
  format: ({
    dictionary,
  }: {
    dictionary: {
      allTokens: Array<{
        $type?: string;
        type?: string;
        path?: PathInput;
        originalPath?: PathInput;
        $value?: string;
        value?: string;
      }>;
    };
  }) => {
    const lightVars = new Map<string, string>();
    const darkVars = new Map<string, string>();

    dictionary.allTokens.forEach((token) => {
      const tokenType = token.$type ?? token.type;
      if (tokenType !== 'color') return;
      
      // Determine theme from path
      let theme: 'light' | 'dark' | null = null;
      const parts = normalizePathParts(token.path ?? token.originalPath);
      
      // Check for 'Light' or 'Dark' in path parts
      if (parts.some(p => p.toLowerCase() === 'light')) theme = 'light';
      else if (parts.some(p => p.toLowerCase() === 'dark')) theme = 'dark';
      
      // If no theme found, skip (or maybe default to light? but let's be safe)
      if (!theme) return;

      const varName = toCssVarName(token.path ?? token.originalPath);
      const value = (token.$value ?? token.value) ?? '';

      if (theme === 'light') {
        lightVars.set(varName, value);
      } else if (theme === 'dark') {
        darkVars.set(varName, value);
      }

      // Generate channel variable if value is hex
      if (value.startsWith('#')) {
        const channels = hexToRgb(value);
        if (channels) {
          const channelVarName = `${varName}-channel`;
          if (theme === 'light') {
            lightVars.set(channelVarName, channels);
          } else if (theme === 'dark') {
            darkVars.set(channelVarName, channels);
          }
        }
      }
    });

    const serializeVars = (vars: Map<string, string>) => {
      const entries = Array.from(vars.entries()).sort(([a], [b]) =>
        a.localeCompare(b)
      );
      return entries.map(([name, value]) => `  ${name}: ${value};`).join('\n');
    };

    const lightBlock = serializeVars(lightVars);
    const darkBlock = serializeVars(darkVars);

    return `/* Do not edit directly, this file was auto-generated. */\n:root {\n${lightBlock}\n}\n\n[data-theme="dark"] {\n${darkBlock}\n}\n`;
  },
});
