import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';
import IconButton from '../atoms/IconButton';
import type { AppBarProps } from '@mui/material/AppBar';

export interface AppBarPropsExtended extends AppBarProps {
  title?: string;
  startIcon?: React.ReactNode;
  onStartIconClick?: () => void;
  endActions?: React.ReactNode;
}

export const AppBar = ({
  title,
  startIcon,
  onStartIconClick,
  endActions,
  ...props
}: AppBarPropsExtended) => (
  <MuiAppBar position="static" {...props}>
    <MuiToolbar>
      {startIcon && (
        <IconButton
          aria-label="Menu"
          onClick={onStartIconClick}
          sx={{ mr: 1 }}
        >
          {startIcon}
        </IconButton>
      )}
      {title && (
        <MuiTypography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </MuiTypography>
      )}
      {endActions}
    </MuiToolbar>
  </MuiAppBar>
);

export default AppBar;
