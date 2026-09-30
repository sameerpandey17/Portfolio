import type { AnchorHTMLAttributes, ReactNode } from 'react';

export interface ScribbleLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
  strokeColor?: string;
}

/**
 * ScribbleLink
 * An editorial link featuring an authentic hand-drawn SVG scribble underline
 * that draws itself across on hover via stroke-dashoffset animation.
 */
export function ScribbleLink({
  children,
  className = '',
  strokeColor = 'var(--red)',
  ...props
}: ScribbleLinkProps) {
  return (
    <a className={`scribble-link ${className}`} {...props}>
      <span className="scribble-text">{children}</span>
      <svg
        className="scribble-svg"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Slightly organic hand-drawn stroke */}
        <path
          d="M 2,7 C 22,2 42,10 62,5 C 78,1 89,8 98,6"
          vectorEffect="non-scaling-stroke"
          style={{ stroke: strokeColor }}
        />
      </svg>
    </a>
  );
}
