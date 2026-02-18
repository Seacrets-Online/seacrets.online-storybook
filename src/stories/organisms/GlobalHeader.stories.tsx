import type { Meta, StoryObj } from '@storybook/react';
import GlobalHeader from '../../components/organisms/GlobalHeader';

const meta = {
  title: 'Organisms/GlobalHeader',
  component: GlobalHeader,
  parameters: { layout: 'centered', docs: { page: null } },
  decorators: [
    (Story) => (
      <div style={{ width: 390, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GlobalHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    balance: '$300',
    onProfileClick: () => {},
    onBalanceClick: () => {},
    onNavClick: (v) => console.log('Nav', v),
  },
};
