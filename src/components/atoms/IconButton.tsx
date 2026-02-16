import MuiIconButton from '@mui/material/IconButton';
import type { IconButtonProps } from '@mui/material/IconButton';

export interface IconButtonPropsExtended extends IconButtonProps {
  'aria-label'?: string;
}

export const IconButton = ({
  color = 'primary',
  size = 'medium',
  disabled = false,
  'aria-label': ariaLabel,
  children,
  ...props
}: IconButtonPropsExtended) => (
  <MuiIconButton
    color={color}
    size={size}
    disabled={disabled}
    aria-label={ariaLabel}
    {...props}
  >
    {children}
  </MuiIconButton>
);

export default IconButton;
