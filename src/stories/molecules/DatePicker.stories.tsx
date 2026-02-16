import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from '../../components/molecules/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 200 }}><Story /></div>],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('2025-02-13');
    return (
      <DatePicker
        label="Date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};
