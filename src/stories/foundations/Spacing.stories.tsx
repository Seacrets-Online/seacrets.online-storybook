import { Box } from '@mui/material';
import Text from '../../components/atoms/Text';
import { spacingTokens } from '../../utils/spacing.generated';

export default {
  title: 'Foundations/Spacing',
  parameters: {
    layout: 'padded',
  },
};

export const Scale = {
  render: () => {
    const colorBorder = 'var(--md-sys-color-on-primary)';
    const colorPrimary = 'var(--md-sys-color-primary-container)';

    const steps = Object.entries(spacingTokens)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => a.value - b.value);

    const space48 = spacingTokens['48'] ?? 48;
    const space16 = spacingTokens['16'] ?? 16;
    const space24 = spacingTokens['24'] ?? 24;
    const space12 = spacingTokens['12'] ?? 12;
    const space4 = spacingTokens['4'] ?? 4;

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${space48}px` }}>
        {/* Header and Usage Guidelines */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${space16}px` }}>
          <Text variant="h1" component="h1">
            Spacing Scale
          </Text>
          <Text variant="body1" color="text.primary" sx={{ maxWidth: 800, lineHeight: 1.6 }}>
            Our spacing scale is extracted directly from <strong>Figma (Tokens Studio)</strong>. 
            Strictly use these values to maintain vertical and horizontal rhythm for margins, paddings, and gaps between components.
          </Text>
        </Box>

        {/* Visual Representation of the Scale */}
        <Box>
          <Text variant="h6" component="h3" sx={{ mb: `${space24}px` }}>
            Available Tokens
          </Text>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${space16}px` }}>
            {steps.map((step) => (
              <Box
                key={step.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${space24}px`,
                  borderBottom: `1px solid ${colorBorder}`,
                  pb: `${space12}px`,
                }}
              >
                <Text variant="body2" fontWeight="bold" sx={{ width: 100 }}>
                  spacing-{step.name}
                </Text>
                <Text variant="body2" color="text.primary" sx={{ width: 80 }}>
                  {step.value}px
                </Text>
                <Box
                  sx={{
                    height: `${space24}px`,
                    width: `${step.value}px`,
                    backgroundColor: colorPrimary,
                    borderRadius: `${space4}px`,
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Do's and Don'ts */}
        <Box>
          <Text variant="h6" component="h3" sx={{ mb: `${space16}px` }}>
            Do & Dont
          </Text>
          <Box
            component="ul"
            sx={{
              color: 'text.primary',
              lineHeight: 2,
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            <Box component="li">
              <Text variant="body2" color="text.primary" component="span">
                DO: Use the theme engine or CSS variables to apply spacing.
              </Text>
            </Box>
            <Box component="li">
              <Text variant="body2" color="text.primary" component="span">
                DO: Maintain spatial consistency by grouping related components with smaller separations (e.g., 4px, 8px), and distant blocks with larger spaces (e.g., 32px, 48px).
              </Text>
            </Box>
            <Box component="li">
              <Text variant="body2" color="text.primary" component="span">
                DON'T: Inject hardcoded magic numbers into your styles (e.g. marginTop: '15px').
              </Text>
            </Box>
            <Box component="li">
              <Text variant="body2" color="text.primary" component="span">
                DON'T: Invent intermediate spaces that do not exist in the table above.
              </Text>
            </Box>
          </Box>
        </Box>

      </Box>
    );
  }
};