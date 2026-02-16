import type { Meta, StoryObj } from '@storybook/react';
import Alert from '../../components/atoms/Alert';

const meta = {
  title: 'Atoms/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    severity: 'info',
    children: 'This is an info alert.',
  },
};

export const Success: Story = {
  args: {
    severity: 'success',
    children: 'This is a success alert.',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    children: 'This is a warning alert.',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    children: 'This is an error alert.',
  },
};
