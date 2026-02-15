import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/**
 * Snackbar molecule - MUI Snackbar with Alert.
 */
export const Snackbar = ({
  open,
  onClose,
  message,
  severity = 'info',
  autoHideDuration = 6000,
  ...props
}) => (
  <MuiSnackbar
    open={open}
    onClose={onClose}
    autoHideDuration={autoHideDuration}
    {...props}
  >
    <MuiAlert onClose={onClose} severity={severity} variant="filled">
      {message}
    </MuiAlert>
  </MuiSnackbar>
);

export default Snackbar;
