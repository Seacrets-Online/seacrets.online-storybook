import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '../../components/atoms/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: {
    checked: false,
    'aria-label': 'Checkbox',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    'aria-label': 'Checkbox',
  },
};

export const Indeterminate: Story = {
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
