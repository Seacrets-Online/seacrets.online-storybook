import React from "react";
import * as tokens from "../style-dictionary-dist/variables.js";
import { getTypographyStyles } from "../utils/typography.js";
import { getShapeToken } from "../utils/shapes.js";
import { getElevationToken } from "../utils/elevation.js";

/**
 * Card component following Material Design 3 guidelines
 *
 * @param {Object} props
 * @param {string} props.variant - Card variant: 'elevated' | 'filled' | 'outlined'
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Optional card title
 * @param {string} props.subtitle - Optional card subtitle
 * @param {string} props.image - Optional image URL for cover image
 * @param {string} props.imageAlt - Alt text for image
 * @param {React.ReactNode} props.action - Optional action button/element
 * @param {Function} props.onClick - Optional click handler
 * @param {string} props.width - Optional card width (default: '100%', max: '400px')
 */
export const Card = ({
  variant = "elevated",
  children,
  title,
  subtitle,
  image,
  imageAlt = "",
  action,
  onClick,
  width = "100%",
  ...props
}) => {
  const baseStyles = {
    backgroundColor: tokens.mdSysColorSurface,
    borderRadius: getShapeToken("corner-medium"),
    display: "flex",
    flexDirection: "column",
    cursor: onClick ? "pointer" : "default",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
    width: width,
    maxWidth: "400px",
  };

  const variantStyles = {
    elevated: {
      backgroundColor: tokens.mdSysColorSurfacecontainerlow,
      boxShadow: getElevationToken("level-1"),
      border: "none",
    },
    filled: {
      backgroundColor: tokens.mdSysColorSurfacecontainerhighest,
      boxShadow: "none",
      border: "none",
    },
    outlined: {
      backgroundColor: tokens.mdSysColorSurface,
      boxShadow: "none",
      border: `1px solid ${tokens.mdSysColorOutlinevariant}`,
    },
  };

  const hoverStyles = onClick
    ? {
        boxShadow:
          variant === "elevated"
            ? getElevationToken("level-2")
            : variantStyles[variant].boxShadow,
        transform: "translateY(-2px)",
      }
    : {};

  const imageContainerStyles = {
    width: "100%",
    height: "200px",
    overflow: "hidden",
    backgroundColor: tokens.mdSysColorSurfacevariant,
  };

  const imageStyles = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const contentContainerStyles = {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const titleStyles = {
    ...getTypographyStyles("headline-small"),
    color: tokens.mdSysColorOnsurface,
    margin: 0,
  };

  const subtitleStyles = {
    ...getTypographyStyles("body-medium"),
    color: tokens.mdSysColorOnsurfacevariant,
    margin: 0,
  };

  const bodyStyles = {
    ...getTypographyStyles("body-medium"),
    color: tokens.mdSysColorOnsurface,
    lineHeight: "20px",
  };

  const actionContainerStyles = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    paddingTop: "8px",
  };

  return (
    <div
      style={{ ...baseStyles, ...variantStyles[variant] }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          Object.assign(e.currentTarget.style, variantStyles[variant]);
        }
      }}
      {...props}
    >
      {image && (
        <div style={imageContainerStyles}>
          <img src={image} alt={imageAlt} style={imageStyles} />
        </div>
      )}

      <div style={contentContainerStyles}>
        {title && <h3 style={titleStyles}>{title}</h3>}
        {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        {children && <div style={bodyStyles}>{children}</div>}
        {action && <div style={actionContainerStyles}>{action}</div>}
      </div>
    </div>
  );
};
