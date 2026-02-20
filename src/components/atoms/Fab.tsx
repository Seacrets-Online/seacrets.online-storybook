import { Fab as MuiFab } from '@mui/material';
import type { FabProps as MuiFabProps, SxProps, Theme } from '@mui/material';
import { shapeTokens } from '../../utils/shapes';

export type FabShape = 'circular' | 'rounded';

export interface FabPropsExtended extends MuiFabProps {
  shape?: FabShape;
}

export const Fab = ({ shape = 'circular', sx, ...props }: FabPropsExtended) => {
  const borderRadius =
    shape === 'rounded' ? (shapeTokens['corner-large'] ?? '16px') : (shapeTokens['corner-full'] ?? '9999px');

  return (
    <MuiFab
      sx={[{ borderRadius }, ...(sx ? [sx] : [])] as SxProps<Theme>}
      {...props}
    />
  );
};

export default Fab;

