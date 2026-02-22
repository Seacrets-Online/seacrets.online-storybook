import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import MultiStepForm from '../../components/organisms/MultiStepForm';
import TextField from '../../components/molecules/TextField';
import Text from '../../components/atoms/Text';

const meta = {
  title: 'Organisms/MultiStepForm',
  component: MultiStepForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <Box sx={{ width: 360 }}><Story /></Box>],
} satisfies Meta<typeof MultiStepForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: [
      {
        id: 'email',
        title: 'Email',
        content: <TextField label="Email" placeholder="you@example.com" />,
      },
      {
        id: 'profile',
        title: 'Profile',
        content: <TextField label="Display name" placeholder="Your name" />,
      },
      {
        id: 'done',
        title: 'Done',
        content: (
          <Text variant="body2" color="text.secondary">
            Review your details and finish.
          </Text>
        ),
      },
    ],
    onFinish: () => {},
  },
};

