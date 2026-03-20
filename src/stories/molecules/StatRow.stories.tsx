import type { Meta, StoryObj } from "@storybook/react";
import { StatRow } from "../../components/molecules/StatRow";

const meta = {
  title: "Molecules/StatRow",
  component: StatRow,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EarningsStatsZero: Story = {
  args: {
    stats: [
      { label: "Hoy", value: "$0", valueColor: "#F00" },
      { label: "Esta Semana", value: "$0", valueColor: "#F00" },
      { label: "Este Mes", value: "$0", valueColor: "#146C2E" },
    ],
  },
};

export const EarningsStatsPositive: Story = {
  args: {
    stats: [
      { label: "Hoy", value: "$45", valueColor: "#146C2E" },
      { label: "Esta Semana", value: "$210", valueColor: "#146C2E" },
      { label: "Este Mes", value: "$890", valueColor: "#146C2E" },
    ],
  },
};

export const MixedEarnings: Story = {
  args: {
    stats: [
      { label: "Hoy", value: "$0", valueColor: "#F00" },
      { label: "Esta Semana", value: "$125", valueColor: "#146C2E" },
      { label: "Este Mes", value: "$450", valueColor: "#146C2E" },
    ],
  },
};

export const ManyStats: Story = {
  args: {
    stats: [
      { label: "Ene", value: "120" },
      { label: "Feb", value: "145" },
      { label: "Mar", value: "130" },
      { label: "Abr", value: "180" },
      { label: "May", value: "195" },
    ],
  },
};

export const TwoStats: Story = {
  args: {
    stats: [
      { label: "Total", value: "$5,000", valueColor: "#146C2E" },
      { label: "Pendiente", value: "$200", valueColor: "#F00" },
    ],
  },
};
