import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "@mui/material";
import { UserBadgeIcon } from "../../components/atoms/UserBadgeIcon";
import { HeartIcon } from "../../components/atoms/HeartIcon";
import { PinIcon } from "../../components/atoms/PinIcon";

const meta = {
  title: "Atoms/UserBadgeIcon",
  component: UserBadgeIcon,
  parameters: { layout: "centered" },
  tags: ["autodocs", "test"],
} satisfies Meta<typeof UserBadgeIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sx: { fontSize: 24, color: "white" },
  },
};

export const Small: Story = {
  args: {
    sx: { fontSize: 16, color: "white" },
  },
};

export const Medium: Story = {
  args: {
    sx: { fontSize: 24, color: "white" },
  },
};

export const Large: Story = {
  args: {
    sx: { fontSize: 32, color: "white" },
  },
};

export const ColorVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <UserBadgeIcon sx={{ fontSize: 32, color: "white" }} />
      <UserBadgeIcon sx={{ fontSize: 32, color: "primary.main" }} />
      <UserBadgeIcon sx={{ fontSize: 32, color: "secondary.main" }} />
      <UserBadgeIcon sx={{ fontSize: 32, color: "error.main" }} />
    </Stack>
  ),
};

export const AllProfileIcons: Story = {
  render: () => (
    <Stack direction="row" spacing={3} alignItems="center">
      <HeartIcon sx={{ fontSize: 24, color: "white" }} />
      <UserBadgeIcon sx={{ fontSize: 24, color: "white" }} />
      <PinIcon sx={{ fontSize: 24, color: "white" }} />
    </Stack>
  ),
};
