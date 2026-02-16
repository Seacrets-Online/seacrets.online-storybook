import { Skeleton as MuiSkeleton } from '@mui/material';
import type { SkeletonProps } from '@mui/material';

export const Skeleton = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  ...props
}: SkeletonProps) => (
  <MuiSkeleton
    variant={variant}
    width={width}
    height={height}
    animation={animation}
    {...props}
  />
);

export default Skeleton;
