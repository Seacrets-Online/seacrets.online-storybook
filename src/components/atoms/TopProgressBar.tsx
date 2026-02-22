import { LinearProgress } from '@mui/material';
import type { LinearProgressProps, SxProps, Theme } from '@mui/material';

export interface TopProgressBarProps extends LinearProgressProps {
  thickness?: number;
  fixed?: boolean;
}

export const TopProgressBar = ({
  thickness = 3,
  fixed = false,
  sx,
  ...props
}: TopProgressBarProps) => {
  const baseSx: SxProps<Theme> = {
    height: thickness,
    borderRadius: thickness / 2,
    overflow: 'hidden',
    backgroundColor: 'var(--md-sys-color-surface-container-highest)',
    '& .MuiLinearProgress-bar': {
      borderRadius: thickness / 2,
    },
  };

  const fixedSx: SxProps<Theme> = fixed
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
      }
    : {};

  return (
    <LinearProgress
      sx={[baseSx, fixedSx, ...(sx ? [sx] : [])] as SxProps<Theme>}
      {...props}
    />
  );
};

export default TopProgressBar;

