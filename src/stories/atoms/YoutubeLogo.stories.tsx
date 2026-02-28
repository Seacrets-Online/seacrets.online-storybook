import { Meta, StoryObj } from '@storybook/react-vite';
import { YoutubeLogo } from '../../components/atoms/YoutubeLogo';

const meta: Meta<typeof YoutubeLogo> = {
  title: 'Atoms/YoutubeLogo',
  component: YoutubeLogo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof YoutubeLogo>;

export const Default: Story = {
  args: {
    size: 48,
  },
};