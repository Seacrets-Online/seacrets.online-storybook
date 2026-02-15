import MuiBottomNavigation from '@mui/material/BottomNavigation';
import MuiBottomNavigationAction from '@mui/material/BottomNavigationAction';

/**
 * BottomNavigation organism - Bottom nav bar (ADR-003).
 */
export const BottomNavigation = ({
  value,
  onChange,
  actions = [],
  showLabels = true,
  ...props
}) => (
  <MuiBottomNavigation
    value={value}
    onChange={(e, v) => onChange?.(v)}
    showLabels={showLabels}
    {...props}
  >
    {actions.map((action, i) => (
      <MuiBottomNavigationAction
        key={action.value ?? i}
        label={action.label}
        icon={action.icon}
        value={action.value ?? i}
      />
    ))}
  </MuiBottomNavigation>
);

export default BottomNavigation;
