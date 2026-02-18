import type { Meta, StoryObj } from '@storybook/react';
import SearchResultCard from '../../components/organisms/SearchResultCard';

const meta = {
  title: 'Organisms/SearchResultCard',
  component: SearchResultCard,
  parameters: { layout: 'centered', docs: { page: null } },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchResultCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Daniela',
    priceLabel: 'Gratis',
    hashtag: '#tetas',
    imageUrl: 'https://picsum.photos/seed/daniela/400/533',
    onViewProfile: () => {},
    onSubscribe: () => {},
  },
};
