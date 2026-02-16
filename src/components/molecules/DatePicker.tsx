import { TextField as MuiTextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

export interface DatePickerProps extends Omit<TextFieldProps, 'variant' | 'type'> {
  label?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export const DatePicker = ({
  label,
  value,
  onChange,
  disabled = false,
  error = false,
  helperText,
  ...props
}: DatePickerProps) => (
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
