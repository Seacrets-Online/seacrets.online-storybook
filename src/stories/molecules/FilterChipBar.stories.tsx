import type { Meta, StoryObj } from "@storybook/react-vite";
import FilterChipBar from "../../components/molecules/FilterChipBar";
import { withWidth, WIDTH } from "../decorators";

const meta = {
  title: "Molecules/FilterChipBar",
  component: FilterChipBar,
  tags: ["test"],
  decorators: [withWidth(WIDTH.mobile)],
} satisfies Meta<typeof FilterChipBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chips: [
      { id: "1", label: "Costa Rica" },
      { id: "2", label: "Tetas" },
      { id: "3", label: "Rubia" },
    ],
    onSearch: () => {},
    onDelete: () => {},
  },
};

export const Empty: Story = {
  args: {
    chips: [],
    onSearch: () => {},
  },
};

export const ManyChips: Story = {
  args: {
    chips: [
      { id: "1", label: "Costa Rica" },
      { id: "2", label: "Tetas" },
      { id: "3", label: "Rubia" },
      { id: "4", label: "Latina" },
      { id: "5", label: "Morena" },
      { id: "6", label: "Fitness" },
    ],
    onSearch: () => {},
    onDelete: () => {},
  },
};
