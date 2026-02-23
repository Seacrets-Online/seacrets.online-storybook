import { useState, useEffect, type ReactNode } from 'react';
import { Box, SwipeableDrawer } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { shapeTokens } from '../../utils/shapes';
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

const paperSx: SxProps<Theme> = (theme) => ({
  width: '100%',
  maxWidth: 430,
  mx: 'auto',
  height: 430,
  overflow: 'hidden',
  borderRadius: theme.spacing(theme.layout.space32),
  bgcolor: 'var(--md-sys-color-surface-container-high)',
  boxShadow: 'none',
  backgroundImage: 'none',
});

const panelSx: SxProps<Theme> = (theme) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  pt: theme.layout.space16,
  pb: theme.layout.space24,
});

const contentSx: SxProps<Theme> = (theme) => ({
  px: theme.layout.space16,
  flexShrink: 0,
});

const handleSx: SxProps<Theme> = (theme) => ({
  width: 45,
  height: 3,
  borderRadius: theme.spacing(theme.layout.space24),
  alignSelf: 'center',
  bgcolor: 'var(--md-ref-palette-neutral-50)',
  flexShrink: 0,
});

const titleSx: SxProps<Theme> = (theme) => ({
  mt: theme.layout.space12,
  textAlign: 'center',
  color: 'text.primary',
  flexShrink: 0,
});

const gridSx: SxProps<Theme> = (theme) => ({
  mt: theme.layout.space12,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: theme.layout.space12,
  flexShrink: 0,
});

const rowsSx: SxProps<Theme> = (theme) => ({
  mt: theme.layout.space12,
  display: 'grid',
  rowGap: theme.layout.space12,
  flexShrink: 0,
});

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
  bgcolor: 'var(--md-sys-color-surface-container-low)',
  borderRadius: shapeTokens['corner-small'],
};

const tileSx: SxProps<Theme> = (theme) => ({
  ...(typeof surfaceSx === 'function' ? (surfaceSx as (t: Theme) => object)(theme) : surfaceSx),
  height: 116,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.layout.space8,
});

const rowSx: SxProps<Theme> = (theme) => ({
  ...(typeof surfaceSx === 'function' ? (surfaceSx as (t: Theme) => object)(theme) : surfaceSx),
  height: 64,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.layout.space12,
});

const footerSx: SxProps<Theme> = (theme) => ({
  mt: 'auto',
  pt: theme.layout.space4,
  flexShrink: 0,
});

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
    ]}
  >
    {option.variant === 'tile' ? (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.primary' }}>
          {option.icon}
        </Box>
        <Text variant="title-medium" sx={{ color: 'text.primary' }}>
          {option.label}
        </Text>
      </>
    ) : (
      <>
        <Text variant="title-medium" sx={{ color: 'text.primary' }}>
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
              <Text variant="title-medium" sx={titleSx}>
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
                  (t) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: t.layout.space4,
                    mb: t.layout.space16,
                    color: 'text.secondary',
                  }),
                ]}
              >
                <ChevronLeft sx={{ fontSize: 24 }} />
                <Text variant="body2" sx={{ color: 'inherit' }}>
                  Volver
                </Text>
              </Box>
              <Text variant="title-medium" sx={titleSx}>
                {step2Title}
              </Text>
              {renderStep2 && selectedOption ? (
                renderStep2(selectedOption, { onConfirm: confirmStep2, onClose })
              ) : (
                <Box sx={(t) => ({ mt: t.layout.space24, display: 'flex', flexDirection: 'column', gap: t.layout.space16 })}>
                  <Box
                    sx={(t) => ({
                      p: t.layout.space24,
                      bgcolor: 'var(--md-sys-color-surface-container-low)',
                      borderRadius: shapeTokens['corner-small'],
                      textAlign: 'center',
                    })}
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
