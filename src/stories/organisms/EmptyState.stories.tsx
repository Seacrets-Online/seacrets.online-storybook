import type { Meta, StoryObj } from '@storybook/react';
import EmptyState from '../../components/organisms/EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Organisms/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No items',
    description: 'Add your first item to get started.',
    actionLabel: 'Add item',
    onAction: () => {},
  },
};
