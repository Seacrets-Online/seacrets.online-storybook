import type { Meta, StoryObj } from '@storybook/react';
import FeedTemplate from '../../components/templates/FeedTemplate';
import ListItem from '../../components/molecules/ListItem';
import EmptyState from '../../components/organisms/EmptyState';

const meta: Meta<typeof FeedTemplate> = {
  title: 'Templates/FeedTemplate',
  component: FeedTemplate,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithItems: Story = {
  args: {
    header: <h2>Feed</h2>,
    children: (
      <>
        <ListItem primary="Item 1" />
        <ListItem primary="Item 2" />
      </>
    ),
  },
};

export const Empty: Story = {
  args: {
    isEmpty: true,
    emptyState: <EmptyState title="No posts" description="Create your first post." />,
  },
};
