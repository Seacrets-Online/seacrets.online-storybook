import type { Meta, StoryObj } from '@storybook/react-vite';
import LoginTemplate from '../../components/templates/LoginTemplate';
import { Google as GoogleIcon, Apple as AppleIcon } from '@mui/icons-material';
import { withFullscreen } from '../decorators';

const meta = {
  title: 'Templates/LoginTemplate',
  component: LoginTemplate,
  tags: ['test'],
  decorators: [withFullscreen],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof LoginTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    variant: 'login',
    onLogin: () => {},
    onForgotPassword: () => {},
    languageValue: 'en',
    onLanguageChange: (code: string) => console.log('Language changed to', code),
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
    forgotPasswordTitle: 'Forgot password?',
    forgotPasswordSubtitle: "Enter your email and we'll send you a reset link.",
    onRequestReset: (email: string) => console.log('Request reset for', email),
    onBackToLogin: () => {},
  },
};
