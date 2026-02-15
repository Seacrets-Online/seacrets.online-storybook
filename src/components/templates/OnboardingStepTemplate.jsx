import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '../atoms/LinearProgress.jsx';
import Button from '../atoms/Button.jsx';

/**
 * OnboardingStepTemplate - Step layout with progress.
 * Composes atoms (LinearProgress, Button).
 */
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
}) => (
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
