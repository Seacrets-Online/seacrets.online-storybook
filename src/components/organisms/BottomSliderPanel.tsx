import { useState, useEffect, type ReactNode } from 'react';
import { Box, SwipeableDrawer } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import {
  ChevronLeft,
  ImageOutlined,
  LocalFireDepartmentOutlined,
  PlayCircleOutline,
  WifiTethering,
} from '@mui/icons-material';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

export interface BottomSliderPanelProps {
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
  /**
   * Optional content for step 2 (shown after selecting an option).
   * Receives the selected action id and helpers. Call onConfirm() to complete and close.
   */
  renderStep2?: (
    selectedOption: ActionId,
    helpers: { onConfirm: () => void; onClose: () => void }
  ) => ReactNode;
  nextLabel?: string;
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
  // TODO: Replace with token from tokens.json when available
  bgcolor: '#101010',
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
  // TODO: Replace with token from tokens.json when available (Figma #6d6b6b)
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
  // TODO: Replace with token from tokens.json when available
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

export const BottomSliderPanel = ({
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
  renderStep2,
  nextLabel = 'Siguiente',
}: BottomSliderPanelProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedOption, setSelectedOption] = useState<ActionId | null>(null);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setSelectedOption(null);
    }
  }, [open]);

  const handleOptionClick = (id: ActionId) => {
    if (id === 'createStory') {
      onCreateStory?.();
      onClose();
      return;
    }
    setSelectedOption(id);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedOption(null);
  };

  const confirmStep2 = () => {
    if (selectedOption === 'createStory') onCreateStory?.();
    else if (selectedOption === 'createLive') onCreateLive?.();
    else if (selectedOption === 'uploadMedia') onUploadMedia?.();
    else if (selectedOption === 'uploadTrend') onUploadTrend?.();
    onClose();
  };

  const options: CreateOption[] = [
    {
      id: 'createStory',
      label: createStoryLabel,
      icon: <PlayCircleOutline sx={{ fontSize: 30 }} />,
      onClick: () => handleOptionClick('createStory'),
      variant: 'tile',
    },
    {
      id: 'createLive',
      label: createLiveLabel,
      icon: <WifiTethering sx={{ fontSize: 30 }} />,
      onClick: () => handleOptionClick('createLive'),
      variant: 'tile',
    },
    {
      id: 'uploadMedia',
      label: uploadMediaLabel,
      icon: <ImageOutlined sx={{ fontSize: 26 }} />,
      onClick: () => handleOptionClick('uploadMedia'),
      variant: 'row',
    },
    {
      id: 'uploadTrend',
      label: uploadTrendLabel,
      icon: <LocalFireDepartmentOutlined sx={{ fontSize: 26 }} />,
      onClick: () => handleOptionClick('uploadTrend'),
      variant: 'row',
    },
  ];

  const tileOptions = options.filter((o) => o.variant === 'tile');
  const rowOptions = options.filter((o) => o.variant === 'row');

  const step2Title = selectedOption
    ? {
        createStory: createStoryLabel,
        createLive: createLiveLabel,
        uploadMedia: uploadMediaLabel,
        uploadTrend: uploadTrendLabel,
      }[selectedOption]
    : '';

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
          {step === 1 ? (
            <>
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
            </>
          ) : (
            <>
              <Box
                component="button"
                type="button"
                aria-label="Volver"
                onClick={handleBack}
                sx={[
                  interactiveBaseSx,
                  {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mb: 2,
                    color: 'text.secondary',
                  },
                ] as SxProps<Theme>}
              >
                <ChevronLeft sx={{ fontSize: 24 }} />
                <Text variant="body2" sx={{ color: 'inherit' }}>
                  Volver
                </Text>
              </Box>
              <Text variant="body1" sx={titleSx}>
                {step2Title}
              </Text>
              {renderStep2 && selectedOption ? (
                renderStep2(selectedOption, { onConfirm: confirmStep2, onClose })
              ) : (
                <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box
                    sx={{
                      p: 3,
                      // TODO: Replace with token from tokens.json when available
                      bgcolor: '#1C1C1C',
                      borderRadius: '10px',
                      textAlign: 'center',
                    }}
                  >
                    <Text variant="body2" color="text.secondary">
                      Step 2 placeholder. Customize with renderStep2 prop.
                    </Text>
                  </Box>
                  <Button variant="contained" onClick={confirmStep2} fullWidth>
                    {nextLabel}
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>

        {footer && <Box sx={footerSx}>{footer}</Box>}
      </Box>
    </SwipeableDrawer>
  );
};

export default BottomSliderPanel;
