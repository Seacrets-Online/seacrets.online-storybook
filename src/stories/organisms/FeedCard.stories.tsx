import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeedCard } from '../../components/organisms/FeedCard';

const meta = {
  title: 'Organisms/FeedCard',
  component: FeedCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test'],
  argTypes: {
    onLike: { action: 'liked' },
    onTip: { action: 'tipped' },
    onShare: { action: 'shared' },
    onSave: { action: 'saved' },
    onMore: { action: 'more clicked' },
    onUserClick: { action: 'user clicked' },
  },
} satisfies Meta<typeof FeedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    username: 'Mariana',
    handle: 'mariana12',
    userAvatar: 'https://i.pravatar.cc/150?u=mariana',
    isVerified: true,
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    caption: 'Why just one if you can have double?',
    likesCount: '1K',
    timeAgo: '1h',
    hashtags: ['petite', 'boobs', 'colombian'],
  },
};

export const NoLocation: Story = {
  args: {
    ...Default.args,
    caption: undefined,
  },
};

export const LongCaption: Story = {
  args: {
    ...Default.args,
    caption: 'This is a very long caption to test how the FeedCard handles multiple lines of text. It should probably truncate after a few lines to keep the feed looking clean and consistent across different posts. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
};

export const NoComments: Story = {
  args: {
    ...Default.args,
    likesCount: '0',
  },
};
