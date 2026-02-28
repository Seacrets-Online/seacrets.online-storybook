import { Meta, StoryObj } from '@storybook/react-vite';
import { GoogleLogo } from '../../components/atoms/GoogleLogo';
import tokens from '../../tokens/tokens.json';

const meta: Meta<typeof GoogleLogo> = {
  title: 'Atoms/GoogleLogo',
  component: GoogleLogo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'number' },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof GoogleLogo>;

export const Default: Story = {
  args: {
    color: tokens.seacrets['online/Light'].Schemes['On Primary'].$value,
  },
};