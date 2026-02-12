import { getTypographyStyles } from "./utils/typography.js";

function App() {
  const containerStyles = {
    minHeight: "100vh",
    backgroundColor: "var(--md-sys-color-surface)",
    padding: "32px",
  };

  const headingStyles = {
    ...getTypographyStyles("headline-large"),
    color: "var(--md-sys-color-on-surface)",
    margin: 0,
  };

  const paragraphStyles = {
    ...getTypographyStyles("body-medium"),
    color: "var(--md-sys-color-on-surface-variant)",
    marginTop: "16px",
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
