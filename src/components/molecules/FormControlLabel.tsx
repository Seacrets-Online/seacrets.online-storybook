import { FormControlLabel as MuiFormControlLabel } from '@mui/material';
import type { FormControlLabelProps as MuiFormControlLabelProps } from '@mui/material';
import { Text } from '../atoms/Text';
import type { TypographyTokenName } from '../../utils/typography';

export interface FormControlLabelProps extends Omit<MuiFormControlLabelProps, 'label'> {
  label: string;
  labelVariant?: TypographyTokenName; 
}

// export interface FormControlLabelProps extends Omit<MuiFormControlLabelProps, 'label'> {
//   label: string;
//   labelVariant?: any; 
// }

export const FormControlLabel = ({ 
  label, 
  labelVariant = 'body-medium', 
  ...props 
}: FormControlLabelProps) => {
  return (
    <MuiFormControlLabel
      {...props}
      label={
        <Text variant={labelVariant} color="text.primary">
          {label}
        </Text>
      }
    />
  );
};

export default FormControlLabel;