import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../components/atoms/Text';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Secondary text',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption text',
  },
};
