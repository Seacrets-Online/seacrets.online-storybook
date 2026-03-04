import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '../../components/atoms/Box';
import Button from '../../components/atoms/Button';

const meta = {
  title: 'Atoms/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalStack: Story = {
  args: {
    direction: 'row',
    gap: '2',
    children: [
      <Button key="1">Botón 1</Button>,
      <Button key="2" variant="outlined">Botón 2</Button>
    ],
  },
};

export const VerticalStack: Story = {
  args: {
    direction: 'column',
    gap: '4',
    children: [
      <Button key="1">Opción A</Button>,
      <Button key="2">Opción B</Button>,
      <Button key="3">Opción C</Button>
    ],
  },
};