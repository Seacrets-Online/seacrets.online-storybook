import type { Meta, StoryObj } from '@storybook/react';
import FeedTemplate from '../../components/templates/FeedTemplate';
import FeedCard from '../../components/organisms/FeedCard';
import EmptyState from '../../components/organisms/EmptyState';

const meta: Meta<typeof FeedTemplate> = {
  title: 'Templates/FeedTemplate',
  component: FeedTemplate,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const feedCards = Array.from({ length: 5 }, (_, i) => (
  <FeedCard
    key={`feed-${i}`}
    username={i === 0 ? 'Mariana' : `user_${i + 1}`}
    handle={i === 0 ? 'mariana12' : `user${i + 1}`}
    userAvatar={`https://i.pravatar.cc/150?u=${i}`}
    imageUrl={`https://picsum.photos/seed/${i + 10}/600/800`}
    caption={i === 0 ? 'Why just one if you can have double?' : `Esta es la publicación número ${i + 1}`}
    likesCount={i === 0 ? '1K' : `${Math.floor(Math.random() * 1000)}`}
    hashtags={i === 0 ? ['petite', 'boobs', 'colombian'] : ['seacrets', 'feed']}
    timeAgo={`1h`}
  />
));

export const WithItems: Story = {
  args: {
    header: <h2 style={{ margin: 0 }}>Feed</h2>,
    children: feedCards,
  },
};

export const Empty: Story = {
  args: {
    isEmpty: true,
    emptyState: <EmptyState title="No hay publicaciones" description="Sé el primero en publicar algo." />,
  },
};
