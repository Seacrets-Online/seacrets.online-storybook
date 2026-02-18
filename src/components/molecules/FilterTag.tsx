import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import { Close } from '@mui/icons-material';
import Text from '../atoms/Text';

export interface FilterTagProps extends Omit<BoxProps, 'onDelete'> {
  label: string;
  active?: boolean;
  showDelete?: boolean;
  onDelete?: () => void;
}

const tagSx = (active: boolean, clickable: boolean): SxProps<Theme> => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  px: 1.5,
  py: 0.5,
  borderRadius: '8px',
  whiteSpace: 'nowrap',
  bgcolor: active ? 'primary.main' : 'var(--seacrets-online-schemes-surface-container-low)',
  color: active ? 'primary.contrastText' : 'text.primary',
  fontSize: '0.75rem',
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
    sx={[tagSx(active, !!onDelete), ...(sx ? [sx] : [])] as SxProps<Theme>}
    {...props}
  >
    <Text variant="caption" sx={{ color: 'inherit', fontSize: 'inherit' }}>
      {label}
    </Text>
    {showDelete && <Close sx={{ fontSize: 14 }} />}
  </Box>
);

export default FilterTag;
