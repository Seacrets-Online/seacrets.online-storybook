import React from "react";
import * as tokens from "../style-dictionary-dist/variables.js";
import { getTypographyStyles } from "../utils/typography.js";
import { getShapeToken } from "../utils/shapes.js";
import { getElevationToken } from "../utils/elevation.js";

/**
 * Button component following Material Design 3 Expressive guidelines
 *
 * @param {Object} props
 * @param {string} props.variant - Button variant: 'filled' | 'outlined' | 'text' | 'elevated'
 * @param {string} props.size - Button size: 'small' | 'medium' | 'large'
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {React.ReactNode} props.iconLeading - Icon to display before the label
 * @param {React.ReactNode} props.iconTrailing - Icon to display after the label
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - Button type: 'button' | 'submit' | 'reset'
 * @param {string} props['aria-label'] - Accessible label for screen readers
 */
export const Button = ({
  variant = "filled",
  size = "medium",
  disabled = false,
  iconLeading,
  iconTrailing,
  children,
  className = "",
  onClick,
  type = "button",
  "aria-label": ariaLabel,
  ...props
}) => {
  // Use JS tokens for spacing if available (generated from tokens.json), fallback to 8px
  const gapToken = tokens.primitivesMode1MdSysSpacing8
    ? `${tokens.primitivesMode1MdSysSpacing8}px`
    : "8px";

  const baseStyles = {
    ...getTypographyStyles("label-large"),
    border: "none",
    borderRadius: getShapeToken("corner-extra-small"),
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    // outline: "none", // Removed to allow native browser focus (Accessibility Requirement)
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: gapToken,
    textTransform: "none",
    userSelect: "none",
  };

  // Dynamic padding calculation based on M3 specs
  const getPaddingStyles = (btnSize) => {
    // Access spacing tokens
    const sp12 = tokens.primitivesMode1MdSysSpacing12 || 12;
    const sp16 = tokens.primitivesMode1MdSysSpacing16 || 16;
    const sp24 = tokens.primitivesMode1MdSysSpacing24 || 24;
    // Values 20 and 28 might not be in the current token set, using fallbacks
    const sp20 = 20;
    const sp28 = 28;

    const configs = {
      small: {
        h: "36px",
        // If icon present, reduce padding on that side to 12px, else use 28px
        l: iconLeading ? sp12 : 28,
        r: iconTrailing ? sp12 : 28,
      },
      medium: {
        h: "44px",
        l: iconLeading ? sp16 : 24, // 24px default padding for medium
        r: iconTrailing ? sp16 : 24,
      },
      large: {
        h: "52px",
        l: iconLeading ? sp20 : sp28,
        r: iconTrailing ? sp20 : sp28,
      },
    };

    const c = configs[btnSize];
    return {
      height: c.h,
      padding: `0 ${c.r}px 0 ${c.l}px`,
    };
  };

  const variantStyles = {
    filled: {
      backgroundColor: "red",
      color: "var(--md-sys-color-on-primary)",
      boxShadow: "none",
    },
    outlined: {
      backgroundColor: "transparent",
      color: "var(--md-sys-color-primary)",
      border: "1px solid var(--md-sys-color-outline)",
      boxShadow: "none",
    },
    text: {
      backgroundColor: "transparent",
      color: "var(--md-sys-color-primary)",
      boxShadow: "none",
    },
    elevated: {
      backgroundColor: "var(--md-sys-color-surface)",
      color: "var(--md-sys-color-primary)",
      boxShadow: getElevationToken("level-1"),
    },
  };

  const disabledStyles = {
    filled: {
      backgroundColor: "var(--md-sys-color-surface-variant)",
      color: "var(--md-sys-color-on-surface-variant)",
      opacity: 0.38,
    },
    outlined: {
      borderColor: "var(--md-sys-color-outline-variant)",
      color: "var(--md-sys-color-on-surface-variant)",
      opacity: 0.38,
    },
    text: {
      color: "var(--md-sys-color-on-surface-variant)",
      opacity: 0.38,
    },
    elevated: {
      backgroundColor: "var(--md-sys-color-surface-variant)",
      color: "var(--md-sys-color-on-surface-variant)",
      opacity: 0.38,
      boxShadow: "none",
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...getPaddingStyles(size), // Applied dynamic padding
    ...(disabled ? disabledStyles[variant] : {}),
  };

  const stateClasses = `button-hover-${variant} button-active-${variant} button-focus-${variant}`;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      className={`${stateClasses} ${className}`}
      style={combinedStyles}
      {...props}
    >
      {/* Leading Icon */}
      {iconLeading && (
        <span aria-hidden="true" style={{ display: "flex", fontSize: "18px" }}>
          {iconLeading}
        </span>
      )}

      {/* Button Label */}
      <span>{children}</span>

      {/* Trailing Icon */}
      {iconTrailing && (
        <span aria-hidden="true" style={{ display: "flex", fontSize: "18px" }}>
          {iconTrailing}
        </span>
      )}
    </button>
  );
};

export default Button;
