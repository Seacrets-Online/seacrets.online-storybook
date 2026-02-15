import Radio from '../../components/atoms/Radio.jsx';

export default {
  title: 'Atoms/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
};

export const Unchecked = { args: { 'aria-label': 'Option' } };
export const Checked = { args: { checked: true, 'aria-label': 'Option' } };
export const Disabled = { args: { disabled: true, 'aria-label': 'Option' } };
