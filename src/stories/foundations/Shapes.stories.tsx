import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { shapeTokens } from '../../utils/shapes';

const ShapeShowcase = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Border Radius
      </Typography>
      <Grid container spacing={4}>
        {Object.entries(shapeTokens).map(([name, value]) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={name}>
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
                mb: 1,
              }}
            />
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {value}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
        Shadows
      </Typography>
      <Grid container spacing={4}>
        {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={elevation}>
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const meta = {
  title: 'Foundations/Shapes & Shadows',
  component: ShapeShowcase,
} satisfies Meta<typeof ShapeShowcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
