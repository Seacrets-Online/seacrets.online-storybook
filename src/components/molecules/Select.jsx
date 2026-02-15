import MuiSelect from '@mui/material/Select';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiFormControl from '@mui/material/FormControl';
import MuiInputLabel from '@mui/material/InputLabel';

/**
 * Select molecule - MUI Select with label.
 * Composes MUI primitives (no atoms).
 */
export const Select = ({
  label,
  value = '',
  onChange,
  options = [],
  disabled = false,
  error = false,
  fullWidth = true,
  ...props
}) => (
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
