import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '../atoms/Button';
import Divider from '../atoms/Divider';
import type { BoxProps } from '@mui/material/Box';

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
    {dividerLabel && providers.length > 0 && (
      <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
        <Divider sx={{ flex: 1 }} />
        <Typography component="span" variant="body2" sx={{ px: 2 }}>
          {dividerLabel}
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>
    )}
  </Box>
);

export default SocialAuthRow;
