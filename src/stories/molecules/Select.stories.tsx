import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import Select from '../../components/molecules/Select';

const meta = {
  title: 'Molecules/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 200 }}><Story /></div>],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    value: '',
    options: [
      { value: '', label: '(Select)' },
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Select
        {...args}
        onChange={(e) => updateArgs({ value: e.target.value })}
      />
    );
  },
};
