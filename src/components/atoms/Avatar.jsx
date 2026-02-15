import MuiAvatar from '@mui/material/Avatar';

/**
 * Avatar atom - MUI Avatar with MD3 theme.
 */
export const Avatar = ({
  src,
  alt,
  children,
  variant = 'circular',
  sizes,
  ...props
}) => (
  <MuiAvatar src={src} alt={alt} variant={variant} {...props}>
    {children}
  </MuiAvatar>
);

export default Avatar;
