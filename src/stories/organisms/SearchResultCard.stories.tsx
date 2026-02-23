import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchResultCard from '../../components/organisms/SearchResultCard';
import { withWidth, WIDTH } from '../decorators';

const meta = {
  title: 'Organisms/SearchResultCard',
  component: SearchResultCard,
  tags: ['test'],
  decorators: [withWidth(WIDTH.card)],
} satisfies Meta<typeof SearchResultCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Daniela',
    priceLabel: 'Gratis',
    hashtag: '#tetas',
    imageUrl: 'https://100k-faces.vercel.app/api/random-image?seed=1',
    onViewProfile: () => {},
    onSubscribe: () => {},
  },
};
