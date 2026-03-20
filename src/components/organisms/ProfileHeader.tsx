import { Box, Stack } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { Avatar } from "../atoms/Avatar";
import { AvatarPlaceholder } from "../atoms/AvatarPlaceholder";
import { Text } from "../atoms/Text";
import { Fab } from "../atoms/Fab";
import { VerifiedIcon } from "../atoms/VerifiedIcon";
import { UserStatsRow } from "../organisms/UserStatsRow";
import { StatCard } from "../molecules/StatCard";
import { StatRow } from "../molecules/StatRow";
import type { StatItem } from "../molecules/StatRow";
import { Add } from "@mui/icons-material";

export interface ProfileHeaderProps {
  /**
   * User's profile image URL
   */
  avatarUrl?: string;
  /**
   * User's display name
   */
  name: string;
  /**
   * User's username (without @)
   */
  username: string;
  /**
   * Whether the user is verified
   */
  isVerified?: boolean;
  /**
   * Likes count
   */
  likesCount: string | number;
  /**
   * Followers count
   */
  followersCount: string | number;
  /**
   * Location text
   */
  location: string;
  /**
   * Net earnings value
   */
  netEarnings: string | number;
  /**
   * Subscriptions count
   */
  subscriptions: string | number;
  /**
   * Tips value
   */
  tips: string | number;
  /**
   * Secondary stats (Hoy, Esta Semana, Este Mes)
   */
  secondaryStats: StatItem[];
  /**
   * Add button click handler
   */
  onAddClick?: () => void;
  /**
   * Additional sx props
   */
  sx?: SxProps<Theme>;
}

export const ProfileHeader = ({
  avatarUrl,
  name,
  username,
  isVerified = false,
  likesCount,
  followersCount,
  location,
  netEarnings,
  subscriptions,
  tips,
  secondaryStats,
  onAddClick,
  sx,
}: ProfileHeaderProps) => {
  return (
    <Box
      sx={[
        {
          width: "100%",
          bgcolor: "background.default",
          position: "relative",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {/* Avatar Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: (theme) => theme.layout.space16,
          position: "relative",
        }}
      >
        {/* User Stats Row */}
        <Box sx={{ mb: (theme) => theme.layout.space16 }}>
          <UserStatsRow
            likesCount={likesCount}
            followersCount={followersCount}
            location={location}
            color="var(--md-sys-color-on-surface)"
          />
        </Box>

        {/* Avatar with Add Button */}
        <Box
          sx={{
            position: "relative",
            mb: (theme) => theme.layout.space8,
          }}
        >
          {avatarUrl ? (
            <Avatar
              src={avatarUrl}
              alt={name}
              sx={{
                width: 140,
                height: 140,
                border: "4px solid var(--md-sys-color-primary)",
              }}
            />
          ) : (
            <AvatarPlaceholder size="large" />
          )}
          {onAddClick && (
            <Fab
              size="small"
              color="primary"
              onClick={onAddClick}
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 40,
                height: 40,
                minHeight: 40,
              }}
            >
              <Add />
            </Fab>
          )}
        </Box>

        {/* Name and Username */}
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            gap: (theme) => theme.layout.space4,
            mb: (theme) => theme.layout.space4,
          }}
        >
          <Text
            variant="headline-medium"
            sx={{
              color: "var(--md-sys-color-on-surface)",
              fontWeight: 600,
            }}
          >
            {name}
          </Text>
          {isVerified && (
            <VerifiedIcon
              sx={{
                fontSize: 24,
                color: "var(--md-sys-color-primary)",
              }}
            />
          )}
        </Stack>

        <Text
          variant="body-medium"
          sx={{
            color: "var(--md-sys-color-on-surface-variant)",
            mb: (theme) => theme.layout.space12,
          }}
        >
          @{username}
        </Text>

        {/* Main Stats Cards */}
        <Stack
          direction="row"
          justifyContent="space-around"
          sx={{
            width: "100%",
            px: (theme) => theme.layout.space16,
            mb: (theme) => theme.layout.space12,
          }}
        >
          <StatCard
            label="Ganancias Netas"
            value={netEarnings}
            valueColor="#146C2E"
            size="large"
          />
          <StatCard label="Suscripciones" value={subscriptions} size="large" />
          <StatCard label="Propinas" value={tips} size="large" />
        </Stack>

        {/* Secondary Stats Row */}
        <Box
          sx={{
            width: "100%",
            px: (theme) => theme.layout.space16,
            mb: (theme) => theme.layout.space16,
          }}
        >
          <StatRow stats={secondaryStats} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
