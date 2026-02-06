function App() {
  const containerStyles = {
    minHeight: '100vh',
    backgroundColor: 'var(--md-sys-color-surface)',
    padding: '32px',
  };

  const headingStyles = {
    fontFamily: 'var(--md-sys-typescale-headline-large-font-family)',
    fontSize: 'var(--md-sys-typescale-headline-large-font-size)',
    lineHeight: 'var(--md-sys-typescale-headline-large-line-height)',
    fontWeight: 'var(--md-sys-typescale-headline-large-font-weight)',
    letterSpacing: 'var(--md-sys-typescale-headline-large-letter-spacing)',
    color: 'var(--md-sys-color-on-surface)',
    margin: 0,
  };

  const paragraphStyles = {
    fontFamily: 'var(--md-sys-typescale-body-medium-font-family)',
    fontSize: 'var(--md-sys-typescale-body-medium-font-size)',
    lineHeight: 'var(--md-sys-typescale-body-medium-line-height)',
    fontWeight: 'var(--md-sys-typescale-body-medium-font-weight)',
    letterSpacing: 'var(--md-sys-typescale-body-medium-letter-spacing)',
    color: 'var(--md-sys-color-on-surface-variant)',
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
