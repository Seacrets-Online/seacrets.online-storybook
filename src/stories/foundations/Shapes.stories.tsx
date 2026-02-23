import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Typography, Grid, Paper, Stack } from '@mui/material';
import { shapeTokens } from '../../utils/shapes';

const ShapeShowcase = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Border Radius
      </Typography>
      <Grid container spacing={4}>
        {Object.entries(shapeTokens).map(([name, value]) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={name}>
            <Stack spacing={1} alignItems="flex-start">
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.main',
                  borderRadius: value,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.contrastText',
                }}
              />
              <Typography variant="subtitle2">{name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {value}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
        Shadows
      </Typography>
      <Grid container spacing={4}>
        {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={elevation}>
            <Stack spacing={1} alignItems="flex-start">
              <Paper
                elevation={elevation}
                sx={{
                  width: 100,
                  height: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6">{elevation}</Typography>
              </Paper>
              <Typography variant="caption" color="text.secondary">
                elevation {elevation}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const meta = {
  title: 'Foundations/Shapes & Shadows',
  component: ShapeShowcase,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      disable: true,
    },
  },
} satisfies Meta<typeof ShapeShowcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
