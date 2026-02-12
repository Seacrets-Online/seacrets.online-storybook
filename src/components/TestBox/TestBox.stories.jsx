import { TestBox } from "./TestBox";
import materialTheme from "../../tokens/material-theme.json";
import { getShapeToken } from "../../utils/shapes.js";

export default {
  title: "Examples/TestBox",
  component: TestBox,
  parameters: {
    layout: "centered",
  },
};

export const Light = {
  render: () => <TestBox theme="light" />,
};

export const Dark = {
  render: () => <TestBox theme="dark" />,
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const PrimaryPalette = {
  render: () => {
    const palette = materialTheme.palettes.primary;
    const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ marginBottom: "8px" }}>Primary Palette (Pink)</h3>
        {tones.map((tone) => (
          <div
            key={tone}
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <div
              style={{
                backgroundColor: palette[tone],
                width: "100px",
                height: "40px",
                borderRadius: getShapeToken("corner-extra-small"),
                border:
                  tone > 90
                    ? "1px solid var(--md-sys-color-outline-variant)"
                    : "none",
              }}
            />
            <span style={{ fontFamily: "monospace", fontSize: "14px" }}>
              {tone}: {palette[tone]}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

export const SecondaryPalette = {
  render: () => {
    const palette = materialTheme.palettes.secondary;
    const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ marginBottom: "8px" }}>Secondary Palette (Dark Red)</h3>
        {tones.map((tone) => (
          <div
            key={tone}
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <div
              style={{
                backgroundColor: palette[tone],
                width: "100px",
                height: "40px",
                borderRadius: getShapeToken("corner-extra-small"),
                border:
                  tone > 90
                    ? "1px solid var(--md-sys-color-outline-variant)"
                    : "none",
              }}
            />
            <span style={{ fontFamily: "monospace", fontSize: "14px" }}>
              {tone}: {palette[tone]}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

export const TertiaryPalette = {
  render: () => {
    const palette = materialTheme.palettes.tertiary;
    const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ marginBottom: "8px" }}>Tertiary Palette (Orange/Gold)</h3>
        {tones.map((tone) => (
          <div
            key={tone}
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <div
              style={{
                backgroundColor: palette[tone],
                width: "100px",
                height: "40px",
                borderRadius: getShapeToken("corner-extra-small"),
                border:
                  tone > 90
                    ? "1px solid var(--md-sys-color-outline-variant)"
                    : "none",
              }}
            />
            <span style={{ fontFamily: "monospace", fontSize: "14px" }}>
              {tone}: {palette[tone]}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

export const NeutralPalette = {
  render: () => {
    const palette = materialTheme.palettes.neutral;
    const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ marginBottom: "8px" }}>Neutral Palette (Grays)</h3>
        {tones.map((tone) => (
          <div
            key={tone}
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <div
              style={{
                backgroundColor: palette[tone],
                width: "100px",
                height: "40px",
                borderRadius: getShapeToken("corner-extra-small"),
                border:
                  tone > 90
                    ? "1px solid var(--md-sys-color-outline-variant)"
                    : "none",
              }}
            />
            <span style={{ fontFamily: "monospace", fontSize: "14px" }}>
              {tone}: {palette[tone]}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

export const AllPalettes = {
  render: () => {
    const palettes = {
      Primary: materialTheme.palettes.primary,
      Secondary: materialTheme.palettes.secondary,
      Tertiary: materialTheme.palettes.tertiary,
      Neutral: materialTheme.palettes.neutral,
    };

    return (
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {Object.entries(palettes).map(([name, palette]) => (
          <div key={name} style={{ minWidth: "200px" }}>
            <h4 style={{ marginBottom: "12px" }}>{name}</h4>
            <div
              style={{
                display: "flex",
                height: "200px",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tone) => (
                <div
                  key={tone}
                  style={{
                    backgroundColor: palette[tone],
                    flex: 1,
                    position: "relative",
                  }}
                  title={`${tone}: ${palette[tone]}`}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "10px",
                marginTop: "4px",
                fontFamily: "monospace",
              }}
            >
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
