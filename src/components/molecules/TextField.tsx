import { useState } from 'react';
import { TextField as MuiTextField, InputAdornment } from '@mui/material';
import type { TextFieldProps, SxProps, Theme } from '@mui/material';
import IconButton from '../atoms/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export type TextFieldPropsExtended = Omit<TextFieldProps, 'variant' | 'InputProps'> & {
  variant?: TextFieldProps['variant'];
  InputProps?: TextFieldProps['InputProps'];
  showPasswordToggle?: boolean;
};

const baseTextFieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'var(--md-sys-color-surface-container-lowest)',
  },
  '& .MuiInputLabel-root': {
    transform: 'translate(14px, 16px) scale(1)',
    '&.Mui-focused, &.MuiFormLabel-filled': {
      transform: 'translate(14px, -9px) scale(0.75)',
    },
  },
};

export const TextField = ({
  type: typeProp = 'text',
  label,
  placeholder,
  value,
  defaultValue,
  disabled = false,
  required = false,
  error = false,
  helperText,
  showPasswordToggle,
  variant = 'outlined',
  InputProps: inputPropsProp,
  sx,
  ...props
}: TextFieldPropsExtended) => {
  const isPassword = typeProp === 'password';
  const [showPassword, setShowPassword] = useState(false);
  const type = isPassword && showPassword ? 'text' : typeProp;
  const showToggle = showPasswordToggle ?? isPassword;

  const endAdornment =
    isPassword && showToggle ? (
      <InputAdornment position="end">
        <IconButton
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((v) => !v)}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ) : null;

  return (
    <MuiTextField
      type={type}
      label={label}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      required={required}
      error={error}
      helperText={helperText}
      variant={variant}
      fullWidth
      InputProps={{
        ...inputPropsProp,
        endAdornment: endAdornment ?? inputPropsProp?.endAdornment,
      }}
      sx={[baseTextFieldSx, ...(sx ? [sx] : [])] as SxProps<Theme>}
      {...props}
    />
  );
};

export default TextField;
