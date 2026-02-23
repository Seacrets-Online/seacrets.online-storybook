import type { TextFieldProps } from '@mui/material';
import type { ChangeEvent } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export interface DatePickerProps extends Omit<TextFieldProps, 'variant' | 'type'> {
  label?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const DATE_FORMAT = 'YYYY-MM-DD';

const toPickerValue = (value?: string): Dayjs | null => {
  if (!value) {
    return null;
  }

  const parsedValue = dayjs(value);
  return parsedValue.isValid() ? parsedValue : null;
};

const createChangeEvent = (value: string): ChangeEvent<HTMLInputElement> => {
  return {
    target: {
      value,
    },
  } as ChangeEvent<HTMLInputElement>;
};

export const DatePicker = ({
  label,
  value,
  onChange,
  disabled = false,
  error = false,
  helperText,
  InputLabelProps,
  ...props
}: DatePickerProps) => {
  const pickerValue = toPickerValue(value);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        label={label}
        value={pickerValue}
        format={DATE_FORMAT}
        onChange={(newValue) => {
          const nextValue = newValue?.isValid() ? newValue.format(DATE_FORMAT) : '';
          onChange?.(createChangeEvent(nextValue));
        }}
        disabled={disabled}
        slotProps={{
          textField: {
            ...props,
            variant: 'outlined',
            fullWidth: true,
            error,
            helperText,
            InputLabelProps: {
              shrink: true,
              ...InputLabelProps,
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
