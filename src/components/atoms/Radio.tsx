import { forwardRef } from 'react';
import { Radio as MuiRadio } from '@mui/material';
import type { RadioProps } from '@mui/material';

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(function Radio(
  { disabled = false, 'aria-label': ariaLabel, ...props },
  ref
) {
  return (
    <MuiRadio
      ref={ref}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    />
  );
});

export default Radio;
