import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { expandTokenReferences } from './scripts/expand-token-references';
import './style-dictionary-formats';

register(StyleDictionary, { excludeParentKeys: false });

StyleDictionary.registerPreprocessor({
  name: 'expand-token-references',
  preprocessor: expandTokenReferences,
});

export default {
  source: ['src/tokens/tokens.json'],
  preprocessors: ['expand-token-references', 'tokens-studio'],
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
