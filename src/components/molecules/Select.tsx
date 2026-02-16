import {
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
  FormControl as MuiFormControl,
  InputLabel as MuiInputLabel,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
  options?: SelectOption[];
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  [key: string]: unknown;
}

export const Select = ({
  label,
  value = '',
  onChange,
  options = [],
  disabled = false,
  error = false,
  fullWidth = true,
  ...props
}: SelectProps) => (
  <MuiFormControl fullWidth={fullWidth} disabled={disabled} error={error}>
    {label && <MuiInputLabel id={`${label}-label`}>{label}</MuiInputLabel>}
    <MuiSelect
      labelId={label ? `${label}-label` : undefined}
      label={label}
      value={value}
      onChange={onChange}
      {...props}
    >
      {options.map((opt) => (
        <MuiMenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MuiMenuItem>
      ))}
    </MuiSelect>
  </MuiFormControl>
);

export default Select;
