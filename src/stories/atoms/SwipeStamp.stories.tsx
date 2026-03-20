import type { Meta, StoryObj } from "@storybook/react-vite";
import SwipeStamp from "../../components/atoms/SwipeStamp";

const meta = {
  title: "Atoms/SwipeStamp",
  component: SwipeStamp,
  tags: ["test"],
  decorators: [
    (Story) => (
      <div
        style={{
          position: "relative",
          width: 360,
          height: 480,
          background: "#333",
          borderRadius: 16,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SwipeStamp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Nope: Story = {
  args: { type: "nope", opacity: 1 },
};

export const Like: Story = {
  args: { type: "like", opacity: 1 },
};

export const HalfOpacity: Story = {
  args: { type: "nope", opacity: 0.5 },
};
