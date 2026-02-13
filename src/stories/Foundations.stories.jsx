import React from 'react';
import { typographyTokens } from '../utils/typography';
import { spacingTokens } from '../utils/spacing';

/**
 * Visual documentation for System Foundations.
 * These utilities are used to build consistent components across the application.
 *
 * ## Definition of Done (US-4.2)
 * - ✅ Typography: Visualizes all styles from Display to Label.
 * - ✅ Spacing: Visualizes the spacing scale (4px - 64px).
 * - ✅ Tokens: All values are derived from `tokens.json`.
 */
export default {
  title: 'System/Foundations',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Core design foundations derived from Material Design 3 tokens.',
      },
    },
  },
};

/**
 * **Typography Scale**
 * Shows all available text styles defined in `src/utils/typography.js`.
 * Each block applies the actual CSS styles to the text.
 */
export const Typography = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {Object.entries(typographyTokens).map(([name, styles]) => (
        <div key={name} style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '16px' }}>
          {/* Technical Details (Metadata) */}
          <div style={{
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#666',
            marginBottom: '4px',
            display: 'flex',
            gap: '12px'
          }}>
            <span style={{ fontWeight: 'bold', color: '#000' }}>{name}</span>
            <span>Weight: {styles.fontWeight}</span>
            <span>Size: {styles.fontSize}</span>
            <span>Line: {styles.lineHeight}</span>
          </div>

          {/* Visual Preview */}
          <div style={{ color: '#1d1b20', ...styles }}>
            {name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </div>
          <div style={{ color: '#1d1b20', ...styles }}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * **Spacing Scale**
 * Shows the spacing increments defined in `src/utils/spacing.js`.
 * These should be used for margins, paddings, and gaps.
 */
export const Spacing = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {Object.entries(spacingTokens).map(([name, value]) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center' }}>
          {/* Label */}
          <div style={{
            width: '80px',
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#444'
          }}>
            space-{name}
          </div>

          {/* Visual Bar */}
          <div style={{
            height: '24px',
            width: value,
            backgroundColor: 'var(--md-sys-color-primary)', // Primary color visual indicator
            borderRadius: '4px',
            minWidth: '1px' // Ensure 0px or small values are handled if needed
          }} />

          {/* Value Label */}
          <div style={{
            marginLeft: '12px',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#666'
          }}>
            {value}
          </div>
        </div>
      ))}
    </div>
  ),
};