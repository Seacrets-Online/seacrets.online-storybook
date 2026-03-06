import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Checkbox from '../../components/atoms/Checkbox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const CheckboxWithState = (args: any) => {
  const [checked, setChecked] = useState(args.checked);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Unchecked: Story = {
  render: (args) => <CheckboxWithState {...args} />,
  args: {
    checked: false,
    'aria-label': 'Checkbox',
  },
};

export const Checked: Story = {
  render: (args) => <CheckboxWithState {...args} />,
  args: {
    checked: true,
    'aria-label': 'Checkbox',
  },
};

export const Indeterminate: Story = {
  render: (args) => <CheckboxWithState {...args} />,
  args: {
    checked: false,
    indeterminate: true,
    'aria-label': 'Checkbox',
  },
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
    'aria-label': 'Checkbox',
  },
};
