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

const baseEmptyStateSx: SxProps<Theme> = (theme) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  py: theme.layout.space48,
  px: theme.layout.space24,
  textAlign: 'center',
});

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
    {icon && <Box sx={(t) => ({ mb: t.layout.space16, color: 'text.secondary' })}>{icon}</Box>}
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" color="text.secondary" sx={(t) => ({ mb: t.layout.space16 })}>
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
