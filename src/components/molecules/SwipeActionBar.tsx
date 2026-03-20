import { Box } from "@mui/material";
import type { BoxProps, SxProps, Theme } from "@mui/material";
import { Close, Undo, Person, Favorite, Check } from "@mui/icons-material";
import SwipeActionButton from "../atoms/SwipeActionButton";
import type { SwipeActionVariant } from "../atoms/SwipeActionButton";

export interface SwipeActionBarProps extends BoxProps {
  disabled?: boolean;
  onReject?: () => void;
  onUndo?: () => void;
  onProfile?: () => void;
  onLike?: () => void;
  onApprove?: () => void;
}

const actions: {
  variant: SwipeActionVariant;
  icon: React.ReactNode;
  key: string;
}[] = [
  { variant: "reject", icon: <Close />, key: "reject" },
  { variant: "undo", icon: <Undo />, key: "undo" },
  { variant: "profile", icon: <Person />, key: "profile" },
  { variant: "like", icon: <Favorite />, key: "like" },
  { variant: "approve", icon: <Check />, key: "approve" },
];

export const SwipeActionBar = ({
  disabled = false,
  onReject,
  onUndo,
  onProfile,
  onLike,
  onApprove,
  sx,
  ...props
}: SwipeActionBarProps) => {
  const handlers: Record<string, (() => void) | undefined> = {
    reject: onReject,
    undo: onUndo,
    profile: onProfile,
    like: onLike,
    approve: onApprove,
  };

  return (
    <Box
      sx={
        [
          (t) => ({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: t.layout.space16,
          }),
          ...(sx ? [sx] : []),
        ] as SxProps<Theme>
      }
      {...props}
    >
      {actions.map(({ variant, icon, key }) => (
        <SwipeActionButton
          key={key}
          variant={variant}
          icon={icon}
          disabled={disabled}
          onClick={handlers[key]}
        />
      ))}
    </Box>
  );
};

export default SwipeActionBar;
