import type { Meta, StoryObj } from "@storybook/react";
import { AvatarPlaceholder } from "../../components/atoms/AvatarPlaceholder";
import { Box } from "@mui/material";

const meta: Meta<typeof AvatarPlaceholder> = {
  title: "Atoms/AvatarPlaceholder",
  component: AvatarPlaceholder,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Predefined size variants",
    },
    width: {
      control: { type: "number" },
      description:
        "Custom width (overrides size prop, maintains square aspect ratio)",
    },
    height: {
      control: { type: "number" },
      description:
        "Custom height (overrides size prop, maintains square aspect ratio)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarPlaceholder>;

export const Default: Story = {
  args: {
    size: "medium",
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 4 }}>
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
      <Box sx={{ p: 4 }}>
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
      <Box sx={{ p: 4 }}>
        <Story />
      </Box>
    ),
  ],
};

export const CustomSize: Story = {
  args: {
    width: 160,
    height: 160,
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 4 }}>
        <Story />
      </Box>
    ),
  ],
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ p: 4, display: "flex", gap: 3, alignItems: "center" }}>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ mb: 1, fontSize: "12px", color: "text.secondary" }}>
          Small (40x40)
        </Box>
        <AvatarPlaceholder size="small" />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ mb: 1, fontSize: "12px", color: "text.secondary" }}>
          Medium (80x80)
        </Box>
        <AvatarPlaceholder size="medium" />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ mb: 1, fontSize: "12px", color: "text.secondary" }}>
          Large (120x120)
        </Box>
        <AvatarPlaceholder size="large" />
      </Box>
    </Box>
  ),
};

export const InProfile: Story = {
  args: {
    size: "large",
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Story />
        <Box>
          <Box sx={{ fontSize: "20px", fontWeight: "bold", mb: 0.5 }}>
            Usuario Sin Foto
          </Box>
          <Box sx={{ fontSize: "14px", color: "text.secondary" }}>
            @username
          </Box>
        </Box>
      </Box>
    ),
  ],
};

export const InList: Story = {
  render: () => (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      {[1, 2, 3].map((i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <AvatarPlaceholder size="small" />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ fontSize: "14px", fontWeight: "medium" }}>
              Usuario {i}
            </Box>
            <Box sx={{ fontSize: "12px", color: "text.secondary" }}>
              @usuario{i}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  ),
};
