import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    'storybook/actions',
    'storybook/highlight',
    'storybook/viewport',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
