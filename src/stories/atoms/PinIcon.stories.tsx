import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "@mui/material";
import { PinIcon } from "../../components/atoms/PinIcon";

const meta = {
  title: "Atoms/PinIcon",
  component: PinIcon,
  parameters: { layout: "centered" },
  tags: ["autodocs", "test"],
} satisfies Meta<typeof PinIcon>;

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
      <PinIcon sx={{ fontSize: 32, color: "white" }} />
      <PinIcon sx={{ fontSize: 32, color: "primary.main" }} />
      <PinIcon sx={{ fontSize: 32, color: "secondary.main" }} />
      <PinIcon sx={{ fontSize: 32, color: "success.main" }} />
    </Stack>
  ),
};

export const SizeVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <PinIcon sx={{ fontSize: 16, color: "white" }} />
      <PinIcon sx={{ fontSize: 20, color: "white" }} />
      <PinIcon sx={{ fontSize: 24, color: "white" }} />
      <PinIcon sx={{ fontSize: 32, color: "white" }} />
      <PinIcon sx={{ fontSize: 48, color: "white" }} />
    </Stack>
  ),
};
