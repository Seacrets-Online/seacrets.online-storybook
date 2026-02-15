import Skeleton from '../../components/atoms/Skeleton.jsx';

export default {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
};

export const Text = { args: { width: 200 } };
export const Circular = { args: { variant: 'circular', width: 40, height: 40 } };
export const Rectangular = { args: { variant: 'rectangular', width: 200, height: 100 } };
