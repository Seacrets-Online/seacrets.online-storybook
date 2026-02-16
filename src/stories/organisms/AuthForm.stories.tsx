import type { Meta, StoryObj } from '@storybook/react';
import AuthForm from '../../components/organisms/AuthForm';

const meta: Meta<typeof AuthForm> = {
  title: 'Organisms/AuthForm',
  component: AuthForm,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log('Login', data),
  },
};

export const WithForgotPassword: Story = {
  args: {
    onSubmit: (data) => console.log('Login', data),
    onForgotPassword: () => console.log('Forgot password'),
  },
};
