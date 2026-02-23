import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import { Close } from '@mui/icons-material';
import Text from '../atoms/Text';
import { shapeTokens } from '../../utils/shapes';

export interface FilterTagProps extends Omit<BoxProps, 'onDelete'> {
  label: string;
  active?: boolean;
  showDelete?: boolean;
  onDelete?: () => void;
}

const tagSx = (active: boolean, clickable: boolean) => (theme: Theme): SxProps<Theme> => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.layout.space4,
  px: theme.layout.space12,
  py: theme.layout.space4,
  borderRadius: shapeTokens['corner-small'],
  whiteSpace: 'nowrap',
  bgcolor: active ? 'primary.main' : 'var(--md-sys-color-surface-container-low)',
  color: active ? 'primary.contrastText' : 'text.primary',
  border: 'none',
  cursor: clickable ? 'pointer' : 'default',
  '&:hover': clickable ? { opacity: 0.9 } : undefined,
});

export const FilterTag = ({
  label,
  active = false,
  showDelete = true,
  onDelete,
  sx,
  ...props
}: FilterTagProps) => (
  <Box
    component="button"
    type="button"
    onClick={onDelete}
    sx={[tagSx(active, !!onDelete) as SxProps<Theme>, ...(sx ? [sx] : [])] as SxProps<Theme>}
    {...props}
  >
    <Text variant="label-small" sx={{ color: 'inherit' }}>
      {label}
    </Text>
    {showDelete && <Close sx={{ fontSize: 14 }} />}
  </Box>
);

export default FilterTag;
