import type { Meta, StoryObj } from '@storybook/react';
import SocialAuthRow from '../../components/organisms/SocialAuthRow';

const meta: Meta<typeof SocialAuthRow> = {
  title: 'Organisms/SocialAuthRow',
  component: SocialAuthRow,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    providers: [
      { id: 'google', label: 'Continue with Google', onClick: () => {} },
      { id: 'apple', label: 'Continue with Apple', onClick: () => {} },
    ],
  },
};
