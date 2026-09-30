import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AchievementItem } from '../content';

gsap.registerPlugin(ScrollTrigger);

interface TimelineProps {
  items: AchievementItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const ctx = gsap.context(() => {
      // Progressive draw-in of the vertical cobalt spine via scaleY
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: 0.8,
          },
        }
      );

      // Staggered reveal of each achievement card with its milestone dot
      entriesRef.current.forEach((entry) => {
        if (!entry) return;
        const marker = entry.querySelector('.timeline-marker');
        const card = entry.querySelector('.timeline-card');

        gsap.fromTo(
          [marker, card],
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: entry,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="timeline-container">
      {/* Continuous Cobalt Spine */}
      <div className="timeline-spine-track">
        <div ref={lineRef} className="timeline-spine-progress" />
      </div>

      <div className="timeline-entries">
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => (entriesRef.current[index] = el)}
            className="timeline-entry"
          >
            {/* Viewfinder reticle milestone dot */}
            <div className="timeline-marker-wrapper">
              <div className="timeline-marker">
                <span className="marker-inner-dot" />
              </div>
            </div>

            {/* Achievement Card with Corner Tick Marks */}
            <div className="timeline-card viewfinder-card">
              <span className="corner-tick top-left" aria-hidden="true" />
              <span className="corner-tick top-right" aria-hidden="true" />
              <span className="corner-tick bottom-left" aria-hidden="true" />
              <span className="corner-tick bottom-right" aria-hidden="true" />

              <div className="timeline-card-header">
                <div className="timeline-meta-left">
                  <span className="timeline-seq-tag">MILESTONE // 0{index + 1}</span>
                  <span className="timeline-date-pill">{item.date}</span>
                </div>
                {item.badge && <span className="timeline-badge-pill">{item.badge}</span>}
              </div>

              <h3 className="timeline-title font-display">{item.title}</h3>
              <p className="timeline-description">{item.description}</p>

              <div className="timeline-card-footer">
                <span className="timeline-status-text">RECORDED TRAJECTORY // VERIFIED</span>
                <span className="timeline-accent-arrow" aria-hidden="true">↗</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
