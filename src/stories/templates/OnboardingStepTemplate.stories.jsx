import OnboardingStepTemplate from '../../components/templates/OnboardingStepTemplate.jsx';

export default {
  title: 'Templates/OnboardingStepTemplate',
  component: OnboardingStepTemplate,
  parameters: { layout: 'centered' },
};

export const Default = {
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
