import type { Meta, StoryObj } from "@storybook/react";
import { NCMECLogo } from "../../components/atoms/NCMECLogo";
import { Box } from "@mui/material";

const meta: Meta<typeof NCMECLogo> = {
  title: "Atoms/NCMECLogo",
  component: NCMECLogo,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Predefined size variants",
    },
    width: {
      control: { type: "number" },
      description: "Custom width (overrides size prop)",
    },
    height: {
      control: { type: "number" },
      description: "Custom height (overrides size prop)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof NCMECLogo>;

export const Default: Story = {
  args: {
    size: "medium",
  },
  decorators: [
    (Story) => (
      <Box sx={{ bgcolor: "#1a1a1a", p: 4, borderRadius: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export const Small: Story = {
  args: {
    size: "small",
  },
  decorators: [
    (Story) => (
      <Box sx={{ bgcolor: "#1a1a1a", p: 4, borderRadius: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export const Large: Story = {
  args: {
    size: "large",
  },
  decorators: [
    (Story) => (
      <Box sx={{ bgcolor: "#1a1a1a", p: 4, borderRadius: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export const CustomSize: Story = {
  args: {
    width: 288,
    height: 80,
  },
  decorators: [
    (Story) => (
      <Box sx={{ bgcolor: "#1a1a1a", p: 4, borderRadius: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export const AllSizes: Story = {
  render: () => (
    <Box
      sx={{
        bgcolor: "#1a1a1a",
        p: 4,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box>
        <Box sx={{ color: "#fff", mb: 1, fontSize: "12px" }}>
          Small (108x30)
        </Box>
        <NCMECLogo size="small" />
      </Box>
      <Box>
        <Box sx={{ color: "#fff", mb: 1, fontSize: "12px" }}>
          Medium (144x40)
        </Box>
        <NCMECLogo size="medium" />
      </Box>
      <Box>
        <Box sx={{ color: "#fff", mb: 1, fontSize: "12px" }}>
          Large (216x60)
        </Box>
        <NCMECLogo size="large" />
      </Box>
    </Box>
  ),
};

export const OnLightBackground: Story = {
  args: {
    size: "medium",
  },
  decorators: [
    (Story) => (
      <Box sx={{ bgcolor: "#f5f5f5", p: 4, borderRadius: 2 }}>
        <Story />
      </Box>
    ),
  ],
};
