import { Box } from "@mui/material";
import type { BoxProps, SxProps, Theme } from "@mui/material";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import SwipeActionBar from "../molecules/SwipeActionBar";

export interface TincretsEmptyStateProps extends BoxProps {
  title?: string;
  description?: string;
  price?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const TincretsEmptyState = ({
  title = "No tienes más por hoy",
  description,
  price = "$1",
  actionLabel = "Seguir Viendo",
  onAction,
  sx,
  ...props
}: TincretsEmptyStateProps) => (
  <Box
    sx={
      [
        (t) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: t.layout.space16,
          width: "100%",
        }),
        ...(sx ? [sx] : []),
      ] as SxProps<Theme>
    }
    {...props}
  >
    {/* Card placeholder with stamp */}
    <Box
      sx={(t) => ({
        position: "relative",
        width: "100%",
        aspectRatio: "3/4",
        borderRadius: "28px",
        bgcolor: "var(--md-sys-color-surface-container-low)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: t.layout.space16,
        px: t.layout.space24,
      })}
    >
      {/* NOPE stamp */}
      <Box
        sx={{
          px: 2,
          py: 0.5,
          border: "4px solid #E53935",
          borderRadius: "8px",
          transform: "rotate(15deg)",
        }}
      >
        <Text
          variant="display-medium"
          sx={{
            color: "#E53935",
            fontWeight: 900,
            letterSpacing: 4,
            lineHeight: 1,
          }}
        >
          NOPE
        </Text>
      </Box>

      {/* Emoji */}
      <Box sx={{ fontSize: 64, lineHeight: 1 }}>😢</Box>

      {/* Text */}
      <Text
        variant="title-large"
        sx={{ color: "text.primary", textAlign: "center", fontWeight: 600 }}
      >
        {title}
      </Text>

      <Text
        variant="body-medium"
        sx={{ color: "text.secondary", textAlign: "center" }}
      >
        {description ??
          `Con '${price}' puedes seguir viendo más de 30 perfiles`}
      </Text>

      <Button
        variant="contained"
        size="large"
        shape="pill"
        onClick={onAction}
        sx={{ minWidth: 200 }}
      >
        {actionLabel}
      </Button>
    </Box>

    {/* Disabled action bar */}
    <SwipeActionBar disabled />
  </Box>
);

export default TincretsEmptyState;
