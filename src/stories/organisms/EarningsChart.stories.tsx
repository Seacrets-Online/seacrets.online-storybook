import { Meta, StoryObj } from "@storybook/react-vite";
import { EarningsChart } from "../../components/organisms/EarningsChart";

const meta: Meta<typeof EarningsChart> = {
  title: "Organisms/EarningsChart",
  component: EarningsChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the chart",
    },
    chartHeight: {
      control: { type: "number", min: 200, max: 500 },
      description: "Height of the chart area in pixels",
    },
    barWidth: {
      control: { type: "number", min: 20, max: 80 },
      description: "Width of each bar in pixels",
    },
    defaultBarColor: {
      control: "color",
      description: "Default color for bars",
    },
    highlightBarColor: {
      control: "color",
      description: "Color for bars with stars",
    },
    showScale: {
      control: "boolean",
      description: "Whether to show the value scale",
    },
    currencySymbol: {
      control: "text",
      description: "Currency symbol for scale",
    },
  },
};

export default meta;
type Story = StoryObj<typeof EarningsChart>;

// Weekly earnings data (matching the original image)
const weeklyData = [
  { label: "L", value: 5 },
  { label: "K", value: 7 },
  { label: "M", value: 9 },
  { label: "J", value: 3 },
  { label: "V", value: 8 },
  { label: "S", value: 6.5 },
  { label: "D", value: 10, showStar: true },
];

export const Default: Story = {
  args: {
    data: weeklyData,
    title: "Chart/Earnings",
    maxValue: 10,
    chartHeight: 300,
    barWidth: 38,
    defaultBarColor: "#E1276B",
    highlightBarColor: "#146C2E",
    showScale: true,
    currencySymbol: "$",
    sx: {
      bgcolor: "var(--md-sys-color-surface)",
      borderRadius: "16px",
      p: 3,
      maxWidth: 600,
    },
  },
};

export const WithoutScale: Story = {
  args: {
    data: weeklyData,
    title: "Chart/Earnings",
    maxValue: 10,
    showScale: false,
    sx: {
      bgcolor: "var(--md-sys-color-surface)",
      borderRadius: "16px",
      p: 3,
      maxWidth: 600,
    },
  },
};

export const MonthlyData: Story = {
  args: {
    data: [
      { label: "Week 1", value: 120 },
      { label: "Week 2", value: 250 },
      { label: "Week 3", value: 180 },
      { label: "Week 4", value: 300, showStar: true },
    ],
    title: "Monthly Earnings",
    maxValue: 300,
    chartHeight: 350,
    barWidth: 60,
    currencySymbol: "$",
    sx: {
      bgcolor: "var(--md-sys-color-surface)",
      borderRadius: "16px",
      p: 3,
      maxWidth: 600,
    },
  },
};

export const CustomColors: Story = {
  args: {
    data: [
      { label: "A", value: 8 },
      { label: "B", value: 12, color: "#0f5ea6" },
      { label: "C", value: 6 },
      { label: "D", value: 15, showStar: true },
      { label: "E", value: 10 },
    ],
    title: "Custom Colors",
    maxValue: 15,
    defaultBarColor: "#f5a72b",
    highlightBarColor: "#5d6223",
    sx: {
      bgcolor: "var(--md-sys-color-surface)",
      borderRadius: "16px",
      p: 3,
      maxWidth: 600,
    },
  },
};

export const SmallChart: Story = {
  args: {
    data: [
      { label: "M", value: 5 },
      { label: "T", value: 8 },
      { label: "W", value: 3 },
      { label: "T", value: 10, showStar: true },
    ],
    title: "Compact View",
    maxValue: 10,
    chartHeight: 200,
    barWidth: 30,
    sx: {
      bgcolor: "var(--md-sys-color-surface)",
      borderRadius: "16px",
      p: 3,
      maxWidth: 600,
    },
  },
};

export const LargeDataset: Story = {
  args: {
    data: [
      { label: "Jan", value: 45 },
      { label: "Feb", value: 52 },
      { label: "Mar", value: 38 },
      { label: "Apr", value: 65 },
      { label: "May", value: 58 },
      { label: "Jun", value: 70 },
      { label: "Jul", value: 82, showStar: true },
      { label: "Aug", value: 75 },
      { label: "Sep", value: 68 },
      { label: "Oct", value: 72 },
      { label: "Nov", value: 80 },
      { label: "Dec", value: 90, showStar: true },
    ],
    title: "Annual Overview",
    chartHeight: 350,
    barWidth: 35,
    currencySymbol: "$",
    sx: {
      bgcolor: "var(--md-sys-color-surface)",
      borderRadius: "16px",
      p: 3,
      maxWidth: 600,
    },
  },
};

// Interactive example
export const InteractiveExample: Story = {
  args: {
    data: weeklyData,
    title: "Chart/Earnings",
    maxValue: 10,
    sx: {
      bgcolor: "var(--md-sys-color-surface)",
      borderRadius: "16px",
      p: 3,
      maxWidth: 600,
    },
  },
};
