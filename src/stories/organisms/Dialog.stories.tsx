import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import Dialog from "../../components/organisms/Dialog";
import Button from "../../components/atoms/Button";
import Text from "../../components/atoms/Text";

const meta = {
  title: "Organisms/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "test"],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SimpleConfirmation: Story = {
  args: {
    open: false,
    title: "Confirm Action",
    content: "Are you sure you want to proceed with this action?",
    actions: [
      { children: "Cancel" },
      { children: "Confirm", variant: "contained" },
    ],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <>
        <Button variant="contained" onClick={() => updateArgs({ open: true })}>
          Open Dialog
        </Button>
        <Dialog {...args} onClose={() => updateArgs({ open: false })} />
      </>
    );
  },
};

export const WithLongContent: Story = {
  args: {
    open: false,
    title: "Terms and Conditions",
    content: (
      <div>
        <Text variant="body1" sx={{ mb: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </Text>
        <Text variant="body1" sx={{ mb: 2 }}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </Text>
        <Text variant="body1" sx={{ mb: 2 }}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </Text>
        <Text variant="body1">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt.
        </Text>
      </div>
    ),
    actions: [
      { children: "Decline" },
      { children: "Accept", variant: "contained" },
    ],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <>
        <Button variant="contained" onClick={() => updateArgs({ open: true })}>
          Open Dialog
        </Button>
        <Dialog {...args} onClose={() => updateArgs({ open: false })} />
      </>
    );
  },
};

export const NoTitle: Story = {
  args: {
    open: false,
    content: "This dialog has no title, only content and actions.",
    actions: [{ children: "Dismiss", variant: "contained" }],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <>
        <Button variant="contained" onClick={() => updateArgs({ open: true })}>
          Open Dialog
        </Button>
        <Dialog {...args} onClose={() => updateArgs({ open: false })} />
      </>
    );
  },
};

export const SingleAction: Story = {
  args: {
    open: false,
    title: "Success!",
    content: "Your changes have been saved successfully.",
    actions: [{ children: "OK", variant: "contained" }],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <>
        <Button variant="contained" onClick={() => updateArgs({ open: true })}>
          Open Dialog
        </Button>
        <Dialog {...args} onClose={() => updateArgs({ open: false })} />
      </>
    );
  },
};

export const MultipleActions: Story = {
  args: {
    open: false,
    title: "Unsaved Changes",
    content: "You have unsaved changes. What would you like to do?",
    actions: [
      { children: "Cancel" },
      { children: "Don't Save" },
      { children: "Save", variant: "contained" },
    ],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <>
        <Button variant="contained" onClick={() => updateArgs({ open: true })}>
          Open Dialog
        </Button>
        <Dialog {...args} onClose={() => updateArgs({ open: false })} />
      </>
    );
  },
};

export const BackdropClickDisabled: Story = {
  args: {
    open: false,
    title: "Important Notice",
    content:
      "You must read and accept the terms to continue. Clicking outside won't close this dialog.",
    disableBackdropClick: true,
    actions: [{ children: "I Understand", variant: "contained" }],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <>
        <Button variant="contained" onClick={() => updateArgs({ open: true })}>
          Open Dialog
        </Button>
        <Dialog {...args} onClose={() => updateArgs({ open: false })} />
      </>
    );
  },
};

export const EscapeKeyDisabled: Story = {
  args: {
    open: false,
    title: "Forced Action",
    content:
      "You cannot close this dialog with the ESC key. You must choose an action.",
    disableEscapeKeyDown: true,
    actions: [
      { children: "Cancel" },
      { children: "Proceed", variant: "contained" },
    ],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <>
        <Button variant="contained" onClick={() => updateArgs({ open: true })}>
          Open Dialog
        </Button>
        <Dialog {...args} onClose={() => updateArgs({ open: false })} />
      </>
    );
  },
};

export const CustomContent: Story = {
  args: {
    open: false,
    title: "Delete Account",
    actions: [
      { children: "Cancel" },
      { children: "Delete", variant: "contained", color: "error" },
    ],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <>
        <Button variant="contained" onClick={() => updateArgs({ open: true })}>
          Open Dialog
        </Button>
        <Dialog {...args} onClose={() => updateArgs({ open: false })}>
          <div>
            <Text
              variant="body1"
              sx={{ mb: 2, color: "var(--md-sys-color-error)" }}
            >
              ⚠️ Warning: This action is permanent and cannot be undone.
            </Text>
            <Text
              variant="body2"
              sx={{ color: "var(--md-sys-color-on-surface-variant)" }}
            >
              All your data, including profile information, posts, and
              connections will be permanently deleted.
            </Text>
          </div>
        </Dialog>
      </>
    );
  },
};

export const Fullscreen: Story = {
  args: {
    open: false,
    title: "Full Screen Dialog",
    fullScreen: true,
    content: (
      <div>
        <Text variant="body1" sx={{ mb: 2 }}>
          This dialog takes up the entire screen on small devices.
        </Text>
        <Text variant="body1">
          On larger screens, it behaves like a regular dialog unless explicitly
          forced to be fullscreen.
        </Text>
      </div>
    ),
    actions: [{ children: "Close", variant: "contained" }],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <>
        <Button variant="contained" onClick={() => updateArgs({ open: true })}>
          Open Dialog
        </Button>
        <Dialog {...args} onClose={() => updateArgs({ open: false })} />
      </>
    );
  },
};
