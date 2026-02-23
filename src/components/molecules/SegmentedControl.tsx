import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import Text from '../atoms/Text';
import { shapeTokens } from '../../utils/shapes';

export interface SegmentedControlItem<T = string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T = string> extends Omit<BoxProps, 'onChange'> {
  tabs: SegmentedControlItem<T>[];
  value?: T;
  onChange?: (value: T) => void;
}

const containerSx: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
  borderRadius: shapeTokens['corner-small'],
  overflow: 'hidden',
  bgcolor: 'var(--md-sys-color-surface-container-low)',
};

const segmentSx = (active: boolean) => (theme: Theme): SxProps<Theme> => ({
  flex: 1,
  minWidth: 0,
  py: theme.layout.space8,
  px: theme.layout.space8,
  border: 'none',
  borderRadius: 0,
  background: active ? 'primary.main' : 'transparent',
  color: active ? 'primary.contrastText' : 'text.primary',
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s',
  '&:hover': {
    bgcolor: active ? 'primary.dark' : 'action.hover',
  },
});

export const SegmentedControl = <T extends string>({
  tabs,
  value,
  onChange,
  sx,
  ...props
}: SegmentedControlProps<T>) => (
  <Box sx={[containerSx, ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
    {tabs.map((tab) => (
      <Box
        key={String(tab.value)}
        component="button"
        type="button"
        onClick={() => onChange?.(tab.value)}
        sx={segmentSx(value === tab.value) as SxProps<Theme>}
      >
        <Text
          variant="label-large"
          sx={{
            color: 'inherit',
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {tab.label}
        </Text>
      </Box>
    ))}
  </Box>
);

export default SegmentedControl;
