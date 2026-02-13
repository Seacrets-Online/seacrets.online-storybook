import React from "react";
import tokens from "../../tokens/tokens.json";

export const TokenTester = () => {
  // Obtaining all keys from the tokens object and filtering those that include "md/" (e.g., "md/Light", "md/Dark")
  const modes = Object.keys(tokens).filter((key) => key.includes("md/"));

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "sans-serif",
        backgroundColor: "var(--md-sys-color-surface)",
        color: "var(--md-sys-color-on-surface)",
      }}
    >
      <h2>🎨 Token Validation (Light & Dark)</h2>

      {modes.map((modeName) => {
        // Here we dynamically access tokens["md/Light"].md.sys.color
        const modeColors = tokens[modeName].md.sys.color;

        return (
          <div key={modeName} style={{ marginBottom: "40px" }}>
            <h3
              style={{
                textTransform: "capitalize",
                borderBottom: "2px solid var(--md-sys-color-outline-variant)",
              }}
            >
              {modeName} Mode
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "16px",
                marginTop: "16px",
              }}
            >
              {Object.keys(modeColors).map((tokenName) => (
                <div
                  key={tokenName}
                  style={{
                    border: "1px solid var(--md-sys-color-outline-variant)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor:
                      "var(--md-sys-color-surface-container-low)",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      height: "60px",
                      backgroundColor: modeColors[tokenName].value,
                      width: "100%",
                    }}
                  />
                  <div style={{ padding: "10px", fontSize: "12px" }}>
                    <strong>{tokenName}</strong>
                    <br />
                    <code
                      style={{
                        color: "var(--md-sys-color-on-surface-variant)",
                      }}
                    >
                      {modeColors[tokenName].value}
                    </code>
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
