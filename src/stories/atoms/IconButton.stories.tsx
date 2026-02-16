import type { Meta, StoryObj } from '@storybook/react';
import IconButton from '../../components/atoms/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <DeleteIcon />,
    'aria-label': 'Delete',
  },
};

export const Disabled: Story = {
  args: {
    children: <DeleteIcon />,
    'aria-label': 'Delete',
    disabled: true,
  },
};
