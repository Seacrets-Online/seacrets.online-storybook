import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import CaptureButton from "../../components/atoms/CaptureButton";
import { Box } from "@mui/material";
import Text from "../../components/atoms/Text";

const meta = {
  title: "Atoms/CaptureButton",
  component: CaptureButton,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1a1a" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs", "test"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    isRecording: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof CaptureButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: "large",
    "aria-label": "Capture photo",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    "aria-label": "Capture photo",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    "aria-label": "Capture photo",
  },
};

export const Recording: Story = {
  args: {
    size: "large",
    isRecording: true,
    "aria-label": "Stop recording",
  },
};

export const Interactive: Story = {
  render: () => {
    const [isRecording, setIsRecording] = useState(false);

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          p: 4,
        }}
      >
        <Text variant="title-medium" sx={{ color: "white" }}>
          {isRecording ? "Recording..." : "Ready to capture"}
        </Text>
        <CaptureButton
          size="large"
          isRecording={isRecording}
          onClick={() => setIsRecording(!isRecording)}
          aria-label={isRecording ? "Stop recording" : "Start recording"}
        />
        <Text variant="body-medium" sx={{ color: "rgba(255,255,255,0.7)" }}>
          Click to {isRecording ? "stop" : "start"}
        </Text>
      </Box>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <CaptureButton size="small" aria-label="Small capture button" />
        <Text variant="label-small" sx={{ color: "white" }}>
          Small
        </Text>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <CaptureButton size="medium" aria-label="Medium capture button" />
        <Text variant="label-small" sx={{ color: "white" }}>
          Medium
        </Text>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <CaptureButton size="large" aria-label="Large capture button" />
        <Text variant="label-small" sx={{ color: "white" }}>
          Large
        </Text>
      </Box>
    </Box>
  ),
};

export const Disabled: Story = {
  args: {
    size: "large",
    disabled: true,
    "aria-label": "Capture disabled",
  },
};
