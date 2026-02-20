import StyleDictionary from 'style-dictionary';

type PathInput = string | string[] | undefined;

const toTsKey = (varName: string): string =>
  varName.replace(/^--/, '').replace(/-([a-z0-9])/g, (_, g: string) => g.toUpperCase());

const toKebab = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

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
  // Canonical MD3-ish naming derived from token groups (Schemes/Palettes/...).
  // Example:
  // - seacrets.online/Light/Schemes/Primary -> --md-sys-color-primary
  // - seacrets.online/Light/Palettes/Primary/40 -> --md-ref-palette-primary40
  const parts = filterMd3Path(pathParts);
  const slugs = parts.map(toKebab).filter(Boolean);

  const indexOf = (slug: string) => slugs.findIndex((p) => p === slug);
  const after = (idx: number) => slugs.slice(idx + 1).filter(Boolean);

  const fallback = slugs.length > 0 ? `--${slugs.join('-')}` : '--unknown';

  const schemesIndex = indexOf('schemes');
  if (schemesIndex >= 0) {
    const tokenName = after(schemesIndex).join('-');
    return tokenName ? `--md-sys-color-${tokenName}` : fallback;
  }

  const palettesIndex = indexOf('palettes');
  if (palettesIndex >= 0) {
    const rest = after(palettesIndex);
    const [family, tone, ...tail] = rest;
    if (family && tone && /^\d+$/.test(tone) && tail.length === 0) {
      return `--md-ref-palette-${family}${tone}`;
    }
    return rest.length > 0 ? `--md-ref-palette-${rest.join('-')}` : fallback;
  }

  const stateLayersIndex = indexOf('state-layers');
  if (stateLayersIndex >= 0) {
    const rest = after(stateLayersIndex).join('-');
    return rest ? `--md-sys-state-layer-${rest}` : fallback;
  }

  const extendedColorsIndex = indexOf('extended-colors');
  if (extendedColorsIndex >= 0) {
    const rest = after(extendedColorsIndex).join('-');
    return rest ? `--md-ext-color-${rest}` : fallback;
  }

  const surfacesIndex = indexOf('surfaces');
  if (surfacesIndex >= 0) {
    const rest = after(surfacesIndex).join('-');
    return rest ? `--md-sys-surface-${rest}` : fallback;
  }

  return fallback;
};

const hexToRgb = (hex: string): string | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
    : null;
};

type ColorVars = Map<string, string>;

const copyVar = (source: ColorVars, target: ColorVars, varName: string): void => {
  const value = source.get(varName);
  if (value !== undefined) {
    target.set(varName, value);
  }
};

const aliasVar = (source: ColorVars, target: ColorVars, targetVarName: string, sourceVarName: string): void => {
  const value = source.get(sourceVarName);
  if (value !== undefined) {
    target.set(targetVarName, value);
  }
};

const copyVarWithChannel = (source: ColorVars, target: ColorVars, varName: string): void => {
  copyVar(source, target, varName);
  copyVar(source, target, `${varName}-channel`);
};

const aliasVarWithChannel = (
  source: ColorVars,
  target: ColorVars,
  targetVarName: string,
  sourceVarName: string
): void => {
  aliasVar(source, target, targetVarName, sourceVarName);
  aliasVar(source, target, `${targetVarName}-channel`, `${sourceVarName}-channel`);
};

const setHexWithChannel = (target: ColorVars, varName: string, hex: string): void => {
  target.set(varName, hex);
  const channels = hexToRgb(hex);
  if (channels) {
    target.set(`${varName}-channel`, channels);
  }
};

/**
 * Brand rule: in dark mode keep dark surfaces, but reuse Light accent colors
 * so primary actions are consistent across modes.
 *
 * This is applied at export time (no edits to src/tokens/tokens.json).
 */
