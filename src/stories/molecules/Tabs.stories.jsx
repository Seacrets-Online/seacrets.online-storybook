import { useState } from 'react';
import Tabs from '../../components/molecules/Tabs.jsx';

export default {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
};

export const Default = () => {
  const [value, setValue] = useState(0);
  return (
    <Tabs
      value={value}
      onChange={(e, v) => setValue(v)}
      tabs={[
        { label: 'Tab 1', value: 0 },
        { label: 'Tab 2', value: 1 },
        { label: 'Tab 3', value: 2 },
      ]}
    />
  );
};
