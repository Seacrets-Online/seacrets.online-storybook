import type { Meta, StoryObj } from '@storybook/react-vite';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import Fab from '../../components/atoms/Fab';

const meta = {
  title: 'Atoms/Fab',
  component: Fab,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
} satisfies Meta<typeof Fab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Circular: Story = {
  args: {
    color: 'primary',
    shape: 'circular',
    children: <AddIcon />,
  },
};

export const Rounded: Story = {
  args: {
    color: 'secondary',
    shape: 'rounded',
    children: <EditIcon />,
  },
};

export const Extended: Story = {
  args: {
    variant: 'extended',
    color: 'primary',
    shape: 'rounded',
    children: 'Create',
  },
};

