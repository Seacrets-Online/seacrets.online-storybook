import IconButton from '../../components/atoms/IconButton.jsx';
import DeleteIcon from '@mui/icons-material/Delete';

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export const Default = {
  args: {
    children: <DeleteIcon />,
    'aria-label': 'Delete',
  },
};

export const Disabled = {
  args: {
    children: <DeleteIcon />,
    'aria-label': 'Delete',
    disabled: true,
  },
};
