import MuiAvatar from '@mui/material/Avatar';
import type { AvatarProps } from '@mui/material/Avatar';

export const Avatar = ({
  src,
  alt,
  children,
  variant = 'circular',
  ...props
}: AvatarProps) => (
  <MuiAvatar src={src} alt={alt} variant={variant} {...props}>
    {children}
  </MuiAvatar>
);

export default Avatar;
