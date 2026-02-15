import ActionRow from '../../components/organisms/ActionRow.jsx';

export default {
  title: 'Organisms/ActionRow',
  component: ActionRow,
  parameters: { layout: 'centered' },
};

export const Default = {
  args: {
    primaryAction: { children: 'Save', onClick: () => {} },
    secondaryActions: [
      { children: 'Cancel', onClick: () => {} },
    ],
  },
};
