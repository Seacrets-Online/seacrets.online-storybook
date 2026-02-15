import { useState } from 'react';
import DatePicker from '../../components/molecules/DatePicker.jsx';

export default {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 200 }}><Story /></div>],
};

export const Default = () => {
  const [value, setValue] = useState('2025-02-13');
  return (
    <DatePicker
      label="Date"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
