import React, { useState, useId } from "react";
import { getTypographyStyles } from "../utils/typography.js";
import { getShapeToken } from "../utils/shapes.js";

/**
 * TextField component following Material Design 3 Expressive guidelines
 *
 * @param {Object} props
 * @param {string} props.variant - TextField variant: 'filled' | 'outlined'
 * @param {string} props.type - Input type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
 * @param {string} props.label - Label text
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Controlled value
 * @param {string} props.defaultValue - Uncontrolled default value
 * @param {boolean} props.disabled - Whether the field is disabled
 * @param {boolean} props.required - Whether the field is required
 * @param {boolean} props.error - Whether the field has an error
 * @param {string} props.helperText - Helper text to display below the field
 * @param {string} props.errorText - Error text to display below the field
 * @param {React.ReactNode} props.prefixIcon - Icon to display before the input
 * @param {React.ReactNode} props.suffixIcon - Icon to display after the input
 * @param {number} props.maxLength - Max length for character counter
 * @param {boolean} props.showCounter - Whether to show the character counter
 * @param {Function} props.onChange - Change handler
 * @param {Function} props.onFocus - Focus handler
 * @param {Function} props.onBlur - Blur handler
 * @param {string} props.id - Input ID (auto-generated if not provided)
 * @param {string} props.name - Input name attribute
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['aria-label'] - Accessible label for screen readers
 * @param {string} props['aria-describedby'] - ID of element describing the field
 */
export const TextField = ({
  variant = "filled",
  type = "text",
  label,
  placeholder,
  value: controlledValue,
  defaultValue,
  disabled = false,
  required = false,
  error = false,
  helperText,
  errorText,
  prefixIcon,
  suffixIcon,
  maxLength,
  showCounter = true,
  onChange,
  onFocus,
  onBlur,
  id,
  name,
  className = "",
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? (controlledValue ?? "") : internalValue;
  const hasValue = String(value).length > 0;
  const generatedId = useId();
  const inputId = id || generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const counterId = `${inputId}-counter`;
  const describedBy =
    [error && errorId, helperText && !error && helperId, ariaDescribedBy]
      .filter(Boolean)
      .join(" ") || undefined;

  const showLabel = Boolean(label);
  const isFloating = showLabel && (isFocused || hasValue);
  const showCounterText = showCounter && typeof maxLength === "number";
  const counterText = showCounterText
    ? `${String(value).length}/${maxLength}`
    : undefined;
  const effectivePlaceholder = showLabel && !isFloating ? "" : placeholder;

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onChange) onChange(e);
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const basePaddingX = 16;
  const basePaddingY = 16;
  const labelOffsetRest = 0;
  const labelOffsetFloat = -10;
  const iconSize = 20;
  const iconGap = 8;
  const leftInset = basePaddingX + (prefixIcon ? iconSize + iconGap : 0);
  const rightInset = basePaddingX + (suffixIcon ? iconSize + iconGap : 0);
  const paddingTop = showLabel ? 22 : basePaddingY;
  const paddingBottom = showLabel ? 10 : basePaddingY;

  const containerStyles = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  };

  const labelStyles = {
    ...(isFloating
      ? getTypographyStyles("body-small")
      : getTypographyStyles("body-large")),
    color: error
      ? "var(--md-sys-color-error)"
      : disabled
        ? "var(--md-sys-color-on-surface-variant)"
        : "var(--md-sys-color-on-surface-variant)",
    position: "absolute",
    left: `${leftInset}px`,
    top: "50%",
    transform: isFloating
      ? `translateY(${labelOffsetFloat}px) scale(0.9)`
      : `translateY(${labelOffsetRest}px) translateY(-50%)`,
    transformOrigin: "left top",
    transition: "all 0.2s ease",
    opacity: disabled ? 0.38 : 1,
    pointerEvents: "none",
    backgroundColor:
      variant === "filled"
        ? "var(--md-sys-color-surface-variant)"
        : "var(--md-sys-color-surface)",
    padding: isFloating ? "0 4px" : "0",
  };

  const inputContainerStyles = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  };

  const inputStyles = {
    ...getTypographyStyles("body-large"),
    width: "100%",
    padding: `${paddingTop}px ${rightInset}px ${paddingBottom}px ${leftInset}px`,
    borderRadius: getShapeToken("corner-extra-small"),
    border:
      variant === "outlined"
        ? `1px solid ${error ? "var(--md-sys-color-error)" : isFocused ? "var(--md-sys-color-primary)" : "var(--md-sys-color-outline)"}`
        : "none",
    borderBottom:
      variant === "filled"
        ? `1px solid ${error ? "var(--md-sys-color-error)" : isFocused ? "var(--md-sys-color-primary)" : "var(--md-sys-color-outline-variant)"}`
        : "none",
    backgroundColor:
      variant === "filled"
        ? disabled
          ? "var(--md-sys-color-surface-variant)"
          : "var(--md-sys-color-surface-variant)"
        : "transparent",
    color: disabled
      ? "var(--md-sys-color-on-surface-variant)"
      : "var(--md-sys-color-on-surface)",
    outline: "none",
    transition: "all 0.2s ease",
    cursor: disabled ? "not-allowed" : "text",
  };

  const iconStyles = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: disabled
      ? "var(--md-sys-color-on-surface-variant)"
      : "var(--md-sys-color-on-surface-variant)",
    opacity: disabled ? 0.38 : 1,
    pointerEvents: "none",
  };

  const helperRowStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  };

  const helperTextStyles = {
    ...getTypographyStyles("body-small"),
    marginTop: "4px",
    paddingLeft: `${leftInset}px`,
    color: error
      ? "var(--md-sys-color-error)"
      : disabled
        ? "var(--md-sys-color-on-surface-variant)"
        : "var(--md-sys-color-on-surface-variant)",
    opacity: disabled ? 0.38 : 1,
  };

  const counterStyles = {
    ...getTypographyStyles("body-small"),
    marginTop: "4px",
    color: disabled
      ? "var(--md-sys-color-on-surface-variant)"
      : "var(--md-sys-color-on-surface-variant)",
    opacity: disabled ? 0.38 : 1,
  };

  const containerClass = `textfield-${variant} ${className}`;

  return (
    <div style={containerStyles} className={containerClass}>
      <div style={inputContainerStyles}>
        {prefixIcon && (
          <span
            style={{ ...iconStyles, left: `${basePaddingX}px` }}
            aria-hidden="true"
          >
            {prefixIcon}
          </span>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          placeholder={effectivePlaceholder}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel || label}
          aria-describedby={describedBy}
          aria-errormessage={error ? errorId : undefined}
          aria-invalid={error}
          aria-required={required}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={maxLength}
          style={inputStyles}
          {...props}
        />
        {showLabel && (
          <label htmlFor={inputId} style={labelStyles}>
            {label}
            {required && <span aria-label="required"> *</span>}
          </label>
        )}
        {suffixIcon && (
          <span
            style={{ ...iconStyles, right: `${basePaddingX}px` }}
            aria-hidden="true"
          >
            {suffixIcon}
          </span>
        )}
      </div>
      {(errorText || helperText || counterText) && (
        <div style={helperRowStyles}>
          {(errorText || helperText) && (
            <div
              id={error ? errorId : helperId}
              style={helperTextStyles}
              role={error ? "alert" : undefined}
            >
              {error ? errorText : helperText}
            </div>
          )}
          {counterText && (
            <div id={counterId} style={counterStyles} aria-live="polite">
              {counterText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TextField;
