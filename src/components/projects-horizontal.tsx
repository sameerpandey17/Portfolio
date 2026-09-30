import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectHighlight } from '../content';
import { ProjectIcon } from './project-icon';
import { ScribbleLink } from './scribble-link';
import { MorphImage } from './morph-image.js';

gsap.registerPlugin(ScrollTrigger);

const PROJECT_IMAGES = [
  '/assets/projects/visionlink.webp',
  '/assets/projects/calorupee.webp',
  '/assets/projects/nutrisync.webp',
  '/assets/projects/package-scanner.webp',
];

interface ProjectsHorizontalProps {
  projects: ProjectHighlight[];
}

export const ProjectsHorizontal: React.FC<ProjectsHorizontalProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const morphRef = useRef<MorphImage | null>(null);
  const currentIdxRef = useRef<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const canvas = canvasRef.current;
    if (!section || !track) return;

    // Initialize shared vanilla JS WebGL MorphImage instance safely
    if (canvas && !morphRef.current) {
      try {
        morphRef.current = new MorphImage(canvas, PROJECT_IMAGES, {
          noiseScale: 2.8,
          edge: 0.2,
          drift: 0.25,
          duration: 850,
        });
      } catch (err) {
        console.warn('WebGL MorphImage init error, skipping morph:', err);
      }
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Horizontal Scroll Pinning (>= 900px)
      mm.add('(min-width: 900px)', () => {
        const getDistance = () => Math.max(0, track.offsetWidth - window.innerWidth + 100);

        gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            id: 'projects-horizontal-pin',
            trigger: section,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${getDistance() + 300}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress})`;
              }

              // Calculate active panel index from scroll progress
              const numPanels = projects.length;
              const activeIdx = Math.min(
                numPanels - 1,
                Math.max(0, Math.floor(self.progress * numPanels + 0.12))
              );

              if (activeIdx !== currentIdxRef.current) {
                currentIdxRef.current = activeIdx;
                morphRef.current?.goTo(activeIdx);
              }
            },
          },
        });

        // Transitional cue before entering section
        if (cueRef.current) {
          gsap.fromTo(
            cueRef.current,
            { x: 80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Mobile / vertical stack: trigger dissolve as panels cross into view
      mm.add('(max-width: 899px)', () => {
        const panels = track.querySelectorAll<HTMLElement>('.project-panel');
        panels.forEach((panel, index) => {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top 60%',
            onEnter: () => {
              currentIdxRef.current = index;
              morphRef.current?.goTo(index);
            },
            onEnterBack: () => {
              currentIdxRef.current = index;
              morphRef.current?.goTo(index);
            },
          });
        });
      });
    }, section);

    // Refresh after fonts load to guarantee pixel-perfect measurements
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      window.clearTimeout(timer);
      morphRef.current?.destroy();
      morphRef.current = null;
      ctx.revert();
    };
  }, [projects.length]);

  return (
    <section ref={sectionRef} id="projects" className="projects-section-container">
      {/* Transitional Cue Header */}
      <div className="projects-transition-bar">
        <div className="section-label-group">
          <span className="section-eyebrow">04 — PROJECTS</span>
          <span className="section-filmstrip-tag">FILMSTRIP ARCHIVE // 4 SHIPPED SYSTEMS</span>
        </div>
        <div ref={cueRef} className="projects-cue-indicator" aria-hidden="true">
          <span className="cue-dot" />
          <span className="cue-text">HORIZONTAL FILMSTRIP // SCROLL TO PIVOT</span>
          <span className="cue-arrow">→</span>
        </div>
      </div>

      {/* Horizontal Viewport Window */}
      <div className="projects-viewport">
        {/* Background WebGL noise-dissolve canvas layer */}
        <div className="projects-morph-backdrop" aria-hidden="true">
          <canvas ref={canvasRef} className="projects-morph-canvas" />
          <div className="projects-morph-scrim" />
        </div>

        <div ref={trackRef} className="projects-horizontal-track">
          {projects.map((project) => (
            <article key={project.id} className="project-panel">
              <div className="project-panel-inner viewfinder-card">
                {/* Viewfinder corner tick marks */}
                <span className="corner-tick top-left" aria-hidden="true" />
                <span className="corner-tick top-right" aria-hidden="true" />
                <span className="corner-tick bottom-left" aria-hidden="true" />
                <span className="corner-tick bottom-right" aria-hidden="true" />

                {/* 1. HEADER ROW: Eyebrow badge + Category label + Category Icon */}
                <div className="project-panel-top">
                  <div className="project-meta-left">
                    <span className="project-seq-badge">{project.eyebrow}</span>
                    <span className="project-category-tag">{project.category}</span>
                  </div>
                  <div className="project-icon-anchor">
                    <ProjectIcon type={project.iconType} className="project-panel-icon" />
                  </div>
                </div>

                {/* 2. TITLE: Project name in Fraunces */}
                <div className="project-panel-header">
                  <h3 className="project-title font-display">{project.title}</h3>
                </div>

                {/* 3. WHAT IT IS: One tight sentence stating plainly what it is and who/what it's for */}
                <p className="project-what-it-is">{project.whatItIs}</p>

                {/* 4. FEATURE(S): Notable / Worth knowing subheading followed by prose or natural bullet count */}
                <div className="project-feature-section">
                  <h4 className="feature-subheading">{project.feature.heading}</h4>
                  {Array.isArray(project.feature.body) ? (
                    <ul className="feature-bullet-list">
                      {project.feature.body.map((item, bIdx) => (
                        <li key={bIdx} className="feature-bullet-item">
                          <span className="feature-bullet-icon" aria-hidden="true">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="feature-single-body">{project.feature.body}</p>
                  )}
                </div>

                {/* 5. TECH STACK: Horizontal tag pills */}
                <div className="project-tags-wrap">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tag-pill-sm">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* 6. HOW I MADE IT: 2-3 sentences of honest, personal architectural narrative */}
                <div className="project-process-section">
                  <div className="process-header">
                    <span className="process-indicator-dot" aria-hidden="true" />
                    <span className="process-label">BEHIND THE BUILD</span>
                  </div>
                  <p className="process-narrative">{project.howIMadeIt}</p>
                </div>

                {/* 7. FOOTER LINKS: Code & Live links */}
                <div className="project-panel-footer">
                  <div className="project-links-row">
                    {project.links.map((link) => (
                      <ScribbleLink
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="project-action-link"
                      >
                        {link.label}
                        <span className="link-external-icon" aria-hidden="true">↗</span>
                      </ScribbleLink>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Horizontal Progress Bar */}
      <div className="projects-progress-track" aria-hidden="true">
        <div ref={progressBarRef} className="projects-progress-fill" />
      </div>
    </section>
  );
};
