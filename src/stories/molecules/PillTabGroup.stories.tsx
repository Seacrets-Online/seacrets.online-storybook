import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import PillTabGroup from '../../components/molecules/PillTabGroup';

const meta = {
  title: 'Molecules/PillTabGroup',
  component: PillTabGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
} satisfies Meta<typeof PillTabGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      { value: 'usuario', label: 'Usuario' },
      { value: 'nombre', label: 'Nombre' },
      { value: 'hashtag', label: '# Hastag' },
      { value: 'palabras', label: 'Palabras' },
    ],
    value: 'usuario',
    onChange: (v) => console.log(v),
  },
};

export const FilterCategories: Story = {
  args: {
    tabs: [
      { value: 'edad', label: 'Edad' },
      { value: 'genero', label: 'Género' },
      { value: 'pais', label: 'Pais' },
    ],
  },
  render: function Render(args) {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <PillTabGroup {...args} value={value} onChange={(v) => setValue(v)} />;
  },
};
