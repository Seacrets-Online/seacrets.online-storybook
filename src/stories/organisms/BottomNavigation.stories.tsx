import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import BottomNavigation from '../../components/organisms/BottomNavigation';
import { withWidth, WIDTH } from '../decorators';
import {
  Add,
  AddOutlined,
  Home,
  HomeOutlined,
  Notifications,
  NotificationsOutlined,
  Search,
  SearchOutlined,
  Send,
  SendOutlined,
} from '@mui/icons-material';

const meta = {
  title: 'Organisms/BottomNavigation',
  component: BottomNavigation,
  tags: ['test'],
  decorators: [withWidth(WIDTH.phone)],
} satisfies Meta<typeof BottomNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'home',
    primaryValue: 'add',
    actions: [
      {
        label: 'Home',
        value: 'home',
        icon: <HomeOutlined />,
        activeIcon: <Home />,
      },
      {
        label: 'Search',
        value: 'search',
        icon: <SearchOutlined />,
        activeIcon: <Search />,
      },
      {
        label: 'Add',
        value: 'add',
        icon: <AddOutlined sx={{ fontSize: 26 }} />,
        activeIcon: <Add sx={{ fontSize: 26 }} />,
      },
      {
        label: 'Send',
        value: 'send',
        icon: <SendOutlined />,
        activeIcon: <Send />,
      },
      {
        label: 'Notifications',
        value: 'notifications',
        icon: <NotificationsOutlined />,
        activeIcon: <Notifications />,
      },
    ],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <BottomNavigation {...args} onChange={(v) => updateArgs({ value: v })} />
    );
  },
};
