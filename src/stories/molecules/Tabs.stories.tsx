import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tabs from '../../components/molecules/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <Tabs
        value={value}
        onChange={(_e, v) => setValue(v)}
        tabs={[
          { label: 'Tab 1', value: 0 },
          { label: 'Tab 2', value: 1 },
          { label: 'Tab 3', value: 2 },
        ]}
      />
    );
  },
};
