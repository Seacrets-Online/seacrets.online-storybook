import { Meta, StoryObj } from "@storybook/react-vite";
import { ChartBar } from "../../components/atoms/ChartBar";
import { Box } from "@mui/material";

const meta: Meta<typeof ChartBar> = {
  title: "Atoms/ChartBar",
  component: ChartBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    height: {
      control: { type: "number", min: 20, max: 400 },
      description: "Height of the bar in pixels or as a percentage",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "inactive", "highlight"],
      description: "Variant of the bar",
    },
    width: {
      control: { type: "number", min: 20, max: 100 },
      description: "Width of the bar in pixels",
    },
    color: {
      control: "color",
      description: "Background color of the bar (overrides variant color)",
    },
    showStar: {
      control: "boolean",
      description: "Whether to show a star icon (overrides variant)",
    },
    starColor: {
      control: "color",
      description: "Color of the star icon",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChartBar>;

// Three official variants from Figma
export const Default: Story = {
  name: "Default (Pink)",
  args: {
    height: 200,
    variant: "default",
  },
};

export const Inactive: Story = {
  name: "Inactive (Gray)",
  args: {
    height: 150,
    variant: "inactive",
  },
};

export const Highlight: Story = {
  name: "Highlight (Green with Star)",
  args: {
    height: 250,
    variant: "highlight",
  },
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        gap: 2,
        padding: 3,
        bgcolor: "var(--md-sys-color-surface)",
        borderRadius: "16px",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <ChartBar height={150} variant="inactive" />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <ChartBar height={200} variant="default" />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <ChartBar height={250} variant="highlight" />
      </Box>
    </Box>
  ),
};
