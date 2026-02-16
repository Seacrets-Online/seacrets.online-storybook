import MuiSelect from '@mui/material/Select';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiFormControl from '@mui/material/FormControl';
import MuiInputLabel from '@mui/material/InputLabel';
import type { SelectChangeEvent } from '@mui/material/Select';

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
