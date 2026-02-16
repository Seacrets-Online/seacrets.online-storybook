import type { Meta, StoryObj } from '@storybook/react';
import LoginTemplate from '../../components/templates/LoginTemplate';
import { Google as GoogleIcon, Apple as AppleIcon } from '@mui/icons-material';

const meta = {
  title: 'Templates/LoginTemplate',
  component: LoginTemplate,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="template-story-wrapper">
        <Story />
      </div>
    ),
  ],
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
      { id: 'google', label: 'Login with Google', icon: <GoogleIcon />, onClick: () => {} },
      { id: 'apple', label: 'Login with Apple', icon: <AppleIcon />, onClick: () => {} },
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
