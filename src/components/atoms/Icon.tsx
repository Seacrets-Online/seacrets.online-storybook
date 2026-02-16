import { SvgIcon as MuiSvgIcon } from '@mui/material';
import type { SvgIconProps } from '@mui/material';

export interface IconProps extends Omit<SvgIconProps, 'component'> {
  icon: React.ComponentType<SvgIconProps>;
}

export const Icon = ({ icon: IconComponent, ...props }: IconProps) => (
  <MuiSvgIcon component={IconComponent} {...props} />
);

export default Icon;
