import { Box, Stack } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { Text } from "../atoms/Text";
import { EarningsChart, BarData } from "./EarningsChart";

export interface EarningsSectionProps {
  /**
   * Title of the section
   */
  title?: string;
  /**
   * Chart data
   */
  data: BarData[];
  /**
   * Selected period (e.g., "month", "week", "year")
   */
  period?: string;
  /**
   * Available period options
   */
  periodOptions?: Array<{ value: string; label: string }>;
  /**
   * Period change handler
   */
  onPeriodChange?: (value: string) => void;
  /**
   * Maximum value for chart scaling
   */
  maxValue?: number;
  /**
   * Whether to show the scale
   */
  showScale?: boolean;
  /**
   * Currency symbol
   */
  currencySymbol?: string;
  /**
   * Additional sx props
   */
  sx?: SxProps<Theme>;
}

export const EarningsSection = ({
  title = "Ganancias",
  data,
  period = "month",
  periodOptions = [
    { value: "day", label: "Por día" },
    { value: "week", label: "Por semana" },
    { value: "month", label: "Por mes" },
    { value: "year", label: "Por año" },
  ],
  onPeriodChange,
  maxValue,
  showScale = true,
  currencySymbol = "$",
  sx,
}: EarningsSectionProps) => {
  return (
    <Box
      sx={[
        (theme) => ({
          width: "100%",
          bgcolor: "background.default",
          px: theme.layout.space16,
          py: theme.layout.space16,
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {/* Header with Title and Period Selector */}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          mb: (theme) => theme.layout.space16,
          gap: (theme) => theme.layout.space8,
        }}
      >
        <Text
          variant="title-medium"
          sx={{
            color: "var(--md-sys-color-on-surface)",
            fontWeight: 600,
          }}
        >
          {title}
        </Text>

        <Box
          component="select"
          value={period}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onPeriodChange?.(e.target.value)
          }
          sx={(theme) => ({
            appearance: "none",
            border: "none",
            bgcolor: "var(--md-sys-color-surface-container)",
            color: "var(--md-sys-color-on-surface)",
            borderRadius: theme.layout.space16,
            px: theme.layout.space12,
            py: theme.layout.space4,
            fontSize: "0.875rem",
            fontFamily: "inherit",
            cursor: "pointer",
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27%3E%3Cpath fill=%27%23fff%27 d=%27M6 8L0 0h12z%27/%3E%3C/svg%3E")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 8px center",
            backgroundSize: "10px 6px",
            pr: theme.layout.space24,
          })}
        >
          {periodOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Box>
      </Stack>

      {/* Chart */}
      <EarningsChart
        data={data}
        maxValue={maxValue}
        showScale={showScale}
        currencySymbol={currencySymbol}
      />
    </Box>
  );
};

export default EarningsSection;
