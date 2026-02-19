import type { Meta, StoryObj } from '@storybook/react';
import AppBar from '../../components/organisms/AppBar';
import { Menu as MenuIcon } from '@mui/icons-material';

const meta = {
  title: 'Organisms/AppBar',
  component: AppBar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'App',
    startIcon: <MenuIcon />,
    onStartIconClick: () => {},
  },
};
