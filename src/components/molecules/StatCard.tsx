import { Stack } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { Text } from "../atoms/Text";

export interface StatCardProps {
  /**
   * Label text (e.g., "Ganancias Netas")
   */
  label: string;
  /**
   * Value to display (e.g., "300$")
   */
  value: string | number;
  /**
   * Color of the value text
   */
  valueColor?: string;
  /**
   * Size variant
   */
  size?: "small" | "medium" | "large";
  /**
   * Additional sx props
   */
  sx?: SxProps<Theme>;
}

const SIZE_CONFIG = {
  small: {
    labelVariant: "label-small" as const,
    valueVariant: "headline-small" as const,
  },
  medium: {
    labelVariant: "label-medium" as const,
    valueVariant: "headline-medium" as const,
  },
  large: {
    labelVariant: "body-medium" as const,
    valueVariant: "display-small" as const,
  },
};

export const StatCard = ({
  label,
  value,
  valueColor = "var(--md-sys-color-on-surface)",
  size = "large",
  sx,
}: StatCardProps) => {
  const config = SIZE_CONFIG[size];

  return (
    <Stack
      alignItems="center"
      sx={[
        (theme) => ({
          textAlign: "center",
          gap: theme.layout.space4,
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Text
        variant={config.labelVariant}
        sx={{
          color: "var(--md-sys-color-on-surface-variant)",
          textTransform: "none",
        }}
      >
        {label}
      </Text>
      <Text
        variant={config.valueVariant}
        sx={{
          color: valueColor,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {value}
      </Text>
    </Stack>
  );
};

export default StatCard;
