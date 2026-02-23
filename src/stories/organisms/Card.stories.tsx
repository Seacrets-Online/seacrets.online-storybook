import type { Meta, StoryObj } from '@storybook/react-vite';
import Card from '../../components/organisms/Card';
import { withWidth, WIDTH } from '../decorators';
import Avatar from '../../components/atoms/Avatar';

const meta = {
  title: 'Organisms/Card',
  component: Card,
  tags: ['test'],
  decorators: [withWidth(WIDTH.card)],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    avatar: <Avatar>A</Avatar>,
    content: 'Card content goes here.',
    actions: [{ children: 'Action' }],
  },
};
