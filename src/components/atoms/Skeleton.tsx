import MuiSkeleton from '@mui/material/Skeleton';
import type { SkeletonProps } from '@mui/material/Skeleton';

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
