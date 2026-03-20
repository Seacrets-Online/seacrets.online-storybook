import { Box, Container } from "@mui/material";
import type { BoxProps, SxProps, Theme } from "@mui/material";
import GlobalHeader from "../organisms/GlobalHeader";

export interface ProfileEarningsTemplateProps extends Omit<
  BoxProps,
  "maxWidth"
> {
  /**
   * Global header props
   */
  balance?: string;
  headerNavItems?: Array<{ value: string; label: string }>;
  onProfileClick?: () => void;
  onBalanceClick?: () => void;
  onNavClick?: (value: string) => void;
  /**
   * Profile header component
   */
  profileHeader?: React.ReactNode;
  /**
   * Earnings section component
   */
  earningsSection?: React.ReactNode;
  /**
   * Max width of the content container
   */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}

const rootSx: SxProps<Theme> = {
  flex: 1,
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  bgcolor: "background.default",
  height: "100%",
};

export const ProfileEarningsTemplate = ({
  balance,
  headerNavItems,
  onProfileClick,
  onBalanceClick,
  onNavClick,
  profileHeader,
  earningsSection,
  maxWidth = "sm",
  sx,
  ...props
}: ProfileEarningsTemplateProps) => {
  return (
    <Box sx={[rootSx, ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
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
        <GlobalHeader
          balance={balance}
          navItems={headerNavItems}
          onProfileClick={onProfileClick}
          onBalanceClick={onBalanceClick}
          onNavClick={onNavClick}
          sx={(t) => ({
            flexShrink: 0,
            mb: t.layout.space16,
            px: t.layout.space16,
            pt: t.layout.space12,
          })}
        />

        <Box sx={{ flexShrink: 0 }}>
          {profileHeader}
          {earningsSection}
        </Box>
      </Container>
    </Box>
  );
};

export default ProfileEarningsTemplate;
