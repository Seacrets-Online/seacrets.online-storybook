import type { Meta, StoryObj } from '@storybook/react-vite';
import GlobalHeader from '../../components/organisms/GlobalHeader';
import { withMobileWidth } from '../decorators';

const meta = {
  title: 'Organisms/GlobalHeader',
  component: GlobalHeader,
  tags: ['test'],
  decorators: [withMobileWidth()],
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
