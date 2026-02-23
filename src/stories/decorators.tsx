import { Box, List } from '@mui/material';
import type { Decorator } from '@storybook/react';

/** Standard width presets (mobile-first) */
export const WIDTH = {
  narrow: 200,
  medium: 300,
  form: 320,
  card: 360,
  mobile: 390,
  phone: 414,
} as const;

/** Wraps story in a fixed-width container. Use for form controls, cards, etc. */
export const withWidth =
  (width: number): Decorator =>
  (Story) =>
    (
      <Box sx={{ width }}>
        <Story />
      </Box>
    );

/** Mobile-width container with maxWidth 100% for responsive preview. */
export const withMobileWidth =
  (width: number = WIDTH.mobile): Decorator =>
  (Story) =>
    (
      <Box sx={{ width, maxWidth: '100%' }}>
        <Story />
      </Box>
    );

/** Full viewport height, flex column. Use for templates (SearchTemplate, OnboardingStepTemplate). */
export const withFullscreen: Decorator = (Story) => (
  <Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
    <Story />
  </Box>
);

/** List wrapper for ListItem stories. */
export const withList =
  (width: number = WIDTH.form): Decorator =>
  (Story) =>
    (
      <List sx={{ width }}>
        <Story />
      </List>
    );
