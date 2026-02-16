import MuiBadge from '@mui/material/Badge';
import type { BadgeProps } from '@mui/material/Badge';

export const Badge = ({
  badgeContent = 0,
  color = 'primary',
  variant = 'standard',
  invisible = false,
  max = 99,
  children,
  ...props
}: BadgeProps) => (
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
