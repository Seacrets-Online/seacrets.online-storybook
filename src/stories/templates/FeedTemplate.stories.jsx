import FeedTemplate from '../../components/templates/FeedTemplate.jsx';
import ListItem from '../../components/molecules/ListItem.jsx';
import EmptyState from '../../components/organisms/EmptyState.jsx';

export default {
  title: 'Templates/FeedTemplate',
  component: FeedTemplate,
  parameters: { layout: 'centered' },
};

export const WithItems = {
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

export const Empty = {
  args: {
    isEmpty: true,
    emptyState: <EmptyState title="No posts" description="Create your first post." />,
  },
};
