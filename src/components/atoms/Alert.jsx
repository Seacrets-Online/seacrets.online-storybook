import MuiAlert from '@mui/material/Alert';

/**
 * Alert atom - MUI Alert with MD3 theme.
 * No design-system imports.
 */
export const Alert = ({
  severity = 'info',
  variant = 'standard',
  onClose,
  children,
  ...props
}) => (
  <MuiAlert severity={severity} variant={variant} onClose={onClose} {...props}>
    {children}
  </MuiAlert>
);

export default Alert;
