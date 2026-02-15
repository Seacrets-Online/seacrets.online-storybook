import AppBar from '../../components/organisms/AppBar.jsx';
import MenuIcon from '@mui/icons-material/Menu';

export default {
  title: 'Organisms/AppBar',
  component: AppBar,
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  args: {
    title: 'App',
    startIcon: <MenuIcon />,
    onStartIconClick: () => {},
  },
};
