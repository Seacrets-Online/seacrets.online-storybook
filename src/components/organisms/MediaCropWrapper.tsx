import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

export interface MediaCropWrapperProps extends BoxProps {
  title?: string;
  /** The cropper/preview area (render prop or a real cropper component). */
  children?: ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  /** CSS aspect-ratio for the crop viewport (e.g. 1, 16/9, 9/16). */
  aspectRatio?: number;
}

const rootSx: SxProps<Theme> = (theme) => ({
  width: '100%',
  maxWidth: 430,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.layout.space16,
  px: theme.layout.space16,
  py: theme.layout.space16,
  bgcolor: 'background.default',
});

const headerSx: SxProps<Theme> = (theme) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.layout.space16,
});

const viewportSx: SxProps<Theme> = {
  width: '100%',
  borderRadius: 3,
  overflow: 'hidden',
  bgcolor: 'var(--md-sys-color-surface-container-low)',
  border: '1px solid',
  borderColor: 'divider',
};

const actionsSx: SxProps<Theme> = (theme) => ({
  display: 'flex',
  gap: theme.layout.space12,
  justifyContent: 'space-between',
});

export const MediaCropWrapper = ({
  title = 'Crop',
  children,
  onCancel,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Done',
  aspectRatio = 1,
  sx,
  ...props
}: MediaCropWrapperProps) => (
  <Box sx={[rootSx, ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
    <Box sx={headerSx}>
      <Text variant="h6" component="h2" sx={{ m: 0 }}>
        {title}
      </Text>
    </Box>

    <Box sx={[viewportSx, { aspectRatio }] as SxProps<Theme>}>
      {children}
    </Box>

    <Box sx={actionsSx}>
      <Button variant="text" type="button" onClick={onCancel} sx={{ textTransform: 'none' }}>
        {cancelLabel}
      </Button>
      <Button variant="contained" type="button" onClick={onConfirm} sx={{ textTransform: 'none' }}>
        {confirmLabel}
      </Button>
    </Box>
  </Box>
);

export default MediaCropWrapper;

