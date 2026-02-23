import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from '../../components/atoms/Badge';
import { Mail as MailIcon } from '@mui/icons-material';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithNumber: Story = {
  args: { badgeContent: 4, children: <MailIcon /> },
};

export const Dot: Story = {
  args: { variant: 'dot', children: <MailIcon /> },
};
