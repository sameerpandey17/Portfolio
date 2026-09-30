export interface TagRowProps {
  tags: readonly string[];
  className?: string;
}

/**
 * TagRow
 * Quick-scan recruiter skills and focus tags displayed below the hero value line.
 * Driven entirely by data array in content.ts.
 */
export function TagRow({ tags, className = '' }: TagRowProps) {
  return (
    <div className={`hero-tag-row ${className}`} role="list" aria-label="Core competencies">
      {tags.map((tag) => (
        <span key={tag} className="hero-tag-pill" role="listitem">
          {tag}
        </span>
      ))}
    </div>
  );
}
