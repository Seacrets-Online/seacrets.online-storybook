import type { Meta, StoryObj } from '@storybook/react';
import OnboardingStepTemplate from '../../components/templates/OnboardingStepTemplate';

const meta: Meta<typeof OnboardingStepTemplate> = {
  title: 'Templates/OnboardingStepTemplate',
  component: OnboardingStepTemplate,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Step 1',
    subtitle: 'Enter your details',
    step: 1,
    totalSteps: 3,
    onNext: () => {},
    onBack: () => {},
    children: <p>Step content</p>,
  },
};
