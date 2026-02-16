import type { Meta, StoryObj } from '@storybook/react';
import LinearProgress from '../../components/atoms/LinearProgress';

const meta = {
  title: 'Atoms/LinearProgress',
  component: LinearProgress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
} satisfies Meta<typeof LinearProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Indeterminate: Story = { args: {} };
export const Determinate: Story = { args: { variant: 'determinate', value: 60 } };
