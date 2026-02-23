import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import LanguagePopper from '../../components/molecules/LanguagePopper';

const meta = {
  title: 'Molecules/LanguagePopper',
  component: LanguagePopper,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
} satisfies Meta<typeof LanguagePopper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? 'en');
    return (
      <LanguagePopper
        {...args}
        value={value}
        onChange={(code) => setValue(code)}
      />
    );
  },
  args: {
    value: 'en',
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Language',
  },
};

