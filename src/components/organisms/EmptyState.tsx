import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '../atoms/Button';
import type { BoxProps } from '@mui/material/Box';

export interface EmptyStateProps extends BoxProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState = ({
  title = 'No items',
  description,
  actionLabel,
  onAction,
  icon,
  ...props
}: EmptyStateProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 6,
      px: 3,
      textAlign: 'center',
    }}
    {...props}
  >
    {icon && <Box sx={{ mb: 2, color: 'text.secondary' }}>{icon}</Box>}
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
    )}
    {actionLabel && onAction && (
      <Button variant="contained" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </Box>
);

export default EmptyState;
