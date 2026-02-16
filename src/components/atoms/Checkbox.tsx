import { Checkbox as MuiCheckbox } from '@mui/material';
import type { CheckboxProps } from '@mui/material';

export const Checkbox = ({
  checked = false,
  disabled = false,
  indeterminate = false,
  'aria-label': ariaLabel,
  ...props
}: CheckboxProps) => (
  <MuiCheckbox
    checked={checked}
    disabled={disabled}
    indeterminate={indeterminate}
    aria-label={ariaLabel}
    {...props}
  />
);

export default Checkbox;
