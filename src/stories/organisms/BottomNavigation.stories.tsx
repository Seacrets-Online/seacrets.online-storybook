import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import BottomNavigation from '../../components/organisms/BottomNavigation';
import { Add, Home, Notifications, Search, Send } from '@mui/icons-material';

const meta = {
  title: 'Organisms/BottomNavigation',
  component: BottomNavigation,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 414 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BottomNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'home',
    primaryValue: 'add',
    actions: [
      { label: 'Home', value: 'home', icon: <Home /> },
      { label: 'Search', value: 'search', icon: <Search /> },
      { label: 'Add', value: 'add', icon: <Add sx={{ fontSize: 26 }} /> },
      { label: 'Send', value: 'send', icon: <Send /> },
      { label: 'Notifications', value: 'notifications', icon: <Notifications /> },
    ],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <BottomNavigation {...args} onChange={(v) => updateArgs({ value: v })} />
    );
  },
};
