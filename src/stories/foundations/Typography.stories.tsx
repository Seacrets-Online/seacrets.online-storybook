import React from 'react';
import typographyTokens from '../../utils/typography';

export default {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
  },
};

export const Scale = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {Object.entries(typographyTokens).map(([name, styles]) => (
        <div key={name} style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '16px' }}>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#666',
            marginBottom: '8px',
            display: 'flex',
            gap: '16px'
          }}>
            <span style={{ fontWeight: 'bold', color: 'var(--md-sys-color-on-surface)' }}>{name}</span>
            <span>Weight: {styles.fontWeight}</span>
            <span>Size: {styles.fontSize}</span>
            <span>Line: {styles.lineHeight}</span>
          </div>

          <div style={{ color: 'var(--md-sys-color-on-surface)', ...(styles as React.CSSProperties) }}>
            {name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </div>
          <div style={{ color: 'var(--md-sys-color-on-surface)', ...(styles as React.CSSProperties) }}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
      ))}
    </div>
  ),
};