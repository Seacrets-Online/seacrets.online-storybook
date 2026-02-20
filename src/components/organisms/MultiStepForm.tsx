import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import LinearProgress from '../atoms/LinearProgress';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

export interface MultiStepFormStep {
  id: string;
  title?: string;
  content: React.ReactNode;
  /** Disable the primary action for this step (e.g. incomplete form) */
  nextDisabled?: boolean;
}

export interface MultiStepFormProps extends BoxProps {
  steps: MultiStepFormStep[];
  step?: number;
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  onFinish?: () => void;
  backLabel?: string;
  nextLabel?: string;
  finishLabel?: string;
  showProgress?: boolean;
}

const clampStep = (step: number, stepsCount: number) =>
  Math.min(Math.max(step, 0), Math.max(stepsCount - 1, 0));

const rootSx: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const contentSx: SxProps<Theme> = {
  width: '100%',
  minWidth: 0,
};

const actionsSx: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  gap: 1.5,
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const MultiStepForm = ({
  steps,
  step: stepProp,
  defaultStep = 0,
  onStepChange,
  onFinish,
  backLabel = 'Back',
  nextLabel = 'Next',
  finishLabel = 'Finish',
  showProgress = true,
  sx,
  ...props
}: MultiStepFormProps) => {
  const [uncontrolledStep, setUncontrolledStep] = useState(defaultStep);

  const step = clampStep(stepProp ?? uncontrolledStep, steps.length);
  const stepData = steps[step];

  const isFirst = step <= 0;
  const isLast = steps.length > 0 && step >= steps.length - 1;

  const progress = useMemo(() => {
    if (steps.length <= 0) return 0;
    return Math.round(((step + 1) / steps.length) * 100);
  }, [step, steps.length]);

  const setStep = (next: number) => {
    const clamped = clampStep(next, steps.length);
    if (stepProp === undefined) {
      setUncontrolledStep(clamped);
    }
    onStepChange?.(clamped);
  };

  const handleBack = () => setStep(step - 1);

  const handleNext = () => {
    if (isLast) {
      onFinish?.();
      return;
    }
    setStep(step + 1);
  };

  if (!stepData) {
    return (
      <Box sx={[rootSx, ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
        <Text variant="body2" color="text.secondary">
          No steps configured.
        </Text>
      </Box>
    );
  }

  return (
    <Box sx={[rootSx, ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
      {showProgress && (
        <LinearProgress variant="determinate" value={progress} color="primary" />
      )}

      {stepData.title && (
        <Text variant="h6" component="h2" color="text.primary">
          {stepData.title}
        </Text>
      )}

      <Box sx={contentSx}>{stepData.content}</Box>

      <Box sx={actionsSx}>
        <Button
          variant="text"
          type="button"
          onClick={handleBack}
          disabled={isFirst}
          sx={{ textTransform: 'none' }}
        >
          {backLabel}
        </Button>
        <Button
          variant="contained"
          type="button"
          onClick={handleNext}
          disabled={!!stepData.nextDisabled}
          sx={{ textTransform: 'none' }}
        >
          {isLast ? finishLabel : nextLabel}
        </Button>
      </Box>
    </Box>
  );
};

export default MultiStepForm;

