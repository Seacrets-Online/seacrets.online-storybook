import type { Meta, StoryObj } from '@storybook/react';
import LoginTemplate from '../../components/templates/LoginTemplate';

const meta: Meta<typeof LoginTemplate> = {
  title: 'Templates/LoginTemplate',
  component: LoginTemplate,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Sign in',
    subtitle: 'Enter your credentials to continue',
    onLogin: (data) => console.log('Login', data),
  },
};

export const WithForgotPassword: Story = {
  args: {
    title: 'Sign in',
    onLogin: (data) => console.log('Login', data),
    onForgotPassword: () => console.log('Forgot password'),
  },
};
