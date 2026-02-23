import type { Meta, StoryObj } from '@storybook/react-vite';
import LinearProgress from '../../components/atoms/LinearProgress';
import { withWidth, WIDTH } from '../decorators';

const meta = {
  title: 'Atoms/LinearProgress',
  component: LinearProgress,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
  decorators: [withWidth(WIDTH.medium)],
} satisfies Meta<typeof LinearProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Indeterminate: Story = { args: {} };
export const Determinate: Story = { args: { variant: 'determinate', value: 60 } };
