import MuiIconButton from '@mui/material/IconButton';

/**
 * IconButton atom - MUI IconButton with MD3 theme.
 * No design-system imports.
 */
export const IconButton = ({
  color = 'primary',
  size = 'medium',
  disabled = false,
  'aria-label': ariaLabel,
  children,
  ...props
}) => (
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
