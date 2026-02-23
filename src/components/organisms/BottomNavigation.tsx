import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import { shapeTokens } from '../../utils/shapes';
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
}

const rootSx: SxProps<Theme> = (theme) => ({
  width: '100%',
  maxWidth: 430,
  height: 92,
  position: 'relative',
  borderRadius: theme.spacing(theme.layout.space8),
});

const pillSx: SxProps<Theme> = (theme) => ({
  position: 'absolute',
  top: theme.spacing(theme.layout.space8),
  left: theme.spacing(theme.layout.space16),
  right: theme.spacing(theme.layout.space16),
  bottom: theme.spacing(theme.layout.space16),
  borderRadius: shapeTokens['corner-full'],
  bgcolor: 'var(--md-sys-color-surface-container-low)',
  boxShadow: 'inset 0px 4px 4px var(--md-sys-state-layer-shadow-opacity-10)',
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: '1fr',
  alignItems: 'center',
});

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

const fixedWrapperSx: SxProps<Theme> = (t) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  p: t.layout.space8,
  zIndex: 1400,
});

export const BottomNavigation = ({
  value,
  actions = [],
  onChange,
  primaryValue,
  sx,
  ...props
}: BottomNavigationPropsExtended) => (
  <Box sx={fixedWrapperSx}>
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
  </Box>
);

export default BottomNavigation;
