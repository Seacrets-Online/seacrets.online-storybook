import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction as MuiBottomNavigationAction,
} from '@mui/material';
import type { BottomNavigationProps } from '@mui/material';

export interface BottomNavigationAction {
  value: number | string;
  label: string;
  icon?: React.ReactNode;
}

export interface BottomNavigationPropsExtended extends Omit<BottomNavigationProps, 'children' | 'onChange'> {
  actions?: BottomNavigationAction[];
  onChange?: (value: number | string) => void;
}

export const BottomNavigation = ({
  value,
  onChange,
  actions = [],
  showLabels = true,
  ...props
}: BottomNavigationPropsExtended) => (
  <MuiBottomNavigation
    value={value}
    onChange={(_, v) => onChange?.(v as number | string)}
    showLabels={showLabels}
    {...props}
  >
    {actions.map((action, i) => (
      <MuiBottomNavigationAction
        key={String(action.value ?? i)}
        label={action.label}
        icon={action.icon}
        value={action.value ?? i}
      />
    ))}
  </MuiBottomNavigation>
);

export default BottomNavigation;
