import type { Meta, StoryObj } from '@storybook/react';
import Badge from '../../components/atoms/Badge';
import MailIcon from '@mui/icons-material/Mail';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithNumber: Story = {
  args: { badgeContent: 4, children: <MailIcon /> },
};

export const Dot: Story = {
  args: { variant: 'dot', children: <MailIcon /> },
};
