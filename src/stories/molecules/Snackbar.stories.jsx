import { useState } from 'react';
import Snackbar from '../../components/molecules/Snackbar.jsx';
import Button from '../../components/atoms/Button.jsx';

export default {
  title: 'Molecules/Snackbar',
  component: Snackbar,
  parameters: { layout: 'centered' },
};

export const Default = () => {
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
};
