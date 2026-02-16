import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from '../../components/atoms/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = { args: { width: 200 } };
export const Circular: Story = { args: { variant: 'circular', width: 40, height: 40 } };
export const Rectangular: Story = { args: { variant: 'rectangular', width: 200, height: 100 } };
