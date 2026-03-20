import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { Star } from "@mui/icons-material";

export type ChartBarVariant = "default" | "inactive" | "highlight";

const VARIANT_CONFIGS: Record<
  ChartBarVariant,
  { color: string; showStar: boolean }
> = {
  default: { color: "#E1276B", showStar: false }, // Pink/Magenta
  inactive: { color: "#9e9e9e", showStar: false }, // Gray
  highlight: { color: "#146C2E", showStar: true }, // Green with star
};

export interface ChartBarProps {
  /**
   * Height of the bar in pixels or as a percentage
   */
  height: number | string;
  /**
   * Variant of the bar (default, inactive, or highlight)
   */
  variant?: ChartBarVariant;
  /**
   * Background color of the bar (CSS color value or CSS variable)
   * Overrides variant color if provided
   */
  color?: string;
  /**
   * Width of the bar in pixels
   */
  width?: number;
  /**
   * Whether to show a star icon inside the bar
   * Overrides variant showStar if provided
   */
  showStar?: boolean;
  /**
   * Color of the star icon
   */
  starColor?: string;
  /**
   * Additional sx props
   */
  sx?: SxProps<Theme>;
  /**
   * Aria label for accessibility
   */
  ariaLabel?: string;
}

export const ChartBar = ({
  height,
  variant = "default",
  color,
  width = 38,
  showStar,
  starColor = "#ffffff",
  sx,
  ariaLabel,
}: ChartBarProps) => {
  // Border radius is exactly half the width for perfect pill shape
  const borderRadius = width / 2;

  // Get variant config
  const variantConfig = VARIANT_CONFIGS[variant];

  // Use provided props or fallback to variant config
  const finalColor = color ?? variantConfig.color;
  const finalShowStar = showStar ?? variantConfig.showStar;

  return (
    <Box
      role="presentation"
      aria-label={ariaLabel}
      sx={
        [
          {
            width: `${width}px`,
            height: typeof height === "number" ? `${height}px` : height,
            bgcolor: finalColor,
            borderRadius: `${borderRadius}px`, // Perfect pill shape (half of width)
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            transition: "all 0.3s ease",
            "&:hover": {
              opacity: 0.85,
            },
          },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ] as SxProps<Theme>
      }
    >
      {finalShowStar && (
        <Star
          sx={{
            color: starColor,
            fontSize: 30,
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      )}
    </Box>
  );
};

export default ChartBar;
