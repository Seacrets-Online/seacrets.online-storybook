import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchTemplate from '../../components/templates/SearchTemplate';
import { withFullscreen } from '../decorators';

const meta = {
  title: 'Templates/SearchTemplate',
  component: SearchTemplate,
  tags: ['test'],
  decorators: [withFullscreen],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SearchTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [results, setResults] = useState(() =>
      Array.from({ length: 6 }, (_, i) => ({
        id: `res-${i}`,
        name: ['Daniela', 'Georgia', 'Sofia', 'Martina', 'Lucia', 'Elena'][i % 6] ?? 'Unknown',
        priceLabel: 'Gratis',
        hashtag: '#seacrets',
        imageUrl: `https://100k-faces.vercel.app/api/random-image?seed=${i + 100}`,
      }))
    );
    const [loading, setLoading] = useState(false);

    const handleLoadMore = () => {
      if (loading) return;
      setLoading(true);
      setTimeout(() => {
        setResults((prev) => [
          ...prev,
          ...Array.from({ length: 6 }, (_, i) => ({
            id: `res-${prev.length + i}`,
            name: ['Valeria', 'Camila', 'Isabella', 'Sara', 'Victoria', 'Mia'][i % 6] ?? 'Unknown',
            priceLabel: 'Gratis',
            hashtag: '#new',
            imageUrl: `https://100k-faces.vercel.app/api/random-image?seed=${prev.length + i + 200}`,
          })),
        ]);
        setLoading(false);
      }, 1000);
    };

    return (
      <SearchTemplate
        {...args}
        results={results}
        isLoadingMore={loading}
        onLoadMore={handleLoadMore}
      />
    );
  },
  args: {
    onSearch: (q) => console.log('Search', q),
    onViewProfile: (item) => console.log('View profile', item),
    onSubscribe: (item) => console.log('Subscribe', item),
  },
};
