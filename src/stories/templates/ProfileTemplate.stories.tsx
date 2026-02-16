import type { Meta, StoryObj } from '@storybook/react';
import ProfileTemplate from '../../components/templates/ProfileTemplate';

const meta: Meta<typeof ProfileTemplate> = {
  title: 'Templates/ProfileTemplate',
  component: ProfileTemplate,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'User Name',
    subtitle: 'user@example.com',
    children: <p>Profile content</p>,
  },
};
