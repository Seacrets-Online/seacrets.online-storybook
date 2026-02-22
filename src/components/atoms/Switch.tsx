import React from 'react';
import { Switch as MuiSwitch, SwitchProps as MuiSwitchProps } from '@mui/material';

export interface SwitchProps extends Omit<MuiSwitchProps, 'inputProps'> {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';
  'aria-label': string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const Switch: React.FC<SwitchProps> = ({ 'aria-label': ariaLabel, inputProps, ...props }) => {
  return (
    <MuiSwitch 
      {...props}
      inputProps={{
        'aria-label': ariaLabel,
        ...inputProps,
      }}
      sx={{
        // 1. State UNCHECKED (Active)
        '& .MuiSwitch-switchBase:not(.Mui-checked):not(.Mui-disabled)': {
          color: 'secondary.main', 
        },
        '& .MuiSwitch-switchBase:not(.Mui-checked):not(.Mui-disabled) + .MuiSwitch-track': {
          backgroundColor: 'secondary.main',
          opacity: 0.4, 
        },
        
        // 2. State DISABLED (Covers both Unchecked and Checked)
        '& .MuiSwitch-switchBase.Mui-disabled, & .MuiSwitch-switchBase.Mui-checked.Mui-disabled': {
          color: 'action.disabled', 
        },
        '& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track, & .MuiSwitch-switchBase.Mui-checked.Mui-disabled + .MuiSwitch-track': {
          backgroundColor: 'action.disabled',
          opacity: 0.12, 
        },
        
        ...props.sx,
      }}
    />
  );
};