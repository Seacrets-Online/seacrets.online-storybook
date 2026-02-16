import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import type { SnackbarProps } from '@mui/material/Snackbar';
import type { AlertColor } from '@mui/material/Alert';

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
