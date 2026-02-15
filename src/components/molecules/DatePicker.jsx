import MuiTextField from '@mui/material/TextField';

/**
 * DatePicker molecule - Wrapper for date input.
 * Uses native date input for simplicity (no @mui/x-date-pickers dep).
 */
export const DatePicker = ({
  label,
  value,
  onChange,
  disabled = false,
  error = false,
  helperText,
  ...props
}) => (
  <MuiTextField
    type="date"
    label={label}
    value={value}
    onChange={onChange}
    disabled={disabled}
    error={error}
    helperText={helperText}
    variant="outlined"
    fullWidth
    InputLabelProps={{ shrink: true }}
    {...props}
  />
);

export default DatePicker;
