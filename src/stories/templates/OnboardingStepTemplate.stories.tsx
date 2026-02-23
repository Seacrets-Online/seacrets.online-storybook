import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import OnboardingStepTemplate from '../../components/templates/OnboardingStepTemplate';
import TextField from '../../components/molecules/TextField';
import Text from '../../components/atoms/Text';
import { within } from 'storybook/test';
import { withFullscreen } from '../decorators';

const meta = {
  title: 'Templates/OnboardingStepTemplate',
  component: OnboardingStepTemplate,
  tags: ['test'],
  decorators: [withFullscreen],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof OnboardingStepTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const steps = [
      {
        title: 'Selecciona tu Nombre de Usuario',
        subtitle: 'Este será tu nombre público en la plataforma.',
        children: <TextField label="Nombre de Usuario" placeholder="@usuario" />,
      },
      {
        title: 'Tu Fecha de Nacimiento',
        subtitle: 'Necesitamos verificar que eres mayor de edad.',
        children: <TextField label="Fecha de Nacimiento" placeholder="DD/MM/AAAA" />,
      },
      {
        title: 'Carga tu Foto de Perfil',
        subtitle: '¡Haz que tu perfil destaque!',
        children: (
          <div style={{ textAlign: 'center', padding: '20px', border: '2px dashed #ccc', borderRadius: '12px' }}>
            <Text variant="body2" color="text.secondary">Área de carga de imagen</Text>
          </div>
        ),
      },
    ];

    const stepData = steps[currentStep - 1];

    return (
      <OnboardingStepTemplate
        {...args}
        title={stepData.title}
        subtitle={stepData.subtitle}
        step={currentStep}
        totalSteps={totalSteps}
        onNext={() => currentStep < totalSteps && setCurrentStep(s => s + 1)}
        onBack={currentStep > 1 ? () => setCurrentStep(s => s - 1) : undefined}
        nextLabel={currentStep === totalSteps ? 'Finalizar' : 'Siguiente'}
      >
        {stepData.children}
      </OnboardingStepTemplate>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByText(/selecciona tu nombre de usuario/i);
  },
};
