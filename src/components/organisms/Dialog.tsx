import React from "react";
import {
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
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
  const handleClose = (
    event: {},
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
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      }}
      PaperProps={{
        sx: {
          backgroundColor:
            "var(--seacrets-online-schemes-surface-container-high)",
          color: "var(--seacrets-online-schemes-on-surface)",
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
            color: "var(--seacrets-online-schemes-on-surface)",
            fontWeight: 500,
            fontSize: "1.5rem",
            lineHeight: 1.334,
            padding: "24px 24px 16px",
          }}
        >
          <Text variant="h6" component="span">
            {title}
          </Text>
        </MuiDialogTitle>
      )}
      <MuiDialogContent
        id={contentId}
        sx={{
          color: "var(--seacrets-online-schemes-on-surface-variant)",
          padding: title ? "0 24px" : "24px",
          paddingBottom: actions && actions.length > 0 ? "16px" : "24px",
        }}
      >
        {content || children}
      </MuiDialogContent>
      {actions && actions.length > 0 && (
        <MuiDialogActions
          sx={{
            padding: "16px 24px 24px",
            gap: "8px",
            justifyContent: "flex-end",
          }}
        >
          {actions.map((action, index) => {
            if (React.isValidElement(action)) {
              return <React.Fragment key={index}>{action}</React.Fragment>;
            }

            const buttonProps = action as ButtonProps;
            return (
              <Button
                key={index}
                variant={index === actions.length - 1 ? "contained" : "text"}
                {...buttonProps}
              />
            );
          })}
        </MuiDialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;
