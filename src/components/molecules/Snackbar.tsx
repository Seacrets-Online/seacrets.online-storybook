import { Snackbar as MuiSnackbar, Alert as MuiAlert } from '@mui/material';
import type { SnackbarProps, AlertColor } from '@mui/material';

export interface SnackbarPropsExtended extends Omit<SnackbarProps, 'children' | 'onClose'> {
  message?: React.ReactNode;
  severity?: AlertColor;
  onClose?: () => void;
}

export const Snackbar = ({
  open,
  onClose,
  message,
  severity = 'info',
  autoHideDuration = 6000,
  ...props
}: SnackbarPropsExtended) => (
  <MuiSnackbar
    open={open}
    onClose={onClose}
    autoHideDuration={autoHideDuration}
    {...props}
  >
    <MuiAlert onClose={onClose ? () => onClose() : undefined} severity={severity} variant="filled">
      {message}
    </MuiAlert>
  </MuiSnackbar>
);

export default Snackbar;
