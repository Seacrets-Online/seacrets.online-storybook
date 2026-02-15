import { useState } from 'react';
import RadioGroup from '../../components/molecules/RadioGroup.jsx';

export default {
  title: 'Molecules/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered' },
};

export const Default = () => {
  const [value, setValue] = useState('a');
  return (
    <RadioGroup
      value={value}
      onChange={(e) => setValue(e.target.value)}
      options={[
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
        { value: 'c', label: 'Option C' },
      ]}
    />
  );
};
