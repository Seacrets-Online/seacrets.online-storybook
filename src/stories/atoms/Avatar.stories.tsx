import type { Meta, StoryObj } from '@storybook/react';
import Avatar from '../../components/atoms/Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithLetter: Story = { args: { children: 'A' } };
export const WithImage: Story = { args: { src: 'https://i.pravatar.cc/150', alt: 'User' } };
