import type { Meta, StoryObj } from '@storybook/react';
import IconButton from '../../components/atoms/IconButton';
import { Delete as DeleteIcon } from '@mui/icons-material';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
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
} satisfies Meta<typeof IconButton>;

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
