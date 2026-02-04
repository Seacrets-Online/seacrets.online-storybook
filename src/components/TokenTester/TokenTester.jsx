import React from 'react';
import tokens from '../../tokens/tokens.json';

export const TokenTester = () => {
  // Targeting the semantic color system (md.sys.color)
  const colors = tokens.md.sys.color;

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '16px' }}>Token Validation Board</h2>
      <p style={{ marginBottom: '24px', color: '#666' }}>
        <strong>Status Check:</strong> Verify that the "success" token below is displayed in GREEN.
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '16px' 
      }}>
        {Object.keys(colors).map((tokenName) => (
          <div key={tokenName} style={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px', 
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            {/* Visual Swatch */}
            <div style={{ 
              height: '80px', 
              backgroundColor: colors[tokenName].value,
              width: '100%'
            }} />
            
            {/* Token Details */}
            <div style={{ padding: '12px', fontSize: '12px' }}>
              <strong style={{ display: 'block', marginBottom: '4px' }}>{tokenName}</strong>
              <code style={{ 
                background: '#f5f5f5', 
                padding: '2px 4px', 
                borderRadius: '4px',
                color: '#666'
              }}>
                {colors[tokenName].value}
              </code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};