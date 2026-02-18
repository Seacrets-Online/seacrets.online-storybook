import { FormControlLabel as MuiFormControlLabel } from '@mui/material';
import type { CheckboxProps, FormControlLabelProps, SxProps, Theme } from '@mui/material';
import Checkbox from '../atoms/Checkbox';

export interface LabeledCheckboxProps
  extends Omit<FormControlLabelProps, 'control'> {
  control?: React.ReactElement;
  checkboxProps?: CheckboxProps;
}

const baseLabeledCheckboxSx = {
  alignItems: 'center',
  '& > .MuiButtonBase-root': { marginTop: '1px', alignSelf: 'center' },
} as const;

export const LabeledCheckbox = ({
  label,
  control,
  checkboxProps,
  sx,
  ...props
}: LabeledCheckboxProps) => {
  const { sx: checkboxSx, ...restCheckboxProps } = checkboxProps ?? {};
  return (
    <MuiFormControlLabel
      label={label}
      control={control ?? <Checkbox {...restCheckboxProps} sx={checkboxSx} />}
      sx={[baseLabeledCheckboxSx, ...(sx ? [sx] : [])] as SxProps<Theme>}
      {...props}
    />
  );
};

export default LabeledCheckbox;
