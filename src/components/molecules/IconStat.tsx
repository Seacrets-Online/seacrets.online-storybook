import { Box, Stack } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { Text } from "../atoms/Text";

export interface IconStatProps {
  /**
   * Icon to display (can be a React component or emoji)
   */
  icon: React.ReactNode;
  /**
   * Value to display (e.g., "1K", "4K", "Colombia")
   */
  value: string | number;
  /**
   * Color of the icon and text
   */
  color?: string;
  /**
   * Size of the component
   */
  size?: "small" | "medium" | "large";
  /**
   * Additional sx props
   */
  sx?: SxProps<Theme>;
}

const SIZE_CONFIG = {
  small: {
    iconSize: 16,
    fontSize: "label-small" as const,
    gap: (theme: Theme) => theme.layout.space4,
  },
  medium: {
    iconSize: 20,
    fontSize: "label-medium" as const,
    gap: (theme: Theme) => theme.layout.space8,
  },
  large: {
    iconSize: 24,
    fontSize: "label-large" as const,
    gap: (theme: Theme) => theme.layout.space8,
  },
};

export const IconStat = ({
  icon,
  value,
  color = "var(--md-sys-color-on-surface)",
  size = "medium",
  sx,
}: IconStatProps) => {
  const config = SIZE_CONFIG[size];

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={[
        (theme) => ({
          color,
          gap: config.gap(theme),
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: config.iconSize,
          "& svg": {
            fontSize: config.iconSize,
          },
        }}
      >
        {icon}
      </Box>
      <Text variant={config.fontSize} sx={{ color, fontWeight: 500 }}>
        {value}
      </Text>
    </Stack>
  );
};

export default IconStat;
