import Chip from '../../components/molecules/Chip.jsx';

export default {
  title: 'Molecules/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
};

export const Filled = { args: { label: 'Chip' } };
export const Outlined = { args: { label: 'Chip', variant: 'outlined' } };
export const Deletable = { args: { label: 'Deletable', onDelete: () => {} } };
