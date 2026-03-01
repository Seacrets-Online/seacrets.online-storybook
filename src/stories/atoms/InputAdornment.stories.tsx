import type { Meta, StoryObj } from '@storybook/react-vite';
import InputAdornment from '../../components/atoms/InputAdornment';
import Icon from '../../components/atoms/Icon';
import { Star } from '../../icons'; // Asumiendo que usamos este icono de prueba
import { OutlinedInput, FormControl } from '@mui/material';

const meta = {
  title: 'Atoms/InputAdornment',
  component: InputAdornment,
  parameters: { 
    layout: 'centered',
  },
  tags: ['autodocs', 'test'],
  // Envolvemos el adorno en un input básico para que se visualice correctamente en Storybook
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
    // Aquí es donde en el futuro entrará el IconButton de "Limpiar" o "Ver Password"
    children: <Icon icon={Star} sx={{ cursor: 'pointer' }} />, 
  },
};