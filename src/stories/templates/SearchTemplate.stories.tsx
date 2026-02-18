import type { Meta, StoryObj } from '@storybook/react';
import SearchTemplate from '../../components/templates/SearchTemplate';

const meta = {
  title: 'Templates/SearchTemplate',
  component: SearchTemplate,
  parameters: { layout: 'fullscreen', docs: { page: null } },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: (q) => console.log('Search', q),
    onViewProfile: (item) => console.log('View profile', item),
    onSubscribe: (item) => console.log('Subscribe', item),
  },
};
