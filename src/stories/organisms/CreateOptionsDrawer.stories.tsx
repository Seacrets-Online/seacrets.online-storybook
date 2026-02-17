import type { Meta, StoryObj } from '@storybook/react';
import CreateOptionsDrawer from '../../components/organisms/CreateOptionsDrawer';
import BottomNavigation from '../../components/organisms/BottomNavigation';
import { Add, Home, Notifications, Search, Send } from '@mui/icons-material';

const meta = {
  title: 'Organisms/CreateOptionsDrawer',
  component: CreateOptionsDrawer,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof CreateOptionsDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    onClose: () => {},
  },
  render: function Render(args) {
    return (
      <CreateOptionsDrawer
        {...args}
        footer={
          <BottomNavigation
            value="home"
            primaryValue="add"
            actions={[
              { label: 'Home', value: 'home', icon: <Home /> },
              { label: 'Search', value: 'search', icon: <Search /> },
              { label: 'Add', value: 'add', icon: <Add sx={{ fontSize: 26 }} /> },
              { label: 'Send', value: 'send', icon: <Send /> },
              { label: 'Notifications', value: 'notifications', icon: <Notifications /> },
            ]}
          />
        }
      />
    );
  },
};

