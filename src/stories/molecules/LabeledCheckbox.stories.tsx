import type { Meta, StoryObj } from '@storybook/react';
import LabeledCheckbox from '../../components/molecules/LabeledCheckbox';

const meta = {
  title: 'Molecules/LabeledCheckbox',
  component: LabeledCheckbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof LabeledCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Remember me',
  },
};

export const Checked: Story = {
  args: {
    label: 'Remember me',
    checkboxProps: { defaultChecked: true },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Remember me',
    disabled: true,
  },
};
