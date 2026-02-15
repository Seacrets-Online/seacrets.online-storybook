import MuiBadge from '@mui/material/Badge';

/**
 * Badge atom - MUI Badge with MD3 theme.
 */
export const Badge = ({
  badgeContent = 0,
  color = 'primary',
  variant = 'standard',
  invisible = false,
  max = 99,
  children,
  ...props
}) => (
  <MuiBadge
    badgeContent={badgeContent}
    color={color}
    variant={variant}
    invisible={invisible}
    max={max}
    {...props}
  >
    {children}
  </MuiBadge>
);

export default Badge;
