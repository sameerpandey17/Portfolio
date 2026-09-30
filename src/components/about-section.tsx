import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from './section-heading';
import { portfolioContent } from '../content';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const graphic = graphicRef.current;
    if (!section || !content || !graphic) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [content, graphic],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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

  const { about } = portfolioContent;

  return (
    <section ref={sectionRef} id="about" className="site-section about-section" aria-labelledby="about-heading">
      <div className="section-container">
        <SectionHeading
          number="02"
          kicker="Background & Trajectory"
          title="Engineering At The Intersection of AI & Infrastructure"
          subtitle="Building resilient full-stack systems that transform machine learning research into dependable, user-facing software."
          id="about-heading"
        />

        <div className="about-grid">
          {/* Text block with Viewfinder styling */}
          <div ref={contentRef} className="viewfinder-card about-card">
            <span className="corner-tick top-left" />
            <span className="corner-tick top-right" />
            <span className="corner-tick bottom-left" />
            <span className="corner-tick bottom-right" />

            <div className="about-badge-row">
              <span className="about-badge-pill">{about.statusBadge}</span>
              <span className="about-badge-inst">{about.institution}</span>
            </div>

            <div className="about-prose">
              <p className="about-lead">
                {about.summary}
              </p>
              <p className="about-body">
                {about.architectureFocus}
              </p>
            </div>

            <div className="about-metrics-grid">
              <div className="metric-box">
                <span className="metric-num font-display">8.71</span>
                <span className="metric-label">FIRST YEAR CGPA</span>
              </div>
              <div className="metric-box">
                <span className="metric-num font-display">4</span>
                <span className="metric-label">SHIPPED SYSTEMS</span>
              </div>
              <div className="metric-box">
                <span className="metric-num font-display">1ST</span>
                <span className="metric-label">HACKATHON SPRINT WIN</span>
              </div>
            </div>
          </div>

          {/* Archival Workspace Portrait */}
          <div ref={graphicRef} className="about-graphic-wrap">
            <div className="about-portrait-card viewfinder-card">
              <span className="corner-tick top-left" />
              <span className="corner-tick top-right" />
              <span className="corner-tick bottom-left" />
              <span className="corner-tick bottom-right" />
              
              <div className="graphic-top-label">
                <span className="graphic-code-tag">STUDIO // ARCHIVAL PORTRAIT</span>
                <span className="graphic-coord-tag">REF: SP_STUDIO</span>
              </div>

              <div className="about-portrait-frame">
                <picture>
                  <source srcSet="/assets/sameer-workspace-portrait.webp" type="image/webp" />
                  <img
                    src="/assets/sameer-workspace-portrait.jpg"
                    alt="Sameer Pandey — AI & Full-Stack Systems Engineer in workspace studio"
                    className="about-portrait-img"
                    loading="lazy"
                    width="1024"
                    height="986"
                  />
                </picture>
              </div>

              <div className="graphic-caption">
                <span>SYSTEM ENVIRONMENT: PUNE, INDIA · DEV RIG</span>
                <span className="graphic-status-indicator">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
