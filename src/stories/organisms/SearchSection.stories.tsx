import type { Meta, StoryObj } from '@storybook/react';
import SearchSection from '../../components/organisms/SearchSection';

const meta = {
  title: 'Organisms/SearchSection',
  component: SearchSection,
  parameters: { layout: 'centered', docs: { page: null } },
  decorators: [
    (Story) => (
      <div style={{ width: 390, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: (q) => console.log('Search', q),
    onFilterCategoryClick: (c) => console.log('Filter', c),
    onRemoveFilter: (id) => console.log('Remove', id),
    onClearFilters: () => console.log('Clear'),
  },
};
