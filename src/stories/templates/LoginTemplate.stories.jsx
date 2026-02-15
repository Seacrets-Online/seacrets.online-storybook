import LoginTemplate from '../../components/templates/LoginTemplate.jsx';

export default {
  title: 'Templates/LoginTemplate',
  component: LoginTemplate,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  args: {
    title: 'Sign in',
    subtitle: 'Enter your credentials to continue',
    onLogin: (data) => console.log('Login', data),
  },
};

export const WithForgotPassword = {
  args: {
    title: 'Sign in',
    onLogin: (data) => console.log('Login', data),
    onForgotPassword: () => console.log('Forgot password'),
  },
};
