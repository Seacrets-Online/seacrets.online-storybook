import MuiRadio from '@mui/material/Radio';
import type { RadioProps } from '@mui/material/Radio';

export const Radio = ({
  checked = false,
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}: RadioProps) => (
  <MuiRadio checked={checked} disabled={disabled} aria-label={ariaLabel} {...props} />
);

export default Radio;
