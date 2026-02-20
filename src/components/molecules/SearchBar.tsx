import { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import type { SxProps, TextFieldProps, Theme } from '@mui/material';
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import IconButton from '../atoms/IconButton';

export interface SearchBarProps
  extends Omit<TextFieldProps, 'value' | 'defaultValue' | 'onChange' | 'type' | 'label'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  inputAriaLabel?: string;
  clearAriaLabel?: string;
}

const rootSx: SxProps<Theme> = {
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '9999px',
    bgcolor: 'var(--md-sys-color-surface-container-low)',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
};

export const SearchBar = ({
  value: valueProp,
  defaultValue = '',
  onChange,
  onSearch,
  placeholder = 'Search',
  inputAriaLabel = 'Search',
  clearAriaLabel = 'Clear search',
  inputProps: inputPropsProp,
  onKeyDown: onKeyDownProp,
  InputProps,
  sx,
  ...props
}: SearchBarProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const value = valueProp ?? uncontrolledValue;

  const setValue = (next: string) => {
    if (valueProp === undefined) {
      setUncontrolledValue(next);
    }
    onChange?.(next);
  };

  const showClear = value.length > 0;

  return (
    <TextField
      {...props}
      value={value}
      placeholder={placeholder}
      inputProps={{
        ...inputPropsProp,
        'aria-label': inputAriaLabel,
      }}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        onKeyDownProp?.(e);
        if (e.key === 'Enter') {
          onSearch?.(value);
        }
      }}
      InputProps={{
        ...InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
        endAdornment: showClear ? (
          <InputAdornment position="end">
            <IconButton
              aria-label={clearAriaLabel}
              onClick={() => setValue('')}
              color="inherit"
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : (
          InputProps?.endAdornment
        ),
      }}
      sx={[rootSx, ...(sx ? [sx] : [])] as SxProps<Theme>}
    />
  );
};

export default SearchBar;

