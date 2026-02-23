import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import Snackbar from '../../components/molecules/Snackbar';
import Button from '../../components/atoms/Button';

const meta = {
  title: 'Molecules/Snackbar',
  component: Snackbar,
  tags: ['test'],
} satisfies Meta<typeof Snackbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false,
    message: 'Message sent',
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <>
        <Button onClick={() => updateArgs({ open: true })}>Open Snackbar</Button>
        <Snackbar
          {...args}
          onClose={() => updateArgs({ open: false })}
        />
      </>
    );
  },
};
