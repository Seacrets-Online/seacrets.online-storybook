import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { within } from 'storybook/test';
import DatePicker from '../../components/molecules/DatePicker';
import { withWidth, WIDTH } from '../decorators';

const meta = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  tags: ['test'],
  decorators: [withWidth(WIDTH.narrow)],
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole('button', { name: /choose date/i });
  },
};
