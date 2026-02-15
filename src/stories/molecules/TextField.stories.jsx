import TextField from '../../components/molecules/TextField.jsx';

export default {
  title: 'Molecules/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

export const WithPasswordToggle = {
  args: {
    label: 'Password',
    type: 'password',
    showPasswordToggle: true,
  },
};

export const Error = {
  args: {
    label: 'Email',
    error: true,
    helperText: 'Invalid email address',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled',
    disabled: true,
    defaultValue: 'Disabled value',
  },
};
