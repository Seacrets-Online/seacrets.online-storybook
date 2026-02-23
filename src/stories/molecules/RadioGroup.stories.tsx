import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import RadioGroup from '../../components/molecules/RadioGroup';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

const meta = {
  title: 'Molecules/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered' },
  tags: ['test'],
  args: {
    value: 'a',
    name: 'radio-demo',
    options,
  },
  argTypes: {
    value: {
      control: 'radio',
      options: ['a', 'b', 'c'],
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <RadioGroup
        {...args}
        onChange={(e) => updateArgs({ value: e.target.value })}
      />
    );
  },
};
