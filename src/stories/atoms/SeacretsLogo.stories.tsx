import type { Meta, StoryObj } from "@storybook/react";
import { SeacretsLogo } from "../../components/atoms/SeacretsLogo";
import { Box } from "@mui/material";

const meta: Meta<typeof SeacretsLogo> = {
  title: "Atoms/SeacretsLogo",
  component: SeacretsLogo,
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
type Story = StoryObj<typeof SeacretsLogo>;

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
    width: 408,
    height: 228,
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
          Small (102x57)
        </Box>
        <SeacretsLogo size="small" />
      </Box>
      <Box>
        <Box sx={{ color: "#fff", mb: 1, fontSize: "12px" }}>
          Medium (204x114)
        </Box>
        <SeacretsLogo size="medium" />
      </Box>
      <Box>
        <Box sx={{ color: "#fff", mb: 1, fontSize: "12px" }}>
          Large (306x171)
        </Box>
        <SeacretsLogo size="large" />
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

export const InHeader: Story = {
  args: {
    size: "small",
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 2,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Story />
      </Box>
    ),
  ],
};
