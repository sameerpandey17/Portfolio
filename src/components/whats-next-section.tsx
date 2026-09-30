import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from './section-heading';
import { WhatsNextItem } from '../content';

gsap.registerPlugin(ScrollTrigger);

interface WhatsNextProps {
  items: WhatsNextItem[];
}

export const WhatsNextSection: React.FC<WhatsNextProps> = ({ items }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="whats-next" className="site-section" aria-labelledby="whats-next-heading">
      <div className="section-container">
        <SectionHeading
          number="06"
          kicker="Trajectory & Intent"
          title="What I'm Focusing On Next"
          subtitle="Honest directions: deepening core foundations, aiming for high-ownership teams, and exploring production internships."
          id="whats-next-heading"
        />

        <div className="whats-next-grid">
          {items.map((item, index) => (
            <div
              key={item.number}
              ref={(el) => (cardsRef.current[index] = el)}
              className="viewfinder-card whats-next-card"
            >
              <span className="corner-tick top-left" />
              <span className="corner-tick top-right" />
              <span className="corner-tick bottom-left" />
              <span className="corner-tick bottom-right" />

              <div className="whats-next-header">
                <span className="whats-next-num">{item.number}</span>
                <span className="whats-next-tag">NEXT HORIZON</span>
              </div>

              <h3 className="whats-next-title font-display">{item.title}</h3>
              <p className="whats-next-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
