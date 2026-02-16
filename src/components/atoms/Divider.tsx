import { Divider as MuiDivider } from '@mui/material';
import type { DividerProps } from '@mui/material';

export const Divider = ({
  orientation = 'horizontal',
  variant = 'fullWidth',
  flexItem,
  ...props
}: DividerProps) => (
  <MuiDivider
    orientation={orientation}
    variant={variant}
    flexItem={flexItem}
    {...props}
  />
);

export default Divider;
