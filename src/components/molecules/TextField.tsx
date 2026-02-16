import { useState } from 'react';
import MuiTextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '../atoms/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export interface TextFieldPropsExtended extends Omit<TextFieldProps, 'variant'> {
  showPasswordToggle?: boolean;
}

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
      variant="outlined"
      fullWidth
      InputProps={{
        endAdornment,
      }}
      {...props}
    />
  );
};

export default TextField;
