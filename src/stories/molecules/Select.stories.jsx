import { useState } from 'react';
import Select from '../../components/molecules/Select.jsx';

export default {
  title: 'Molecules/Select',
  component: Select,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 200 }}><Story /></div>],
};

export const Default = () => {
  const [value, setValue] = useState('');
  return (
    <Select
      label="Label"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      options={[
        { value: '', label: '(Select)' },
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
      ]}
    />
  );
};
