import type { Meta, StoryObj } from '@storybook/react';
import LoginTemplate from '../../components/templates/LoginTemplate';
import { Google as GoogleIcon, Apple as AppleIcon } from '@mui/icons-material';
import { withTemplateStoryWrapper } from '../decorators/templateStoryWrapper';

const meta = {
  title: 'Templates/LoginTemplate',
  component: LoginTemplate,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [withTemplateStoryWrapper],
} satisfies Meta<typeof LoginTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    variant: 'login',
    onLogin: () => {},
    onForgotPassword: () => {},
    onLanguageClick: () => {},
    providers: [
      { id: 'google', label: 'LOGIN WITH GOOGLE', icon: <GoogleIcon />, onClick: () => {} },
      { id: 'apple', label: 'LOGIN WITH APPLE', icon: <AppleIcon />, onClick: () => {} },
    ],
    onCreateAccount: () => {},
    onPrivacyTermsClick: () => {},
  },
};

export const ForgotPassword: Story = {
  args: {
    screen: 'forgotPassword',
    variant: 'default',
    title: 'Forgot password?',
    subtitle: "Enter your email and we'll send you a reset link.",
    onRequestReset: (email: string) => console.log('Request reset for', email),
    onBackToLogin: () => {},
  },
};
