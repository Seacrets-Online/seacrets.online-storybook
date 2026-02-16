import type { Meta, StoryObj } from '@storybook/react';
import LinearProgress from '../../components/atoms/LinearProgress';

const meta: Meta<typeof LinearProgress> = {
  title: 'Atoms/LinearProgress',
  component: LinearProgress,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Indeterminate: Story = { args: {} };
export const Determinate: Story = { args: { variant: 'determinate', value: 60 } };
