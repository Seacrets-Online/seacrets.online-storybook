import React from 'react';
import { 
  Autocomplete as MuiAutocomplete, 
  AutocompleteProps as MuiAutocompleteProps,
  Paper
} from '@mui/material';
import TextField from './TextField';
import { colorTokens } from '../../utils/colors.generated';

export interface AutocompleteOption {
  label: string;
  value: string | number;
}

export interface AutocompleteProps extends Omit<MuiAutocompleteProps<AutocompleteOption, boolean, boolean, boolean>, 'renderInput'> {
  label: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  width?: string | number;
}

export const Autocomplete = ({ 
  label, 
  placeholder, 
  error, 
  helperText, 
  width = '100%',
  ...props 
}: AutocompleteProps) => {
  const colors = colorTokens.dark;

  return (
    <MuiAutocomplete
      {...props}
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: colors.mdSysColorSurfaceContainer, 
            boxShadow: colors.mdSysColorShadow,
            marginTop: '4px',
            borderRadius: '8px',
            '& .MuiAutocomplete-listbox': {
              color: colors.mdSysColorOnSurface,
              padding: '8px',
            },
            '& .MuiAutocomplete-option[aria-selected="true"]': {
              backgroundColor: colors.mdSysColorSecondaryContainer,
            },
            '& .MuiAutocomplete-option.Mui-focused': {
              backgroundColor: colors.mdSysColorSurfaceVariant,
            }
          }
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          fullWidth
        />
      )}
      sx={{
        
        width: width,
        minWidth: '300px',
        '& .MuiChip-root': {
          backgroundColor: colors.mdSysColorSecondaryContainer,
          color: colors.mdSysColorOnSecondaryContainer,
          maxWidth: 'calc(100% - 20px)',
        },
        '& .MuiInputBase-root': {
          flexWrap: 'wrap', 
        },
        ...props.sx
      }}
    />
  );
};
export default Autocomplete;