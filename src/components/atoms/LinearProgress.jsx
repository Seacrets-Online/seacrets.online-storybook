import MuiLinearProgress from '@mui/material/LinearProgress';

/**
 * LinearProgress atom - MUI LinearProgress with MD3 theme.
 */
export const LinearProgress = ({
  variant = 'indeterminate',
  value = 0,
  color = 'primary',
  ...props
}) => (
  <MuiLinearProgress
    variant={variant}
    value={value}
    color={color}
    {...props}
  />
);

export default LinearProgress;
