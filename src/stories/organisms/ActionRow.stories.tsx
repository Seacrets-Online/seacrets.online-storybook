import type { Meta, StoryObj } from '@storybook/react';
import ActionRow from '../../components/organisms/ActionRow';

const meta = {
  title: 'Organisms/ActionRow',
  component: ActionRow,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ActionRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    primaryAction: { children: 'Save', onClick: () => {} },
    secondaryActions: [
      { children: 'Cancel', onClick: () => {} },
    ],
  },
};
