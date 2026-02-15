/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mdx)'],
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    'storybook/actions',
    'storybook/highlight',
    'storybook/viewport'
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  }
};

export default config;
