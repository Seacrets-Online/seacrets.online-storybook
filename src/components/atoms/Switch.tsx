import React from 'react';
import { Switch as MuiSwitch, SwitchProps as MuiSwitchProps } from '@mui/material';
import { colorTokens } from '../../utils/colors.generated';

export interface SwitchProps extends Omit<MuiSwitchProps, 'inputProps'> {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';
  'aria-label': string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const Switch: React.FC<SwitchProps> = ({ 'aria-label': ariaLabel, inputProps, ...props }) => {
  const colors = colorTokens.dark;
  
  return (
    <MuiSwitch 
      {...props}
      inputProps={{
        'aria-label': ariaLabel,
        ...inputProps,
      }}
      sx={{

        // 2. State CHECKED
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: colors.mdSysColorOnSecondary,
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: colors.mdSysColorSecondary,
          opacity: 1,
        },

        // 1. State UNCHECKED
        '& .MuiSwitch-switchBase:not(.Mui-checked):not(.Mui-disabled)': {
          color: colors.mdSysColorOutline, 
        },
        '& .MuiSwitch-switchBase:not(.Mui-checked):not(.Mui-disabled) + .MuiSwitch-track': {
          backgroundColor: colors.mdSysColorSurfaceVariant,
          opacity: 1,
        },
        
        // 3. State DISABLED
        '& .MuiSwitch-switchBase.Mui-disabled': {
          color: colors.mdSysColorOnSurface,
          opacity: 0.38,
        },
        '& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track': {
          backgroundColor: colors.mdSysColorSurfaceVariant,
          opacity: 0.12,
        },
        
        ...props.sx,
      }}
    />
  );
};

export default Switch;