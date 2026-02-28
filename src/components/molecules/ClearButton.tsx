import React from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import tokens from '../../tokens/tokens.json';

export interface ClearButtonProps extends Omit<IconButtonProps, 'size'> {
  /**
   * numeric dimension for the button; the original IconButtonProps.size is
   * a string union ("small" | "medium" | "large"), so we omit it and
   * provide our own number‑typed prop.
   */
  size?: number;
  circleColor?: string;
  crossColor?: string;
}

export const ClearButton: React.FC<ClearButtonProps> = ({ 
  size = 55, 
  circleColor = tokens.seacrets['online/Light'].Schemes['Inverse Surface'].$value,
  crossColor = tokens.seacrets['online/Light'].Schemes['Inverse On Surface'].$value,
  sx, 
  ...props 
}) => {
  return (
    <IconButton
      {...props}
      sx={{
        padding: 0,
        width: size,
        height: size,
        '&:hover circle': {
          fill: tokens.seacrets['online/Light'].Schemes['Outline'].$value,
        },
        '&.Mui-disabled circle': {
          fill: tokens.seacrets['online/Light'].Schemes['Surface Variant'].$value,
          opacity: 0.5,
        },
        ...sx,
      }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="100%" 
        height="100%" 
        viewBox="0 0 55 55" 
        fill="none"
      >
        <circle cx="26" cy="27" r="25" fill={circleColor} style={{ transition: 'fill 0.2s' }} />
        <path d="M13.2083 43.0833L10 39.875L22.8333 27.0417L10 14.2083L13.2083 11L26.0417 23.8333L38.875 11L42.0833 14.2083L29.25 27.0417L42.0833 39.875L38.875 43.0833L26.0417 30.25L13.2083 43.0833Z" fill={crossColor} />
      </svg>
    </IconButton>
  );
};