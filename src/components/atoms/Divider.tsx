import MuiDivider from '@mui/material/Divider';
import type { DividerProps } from '@mui/material/Divider';

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
