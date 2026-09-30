import type { ReactNode } from 'react';

export interface SectionHeadingProps {
  number: string; // e.g. "01", "02", "03"
  kicker: string; // e.g. "Work", "Selected Projects", "Skills"
  title: string;
  subtitle?: ReactNode;
  id?: string;
  className?: string;
}

/**
 * SectionHeading
 * Shared heading implementing the site-wide Eyebrow + Number pattern:
 * e.g. "02 — WORK" with an editorial rule and large display title.
 */
export function SectionHeading({
  number,
  kicker,
  title,
  subtitle,
  id,
  className = '',
}: SectionHeadingProps) {
  return (
    <header className={`section-header-block ${className}`} id={id}>
      <div className="section-eyebrow-row">
        <span className="section-num-pill">{number}</span>
        <span className="section-num-divider">—</span>
        <span className="section-kicker-text">{kicker}</span>
        <span className="section-rule" aria-hidden="true" />
      </div>
      <h2 className="section-headline">{title}</h2>
      {subtitle && <p className="section-subheadline">{subtitle}</p>}
    </header>
  );
}
