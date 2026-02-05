import React from 'react';
import tokens from '../../tokens/tokens.json';

export const TokenTester = () => {
  // Obtengo las llaves principales para "md/Light" y "md/Dark"
  const modes = Object.keys(tokens).filter(key => key.includes('md/'));

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
      <h2>🎨 Token Validation (Light & Dark)</h2>
      
      {modes.map((modeName) => {
        // aquí accedemos dinámicamente a tokens["md/Light"].md.sys.color
        const modeColors = tokens[modeName].md.sys.color;

        return (
          <div key={modeName} style={{ marginBottom: '40px' }}>
            <h3 style={{ textTransform: 'capitalize', borderBottom: '2px solid #ccc' }}>
              {modeName} Mode
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
              gap: '16px',
              marginTop: '16px'
            }}>
              {Object.keys(modeColors).map((tokenName) => (
                <div key={tokenName} style={{ 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ 
                    height: '60px', 
                    backgroundColor: modeColors[tokenName].value,
                    width: '100%'
                  }} />
                  <div style={{ padding: '10px', fontSize: '12px' }}>
                    <strong>{tokenName}</strong>
                    <br/>
                    <code style={{ color: '#666' }}>{modeColors[tokenName].value}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};