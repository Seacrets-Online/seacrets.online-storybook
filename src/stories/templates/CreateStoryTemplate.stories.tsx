import type { Meta, StoryObj } from '@storybook/react';
import CreateStoryTemplate from '../../components/templates/CreateStoryTemplate';

const meta = {
  title: 'Templates/CreateStoryTemplate',
  component: CreateStoryTemplate,
  parameters: { layout: 'fullscreen', docs: { page: null } },
} satisfies Meta<typeof CreateStoryTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onBack: () => {},
    onSubmit: (data) => console.log('Submit', data),
  },
};
