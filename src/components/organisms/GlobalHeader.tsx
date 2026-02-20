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

const navButtonSx: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
  px: 1,
  py: 0.75,
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'var(--seacrets-online-schemes-surface-container-low)',
  color: 'text.secondary',
  fontSize: '0.8125rem',
  fontWeight: 500,
  cursor: 'pointer',
  '&:hover': {
    bgcolor: 'action.hover',
    color: 'text.primary',
  },
};

export const GlobalHeader = ({
  balance = '$300',
  navItems = defaultNavItems,
  onProfileClick,
  onBalanceClick,
  onNavClick,
  sx,
  ...props
}: GlobalHeaderProps) => (
  <Box sx={[{ display: 'flex', flexDirection: 'column', gap: 2 }, ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
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
        sx={{
          px: 2,
          py: 1,
          borderRadius: shapeTokens['corner-large'],
          border: 'none',
          bgcolor: 'var(--seacrets-online-schemes-surface-container-low)',
          color: 'text.primary',
          fontSize: '0.875rem',
          fontWeight: 500,
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        {balance}
      </Box>
    </Box>

    <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
      {navItems.map((item) => (
        <Box
          key={item.value}
          component="button"
          type="button"
          onClick={() => onNavClick?.(item.value)}
          sx={navButtonSx}
        >
          <Text
            variant="body2"
            sx={{
              color: 'inherit',
              fontWeight: 'inherit',
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
  </Box>
);

export default GlobalHeader;
