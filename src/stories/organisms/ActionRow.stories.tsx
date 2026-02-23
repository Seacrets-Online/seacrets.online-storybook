import type { Meta, StoryObj } from '@storybook/react-vite';
import ActionRow from '../../components/organisms/ActionRow';

const meta = {
  title: 'Organisms/ActionRow',
  component: ActionRow,
  tags: ['test'],
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
