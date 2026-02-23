import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import Text from '../atoms/Text';
import { shapeTokens } from '../../utils/shapes';

export interface PillTabItem<T = string> {
  value: T;
  label: string;
}

export interface PillTabGroupProps<T = string> extends Omit<BoxProps, 'onChange'> {
  tabs: PillTabItem<T>[];
  value?: T;
  onChange?: (value: T) => void;
  activeColor?: 'primary' | 'default';
  variant?: 'pill' | 'rounded';
}

const pillSx = (active: boolean, variant: 'pill' | 'rounded') => (theme: Theme): SxProps<Theme> => ({
  px: theme.layout.space16,
  py: theme.layout.space8,
  flex: variant === 'rounded' ? 1 : undefined,
  minWidth: variant === 'rounded' ? 0 : undefined,
  borderRadius: variant === 'rounded' ? shapeTokens['corner-small'] : shapeTokens['corner-full'],
  border: 'none',
  background: active ? 'primary.main' : 'var(--md-sys-color-surface-container-low)',
  color: active ? 'primary.contrastText' : 'text.primary',
  cursor: 'pointer',
  '&:hover': {
    bgcolor: active ? 'primary.dark' : 'action.hover',
  },
});

export const PillTabGroup = <T extends string>({
  tabs,
  value,
  onChange,
  variant = 'pill',
  sx,
  ...props
}: PillTabGroupProps<T>) => (
  <Box
    sx={[
      {
        display: 'flex',
        gap: (t) => t.layout.space8,
        flexWrap: variant === 'rounded' ? 'nowrap' : 'wrap',
        width: variant === 'rounded' ? '100%' : undefined,
      },
      ...(sx ? [sx] : []),
    ] as SxProps<Theme>}
    {...props}
  >
    {tabs.map((tab) => (
      <Box
        key={String(tab.value)}
        component="button"
        type="button"
        onClick={() => onChange?.(tab.value)}
        sx={pillSx(value === tab.value, variant) as SxProps<Theme>}
      >
        <Text
          variant="label-large"
          sx={{
            color: 'inherit',
            ...(variant === 'rounded' && {
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }),
          }}
        >
          {tab.label}
        </Text>
      </Box>
    ))}
  </Box>
);

export default PillTabGroup;
