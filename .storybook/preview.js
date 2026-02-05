import '../src/styles/index.css';

/** @type {import('@storybook/react-vite').Preview} */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      const root = document.documentElement;
      
      // Remove existing theme classes
      root.classList.remove('theme-light', 'theme-dark');
      
      // Add the current theme class
      root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
      
      // Set data attribute for additional theming support
      root.setAttribute('data-theme', theme);
      
      return Story();
    },
  ],
};

export default preview;
