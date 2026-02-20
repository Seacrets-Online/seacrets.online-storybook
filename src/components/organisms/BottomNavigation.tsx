import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import IconButton from '../atoms/IconButton';

export interface BottomNavigationAction {
  value: number | string;
  /** Used as `aria-label` for the action button */
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

export interface BottomNavigationPropsExtended extends Omit<BoxProps, 'onChange'> {
  value?: number | string;
  actions?: BottomNavigationAction[];
  onChange?: (value: number | string) => void;
  /**
   * Optional "primary" action (typically the center button, e.g. "+").
   * If not provided, all actions share the same styling rules.
   */
  primaryValue?: number | string;
  /**
   * Backwards compatibility with the previous MUI-based implementation.
   * Labels are not rendered in the current design.
   */
  showLabels?: boolean;
}

const rootSx: SxProps<Theme> = {
  width: '100%',
  maxWidth: 430,
  height: 92,
  position: 'relative',
  borderRadius: '7px',
};

// From Figma node 2470:1866 (430x92): pill insets ~= 14px sides, 7px top, 16px bottom.
const pillSx: SxProps<Theme> = {
  position: 'absolute',
  top: 7,
  left: 14,
  right: 14,
  bottom: 16,
  borderRadius: '46px',
  // TODO: Replace with token from tokens.json when available
  bgcolor: '#0C0C0C',
  // TODO: Replace with token from tokens.json when available
  boxShadow: 'inset 0px 4px 4px rgba(0,0,0,0.25)',
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: '1fr',
  alignItems: 'center',
};

const actionCellSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
};

const iconButtonBaseSx: SxProps<Theme> = {
  p: 0,
  width: 48,
  height: 48,
  transition: 'all 0.2s ease-in-out',
  // Remove default background so the pill reads cleanly.
  '&:hover': {
    backgroundColor: 'transparent',
    transform: 'scale(1.1)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
};

export const BottomNavigation = ({
  value,
  actions = [],
  onChange,
  primaryValue,
  showLabels: _showLabels,
  sx,
  ...props
}: BottomNavigationPropsExtended) => (
  <Box
    component="nav"
    aria-label="Bottom navigation"
    sx={[rootSx, ...(sx ? [sx] : [])] as SxProps<Theme>}
    {...props}
  >
    <Box sx={pillSx}>
      {actions.map((action) => {
        const isSelected = value !== undefined && action.value === value;
        const isPrimary = primaryValue !== undefined && action.value === primaryValue;

        const color: string = isPrimary ? 'primary.main' : isSelected ? 'text.primary' : 'text.secondary';

        return (
          <Box key={String(action.value)} sx={actionCellSx}>
            <IconButton
              aria-label={action.label}
              aria-current={isSelected ? 'page' : undefined}
              color="inherit"
              disabled={action.disabled}
              onClick={() => {
                action.onClick?.();
                onChange?.(action.value);
              }}
              sx={[
                iconButtonBaseSx,
                {
                  color,
                  transform: isSelected && !isPrimary ? 'scale(1.1)' : 'scale(1)',
                },
                ...(action.sx ? [action.sx] : []),
              ] as SxProps<Theme>}
            >
              {isSelected && action.activeIcon ? action.activeIcon : action.icon}
            </IconButton>
          </Box>
        );
      })}
    </Box>
  </Box>
);

export default BottomNavigation;
