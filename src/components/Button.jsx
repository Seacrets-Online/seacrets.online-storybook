import React from 'react';

/**
 * Button component following Material Design 3 Expressive guidelines
 * 
 * @param {Object} props
 * @param {string} props.variant - Button variant: 'filled' | 'outlined' | 'text' | 'elevated'
 * @param {string} props.size - Button size: 'small' | 'medium' | 'large'
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - Button type: 'button' | 'submit' | 'reset'
 * @param {string} props['aria-label'] - Accessible label for screen readers
 */
export const Button = ({
  variant = 'filled',
  size = 'medium',
  disabled = false,
  children,
  className = '',
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  ...props
}) => {
  const baseStyles = {
    fontFamily: 'var(--md-sys-typescale-label-large-font-family)',
    fontSize: 'var(--md-sys-typescale-label-large-font-size)',
    lineHeight: 'var(--md-sys-typescale-label-large-line-height)',
    fontWeight: 'var(--md-sys-typescale-label-large-font-weight)',
    letterSpacing: 'var(--md-sys-typescale-label-large-letter-spacing)',
    border: 'none',
    borderRadius: 'var(--md-sys-shape-corner-extra-small)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textTransform: 'none',
    userSelect: 'none',
  };

  const sizeStyles = {
    small: {
      padding: '12px 28px',
      height: '36px',
    },
    medium: {
      padding: '14px 32px',
      height: '44px',
    },
    large: {
      padding: '16px 36px',
      height: '52px',
    },
  };

  const variantStyles = {
    filled: {
      backgroundColor: 'var(--md-sys-color-primary)',
      color: 'var(--md-sys-color-on-primary)',
      boxShadow: 'none',
    },
    outlined: {
      backgroundColor: 'transparent',
      color: 'var(--md-sys-color-primary)',
      border: '1px solid var(--md-sys-color-outline)',
      boxShadow: 'none',
    },
    text: {
      backgroundColor: 'transparent',
      color: 'var(--md-sys-color-primary)',
      boxShadow: 'none',
    },
    elevated: {
      backgroundColor: 'var(--md-sys-color-surface)',
      color: 'var(--md-sys-color-primary)',
      boxShadow: 'var(--md-sys-elevation-level-1)',
    },
  };

  const disabledStyles = {
    filled: {
      backgroundColor: 'var(--md-sys-color-surface-variant)',
      color: 'var(--md-sys-color-on-surface-variant)',
      opacity: 0.38,
    },
    outlined: {
      borderColor: 'var(--md-sys-color-outline-variant)',
      color: 'var(--md-sys-color-on-surface-variant)',
      opacity: 0.38,
    },
    text: {
      color: 'var(--md-sys-color-on-surface-variant)',
      opacity: 0.38,
    },
    elevated: {
      backgroundColor: 'var(--md-sys-color-surface-variant)',
      color: 'var(--md-sys-color-on-surface-variant)',
      opacity: 0.38,
      boxShadow: 'none',
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
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
      {children}
    </button>
  );
};

export default Button;
