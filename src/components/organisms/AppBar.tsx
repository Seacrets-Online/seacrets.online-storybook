import { AppBar as MuiAppBar, Toolbar as MuiToolbar, Typography as MuiTypography } from '@mui/material';
import type { AppBarProps } from '@mui/material';
import IconButton from '../atoms/IconButton';

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
          sx={(t) => ({ mr: t.layout.space8 })}
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
