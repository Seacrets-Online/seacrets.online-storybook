import type { Meta, StoryObj } from '@storybook/react';
import SocialAuthRow from '../../components/organisms/SocialAuthRow';
import { Google as GoogleIcon, Apple as AppleIcon } from '@mui/icons-material';

const meta = {
  title: 'Organisms/SocialAuthRow',
  component: SocialAuthRow,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
} satisfies Meta<typeof SocialAuthRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    providers: [
      { id: 'google', label: 'Continue with Google', icon: <GoogleIcon />, onClick: () => {} },
      { id: 'apple', label: 'Continue with Apple', icon: <AppleIcon />, onClick: () => {} },
    ],
  },
};
