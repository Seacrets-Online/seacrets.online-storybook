import { Meta, StoryObj } from '@storybook/react-vite';
import { ClearButton } from '../../components/molecules/ClearButton';

const meta: Meta<typeof ClearButton> = {
  title: 'Molecules/ClearButton',
  component: ClearButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    size: { control: 'number' },
    circleColor: { control: 'color' },
    crossColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof ClearButton>;

export const Default: Story = {
  args: {
    'aria-label': 'Eliminar foto',
    size: 55,
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Eliminar foto',
    disabled: true,
    size: 55,
  },
};