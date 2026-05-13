import React from 'react';

interface OctagramIconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

/**
 * A modern UI icon in IconSax style with consistent thin strokes and rounded edges.
 * Subtly integrates an octagram structure through radial symmetry and geometric alignment.
 */
export const OctagramIcon: React.FC<OctagramIconProps> = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Octagram Structure - Formed by two overlapping rounded squares */}
      {/* Square 1: Vertical/Horizontal */}
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="3"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Square 2: Rotated 45 degrees */}
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="3"
        transform="rotate(45 12 12)"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Central Detail - Futuristic HUD feel */}
      <circle
        cx="12"
        cy="12"
        r="2"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      
      {/* Radial Accents - Enhancing the 8-point symmetry */}
      <path
        d="M12 2V4M12 20V22M2 12H4M20 12H22"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default OctagramIcon;
