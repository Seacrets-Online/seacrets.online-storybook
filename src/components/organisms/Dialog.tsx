import React from "react";
import {
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  useTheme,
} from "@mui/material";
import type { DialogProps as MuiDialogProps } from "@mui/material";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import type { ButtonProps } from "../atoms/Button";
import { shapeTokens } from "../../utils/shapes";

export type DialogAction = ButtonProps | React.ReactNode;

export interface DialogProps extends Omit<MuiDialogProps, "title" | "content"> {
  /** Dialog title text */
  title?: string;
  /** Dialog content - can be text or any React node */
  content?: React.ReactNode;
  /** Array of actions (buttons) to display in the dialog footer */
  actions?: DialogAction[];
  /** Disable closing dialog on backdrop click */
  disableBackdropClick?: boolean;
  /** Disable closing dialog on ESC key */
  disableEscapeKeyDown?: boolean;
  /** ID for the title element (used for aria-labelledby) */
  titleId?: string;
  /** ID for the content element (used for aria-describedby) */
  contentId?: string;
}

export const Dialog = ({
  title,
  content,
  actions,
  children,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  titleId = "dialog-title",
  contentId = "dialog-content",
  onClose,
  ...props
}: DialogProps) => {
  const theme = useTheme();
  const layout = theme.layout;
  const handleClose = (
    event: React.SyntheticEvent,
    reason: "backdropClick" | "escapeKeyDown",
  ) => {
    if (reason === "backdropClick" && disableBackdropClick) {
      return;
    }
    if (reason === "escapeKeyDown" && disableEscapeKeyDown) {
      return;
    }
    onClose?.(event, reason);
  };

  return (
    <MuiDialog
      {...props}
      onClose={handleClose}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={content || children ? contentId : undefined}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "var(--md-sys-state-layer-scrim-opacity-10)",
          },
        },
      }}
      PaperProps={{
        sx: {
          backgroundColor: "var(--md-sys-color-surface-container-high)",
          color: "var(--md-sys-color-on-surface)",
          borderRadius: shapeTokens["corner-extra-large"],
          minWidth: 280,
          maxWidth: 560,
          ...props.PaperProps?.sx,
        },
        ...props.PaperProps,
      }}
    >
      {title && (
        <MuiDialogTitle
          id={titleId}
          sx={{
            color: "var(--md-sys-color-on-surface)",
            padding: `${theme.spacing(layout.space24)} ${theme.spacing(layout.space24)} ${theme.spacing(layout.space16)}`,
          }}
        >
          <Text variant="headline-small" component="span">
            {title}
          </Text>
        </MuiDialogTitle>
      )}
      <MuiDialogContent
        id={contentId}
        sx={{
          color: "var(--md-sys-color-on-surface-variant)",
          padding: title ? `0 ${theme.spacing(layout.space24)}` : theme.spacing(layout.space24),
          paddingBottom:
            actions && actions.length > 0
              ? theme.spacing(layout.space16)
              : theme.spacing(layout.space24),
        }}
      >
        {content || children}
      </MuiDialogContent>
      {actions && actions.length > 0 && (
        <MuiDialogActions
          sx={{
            padding: `${theme.spacing(layout.space16)} ${theme.spacing(layout.space24)} ${theme.spacing(layout.space24)}`,
            gap: theme.spacing(layout.space8),
            justifyContent: "flex-end",
          }}
        >
          {actions.map((action, index) => {
            if (React.isValidElement(action)) {
              return <React.Fragment key={index}>{action}</React.Fragment>;
            }

            const buttonProps = action as ButtonProps;
            const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
              buttonProps.onClick?.(event);
              if (!event.defaultPrevented) {
                onClose?.(event, "backdropClick");
              }
            };
            return (
              <Button
                key={index}
                variant={index === actions.length - 1 ? "contained" : "text"}
                {...buttonProps}
                onClick={handleClick}
              />
            );
          })}
        </MuiDialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;
