import { Meta, StoryObj } from '@storybook/react-vite';
import { FacebookLogo } from '../../components/atoms/FacebookLogo';

const meta: Meta<typeof FacebookLogo> = {
  title: 'Atoms/FacebookLogo',
  component: FacebookLogo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof FacebookLogo>;

export const Default: Story = {
  args: {
    size: 48,
  },
};