import type { Meta, StoryObj } from '@storybook/react-vite';
import TextField from '../../components/molecules/TextField';
import { withWidth, WIDTH } from '../decorators';

const meta = {
  title: 'Molecules/TextField',
  component: TextField,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
  decorators: [withWidth(WIDTH.form)],
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

export const WithPasswordToggle: Story = {
  args: {
    label: 'Password',
    type: 'password',
    showPasswordToggle: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    error: true,
    helperText: 'Invalid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    defaultValue: 'Disabled value',
  },
};
