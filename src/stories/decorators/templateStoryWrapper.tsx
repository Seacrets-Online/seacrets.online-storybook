import type { Decorator } from '@storybook/react';

export const withTemplateStoryWrapper: Decorator = (Story) => (
  <div className="template-story-wrapper">
    <Story />
  </div>
);

