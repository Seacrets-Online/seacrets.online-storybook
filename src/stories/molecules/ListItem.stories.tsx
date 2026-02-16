import type { Meta, StoryObj } from '@storybook/react';
import List from '@mui/material/List';
import ListItem from '../../components/molecules/ListItem';
import Avatar from '../../components/atoms/Avatar';

const meta: Meta<typeof ListItem> = {
  title: 'Molecules/ListItem',
  component: ListItem,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <List sx={{ width: 320 }}><Story /></List>],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: { primary: 'List item', secondary: 'Secondary text' },
};

export const WithAvatar: Story = {
  args: {
    primary: 'User',
    secondary: 'user@example.com',
    avatar: <Avatar>A</Avatar>,
  },
};
