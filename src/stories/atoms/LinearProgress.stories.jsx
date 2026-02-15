import LinearProgress from '../../components/atoms/LinearProgress.jsx';

export default {
  title: 'Atoms/LinearProgress',
  component: LinearProgress,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};

export const Indeterminate = { args: {} };
export const Determinate = { args: { variant: 'determinate', value: 60 } };
