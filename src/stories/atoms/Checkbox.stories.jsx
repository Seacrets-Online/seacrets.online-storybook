import Checkbox from '../../components/atoms/Checkbox.jsx';

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
};

export const Unchecked = {
  args: {
    checked: false,
    'aria-label': 'Checkbox',
  },
};

export const Checked = {
  args: {
    checked: true,
    'aria-label': 'Checkbox',
  },
};

export const Indeterminate = {
  args: {
    checked: false,
    indeterminate: true,
    'aria-label': 'Checkbox',
  },
};

export const Disabled = {
  args: {
    checked: true,
    disabled: true,
    'aria-label': 'Checkbox',
  },
};
