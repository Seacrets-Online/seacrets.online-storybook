import React from 'react';
import * as tokens from '../style-dictionary-dist/variables.js';
import { getTypographyStyles } from '../utils/typography.js';
import { getShapeToken } from '../utils/shapes.js';
import { getElevationToken } from '../utils/elevation.js';

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
    ...getTypographyStyles('label-large'),
    border: 'none',
    borderRadius: getShapeToken('corner-extra-small'),
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
      backgroundColor: tokens.mdSysColorPrimary,
      color: tokens.mdSysColorOnprimary,
      boxShadow: 'none',
    },
    outlined: {
      backgroundColor: 'transparent',
      color: tokens.mdSysColorPrimary,
      border: `1px solid ${tokens.mdSysColorOutline}`,
      boxShadow: 'none',
    },
    text: {
      backgroundColor: 'transparent',
      color: tokens.mdSysColorPrimary,
      boxShadow: 'none',
    },
    elevated: {
      backgroundColor: tokens.mdSysColorSurface,
      color: tokens.mdSysColorPrimary,
      boxShadow: getElevationToken('level-1'),
    },
  };

  const disabledStyles = {
    filled: {
      backgroundColor: tokens.mdSysColorSurfacevariant,
      color: tokens.mdSysColorOnsurfacevariant,
      opacity: 0.38,
    },
    outlined: {
      borderColor: tokens.mdSysColorOutlinevariant,
      color: tokens.mdSysColorOnsurfacevariant,
      opacity: 0.38,
    },
    text: {
      color: tokens.mdSysColorOnsurfacevariant,
      opacity: 0.38,
    },
    elevated: {
      backgroundColor: tokens.mdSysColorSurfacevariant,
      color: tokens.mdSysColorOnsurfacevariant,
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
