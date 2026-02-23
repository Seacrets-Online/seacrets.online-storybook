import { Meta, StoryObj } from '@storybook/react-vite';
import { FormControlLabel, FormGroup } from '@mui/material';
import { Switch } from '../../components/atoms/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'default'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// 1. Basic Interactive Switch
export const Default: Story = {
  args: {
    'aria-label': 'Enable notifications',
  },
};

// 2. All required states in a single view
export const States: Story = {
  render: () => (
    <FormGroup style={{ gap: '16px' }}>
      <FormControlLabel
        control={<Switch defaultChecked aria-label="Checked state example" />}
        label="Checked"
      />
      <FormControlLabel
        control={<Switch aria-label="Unchecked state example" />}
        label="Unchecked"
      />
      <FormControlLabel
        control={<Switch disabled defaultChecked aria-label="Disabled checked state example" />}
        label="Disabled Checked"
      />
      <FormControlLabel
        control={<Switch disabled aria-label="Disabled unchecked state example" />}
        label="Disabled Unchecked"
      />
    </FormGroup>
  ),
};