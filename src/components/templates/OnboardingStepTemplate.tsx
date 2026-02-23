import { Box, Container, Stack } from '@mui/material';
import LinearProgress from '../atoms/LinearProgress';
import Button from '../atoms/Button';
import IconButton from '../atoms/IconButton';
import LegalLinks from '../molecules/LegalLinks';
import Text from '../atoms/Text';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';

export interface OnboardingStepTemplateProps extends BoxProps {
  /** Optional header (e.g. GlobalHeader) for app consistency */
  header?: React.ReactNode;
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
  header,
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
      maxWidth="sm"
      sx={(t) => ({
        flex: 1,
        minHeight: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        px: t.layout.space16,
        py: t.layout.space16,
      })}
    >
      {header && <Box sx={(t) => ({ flexShrink: 0, width: '100%', mb: t.layout.space24 })}>{header}</Box>}
      <Stack direction="row" alignItems="center" spacing={1} sx={(t) => ({ flexShrink: 0, mb: t.layout.space24 })}>
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
          <Box sx={(t) => ({ pt: t.layout.space32, width: '100%' })}>
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

      <Box sx={(t) => ({ flexShrink: 0, mt: 'auto', pt: t.layout.space32, pb: t.layout.space16 })}>
        <LegalLinks />
      </Box>
    </Container>
  </Box>
);

export default OnboardingStepTemplate;
