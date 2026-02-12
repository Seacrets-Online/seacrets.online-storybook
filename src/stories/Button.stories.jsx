import { fn } from "storybook/test";
import { Button } from "../components/Button";
import { getTypographyStyles } from "../utils/typography.js";

/**
 * Button component following Material Design 3 Expressive guidelines.
 *
 * ## Definition of Done
 * - ✅ Token-based: Uses design tokens (no hardcoded hex values)
 * - ✅ M3 States: Supports hover, focus, active, and disabled states
 * - ✅ Accessibility: Keyboard navigable and ARIA-compliant
 * - ✅ Storybook: Includes stories for all variants and states
 * - ✅ Icon Support: Handles leading and trailing icons
 */
export default {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A Material Design 3 compliant button component with multiple variants and states. All styling uses design tokens - no hardcoded colors.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outlined", "text", "elevated"],
      description: "Button variant style",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    iconLeading: {
      control: "text",
      description: "Icon element to display before the label",
    },
    iconTrailing: {
      control: "text",
      description: "Icon element to display after the label",
    },
    children: {
      control: "text",
      description: "Button content",
    },
    onClick: {
      action: "clicked",
      description: "Click handler",
    },
  },
};

export const Filled = {
  args: {
    variant: "filled",
    children: "Filled Button",
    onClick: fn(),
  },
};

export const Outlined = {
  args: {
    variant: "outlined",
    children: "Outlined Button",
    onClick: fn(),
  },
};

export const Text = {
  args: {
    variant: "text",
    children: "Text Button",
    onClick: fn(),
  },
};

export const Elevated = {
  args: {
    variant: "elevated",
    children: "Elevated Button",
    onClick: fn(),
  },
};

export const WithIcons = {
  render: (args) => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button {...args} variant="filled" iconLeading="+">
        Add Item
      </Button>
      <Button {...args} variant="outlined" iconTrailing="→">
        Next Step
      </Button>
      <Button {...args} variant="text" iconLeading="♥" iconTrailing="★">
        Favorites
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Buttons support leading and trailing icons. Padding automatically adjusts based on the icon position to maintain visual balance (M3 Spec).",
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      <Button variant="filled" size="small" onClick={fn()}>
        Small Button
      </Button>
      <Button variant="filled" size="medium" onClick={fn()}>
        Medium Button
      </Button>
      <Button variant="filled" size="large" onClick={fn()}>
        Large Button
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button component supports three sizes: small (36px), medium (44px), and large (52px).",
      },
    },
  },
};

export const States = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      <div>
        <h3
          style={{
            marginBottom: "8px",
            ...getTypographyStyles("title-medium"),
          }}
        >
          Default
        </h3>
        <Button variant="filled" onClick={fn()}>
          Default State
        </Button>
      </div>
      <div>
        <h3
          style={{
            marginBottom: "8px",
            ...getTypographyStyles("title-medium"),
          }}
        >
          Hover
        </h3>
        <p
          style={{
            ...getTypographyStyles("body-small"),
            color: "var(--md-sys-color-on-surface-variant)",
            marginBottom: "8px",
          }}
        >
          Hover over the button to see the hover state
        </p>
        <Button variant="filled" className="pseudo-hover" onClick={fn()}>
          Hover State
        </Button>
      </div>
      <div>
        <h3
          style={{
            marginBottom: "8px",
            ...getTypographyStyles("title-medium"),
          }}
        >
          Focus
        </h3>
        <p
          style={{
            ...getTypographyStyles("body-small"),
            color: "var(--md-sys-color-on-surface-variant)",
            marginBottom: "8px",
          }}
        >
          Tab to focus the button (keyboard navigation)
        </p>
        <Button variant="filled" onClick={fn()}>
          Focus State
        </Button>
      </div>
      <div>
        <h3
          style={{
            marginBottom: "8px",
            ...getTypographyStyles("title-medium"),
          }}
        >
          Pressed
        </h3>
        <p
          style={{
            ...getTypographyStyles("body-small"),
            color: "var(--md-sys-color-on-surface-variant)",
            marginBottom: "8px",
          }}
        >
          Click and hold to see the pressed state
        </p>
        <Button variant="filled" onClick={fn()}>
          Pressed State
        </Button>
      </div>
      <div>
        <h3
          style={{
            marginBottom: "8px",
            ...getTypographyStyles("title-medium"),
          }}
        >
          Disabled
        </h3>
        <Button variant="filled" disabled onClick={fn()}>
          Disabled State
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button component supports all M3 states: default, hover, focus, active, and disabled.",
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
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      <Button variant="filled" onClick={fn()}>
        Filled Button
      </Button>
      <Button variant="outlined" onClick={fn()}>
        Outlined Button
      </Button>
      <Button variant="text" onClick={fn()}>
        Text Button
      </Button>
      <Button variant="elevated" onClick={fn()}>
        Elevated Button
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All four Material Design 3 button variants: Filled, Outlined, Text, and Elevated.",
      },
    },
  },
};

export const DisabledVariants = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      <Button variant="filled" disabled onClick={fn()}>
        Disabled Filled
      </Button>
      <Button variant="outlined" disabled onClick={fn()}>
        Disabled Outlined
      </Button>
      <Button variant="text" disabled onClick={fn()}>
        Disabled Text
      </Button>
      <Button variant="elevated" disabled onClick={fn()}>
        Disabled Elevated
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All button variants in disabled state. Disabled buttons are not interactive and have reduced opacity.",
      },
    },
  },
};

export const Accessibility = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-start",
        maxWidth: "600px",
      }}
    >
      <div>
        <h3
          style={{
            marginBottom: "8px",
            ...getTypographyStyles("title-medium"),
          }}
        >
          Keyboard Navigation
        </h3>
        <p
          style={{
            ...getTypographyStyles("body-medium"),
            color: "var(--md-sys-color-on-surface-variant)",
            marginBottom: "16px",
          }}
        >
          Buttons are keyboard accessible. Use Tab to navigate, Enter or Space
          to activate.
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button variant="filled" onClick={fn()}>
            Tab to focus
          </Button>
          <Button variant="outlined" onClick={fn()}>
            Then Tab here
          </Button>
        </div>
      </div>
      <div>
        <h3
          style={{
            marginBottom: "8px",
            ...getTypographyStyles("title-medium"),
          }}
        >
          ARIA Labels
        </h3>
        <p
          style={{
            ...getTypographyStyles("body-medium"),
            color: "var(--md-sys-color-on-surface-variant)",
            marginBottom: "16px",
          }}
        >
          Buttons support aria-label for screen readers when the visible text is
          not descriptive enough.
        </p>
        <Button variant="filled" aria-label="Close dialog" onClick={fn()}>
          ×
        </Button>
      </div>
      <div>
        <h3
          style={{
            marginBottom: "8px",
            ...getTypographyStyles("title-medium"),
          }}
        >
          Disabled State
        </h3>
        <p
          style={{
            ...getTypographyStyles("body-medium"),
            color: "var(--md-sys-color-on-surface-variant)",
            marginBottom: "16px",
          }}
        >
          Disabled buttons have aria-disabled="true" and cannot be focused or
          activated via keyboard.
        </p>
        <Button
          variant="filled"
          disabled
          aria-label="This action is not available"
          onClick={fn()}
        >
          Disabled Button
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accessibility features: keyboard navigation (Tab, Enter, Space), ARIA labels for screen readers, and proper disabled state handling.",
      },
    },
  },
};

export const Interactive = {
  args: {
    variant: "filled",
    children: "Click me!",
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example - click the button and check the Actions panel to see the click event.",
      },
    },
  },
};