import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import './style-dictionary-formats';

register(StyleDictionary, { excludeParentKeys: false });

export default {
  source: ['src/tokens/tokens.json'],
  preprocessors: ['tokens-studio'],
  log: {
    verbosity: 'verbose',
    errors: {
      brokenReferences: 'error',
    },
  },
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'src/style-dictionary-dist/',
      files: [
        {
          destination: 'theme.css',
          format: 'css/variables-theme',
        },
      ],
    },
    typescript: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'src/utils/',
      files: [
        {
          destination: 'colors.ts',
          format: 'typescript/color-tokens',
        },
      ],
    },
  },
};
