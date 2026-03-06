import type { Meta, StoryObj } from "@storybook/react";
import { CameraCaptureCard } from "../../components/atoms/CameraCaptureCard";
import { useState } from "react";

const meta = {
  title: "Atoms/CameraCaptureCard",
  component: CameraCaptureCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    aspectRatio: {
      control: "select",
      options: ["4 / 3", "1 / 1", "16 / 9"],
      description: "Aspect ratio of the camera preview",
    },
    facingMode: {
      control: "select",
      options: ["user", "environment"],
      description: "Camera facing mode",
    },
    value: {
      control: "text",
      description: "Captured image data URL",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
  },
} satisfies Meta<typeof CameraCaptureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const CameraCaptureCardWithState = (args: any) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  return (
    <div style={{ width: "400px" }}>
      <CameraCaptureCard
        {...args}
        value={value}
        onChange={setValue}
        error={error}
        onErrorChange={setError}
      />
      {error && (
        <p style={{ color: "red", marginTop: "16px", textAlign: "center" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export const DocumentPhoto: Story = {
  render: (args) => <CameraCaptureCardWithState {...args} />,
  args: {
    aspectRatio: "4 / 3",
    facingMode: "environment",
  },
};

export const Selfie: Story = {
  render: (args) => <CameraCaptureCardWithState {...args} />,
  args: {
    aspectRatio: "1 / 1",
    facingMode: "user",
  },
};

export const Wide: Story = {
  render: (args) => <CameraCaptureCardWithState {...args} />,
  args: {
    aspectRatio: "16 / 9",
    facingMode: "environment",
  },
};

export const WithError: Story = {
  args: {
    aspectRatio: "4 / 3",
    facingMode: "environment",
    error: "No pudimos acceder a tu cámara. Revisa permisos.",
  },
};
