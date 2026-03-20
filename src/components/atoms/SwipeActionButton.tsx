import { Box } from "@mui/material";
import type { BoxProps, SxProps, Theme } from "@mui/material";
import { shapeTokens } from "../../utils/shapes";

export type SwipeActionVariant =
  | "reject"
  | "undo"
  | "profile"
  | "like"
  | "approve";

export interface SwipeActionButtonProps extends Omit<BoxProps, "color"> {
  variant: SwipeActionVariant;
  icon: React.ReactNode;
  disabled?: boolean;
}

const variantColors: Record<SwipeActionVariant, string> = {
  reject: "#E53935", // red
  undo: "#8E24AA", // purple
  profile: "#1E88E5", // blue
  like: "#FB8C00", // orange
  approve: "#43A047", // green
};

const buttonSx =
  (variant: SwipeActionVariant, disabled: boolean) =>
  (_theme: Theme): SxProps<Theme> => ({
    width: 52,
    height: 52,
    borderRadius: shapeTokens["corner-full"],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid",
    borderColor: disabled ? "text.disabled" : variantColors[variant],
    color: disabled ? "text.disabled" : variantColors[variant],
    bgcolor: "transparent",
    cursor: disabled ? "default" : "pointer",
    p: 0,
    transition: "transform 0.15s ease, background-color 0.15s ease",
    "&:hover": disabled
      ? undefined
      : {
          bgcolor: `${variantColors[variant]}1A`, // 10% opacity
          transform: "scale(1.1)",
        },
    "&:active": disabled
      ? undefined
      : {
          transform: "scale(0.95)",
        },
    "& svg": {
      fontSize: 24,
    },
  });

export const SwipeActionButton = ({
  variant,
  icon,
  disabled = false,
  sx,
  ...props
}: SwipeActionButtonProps) => (
  <Box
    component="button"
    type="button"
    disabled={disabled}
    aria-label={variant}
    sx={
      [
        buttonSx(variant, disabled) as SxProps<Theme>,
        ...(sx ? [sx] : []),
      ] as SxProps<Theme>
    }
    {...props}
  >
    {icon}
  </Box>
);

export default SwipeActionButton;
