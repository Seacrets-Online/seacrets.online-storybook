import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import SegmentedControl from '../../components/molecules/SegmentedControl';

const meta = {
  title: 'Molecules/SegmentedControl',
  component: SegmentedControl,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof meta>;

const searchTypeTabs = [
  { value: 'usuario', label: 'Usuario' },
  { value: 'nombre', label: 'Nombre' },
  { value: 'hashtag', label: '# Hastag' },
  { value: 'palabras', label: 'Palabras' },
];

export const Default: Story = {
  args: {
    tabs: searchTypeTabs,
    value: 'usuario',
    onChange: (v) => console.log(v),
  },
};

export const Interactive: Story = {
  args: {
    tabs: searchTypeTabs,
  },
  render: function Render(args) {
    const [value, setValue] = useState('usuario');
    return (
      <SegmentedControl
        {...args}
        value={value}
        onChange={(v) => setValue(v)}
        sx={{ width: 320 }}
      />
    );
  },
};
