import type { Meta, StoryObj } from '@storybook/react';
import OnboardingStepTemplate from '../../components/templates/OnboardingStepTemplate';
import TextField from '../../components/molecules/TextField';
const meta = {
  title: 'Templates/OnboardingStepTemplate',
  component: OnboardingStepTemplate,
  parameters: { layout: 'fullscreen', docs: { page: null } },
} satisfies Meta<typeof OnboardingStepTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Selecciona tu Nombre de Usuario',
    step: 1,
    totalSteps: 7,
    nextLabel: 'Siguiente',
    onNext: () => {},
    onBack: () => {},
    children: (
      <TextField label="Nombre Completo" placeholder="Nombre Completo" />
    ),
  },
};
