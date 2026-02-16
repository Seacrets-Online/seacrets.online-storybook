import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import BottomNavigation from '../../components/organisms/BottomNavigation';
import { Home as HomeIcon, Favorite as FavoriteIcon, Person as PersonIcon } from '@mui/icons-material';

const meta = {
  title: 'Organisms/BottomNavigation',
  component: BottomNavigation,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof BottomNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 0,
    actions: [
      { label: 'Home', icon: <HomeIcon />, value: 0 },
      { label: 'Favorites', icon: <FavoriteIcon />, value: 1 },
      { label: 'Profile', icon: <PersonIcon />, value: 2 },
    ],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div style={{ width: 360 }}>
        <BottomNavigation
          {...args}
          onChange={(v) => updateArgs({ value: typeof v === 'number' ? v : 0 })}
        />
      </div>
    );
  },
};
