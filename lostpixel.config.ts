import type { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: './storybook-static',
    waitBeforeScreenshot: 2000,
    timeouts: {
      fetchStories: 60000,
      loadState: 60000,
      networkRequests: 60000,
    },
  },
  lostPixelProjectId: 'cmlyt3h3l1a8o5mwg9brq9dgv',
  apiKey: process.env.LOST_PIXEL_API_KEY,
};
