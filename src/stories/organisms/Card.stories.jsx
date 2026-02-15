import Card from '../../components/organisms/Card.jsx';
import Avatar from '../../components/atoms/Avatar.jsx';

export default {
  title: 'Organisms/Card',
  component: Card,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Default = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    avatar: <Avatar>A</Avatar>,
    content: 'Card content goes here.',
    actions: [{ children: 'Action' }],
  },
};
