import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from 'storybook/test';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import Button from '../../components/atoms/Button';
import type { ButtonSize } from '../../components/atoms/Button';

const SIZES: ButtonSize[] = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    size: {
      control: 'select',
      options: SIZES,
    },
    shape: {
      control: 'select',
      options: ['pill', 'rounded'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'success'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
  },
};

export const WithClick: Story = {
  args: {
    children: 'Click me',
    variant: 'contained',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /click me/i }));
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined',
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    children: 'Text',
    variant: 'text',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const FigmaSizingShowcase: Story = {
  render: () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 3,
        p: 3,
        bgcolor: 'action.hover',
        borderRadius: 2,
        maxWidth: 900,
      }}
    >
      {[
        { shape: 'pill' as const, disableElevation: true },
        { shape: 'pill' as const, disableElevation: true },
        { shape: 'pill' as const, disableElevation: true },
        { shape: 'rounded' as const, disableElevation: true },
      ].map((opts, col) => (
        <Box key={col} sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
          {SIZES.map((size) => (
            <Button
              key={size}
              variant="contained"
              color="primary"
              size={size}
              shape={opts.shape}
              disableElevation={opts.disableElevation}
              startIcon={size === 'extraSmall' ? <AddIcon /> : <StarIcon />}
            >
              Label
            </Button>
          ))}
        </Box>
      ))}
      {[
        { shape: 'pill' as const, disableElevation: false },
        { shape: 'pill' as const, disableElevation: false },
        { shape: 'pill' as const, disableElevation: false },
        { shape: 'rounded' as const, disableElevation: false },
      ].map((opts, col) => (
        <Box key={col} sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
          {SIZES.map((size) => (
            <Button
              key={size}
              variant="contained"
              color="primary"
              size={size}
              shape={opts.shape}
              disableElevation={opts.disableElevation}
              startIcon={size === 'extraSmall' ? <AddIcon /> : <StarIcon />}
            >
              Label
            </Button>
          ))}
        </Box>
      ))}
    </Box>
  ),
};

export const WithIconAndLabel: Story = {
  args: {
    children: 'Label',
    variant: 'contained',
    color: 'primary',
    startIcon: <StarIcon />,
  },
};

export const PillShape: Story = {
  args: {
    children: 'Pill button',
    variant: 'contained',
    shape: 'pill',
  },
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
      {SIZES.map((size) => (
        <Button key={size} variant="contained" size={size} startIcon={<StarIcon />}>
          Label
        </Button>
      ))}
    </Box>
  ),
};
