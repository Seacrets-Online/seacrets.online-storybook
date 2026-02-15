import Divider from '../../components/atoms/Divider.jsx';

export default {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: { layout: 'centered' },
};

export const Horizontal = { args: {} };
export const Vertical = { args: { orientation: 'vertical', flexItem: true } };
