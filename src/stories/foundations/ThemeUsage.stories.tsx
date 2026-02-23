import { Alert, Box, Divider, Paper, Stack, Typography, useTheme } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const FILE_PATHS = [
  {
    label: 'Theme variables source',
    path: 'src/style-dictionary-dist/theme.css',
    notes: 'Generated CSS variables from tokens. Uses `:root` and `[data-theme="dark"]`.',
  },
  {
    label: 'Global CSS import',
    path: 'src/styles/index.css',
    notes: 'Imports `../style-dictionary-dist/theme.css` so stories consume tokens.',
  },
  {
    label: 'Theme provider setup',
    path: '.storybook/preview.ts',
    notes: 'Registers light/dark themes and writes `data-theme` on the root element.',
  },
  {
    label: 'MUI bridge',
    path: 'src/theme/mui/createTheme.ts',
    notes: 'Maps `var(--md-sys-*)` color tokens into MUI palette and exports `lightTheme` / `darkTheme`.',
  },
];

const usageSamples = [
  {
    title: 'Token-first styling',
    description: 'Use token variables directly for custom styles.',
    expression: 'backgroundColor: "var(--md-sys-color-primary)"',
    expected: 'Changes with data-theme without manual palette overrides.',
  },
  {
    title: 'MUI token bridge',
    description: 'Use MUI palette mapped from the same CSS variables.',
    expression: 'bgcolor: theme.palette.primary.main',
    expected: 'Keeps component system in sync with the same token source.',
  },
  {
    title: 'Theme mode read',
    description: 'Read current toolbar theme from the runtime document attribute.',
    expression: 'document.documentElement.getAttribute("data-theme")',
    expected: 'Matches Storybook toolbar selection (light/dark).',
  },
];

const ThemeUsageContent = () => {
  const theme = useTheme();
  const currentDataTheme = typeof document === 'undefined' ? 'server' : document.documentElement.getAttribute('data-theme') ?? 'unset';

  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 600, mb: 1 }}>
            Theme usage (Storybook)
          </Typography>
          <Typography color="text.secondary">
            This page documents how Storybook uses generated MD3 CSS tokens together with MUI theme
            mapping. It reflects the current implementation, no mock layer.
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            1) Theme switching flow
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Storybook global decorator sets theme mode and applies `data-theme` on the document root.
          </Typography>
          <Typography component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
{`// .storybook/preview.ts
ThemeProvider: lightTheme | darkTheme
withThemeFromJSXProvider(...themes: { light, dark })
Story decorator:
document.documentElement.setAttribute("data-theme", theme)
`}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2">Current runtime values</Typography>
          <Typography>
            MUI mode: <strong>{theme.palette.mode}</strong> — document theme: <strong>{currentDataTheme}</strong>
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            2) Token source and theme files
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Tokens are generated from Figma JSON and exposed as CSS variables.
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {FILE_PATHS.map((entry) => (
              <Box key={entry.path} sx={{ borderLeft: 3, borderColor: 'primary.main', pl: 2 }}>
                <Typography variant="subtitle2">{entry.label}</Typography>
                <Typography sx={{ fontFamily: 'monospace', color: 'text.secondary', mb: 0.5 }}>{entry.path}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {entry.notes}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            3) Quick usage examples
          </Typography>
          <Stack spacing={2}>
            {usageSamples.map((sample) => (
              <Box key={sample.title}>
                <Typography variant="subtitle2">{sample.title}</Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {sample.description}
                </Typography>
                <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', m: 0 }}>
{`{ ${sample.expression} } // => ${sample.expected}`}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>

        <Alert severity="info">
          <Typography variant="subtitle2">Live sanity check</Typography>
          <Typography variant="body2">
            Change theme in Storybook toolbar (light/dark). You should see `theme.palette.mode` and
            `data-theme` update together, and this page colors/spacing adapt automatically.
          </Typography>
        </Alert>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            4) Common pitfalls
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • Don&apos;t hardcode visual values like `#fff` when they should come from tokens.
            </Typography>
            <Typography variant="body2">
              • Don&apos;t edit `theme.css` by hand; it is generated by Style Dictionary.
            </Typography>
            <Typography variant="body2">
              • Don&apos;t apply `data-theme` only to local containers; token switching is expected on
              `document.documentElement`.
            </Typography>
            <Typography variant="body2">
              • Don&apos;t pass custom colors to MUI components if a mapped token variant already exists.
            </Typography>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Token-driven visual sample
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Box
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              <Typography variant="subtitle1">MUI primary</Typography>
              <Typography variant="body2">
                {`theme.palette.primary.main = ${theme.palette.primary.main}`}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 2,
                color: 'var(--md-sys-color-on-primary)',
                backgroundColor: 'var(--md-sys-color-primary)',
              }}
            >
              <Typography variant="subtitle1">CSS token</Typography>
              <Typography variant="body2">
                backgroundColor: var(--md-sys-color-primary)
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

const meta = {
  title: 'Foundations/Theme usage',
  component: ThemeUsageContent,
  parameters: {
    layout: 'padded',
    viewport: {
      disable: true,
    },
  },
} satisfies Meta<typeof ThemeUsageContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Page: Story = {};
