import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '../atoms/LinearProgress';
import Button from '../atoms/Button';
import type { BoxProps } from '@mui/material/Box';

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
  ...props
}: OnboardingStepTemplateProps) => (
  <Box sx={{ maxWidth: 480, mx: 'auto', p: 3 }} {...props}>
    <LinearProgress
      variant="determinate"
      value={(step / totalSteps) * 100}
      sx={{ mb: 3 }}
    />
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {subtitle}
      </Typography>
    )}
    {children}
    <Box sx={{ display: 'flex', gap: 1, mt: 3, justifyContent: 'space-between' }}>
      {onBack && (
        <Button variant="text" onClick={onBack}>
          {backLabel}
        </Button>
      )}
      <Box sx={{ flex: 1 }} />
      {onNext && (
        <Button variant="contained" onClick={onNext}>
          {nextLabel}
        </Button>
      )}
    </Box>
  </Box>
);

export default OnboardingStepTemplate;
