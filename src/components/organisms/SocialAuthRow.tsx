import { Box, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';
import Button from '../atoms/Button';
import Divider from '../atoms/Divider';

export interface SocialAuthProvider {
  id?: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface SocialAuthRowProps extends BoxProps {
  providers?: SocialAuthProvider[];
  dividerLabel?: string;
}

export const SocialAuthRow = ({
  providers = [],
  dividerLabel = 'or',
  ...props
}: SocialAuthRowProps) => (
  <Box {...props}>
    {dividerLabel && providers.length > 0 && (
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Divider sx={{ flex: 1 }} />
        <Typography component="span" variant="body2" sx={{ px: 2 }}>
          {dividerLabel}
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>
    )}
    {providers.map((p, i) => (
      <Button
        key={p.id ?? i}
        variant="outlined"
        fullWidth
        startIcon={p.icon}
        onClick={p.onClick}
        sx={{ mb: 1, whiteSpace: 'nowrap' }}
      >
        {p.label}
      </Button>
    ))}
  </Box>
);

export default SocialAuthRow;
