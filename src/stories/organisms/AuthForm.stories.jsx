import AuthForm from '../../components/organisms/AuthForm.jsx';

export default {
  title: 'Organisms/AuthForm',
  component: AuthForm,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    onSubmit: (data) => console.log('Login', data),
  },
};

export const WithForgotPassword = {
  args: {
    onSubmit: (data) => console.log('Login', data),
    onForgotPassword: () => console.log('Forgot password'),
  },
};
