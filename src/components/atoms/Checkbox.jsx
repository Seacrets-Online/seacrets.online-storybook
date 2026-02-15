import MuiCheckbox from '@mui/material/Checkbox';

/**
 * Checkbox atom - MUI Checkbox with MD3 theme.
 * No design-system imports.
 */
export const Checkbox = ({
  checked = false,
  disabled = false,
  indeterminate = false,
  'aria-label': ariaLabel,
  ...props
}) => (
  <MuiCheckbox
    checked={checked}
    disabled={disabled}
    indeterminate={indeterminate}
    aria-label={ariaLabel}
    {...props}
  />
);

export default Checkbox;
