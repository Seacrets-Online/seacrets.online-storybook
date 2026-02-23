import type { Meta, StoryObj } from '@storybook/react-vite';
import FilterTag from '../../components/molecules/FilterTag';

const meta = {
  title: 'Molecules/FilterTag',
  component: FilterTag,
  tags: ['test'],
} satisfies Meta<typeof FilterTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Nuevos',
    onDelete: () => console.log('Delete'),
  },
};
