import type { Meta, StoryObj } from '@storybook/react';
import Card from '../../components/organisms/Card';
import Avatar from '../../components/atoms/Avatar';

const meta: Meta<typeof Card> = {
  title: 'Organisms/Card',
  component: Card,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

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
