import { useEffect, useRef } from 'react';

/**
 * CustomCursor
 * Precision sniper/camera viewfinder crosshair reticle cursor matching design spec:
 * - Solid center dot
 * - Inner solid circular ring
 * - Outer dotted/dashed concentric ring
 * - 4 extended crosshair tick lines (top, bottom, left, right)
 *
 * Implemented via direct DOM refs without triggering React state updates on mousemove,
 * providing 120fps+ smoothness, multi-input pointer support, and zero reconciliation overhead.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return undefined;

    let rafId: number | null = null;
    let targetX = -100;
    let targetY = -100;
    let isVisible = false;

    const updatePosition = () => {
      if (el) {
        el.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
      rafId = null;
    };

    const onPointerMove = (e: PointerEvent | MouseEvent) => {
      // Ignore touch events so touch devices use default tap behavior
      if ('pointerType' in e && e.pointerType === 'touch') return;

      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        el.classList.add('is-visible');
        document.body.classList.add('has-custom-cursor');
      }

      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, [role="button"], .hero-tag-pill, .viewfinder-card, input, textarea, .project-panel')
      );
      el.classList.toggle('is-hovered', isInteractive);

      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      el.classList.remove('is-visible');
    };

    const onMouseEnter = () => {
      isVisible = true;
      el.classList.add('is-visible');
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    >
      <svg
        className="cursor-crosshair-svg"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Center precision dot */}
        <circle cx="26" cy="26" r="3" fill="currentColor" />
        {/* Inner solid circular ring */}
        <circle cx="26" cy="26" r="9" stroke="currentColor" strokeWidth="1.6" />
        {/* Outer dotted/dashed concentric ring */}
        <circle
          cx="26"
          cy="26"
          r="16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeDasharray="2.5 3.2"
        />
        {/* 4 Crosshair tick lines */}
        <line x1="26" y1="15" x2="26" y2="1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="26" y1="37" x2="26" y2="51" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="15" y1="26" x2="1" y2="26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="37" y1="26" x2="51" y2="26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}
