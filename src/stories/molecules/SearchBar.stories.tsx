import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import SearchBar from '../../components/molecules/SearchBar';

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <Box sx={{ width: 360 }}><Story /></Box>],
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

