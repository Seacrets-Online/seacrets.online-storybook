import type { Meta, StoryObj } from '@storybook/react';
import ActionRow from '../../components/organisms/ActionRow';

const meta: Meta<typeof ActionRow> = {
  title: 'Organisms/ActionRow',
  component: ActionRow,
  parameters: { layout: 'centered' },
};

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
