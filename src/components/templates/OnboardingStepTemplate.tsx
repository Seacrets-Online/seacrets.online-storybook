import { Box, Container, Stack } from '@mui/material';
import LinearProgress from '../atoms/LinearProgress';
import Button from '../atoms/Button';
import IconButton from '../atoms/IconButton';
import LegalLinks from '../molecules/LegalLinks';
import Text from '../atoms/Text';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';

export interface OnboardingStepTemplateProps extends BoxProps {
  title?: string;
  subtitle?: string;
  step?: number;
  totalSteps?: number;
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  backLabel?: string;
}

const progressValue = (step: number, total: number) =>
  total > 0 ? Math.min(100, Math.max(0, (step / total) * 100)) : 0;

const baseOnboardingSx = {
  flex: 1,
  minHeight: 0,
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.default',
};

export const OnboardingStepTemplate = ({
  title,
  subtitle,
  step = 1,
  totalSteps = 1,
  onNext,
  onBack,
  nextLabel = 'Next',
  backLabel = 'Back',
  children,
  sx,
  ...props
}: OnboardingStepTemplateProps) => (
  <Box sx={[baseOnboardingSx, ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
    <Container
      maxWidth="xs"
      sx={{
        flex: 1,
        minHeight: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        px: 4,
        py: 3,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ flexShrink: 0, mb: 3 }}>
        {onBack && (
          <IconButton aria-label={backLabel} onClick={onBack}>
            <ChevronLeft />
          </IconButton>
        )}
        <Box sx={{ flex: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progressValue(step, totalSteps)}
            color="primary"
          />
        </Box>
      </Stack>

      <Stack
        spacing={3}
        sx={{
          flex: 1,
          height: '100%',
          minHeight: 0,
          width: '100%',
          minWidth: 0,
          justifyContent: 'center',
        }}
      >
        {title && (
          <Text variant="h4" component="h1" align="center" color="text.primary">
            {title}
          </Text>
        )}
        {subtitle && (
          <Text variant="body2" color="text.secondary" align="center">
            {subtitle}
          </Text>
        )}
        <Box sx={{ width: '100%', minWidth: 0 }}>{children}</Box>
        {onNext && (
          <Box sx={{ pt: 4, width: '100%' }}>
            <Button
              variant="contained"
              onClick={onNext}
              fullWidth
              size="extraLarge"
              shape="pill"
            >
              {nextLabel}
            </Button>
          </Box>
        )}
      </Stack>

      <Box sx={{ flexShrink: 0, mt: 'auto', pt: 4, pb: 2 }}>
        <LegalLinks />
      </Box>
    </Container>
  </Box>
);

export default OnboardingStepTemplate;
