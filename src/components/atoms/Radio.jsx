import MuiRadio from '@mui/material/Radio';

/**
 * Radio atom - MUI Radio with MD3 theme.
 */
export const Radio = ({
  checked = false,
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}) => (
  <MuiRadio checked={checked} disabled={disabled} aria-label={ariaLabel} {...props} />
);

export default Radio;
