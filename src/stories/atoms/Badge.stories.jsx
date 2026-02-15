import Badge from '../../components/atoms/Badge.jsx';
import MailIcon from '@mui/icons-material/Mail';

export default {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
};

export const WithNumber = {
  args: { badgeContent: 4, children: <MailIcon /> },
};

export const Dot = {
  args: { variant: 'dot', children: <MailIcon /> },
};
