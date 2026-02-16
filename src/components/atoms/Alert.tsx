import MuiAlert from '@mui/material/Alert';
import type { AlertProps } from '@mui/material/Alert';

export const Alert = ({
  severity = 'info',
  variant = 'standard',
  onClose,
  children,
  ...props
}: AlertProps) => (
  <MuiAlert severity={severity} variant={variant} onClose={onClose} {...props}>
    {children}
  </MuiAlert>
);

export default Alert;
