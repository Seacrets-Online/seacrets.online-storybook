import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { EarningsSection } from "../../components/organisms/EarningsSection";

const meta = {
  title: "Organisms/EarningsSection",
  component: EarningsSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "800px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EarningsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const weeklyData = [
  { label: "L", value: 50 },
  { label: "M", value: 120 },
  { label: "X", value: 80 },
  { label: "J", value: 200 },
  { label: "V", value: 150 },
  { label: "S", value: 90 },
  { label: "D", value: 110 },
];

const monthlyData = [
  { label: "Ene", value: 300 },
  { label: "Feb", value: 450 },
  { label: "Mar", value: 280 },
  { label: "Abr", value: 520 },
  { label: "May", value: 600 },
  { label: "Jun", value: 350 },
];

export const Weekly: Story = {
  render: (args) => {
    const [period, setPeriod] = useState("week");
    return (
      <EarningsSection {...args} period={period} onPeriodChange={setPeriod} />
    );
  },
  args: {
    title: "Ganancias",
    data: weeklyData,
    period: "week",
    maxValue: 250,
    showScale: true,
    currencySymbol: "$",
  },
};

export const Monthly: Story = {
  render: (args) => {
    const [period, setPeriod] = useState("month");
    return (
      <EarningsSection {...args} period={period} onPeriodChange={setPeriod} />
    );
  },
  args: {
    title: "Ganancias",
    data: monthlyData,
    period: "month",
    maxValue: 700,
    showScale: true,
    currencySymbol: "$",
  },
};

export const CustomTitle: Story = {
  render: (args) => {
    const [period, setPeriod] = useState("month");
    return (
      <EarningsSection {...args} period={period} onPeriodChange={setPeriod} />
    );
  },
  args: {
    title: "Ingresos Mensuales",
    data: monthlyData,
    period: "month",
    maxValue: 700,
    showScale: true,
    currencySymbol: "€",
  },
};

export const WithoutScale: Story = {
  render: (args) => {
    const [period, setPeriod] = useState("week");
    return (
      <EarningsSection {...args} period={period} onPeriodChange={setPeriod} />
    );
  },
  args: {
    title: "Ganancias",
    data: weeklyData,
    period: "week",
    maxValue: 250,
    showScale: false,
    currencySymbol: "$",
  },
};
