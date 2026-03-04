import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material';
import { spacingTokens } from '../../utils/spacing.generated';

export interface BoxProps extends MuiBoxProps {
  /** Espaciado entre elementos (gap). Usa los tokens de spacing del sistema. */
  gap?: keyof typeof spacingTokens;
  /** Dirección del flujo: 'row' (fila) o 'column' (columna). */
  direction?: 'row' | 'column';
}

export const Box = ({ 
  gap, 
  direction = 'row', 
  display = 'flex', 
  sx, 
  ...props 
}: BoxProps) => {
  return (
    <MuiBox
      display={display}
      flexDirection={direction}
      gap={gap ? spacingTokens[gap] : undefined}
      sx={{
        ...sx,
      }}
      {...props}
    />
  );
};

export default Box;