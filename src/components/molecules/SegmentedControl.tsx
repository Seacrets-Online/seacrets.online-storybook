import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import Text from '../atoms/Text';

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
  borderRadius: '8px',
  overflow: 'hidden',
  bgcolor: 'var(--seacrets-online-schemes-surface-container-low)',
};

const segmentSx = (active: boolean): SxProps<Theme> => ({
  flex: 1,
  minWidth: 0,
  py: 1,
  px: 1,
  border: 'none',
  borderRadius: 0,
  background: active ? 'primary.main' : 'transparent',
  color: active ? 'primary.contrastText' : 'text.primary',
  fontSize: '0.875rem',
  fontWeight: 500,
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
        sx={segmentSx(value === tab.value)}
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
          {tab.label}
        </Text>
      </Box>
    ))}
  </Box>
);

export default SegmentedControl;
