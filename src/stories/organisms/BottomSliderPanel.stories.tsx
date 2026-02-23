import type { Meta, StoryObj } from '@storybook/react-vite';
import BottomSliderPanel from '../../components/organisms/BottomSliderPanel';

const meta = {
  title: 'Organisms/BottomSliderPanel',
  component: BottomSliderPanel,
  tags: ['test'],
} satisfies Meta<typeof BottomSliderPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    onClose: () => {},
  },
};
