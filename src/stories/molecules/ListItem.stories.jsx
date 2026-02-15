import List from '@mui/material/List';
import ListItem from '../../components/molecules/ListItem.jsx';
import Avatar from '../../components/atoms/Avatar.jsx';

export default {
  title: 'Molecules/ListItem',
  component: ListItem,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <List sx={{ width: 320 }}><Story /></List>],
};

export const Simple = {
  args: { primary: 'List item', secondary: 'Secondary text' },
};

export const WithAvatar = {
  args: {
    primary: 'User',
    secondary: 'user@example.com',
    avatar: <Avatar>A</Avatar>,
  },
};
