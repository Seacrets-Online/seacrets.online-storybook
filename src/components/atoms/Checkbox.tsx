import MuiCheckbox from '@mui/material/Checkbox';
import type { CheckboxProps } from '@mui/material/Checkbox';

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
