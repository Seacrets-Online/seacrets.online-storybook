import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Snackbar from '../../components/molecules/Snackbar';
import Button from '../../components/atoms/Button';

const meta: Meta<typeof Snackbar> = {
  title: 'Molecules/Snackbar',
  component: Snackbar,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Snackbar</Button>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          message="Message sent"
        />
      </>
    );
  },
};
