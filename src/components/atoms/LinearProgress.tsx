import { LinearProgress as MuiLinearProgress } from '@mui/material';
import type { LinearProgressProps } from '@mui/material';

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
