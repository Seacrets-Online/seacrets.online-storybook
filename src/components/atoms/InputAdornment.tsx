import { InputAdornment as MuiInputAdornment } from '@mui/material';
import type { InputAdornmentProps as MuiInputAdornmentProps } from '@mui/material';
import { Text } from './Text';

export interface InputAdornmentProps extends MuiInputAdornmentProps {
  text?: string;
}

export const InputAdornment = ({ text, children, position, ...props }: InputAdornmentProps) => {
  return (
    <MuiInputAdornment position={position} {...props}>
      {text ? (
        <Text variant="body-large" color="text.secondary">
          {text}
        </Text>
      ) : (
        children
      )}
    </MuiInputAdornment>
  );
};

export default InputAdornment;