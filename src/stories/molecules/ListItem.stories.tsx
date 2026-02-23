import type { Meta, StoryObj } from '@storybook/react-vite';
import ListItem from '../../components/molecules/ListItem';
import Avatar from '../../components/atoms/Avatar';
import { withList } from '../decorators';

const meta = {
  title: 'Molecules/ListItem',
  component: ListItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
  decorators: [withList()],
} satisfies Meta<typeof ListItem>;

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
