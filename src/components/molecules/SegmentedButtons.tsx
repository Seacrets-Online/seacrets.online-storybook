import { useMemo, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { shapeTokens } from '../../utils/shapes';

export interface SegmentedButtonsOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedButtonsProps {
  options: SegmentedButtonsOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}

const groupSx: SxProps<Theme> = (theme) => ({
  bgcolor: 'var(--md-sys-color-surface-container-low)',
  borderRadius: shapeTokens['corner-full'],
  p: theme.layout.space4,
  gap: theme.layout.space4,
  '& .MuiToggleButtonGroup-grouped': {
    border: 0,
    borderRadius: `${shapeTokens['corner-full']} !important`,
    gap: theme.layout.space8,
    textTransform: 'none',
    px: theme.layout.space16,
    py: theme.layout.space8,
    lineHeight: 1.2,
    '&.Mui-selected': {
      bgcolor: 'var(--md-sys-color-secondary-container)',
      color: 'var(--md-sys-color-on-secondary-container)',
    },
    '&.Mui-selected:hover': {
      bgcolor: 'var(--md-sys-color-secondary-container)',
      backgroundImage:
        'linear-gradient(var(--md-sys-state-layer-on-secondary-container-opacity-08), var(--md-sys-state-layer-on-secondary-container-opacity-08))',
    },
    '&:hover': {
      bgcolor: 'var(--md-sys-state-layer-on-surface-opacity-08)',
    },
  },
});

export const SegmentedButtons = ({
  options,
  value: valueProp,
  defaultValue,
  onChange,
  fullWidth = false,
  sx,
}: SegmentedButtonsProps) => {
  const firstValue = options[0]?.value ?? '';
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(defaultValue ?? firstValue);

  const value = valueProp ?? uncontrolledValue;

  const isValidValue = useMemo(
    () => options.some((o) => o.value === value),
    [options, value]
  );

  const selectedValue = isValidValue ? value : firstValue;

  const setValue = (next: string) => {
    if (valueProp === undefined) {
      setUncontrolledValue(next);
    }
    onChange?.(next);
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={selectedValue}
      onChange={(_, nextValue: string | null) => {
        if (typeof nextValue === 'string') {
          setValue(nextValue);
        }
      }}
      fullWidth={fullWidth}
      sx={[groupSx, ...(sx ? [sx] : [])] as SxProps<Theme>}
    >
      {options.map((opt) => (
        <ToggleButton key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.icon}
          {opt.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default SegmentedButtons;

