import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const PassportIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon 
      {...props} 
      viewBox="0 0 88 88"
      sx={{ fontSize: 40, ...props.sx }}
    >
      <path d="M70.4 13.2H66V4.4C66 3.00953 65.3429 1.69984 64.2267 0.869687C63.4583 0.297687 62.5356 0 61.6 0C61.1761 0 60.7507 0.0615312 60.3356 0.186312L16.3356 13.3863C14.4744 13.9435 13.2 15.6566 13.2 17.6V83.6C13.2 86.0303 15.1696 88 17.6 88H70.4C72.8303 88 74.8 86.0303 74.8 83.6V17.6C74.8 15.1697 72.8303 13.2 70.4 13.2ZM61.6 4.4V13.2H32.2666L61.6 4.4ZM70.4 83.6H17.6V17.6H70.4V83.6Z" />
      <path d="M44 28.6C31.8502 28.6 22 38.4501 22 50.6C22 62.7498 31.8502 72.6 44 72.6C56.1498 72.6 66 62.7498 66 50.6C66 38.4501 56.1498 28.6 44 28.6ZM44 33.11..." />
    </SvgIcon>
  );
};

export default PassportIcon;