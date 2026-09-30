export interface MonogramMarkProps {
  size?: number | string;
  className?: string;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
}

/**
 * SP Monogram Mark
 * Circular outline with centered initials on transparent background.
 * Part of the unified brand system across hero watermark, loader, nav, and favicon.
 */
export function MonogramMark({
  size = 32,
  className = '',
  color = 'var(--cobalt)',
  borderColor = 'currentColor',
  borderWidth = 2,
}: MonogramMarkProps) {
  return (
    <svg
      className={`monogram-mark ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sameer Pandey Monogram"
    >
      <circle
        cx="24"
        cy="24"
        r="21"
        stroke={borderColor}
        strokeWidth={borderWidth}
        strokeLinecap="round"
      />
      <text
        x="24"
        y="30.5"
        textAnchor="middle"
        fill={color}
        fontFamily="'Barlow Condensed', sans-serif"
        fontWeight="800"
        fontSize="21"
        letterSpacing="0.04em"
      >
        SP
      </text>
    </svg>
  );
}
