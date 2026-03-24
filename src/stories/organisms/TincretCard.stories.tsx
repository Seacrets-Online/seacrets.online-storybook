import type { Meta, StoryObj } from "@storybook/react-vite";
import TincretCard from "../../components/organisms/TincretCard";
import { withWidth, WIDTH } from "../decorators";

const meta = {
  title: "Organisms/TincretCard",
  component: TincretCard,
  tags: ["test"],
  decorators: [withWidth(WIDTH.mobile)],
} satisfies Meta<typeof TincretCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Mariana",
    priceLabel: "Pago",
    hashtag: "#tetas",
    imageUrl: "https://100k-faces.vercel.app/api/random-image?seed=42",
  },
};

export const FreeProfile: Story = {
  args: {
    name: "Valentina",
    priceLabel: "Gratis",
    hashtag: "#fitness",
    imageUrl: "https://100k-faces.vercel.app/api/random-image?seed=7",
  },
};

export const NoHashtag: Story = {
  args: {
    name: "Sofia",
    priceLabel: "Pago",
    imageUrl: "https://100k-faces.vercel.app/api/random-image?seed=99",
  },
};

export const Disabled: Story = {
  args: {
    name: "Mariana",
    priceLabel: "Pago",
    hashtag: "#tetas",
    imageUrl: "https://100k-faces.vercel.app/api/random-image?seed=42",
    disabled: true,
  },
};
