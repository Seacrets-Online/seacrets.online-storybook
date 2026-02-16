import { Alert as MuiAlert } from '@mui/material';
import type { AlertProps } from '@mui/material';
import { Report as ReportIcon } from '@mui/icons-material';

export const Alert = ({
  severity = 'info',
  variant = 'standard',
  onClose,
  children,
  ...props
}: AlertProps) => (
  <MuiAlert
    severity={severity}
    variant={variant}
    onClose={onClose}
    iconMapping={{
      error: <ReportIcon fontSize="inherit" />,
    }}
    {...props}
  >
    {children}
  </MuiAlert>
);

export default Alert;
