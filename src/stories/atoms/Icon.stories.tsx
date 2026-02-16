import type { Meta, StoryObj } from '@storybook/react';
import Icon from '../../components/atoms/Icon';
import { Star } from '../../icons';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Star,
  },
};

export const CustomSize: Story = {
  args: {
    icon: Star,
    sx: { fontSize: 32 },
  },
};
