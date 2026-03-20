import { Stack } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { Text } from "../atoms/Text";

export interface StatItem {
  /**
   * Label text (e.g., "Hoy", "Esta Semana")
   */
  label: string;
  /**
   * Value to display (e.g., "$0", "$100")
   */
  value: string | number;
  /**
   * Color of the value text
   */
  valueColor?: string;
}

export interface StatRowProps {
  /**
   * Array of stat items
   */
  stats: StatItem[];
  /**
   * Additional sx props
   */
  sx?: SxProps<Theme>;
}

export const StatRow = ({ stats, sx }: StatRowProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={[
        (theme) => ({
          width: "100%",
          gap: theme.layout.space16,
          bgcolor: "#1A1A1A",
          py: theme.layout.space12,
          px: theme.layout.space16,
          borderRadius: theme.layout.space4,
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {stats.map((stat, index) => (
        <Stack
          key={`${stat.label}-${index}`}
          alignItems="center"
          sx={{
            flex: 1,
            textAlign: "center",
            gap: (theme) => theme.layout.space4,
          }}
        >
          <Text
            variant="headline-medium"
            sx={{
              color: stat.valueColor || "var(--md-sys-color-on-surface)",
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {stat.value}
          </Text>
          <Text
            variant="label-small"
            sx={{
              color: "var(--md-sys-color-on-surface-variant)",
              textTransform: "none",
            }}
          >
            {stat.label}
          </Text>
        </Stack>
      ))}
    </Stack>
  );
};

export default StatRow;
