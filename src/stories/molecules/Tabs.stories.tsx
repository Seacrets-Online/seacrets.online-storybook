import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import Tabs from '../../components/molecules/Tabs';

const meta = {
  title: 'Molecules/Tabs',
  component: Tabs,
  tags: ['test'],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 0,
    tabs: [
      { label: 'Tab 1', value: 0 },
      { label: 'Tab 2', value: 1 },
      { label: 'Tab 3', value: 2 },
    ],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Tabs
        {...args}
        onChange={(_, v) => updateArgs({ value: v })}
      />
    );
  },
};
