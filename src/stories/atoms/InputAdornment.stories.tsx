import type { Meta, StoryObj } from '@storybook/react-vite';
import InputAdornment from '../../components/atoms/InputAdornment';
import Icon from '../../components/atoms/Icon';
import { Star } from '../../icons';
import { OutlinedInput, FormControl } from '@mui/material';

const meta = {
  title: 'Atoms/InputAdornment',
  component: InputAdornment,
  parameters: { 
    layout: 'centered',
  },
  tags: ['autodocs', 'test'],
  decorators: [
    (Story, context) => {
      const isStart = context.args.position === 'start';
      return (
        <FormControl sx={{ width: '250px' }}>
          <OutlinedInput 
            placeholder="Campo de prueba..."
            startAdornment={isStart ? <Story /> : undefined}
            endAdornment={!isStart ? <Story /> : undefined}
          />
        </FormControl>
      );
    },
  ],
} satisfies Meta<typeof InputAdornment>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextStart: Story = {
  args: {
    position: 'start',
    text: 'https://',
  },
};

export const TextEnd: Story = {
  args: {
    position: 'end',
    text: 'kg',
  },
};

export const IconStart: Story = {
  args: {
    position: 'start',
    children: <Icon icon={Star} />,
  },
};

export const ActionEnd: Story = {
  args: {
    position: 'end',
    children: <Icon icon={Star} sx={{ cursor: 'pointer' }} />, 
  },
};