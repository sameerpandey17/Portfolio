import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillCategory } from '../content';
import { SectionHeading } from './section-heading';

gsap.registerPlugin(ScrollTrigger);

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Subtle vertical parallax drift between cards (under 20px total)
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const driftOffsets = [-10, 12, -8, 14];
        const targetY = driftOffsets[index % driftOffsets.length];

        gsap.to(card, {
          y: targetY,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        // Staggered reveal of pills when card enters view
        const pills = card.querySelectorAll('.skill-badge');
        gsap.fromTo(
          pills,
          { opacity: 0, y: 10, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="site-section" aria-labelledby="skills-heading">
      <div className="section-container">
        <SectionHeading
          number="03"
          kicker="Architecture & Stack"
          title="Technical Competencies"
          subtitle="Production-tested tools for high-throughput distributed backends, real-time messaging, and intelligent systems."
          id="skills-heading"
        />

        <div className="skills-grid">
          {categories.map((category, index) => {
            const isSharpening = category.isSharpening;
            return (
              <div
                key={category.title}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`viewfinder-card skill-card ${isSharpening ? 'skill-card-sharpening' : ''}`}
              >
                {/* Viewfinder corner tick marks */}
                <span className="corner-tick top-left" />
                <span className="corner-tick top-right" />
                <span className="corner-tick bottom-left" />
                <span className="corner-tick bottom-right" />

                <div className="skill-card-header">
                  <div className="skill-title-row">
                    <h3 className="skill-group-title font-display">{category.title}</h3>
                    {isSharpening && (
                      <span className="sharpening-badge">
                        <span className="pulse-dot" aria-hidden="true" />
                        IN PROGRESS
                      </span>
                    )}
                  </div>
                  <span className="skill-group-number">CAT // 0{index + 1}</span>
                </div>

                <div className="skill-items-wrap">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className={`skill-badge ${isSharpening ? 'skill-badge-sharpening' : ''}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {category.note && (
                  <p className="skill-sharpening-note">
                    {category.note}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
