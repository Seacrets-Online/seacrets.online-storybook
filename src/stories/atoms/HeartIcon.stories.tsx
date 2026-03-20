import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "@mui/material";
import { HeartIcon } from "../../components/atoms/HeartIcon";

const meta = {
  title: "Atoms/HeartIcon",
  component: HeartIcon,
  parameters: { layout: "centered" },
  tags: ["autodocs", "test"],
} satisfies Meta<typeof HeartIcon>;

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

export const ExtraLarge: Story = {
  args: {
    sx: { fontSize: 48, color: "white" },
  },
};

export const ColorVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <HeartIcon sx={{ fontSize: 32, color: "white" }} />
      <HeartIcon sx={{ fontSize: 32, color: "#E1276B" }} />
      <HeartIcon sx={{ fontSize: 32, color: "primary.main" }} />
      <HeartIcon sx={{ fontSize: 32, color: "error.main" }} />
    </Stack>
  ),
};

export const SizeVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <HeartIcon sx={{ fontSize: 16, color: "white" }} />
      <HeartIcon sx={{ fontSize: 20, color: "white" }} />
      <HeartIcon sx={{ fontSize: 24, color: "white" }} />
      <HeartIcon sx={{ fontSize: 32, color: "white" }} />
      <HeartIcon sx={{ fontSize: 48, color: "white" }} />
    </Stack>
  ),
};
