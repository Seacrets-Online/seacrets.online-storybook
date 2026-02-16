import { Box, Typography } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import Button from '../atoms/Button';

export interface EmptyStateProps extends BoxProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

const baseEmptyStateSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  py: 6,
  px: 3,
  textAlign: 'center',
};

export const EmptyState = ({
  title = 'No items',
  description,
  actionLabel,
  onAction,
  icon,
  sx,
  ...props
}: EmptyStateProps) => (
  <Box sx={[baseEmptyStateSx, ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
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
