import { useState } from 'react';
import BottomNavigation from '../../components/organisms/BottomNavigation.jsx';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';

export default {
  title: 'Organisms/BottomNavigation',
  component: BottomNavigation,
  parameters: { layout: 'centered' },
};

export const Default = () => {
  const [value, setValue] = useState(0);
  return (
    <div style={{ width: 360 }}>
      <BottomNavigation
        value={value}
        onChange={setValue}
        actions={[
          { label: 'Home', icon: <HomeIcon />, value: 0 },
          { label: 'Favorites', icon: <FavoriteIcon />, value: 1 },
          { label: 'Profile', icon: <PersonIcon />, value: 2 },
        ]}
      />
    </div>
  );
};
