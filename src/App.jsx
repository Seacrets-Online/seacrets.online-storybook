import * as tokens from './style-dictionary-dist/variables.js';
import { getTypographyStyles } from './utils/typography.js';

function App() {
  const containerStyles = {
    minHeight: '100vh',
    backgroundColor: tokens.mdSysColorSurface,
    padding: '32px',
  };

  const headingStyles = {
    ...getTypographyStyles('headline-large'),
    color: tokens.mdSysColorOnsurface,
    margin: 0,
  };

  const paragraphStyles = {
    ...getTypographyStyles('body-medium'),
    color: tokens.mdSysColorOnsurfacevariant,
    marginTop: '16px',
    marginBottom: 0,
  };

  return (
    <div style={containerStyles}>
      <h1 style={headingStyles}>
        Seacrets Design System
      </h1>
      <p style={paragraphStyles}>
        Design System workspace initialized with React + Vite
      </p>
    </div>
  );
}

export default App;
