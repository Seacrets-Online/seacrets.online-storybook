import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RadioGroup from '../../components/molecules/RadioGroup';
const meta: Meta<typeof RadioGroup> = {
  title: 'Molecules/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
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
  },
};
