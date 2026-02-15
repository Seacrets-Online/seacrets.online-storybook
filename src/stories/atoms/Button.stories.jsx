import { within, userEvent } from 'storybook/test';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import Button from '../../components/atoms/Button.jsx';

const SIZES = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];

export default {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    size: {
      control: 'select',
      options: ['extraSmall', 'small', 'medium', 'large', 'extraLarge'],
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

export const Default = {
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
  },
};

export const WithClick = {
  args: {
    children: 'Click me',
    variant: 'contained',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /click me/i }));
  },
};

export const Outlined = {
  args: {
    children: 'Outlined',
    variant: 'outlined',
  },
};

export const Text = {
  args: {
    children: 'Text',
    variant: 'text',
  },
};

export const Disabled = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

/** Figma design: 5 sizes, pill vs rounded, flat vs elevated, icon + Label. */
export const FigmaSizingShowcase = {
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
        { shape: 'pill', disableElevation: true },
        { shape: 'pill', disableElevation: true },
        { shape: 'pill', disableElevation: true },
        { shape: 'rounded', disableElevation: true },
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
        { shape: 'pill', disableElevation: false },
        { shape: 'pill', disableElevation: false },
        { shape: 'pill', disableElevation: false },
        { shape: 'rounded', disableElevation: false },
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

export const WithIconAndLabel = {
  args: {
    children: 'Label',
    variant: 'contained',
    color: 'primary',
    startIcon: <StarIcon />,
  },
};

export const PillShape = {
  args: {
    children: 'Pill button',
    variant: 'contained',
    shape: 'pill',
  },
};

export const AllSizes = {
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
