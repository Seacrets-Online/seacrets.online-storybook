import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { themes } from 'storybook/theming';
import '../src/styles/index.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { lightTheme, darkTheme } from '../src/theme/mui/createTheme';

const docsTheme = {
  ...themes.dark,
  appBg: 'var(--md-sys-color-background)',
  appContentBg: 'var(--md-sys-color-background)',
  barBg: 'var(--md-sys-color-surface)',
  inputBg: 'var(--md-sys-color-surface)',
};

const preview: Preview = {
  initialGlobals: {
    theme: 'dark',
    viewport: { value: 'mobile2', isRotated: false },
  },
  parameters: {
    docs: {
      theme: docsTheme,
      canvas: {
        className: 'docs-canvas-mobile',
      },
    },
    layout: 'centered',
    options: {
      storySort: {
        order: ['Foundations', 'Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'],
      },
    },
    viewport: {
      options: MINIMAL_VIEWPORTS,
      defaultViewport: 'mobile2',
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
    (Story, context: { globals: { theme?: string } }) => {
      const theme = context.globals.theme ?? 'dark';
      const root = document.documentElement;
      root.classList.remove('theme-light', 'theme-dark');
      root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
      root.setAttribute('data-theme', theme);
      return React.createElement(Story);
    },
  ],
};

export default preview;
