import type { Meta, StoryObj } from '@storybook/react';
import Chip from '../../components/molecules/Chip';

const meta: Meta<typeof Chip> = {
  title: 'Molecules/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Filled: Story = { args: { label: 'Chip' } };
export const Outlined: Story = { args: { label: 'Chip', variant: 'outlined' } };
export const Deletable: Story = { args: { label: 'Deletable', onDelete: () => {} } };
