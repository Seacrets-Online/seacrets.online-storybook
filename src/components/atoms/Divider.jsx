import MuiDivider from '@mui/material/Divider';

/**
 * Divider atom - MUI Divider with MD3 theme.
 */
export const Divider = ({
  orientation = 'horizontal',
  variant = 'fullWidth',
  flexItem,
  ...props
}) => (
  <MuiDivider
    orientation={orientation}
    variant={variant}
    flexItem={flexItem}
    {...props}
  />
);

export default Divider;
