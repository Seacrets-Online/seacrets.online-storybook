import tokens from '../../tokens/tokens.json';
import { Box, Typography } from '@mui/material';

// Extract the exact branch where spacing tokens from Figma are stored
const spacingTokens = (tokens as any).seacrets['online/global'].spacing;

export default {
  title: 'Foundations/Spacing',
  parameters: {
    layout: 'padded',
    viewport: {
      disable: true,
    },
  },
};

export const Scale = {
  render: () => {
    // Convert the JSON object into an array and sort it from smallest to largest
    const steps = Object.entries(spacingTokens)
      .map(([name, data]: [string, any]) => ({
        name,
        value: data.$value,
      }))
      .sort((a, b) => a.value - b.value);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', fontFamily: 'var(--md-sys-typescale-body-large-font-family, sans-serif)' }}>
        
        {/* Header and Usage Guidelines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1 style={{ margin: 0, color: 'var(--seacrets-online-schemes-on-surface)' }}>
            Spacing Scale
          </h1>
          <p style={{ margin: 0, color: 'var(--seacrets-online-schemes-on-surface-variant)', maxWidth: '800px', lineHeight: 1.6 }}>
            Our spacing scale is extracted directly from <strong>Figma (Tokens Studio)</strong>. 
            Strictly use these values to maintain vertical and horizontal rhythm for margins, paddings, and gaps between components.
          </p>
        </div>

        {/* Visual Representation of the Scale */}
        <div>
          <h3 style={{ color: 'var(--seacrets-online-schemes-on-surface)', marginBottom: '24px' }}>Available Tokens</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {steps.map((step) => (
              <div key={step.name} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '24px', 
                borderBottom: '1px solid var(--seacrets-online-schemes-outline-variant)', 
                paddingBottom: '12px' 
              }}>
                <div style={{ width: '100px', fontSize: '14px', fontWeight: 'bold', color: 'var(--seacrets-online-schemes-on-surface)' }}>
                  spacing-{step.name}
                </div>
                <div style={{ width: '80px', fontSize: '14px', color: 'var(--seacrets-online-schemes-on-surface-variant)' }}>
                  {step.value}px
                </div>
                <div style={{
                  height: '24px',
                  width: `${step.value}px`,
                  backgroundColor: 'var(--seacrets-online-schemes-primary)',
                  borderRadius: '4px'
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div>
          <h3 style={{ color: 'var(--seacrets-online-schemes-on-surface)', marginBottom: '16px' }}>Do & Dont</h3>
          <ul style={{ 
            color: 'var(--seacrets-online-schemes-on-surface-variant)', 
            lineHeight: 2,
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <li>✅ <strong>DO:</strong> Use the theme engine or CSS variables to apply spacing.</li>
            <li>✅ <strong>DO:</strong> Maintain spatial consistency by grouping related components with smaller separations (e.g., 4px, 8px), and distant blocks with larger spaces (e.g., 32px, 48px).</li>
            <li>❌ <strong>DON'T:</strong> Inject hardcoded "magic numbers" into your styles (e.g., <code>marginTop: '15px'</code>).</li>
            <li>❌ <strong>DON'T:</strong> Invent intermediate spaces that do not exist in the table above.</li>
          </ul>
        </div>

      </div>
    );
  }
};

/**
 * Component to verify that the MUI theme correctly consumes our token dictionary.
 * Using string values like '32' or '16' should trigger our custom parser in createTheme.ts.
 */
export const TokenUsageExample = {
  render: () => (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        p: 32, 
        m: 16, 
        borderRadius: 2,
      }}
    >
      <Typography variant="body1">
        This box uses token-driven spacing! 
        Padding is dynamically mapped to token 32 and margin to token 16.
        Check the DevTools (Inspect) to verify the computed CSS values!
      </Typography>
    </Box>
  ),
};