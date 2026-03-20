import { useState, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";
import type { BoxProps, SxProps, Theme } from "@mui/material";
import { shapeTokens } from "../../utils/shapes";
import Text from "../atoms/Text";
import SwipeStamp from "../atoms/SwipeStamp";
import SwipeActionBar from "../molecules/SwipeActionBar";
import { useSwipeGesture } from "../../hooks/useSwipeGesture";

export interface TincretCardProps extends Omit<BoxProps, "onChange"> {
  name: string;
  priceLabel?: string;
  hashtag?: string;
  imageUrl?: string;
  disabled?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onUndo?: () => void;
  onProfile?: () => void;
}

const gradientOverlay =
  "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 35%, transparent 60%)";

export const TincretCard = ({
  name,
  priceLabel,
  hashtag,
  imageUrl,
  disabled = false,
  onSwipeLeft,
  onSwipeRight,
  onUndo,
  onProfile,
  sx,
  ...props
}: TincretCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { state, dragStyle, handlers, triggerSwipe } = useSwipeGesture({
    onSwipeLeft,
    onSwipeRight,
  });

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      if (img.complete) {
        setIsLoaded(true);
      } else {
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setIsLoaded(true);
      }
    } else {
      setIsLoaded(true);
    }
  }, [imageUrl]);

  return (
    <Box
      sx={
        [
          {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: (t: Theme) => t.layout.space16,
            width: "100%",
          },
          ...(sx ? [sx] : []),
        ] as SxProps<Theme>
      }
      {...props}
    >
      {/* Card */}
      <Box
        {...(disabled ? {} : handlers)}
        style={disabled ? undefined : dragStyle}
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "3/4",
          borderRadius: shapeTokens["corner-extra-large"],
          overflow: "hidden",
          bgcolor: "var(--md-sys-color-surface-container-low)",
          flexShrink: 0,
        }}
      >
        {/* Image */}
        {imageUrl && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: 1,
            }}
          />
        )}

        {/* Skeleton */}
        {!isLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "var(--md-sys-color-surface-container-high)",
              zIndex: 2,
            }}
          />
        )}

        {/* Swipe stamps */}
        {state.direction === "left" && state.progress > 0.2 && (
          <SwipeStamp type="nope" opacity={state.progress} />
        )}
        {state.direction === "right" && state.progress > 0.2 && (
          <SwipeStamp type="like" opacity={state.progress} />
        )}

        {/* Bottom gradient + info overlay */}
        <Box
          sx={(t) => ({
            position: "absolute",
            inset: 0,
            background: gradientOverlay,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            p: t.layout.space16,
            zIndex: 3,
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out 0.2s",
          })}
        >
          <Text
            variant="headline-medium"
            sx={{ color: "#fff", fontWeight: 700 }}
          >
            {name}
          </Text>
          {priceLabel && (
            <Text
              variant="body-medium"
              sx={{ color: "rgba(255,255,255,0.85)" }}
            >
              {priceLabel}
            </Text>
          )}
          {hashtag && (
            <Box
              component="span"
              sx={(t) => ({
                display: "inline-block",
                mt: t.layout.space4,
                px: t.layout.space8,
                py: t.layout.space4,
                borderRadius: shapeTokens["corner-small"],
                bgcolor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                color: "#fff",
                fontSize: "0.75rem",
                whiteSpace: "nowrap",
                alignSelf: "flex-start",
              })}
            >
              {hashtag}
            </Box>
          )}
        </Box>
      </Box>

      {/* Action bar */}
      <SwipeActionBar
        disabled={disabled}
        onReject={() => triggerSwipe("left")}
        onUndo={onUndo}
        onProfile={onProfile}
        onLike={() => triggerSwipe("right")}
        onApprove={() => triggerSwipe("right")}
      />
    </Box>
  );
};

export default TincretCard;
