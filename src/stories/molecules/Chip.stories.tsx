import type { Meta, StoryObj } from '@storybook/react-vite';
import Chip from '../../components/molecules/Chip';

const meta = {
  title: 'Molecules/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Filled: Story = { args: { label: 'Chip' } };
export const Outlined: Story = { args: { label: 'Chip', variant: 'outlined' } };
export const Deletable: Story = { args: { label: 'Deletable', onDelete: () => {} } };
