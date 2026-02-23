import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import { Person } from '@mui/icons-material';
import Avatar from '../atoms/Avatar';
import Text from '../atoms/Text';
import { shapeTokens } from '../../utils/shapes';
import logoSvg from '../../assets/seacrets-logo.svg';

export interface GlobalHeaderNavItem {
  value: string;
  label: string;
}

export interface GlobalHeaderProps extends BoxProps {
  balance?: string;
  navItems?: GlobalHeaderNavItem[];
  onProfileClick?: () => void;
  onBalanceClick?: () => void;
  onNavClick?: (value: string) => void;
}

const defaultNavItems: GlobalHeaderNavItem[] = [
  { value: 'tincrets', label: 'Tincrets' },
  { value: 'suscripciones', label: 'Mis Suscripciones' },
  { value: 'trends', label: 'Trends' },
  { value: 'marcadores', label: 'Marcadores' },
];

const navButtonSx: SxProps<Theme> = (theme) => ({
  flex: 1,
  minWidth: 0,
  px: theme.layout.space8,
  py: theme.layout.space8,
  borderRadius: shapeTokens['corner-small'],
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'var(--md-sys-color-surface-container-low)',
  color: 'text.secondary',
  cursor: 'pointer',
  '&:hover': {
    bgcolor: 'action.hover',
    color: 'text.primary',
  },
});

export const GlobalHeader = ({
  balance = '$300',
  navItems = defaultNavItems,
  onProfileClick,
  onBalanceClick,
  onNavClick,
  sx,
  ...props
}: GlobalHeaderProps) => (
  <Box sx={[(t) => ({ display: 'flex', flexDirection: 'column', gap: t.layout.space16 }), ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <Box
        component="button"
        type="button"
        onClick={onProfileClick}
        aria-label="Profile"
        sx={{
          p: 0,
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          color: 'text.primary',
          '&:hover': { opacity: 0.8 },
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'transparent',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Person sx={{ fontSize: 24, color: 'text.primary' }} />
        </Avatar>
      </Box>

      <Box
        component="img"
        src={logoSvg}
        alt="Seacrets"
        sx={{
          height: 50,
          width: 'auto',
          filter: 'none',
        }}
      />

      <Box
        component="button"
        type="button"
        onClick={onBalanceClick}
        sx={(t) => ({
          px: t.layout.space16,
          py: t.layout.space8,
          borderRadius: shapeTokens['corner-large'],
          border: 'none',
          bgcolor: 'var(--md-sys-color-surface-container-low)',
          color: 'text.primary',
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' },
        })}
      >
        <Text variant="label-large" sx={{ color: 'inherit' }}>
          {balance}
        </Text>
      </Box>
    </Box>

    {navItems.length > 0 && (
    <Box sx={(t) => ({ display: 'flex', gap: t.layout.space8, width: '100%' })}>
      {navItems.map((item) => (
        <Box
          key={item.value}
          component="button"
          type="button"
          onClick={() => onNavClick?.(item.value)}
          sx={navButtonSx}
        >
        <Text
          variant="label-small"
          sx={{
            color: 'inherit',
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.label}
        </Text>
        </Box>
      ))}
    </Box>
    )}
  </Box>
);

export default GlobalHeader;
