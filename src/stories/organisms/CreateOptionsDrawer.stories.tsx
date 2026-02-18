import type { Meta, StoryObj } from '@storybook/react';
import CreateOptionsDrawer from '../../components/organisms/CreateOptionsDrawer';

const meta = {
  title: 'Organisms/CreateOptionsDrawer',
  component: CreateOptionsDrawer,
  parameters: { layout: 'fullscreen', docs: { page: null } },
} satisfies Meta<typeof CreateOptionsDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    onClose: () => {},
  },
};

