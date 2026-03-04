import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import FormControlLabel from '../../components/molecules/FormControlLabel';
import Switch from '../../components/atoms/Switch';
import Checkbox from '../../components/atoms/Checkbox';

const meta = {
  title: 'Molecules/FormControlLabel',
  component: FormControlLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test'],
  args: {
    label: 'Label por defecto',
    control: <Switch aria-label="default" />,
  },
} satisfies Meta<typeof FormControlLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

const SwitchWithState = ({ ariaLabel, initialChecked, ...props }: any) => {
  const [checked, setChecked] = useState(initialChecked ?? false);
  return (
    <Switch
      aria-label={ariaLabel}
      checked={checked}
      onChange={(e: any) => setChecked(e.target.checked)}
      {...props}
    />
  );
};

const CheckboxWithState = ({ ariaLabel, initialChecked, ...props }: any) => {
  const [checked, setChecked] = useState(initialChecked ?? false);
  return (
    <Checkbox
      aria-label={ariaLabel}
      checked={checked}
      onChange={(e: any) => setChecked(e.target.checked)}
      {...props}
    />
  );
};

export const WithSwitch: Story = {
  args: {
    label: 'Enable notifications',
    control: <SwitchWithState ariaLabel="Enable notifications" />,
  },
  render: (args) => <FormControlLabel {...args} />,
};

export const WithCheckbox: Story = {
  args: {
    label: 'I accept the terms and conditions',
    control: <CheckboxWithState ariaLabel="Checkbox" />,
  },
  render: (args) => <FormControlLabel {...args} />,
};

export const Disabled: Story = {
  args: {
    label: 'Option not available',
    control: <SwitchWithState ariaLabel="Option not available" disabled />,
    disabled: true,
  },
  render: (args) => <FormControlLabel {...args} />,
};

export const LabelPlacementTop: Story = {
  args: {
    label: 'Up',
    control: <SwitchWithState ariaLabel="Up" />,
    labelPlacement: 'top',
  },
  render: (args) => <FormControlLabel {...args} />,
};