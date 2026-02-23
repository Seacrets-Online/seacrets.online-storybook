import { getTypographyStyles } from './utils/typography';
import { spacingTokens } from './utils/spacing';

function App() {
  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: 'var(--md-sys-color-surface)',
    padding: `${spacingTokens['32']}px`,
  };

  const headingStyles: React.CSSProperties = {
    ...getTypographyStyles('headline-large'),
    color: 'var(--md-sys-color-on-surface)',
    margin: 0,
  };

  const paragraphStyles: React.CSSProperties = {
    ...getTypographyStyles('body-medium'),
    color: 'var(--md-sys-color-on-surface-variant)',
    marginTop: `${spacingTokens['16']}px`,
    marginBottom: 0,
  };

  return (
    <div style={containerStyles}>
      <h1 style={headingStyles}>Seacrets Design System</h1>
      <p style={paragraphStyles}>
        Design System workspace initialized with React + Vite
      </p>
    </div>
  );
}

export default App;
