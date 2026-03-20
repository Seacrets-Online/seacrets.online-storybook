import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { BoxProps } from "@mui/material/Box";

export interface TincretProfile {
  id: string;
  name: string;
  priceLabel?: string;
  hashtag?: string;
  imageUrl?: string;
}

export interface TincretsTemplateProps extends Omit<BoxProps, "maxWidth"> {
  header?: React.ReactNode;
  filterBar?: React.ReactNode;
  /** Stack of profiles to swipe through */
  profiles?: TincretProfile[];
  /** Render the current card — receives the profile and callbacks */
  renderCard?: (
    profile: TincretProfile,
    handlers: {
      onSwipeLeft: () => void;
      onSwipeRight: () => void;
      onUndo: () => void;
      onProfile: () => void;
    },
  ) => React.ReactNode;
  /** Rendered when the profile stack is empty */
  emptyState?: React.ReactNode;
  bottomNavigation?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}

export const TincretsTemplate = ({
  header,
  filterBar,
  profiles: initialProfiles = [],
  renderCard,
  emptyState,
  bottomNavigation,
  maxWidth = "sm",
  ...props
}: TincretsTemplateProps) => {
  const [profiles, setProfiles] = useState(initialProfiles);

  const currentProfile = profiles[0] ?? null;

  const advanceCard = useCallback(() => {
    setProfiles((prev) => prev.slice(1));
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        height: "100%",
      }}
      {...props}
    >
      <Container
        maxWidth={maxWidth}
        disableGutters
        sx={{
          flex: 1,
          minHeight: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header (GlobalHeader) */}
        {header && (
          <Box
            sx={(t) => ({
              flexShrink: 0,
              px: t.layout.space16,
              pt: t.layout.space16,
            })}
          >
            {header}
          </Box>
        )}

        {/* Filter chips bar */}
        {filterBar && (
          <Box sx={(t) => ({ flexShrink: 0, py: t.layout.space12 })}>
            {filterBar}
          </Box>
        )}

        {/* Card area */}
        <Box
          sx={(t) => ({
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: t.layout.space16,
            pb: t.layout.space16,
            minHeight: 0,
          })}
        >
          {currentProfile && renderCard
            ? renderCard(currentProfile, {
                onSwipeLeft: advanceCard,
                onSwipeRight: advanceCard,
                onUndo: () => {},
                onProfile: () => {},
              })
            : emptyState}
        </Box>
      </Container>

      {/* Bottom navigation */}
      {bottomNavigation}
    </Box>
  );
};

export default TincretsTemplate;
