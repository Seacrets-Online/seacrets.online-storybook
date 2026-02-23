import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchSection from '../../components/organisms/SearchSection';
import { withMobileWidth } from '../decorators';

const meta = {
  title: 'Organisms/SearchSection',
  component: SearchSection,
  tags: ['test'],
  decorators: [withMobileWidth()],
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
