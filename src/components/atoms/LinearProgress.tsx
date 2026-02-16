import MuiLinearProgress from '@mui/material/LinearProgress';
import type { LinearProgressProps } from '@mui/material/LinearProgress';

export const LinearProgress = ({
  variant = 'indeterminate',
  value = 0,
  color = 'primary',
  ...props
}: LinearProgressProps) => (
  <MuiLinearProgress
    variant={variant}
    value={value}
    color={color}
    {...props}
  />
);

export default LinearProgress;
