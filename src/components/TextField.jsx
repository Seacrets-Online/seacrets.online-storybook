import React, { useState, useId } from 'react';

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
  variant = 'filled',
  type = 'text',
  label,
  placeholder,
  value: controlledValue,
  defaultValue,
  disabled = false,
  required = false,
  error = false,
  helperText,
  errorText,
  onChange,
  onFocus,
  onBlur,
  id,
  name,
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!(defaultValue || controlledValue));

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const generatedId = useId();
  const inputId = id || generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const describedBy = [
    error && errorId,
    helperText && !error && helperId,
    ariaDescribedBy,
  ].filter(Boolean).join(' ') || undefined;

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    setHasValue(newValue.length > 0);
    if (onChange) onChange(e);
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
    if (onBlur) onBlur(e);
  };

  const containerStyles = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  };

  const labelStyles = {
    fontFamily: 'var(--md-sys-typescale-body-small-font-family)',
    fontSize: 'var(--md-sys-typescale-body-small-font-size)',
    lineHeight: 'var(--md-sys-typescale-body-small-line-height)',
    fontWeight: 'var(--md-sys-typescale-body-small-font-weight)',
    letterSpacing: 'var(--md-sys-typescale-body-small-letter-spacing)',
    color: error
      ? 'var(--md-sys-color-error)'
      : disabled
      ? 'var(--md-sys-color-on-surface-variant)'
      : 'var(--md-sys-color-on-surface-variant)',
    marginBottom: '4px',
    transition: 'color 0.2s ease',
    opacity: disabled ? 0.38 : 1,
  };

  const inputContainerStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyles = {
    fontFamily: 'var(--md-sys-typescale-body-large-font-family)',
    fontSize: 'var(--md-sys-typescale-body-large-font-size)',
    lineHeight: 'var(--md-sys-typescale-body-large-line-height)',
    fontWeight: 'var(--md-sys-typescale-body-large-font-weight)',
    letterSpacing: 'var(--md-sys-typescale-body-large-letter-spacing)',
    width: '100%',
    padding: variant === 'filled' ? '16px 16px 16px 16px' : '16px',
    borderRadius: 'var(--md-sys-shape-corner-extra-small)',
    border: variant === 'outlined'
      ? `1px solid ${error ? 'var(--md-sys-color-error)' : isFocused ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline)'}`
      : 'none',
    borderBottom: variant === 'filled'
      ? `1px solid ${error ? 'var(--md-sys-color-error)' : isFocused ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline-variant)'}`
      : 'none',
    backgroundColor: variant === 'filled'
      ? disabled
        ? 'var(--md-sys-color-surface-variant)'
        : 'var(--md-sys-color-surface-variant)'
      : 'transparent',
    color: disabled
      ? 'var(--md-sys-color-on-surface-variant)'
      : 'var(--md-sys-color-on-surface)',
    outline: 'none',
    transition: 'all 0.2s ease',
    cursor: disabled ? 'not-allowed' : 'text',
  };

  const helperTextStyles = {
    fontFamily: 'var(--md-sys-typescale-body-small-font-family)',
    fontSize: 'var(--md-sys-typescale-body-small-font-size)',
    lineHeight: 'var(--md-sys-typescale-body-small-line-height)',
    fontWeight: 'var(--md-sys-typescale-body-small-font-weight)',
    letterSpacing: 'var(--md-sys-typescale-body-small-letter-spacing)',
    marginTop: '4px',
    paddingLeft: '16px',
    color: error
      ? 'var(--md-sys-color-error)'
      : disabled
      ? 'var(--md-sys-color-on-surface-variant)'
      : 'var(--md-sys-color-on-surface-variant)',
    opacity: disabled ? 0.38 : 1,
  };

  const containerClass = `textfield-${variant} ${className}`;

  return (
    <div style={containerStyles} className={containerClass}>
      {label && (
        <label htmlFor={inputId} style={labelStyles}>
          {label}
          {required && <span aria-label="required"> *</span>}
        </label>
      )}
      <div style={inputContainerStyles}>
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel || label}
          aria-describedby={describedBy}
          aria-invalid={error}
          aria-required={required}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyles}
          {...props}
        />
      </div>
      {(errorText || helperText) && (
        <div
          id={error ? errorId : helperId}
          style={helperTextStyles}
          role={error ? 'alert' : undefined}
        >
          {error ? errorText : helperText}
        </div>
      )}
    </div>
  );
};

export default TextField;
