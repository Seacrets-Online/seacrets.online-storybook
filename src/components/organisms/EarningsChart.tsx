import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { Text } from "../atoms/Text";
import { ChartBar } from "../atoms/ChartBar";
import { spacingTokens } from "../../utils/spacing";

export interface BarData {
  /**
   * Label for the bar (e.g., day of week)
   */
  label: string;
  /**
   * Value to display (will be scaled to height)
   */
  value: number;
  /**
   * Whether to show a star on this bar
   */
  showStar?: boolean;
  /**
   * Custom color for this bar (optional)
   */
  color?: string;
}

export interface EarningsChartProps {
  /**
   * Title of the chart
   */
  title?: string;
  /**
   * Array of bar data
   */
  data: BarData[];
  /**
   * Maximum value for scaling (defaults to max value in data)
   */
  maxValue?: number;
  /**
   * Height of the chart area in pixels
   */
  chartHeight?: number;
  /**
   * Width of each bar in pixels
   */
  barWidth?: number;
  /**
   * Default color for bars
   */
  defaultBarColor?: string;
  /**
   * Color for bars with stars
   */
  highlightBarColor?: string;
  /**
   * Whether to show the value scale on the right
   */
  showScale?: boolean;
  /**
   * Currency symbol for scale
   */
  currencySymbol?: string;
  /**
   * Additional sx props
   */
  sx?: SxProps<Theme>;
}

export const EarningsChart = ({
  title,
  data,
  maxValue,
  chartHeight = 300,
  barWidth = 38,
  defaultBarColor = "#E1276B", // Pink/Magenta from Figma
  highlightBarColor = "#146C2E", // Green from Figma
  showScale = true,
  currencySymbol = "$",
  sx,
}: EarningsChartProps) => {
  // Calculate max value if not provided
  const calculatedMaxValue = maxValue ?? Math.max(...data.map((d) => d.value));

  // Calculate scale intervals
  const scaleInterval = calculatedMaxValue / 2;
  const scaleValues = [0, scaleInterval, calculatedMaxValue];

  // Calculate bar heights
  const getBarHeight = (value: number) => {
    return (value / calculatedMaxValue) * chartHeight;
  };

  return (
    <Box
      sx={
        [
          {
            width: "100%",
          },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ] as SxProps<Theme>
      }
    >
      {/* Title - only show if title has content */}
      {title && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: `${spacingTokens["16"]}px`,
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: "var(--md-sys-color-primary)",
              mr: `${spacingTokens["8"]}px`,
            }}
          />
          <Text
            variant="title-medium"
            sx={{ color: "var(--md-sys-color-on-surface)" }}
          >
            {title}
          </Text>
        </Box>
      )}

      {/* Chart Area */}
      <Box sx={{ display: "flex", gap: `${spacingTokens["16"]}px` }}>
        {/* Bars and Labels */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: `${spacingTokens["8"]}px`,
            flex: 1,
            height: chartHeight + 40, // Extra space for labels
          }}
        >
          {data.map((bar, index) => {
            const barColor =
              bar.color ?? (bar.showStar ? highlightBarColor : defaultBarColor);
            const barHeight = getBarHeight(bar.value);

            return (
              <Box
                key={`${bar.label}-${index}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  gap: `${spacingTokens["8"]}px`,
                }}
              >
                {/* Bar */}
                <ChartBar
                  height={barHeight}
                  color={barColor}
                  width={barWidth}
                  showStar={bar.showStar}
                  ariaLabel={`${bar.label}: ${currencySymbol}${bar.value}`}
                />

                {/* Label */}
                <Text
                  variant="label-medium"
                  sx={{
                    color: "var(--md-sys-color-on-surface-variant)",
                    textAlign: "center",
                  }}
                >
                  {bar.label}
                </Text>
              </Box>
            );
          })}
        </Box>

        {/* Scale */}
        {showScale && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: chartHeight,
              py: `${spacingTokens["4"]}px`,
            }}
          >
            {scaleValues.reverse().map((value, index) => (
              <Text
                key={`scale-${index}`}
                variant="label-small"
                sx={{
                  color: "var(--md-sys-color-on-surface-variant)",
                  minWidth: 30,
                  textAlign: "right",
                }}
              >
                {currencySymbol}
                {value}
              </Text>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EarningsChart;
