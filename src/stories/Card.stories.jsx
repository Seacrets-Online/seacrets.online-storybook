import { fn } from "storybook/test";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import * as tokens from "../style-dictionary-dist/variables.js";
import { getTypographyStyles } from "../utils/typography.js";

/**
 * Card component following Material Design 3 guidelines.
 *
 * ## Definition of Done
 * - ✅ Token-based: Uses design tokens (no hardcoded hex values)
 * - ✅ M3 Variants: Supports elevated, filled, and outlined variants
 * - ✅ Image Support: Can display cover images
 * - ✅ Accessibility: Proper semantic HTML and ARIA support
 * - ✅ Storybook: Includes stories for all variants and use cases
 */
export default {
  title: "Primitives/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A Material Design 3 compliant card component with multiple variants. Supports images, actions, and interactive states. All styling uses design tokens - no hardcoded colors.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "filled", "outlined"],
      description: "Card variant style",
    },
    title: {
      control: "text",
      description: "Card title",
    },
    subtitle: {
      control: "text",
      description: "Card subtitle",
    },
    image: {
      control: "text",
      description: "Image URL for card cover",
    },
    imageAlt: {
      control: "text",
      description: "Alt text for image",
    },
    children: {
      control: "text",
      description: "Card content",
    },
    onClick: {
      action: "clicked",
      description: "Click handler",
    },
  },
};

// Sample image URLs for demonstrations
const sampleImages = {
  nature:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  city: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
  food: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
  tech: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
};

export const Elevated = {
  args: {
    variant: "elevated",
    title: "Elevated Card",
    subtitle: "Material Design 3",
    children:
      "This card uses elevation shadow to create depth and visual hierarchy. Perfect for highlighting important content.",
  },
  parameters: {
    docs: {
      description: {
        story: "Elevated cards have a shadow effect to create visual depth.",
      },
    },
  },
};

export const Filled = {
  args: {
    variant: "filled",
    title: "Filled Card",
    subtitle: "Material Design 3",
    children:
      "This card has a filled background with higher contrast. Great for grouping related content.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Filled cards use a filled background color for higher contrast.",
      },
    },
  },
};

export const Outlined = {
  args: {
    variant: "outlined",
    title: "Outlined Card",
    subtitle: "Material Design 3",
    children:
      "This card has a subtle border outline. Ideal for minimal designs and list views.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Outlined cards have a border outline, perfect for minimal designs.",
      },
    },
  },
};

export const WithImage = {
  args: {
    variant: "elevated",
    title: "Beautiful Landscape",
    subtitle: "Mountain View",
    image: sampleImages.nature,
    imageAlt: "Mountain landscape at sunset",
    children:
      "Explore the stunning beauty of mountain ranges. This card showcases how images can enhance your content.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cards can display cover images above the content for visual appeal.",
      },
    },
  },
};

export const WithAction = {
  args: {
    variant: "elevated",
    title: "Card with Action",
    subtitle: "Explore more content",
    image: sampleImages.tech,
    imageAlt: "Technology background",
    children:
      "This card includes action buttons at the bottom. Perfect for CTAs and interactive elements.",
    action: (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button variant="text" size="small">
          Share
        </Button>
        <Button variant="filled" size="small">
          Learn More
        </Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cards can include action buttons for user interactions and CTAs.",
      },
    },
  },
};

export const Clickable = {
  args: {
    variant: "elevated",
    title: "Clickable Card",
    subtitle: "Interactive experience",
    image: sampleImages.city,
    imageAlt: "City skyline",
    children:
      "This entire card is clickable and shows hover effects. Great for navigation and links.",
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cards with onClick handlers are fully interactive with hover effects.",
      },
    },
  },
};

export const ImageOnly = {
  args: {
    variant: "elevated",
    image: sampleImages.food,
    imageAlt: "Delicious food",
    children:
      "A card can focus on visual content with minimal text for impact.",
  },
  parameters: {
    docs: {
      description: {
        story: "Cards with images but no title, focusing on visual content.",
      },
    },
  },
};

export const AllVariants = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "48px",
        alignItems: "flex-start",
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <div style={{ width: "100%" }}>
        <h3
          style={{
            marginBottom: "16px",
            ...getTypographyStyles("title-large"),
            color: tokens.mdSysColorOnsurface,
          }}
        >
          Elevated
        </h3>
        <Card
          variant="elevated"
          title="Elevated Card"
          subtitle="With shadow"
          image={sampleImages.nature}
          imageAlt="Nature"
        >
          Shadow elevation for depth and visual hierarchy.
        </Card>
      </div>
      <div style={{ width: "100%" }}>
        <h3
          style={{
            marginBottom: "16px",
            ...getTypographyStyles("title-large"),
            color: tokens.mdSysColorOnsurface,
          }}
        >
          Filled
        </h3>
        <Card
          variant="filled"
          title="Filled Card"
          subtitle="With background"
          image={sampleImages.city}
          imageAlt="City"
        >
          Filled background for higher contrast.
        </Card>
      </div>
      <div style={{ width: "100%" }}>
        <h3
          style={{
            marginBottom: "16px",
            ...getTypographyStyles("title-large"),
            color: tokens.mdSysColorOnsurface,
          }}
        >
          Outlined
        </h3>
        <Card
          variant="outlined"
          title="Outlined Card"
          subtitle="With border"
          image={sampleImages.tech}
          imageAlt="Technology"
        >
          Border outline for minimal design.
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All three card variants side by side for comparison.",
      },
    },
  },
};
