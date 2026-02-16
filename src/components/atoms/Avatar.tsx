import { Avatar as MuiAvatar } from '@mui/material';
import type { AvatarProps } from '@mui/material';

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
