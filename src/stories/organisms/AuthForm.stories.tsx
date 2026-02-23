import type { Meta, StoryObj } from '@storybook/react-vite';
import AuthForm from '../../components/organisms/AuthForm';
import { withWidth, WIDTH } from '../decorators';

const meta = {
  title: 'Organisms/AuthForm',
  component: AuthForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
  decorators: [withWidth(WIDTH.card)],
} satisfies Meta<typeof AuthForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: () => {},
  },
};

export const WithForgotPassword: Story = {
  args: {
    onSubmit: () => {},
    onForgotPassword: () => {},
  },
};

export const WithRememberMe: Story = {
  args: {
    onSubmit: () => {},
    onForgotPassword: () => {},
    showRememberMe: true,
  },
};

export const ForgotPassword: Story = {
  args: {
    mode: 'forgotPassword',
    onRequestReset: (email: string) => console.log('Request reset for', email),
  },
};
