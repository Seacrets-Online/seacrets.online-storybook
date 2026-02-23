import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchBar from '../../components/molecules/SearchBar';
import { withWidth, WIDTH } from '../decorators';

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
  decorators: [withWidth(WIDTH.card)],
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search',
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'Seacrets',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('Hello');
    return (
      <SearchBar
        {...args}
        value={value}
        onChange={(next) => setValue(next)}
        onSearch={() => {}}
      />
    );
  },
  args: {
    placeholder: 'Search',
  },
};

