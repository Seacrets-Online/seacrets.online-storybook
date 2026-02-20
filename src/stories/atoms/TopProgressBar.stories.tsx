import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import TopProgressBar from '../../components/atoms/TopProgressBar';

const meta = {
  title: 'Atoms/TopProgressBar',
  component: TopProgressBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <Box sx={{ width: 360 }}><Story /></Box>],
} satisfies Meta<typeof TopProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Indeterminate: Story = {
  args: {
    variant: 'indeterminate',
    thickness: 3,
  },
};

export const Determinate: Story = {
  args: {
    variant: 'determinate',
    value: 60,
    thickness: 3,
  },
};

