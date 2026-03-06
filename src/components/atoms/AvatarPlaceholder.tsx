import React from "react";

export interface AvatarPlaceholderProps extends React.SVGProps<SVGSVGElement> {
  size?: "small" | "medium" | "large";
  width?: number;
  height?: number;
}

/**
 * Avatar Placeholder
 * Default user avatar icon with pink background
 * Can be sized using predefined sizes or custom width/height
 */
export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
  size = "medium",
  width,
  height,
  ...props
}) => {
  // Predefined sizes (square 1:1 aspect ratio)
  const sizeMap = {
    small: { width: 40, height: 40 },
    medium: { width: 80, height: 80 },
    large: { width: 120, height: 120 },
  };

  const dimensions =
    width && height
      ? { width, height }
      : width
        ? { width, height: width }
        : height
          ? { width: height, height }
          : sizeMap[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 164 164"
      fill="none"
      {...props}
    >
      <rect width="164" height="164" rx="82" fill="#FFD9DD" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M106.601 65.6C106.601 79.1862 95.5872 90.2 82.001 90.2C68.4148 90.2 57.401 79.1862 57.401 65.6C57.401 52.0138 68.4148 41 82.001 41C95.5872 41 106.601 52.0138 106.601 65.6ZM98.401 65.6C98.401 74.6575 91.0585 82 82.001 82C72.9435 82 65.601 74.6575 65.601 65.6C65.601 56.5425 72.9435 49.2 82.001 49.2C91.0585 49.2 98.401 56.5425 98.401 65.6Z"
        fill="#FF0061"
      />
      <path
        d="M82.001 102.5C55.456 102.5 32.839 118.196 24.2236 140.187C26.3224 142.271 28.5333 144.243 30.8465 146.091C37.2619 125.902 57.3875 110.7 82.001 110.7C106.614 110.7 126.74 125.902 133.156 146.091C135.469 144.243 137.68 142.271 139.778 140.187C131.163 118.197 108.546 102.5 82.001 102.5Z"
        fill="#FF0061"
      />
    </svg>
  );
};
