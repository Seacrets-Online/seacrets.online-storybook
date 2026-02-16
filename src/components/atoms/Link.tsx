import { Link as MuiLink } from '@mui/material';
import type { LinkProps } from '@mui/material';

export const Link = ({
  href,
  underline = 'hover',
  color = 'primary',
  children,
  ...props
}: LinkProps) => (
  <MuiLink href={href} underline={underline} color={color} {...props}>
    {children}
  </MuiLink>
);

export default Link;
