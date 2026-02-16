import type { Meta, StoryObj } from '@storybook/react';
import AppBar from '../../components/organisms/AppBar';
import MenuIcon from '@mui/icons-material/Menu';

const meta: Meta<typeof AppBar> = {
  title: 'Organisms/AppBar',
  component: AppBar,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'App',
    startIcon: <MenuIcon />,
    onStartIconClick: () => {},
  },
};
