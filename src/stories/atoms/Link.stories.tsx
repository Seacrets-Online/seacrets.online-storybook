import type { Meta, StoryObj } from '@storybook/react-vite';
import Link from '../../components/atoms/Link';

const meta = {
  title: 'Atoms/Link',
  component: Link,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
};

export const Primary: Story = {
  args: {
    href: '#',
    children: 'Primary link',
    color: 'primary',
  },
};
