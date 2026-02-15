import Alert from '../../components/atoms/Alert.jsx';

export default {
  title: 'Atoms/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
    },
  },
};

export const Info = {
  args: {
    severity: 'info',
    children: 'This is an info alert.',
  },
};

export const Success = {
  args: {
    severity: 'success',
    children: 'This is a success alert.',
  },
};

export const Warning = {
  args: {
    severity: 'warning',
    children: 'This is a warning alert.',
  },
};

export const Error = {
  args: {
    severity: 'error',
    children: 'This is an error alert.',
  },
};
