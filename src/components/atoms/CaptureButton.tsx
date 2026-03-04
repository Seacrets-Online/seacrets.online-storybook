import { IconButton } from "@mui/material";
import type { IconButtonProps, SxProps, Theme } from "@mui/material";
import { shapeTokens } from "../../utils/shapes";

export interface CaptureButtonProps extends Omit<IconButtonProps, "children"> {
  /**
   * Size of the capture button
   * @default 'large'
   */
  size?: "small" | "medium" | "large";
  /**
   * Whether the button is in recording state
   * @default false
   */
  isRecording?: boolean;
}

const getSizeStyles = (
  size: "small" | "medium" | "large",
  theme: Theme,
): SxProps<Theme> => {
  // Using theme.spacing() which follows 8px base scale
  const sizes = {
    small: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      innerSize: theme.spacing(4),
    },
    medium: {
      width: theme.spacing(9),
      height: theme.spacing(9),
      innerSize: theme.spacing(5.5),
    },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      innerSize: theme.spacing(8),
    },
  };

  const { width, height, innerSize } = sizes[size];

  return {
    width,
    height,
    border: `${shapeTokens["corner-extra-small"]} solid`,
    borderColor: "var(--md-sys-color-on-primary)",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      width: innerSize,
      height: innerSize,
      borderRadius: shapeTokens["corner-full"],
      bgcolor: "var(--md-sys-color-on-primary)",
      transition: "all 0.2s ease-in-out",
    },
    "&:hover::before": {
      transform: "scale(0.95)",
      bgcolor: "var(--md-sys-color-on-primary)",
      opacity: 0.9,
    },
    "&:active::before": {
      transform: "scale(0.85)",
    },
    "&.recording::before": {
      borderRadius: shapeTokens["corner-small"],
      transform: "scale(0.6)",
      bgcolor: "var(--md-sys-color-error)",
    },
  };
};

/**
 * CaptureButton - A camera capture button with a distinctive double-ring design
 * Typically used for camera/photo capture interfaces
 */
export const CaptureButton = ({
  size = "large",
  isRecording = false,
  sx,
  ...props
}: CaptureButtonProps) => {
  return (
    <IconButton
      className={isRecording ? "recording" : ""}
      sx={(theme) => ({
        ...getSizeStyles(size, theme),
        ...(typeof sx === "function" ? sx(theme) : sx),
      })}
      {...props}
    />
  );
};

export default CaptureButton;
