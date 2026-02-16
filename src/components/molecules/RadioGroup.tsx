import { RadioGroup as MuiRadioGroup, FormControlLabel as MuiFormControlLabel } from '@mui/material';
import type { RadioGroupProps } from '@mui/material';
import Radio from '../atoms/Radio';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupPropsExtended extends Omit<RadioGroupProps, 'children'> {
  options?: RadioOption[];
  disabled?: boolean;
}

export const RadioGroup = ({
  value,
  onChange,
  name,
  row = false,
  options = [],
  disabled = false,
  ...props
}: RadioGroupPropsExtended) => (
  <MuiRadioGroup
    value={value}
    onChange={onChange}
    name={name}
    row={row}
    {...props}
  >
    {options.map((opt) => (
      <MuiFormControlLabel
        key={opt.value}
        value={opt.value}
        control={<Radio disabled={disabled} />}
        label={opt.label}
        disabled={disabled}
      />
    ))}
  </MuiRadioGroup>
);

export default RadioGroup;
