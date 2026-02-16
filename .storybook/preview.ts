import type { ReactNode } from 'react';
import '../src/styles/index.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import { lightTheme, darkTheme } from '../src/theme/mui/createTheme';

const preview = {
  initialGlobals: {
    theme: 'dark',
    viewport: { value: 'iphone14pro', isRotated: false },
  },
  parameters: {
    options: {
      storySort: {
        order: ['Foundations', 'Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'],
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone14pro',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {},
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
        },
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: 'dark',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
    (Story: () => ReactNode, context: { globals: { theme?: string } }) => {
      const theme = context.globals.theme ?? 'dark';
      const root = document.documentElement;
      root.classList.remove('theme-light', 'theme-dark');
      root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
      root.setAttribute('data-theme', theme);
      return Story();
    },
  ],
};

export default preview;
