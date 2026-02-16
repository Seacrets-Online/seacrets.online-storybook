import type { Meta, StoryObj } from '@storybook/react';
import { Typography, Box, Divider } from '@mui/material';

const TypographyShowcase = () => {
  const variants = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'button',
    'caption',
    'overline',
  ] as const;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      {variants.map((variant) => (
        <Box key={variant} sx={{ mb: 4 }}>
          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
            {variant}
          </Typography>
          <Typography variant={variant} gutterBottom>
            The quick brown fox jumps over the lazy dog
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

const meta = {
  title: 'Foundations/Typography',
  component: TypographyShowcase,
} satisfies Meta<typeof TypographyShowcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
