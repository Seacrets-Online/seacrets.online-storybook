import MuiLink from '@mui/material/Link';

/**
 * Link atom - MUI Link with MD3 theme.
 * No design-system imports.
 */
export const Link = ({
  href,
  underline = 'hover',
  color = 'primary',
  children,
  ...props
}) => (
  <MuiLink href={href} underline={underline} color={color} {...props}>
    {children}
  </MuiLink>
);

export default Link;
