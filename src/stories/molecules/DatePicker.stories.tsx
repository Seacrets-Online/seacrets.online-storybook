import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import DatePicker from '../../components/molecules/DatePicker';

const meta = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 200 }}><Story /></div>],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Date',
    value: '2025-02-13',
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <DatePicker
        {...args}
        onChange={(e) => updateArgs({ value: e.target.value })}
      />
    );
  },
};
