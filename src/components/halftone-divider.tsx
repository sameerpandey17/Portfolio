export interface HalftoneDividerProps {
  className?: string;
}

/**
 * HalftoneDivider
 * Replaces plain section border lines with a dot-grain halftone texture strip,
 * carrying the print/camera editorial aesthetic across section boundaries.
 */
export function HalftoneDivider({ className = '' }: HalftoneDividerProps) {
  return (
    <div className={`halftone-divider ${className}`} role="separator" aria-hidden="true" />
  );
}
