import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BottomNavigation from '../../components/organisms/BottomNavigation';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';

const meta: Meta<typeof BottomNavigation> = {
  title: 'Organisms/BottomNavigation',
  component: BottomNavigation,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <div style={{ width: 360 }}>
        <BottomNavigation
          value={value}
          onChange={(v) => setValue(typeof v === 'number' ? v : 0)}
          actions={[
            { label: 'Home', icon: <HomeIcon />, value: 0 },
            { label: 'Favorites', icon: <FavoriteIcon />, value: 1 },
            { label: 'Profile', icon: <PersonIcon />, value: 2 },
          ]}
        />
      </div>
    );
  },
};
