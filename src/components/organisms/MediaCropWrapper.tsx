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

const rootSx: SxProps<Theme> = {
  width: '100%',
  maxWidth: 430,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  px: 2,
  py: 2,
  bgcolor: 'background.default',
};

const headerSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
};

const viewportSx: SxProps<Theme> = {
  width: '100%',
  borderRadius: 3,
  overflow: 'hidden',
  bgcolor: 'var(--md-sys-color-surface-container-low)',
  border: '1px solid',
  borderColor: 'divider',
};

const actionsSx: SxProps<Theme> = {
  display: 'flex',
  gap: 1.5,
  justifyContent: 'space-between',
};

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

