import { Meta, StoryObj } from '@storybook/react-vite';
import { PaymentsBadges } from '../../components/atoms/PaymentsBadges';

const meta: Meta<typeof PaymentsBadges> = {
  title: 'Atoms/PaymentsBadges',
  component: PaymentsBadges,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof PaymentsBadges>;

export const Default: Story = {
  args: {
    size: 48,
  },
};