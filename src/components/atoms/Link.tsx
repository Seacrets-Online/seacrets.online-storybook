import MuiLink from '@mui/material/Link';
import type { LinkProps } from '@mui/material/Link';

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
