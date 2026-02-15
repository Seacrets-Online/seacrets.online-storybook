import MuiSkeleton from '@mui/material/Skeleton';

/**
 * Skeleton atom - MUI Skeleton with MD3 theme.
 */
export const Skeleton = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  ...props
}) => (
  <MuiSkeleton
    variant={variant}
    width={width}
    height={height}
    animation={animation}
    {...props}
  />
);

export default Skeleton;
