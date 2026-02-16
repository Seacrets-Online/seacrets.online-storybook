import type { Meta, StoryObj } from '@storybook/react';
import { useTheme, Box, Typography, Grid, Paper } from '@mui/material';

const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
  <Paper elevation={0} sx={{ overflow: 'hidden', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
    <Box sx={{ height: 100, bgcolor: color, width: '100%' }} />
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
        {name}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
        {color}
      </Typography>
    </Box>
  </Paper>
);

const ColorsShowcase = () => {
  const theme = useTheme();
  
  const paletteGroups = [
    { name: 'Primary', colors: theme.palette.primary },
    { name: 'Secondary', colors: theme.palette.secondary },
    { name: 'Error', colors: theme.palette.error },
    { name: 'Success', colors: theme.palette.success },
    { name: 'Info', colors: theme.palette.info },
    { name: 'Background', colors: theme.palette.background },
    { name: 'Text', colors: theme.palette.text },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {paletteGroups.map((group) => (
        <Box key={group.name} sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {group.name}
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(group.colors).map(([key, value]) => {
              if (typeof value === 'string') {
                return (
                  <Grid size={{ xs: 6, sm: 4, md: 3 }} key={key}>
                    <ColorSwatch color={value} name={key} />
                  </Grid>
                );
              }
              return null;
            })}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

const meta = {
  title: 'Foundations/Colors',
  component: ColorsShowcase,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ColorsShowcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Palette: Story = {};
