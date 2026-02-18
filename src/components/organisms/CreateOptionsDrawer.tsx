import type { ReactNode } from 'react';
import { Box, SwipeableDrawer } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import {
  ImageOutlined,
  LocalFireDepartmentOutlined,
  PlayCircleOutline,
  WifiTethering,
} from '@mui/icons-material';
import Text from '../atoms/Text';

export interface CreateOptionsDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  createStoryLabel?: string;
  createLiveLabel?: string;
  uploadMediaLabel?: string;
  uploadTrendLabel?: string;
  onCreateStory?: () => void;
  onCreateLive?: () => void;
  onUploadMedia?: () => void;
  onUploadTrend?: () => void;
  /**
   * Optional footer content (e.g. `BottomNavigation`).
   * The Figma node `2441:1502` places a 92px footer at the bottom.
   */
  footer?: ReactNode;
}

type ActionId = 'createStory' | 'createLive' | 'uploadMedia' | 'uploadTrend';

type CreateOption = {
  id: ActionId;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  variant: 'tile' | 'row';
};

const paperSx: SxProps<Theme> = {
  width: '100%',
  maxWidth: 430,
  mx: 'auto',
  height: 430, // Full height as per original design
  overflow: 'hidden',
  borderRadius: '30px',
  bgcolor: 'var(--md-sys-color-surface-container-lowest)',
  boxShadow: 'none',
  backgroundImage: 'none', // Disable MUI elevation overlay
};

const panelSx: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  pt: '16px',
  pb: '24px',
};

const contentSx: SxProps<Theme> = {
  px: '14px',
  flexShrink: 0,
};

const handleSx: SxProps<Theme> = {
  width: 45,
  height: 3,
  borderRadius: '21px',
  alignSelf: 'center',
  // Matches Figma #6d6b6b.
  bgcolor: '#6d6b6b',
  flexShrink: 0,
};

const titleSx: SxProps<Theme> = {
  mt: '13px',
  textAlign: 'center',
  color: 'text.primary',
  fontWeight: 500,
  flexShrink: 0,
};

const gridSx: SxProps<Theme> = {
  mt: '13px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: '10px',
  flexShrink: 0,
};

const rowsSx: SxProps<Theme> = {
  mt: '11px',
  display: 'grid',
  rowGap: '11px',
  flexShrink: 0,
};

const interactiveBaseSx: SxProps<Theme> = {
  border: 0,
  p: 0,
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
  appearance: 'none',
  textAlign: 'inherit',
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  '&:focus-visible': {
    outline: '2px solid var(--md-sys-color-primary)',
    outlineOffset: 2,
  },
};

const surfaceSx: SxProps<Theme> = {
  bgcolor: '#1C1C1C',
  borderRadius: '10px',
};

const tileSx: SxProps<Theme> = {
  ...surfaceSx,
  height: 116,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
};

const rowSx: SxProps<Theme> = {
  ...surfaceSx,
  height: 64,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
};

const footerSx: SxProps<Theme> = {
  // Pins the bottom navigation to the bottom of the drawer like Figma.
  mt: 'auto',
  pt: '3px',
  flexShrink: 0,
};

const OptionButton = ({
  option,
}: {
  option: CreateOption;
}) => (
  <Box
    component="button"
    type="button"
    aria-label={option.label}
    onClick={option.onClick}
    sx={[
      interactiveBaseSx,
      option.variant === 'tile' ? tileSx : rowSx,
    ] as SxProps<Theme>}
  >
    {option.variant === 'tile' ? (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.primary' }}>
          {option.icon}
        </Box>
        <Text variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
          {option.label}
        </Text>
      </>
    ) : (
      <>
        <Text variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
          {option.label}
        </Text>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.primary' }}>
          {option.icon}
        </Box>
      </>
    )}
  </Box>
);

export const CreateOptionsDrawer = ({
  open,
  onClose,
  title = 'Que Quieres Crear',
  createStoryLabel = 'Crear Historia',
  createLiveLabel = 'Crear Live',
  uploadMediaLabel = 'Subir Foto o Video',
  uploadTrendLabel = 'Subir Trend',
  onCreateStory,
  onCreateLive,
  onUploadMedia,
  onUploadTrend,
  footer,
}: CreateOptionsDrawerProps) => {
  const options: CreateOption[] = [
    {
      id: 'createStory',
      label: createStoryLabel,
      icon: <PlayCircleOutline sx={{ fontSize: 30 }} />,
      onClick: onCreateStory,
      variant: 'tile',
    },
    {
      id: 'createLive',
      label: createLiveLabel,
      icon: <WifiTethering sx={{ fontSize: 30 }} />,
      onClick: onCreateLive,
      variant: 'tile',
    },
    {
      id: 'uploadMedia',
      label: uploadMediaLabel,
      icon: <ImageOutlined sx={{ fontSize: 26 }} />,
      onClick: onUploadMedia,
      variant: 'row',
    },
    {
      id: 'uploadTrend',
      label: uploadTrendLabel,
      icon: <LocalFireDepartmentOutlined sx={{ fontSize: 26 }} />,
      onClick: onUploadTrend,
      variant: 'row',
    },
  ];

  const tileOptions = options.filter((o) => o.variant === 'tile');
  const rowOptions = options.filter((o) => o.variant === 'row');

  return (
    <SwipeableDrawer
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      anchor="bottom"
      disableSwipeToOpen
      slotProps={{
        paper: { sx: paperSx },
      }}
    >
      <Box sx={panelSx}>
        <Box sx={handleSx} />
        <Box sx={contentSx}>
          <Text variant="body1" sx={titleSx}>
            {title}
          </Text>

          <Box sx={gridSx}>
            {tileOptions.map((option) => (
              <OptionButton key={option.id} option={option} />
            ))}
          </Box>

          <Box sx={rowsSx}>
            {rowOptions.map((option) => (
              <OptionButton key={option.id} option={option} />
            ))}
          </Box>
        </Box>

        {footer && <Box sx={footerSx}>{footer}</Box>}
      </Box>
    </SwipeableDrawer>
  );
};

export default CreateOptionsDrawer;
