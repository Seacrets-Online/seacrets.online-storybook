import type { Meta, StoryObj } from '@storybook/react';
import BottomSliderPanel from '../../components/organisms/BottomSliderPanel';

const meta = {
  title: 'Organisms/BottomSliderPanel',
  component: BottomSliderPanel,
  parameters: { layout: 'fullscreen', docs: { page: null } },
} satisfies Meta<typeof BottomSliderPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    onClose: () => {},
  },
};
