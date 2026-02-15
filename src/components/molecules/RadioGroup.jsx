import MuiRadioGroup from '@mui/material/RadioGroup';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import Radio from '../atoms/Radio.jsx';

/**
 * RadioGroup molecule - MUI RadioGroup with RadioLabel.
 * Composes Radio atom.
 */
export const RadioGroup = ({
  value,
  onChange,
  name,
  row = false,
  options = [],
  disabled = false,
  ...props
}) => (
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
