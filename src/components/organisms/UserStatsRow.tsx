import { Stack } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { IconStat } from "../molecules/IconStat";
import { HeartIcon } from "../atoms/HeartIcon";
import { UserBadgeIcon } from "../atoms/UserBadgeIcon";
import { PinIcon } from "../atoms/PinIcon";

export interface UserStatsRowProps {
  /**
   * Likes/favorites count
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
   * Color for icons and text
   */
  color?: string;
  /**
   * Size variant
   */
  size?: "small" | "medium" | "large";
  /**
   * Additional sx props
   */
  sx?: SxProps<Theme>;
}

export const UserStatsRow = ({
  likesCount,
  followersCount,
  location,
  color = "var(--md-sys-color-on-surface)",
  size = "medium",
  sx,
}: UserStatsRowProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={[
        (theme) => ({
          color,
          gap: theme.layout.space16,
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <IconStat
        icon={<HeartIcon sx={{ color }} />}
        value={likesCount}
        color={color}
        size={size}
      />
      <IconStat
        icon={<UserBadgeIcon sx={{ color }} />}
        value={followersCount}
        color={color}
        size={size}
      />
      <IconStat
        icon={<PinIcon sx={{ color }} />}
        value={location}
        color={color}
        size={size}
      />
    </Stack>
  );
};

export default UserStatsRow;
