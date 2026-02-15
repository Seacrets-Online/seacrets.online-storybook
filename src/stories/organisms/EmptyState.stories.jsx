import EmptyState from '../../components/organisms/EmptyState.jsx';

export default {
  title: 'Organisms/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
};

export const Default = {
  args: {
    title: 'No items',
    description: 'Add your first item to get started.',
    actionLabel: 'Add item',
    onAction: () => {},
  },
};