const applyDarkThemeBrandOverrides = (lightVars: ColorVars, darkVars: ColorVars): void => {
  // Keep dark backgrounds (brand override)
  setHexWithChannel(darkVars, '--md-sys-color-background', '#151515');
  setHexWithChannel(darkVars, '--md-sys-color-surface', '#0e1415');
  setHexWithChannel(darkVars, '--md-sys-color-on-background', '#ffffff');

  // Reuse Light accents in dark mode
  const accentSchemeNames = [
    'primary',
    'on-primary',
    'primary-container',
    'on-primary-container',
    'secondary',
    'on-secondary',
    'secondary-container',
    'on-secondary-container',
    'tertiary',
    'on-tertiary',
    'tertiary-container',
    'on-tertiary-container',
    'error',
    'on-error',
    'error-container',
    'on-error-container',
    'surface-tint',
  ] as const;

  accentSchemeNames.forEach((name) => {
    const varName = `--md-sys-color-${name}`;
    copyVarWithChannel(lightVars, darkVars, varName);
  });

  // State layers for the overridden accents (hover/pressed overlays)
  const stateLayerNames = [
    'primary',
    'on-primary',
    'primary-container',
    'on-primary-container',
    'secondary',
    'on-secondary',
    'secondary-container',
    'on-secondary-container',
    'tertiary',
    'on-tertiary',
    'tertiary-container',
    'on-tertiary-container',
    'error',
    'on-error',
    'error-container',
    'on-error-container',
  ] as const;

  const opacities = ['08', '10', '16'] as const;
  stateLayerNames.forEach((name) => {
    opacities.forEach((opacity) => {
      const varName = `--md-sys-state-layer-${name}-opacity-${opacity}`;
      copyVar(lightVars, darkVars, varName);
    });
  });

  // Primary actions: use container tones (filled surfaces) while keeping dark backgrounds.
  // This affects components that key off `--md-sys-color-primary` (e.g. contained primary buttons).
  aliasVarWithChannel(lightVars, darkVars, '--md-sys-color-primary', '--md-sys-color-primary-container');
  aliasVarWithChannel(lightVars, darkVars, '--md-sys-color-on-primary', '--md-sys-color-on-primary-container');
  opacities.forEach((opacity) => {
    aliasVar(
      lightVars,
      darkVars,
      `--md-sys-state-layer-primary-opacity-${opacity}`,
      `--md-sys-state-layer-primary-container-opacity-${opacity}`
    );
    aliasVar(
      lightVars,
      darkVars,
      `--md-sys-state-layer-on-primary-opacity-${opacity}`,
      `--md-sys-state-layer-on-primary-container-opacity-${opacity}`
    );
  });
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

    const lightTokens: Record<string, string> = {};
    const darkTokens: Record<string, string> = {};

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

      // For TS export, we want a camelCase key
      const tsKey = varName.replace(/^--/, '').replace(/-([a-z0-9])/g, (_, g) => g.toUpperCase());

      if (theme === 'light') {
        lightVars.set(varName, value);
        lightTokens[tsKey] = value;
      } else if (theme === 'dark') {
        darkVars.set(varName, value);
        darkTokens[tsKey] = value;
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

    applyDarkThemeBrandOverrides(lightVars, darkVars);

    const serializeVars = (vars: Map<string, string>) => {
      const entries = Array.from(vars.entries()).sort(([a], [b]) =>
        a.localeCompare(b)
      );
      return entries.map(([name, value]) => `  ${name}: ${value};`).join('\n');
    };

    const lightBlock = serializeVars(lightVars);
    const darkBlock = serializeVars(darkVars);

    const tsOutput = `export const colorTokens = ${JSON.stringify({ light: lightTokens, dark: darkTokens }, null, 2)};\n\nexport default colorTokens;`;

    // We can't easily write a second file from a format, but we can return a comment with the TS content 
    // or better, we'll add a new platform to the config.
    return `/* Do not edit directly, this file was auto-generated. */\n:root {\n${lightBlock}\n}\n\n[data-theme="dark"] {\n${darkBlock}\n}\n\n/* TS_EXPORT_START\n${tsOutput}\nTS_EXPORT_END */\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'typescript/color-tokens',
  format: ({ dictionary }) => {
    const lightTokens: Record<string, string> = {};
    const darkTokens: Record<string, string> = {};
    const lightVars = new Map<string, string>();
    const darkVars = new Map<string, string>();

    dictionary.allTokens.forEach((token) => {
      const tokenType = token.$type ?? token.type;
      if (tokenType !== 'color') return;

      let theme: 'light' | 'dark' | null = null;
      const parts = normalizePathParts(token.path ?? token.originalPath);
      if (parts.some((p) => p.toLowerCase() === 'light')) theme = 'light';
      else if (parts.some((p) => p.toLowerCase() === 'dark')) theme = 'dark';

      if (!theme) return;

      const varName = toCssVarName(token.path ?? token.originalPath);
      const value = (token.$value ?? token.value) ?? '';
      const tsKey = toTsKey(varName);

      if (theme === 'light') {
        lightTokens[tsKey] = value;
        lightVars.set(varName, value);
      } else if (theme === 'dark') {
        darkTokens[tsKey] = value;
        darkVars.set(varName, value);
      }
    });

    applyDarkThemeBrandOverrides(lightVars, darkVars);

    // Re-sync token objects from the overridden var maps
    darkVars.forEach((value, varName) => {
      if (!varName.endsWith('-channel')) {
        darkTokens[toTsKey(varName)] = value;
      }
    });

    return `/* Do not edit directly, this file was auto-generated. */\nexport const colorTokens = ${JSON.stringify(
      { light: lightTokens, dark: darkTokens },
      null,
      2
    )} as const;\n\nexport default colorTokens;\n`;
  },
});
