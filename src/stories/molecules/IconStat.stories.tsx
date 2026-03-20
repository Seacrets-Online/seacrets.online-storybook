import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { IconStat } from "../../components/molecules/IconStat";
import { HeartIcon } from "../../components/atoms/HeartIcon";
import { UserBadgeIcon } from "../../components/atoms/UserBadgeIcon";
import { PinIcon } from "../../components/atoms/PinIcon";

const meta = {
  title: "Molecules/IconStat",
  component: IconStat,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHeartIcon: Story = {
  args: {
    icon: <HeartIcon sx={{ color: "white" }} />,
    value: "1K",
    color: "white",
  },
};

export const WithUserBadgeIcon: Story = {
  args: {
    icon: <UserBadgeIcon sx={{ color: "white" }} />,
    value: "4K",
    color: "white",
  },
};

export const WithPinIcon: Story = {
  args: {
    icon: <PinIcon sx={{ color: "white" }} />,
    value: "Colombia",
    color: "white",
  },
};

export const WithOtherIcon: Story = {
  args: {
    icon: <Visibility />,
    value: "10.5K",
    color: "white",
    size: "large",
  },
};

export const SmallSize: Story = {
  args: {
    icon: <HeartIcon sx={{ color: "#E1276B" }} />,
    value: "234",
    color: "#E1276B",
    size: "small",
  },
};

export const MediumSize: Story = {
  args: {
    icon: <UserBadgeIcon sx={{ color: "white" }} />,
    value: "4K",
    color: "white",
    size: "medium",
  },
};

export const LargeSize: Story = {
  args: {
    icon: <PinIcon sx={{ color: "white" }} />,
    value: "Colombia",
    color: "white",
    size: "large",
  },
};

export const ProfileStats: Story = {
  render: () => (
    <Stack
      direction="row"
      spacing={2}
      sx={{ background: "#1a1a1a", p: 3, borderRadius: 2 }}
    >
      <IconStat
        icon={<HeartIcon sx={{ color: "white" }} />}
        value="1K"
        color="white"
        size="medium"
      />
      <IconStat
        icon={<UserBadgeIcon sx={{ color: "white" }} />}
        value="4K"
        color="white"
        size="medium"
      />
      <IconStat
        icon={<PinIcon sx={{ color: "white" }} />}
        value="Colombia"
        color="white"
        size="medium"
      />
    </Stack>
  ),
  args: {
    icon: <HeartIcon sx={{ color: "white" }} />,
    value: "1K",
    color: "white",
    size: "medium",
  },
};
