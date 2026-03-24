import type { Meta, StoryObj } from "@storybook/react-vite";
import TincretsEmptyState from "../../components/organisms/TincretsEmptyState";
import { withWidth, WIDTH } from "../decorators";

const meta = {
  title: "Organisms/TincretsEmptyState",
  component: TincretsEmptyState,
  tags: ["test"],
  decorators: [withWidth(WIDTH.mobile)],
} satisfies Meta<typeof TincretsEmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomPrice: Story = {
  args: {
    price: "$5",
    description: "Con '$5' puedes seguir viendo más de 100 perfiles",
  },
};
