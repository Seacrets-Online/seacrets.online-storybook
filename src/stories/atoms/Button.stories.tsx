import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent } from 'storybook/test';
import { Box } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';
import Button from '../../components/atoms/Button';
import type { ButtonSize } from '../../components/atoms/Button';

const SIZES: ButtonSize[] = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
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
      options: ['pill', 'rounded', 'square'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'success'],
    },
  },
} satisfies Meta<typeof Button>;

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole('button', { name: /outlined/i });
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

export const SquareShape: Story = {
  args: {
    children: 'Square button',
    variant: 'contained',
    shape: 'square',
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
