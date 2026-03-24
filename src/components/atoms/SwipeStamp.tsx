import { Box } from "@mui/material";
import type { BoxProps, SxProps, Theme } from "@mui/material";
import Text from "./Text";

export type SwipeStampType = "nope" | "like";

export interface SwipeStampProps extends BoxProps {
  type: SwipeStampType;
  /** 0..1 opacity linked to swipe progress */
  opacity?: number;
}

const stampConfig: Record<
  SwipeStampType,
  { label: string; color: string; rotation: number }
> = {
  nope: { label: "NOPE", color: "#E53935", rotation: 15 },
  like: { label: "LIKE", color: "#43A047", rotation: -15 },
};

export const SwipeStamp = ({
  type,
  opacity = 1,
  sx,
  ...props
}: SwipeStampProps) => {
  const { label, color, rotation } = stampConfig[type];

  return (
    <Box
      sx={
        [
          {
            position: "absolute",
            top: 60,
            ...(type === "nope" ? { right: 24 } : { left: 24 }),
            px: 2,
            py: 0.5,
            border: "4px solid",
            borderColor: color,
            borderRadius: "8px",
            transform: `rotate(${rotation}deg)`,
            opacity,
            pointerEvents: "none",
            zIndex: 10,
            transition: "opacity 0.1s ease",
          },
          ...(sx ? [sx] : []),
        ] as SxProps<Theme>
      }
      {...props}
    >
      <Text
        variant="display-medium"
        sx={{
          color,
          fontWeight: 900,
          letterSpacing: 4,
          lineHeight: 1,
        }}
      >
        {label}
      </Text>
    </Box>
  );
};

export default SwipeStamp;
